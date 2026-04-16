/* eslint-disable no-console */
import { config } from 'dotenv'

// Load .env.local first, then .env as fallback
config({ path: '.env.local' })
config({ path: '.env' })

import { Client } from '@notionhq/client'
import type { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints'
import * as fs from 'fs'
import * as path from 'path'
import { fileURLToPath } from 'url'
import { transformPage, transformToPortfolioContent } from '../src/lib/notion/transform.js'
import { PortfolioContentSchema } from '../src/lib/notion/schemas.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const NOTION_API_KEY = process.env.NOTION_API_KEY
const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_ID

const OUTPUT_PATH = path.join(__dirname, '../src/content/notion-content.json')
const FALLBACK_PATH = path.join(__dirname, '../src/content/fallback-content.json')

async function fetchNotionContent() {
  // Check if environment variables are set
  if (!NOTION_API_KEY || !NOTION_DATABASE_ID) {
    console.log('Notion credentials not found. Using fallback content.')
    console.log('Set NOTION_API_KEY and NOTION_DATABASE_ID to enable Notion CMS.')
    return copyFallbackContent()
  }

  console.log('Fetching content from Notion...')

  try {
    const notion = new Client({ auth: NOTION_API_KEY })

    // Fetch all pages from the database (no sorting required - handled in transform)
    const response = await notion.databases.query({
      database_id: NOTION_DATABASE_ID
    })

    // Filter and transform pages
    const pages = response.results.filter(
      (page): page is PageObjectResponse => 'properties' in page
    )

    if (pages.length === 0) {
      console.log('No content found in Notion database. Using fallback.')
      return copyFallbackContent()
    }

    // Transform Notion pages to content items
    const contentItems = pages.map(transformPage)
    console.log(`Fetched ${contentItems.length} items from Notion`)

    // Transform to portfolio content structure
    const portfolioContent = transformToPortfolioContent(contentItems)

    // Validate with Zod schema
    const validated = PortfolioContentSchema.safeParse(portfolioContent)

    if (!validated.success) {
      console.error('Content validation failed:', validated.error.errors)
      console.log('Using fallback content due to validation errors.')
      return copyFallbackContent()
    }

    // Write to output file
    fs.writeFileSync(OUTPUT_PATH, JSON.stringify(validated.data, null, 2))
    console.log(`Content written to ${OUTPUT_PATH}`)

    return validated.data
  } catch (error) {
    console.error('Error fetching from Notion:', error)
    console.log('Using fallback content.')
    return copyFallbackContent()
  }
}

function copyFallbackContent() {
  // Copy fallback to notion-content.json so the app can use it
  if (fs.existsSync(FALLBACK_PATH)) {
    const fallbackContent = fs.readFileSync(FALLBACK_PATH, 'utf-8')
    fs.writeFileSync(OUTPUT_PATH, fallbackContent)
    console.log('Fallback content copied to notion-content.json')
    return JSON.parse(fallbackContent)
  }

  throw new Error('No fallback content available')
}

// Run the script
fetchNotionContent()
  .then(() => {
    console.log('Content fetch complete!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('Fatal error:', error)
    process.exit(1)
  })
