import { render, screen, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { Hero } from '../../sections/Hero'

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>)
}

describe('Hero Section', () => {
  describe('rendering', () => {
    it('renders name and title correctly', () => {
      renderWithRouter(<Hero />)
      
      expect(screen.getByText('Will Chen')).toBeInTheDocument()
      expect(screen.getByText(/Software Engineer/i)).toBeInTheDocument()
    })

    it('displays typing animation with role cycling', async () => {
      renderWithRouter(<Hero />)
      
      const roleElement = screen.getByTestId('typing-role')
      expect(roleElement).toBeInTheDocument()
      
      // Wait for typing animation to cycle through roles
      await waitFor(() => {
        expect(roleElement.textContent).toMatch(/Software Engineer|Full Stack Developer|Big Data Engineer/)
      }, { timeout: 3000 })
    })

    it('shows call-to-action buttons with correct navigation', () => {
      renderWithRouter(<Hero />)
      
      const projectsButton = screen.getByRole('link', { name: /view projects/i })
      const contactButton = screen.getByRole('link', { name: /contact me/i })
      
      expect(projectsButton).toHaveAttribute('href', '#projects')
      expect(contactButton).toHaveAttribute('href', '#contact')
    })
  })

  describe('responsive design', () => {
    it('is responsive at 375px mobile width', () => {
      // Mock viewport width
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 375,
      })
      
      renderWithRouter(<Hero />)
      
      const heroSection = screen.getByTestId('hero-section')
      expect(heroSection).toHaveClass('px-4') // Mobile padding
      expect(heroSection).toHaveClass('min-h-screen')
    })

    it('is responsive at 768px tablet width', () => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 768,
      })
      
      renderWithRouter(<Hero />)
      
      const heroTitle = screen.getByRole('heading', { level: 1 })
      expect(heroTitle).toHaveClass('md:text-7xl') // Larger text on tablet+
    })

    it('is responsive at 1024px desktop width', () => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 1024,
      })
      
      renderWithRouter(<Hero />)
      
      const ctaContainer = screen.getByTestId('cta-buttons')
      expect(ctaContainer).toHaveClass('sm:flex-row') // Horizontal layout on desktop
    })
  })

  describe('accessibility', () => {
    it('has proper heading hierarchy', () => {
      renderWithRouter(<Hero />)
      
      const h1 = screen.getByRole('heading', { level: 1 })
      const h2 = screen.getByRole('heading', { level: 2 })
      
      expect(h1).toBeInTheDocument()
      expect(h2).toBeInTheDocument()
    })

    it('provides accessible navigation links', () => {
      renderWithRouter(<Hero />)
      
      const links = screen.getAllByRole('link')
      links.forEach(link => {
        expect(link).toHaveAccessibleName()
        expect(link).not.toHaveAttribute('href', '#') // No placeholder links
      })
    })

    it('supports reduced motion preferences', () => {
      // Mock prefers-reduced-motion
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: jest.fn().mockImplementation(query => ({
          matches: query === '(prefers-reduced-motion: reduce)',
          media: query,
          onchange: null,
          addListener: jest.fn(),
          removeListener: jest.fn(),
        })),
      })
      
      renderWithRouter(<Hero />)
      
      const typingElement = screen.getByTestId('typing-role')
      expect(typingElement).not.toHaveClass('animate-pulse') // No animation when reduced motion
    })
  })
})