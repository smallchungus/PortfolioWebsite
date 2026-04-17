/* eslint-disable no-console */
/**
 * Auto-sync entry point: fetch the latest main.tex from the resume repo,
 * parse it, and replace the Notion database contents. Runs in CI on a
 * schedule and on repository_dispatch events.
 *
 * Env vars required:
 *   NOTION_API_KEY
 *   NOTION_DATABASE_ID
 *
 * Optional:
 *   RESUME_TEX_URL (override the default raw URL, handy for testing)
 */
import { config } from 'dotenv'
config({ path: '.env.local' })
config({ path: '.env' })

import { parseResumeTex } from './lib/parse-resume-tex.js'
import { replaceAllContent } from './lib/notion-sync.js'

const DEFAULT_URL =
  'https://raw.githubusercontent.com/smallchungus/WillChen_Resume03_09_DE/main/main.tex'

async function main() {
  const url = process.env.RESUME_TEX_URL || DEFAULT_URL
  console.log(`Fetching ${url}`)
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Fetch failed: ${res.status} ${res.statusText}`)
  const tex = await res.text()
  console.log(`Fetched ${tex.length} bytes`)

  const rows = parseResumeTex(tex)
  console.log(`Parsed ${rows.length} content rows`)

  const { archived, created } = await replaceAllContent(rows)
  console.log(`Done. Archived ${archived}, created ${created}.`)
}

main().catch((err) => {
  console.error('Sync failed:', err)
  process.exit(1)
})
