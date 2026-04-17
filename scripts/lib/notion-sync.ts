/* eslint-disable no-console */
import { Client } from '@notionhq/client'
import type { ContentRow } from './parse-resume-tex.js'

/**
 * Shared Notion client helpers used by both the hardcoded seed script
 * (setup-notion-database.ts) and the auto-sync script (sync-from-resume.ts).
 */

export function getNotionClient() {
  const apiKey = process.env.NOTION_API_KEY
  const databaseId = process.env.NOTION_DATABASE_ID
  if (!apiKey || !databaseId) {
    throw new Error(
      'NOTION_API_KEY and NOTION_DATABASE_ID must be set in the environment.'
    )
  }
  return { notion: new Client({ auth: apiKey }), databaseId }
}

export async function updateDatabaseSchema(
  notion: Client,
  databaseId: string
): Promise<void> {
  await notion.databases.update({
    database_id: databaseId,
    properties: {
      Section: {
        select: {
          options: [
            { name: 'siteConfig', color: 'gray' },
            { name: 'contact', color: 'blue' },
            { name: 'skills', color: 'green' },
            { name: 'projects', color: 'purple' },
            { name: 'experience', color: 'orange' },
            { name: 'education', color: 'yellow' },
            { name: 'hero', color: 'red' }
          ]
        }
      },
      Order: { number: {} },
      Description: { rich_text: {} },
      Tags: { multi_select: { options: [] } },
      URL: { url: {} },
      Duration: { rich_text: {} },
      Impact: { rich_text: {} },
      Company: { rich_text: {} },
      Status: { rich_text: {} },
      Featured: { checkbox: {} }
    }
  })
}

export async function clearExistingPages(
  notion: Client,
  databaseId: string
): Promise<number> {
  const response = await notion.databases.query({ database_id: databaseId })
  for (const page of response.results) {
    await notion.pages.update({ page_id: page.id, archived: true })
  }
  return response.results.length
}

export async function createPage(
  notion: Client,
  databaseId: string,
  row: ContentRow
): Promise<void> {
  const properties: Record<string, unknown> = {
    Name: { title: [{ text: { content: row.title } }] },
    Section: { select: { name: row.section } },
    Order: { number: row.order }
  }

  if (row.description) {
    // Split long descriptions across multiple rich_text segments:
    // - Notion's rich_text limit is 2000 chars per segment, so a 6-bullet
    //   paragraph can silently truncate if sent in one segment.
    // - Splitting on "\n" also preserves bullet line-breaks reliably across
    //   the Notion API round-trip, which collapsing into one segment does not.
    const parts = row.description.split('\n')
    properties.Description = {
      rich_text: parts.map((part, i) => ({
        text: { content: i < parts.length - 1 ? `${part}\n` : part }
      }))
    }
  }
  if (row.tags && row.tags.length > 0) {
    properties.Tags = {
      multi_select: row.tags.map((tag) => ({ name: tag }))
    }
  }
  if (row.url) properties.URL = { url: row.url }
  if (row.duration) {
    properties.Duration = {
      rich_text: [{ text: { content: row.duration } }]
    }
  }
  if (row.impact) {
    properties.Impact = { rich_text: [{ text: { content: row.impact } }] }
  }
  if (row.company) {
    properties.Company = { rich_text: [{ text: { content: row.company } }] }
  }
  if (row.status) {
    properties.Status = { rich_text: [{ text: { content: row.status } }] }
  }
  if (row.featured !== undefined) {
    properties.Featured = { checkbox: row.featured }
  }

  await notion.pages.create({
    parent: { database_id: databaseId },
    properties: properties as Parameters<
      typeof notion.pages.create
    >[0]['properties']
  })
}

/**
 * Full replace: update schema, archive existing pages, create new ones
 * from the given content rows.
 */
export async function replaceAllContent(rows: ContentRow[]): Promise<{
  archived: number
  created: number
}> {
  const { notion, databaseId } = getNotionClient()
  console.log('Updating database schema...')
  await updateDatabaseSchema(notion, databaseId)
  console.log('Archiving existing pages...')
  const archived = await clearExistingPages(notion, databaseId)
  console.log(`Archived ${archived} pages.`)
  console.log('Creating new pages...')
  for (const row of rows) {
    console.log(`  ${row.section}: ${row.title}`)
    await createPage(notion, databaseId, row)
  }
  return { archived, created: rows.length }
}
