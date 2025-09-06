import { render, screen, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { Hero } from './Hero'

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>)
}

describe('Hero Component', () => {
  it('renders name and title', async () => {
    renderWithRouter(<Hero />)
    
    expect(screen.getByText('Will Chen')).toBeInTheDocument()
    
    // Wait for typing animation to show "Software Engineer"
    await waitFor(() => {
      expect(screen.getByText(/Software Engineer/i)).toBeInTheDocument()
    }, { timeout: 2000 })
  })

  it('displays typing animation for roles', async () => {
    renderWithRouter(<Hero />)
    
    const roleElement = screen.getByTestId('typing-role')
    expect(roleElement).toBeInTheDocument()
    
    // Wait for typing animation to start
    await waitFor(() => {
      expect(roleElement.textContent).toBeTruthy()
    }, { timeout: 2000 })
  })

  it('shows tech stack badges', () => {
    renderWithRouter(<Hero />)
    
    expect(screen.getByText('TypeScript')).toBeInTheDocument()
    expect(screen.getByText('React')).toBeInTheDocument()
    expect(screen.getByText('Node.js')).toBeInTheDocument()
  })

  it('renders CTA buttons with correct links', () => {
    renderWithRouter(<Hero />)
    
    const viewProjectsBtn = screen.getByRole('link', { name: /view projects/i })
    const contactBtn = screen.getByRole('link', { name: /contact me/i })
    
    expect(viewProjectsBtn).toHaveAttribute('href', '/projects')
    expect(contactBtn).toHaveAttribute('href', '/contact')
  })

  it('is responsive on mobile', () => {
    renderWithRouter(<Hero />)
    
    const heroSection = screen.getByTestId('hero-section')
    expect(heroSection).toHaveClass('min-h-screen')
    expect(heroSection).toHaveClass('px-4')
  })

  it('has proper semantic HTML structure', () => {
    renderWithRouter(<Hero />)
    
    expect(screen.getByRole('banner')).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument()
  })

  it('meets accessibility requirements', () => {
    renderWithRouter(<Hero />)
    
    // Check for proper heading hierarchy
    const h1 = screen.getByRole('heading', { level: 1 })
    const h2 = screen.getByRole('heading', { level: 2 })
    
    expect(h1).toBeInTheDocument()
    expect(h2).toBeInTheDocument()
    
    // Check buttons have accessible names
    const buttons = screen.getAllByRole('link')
    buttons.forEach(button => {
      expect(button).toHaveAccessibleName()
    })
  })
})