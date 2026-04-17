import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { render, screen, cleanup } from '@testing-library/react'
import { About } from './About'
import { skills } from '@/content'

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

describe('About Section', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterEach(() => {
    cleanup()
  })

  describe('Core Rendering', () => {
    it('renders section with "About Me" heading', () => {
      render(<About />)
      
      const heading = screen.getByRole('heading', { level: 2 })
      expect(heading).toHaveTextContent('About Me')
      expect(heading).toHaveClass('text-3xl', 'md:text-4xl', 'font-bold')
    })

    it('displays professional summary paragraph', () => {
      render(<About />)

      const summary = screen.getByTestId('professional-summary')
      expect(summary).toBeInTheDocument()
      expect(summary.textContent?.length).toBeGreaterThan(150) // Substantial content
    })

    it('shows skills grid with categories', () => {
      render(<About />)

      const skillsGrid = screen.getByTestId('skills-grid')
      expect(skillsGrid).toBeInTheDocument()

      // Data-driven: every category from Notion content should be rendered.
      // Keeps the assertion correct as the resume evolves.
      const categories = Object.keys(skills)
      expect(categories.length).toBeGreaterThanOrEqual(2)
      categories.forEach((category) => {
        expect(screen.getByText(category)).toBeInTheDocument()
      })
    })

    it('displays experience highlights without timeline', () => {
      render(<About />)
      
      const experienceSection = screen.getByTestId('experience-highlights')
      expect(experienceSection).toBeInTheDocument()
      
      // Should NOT contain timeline elements
      expect(screen.queryByTestId('timeline')).not.toBeInTheDocument()
      expect(screen.queryByText(/timeline/i)).not.toBeInTheDocument()
    })

    it('includes education information', () => {
      render(<About />)

      const education = screen.getByTestId('education-section')
      expect(education).toBeInTheDocument()

      // Should show MS Analytics @ Georgia Tech and BA CS/Psych @ Rutgers
      expect(screen.getAllByText(/Analytics/i).length).toBeGreaterThanOrEqual(1)
      expect(screen.getAllByText(/Computer Science/i).length).toBeGreaterThanOrEqual(1)
      expect(screen.getAllByText(/Georgia/i).length).toBeGreaterThanOrEqual(1)
      expect(screen.getAllByText(/Rutgers/i).length).toBeGreaterThanOrEqual(1)
    })
  })

  describe('Responsive Design', () => {
    it('adjusts layout for mobile (375px)', () => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 375,
      })
      
      render(<About />)
      
      const skillsGrid = screen.getByTestId('skills-grid')
      expect(skillsGrid).toHaveClass('grid-cols-1')
    })

    it('shows 2-column layout on tablet (768px)', () => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 768,
      })
      
      render(<About />)
      
      const skillsGrid = screen.getByTestId('skills-grid')
      expect(skillsGrid).toHaveClass('md:grid-cols-2')
    })

    it('displays 3-column layout on desktop (1024px+)', () => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 1024,
      })
      
      render(<About />)
      
      const skillsGrid = screen.getByTestId('skills-grid')
      expect(skillsGrid).toHaveClass('lg:grid-cols-3')
    })

    it('maintains readable text width at all breakpoints', () => {
      const breakpoints = [375, 768, 1024, 1440]
      
      breakpoints.forEach(width => {
        Object.defineProperty(window, 'innerWidth', {
          writable: true,
          configurable: true,
          value: width,
        })
        
        render(<About />)
        
        const summary = screen.getByTestId('professional-summary')
        expect(summary).toHaveClass('max-w-4xl') // Limit line length for readability
        
        cleanup()
      })
    })
  })

  describe('Accessibility Compliance', () => {
    it('uses proper heading hierarchy', () => {
      render(<About />)
      
      // Main section heading (h2)
      const mainHeading = screen.getByRole('heading', { level: 2 })
      expect(mainHeading).toBeInTheDocument()
      
      // Subsection headings (h3)
      const subHeadings = screen.getAllByRole('heading', { level: 3 })
      expect(subHeadings.length).toBeGreaterThan(0)
    })

    it('provides semantic HTML structure', () => {
      render(<About />)
      
      // Section with proper role
      expect(screen.getByRole('region')).toBeInTheDocument()
      
      // Paragraph content should be in <p> tags
      const summary = screen.getByTestId('professional-summary')
      expect(summary.tagName).toBe('P')
    })

    it('includes proper ARIA labels', () => {
      render(<About />)
      
      const skillsGrid = screen.getByTestId('skills-grid')
      expect(skillsGrid).toHaveAttribute('aria-label', 'Technical skills organized by category')
      
      const experienceSection = screen.getByTestId('experience-highlights')
      expect(experienceSection).toHaveAttribute('aria-label', 'Professional experience highlights')
    })

    it('supports keyboard navigation', () => {
      render(<About />)
      
      // Any interactive elements should be keyboard accessible
      const interactiveElements = screen.queryAllByRole('button')
      interactiveElements.forEach(element => {
        expect(element).not.toHaveAttribute('tabIndex', '-1')
      })
    })

    it('provides screen reader friendly content', () => {
      render(<About />)
      
      // Skills should have clear labels
      const skillItems = screen.getAllByTestId(/^skill-item-/)
      skillItems.forEach(skill => {
        expect(skill).toHaveAttribute('role', 'listitem')
      })
    })
  })

  describe('Performance & Optimization', () => {
    it('loads without layout shift', () => {
      render(<About />)
      
      // Text content should not cause layout shifts
      const section = screen.getByRole('region')
      expect(section).toHaveClass('py-20') // Fixed padding prevents shifts
    })

    it('implements efficient rendering', () => {
      const { rerender } = render(<About />)
      
      const initialSummary = screen.getByTestId('professional-summary')
      
      rerender(<About />)
      
      const rerenderedSummary = screen.getByTestId('professional-summary')
      expect(rerenderedSummary.textContent).toBe(initialSummary.textContent)
    })

    it('avoids unnecessary re-renders', () => {
      render(<About />)
      
      // Static content should not change between renders
      const skillsGrid = screen.getByTestId('skills-grid')
      const initialChildCount = skillsGrid.children.length
      
      // Component should maintain consistent child count
      expect(initialChildCount).toBeGreaterThan(0)
    })
  })

  describe('Design System Compliance', () => {
    it('follows 8px grid spacing system', () => {
      render(<About />)
      
      const section = screen.getByRole('region')
      expect(section).toHaveClass('py-20') // 160px = 20 * 8px
      
      const skillsGrid = screen.getByTestId('skills-grid')
      expect(skillsGrid).toHaveClass('gap-6') // 48px = 6 * 8px
    })

    it('uses consistent typography hierarchy', () => {
      render(<About />)
      
      // Main heading
      const mainHeading = screen.getByRole('heading', { level: 2 })
      expect(mainHeading).toHaveClass('text-3xl', 'md:text-4xl')
      
      // Section headings
      const sectionHeadings = screen.getAllByRole('heading', { level: 3 })
      sectionHeadings.forEach(heading => {
        expect(heading).toHaveClass('text-xl', 'font-semibold')
      })
      
      // Body text
      const summary = screen.getByTestId('professional-summary')
      expect(summary).toHaveClass('text-lg')
    })

    it('applies minimal brutalist color scheme', () => {
      render(<About />)
      
      // Should use gray color palette
      const mainHeading = screen.getByRole('heading', { level: 2 })
      expect(mainHeading).toHaveClass('text-gray-900')
      
      const summary = screen.getByTestId('professional-summary')
      expect(summary).toHaveClass('text-gray-600')
    })
  })

  describe('Content Requirements', () => {
    it('displays comprehensive professional summary', () => {
      render(<About />)

      const summary = screen.getByTestId('professional-summary')
      const text = summary.textContent || ''

      // Summary is now data-driven from heroContent.description — assert
      // against themes rather than specific company/school names, since those
      // live in the experience and education cards.
      expect(text).toMatch(/ETL pipelines|distributed systems|data infrastructure/i)
    })

    it('shows organized technical skills', () => {
      render(<About />)

      // Data-driven: every skill in every category from Notion should render
      // as a badge. Stays correct as the resume evolves.
      const allSkills = Object.values(skills).flat()
      expect(allSkills.length).toBeGreaterThan(5)
      allSkills.forEach((skill) => {
        expect(screen.getByText(skill)).toBeInTheDocument()
      })
    })

    it('includes relevant experience highlights', () => {
      render(<About />)
      
      const experienceSection = screen.getByTestId('experience-highlights')
      const text = experienceSection.textContent || ''
      
      // Should be substantial and professional
      expect(text.length).toBeGreaterThan(100)
      expect(text).toMatch(/developed|built|created|implemented/i)
    })

    it('shows education information', () => {
      render(<About />)

      const education = screen.getByTestId('education-section')
      expect(education).toBeInTheDocument()

      // Should include MS Analytics @ Georgia Tech and BA CS/Psych @ Rutgers
      expect(screen.getAllByText(/Analytics/i).length).toBeGreaterThanOrEqual(1)
      expect(screen.getAllByText(/Rutgers/i).length).toBeGreaterThanOrEqual(1)
    })
  })

  describe('Real Resume Content', () => {
    it('displays correct bio from resume', () => {
      render(<About />)

      // Current Notion content: MS Analytics @ Georgia Tech, BA CS @ Rutgers
      expect(screen.getByText(/Master of Science in Analytics/i)).toBeInTheDocument()
      expect(screen.getByText(/Georgia Institute of Technology/i)).toBeInTheDocument()
      expect(screen.getByText(/Bachelor of Arts in Computer Science/i)).toBeInTheDocument()
      expect(screen.getByText(/Rutgers University/i)).toBeInTheDocument()
    })

    it('shows relevant experience highlights', () => {
      render(<About />)

      // Current experience: Viatrie Data Engineer + Rutgers Lab RA + Isaac Lab (NVIDIA).
      expect(screen.getAllByText(/Viatrie/i).length).toBeGreaterThanOrEqual(1)
      expect(screen.getAllByText(/Rutgers Chlamydia Lab/i).length).toBeGreaterThanOrEqual(1)
      expect(screen.getAllByText(/Isaac Lab/i).length).toBeGreaterThanOrEqual(1)
    })

    it('displays specific experience details', () => {
      render(<About />)

      // Viatrie Data Engineer role
      expect(screen.getAllByText(/ETL pipelines/i).length).toBeGreaterThanOrEqual(1)
      expect(screen.getAllByText(/USDA/i).length).toBeGreaterThanOrEqual(1)
      expect(screen.getAllByText(/Redshift/i).length).toBeGreaterThanOrEqual(1)

      // Rutgers Lab role — resume says "from ~70% to 89%"
      expect(screen.getByText(/89%/)).toBeInTheDocument()

      // Isaac Lab role
      expect(screen.getByText(/reinforcement learning/i)).toBeInTheDocument()
    })

    it('shows correct technology stack', () => {
      render(<About />)

      // Data-driven: every skill listed in Notion renders. Duplicates with
      // the "shows organized technical skills" test above but the intent is
      // different (this is under "Real Resume Content"); keeping both as
      // guards against regression.
      const allSkills = Object.values(skills).flat()
      allSkills.forEach((tech) => {
        expect(screen.getByText(tech)).toBeInTheDocument()
      })
    })
  })

  describe('Minimal Design Requirements', () => {
    it('avoids decorative elements', () => {
      render(<About />)
      
      // Should NOT contain decorative animations or unnecessary elements
      expect(screen.queryByTestId(/icon|animation|decoration/)).not.toBeInTheDocument()
      
      // Tech badges are functional, not decorative
      const badges = screen.queryAllByRole('img')
      expect(badges.length).toBeGreaterThan(0) // Functional skill badges
    })

    it('uses clean card layouts', () => {
      render(<About />)
      
      const skillCards = screen.getAllByTestId(/^skill-category-/)
      skillCards.forEach(card => {
        expect(card).toHaveClass('bg-white', 'border', 'border-gray-200')
        expect(card).not.toHaveClass('shadow-lg', 'rounded-xl') // Avoid fancy styling
      })
    })

    it('maintains typography-first approach', () => {
      render(<About />)
      
      // Content should be primarily text-based
      const textElements = screen.getAllByText(/\w+/)
      expect(textElements.length).toBeGreaterThan(20) // Rich text content
    })
  })

  describe('Dark Mode Support', () => {
    beforeEach(() => {
      document.documentElement.classList.add('dark')
    })

    afterEach(() => {
      document.documentElement.classList.remove('dark')
    })

    it('applies dark mode classes to section heading', () => {
      render(<About />)
      
      const heading = screen.getByText('About Me')
      expect(heading).toHaveClass('text-gray-900', 'dark:text-white')
    })

    it('applies dark mode to professional summary text', () => {
      render(<About />)
      
      const summary = screen.getByTestId('professional-summary')
      expect(summary).toHaveClass('text-gray-600', 'dark:text-gray-300')
    })

    it('applies dark mode to skill category cards', () => {
      render(<About />)
      
      const skillCards = screen.getAllByTestId(/^skill-category-/)
      skillCards.forEach(card => {
        expect(card).toHaveClass('bg-white', 'dark:bg-gray-800')
        expect(card).toHaveClass('border-gray-200', 'dark:border-gray-700')
      })
    })

    it('applies dark mode to education section', () => {
      render(<About />)
      
      const educationSection = screen.getByTestId('education-section')
      const educationCard = educationSection.querySelector('.bg-gray-50')
      expect(educationCard).toHaveClass('bg-gray-50', 'dark:bg-gray-800')
      expect(educationCard).toHaveClass('border-gray-200', 'dark:border-gray-700')
    })

    it('applies dark mode to experience highlights', () => {
      render(<About />)
      
      const experienceSection = screen.getByTestId('experience-highlights')
      const experienceCards = experienceSection.querySelectorAll('.bg-gray-50')
      experienceCards.forEach(card => {
        expect(card).toHaveClass('bg-gray-50', 'dark:bg-gray-800')
        expect(card).toHaveClass('border-gray-200', 'dark:border-gray-700')
      })
    })

    it('maintains readability in dark mode', () => {
      render(<About />)
      
      // All text should have appropriate contrast classes
      const headings = screen.getAllByRole('heading')
      headings.forEach(heading => {
        expect(heading.className).toMatch(/dark:(text-white|text-gray-[12]00)/)
      })
    })
  })
})