/* eslint-disable no-console */
import { config } from 'dotenv'
config({ path: '.env.local' })

import { Client } from '@notionhq/client'

const NOTION_API_KEY = process.env.NOTION_API_KEY!
const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_ID!

const notion = new Client({ auth: NOTION_API_KEY })

// Content to populate
const CONTENT_ROWS = [
  // Hero
  {
    title: 'Hero',
    section: 'hero',
    order: 1,
    description: 'React, TypeScript, Python, Node.js, SQL',
    tags: ['Software Engineer', 'Full-Stack Developer', 'MS CS Student @ ASU', 'May 2025 Graduate'],
    impact: 'Building scalable applications and solving complex problems with modern technologies. Passionate about clean code, performance, and exceptional user experiences.'
  },
  // Skills
  {
    title: 'Languages',
    section: 'skills',
    order: 10,
    tags: ['Java', 'Python', 'JavaScript', 'TypeScript', 'SQL']
  },
  {
    title: 'Backend',
    section: 'skills',
    order: 11,
    tags: ['Spring Boot', 'Node.js', 'PostgreSQL', 'AWS Glue']
  },
  {
    title: 'Frontend',
    section: 'skills',
    order: 12,
    tags: ['React', 'Tailwind CSS', 'Vite', 'HTML/CSS']
  },
  {
    title: 'Cloud',
    section: 'skills',
    order: 13,
    tags: ['AWS', 'Vercel', 'Redshift', 'Athena']
  },
  {
    title: 'Tools',
    section: 'skills',
    order: 14,
    tags: ['Git', 'Docker', 'Tableau', 'IntelliJ IDEA']
  },
  // Projects
  {
    title: 'BurnCoin',
    section: 'projects',
    order: 20,
    description: 'Deflationary ERC-20 token that burns 1% on every transfer with community daily burns',
    tags: ['Solidity', 'Hardhat', 'Next.js', 'ethers.js', 'TypeScript'],
    url: 'https://github.com/smallchungus/BurnCoin',
    impact: 'Smart contract deployed on Ethereum Sepolia with 20+ comprehensive tests',
    featured: true
  },
  {
    title: 'Portfolio Website',
    section: 'projects',
    order: 21,
    description: 'Modern, minimal portfolio with dark mode and 95+ Lighthouse score',
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'Vite'],
    url: 'https://github.com/smallchungus/PortfolioWebsite',
    impact: 'Built with React, TypeScript, and TDD practices',
    featured: true
  },
  // Experience
  {
    title: 'Software Engineering Intern',
    section: 'experience',
    order: 30,
    description: 'Built DataMart features for 200+ investment bankers, reducing expense categorization time by 35%',
    tags: ['Java', 'Spring Boot', 'JavaScript', 'PostgreSQL'],
    company: 'TD Securities',
    duration: 'Summer 2024'
  },
  {
    title: 'Data Engineering Intern',
    section: 'experience',
    order: 31,
    description: 'Developed AWS ETL pipelines for USDA cloud spending data processing',
    tags: ['Python', 'AWS Glue', 'Tableau', 'Redshift'],
    company: 'Panasonic',
    duration: 'Summer 2023'
  },
  {
    title: 'Research Assistant',
    section: 'experience',
    order: 32,
    description: 'Built ML models for bacterial protein pattern classification with 89% accuracy',
    tags: ['Python', 'Pandas', 'Scikit-learn', 'PostgreSQL'],
    company: 'Rutgers University',
    duration: '2022-2023'
  },
  // Education
  {
    title: "Master's in Computer Science",
    section: 'education',
    order: 40,
    company: 'Arizona State University',
    status: 'Current Student - GPA 4.0',
    duration: '2023 - Present'
  }
]

async function updateDatabaseSchema() {
  console.log('Updating database schema...')

  try {
    await notion.databases.update({
      database_id: NOTION_DATABASE_ID,
      properties: {
        // Name already exists by default
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
    console.log('Database schema updated!')
  } catch (error) {
    console.error('Error updating schema:', error)
    throw error
  }
}

async function clearExistingPages() {
  console.log('Clearing existing pages...')

  const response = await notion.databases.query({
    database_id: NOTION_DATABASE_ID
  })

  for (const page of response.results) {
    await notion.pages.update({
      page_id: page.id,
      archived: true
    })
  }

  console.log(`Archived ${response.results.length} existing pages`)
}

async function createPage(row: typeof CONTENT_ROWS[0]) {
  const properties: Record<string, unknown> = {
    Name: {
      title: [{ text: { content: row.title } }]
    },
    Section: {
      select: { name: row.section }
    },
    Order: {
      number: row.order
    }
  }

  if (row.description) {
    properties.Description = {
      rich_text: [{ text: { content: row.description } }]
    }
  }

  if (row.tags && row.tags.length > 0) {
    properties.Tags = {
      multi_select: row.tags.map(tag => ({ name: tag }))
    }
  }

  if (row.url) {
    properties.URL = { url: row.url }
  }

  if (row.duration) {
    properties.Duration = {
      rich_text: [{ text: { content: row.duration } }]
    }
  }

  if (row.impact) {
    properties.Impact = {
      rich_text: [{ text: { content: row.impact } }]
    }
  }

  if (row.company) {
    properties.Company = {
      rich_text: [{ text: { content: row.company } }]
    }
  }

  if (row.status) {
    properties.Status = {
      rich_text: [{ text: { content: row.status } }]
    }
  }

  if (row.featured !== undefined) {
    properties.Featured = { checkbox: row.featured }
  }

  await notion.pages.create({
    parent: { database_id: NOTION_DATABASE_ID },
    properties: properties as Parameters<typeof notion.pages.create>[0]['properties']
  })
}

async function populateDatabase() {
  console.log('Populating database with content...')

  for (const row of CONTENT_ROWS) {
    console.log(`  Creating: ${row.title}`)
    await createPage(row)
  }

  console.log(`Created ${CONTENT_ROWS.length} pages!`)
}

async function main() {
  console.log('Setting up Notion database...\n')

  await updateDatabaseSchema()
  await clearExistingPages()
  await populateDatabase()

  console.log('\nDone! Your Notion database is now populated.')
  console.log('Run `npm run prebuild` to fetch the content.')
}

main().catch(console.error)
