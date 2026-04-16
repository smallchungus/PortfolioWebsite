/* eslint-disable no-console */
import { config } from 'dotenv'
config({ path: '.env.local' })

import { Client } from '@notionhq/client'

const NOTION_API_KEY = process.env.NOTION_API_KEY!
const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_ID!

const notion = new Client({ auth: NOTION_API_KEY })

// Content to populate - Updated with latest resume
const CONTENT_ROWS = [
  // Hero
  {
    title: 'Hero',
    section: 'hero',
    order: 1,
    description: 'Python, Java, Go, TypeScript, React',
    tags: ['Software Engineer', 'Full-Stack Developer', 'MS Analytics @ Georgia Tech'],
    impact: 'Building scalable applications and solving complex problems with modern technologies. Passionate about clean code, performance, and exceptional user experiences.'
  },
  // Skills
  {
    title: 'Languages',
    section: 'skills',
    order: 10,
    tags: ['Python', 'Java', 'Go', 'JavaScript', 'TypeScript', 'SQL']
  },
  {
    title: 'Backend',
    section: 'skills',
    order: 11,
    tags: ['Spring Boot', 'Node.js', 'PostgreSQL', 'Redis', 'Apache Kafka']
  },
  {
    title: 'Frontend',
    section: 'skills',
    order: 12,
    tags: ['React', 'Redux', 'Tailwind CSS', 'HTML/CSS']
  },
  {
    title: 'Cloud & DevOps',
    section: 'skills',
    order: 13,
    tags: ['Docker', 'Kubernetes', 'Azure DevOps', 'Grafana', 'CI/CD']
  },
  {
    title: 'Tools',
    section: 'skills',
    order: 14,
    tags: ['Git', 'Bloomberg Terminal', 'Reuters', 'IntelliJ IDEA']
  },
  // Projects
  {
    title: 'Distributed Task Queue',
    section: 'projects',
    order: 20,
    description: 'Production-ready async job system with Redis backend supporting delayed execution, exponential backoff retries, priority queues, and configurable worker pools',
    tags: ['Go', 'Redis', 'PostgreSQL', 'Docker', 'Kubernetes'],
    url: 'https://github.com/smallchungus',
    impact: 'Deployed to Kubernetes with horizontal pod autoscaling, handling 10K+ jobs/hour with graceful shutdown and job recovery',
    featured: true
  },
  {
    title: 'BurnCoin',
    section: 'projects',
    order: 21,
    description: 'Deflationary ERC-20 token that burns 1% on every transfer with community daily burns',
    tags: ['Solidity', 'Hardhat', 'Next.js', 'ethers.js', 'TypeScript'],
    url: 'https://github.com/smallchungus/BurnCoin',
    impact: 'Smart contract deployed on Ethereum Sepolia with 20+ comprehensive tests',
    featured: true
  },
  {
    title: 'Portfolio Website',
    section: 'projects',
    order: 22,
    description: 'Modern, minimal portfolio with dark mode, Notion CMS integration, and 95+ Lighthouse score',
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'Vite'],
    url: 'https://github.com/smallchungus/PortfolioWebsite',
    impact: 'Built with TDD practices and Notion-powered content management',
    featured: true
  },
  // Experience
  {
    title: 'Software Engineer',
    section: 'experience',
    order: 30,
    description: 'Built pricing models for interest rate swaps, bonds, and FX derivatives using Python and Java Spring Boot. Developed React/Redux frontend for Transparency Pricing Platform. Migrated 13 services to distributed architecture. Designed Apache Kafka pipelines for Bloomberg and Reuters market data feeds.',
    tags: ['Python', 'Java', 'Spring Boot', 'React', 'Redux', 'Kafka'],
    company: 'TD Securities',
    duration: 'August 2025 - Present'
  },
  {
    title: 'DevOps Engineer',
    section: 'experience',
    order: 31,
    description: 'Built Python automation reducing manual checks by 70%. Implemented CI/CD pipelines accelerating releases from monthly to weekly. Created Grafana dashboards for 200+ production servers. Developed ETL workflows for clinical reporting.',
    tags: ['Python', 'Azure DevOps', 'Grafana', 'CI/CD', 'ETL'],
    company: 'Hackensack Meridian Health',
    duration: 'August 2024 - July 2025'
  },
  {
    title: 'Software Engineer Intern',
    section: 'experience',
    order: 32,
    description: 'Developed features for DataMart internal application using Java Spring Boot and JavaScript. Built autocomplete search reducing expense categorization time by 35%. Enhanced backend systems supporting 200+ investment banking professionals.',
    tags: ['Java', 'Spring Boot', 'JavaScript', 'PostgreSQL'],
    company: 'TD Securities',
    duration: 'June 2024 - August 2024'
  },
  // Education
  {
    title: 'Master of Science in Analytics',
    section: 'education',
    order: 40,
    company: 'Georgia Institute of Technology',
    status: 'Current Student',
    duration: 'January 2026 - Present'
  },
  {
    title: 'Bachelor of Arts in Computer Science and Psychology',
    section: 'education',
    order: 41,
    company: 'Rutgers University',
    status: 'GPA 3.49',
    duration: 'May 2022'
  }
]

async function updateDatabaseSchema() {
  console.log('Updating database schema...')

  try {
    await notion.databases.update({
      database_id: NOTION_DATABASE_ID,
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
