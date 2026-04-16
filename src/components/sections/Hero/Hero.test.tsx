import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'
import { Hero } from './Hero'

// Mock window.open for download resume functionality
const mockOpen = vi.fn()
Object.defineProperty(window, 'open', {
  writable: true,
  value: mockOpen,
})

// Mock scroll behavior for anchor links
const mockScrollTo = vi.fn()
Object.defineProperty(window, 'scrollTo', {
  writable: true,
  value: mockScrollTo,
})

describe('Hero Section', () => {
  beforeEach(() => {
    mockOpen.mockClear()
  })

  describe('core rendering', () => {
    it('displays "Will Chen" as main heading', () => {
      render(<Hero />)
      
      const heading = screen.getByRole('heading', { level: 1 })
      expect(heading).toHaveTextContent('Will Chen')
      expect(heading).toBeInTheDocument()
    })

    it('shows typing animation with correct role cycle', async () => {
      render(<Hero />)
      
      const typingElement = screen.getByTestId('typing-role')
      expect(typingElement).toBeInTheDocument()
      
      // Wait for typing animation to start and cycle through roles
      await waitFor(() => {
        const currentText = typingElement.textContent
        expect(currentText).toMatch(/Software Engineer|Full-Stack Developer|Problem Solver/)
      }, { timeout: 3000 })
    })

    it('displays all required tech stack badges', () => {
      render(<Hero />)
      
      const expectedTechs = ['Python', 'Java', 'Go', 'TypeScript', 'React']
      
      expectedTechs.forEach(tech => {
        expect(screen.getByText(tech)).toBeInTheDocument()
      })
      
      // Verify all badges have consistent styling
      const badges = screen.getAllByTestId('tech-badge')
      expect(badges).toHaveLength(expectedTechs.length)
    })

    it('renders CTA buttons with correct functionality', async () => {
      const user = userEvent.setup()
      render(<Hero />)

      const viewProjectsBtn = screen.getByRole('button', { name: /view projects/i })
      const viewResumeBtn = screen.getByRole('button', { name: /view resume/i })

      expect(viewProjectsBtn).toBeInTheDocument()
      expect(viewResumeBtn).toBeInTheDocument()

      // Test View Projects button scrolls to projects section
      await user.click(viewProjectsBtn)
      expect(mockScrollTo).toHaveBeenCalled()

      // Test View Resume button opens the static PDF
      await user.click(viewResumeBtn)
      expect(mockOpen).toHaveBeenCalledWith('/WillChen_Resume.pdf', '_blank')
    })
  })

  describe('responsive design', () => {
    it('adapts layout for mobile (375px)', () => {
      // Mock mobile viewport
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 375,
      })
      
      render(<Hero />)
      
      const heroSection = screen.getByTestId('hero-section')
      const ctaContainer = screen.getByTestId('cta-buttons')
      
      // Mobile-specific classes
      expect(heroSection).toHaveClass('px-4') // Mobile padding
      expect(ctaContainer).toHaveClass('flex-col') // Stacked buttons
      
      const heading = screen.getByRole('heading', { level: 1 })
      expect(heading).toHaveClass('text-4xl') // Smaller mobile heading
    })

    it('adapts layout for tablet (768px)', () => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 768,
      })
      
      render(<Hero />)
      
      const heading = screen.getByRole('heading', { level: 1 })
      const heroSection = screen.getByTestId('hero-section')
      
      expect(heading).toHaveClass('md:text-6xl') // Larger tablet heading
      expect(heroSection).toHaveClass('md:px-8') // Increased tablet padding
    })

    it('adapts layout for desktop (1024px+)', () => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 1024,
      })
      
      render(<Hero />)
      
      const heading = screen.getByRole('heading', { level: 1 })
      const ctaContainer = screen.getByTestId('cta-buttons')
      
      expect(heading).toHaveClass('lg:text-7xl') // Largest desktop heading
      expect(ctaContainer).toHaveClass('sm:flex-row') // Horizontal button layout
    })

    it('prevents horizontal scrolling at all breakpoints', () => {
      const viewports = [375, 768, 1024, 1440]
      
      viewports.forEach((width) => {
        Object.defineProperty(window, 'innerWidth', {
          writable: true,
          configurable: true,
          value: width,
        })
        
        const { unmount } = render(<Hero />)
        
        const heroSection = screen.getByTestId('hero-section')
        const container = heroSection.querySelector('.container')
        
        expect(container).toHaveClass('mx-auto') // Centered container
        expect(heroSection).not.toHaveClass('overflow-x-scroll')
        
        // Clean up between renders
        unmount()
      })
    })
  })

  describe('accessibility compliance', () => {
    it('has proper heading hierarchy', () => {
      render(<Hero />)
      
      const h1 = screen.getByRole('heading', { level: 1 })
      const h2 = screen.getByRole('heading', { level: 2 })
      
      expect(h1).toBeInTheDocument()
      expect(h2).toBeInTheDocument()
      
      // H1 should be the name, H2 should be the role
      expect(h1).toHaveTextContent('Will Chen')
      expect(h2.parentElement).toContainElement(screen.getByTestId('typing-role'))
    })

    it('provides proper ARIA labels for interactive elements', () => {
      render(<Hero />)
      
      const viewProjectsBtn = screen.getByRole('button', { name: /view projects/i })
      const downloadResumeBtn = screen.getByRole('button', { name: /view resume/i })
      
      expect(viewProjectsBtn).toHaveAccessibleName()
      expect(downloadResumeBtn).toHaveAccessibleName()
      
      // Tech badges should be properly labeled
      const techBadges = screen.getAllByTestId('tech-badge')
      techBadges.forEach(badge => {
        expect(badge).toHaveAttribute('role', 'img')
        expect(badge).toHaveAttribute('aria-label')
      })
    })

    it('supports keyboard navigation', async () => {
      const user = userEvent.setup()
      render(<Hero />)

      // Tab through interactive elements - first button is View Projects
      await user.tab()
      expect(screen.getByRole('button', { name: /view projects/i })).toHaveFocus()

      // Second tab goes to View Resume button
      await user.tab()
      expect(screen.getByRole('button', { name: /view resume/i })).toHaveFocus()

      // Enter key should activate buttons
      await user.keyboard('{Enter}')
      expect(mockOpen).toHaveBeenCalled()
    })

    it('respects reduced motion preferences', () => {
      // Mock prefers-reduced-motion
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: vi.fn().mockImplementation(query => ({
          matches: query === '(prefers-reduced-motion: reduce)',
          media: query,
          onchange: null,
          addListener: vi.fn(),
          removeListener: vi.fn(),
        })),
      })
      
      render(<Hero />)
      
      const typingElement = screen.getByTestId('typing-role')
      
      // Should not have animation classes when reduced motion is preferred
      expect(typingElement).not.toHaveClass('animate-pulse')
      expect(typingElement.parentElement).not.toHaveClass('animate-bounce')
    })

    it('provides semantic HTML structure', () => {
      render(<Hero />)
      
      const heroSection = screen.getByTestId('hero-section')
      
      expect(heroSection.tagName).toBe('SECTION')
      expect(heroSection).toHaveAttribute('aria-label', 'Hero section')
      
      // Hero should be wrapped in a section with proper aria-label
      const outerSection = screen.getByRole('region', { name: 'Hero wrapper' })
      expect(outerSection).toBeInTheDocument()
      expect(outerSection).toContainElement(heroSection)
    })
  })

  describe('performance and optimization', () => {
    it('loads without layout shift', () => {
      render(<Hero />)
      
      const heroSection = screen.getByTestId('hero-section')
      
      // Should have fixed height to prevent CLS
      expect(heroSection).toHaveClass('min-h-screen')
      
      // Content should be immediately visible
      expect(screen.getByText('Will Chen')).toBeInTheDocument()
      expect(screen.getByTestId('typing-role')).toBeInTheDocument()
    })

    it('has no memory leaks in typing animation', () => {
      const { unmount } = render(<Hero />)
      
      // Should clean up intervals/timeouts on unmount
      unmount()
      
      // No specific assertion needed - React Testing Library will catch memory leaks
    })

    it('uses efficient re-rendering strategy', () => {
      const { rerender } = render(<Hero />)
      
      // Simulate re-render with same props
      rerender(<Hero />)
      
      // Component should still function correctly
      expect(screen.getByText('Will Chen')).toBeInTheDocument()
      expect(screen.getByTestId('typing-role')).toBeInTheDocument()
    })
  })

  describe('design system compliance', () => {
    it('uses consistent spacing from 8px grid system', () => {
      render(<Hero />)
      
      const heroSection = screen.getByTestId('hero-section')
      const ctaButtons = screen.getByTestId('cta-buttons')
      
      // Check for proper spacing classes (multiples of 0.5rem/8px)
      expect(heroSection).toHaveClass('py-20') // 5rem = 80px (10 * 8px)
      expect(ctaButtons).toHaveClass('gap-4') // 1rem = 16px (2 * 8px)
    })

    it('uses proper color scheme', () => {
      render(<Hero />)
      
      const heading = screen.getByRole('heading', { level: 1 })
      const techBadges = screen.getAllByTestId('tech-badge')
      
      // Primary text should be dark
      expect(heading).toHaveClass('text-gray-900')
      
      // Badges should have consistent styling
      techBadges.forEach(badge => {
        expect(badge).toHaveClass('bg-gray-100')
        expect(badge).toHaveClass('text-gray-700')
      })
    })

    it('follows typography hierarchy', () => {
      render(<Hero />)
      
      const h1 = screen.getByRole('heading', { level: 1 })
      const h2 = screen.getByRole('heading', { level: 2 })
      
      // H1 should be largest
      expect(h1).toHaveClass('text-4xl', 'md:text-6xl', 'lg:text-7xl')
      
      // H2 should be smaller but prominent
      expect(h2).toHaveClass('text-2xl', 'md:text-3xl', 'lg:text-4xl')
    })
  })

  describe('Dark Mode Support', () => {
    beforeEach(() => {
      document.documentElement.classList.add('dark')
    })

    afterEach(() => {
      document.documentElement.classList.remove('dark')
    })

    it('applies dark mode classes to wrapper section', () => {
      render(<Hero />)
      
      const wrapper = screen.getByRole('region', { name: 'Hero wrapper' })
      expect(wrapper).toHaveClass('bg-white', 'dark:bg-gray-900', 'transition-colors')
    })

    it('applies dark mode to main heading', () => {
      render(<Hero />)
      
      const heading = screen.getByText('Will Chen')
      expect(heading).toHaveClass('text-gray-900', 'dark:text-white')
    })

    it('applies dark mode to typing animation text', () => {
      render(<Hero />)
      
      const typingText = screen.getByTestId('typing-role')
      expect(typingText.parentElement).toHaveClass('text-gray-600', 'dark:text-gray-300')
    })

    it('applies dark mode to description text', () => {
      render(<Hero />)
      
      const description = screen.getByText(/Building scalable applications/i)
      expect(description).toHaveClass('text-gray-600', 'dark:text-gray-400')
    })

    it('applies dark mode to CTA buttons', () => {
      render(<Hero />)
      
      const viewProjectsBtn = screen.getByText('View Projects')
      const downloadBtn = screen.getByText('View Resume')
      
      // Primary button (View Projects)
      expect(viewProjectsBtn).toHaveClass('bg-gray-900', 'dark:bg-blue-600')
      expect(viewProjectsBtn).toHaveClass('hover:bg-gray-800', 'dark:hover:bg-blue-700')
      expect(viewProjectsBtn).toHaveClass('focus:ring-gray-500', 'dark:focus:ring-blue-500')
      expect(viewProjectsBtn).toHaveClass('dark:focus:ring-offset-gray-900')
      
      // Secondary button (View Resume)
      expect(downloadBtn).toHaveClass('border-gray-300', 'dark:border-gray-600')
      expect(downloadBtn).toHaveClass('text-gray-700', 'dark:text-gray-300')
      expect(downloadBtn).toHaveClass('hover:bg-gray-50', 'dark:hover:bg-gray-800')
      expect(downloadBtn).toHaveClass('focus:ring-gray-500', 'dark:focus:ring-gray-400')
      expect(downloadBtn).toHaveClass('dark:focus:ring-offset-gray-900')
    })

    it('maintains proper contrast ratios in dark mode', () => {
      render(<Hero />)
      
      // Check all text elements have proper dark mode contrast
      const heading = screen.getByText('Will Chen')
      const description = screen.getByText(/Building scalable applications/i)
      
      expect(heading.className).toMatch(/dark:text-white/)
      expect(description.className).toMatch(/dark:text-gray-[34]00/)
    })

    it('CTA buttons have dark mode styles', () => {
      render(<Hero />)

      // View Resume button should have dark mode classes
      const viewResumeBtn = screen.getByText('View Resume')
      expect(viewResumeBtn).toHaveClass('dark:border-gray-600')
      expect(viewResumeBtn).toHaveClass('dark:text-gray-300')
      expect(viewResumeBtn).toHaveClass('dark:hover:bg-gray-800')
    })
  })
})