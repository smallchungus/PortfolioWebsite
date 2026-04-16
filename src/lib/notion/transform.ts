import type { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints'
import type {
  PortfolioContent,
  SiteConfig,
  ContactInfo,
  Skills,
  Project,
  Experience,
  Education,
  HeroContent
} from './schemas'

type NotionProperty = PageObjectResponse['properties'][string]

// Helper to extract text from Notion rich text
function getRichText(property: NotionProperty | undefined): string {
  if (!property || property.type !== 'rich_text') return ''
  return property.rich_text.map((t) => t.plain_text).join('')
}

// Helper to extract title
function getTitle(property: NotionProperty | undefined): string {
  if (!property || property.type !== 'title') return ''
  return property.title.map((t) => t.plain_text).join('')
}

// Helper to extract select value
function getSelect(property: NotionProperty | undefined): string {
  if (!property || property.type !== 'select' || !property.select) return ''
  return property.select.name
}

// Helper to extract multi-select values
function getMultiSelect(property: NotionProperty | undefined): string[] {
  if (!property || property.type !== 'multi_select') return []
  return property.multi_select.map((s) => s.name)
}

// Helper to extract number
function getNumber(property: NotionProperty | undefined): number {
  if (!property || property.type !== 'number' || property.number === null) return 0
  return property.number
}

// Helper to extract URL
function getUrl(property: NotionProperty | undefined): string | null {
  if (!property || property.type !== 'url') return null
  return property.url
}

// Helper to extract checkbox
function getCheckbox(property: NotionProperty | undefined): boolean {
  if (!property || property.type !== 'checkbox') return false
  return property.checkbox
}

interface NotionContentItem {
  id: string
  title: string
  section: string
  order: number
  description: string
  tags: string[]
  url: string | null
  duration: string
  impact: string
  company: string
  status: string
  featured: boolean
}

// Transform a Notion page to a content item
export function transformPage(page: PageObjectResponse): NotionContentItem {
  const props = page.properties

  return {
    id: page.id,
    title: getTitle(props['Name']),
    section: getSelect(props['Section']),
    order: getNumber(props['Order']),
    description: getRichText(props['Description']),
    tags: getMultiSelect(props['Tags']),
    url: getUrl(props['URL']),
    duration: getRichText(props['Duration']),
    impact: getRichText(props['Impact']),
    company: getRichText(props['Company']),
    status: getRichText(props['Status']),
    featured: getCheckbox(props['Featured'])
  }
}

// Group content items by section and transform to portfolio content
export function transformToPortfolioContent(
  items: NotionContentItem[]
): PortfolioContent {
  // Sort by order
  const sorted = [...items].sort((a, b) => a.order - b.order)

  // Group by section
  const bySection = sorted.reduce(
    (acc, item) => {
      if (!acc[item.section]) {
        acc[item.section] = []
      }
      acc[item.section].push(item)
      return acc
    },
    {} as Record<string, NotionContentItem[]>
  )

  // Transform each section
  const siteConfigItem = bySection['siteConfig']?.[0]
  const siteConfig: SiteConfig = siteConfigItem
    ? {
        name: siteConfigItem.title,
        title: siteConfigItem.description.split('\n')[0] || siteConfigItem.title,
        description: siteConfigItem.description,
        url: siteConfigItem.url || 'https://willchennn.com',
        ogImage: `${siteConfigItem.url || 'https://willchennn.com'}/og-image.jpg`,
        creator: siteConfigItem.company || '@willchennn'
      }
    : {
        name: 'Will Chen',
        title: 'Will Chen - Software Engineer',
        description: 'Software Engineer',
        url: 'https://willchennn.com',
        ogImage: 'https://willchennn.com/og-image.jpg',
        creator: '@willchennn'
      }

  const contactItem = bySection['contact']?.[0]
  const contact: ContactInfo = contactItem
    ? {
        email: contactItem.title,
        linkedin:
          contactItem.tags.find((t) => t.includes('linkedin')) ||
          'https://linkedin.com/in/willchenn',
        github:
          contactItem.tags.find((t) => t.includes('github')) ||
          'https://github.com/smallchungus',
        location: contactItem.company || 'Newark, NJ'
      }
    : {
        email: 'wchen1396@gmail.com',
        linkedin: 'https://linkedin.com/in/willchenn',
        github: 'https://github.com/smallchungus',
        location: 'Newark, NJ'
      }

  // Transform skills - group by title (category name)
  const skillItems = bySection['skills'] || []
  const skills: Skills = skillItems.reduce(
    (acc, item) => {
      acc[item.title] = item.tags
      return acc
    },
    {} as Skills
  )

  // Transform projects
  const projectItems = bySection['projects'] || []
  const projects: Project[] = projectItems.map((item) => ({
    id: item.id,
    title: item.title,
    description: item.description,
    technologies: item.tags,
    impact: item.impact || undefined,
    links: item.url
      ? {
          github: item.url.includes('github') ? item.url : undefined,
          live: !item.url.includes('github') ? item.url : undefined
        }
      : undefined,
    featured: item.featured
  }))

  // Transform experience
  const experienceItems = bySection['experience'] || []
  const experience: Experience[] = experienceItems.map((item) => ({
    id: item.id,
    title: item.title,
    company: item.company,
    description: item.description,
    duration: item.duration,
    technologies: item.tags
  }))

  // Transform education
  const educationItems = bySection['education'] || []
  const education: Education[] = educationItems.map((item) => ({
    id: item.id,
    degree: item.title,
    institution: item.company,
    status: item.status,
    duration: item.duration
  }))

  // Transform hero
  const heroItem = bySection['hero']?.[0]
  const hero: HeroContent = heroItem
    ? {
        roles: heroItem.tags,
        techStack: heroItem.description.split(',').map((s) => s.trim()),
        description: heroItem.impact || ''
      }
    : {
        roles: ['Software Engineer', 'Data Engineer', 'MS CS @ ASU'],
        techStack: ['Python', 'Go', 'SQL', 'AWS', 'Docker', 'Kubernetes'],
        description:
          'Building production-grade ETL pipelines and distributed systems. Passionate about data infrastructure, cloud-native tooling, and reliable engineering at scale.'
      }

  return {
    siteConfig,
    contact,
    skills,
    projects,
    experience,
    education,
    hero
  }
}
