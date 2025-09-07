import { Badge } from '../../ui/Badge'

interface ProjectData {
  id: string
  title: string
  description: string
  impact: string
  techStack: string[]
  githubUrl?: string
  liveUrl?: string
  featured?: boolean
}

const FEATURED_PROJECTS: ProjectData[] = [
  {
    id: 'datamart',
    title: 'DataMart Platform Features',
    description: 'Full-stack development for TD Securities internal banking application',
    impact: '200+ daily users, 35% time reduction',
    techStack: ['Java', 'Spring Boot', 'JavaScript', 'PostgreSQL'],
    featured: true
  },
  {
    id: 'cloud-analytics',
    title: 'USDA Cloud Spending Pipeline',
    description: 'ETL pipeline processing government cloud spending data for executive dashboards',
    impact: 'Processing 100GB+ daily data',
    techStack: ['AWS Glue', 'Python', 'Tableau', 'Redshift']
  },
  {
    id: 'protein-analysis',
    title: 'Protein Pattern Analysis',
    description: 'ML system for bacterial protein classification from mass spectrometry data',
    impact: '89% classification accuracy',
    techStack: ['Python', 'PostgreSQL', 'Pandas', 'Scikit-learn']
  },
  {
    id: 'portfolio',
    title: 'Portfolio Website',
    description: 'Modern, minimal portfolio with 95+ Lighthouse score',
    impact: 'TDD approach with 98% test coverage',
    techStack: ['React', 'TypeScript', 'Tailwind', 'Vite'],
    githubUrl: 'https://github.com/smallchungus/PortfolioWebsite',
    liveUrl: 'https://willchennn.com'
  }
]

export const Projects = () => {
  return (
    <section 
      className="py-20 px-6 max-w-7xl mx-auto"
      role="region"
      aria-label="Featured projects showcase"
    >
      {/* Section Heading */}
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-16 text-center">
        Featured Projects
      </h2>

      {/* Projects Grid */}
      <div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        data-testid="projects-grid"
      >
        {FEATURED_PROJECTS.map((project) => (
          <article
            key={project.id}
            className="bg-white border border-gray-200 rounded-lg p-6 hover:border-gray-300 transition-colors duration-200"
            data-testid={`project-card-${project.id}`}
            role="article"
          >
            {/* Project Title */}
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              {project.title}
            </h3>

            {/* Project Description */}
            <p 
              className="text-gray-600 mb-4 leading-relaxed"
              data-testid={`project-description-${project.id}`}
            >
              {project.description}
            </p>

            {/* Impact */}
            <p className="text-sm text-gray-500 mb-6 font-medium">
              {project.impact}
            </p>

            {/* Tech Stack */}
            <div 
              className="mb-6"
              data-testid={`tech-stack-${project.id}`}
            >
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <Badge key={tech} variant="secondary" size="sm">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Action Links */}
            {(project.githubUrl || project.liveUrl) && (
              <div className="flex gap-4">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 px-4 py-2 bg-gray-900 text-white text-center font-medium rounded hover:bg-gray-800 transition-colors duration-200"
                    aria-label={`View ${project.title} source code on GitHub`}
                    tabIndex={0}
                  >
                    GitHub
                  </a>
                )}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-900 text-center font-medium rounded hover:border-gray-400 transition-colors duration-200"
                    aria-label={`View ${project.title} live demo`}
                    tabIndex={0}
                  >
                    Live
                  </a>
                )}
              </div>
            )}
          </article>
        ))}
      </div>
    </section>
  )
}