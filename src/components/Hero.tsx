import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const ROLES = ['Software Engineer', 'Full Stack Developer', 'Big Data Engineer']
const TECH_STACK = ['TypeScript', 'React', 'Node.js', 'Python', 'AWS']

export const Hero = () => {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0)
  const [displayedText, setDisplayedText] = useState('')
  const [isTyping, setIsTyping] = useState(true)

  useEffect(() => {
    const currentRole = ROLES[currentRoleIndex]
    let currentCharIndex = 0

    if (isTyping) {
      const typingTimer = setInterval(() => {
        if (currentCharIndex <= currentRole.length) {
          setDisplayedText(currentRole.slice(0, currentCharIndex))
          currentCharIndex++
        } else {
          setIsTyping(false)
          setTimeout(() => {
            setIsTyping(true)
            setCurrentRoleIndex((prev) => (prev + 1) % ROLES.length)
          }, 2000)
          clearInterval(typingTimer)
        }
      }, 100)

      return () => clearInterval(typingTimer)
    }
  }, [currentRoleIndex, isTyping])

  return (
    <section 
      data-testid="hero-section"
      className="min-h-screen flex items-center justify-center px-4 py-20"
      role="banner"
    >
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
          Will Chen
        </h1>
        
        <h2 className="text-2xl md:text-3xl text-gray-600 mb-8 h-12 flex items-center justify-center">
          <span data-testid="typing-role" className="font-light">
            {displayedText}
            <span className="animate-pulse">|</span>
          </span>
        </h2>

        <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
          Building scalable applications and data pipelines with modern technologies. 
          Passionate about clean code, performance, and user experience.
        </p>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {TECH_STACK.map((tech) => (
            <span 
              key={tech}
              className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/projects"
            className="px-8 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
          >
            View Projects
          </Link>
          <Link
            to="/contact"
            className="px-8 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
          >
            Contact Me
          </Link>
        </div>
      </div>
    </section>
  )
}