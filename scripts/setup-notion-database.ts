/* eslint-disable no-console */
import { config } from 'dotenv'
config({ path: '.env.local' })

import { Client } from '@notionhq/client'

const NOTION_API_KEY = process.env.NOTION_API_KEY!
const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_ID!

const notion = new Client({ auth: NOTION_API_KEY })

// Content to populate - Sourced from WillChen_Resume03_09_DE (Data Engineer variant)
const CONTENT_ROWS = [
  // Hero
  {
    title: 'Hero',
    section: 'hero',
    order: 1,
    description: 'Python, Go, SQL, AWS, Docker, Kubernetes',
    tags: ['Software Engineer', 'Data Engineer', 'MS CS @ ASU'],
    impact:
      "Building production-grade ETL pipelines and distributed systems. Passionate about data infrastructure, cloud-native tooling, and reliable engineering at scale."
  },
  // Skills (grouped from resume's "Languages & Databases" and "Cloud & Tools" sections)
  {
    title: 'Languages',
    section: 'skills',
    order: 10,
    tags: ['Python', 'Go', 'SQL', 'JavaScript']
  },
  {
    title: 'Databases',
    section: 'skills',
    order: 11,
    tags: ['PostgreSQL', 'Redis', 'Amazon Redshift']
  },
  {
    title: 'Cloud & DevOps',
    section: 'skills',
    order: 12,
    tags: [
      'AWS Glue',
      'AWS Lambda',
      'Step Functions',
      'S3',
      'Docker',
      'Kubernetes'
    ]
  },
  {
    title: 'Observability & Tools',
    section: 'skills',
    order: 13,
    tags: ['Datadog', 'Tableau', 'GitHub Actions', 'Git']
  },
  // Projects
  {
    title: 'Distributed Task Queue',
    section: 'projects',
    order: 20,
    description:
      'Task queue in Go with Redis for job scheduling, delayed jobs, exponential-backoff retries, and PostgreSQL-backed status tracking with a real-time metrics dashboard',
    tags: ['Go', 'Redis', 'PostgreSQL', 'Docker', 'Kubernetes'],
    url: 'https://github.com/smallchungus',
    impact:
      'Deployed to Kubernetes with separate deployments for API server, worker pods, and databases; horizontal pod autoscaling based on queue depth',
    featured: true
  },
  {
    title: 'Portfolio Website',
    section: 'projects',
    order: 21,
    description:
      'Modern, minimal portfolio with dark mode, Notion CMS integration, and 95+ Lighthouse score',
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'Vite'],
    url: 'https://github.com/smallchungus/PortfolioWebsite',
    impact: 'Built with TDD practices and Notion-powered content management',
    featured: true
  },
  // Experience
  {
    title: 'Data Engineer',
    section: 'experience',
    order: 30,
    description:
      'Designed and deployed 50+ end-to-end ETL pipelines across dev, test, and prod using Python and AWS Glue, ingesting CSV/Parquet from S3 into Amazon Redshift; owned 150+ pipelines serving downstream USDA data consumers. Managed 200+ tables across 3 Redshift environments with version-controlled migrations. Built automated data quality checks flagging whitespace errors, type mismatches, and malformed records across multiple cloud providers. Orchestrated multi-step workflows with AWS Lambda and Step Functions. Implemented monitoring with Datadog across 150+ pipelines. Maintained GitHub Actions CI/CD with YAML configs across all pipeline environments.',
    tags: [
      'Python',
      'AWS Glue',
      'AWS Lambda',
      'Step Functions',
      'Amazon Redshift',
      'S3',
      'Datadog',
      'GitHub Actions'
    ],
    company: 'Viatrie (Federal Contract)',
    duration: 'April 2024 - April 2026'
  },
  {
    title: 'Research Assistant',
    section: 'experience',
    order: 31,
    description:
      "Improved unknown protein classification to 89% accuracy by analyzing mass spectrometry data with Python and machine learning libraries to identify patterns in bacterial samples. Ensured integrity of 50TB protein research database through automated weekly backups and validation checks catching corrupted uploads before downstream analysis.",
    tags: ['Python', 'Machine Learning', 'Mass Spectrometry'],
    company: 'Rutgers Chlamydia Lab',
    duration: 'August 2022 - Present'
  },
  {
    title: 'Open Source Contributor',
    section: 'experience',
    order: 32,
    description:
      "Contributed to Isaac Lab, NVIDIA's open-source GPU-accelerated framework for reinforcement learning and imitation learning across multiple robot embodiments. Developed modular Python-based simulation environments for manipulator and AMR tasks using PhysX, improving sim-to-real transfer outcomes.",
    tags: ['Python', 'Reinforcement Learning', 'PhysX', 'Simulation'],
    company: 'Isaac Lab (NVIDIA)',
    duration: 'January 2024 - Present'
  },
  // Education
  {
    title: 'Master of Science in Computer Science',
    section: 'education',
    order: 40,
    company: 'Arizona State University',
    status: 'GPA 4.00',
    duration: 'January 2024 - May 2025'
  },
  {
    title: 'Bachelor of Arts in Computer Science and Psychology',
    section: 'education',
    order: 41,
    company: 'Rutgers University',
    status: 'GPA 3.44',
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
