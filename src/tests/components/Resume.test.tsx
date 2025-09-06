import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Resume } from '../../components/Resume'

// Mock window.print
const mockPrint = jest.fn()
Object.defineProperty(window, 'print', {
  writable: true,
  value: mockPrint,
})

// Mock URL search params for role customization
const mockURLSearchParams = jest.fn()
Object.defineProperty(window, 'URLSearchParams', {
  writable: true,
  value: mockURLSearchParams,
})

describe('Resume Component', () => {
  beforeEach(() => {
    mockPrint.mockClear()
    mockURLSearchParams.mockImplementation(() => ({
      get: jest.fn().mockReturnValue(null), // Default: no role parameter
    }))
  })

  describe('modal functionality', () => {
    it('opens in modal overlay', () => {
      render(<Resume isOpen={true} onClose={jest.fn()} />)
      
      const modal = screen.getByRole('dialog', { name: /resume/i })
      expect(modal).toBeInTheDocument()
      expect(modal).toHaveAttribute('aria-modal', 'true')
    })

    it('closes when close button is clicked', async () => {
      const user = userEvent.setup()
      const mockOnClose = jest.fn()
      
      render(<Resume isOpen={true} onClose={mockOnClose} />)
      
      const closeButton = screen.getByRole('button', { name: /close/i })
      await user.click(closeButton)
      
      expect(mockOnClose).toHaveBeenCalledTimes(1)
    })

    it('closes when escape key is pressed', async () => {
      const user = userEvent.setup()
      const mockOnClose = jest.fn()
      
      render(<Resume isOpen={true} onClose={mockOnClose} />)
      
      await user.keyboard('{Escape}')
      
      expect(mockOnClose).toHaveBeenCalledTimes(1)
    })

    it('traps focus within modal', async () => {
      const user = userEvent.setup()
      
      render(<Resume isOpen={true} onClose={jest.fn()} />)
      
      const downloadButton = screen.getByRole('button', { name: /download pdf/i })
      const closeButton = screen.getByRole('button', { name: /close/i })
      
      // Focus should cycle between interactive elements
      await user.tab()
      expect(downloadButton).toHaveFocus()
      
      await user.tab()
      expect(closeButton).toHaveFocus()
    })
  })

  describe('PDF download functionality', () => {
    it('triggers print when download button is clicked', async () => {
      const user = userEvent.setup()
      
      render(<Resume isOpen={true} onClose={jest.fn()} />)
      
      const downloadButton = screen.getByRole('button', { name: /download pdf/i })
      await user.click(downloadButton)
      
      expect(mockPrint).toHaveBeenCalledTimes(1)
    })

    it('optimizes layout for print media', () => {
      render(<Resume isOpen={true} onClose={jest.fn()} />)
      
      const resumeContent = screen.getByTestId('resume-content')
      
      // Should have print-specific styles
      expect(resumeContent).toHaveClass('print:shadow-none')
      expect(resumeContent).toHaveClass('print:bg-white')
    })
  })

  describe('responsive layout', () => {
    it('adapts to mobile viewports', () => {
      render(<Resume isOpen={true} onClose={jest.fn()} />)
      
      const modal = screen.getByRole('dialog')
      
      // Mobile: full screen
      expect(modal).toHaveClass('h-full', 'w-full')
      
      // Desktop: centered modal
      expect(modal).toHaveClass('lg:h-auto', 'lg:w-4/5', 'lg:max-w-4xl')
    })

    it('maintains readability at different screen sizes', () => {
      render(<Resume isOpen={true} onClose={jest.fn()} />)
      
      const resumeText = screen.getByTestId('resume-content')
      
      // Responsive text sizing
      expect(resumeText).toHaveClass('text-sm', 'lg:text-base')
    })
  })

  describe('content structure', () => {
    it('contains all required resume sections', () => {
      render(<Resume isOpen={true} onClose={jest.fn()} />)
      
      // Essential sections for ATS compatibility
      expect(screen.getByRole('heading', { name: /will chen/i })).toBeInTheDocument()
      expect(screen.getByRole('heading', { name: /experience/i })).toBeInTheDocument()
      expect(screen.getByRole('heading', { name: /education/i })).toBeInTheDocument()
      expect(screen.getByRole('heading', { name: /skills/i })).toBeInTheDocument()
      expect(screen.getByRole('heading', { name: /contact/i })).toBeInTheDocument()
    })

    it('uses semantic HTML for ATS parsing', () => {
      render(<Resume isOpen={true} onClose={jest.fn()} />)
      
      // Semantic structure
      expect(screen.getByRole('main')).toBeInTheDocument()
      
      const sections = screen.getAllByRole('region')
      expect(sections.length).toBeGreaterThan(0)
      
      // Time elements for dates
      const timeElements = screen.getAllByTestId(/date-/)
      expect(timeElements.length).toBeGreaterThan(0)
      timeElements.forEach(el => {
        expect(el.tagName).toBe('TIME')
      })
    })

    it('includes contact information', () => {
      render(<Resume isOpen={true} onClose={jest.fn()} />)
      
      expect(screen.getByText(/wchen1396@gmail\.com/i)).toBeInTheDocument()
      expect(screen.getByText(/github\.com\/willchen/i)).toBeInTheDocument()
      expect(screen.getByText(/linkedin\.com\/in\/willchen/i)).toBeInTheDocument()
    })
  })

  describe('role customization', () => {
    it('customizes content based on URL role parameter', () => {
      // Mock URL parameter for frontend role
      mockURLSearchParams.mockImplementation(() => ({
        get: jest.fn().mockImplementation((key) => 
          key === 'role' ? 'frontend' : null
        ),
      }))
      
      render(<Resume isOpen={true} onClose={jest.fn()} />)
      
      // Should emphasize frontend skills
      expect(screen.getByText(/react/i)).toBeInTheDocument()
      expect(screen.getByText(/typescript/i)).toBeInTheDocument()
      expect(screen.getByText(/frontend/i)).toBeInTheDocument()
    })

    it('shows full-stack content by default', () => {
      render(<Resume isOpen={true} onClose={jest.fn()} />)
      
      // Should show both frontend and backend technologies
      expect(screen.getByText(/react/i)).toBeInTheDocument()
      expect(screen.getByText(/node\.js/i)).toBeInTheDocument()
      expect(screen.getByText(/python/i)).toBeInTheDocument()
    })
  })

  describe('accessibility', () => {
    it('provides proper ARIA labels and roles', () => {
      render(<Resume isOpen={true} onClose={jest.fn()} />)
      
      const modal = screen.getByRole('dialog')
      expect(modal).toHaveAttribute('aria-labelledby')
      expect(modal).toHaveAttribute('aria-describedby')
    })

    it('supports keyboard navigation', async () => {
      const user = userEvent.setup()
      
      render(<Resume isOpen={true} onClose={jest.fn()} />)
      
      // Should be able to navigate with keyboard
      await user.tab()
      expect(document.activeElement).toBeInTheDocument()
    })
  })
})