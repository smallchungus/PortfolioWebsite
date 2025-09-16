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

const PROJECT_DATA: ProjectData[] = [
  {
    id: 'burncoin',
    title: 'BurnCoin',
    description: 'Deflationary ERC-20 token that burns 1% on every transfer with community daily burns',
    impact: 'Smart contract deployed on Ethereum Sepolia with 20+ comprehensive tests',
    techStack: ['Solidity', 'Hardhat', 'Next.js', 'ethers.js', 'TypeScript'],
    githubUrl: 'https://github.com/smallchungus/BurnCoin',
    liveUrl: 'https://sepolia.etherscan.io/address/0xB23772d26e1b7eaA24E6D63eeFb29B405bcAd24a',
    featured: true
  },
  {
    id: 'portfolio',
    title: 'Portfolio Website',
    description: 'Modern, minimal portfolio with dark mode and 95+ Lighthouse score',
    impact: 'Built with React, TypeScript, and TDD practices',
    techStack: ['React', 'TypeScript', 'Tailwind', 'Vite'],
    githubUrl: 'https://github.com/smallchungus/PortfolioWebsite',
    liveUrl: 'https://willchennn.com',
    featured: true
  }
]

export const Projects = () => {
  return (
    <section 
      id="projects"
      className="py-20 px-6 max-w-7xl mx-auto"
      role="region"
      aria-label="Featured projects showcase"
    >
      {/* Section Heading */}
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-16 text-center">
        Featured Projects
      </h2>

      {/* Projects Grid */}
      <div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        data-testid="projects-grid"
      >
        {PROJECT_DATA.map((project) => (
          <article
            key={project.id}
            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:border-gray-300 dark:hover:border-gray-600 transition-colors duration-200"
            data-testid={`project-card-${project.id}`}
            role="article"
          >
            {/* Project Title */}
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              {project.title}
            </h3>

            {/* Project Description */}
            <p 
              className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed"
              data-testid={`project-description-${project.id}`}
            >
              {project.description}
            </p>

            {/* Impact */}
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 font-medium">
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
                    className="flex-1 px-4 py-2 bg-gray-900 dark:bg-blue-600 text-white text-center font-medium rounded hover:bg-gray-800 dark:hover:bg-blue-700 transition-colors duration-200"
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
                    className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-300 text-center font-medium rounded hover:border-gray-400 dark:hover:border-gray-500 transition-colors duration-200"
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