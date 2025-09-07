import { useCallback, useMemo } from 'react'
import { useTypingAnimation } from '../../../hooks/useTypingAnimation'
import { Badge } from '../../ui/Badge'
import { ThemeToggle } from '../../common/ThemeToggle'

const ROLES = ['Software Engineer', 'Full-Stack Developer', 'MS CS Student @ ASU', 'May 2025 Graduate']
const TECH_STACK = ['React', 'TypeScript', 'Python', 'Node.js', 'SQL']

export const Hero = () => {
  const { displayedText, prefersReducedMotion } = useTypingAnimation({
    strings: ROLES,
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

  const handleDownloadResume = useCallback(() => {
    // Open resume PDF in new tab
    window.open('/resume.pdf', '_blank')
  }, [])

  const techBadges = useMemo(() => 
    TECH_STACK.map((tech) => (
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
    <main role="main" className="bg-white dark:bg-gray-900 transition-colors duration-300">
      {/* Theme toggle in top right */}
      <div className="fixed top-6 right-6 z-50">
        <ThemeToggle />
      </div>

      <section 
        data-testid="hero-section"
        className="min-h-screen flex items-center justify-center px-4 md:px-8 py-20"
        aria-label="Hero section"
      >
        <div className="container mx-auto text-center max-w-4xl">
          {/* Main heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-8 font-inter">
            Will Chen
          </h1>
          
          {/* Typing animation role */}
          <h2 className="text-2xl md:text-3xl lg:text-4xl text-gray-600 dark:text-gray-300 mb-8 h-16 flex items-center justify-center">
            <span 
              data-testid="typing-role" 
              className="font-light"
            >
              {displayedText}
              {!prefersReducedMotion && <span className="animate-pulse ml-1">|</span>}
            </span>
          </h2>

          {/* Description */}
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            Building scalable applications and solving complex problems with modern technologies. 
            Passionate about clean code, performance, and exceptional user experiences.
          </p>

          {/* Tech stack badges */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {techBadges}
          </div>

          {/* CTA buttons */}
          <div 
            data-testid="cta-buttons" 
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button
              onClick={handleViewProjects}
              className="px-8 py-3 bg-gray-900 dark:bg-blue-600 text-white rounded-lg hover:bg-gray-800 dark:hover:bg-blue-700 transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-gray-500 dark:focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
              aria-label="View projects section"
            >
              View Projects
            </button>
            <button
              onClick={handleDownloadResume}
              className="px-8 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-gray-500 dark:focus:ring-gray-400 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
              aria-label="Download resume PDF"
            >
              Download Resume
            </button>
          </div>
        </div>
      </section>
    </main>
  )
}