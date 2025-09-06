import { Badge } from '../../ui/Badge'

interface ProjectData {
  id: string
  title: string
  description: string
  techStack: string[]
  githubUrl: string
  liveUrl: string
  stats?: {
    stars: number
    forks: number
  }
}

const FEATURED_PROJECTS: ProjectData[] = [
  {
    id: 'ecommerce-platform',
    title: 'E-Commerce Platform',
    description: 'Full-stack e-commerce solution with React frontend, Node.js backend, and PostgreSQL database. Features include user authentication, product catalog, shopping cart, payment integration with Stripe, and admin dashboard.',
    techStack: ['React', 'TypeScript', 'Node.js', 'Express', 'PostgreSQL', 'Stripe'],
    githubUrl: 'https://github.com/willchen/ecommerce-platform',
    liveUrl: 'https://ecommerce-demo.willchen.dev',
    stats: { stars: 47, forks: 12 }
  },
  {
    id: 'task-management-app',
    title: 'Task Management App',
    description: 'Collaborative task management application built with React and Firebase. Real-time updates, drag-and-drop functionality, team collaboration features, and responsive design for mobile and desktop.',
    techStack: ['React', 'TypeScript', 'Firebase', 'Tailwind CSS', 'Vite'],
    githubUrl: 'https://github.com/willchen/task-manager',
    liveUrl: 'https://tasks.willchen.dev',
    stats: { stars: 23, forks: 8 }
  },
  {
    id: 'weather-dashboard',
    title: 'Weather Dashboard',
    description: 'Modern weather application using OpenWeatherMap API. Features include current weather, 5-day forecast, location search, and data visualization with charts. Built with Python Flask backend and React frontend.',
    techStack: ['React', 'Python', 'Flask', 'Chart.js', 'OpenWeatherMap API'],
    githubUrl: 'https://github.com/willchen/weather-dashboard',
    liveUrl: 'https://weather.willchen.dev',
    stats: { stars: 15, forks: 5 }
  },
  {
    id: 'portfolio-website',
    title: 'Portfolio Website',
    description: 'This very website! Built with React, TypeScript, and Tailwind CSS following modern design principles. Features Test-Driven Development, comprehensive test coverage, and performance optimization.',
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'Vitest'],
    githubUrl: 'https://github.com/willchen/portfolio',
    liveUrl: 'https://willchen.dev',
    stats: { stars: 8, forks: 2 }
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
              className="text-gray-600 mb-6 leading-relaxed"
              data-testid={`project-description-${project.id}`}
            >
              {project.description}
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

            {/* GitHub Stats */}
            {project.stats && (
              <div 
                className="flex items-center gap-4 mb-6 text-sm text-gray-600"
                data-testid={`github-stats-${project.id}`}
              >
                <span className="flex items-center gap-1">
                  <span>⭐</span>
                  <span>{project.stats.stars}</span>
                </span>
                <span className="flex items-center gap-1">
                  <span>🍴</span>
                  <span>{project.stats.forks}</span>
                </span>
              </div>
            )}

            {/* Action Links */}
            <div className="flex gap-4">
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
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-900 text-center font-medium rounded hover:border-gray-400 transition-colors duration-200"
                aria-label={`View ${project.title} live demo`}
                tabIndex={0}
              >
                Live Demo
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}