import { z } from 'zod'

// Base schema for all content items (used for Notion API response transformation)
export const BaseContentSchema = z.object({
  id: z.string(),
  title: z.string(),
  section: z.enum([
    'siteConfig',
    'contact',
    'skills',
    'projects',
    'experience',
    'education',
    'hero'
  ]),
  order: z.number().optional(),
  description: z.string().optional(),
  tags: z.array(z.string()).optional(),
  url: z.string().url().optional().nullable(),
  duration: z.string().optional(),
  impact: z.string().optional(),
  company: z.string().optional(),
  status: z.string().optional(),
  featured: z.boolean().optional()
})

// Site configuration
export const SiteConfigSchema = z.object({
  name: z.string(),
  title: z.string(),
  description: z.string(),
  url: z.string().url(),
  ogImage: z.string().url(),
  creator: z.string()
})

// Contact information
export const ContactInfoSchema = z.object({
  email: z.string().email(),
  linkedin: z.string().url(),
  github: z.string().url(),
  location: z.string(),
  resume: z.object({
    url: z.string().url(),
    isExternal: z.boolean()
  })
})

// Skills by category
export const SkillsSchema = z.record(z.string(), z.array(z.string()))

// Project item
export const ProjectSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  technologies: z.array(z.string()),
  impact: z.string().optional(),
  links: z
    .object({
      github: z.string().url().optional(),
      live: z.string().url().optional(),
      contract: z.string().url().optional()
    })
    .optional(),
  featured: z.boolean().optional()
})

// Experience item
export const ExperienceSchema = z.object({
  id: z.string(),
  title: z.string(),
  company: z.string(),
  description: z.string(),
  duration: z.string(),
  technologies: z.array(z.string())
})

// Education item
export const EducationSchema = z.object({
  id: z.string(),
  degree: z.string(),
  institution: z.string(),
  status: z.string(),
  duration: z.string()
})

// Hero section content
export const HeroContentSchema = z.object({
  roles: z.array(z.string()),
  techStack: z.array(z.string()),
  description: z.string()
})

// Complete portfolio content
export const PortfolioContentSchema = z.object({
  siteConfig: SiteConfigSchema,
  contact: ContactInfoSchema,
  skills: SkillsSchema,
  projects: z.array(ProjectSchema),
  experience: z.array(ExperienceSchema),
  education: z.array(EducationSchema),
  hero: HeroContentSchema
})

// Type exports
export type SiteConfig = z.infer<typeof SiteConfigSchema>
export type ContactInfo = z.infer<typeof ContactInfoSchema>
export type Skills = z.infer<typeof SkillsSchema>
export type Project = z.infer<typeof ProjectSchema>
export type Experience = z.infer<typeof ExperienceSchema>
export type Education = z.infer<typeof EducationSchema>
export type HeroContent = z.infer<typeof HeroContentSchema>
export type PortfolioContent = z.infer<typeof PortfolioContentSchema>
export type ContentItem = z.infer<typeof BaseContentSchema>
