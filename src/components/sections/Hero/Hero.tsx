import { useCallback, useMemo } from 'react'
import { useTypingAnimation } from '../../../hooks/useTypingAnimation'
import { Badge } from '../../ui/Badge'
import { Reveal } from '../../ui/Reveal'
import { heroContent, RESUME_PATH } from '@/content'

export const Hero = () => {
  const { displayedText, prefersReducedMotion } = useTypingAnimation({
    strings: heroContent.roles,
    typeSpeed: 100,
    pauseDuration: 2000,
    loop: true,
  })

  const handleViewProjects = useCallback(() => {
    const projectsSection = document.querySelector('#projects')
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' })
    } else {
      // Fallback scroll to projects section
      window.scrollTo({
        top: window.innerHeight,
        behavior: 'smooth'
      })
    }
  }, [])

  const handleViewResume = useCallback(() => {
    window.open(RESUME_PATH, '_blank')
  }, [])

  const techBadges = useMemo(() =>
    heroContent.techStack.map((tech) => (
      <Badge
        key={tech}
        aria-label={`${tech} technology badge`}
        data-testid="tech-badge"
      >
        {tech}
      </Badge>
    )), []
  )

  return (
    <section aria-label="Hero wrapper" className="bg-white dark:bg-gray-900 transition-colors duration-300">
      <section
        data-testid="hero-section"
        className="min-h-screen flex items-center justify-center px-4 md:px-8 py-20"
        aria-label="Hero section"
      >
        <div className="container mx-auto text-center max-w-4xl">
          {/* Main heading */}
          <Reveal>
            <h1 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight text-gray-900 dark:text-white mb-8 font-inter bg-gradient-to-br from-gray-900 via-gray-800 to-gray-500 dark:from-white dark:via-gray-100 dark:to-gray-400 bg-clip-text [-webkit-text-fill-color:transparent]">
              Will Chen
            </h1>
          </Reveal>

          {/* Typing animation role */}
          <Reveal delay={120}>
            <h2 className="text-2xl md:text-3xl lg:text-4xl text-gray-600 dark:text-gray-300 mb-8 h-16 flex items-center justify-center">
              <span
                data-testid="typing-role"
                className="font-light tracking-tight"
              >
                {displayedText}
                {!prefersReducedMotion && <span className="animate-pulse ml-1">|</span>}
              </span>
            </h2>
          </Reveal>

          {/* Description */}
          <Reveal delay={220}>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
              {heroContent.description}
            </p>
          </Reveal>

          {/* Tech stack badges */}
          <Reveal delay={320}>
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {techBadges}
            </div>
          </Reveal>

          {/* CTA buttons */}
          <Reveal delay={420}>
            <div
              data-testid="cta-buttons"
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <button
                onClick={handleViewProjects}
                className="px-8 py-3 bg-gray-900 dark:bg-blue-600 text-white rounded-lg hover:bg-gray-800 dark:hover:bg-blue-700 hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-gray-500 dark:focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
                aria-label="View projects section"
              >
                View Projects
              </button>
              <button
                onClick={handleViewResume}
                className="px-8 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 hover:-translate-y-0.5 hover:shadow-md transition-all duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-gray-500 dark:focus:ring-gray-400 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
                aria-label="View resume PDF"
              >
                View Resume
              </button>
            </div>
          </Reveal>
        </div>
      </section>
    </section>
  )
}
