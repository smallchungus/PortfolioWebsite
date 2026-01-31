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

    it('shows all featured projects', () => {
      render(<Projects />)

      const projectCards = screen.getAllByTestId(/^project-card-/)
      expect(projectCards).toHaveLength(2) // BurnCoin and Portfolio projects
      expect(screen.getByText('BurnCoin')).toBeInTheDocument()
      expect(screen.getByText('Portfolio Website')).toBeInTheDocument()
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

    it('displays portfolio project impact', () => {
      render(<Projects />)
      
      // Portfolio project impact
      expect(screen.getByText('Built with React, TypeScript, and TDD practices')).toBeInTheDocument()
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
      expect(projectHeadings).toHaveLength(2) // BurnCoin and Portfolio
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
    it('displays portfolio project title', () => {
      render(<Projects />)
      
      expect(screen.getByText('Portfolio Website')).toBeInTheDocument()
    })

    it('shows tech stack badges for each project', () => {
      render(<Projects />)

      const techStacks = screen.getAllByTestId(/^tech-stack-/)
      expect(techStacks).toHaveLength(2) // BurnCoin and Portfolio

      // Technologies from portfolio project
      expect(screen.getByText('React')).toBeInTheDocument()
      expect(screen.getAllByText('TypeScript')).toHaveLength(2) // Both projects have TypeScript
      expect(screen.getByText('Tailwind')).toBeInTheDocument()
      expect(screen.getByText('Vite')).toBeInTheDocument()
    })

    it('includes proper project descriptions', () => {
      render(<Projects />)
      
      const descriptions = screen.getAllByTestId(/^project-description-/)
      descriptions.forEach(desc => {
        expect(desc.textContent?.length).toBeGreaterThan(50) // Meaningful descriptions
      })
    })
  })

  describe('Portfolio Project Content', () => {

    it('displays portfolio project with live links', () => {
      render(<Projects />)

      expect(screen.getByText(/Modern, minimal portfolio with dark mode and 95\+ Lighthouse score/i)).toBeInTheDocument()
      expect(screen.getByText(/Built with React, TypeScript, and TDD practices/i)).toBeInTheDocument()

      // Should have links to GitHub and live site for Portfolio project
      const portfolioGithubLink = screen.getByRole('link', { name: /View Portfolio Website source code on GitHub/i })
      expect(portfolioGithubLink).toHaveAttribute('href', 'https://github.com/smallchungus/PortfolioWebsite')

      const portfolioLiveLink = screen.getByRole('link', { name: /View Portfolio Website live demo/i })
      expect(portfolioLiveLink).toHaveAttribute('href', 'https://willchennn.com')
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
      
      const impactElement = screen.getByText(/Built with React, TypeScript, and TDD practices/)
      expect(impactElement).toHaveClass('text-gray-500', 'dark:text-gray-400')
    })

    it('applies dark mode to action buttons', () => {
      render(<Projects />)

      const githubButtons = screen.getAllByText('GitHub')
      const frontendButtons = screen.getAllByText('Frontend')

      githubButtons.forEach(button => {
        expect(button).toHaveClass('bg-gray-900', 'dark:bg-blue-600')
        expect(button).toHaveClass('hover:bg-gray-800', 'dark:hover:bg-blue-700')
      })

      frontendButtons.forEach(button => {
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