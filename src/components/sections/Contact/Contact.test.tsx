import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Contact } from './Contact'

describe('Contact Section', () => {
  it('renders contact heading', () => {
    render(<Contact />)
    const heading = screen.getByRole('heading', { name: /let's connect/i })
    expect(heading).toBeInTheDocument()
  })

  it('displays seeking opportunities message', () => {
    render(<Contact />)
    expect(screen.getByText(/currently seeking full-time opportunities/i)).toBeInTheDocument()
    expect(screen.getByText(/may 2025/i)).toBeInTheDocument()
  })

  it('displays contact links with correct href attributes', () => {
    render(<Contact />)
    
    const emailLink = screen.getByLabelText('Email Will Chen')
    expect(emailLink).toHaveAttribute('href', 'mailto:wchen1396@gmail.com')
    
    const linkedinLink = screen.getByLabelText('LinkedIn Profile')
    expect(linkedinLink).toHaveAttribute('href', 'https://linkedin.com/in/willchenn')
    
    const githubLink = screen.getByLabelText('GitHub Profile')
    expect(githubLink).toHaveAttribute('href', 'https://github.com/smallchungus')
  })

  it('has view resume button with correct href', () => {
    render(<Contact />)
    const resumeBtn = screen.getByText(/view resume/i)
    expect(resumeBtn).toHaveAttribute('href', 'https://drive.google.com/file/d/1a21bg5sKo2-TNZ1SGH0_RRnyEjPxxYhV/view')
    expect(resumeBtn).toHaveAttribute('target', '_blank')
    expect(resumeBtn).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('has proper accessibility attributes', () => {
    render(<Contact />)
    
    const section = screen.getByRole('region', { name: /contact/i })
    expect(section).toBeInTheDocument()
    
    // Check aria-labels for social links
    expect(screen.getByLabelText('Email Will Chen')).toBeInTheDocument()
    expect(screen.getByLabelText('LinkedIn Profile')).toBeInTheDocument() 
    expect(screen.getByLabelText('GitHub Profile')).toBeInTheDocument()
  })

  it('applies correct CSS classes for styling', () => {
    render(<Contact />)
    const section = screen.getByRole('region', { name: /contact/i })
    expect(section).toHaveClass('py-20', 'bg-white')
  })

  it('has proper link hover states', () => {
    render(<Contact />)
    const emailLink = screen.getByLabelText('Email Will Chen')
    expect(emailLink).toHaveClass('hover:bg-gray-200')
    
    const resumeBtn = screen.getByText(/view resume/i)
    expect(resumeBtn).toHaveClass('hover:bg-blue-700')
  })

  describe('Dark Mode Support', () => {
    beforeEach(() => {
      document.documentElement.classList.add('dark')
    })

    afterEach(() => {
      document.documentElement.classList.remove('dark')
    })

    it('applies dark mode to section background', () => {
      render(<Contact />)
      
      const section = screen.getByRole('region', { name: /contact/i })
      expect(section).toHaveClass('bg-white', 'dark:bg-gray-900')
    })

    it('applies dark mode to heading text', () => {
      render(<Contact />)
      
      const heading = screen.getByRole('heading', { name: /let's connect/i })
      expect(heading).toHaveClass('text-gray-900', 'dark:text-white')
    })

    it('applies dark mode to description text', () => {
      render(<Contact />)
      
      const description = screen.getByText(/currently seeking full-time opportunities/i)
      expect(description).toHaveClass('text-gray-600', 'dark:text-gray-300')
    })

    it('applies dark mode to social media links', () => {
      render(<Contact />)
      
      const emailLink = screen.getByLabelText('Email Will Chen')
      const linkedinLink = screen.getByLabelText('LinkedIn Profile')
      const githubLink = screen.getByLabelText('GitHub Profile')
      
      const socialLinks = [emailLink, linkedinLink, githubLink]
      socialLinks.forEach(link => {
        expect(link).toHaveClass('bg-gray-100', 'dark:bg-gray-800')
        expect(link).toHaveClass('hover:bg-gray-200', 'dark:hover:bg-gray-700')
        expect(link).toHaveClass('text-gray-600', 'dark:text-gray-300')
      })
    })

    it('applies dark mode to download resume button', () => {
      render(<Contact />)
      
      const resumeBtn = screen.getByText(/view resume/i)
      expect(resumeBtn).toHaveClass('bg-blue-600', 'dark:bg-blue-700')
      expect(resumeBtn).toHaveClass('hover:bg-blue-700', 'dark:hover:bg-blue-800')
      expect(resumeBtn).toHaveClass('text-white')
    })

    it('maintains proper contrast in dark mode', () => {
      render(<Contact />)
      
      // Text should have appropriate contrast
      const heading = screen.getByRole('heading')
      const description = screen.getByText(/seeking/i)
      
      expect(heading.className).toMatch(/dark:text-white/)
      expect(description.className).toMatch(/dark:text-gray-300/)
    })

    it('preserves accessibility in dark mode', () => {
      render(<Contact />)
      
      const section = screen.getByRole('region')
      expect(section).toHaveAttribute('aria-label')
      
      const socialLinks = [
        screen.getByLabelText('Email Will Chen'),
        screen.getByLabelText('LinkedIn Profile'),
        screen.getByLabelText('GitHub Profile')
      ]
      
      socialLinks.forEach(link => {
        expect(link).toHaveAttribute('aria-label')
      })
    })
  })
})