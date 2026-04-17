/* eslint-disable no-console */
/**
 * Manual Notion seed script. Hardcoded content — use this for initial
 * setup or when the resume repo isn't reachable. For ongoing sync,
 * prefer sync-from-resume.ts which parses the live LaTeX source.
 */
import { config } from 'dotenv'
config({ path: '.env.local' })

import { replaceAllContent } from './lib/notion-sync.js'
import type { ContentRow } from './lib/parse-resume-tex.js'

// Content to populate - Sourced from latest WillChen_Resume03_09_DE main.tex
const CONTENT_ROWS: ContentRow[] = [
  // Hero
  {
    title: 'Hero',
    section: 'hero',
    order: 1,
    description: 'Python, Go, SQL, AWS, Docker, Kubernetes',
    tags: ['Software Engineer', 'Data Engineer', 'MS Analytics @ Georgia Tech'],
    impact:
      "Building production-grade ETL pipelines and distributed systems. Passionate about data infrastructure, cloud-native tooling, and reliable engineering at scale."
  },
  // Skills — mirror the resume's three categories
  {
    title: 'Languages & Databases',
    section: 'skills',
    order: 10,
    tags: [
      'Python',
      'Go',
      'SQL',
      'JavaScript',
      'TypeScript',
      'PostgreSQL',
      'Redis',
      'Amazon Redshift'
    ]
  },
  {
    title: 'Cloud & Infrastructure',
    section: 'skills',
    order: 11,
    tags: [
      'AWS Glue',
      'AWS Lambda',
      'Step Functions',
      'S3',
      'Docker',
      'Kubernetes',
      'GitHub Actions',
      'Datadog',
      'Bash'
    ]
  },
  {
    title: 'Tooling & Practices',
    section: 'skills',
    order: 12,
    tags: [
      'CI/CD',
      'Distributed Systems',
      'REST APIs',
      'Observability',
      'AI-assisted Development',
      'Technical Documentation'
    ]
  },
  // Projects
  {
    title: 'Distributed Task Queue',
    section: 'projects',
    order: 20,
    description:
      'Distributed task queue in Go using Redis lists with BLPOP for blocking dequeue; processes 5K jobs across 4 workers in ~10 seconds. Worker and scheduler written from scratch instead of pulling in Celery to learn Go concurrency and Redis internals.',
    tags: ['Go', 'Redis', 'PostgreSQL', 'Docker', 'Kubernetes', 'GitHub Actions'],
    url: 'https://github.com/smallchungus',
    impact:
      'Worker crashes handled by 5-second Redis heartbeat; jobs from workers silent for 30+ seconds get requeued by a sweeper (at-least-once delivery without a separate broker). Containerized with Docker, deployed to Kubernetes with HPA on queue depth, CI/CD via GitHub Actions.',
    featured: true
  },
  {
    title: 'Portfolio Website',
    section: 'projects',
    order: 21,
    description:
      'Modern, minimal portfolio with dark mode, Notion CMS integration, and 95+ Lighthouse score. Built with TDD practices and Notion-powered content management.',
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'Vite'],
    url: 'https://github.com/smallchungus/PortfolioWebsite',
    featured: true
  },
  // Experience
  {
    title: 'Data Engineer (Federal Contract)',
    section: 'experience',
    order: 30,
    description:
      'Shipped 50+ end-to-end ETL pipelines from S3 to Amazon Redshift in Python and AWS Glue; owned 150+ pipelines serving USDA data consumers. Reusable templates cut new-feed onboarding time by 50%. Re-architected multi-step workflows with AWS Lambda and Step Functions to kill recurring Glue timeouts, cutting end-to-end runtime by 60%. Rebuilt the deploy path with GitHub Actions CI/CD (tests, linting, multi-env promotion), taking deploys from ~1 hour to ~10 minutes and eliminating unplanned schema rollbacks across 200+ tables in 3 environments. Fail-fast data quality checks caught 3 upstream schema changes over 6 months before bad data reached USDA analyst dashboards. Instrumented 150+ pipelines in Datadog with SLA tracking and volume anomaly alerts. Shipped self-serve Tableau dashboards and runbooks serving 100+ USDA users, saving ~2 hours/week of ad-hoc report pulls.',
    tags: [
      'Python',
      'AWS Glue',
      'AWS Lambda',
      'Step Functions',
      'Amazon Redshift',
      'S3',
      'Datadog',
      'Tableau',
      'GitHub Actions'
    ],
    company: 'Viatrie',
    duration: 'April 2024 - March 2026'
  },
  {
    title: 'Research Software Engineer',
    section: 'experience',
    order: 31,
    description:
      "Lifted unknown protein classification accuracy from ~70% to 89% by training scikit-learn ensemble models on mass-spectrometry data; serves 10-30 researchers, scientists, and doctors across 10+ collaborating labs in bacterial sample analysis. Cut 2+ hours of daily manual work by scripting instrument data processing in Python. Kept the 5TB research database intact with automated weekly backups and upload validation that catches corrupted writes before downstream analysis.",
    tags: ['Python', 'scikit-learn', 'Machine Learning', 'Mass Spectrometry'],
    company: 'Rutgers Chlamydia Lab',
    duration: 'August 2022 - Present'
  },
  {
    title: 'Open Source Contributor',
    section: 'experience',
    order: 32,
    description:
      "Contribute to Isaac Lab, NVIDIA's open-source GPU-accelerated framework for reinforcement learning and imitation learning across multiple robot embodiments. Build modular Python simulation environments for manipulator and AMR tasks in PhysX.",
    tags: ['Python', 'Reinforcement Learning', 'PhysX', 'Simulation'],
    company: 'Isaac Lab (NVIDIA)',
    duration: 'January 2024 - Present'
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
    status: 'GPA 3.44',
    duration: 'Graduated May 2021'
  }
]

async function main() {
  console.log('Setting up Notion database from hardcoded seed...\n')
  const result = await replaceAllContent(CONTENT_ROWS)
  console.log(
    `\nDone! Archived ${result.archived} old pages, created ${result.created} new pages.`
  )
  console.log('Run `npm run prebuild` to fetch the content.')
}

main().catch(console.error)
