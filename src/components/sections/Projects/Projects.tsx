import { Badge } from '../../ui/Badge'
import { Reveal } from '../../ui/Reveal'
import { projects } from '@/content'

export const Projects = () => {
  return (
    <section
      id="projects"
      className="py-20 px-6 max-w-7xl mx-auto"
      role="region"
      aria-label="Featured projects showcase"
    >
      {/* Section Heading */}
      <Reveal>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-16 text-center tracking-tight">
          Featured Projects
        </h2>
      </Reveal>

      {/* Projects Grid */}
      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        data-testid="projects-grid"
      >
        {projects.map((project, i) => (
          <Reveal key={project.id} delay={i * 100}>
          <article
            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:border-gray-300 dark:hover:border-gray-600 hover:-translate-y-1 hover:shadow-lg dark:hover:shadow-2xl transition-all duration-300"
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
            {project.impact && (
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 font-medium">
                {project.impact}
              </p>
            )}

            {/* Tech Stack */}
            <div
              className="mb-6"
              data-testid={`tech-stack-${project.id}`}
            >
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <Badge key={tech} variant="secondary" size="sm">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Action Links */}
            {project.links && (
              <div className="flex flex-col gap-2">
                {project.links.github && (
                  <a
                    href={project.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-gray-900 dark:bg-blue-600 text-white text-center font-medium rounded hover:bg-gray-800 dark:hover:bg-blue-700 transition-colors duration-200"
                    aria-label={`View ${project.title} source code on GitHub`}
                    tabIndex={0}
                  >
                    GitHub
                  </a>
                )}
                {project.links.live && (
                  <a
                    href={project.links.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-300 text-center font-medium rounded hover:border-gray-400 dark:hover:border-gray-500 transition-colors duration-200"
                    aria-label={`View ${project.title} live demo`}
                    tabIndex={0}
                  >
                    Frontend
                  </a>
                )}
                {project.links.contract && (
                  <a
                    href={project.links.contract}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 border border-orange-300 dark:border-orange-600 text-orange-700 dark:text-orange-300 text-center font-medium rounded hover:border-orange-400 dark:hover:border-orange-500 transition-colors duration-200"
                    aria-label={`View ${project.title} smart contract on Etherscan`}
                    tabIndex={0}
                  >
                    Contract
                  </a>
                )}
              </div>
            )}
          </article>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
