import type { PortfolioContent } from '@/lib/notion/schemas'
import fallbackContent from './fallback-content.json'

// Try to load fetched content, fall back to static content
let content: PortfolioContent

try {
  // This will be generated at build time by the prebuild script
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  content = require('./notion-content.json') as PortfolioContent
} catch {
  // Use fallback content if notion-content.json doesn't exist
  content = fallbackContent as PortfolioContent
}

export const portfolioContent = content

// Named exports for convenience
export const siteConfig = content.siteConfig
export const contactInfo = content.contact
export const skills = content.skills
export const projects = content.projects
export const experience = content.experience
export const education = content.education
export const heroContent = content.hero

// Re-export types
export type {
  PortfolioContent,
  SiteConfig,
  ContactInfo,
  Skills,
  Project,
  Experience,
  Education,
  HeroContent
} from '@/lib/notion/schemas'
