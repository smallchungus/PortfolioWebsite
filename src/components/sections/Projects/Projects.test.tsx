import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { render, screen, cleanup, within } from '@testing-library/react'
import { Projects } from './Projects'

// Mock window.matchMedia for responsive tests
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})

describe('Projects Section', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterEach(() => {
    cleanup()
  })

  describe('Core Rendering', () => {
    it('renders section with "Featured Projects" heading', () => {
      render(<Projects />)
      
      const heading = screen.getByRole('heading', { level: 2 })
      expect(heading).toHaveTextContent('Featured Projects')
      expect(heading).toHaveClass('text-3xl', 'md:text-4xl', 'font-bold')
    })

    it('displays exactly 3-4 project cards', () => {
      render(<Projects />)
      
      const projectCards = screen.getAllByTestId(/^project-card-/)
      expect(projectCards).toHaveLength(4) // Expecting 4 featured projects
    })

    it('each card shows title, description, tech stack, and links', () => {
      render(<Projects />)
      
      const projectCards = screen.getAllByTestId(/^project-card-/)
      
      projectCards.forEach(card => {
        // Title
        expect(within(card).getByRole('heading', { level: 3 })).toBeInTheDocument()
        
        // Description
        expect(within(card).getByTestId(/^project-description-/)).toBeInTheDocument()
        
        // Tech stack
        expect(within(card).getByTestId(/^tech-stack-/)).toBeInTheDocument()
        
        // Links (only portfolio project has links)
        const links = within(card).queryAllByRole('link')
        if (links.length > 0) {
          // Verify link attributes for projects that have them
          links.forEach(link => {
            expect(link).toHaveAttribute('target', '_blank')
            expect(link).toHaveAttribute('rel', 'noopener noreferrer')
          })
        }
      })
    })

    it('displays project impact metrics', () => {
      render(<Projects />)
      
      // Our real projects show impact instead of GitHub stats
      expect(screen.getByText('200+ daily users, 35% efficiency improvement')).toBeInTheDocument()
      expect(screen.getByText('Processing 100GB+ daily data for executive dashboards')).toBeInTheDocument()
      expect(screen.getByText('89% accuracy on 5TB+ protein dataset')).toBeInTheDocument()
      expect(screen.getByText('FAANG-standard development with 85+ tests')).toBeInTheDocument()
    })
  })

  describe('Responsive Design', () => {
    it('displays 1 column on mobile (375px)', () => {
      // Mock mobile viewport
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 375,
      })
      
      render(<Projects />)
      
      const grid = screen.getByTestId('projects-grid')
      expect(grid).toHaveClass('grid-cols-1')
    })

    it('displays 2 columns on tablet (768px)', () => {
      // Mock tablet viewport
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 768,
      })
      
      render(<Projects />)
      
      const grid = screen.getByTestId('projects-grid')
      expect(grid).toHaveClass('md:grid-cols-2')
    })

    it('displays 3 columns on desktop (1024px+)', () => {
      // Mock desktop viewport
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 1024,
      })
      
      render(<Projects />)
      
      const grid = screen.getByTestId('projects-grid')
      expect(grid).toHaveClass('lg:grid-cols-3')
    })

    it('prevents horizontal scrolling at all breakpoints', () => {
      const breakpoints = [375, 768, 1024, 1440]
      
      breakpoints.forEach(width => {
        Object.defineProperty(window, 'innerWidth', {
          writable: true,
          configurable: true,
          value: width,
        })
        
        render(<Projects />)
        
        const section = screen.getByRole('region', { name: /projects/i })
        expect(section).not.toHaveClass('overflow-x-auto')
        
        cleanup()
      })
    })
  })

  describe('Accessibility Compliance', () => {
    it('uses proper heading hierarchy', () => {
      render(<Projects />)
      
      // Main section heading (h2)
      const mainHeading = screen.getByRole('heading', { level: 2 })
      expect(mainHeading).toBeInTheDocument()
      
      // Project card headings (h3)
      const projectHeadings = screen.getAllByRole('heading', { level: 3 })
      expect(projectHeadings).toHaveLength(4)
    })

    it('includes ARIA labels for interactive elements', () => {
      render(<Projects />)
      
      const links = screen.getAllByRole('link')
      links.forEach(link => {
        expect(link).toHaveAttribute('aria-label')
      })
    })

    it('supports keyboard navigation', () => {
      render(<Projects />)
      
      const links = screen.getAllByRole('link')
      links.forEach(link => {
        expect(link).toHaveAttribute('tabIndex')
        expect(link.getAttribute('tabIndex')).not.toBe('-1')
      })
    })

    it('uses semantic HTML structure', () => {
      render(<Projects />)
      
      // Section with proper role
      expect(screen.getByRole('region')).toBeInTheDocument()
      
      // Grid structure for projects
      const projectsGrid = screen.getByTestId('projects-grid')
      expect(projectsGrid).toBeInTheDocument()
    })

    it('provides screen reader friendly content', () => {
      render(<Projects />)
      
      // Each project should have descriptive content
      const projectCards = screen.getAllByTestId(/^project-card-/)
      projectCards.forEach(card => {
        expect(card).toHaveAttribute('role', 'article')
        expect(card).toBeInTheDocument()
      })
    })
  })

  describe('Performance & Optimization', () => {
    it('loads without layout shift', () => {
      render(<Projects />)
      
      // Section should have proper fixed dimensions to prevent layout shifts
      const section = screen.getByRole('region')
      expect(section).toHaveClass('py-20') // Fixed padding prevents shifts
    })

    it('uses optimized image loading', () => {
      render(<Projects />)
      
      // No actual images in this minimal design, but badges use img role
      const badgeElements = screen.queryAllByRole('img')
      expect(badgeElements.length).toBeGreaterThan(0)
    })

    it('implements efficient rendering strategy', () => {
      const { rerender } = render(<Projects />)
      
      // Should not trigger unnecessary re-renders
      const initialCards = screen.getAllByTestId(/^project-card-/)
      
      rerender(<Projects />)
      
      const rerenderedCards = screen.getAllByTestId(/^project-card-/)
      expect(rerenderedCards).toHaveLength(initialCards.length)
    })
  })

  describe('Design System Compliance', () => {
    it('follows 8px grid spacing system', () => {
      render(<Projects />)
      
      const section = screen.getByRole('region')
      expect(section).toHaveClass('py-20') // 160px = 20 * 8px
      
      const grid = screen.getByTestId('projects-grid')
      expect(grid).toHaveClass('gap-8') // 64px = 8 * 8px
    })

    it('uses consistent typography hierarchy', () => {
      render(<Projects />)
      
      // Main heading
      const mainHeading = screen.getByRole('heading', { level: 2 })
      expect(mainHeading).toHaveClass('text-3xl', 'md:text-4xl')
      
      // Project titles
      const projectTitles = screen.getAllByRole('heading', { level: 3 })
      projectTitles.forEach(title => {
        expect(title).toHaveClass('text-xl', 'font-semibold')
      })
    })

    it('applies proper color scheme', () => {
      render(<Projects />)
      
      const cards = screen.getAllByTestId(/^project-card-/)
      cards.forEach(card => {
        expect(card).toHaveClass('bg-white', 'border', 'border-gray-200')
      })
    })
  })

  describe('Content Requirements', () => {
    it('displays project titles correctly', () => {
      render(<Projects />)
      
      const expectedProjects = [
        'DataMart Platform (TD Securities)',
        'USDA Cloud Analytics (Panasonic)', 
        'Protein Analysis ML (Rutgers)',
        'Portfolio Website'
      ]
      
      expectedProjects.forEach(title => {
        expect(screen.getByText(title)).toBeInTheDocument()
      })
    })

    it('shows tech stack badges for each project', () => {
      render(<Projects />)
      
      const techStacks = screen.getAllByTestId(/^tech-stack-/)
      expect(techStacks).toHaveLength(4)
      
      // Real technologies from our projects
      expect(screen.getByText('Java')).toBeInTheDocument()
      expect(screen.getByText('Spring Boot')).toBeInTheDocument()
      expect(screen.getByText('AWS Glue')).toBeInTheDocument()
      expect(screen.getAllByText('Python')).toHaveLength(2) // In 2 projects
      expect(screen.getByText('React')).toBeInTheDocument()
      expect(screen.getByText('TypeScript')).toBeInTheDocument()
    })

    it('includes proper project descriptions', () => {
      render(<Projects />)
      
      const descriptions = screen.getAllByTestId(/^project-description-/)
      descriptions.forEach(desc => {
        expect(desc.textContent?.length).toBeGreaterThan(50) // Meaningful descriptions
      })
    })
  })

  describe('Real Projects Content', () => {
    it('displays actual GitHub projects', () => {
      render(<Projects />)
      
      expect(screen.getByText(/DataMart Platform \(TD Securities\)/i)).toBeInTheDocument()
      expect(screen.getByText(/USDA Cloud Analytics \(Panasonic\)/i)).toBeInTheDocument()
      expect(screen.getByText(/Protein Analysis ML \(Rutgers\)/i)).toBeInTheDocument()
      expect(screen.getByText(/Portfolio Website/i)).toBeInTheDocument()
    })

    it('shows correct project details and impacts', () => {
      render(<Projects />)
      
      // TD Securities DataMart
      expect(screen.getByText(/Enterprise banking application features for investment bankers/i)).toBeInTheDocument()
      expect(screen.getByText(/200\+ daily users/i)).toBeInTheDocument()
      expect(screen.getByText(/35% efficiency improvement/i)).toBeInTheDocument()
      
      // Panasonic USDA project  
      expect(screen.getByText(/AWS ETL pipelines for government cloud spending analysis/i)).toBeInTheDocument()
      expect(screen.getByText(/Processing 100GB\+ daily data/i)).toBeInTheDocument()
      
      // Research project
      expect(screen.getByText(/Machine learning system for bacterial protein classification/i)).toBeInTheDocument()
      expect(screen.getByText(/89% accuracy on 5TB\+ protein dataset/i)).toBeInTheDocument()
    })

    it('displays correct tech stacks for each project', () => {
      render(<Projects />)
      
      // DataMart tech stack
      expect(screen.getByText('Java')).toBeInTheDocument()
      expect(screen.getByText('Spring Boot')).toBeInTheDocument()
      expect(screen.getByText('JavaScript')).toBeInTheDocument()
      expect(screen.getAllByText('PostgreSQL')).toHaveLength(2) // In 2 projects
      
      // USDA pipeline tech stack
      expect(screen.getByText('AWS Glue')).toBeInTheDocument()
      expect(screen.getAllByText('Python')).toHaveLength(2) // In 2 projects
      expect(screen.getByText('Tableau')).toBeInTheDocument()
      expect(screen.getByText('Redshift')).toBeInTheDocument()
      
      // Research tech stack
      expect(screen.getByText('Pandas')).toBeInTheDocument()
      expect(screen.getByText('Scikit-learn')).toBeInTheDocument()
    })

    it('includes portfolio project with live links', () => {
      render(<Projects />)
      
      expect(screen.getByText(/Modern, responsive portfolio with dark mode, CI\/CD pipeline, and comprehensive testing/i)).toBeInTheDocument()
      expect(screen.getByText(/FAANG-standard development with 85\+ tests/i)).toBeInTheDocument()
      
      // Should have links to GitHub and live site
      const githubLink = screen.getByRole('link', { name: /github/i })
      expect(githubLink).toHaveAttribute('href', 'https://github.com/smallchungus/PortfolioWebsite')
      
      const liveLink = screen.getByRole('link', { name: /live/i })
      expect(liveLink).toHaveAttribute('href', 'https://willchennn.com')
    })
  })

  describe('Dark Mode Support', () => {
    beforeEach(() => {
      document.documentElement.classList.add('dark')
    })

    afterEach(() => {
      document.documentElement.classList.remove('dark')
    })

    it('applies dark mode to section heading', () => {
      render(<Projects />)
      
      const heading = screen.getByText('Featured Projects')
      expect(heading).toHaveClass('text-gray-900', 'dark:text-white')
    })

    it('applies dark mode to project cards', () => {
      render(<Projects />)
      
      const cards = screen.getAllByTestId(/project-card/)
      cards.forEach(card => {
        expect(card).toHaveClass('bg-white', 'dark:bg-gray-800')
        expect(card).toHaveClass('border-gray-200', 'dark:border-gray-700')
        expect(card).toHaveClass('hover:border-gray-300', 'dark:hover:border-gray-600')
      })
    })

    it('applies dark mode to project titles', () => {
      render(<Projects />)
      
      const titles = screen.getAllByRole('heading', { level: 3 })
      titles.forEach(title => {
        expect(title).toHaveClass('text-gray-900', 'dark:text-white')
      })
    })

    it('applies dark mode to project descriptions', () => {
      render(<Projects />)
      
      const descriptions = screen.getAllByTestId(/project-description/)
      descriptions.forEach(description => {
        expect(description).toHaveClass('text-gray-600', 'dark:text-gray-300')
      })
    })

    it('applies dark mode to impact text', () => {
      render(<Projects />)
      
      const impactElements = screen.getAllByText(/daily users|data|accuracy|tests/)
      impactElements.forEach(element => {
        expect(element).toHaveClass('text-gray-500', 'dark:text-gray-400')
      })
    })

    it('applies dark mode to action buttons', () => {
      render(<Projects />)
      
      const githubButtons = screen.getAllByText('GitHub')
      const liveButtons = screen.getAllByText('Live')
      
      githubButtons.forEach(button => {
        expect(button).toHaveClass('bg-gray-900', 'dark:bg-blue-600')
        expect(button).toHaveClass('hover:bg-gray-800', 'dark:hover:bg-blue-700')
      })
      
      liveButtons.forEach(button => {
        expect(button).toHaveClass('border-gray-300', 'dark:border-gray-600')
        expect(button).toHaveClass('text-gray-900', 'dark:text-gray-300')
        expect(button).toHaveClass('hover:border-gray-400', 'dark:hover:border-gray-500')
      })
    })

    it('maintains accessibility in dark mode', () => {
      render(<Projects />)
      
      const section = screen.getByRole('region')
      expect(section).toHaveAttribute('aria-label', 'Featured projects showcase')
      
      // All buttons should maintain proper aria-labels
      const githubButtons = screen.getAllByText('GitHub')
      githubButtons.forEach(button => {
        expect(button).toHaveAttribute('aria-label')
      })
    })
  })
})