// Global type definitions for the application

export interface Project {
  id: string
  title: string
  description: string
  technologies: string[]
  impact: string
  links?: {
    github?: string
    live?: string
    demo?: string
  }
}

export interface Skill {
  id: string
  name: string
  category: 'Languages' | 'Backend' | 'Frontend' | 'Cloud' | 'Tools'
  level?: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert'
}

export interface Experience {
  id: string
  title: string
  company: string
  description: string
  duration: string
  technologies: string[]
}

export interface Education {
  id: string
  degree: string
  institution: string
  status: string
  gpa?: string
  duration?: string
}

export interface ContactForm {
  name: string
  email: string
  subject: string
  message: string
}

// Component prop types
export interface ComponentProps {
  className?: string
  children?: React.ReactNode
}

// Utility types
export type Theme = 'light' | 'dark'
export type Status = 'idle' | 'loading' | 'success' | 'error'
export type Size = 'sm' | 'md' | 'lg' | 'xl'
export type Variant = 'primary' | 'secondary' | 'success' | 'warning' | 'error'