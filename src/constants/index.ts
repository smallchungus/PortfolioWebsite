// Application constants

export const SITE_CONFIG = {
  name: 'Will Chen',
  title: 'Will Chen - Software Engineer',
  description: 'Master\'s in Computer Science student at Arizona State University. Software engineer with experience in investment banking and data engineering.',
  url: 'https://willchennn.com',
  ogImage: 'https://willchennn.com/og-image.jpg',
  creator: '@willchennn'
} as const

export const CONTACT_INFO = {
  email: 'will@willchennn.com',
  linkedin: 'https://linkedin.com/in/willchennn',
  github: 'https://github.com/smallchungus',
  location: 'Phoenix, AZ'
} as const

export const SKILLS = {
  Languages: ['Java', 'Python', 'JavaScript', 'TypeScript', 'SQL'],
  Backend: ['Spring Boot', 'Node.js', 'PostgreSQL', 'AWS Glue'],
  Frontend: ['React', 'Tailwind CSS', 'Vite', 'HTML/CSS'],
  Cloud: ['AWS', 'Vercel', 'Redshift', 'Athena'],
  Tools: ['Git', 'Docker', 'Tableau', 'IntelliJ IDEA']
} as const

export const PROJECTS = [
  {
    id: 'datamart',
    title: 'DataMart Platform Features',
    description: 'Built DataMart features for TD Securities internal banking application',
    technologies: ['Java', 'Spring Boot', 'JavaScript', 'PostgreSQL'],
    impact: '200+ daily users, 35% time reduction'
  },
  {
    id: 'usda-pipeline',
    title: 'USDA Cloud Spending Pipeline',
    description: 'Developed AWS ETL pipelines for government cloud spending data',
    technologies: ['Python', 'AWS Glue', 'Tableau', 'Redshift'],
    impact: 'Processing 100GB+ daily data'
  },
  {
    id: 'protein-analysis',
    title: 'Protein Pattern Analysis',
    description: 'Built ML models for bacterial protein classification',
    technologies: ['Python', 'Pandas', 'Scikit-learn', 'PostgreSQL'],
    impact: '89% classification accuracy'
  },
  {
    id: 'portfolio',
    title: 'Portfolio Website',
    description: 'Modern, minimal portfolio built with React and TypeScript',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Vite'],
    impact: 'TDD approach with 98% test coverage',
    links: {
      github: 'https://github.com/smallchungus/PortfolioWebsite',
      live: 'https://willchennn.com'
    }
  }
] as const

export const EXPERIENCE = [
  {
    id: 'td-securities',
    title: 'Software Engineering Intern',
    company: 'TD Securities',
    description: 'Built DataMart features for 200+ investment bankers, reducing expense categorization time by 35%',
    duration: 'Summer 2024',
    technologies: ['Java', 'Spring Boot', 'JavaScript', 'PostgreSQL']
  },
  {
    id: 'panasonic',
    title: 'Data Engineering Intern', 
    company: 'Panasonic',
    description: 'Developed AWS ETL pipelines for USDA cloud spending data processing',
    duration: 'Summer 2023',
    technologies: ['Python', 'AWS Glue', 'Tableau', 'Redshift']
  },
  {
    id: 'rutgers-research',
    title: 'Research Assistant',
    company: 'Rutgers University',
    description: 'Built ML models for bacterial protein pattern classification with 89% accuracy',
    duration: '2022-2023',
    technologies: ['Python', 'Pandas', 'Scikit-learn', 'PostgreSQL']
  }
] as const

export const EDUCATION = [
  {
    id: 'asu-masters',
    degree: 'Master\'s in Computer Science',
    institution: 'Arizona State University',
    status: 'Current Student • GPA 4.0',
    duration: '2023 - Present'
  }
] as const

// Animation and UI constants
export const TYPING_ROLES = [
  'Software Engineer',
  'Full Stack Developer', 
  'Data Engineer',
  'Problem Solver'
] as const

export const ANIMATION_DELAYS = {
  fast: 150,
  normal: 300,
  slow: 500
} as const

export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536
} as const