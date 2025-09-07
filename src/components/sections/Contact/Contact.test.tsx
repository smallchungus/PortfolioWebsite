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
    
    const emailLink = screen.getByLabelText('Email')
    expect(emailLink).toHaveAttribute('href', 'mailto:wchen1396@gmail.com')
    
    const linkedinLink = screen.getByLabelText('LinkedIn')
    expect(linkedinLink).toHaveAttribute('href', 'https://linkedin.com/in/willchenn')
    
    const githubLink = screen.getByLabelText('GitHub')
    expect(githubLink).toHaveAttribute('href', 'https://github.com/smallchungus')
  })

  it('has download resume button with correct href', () => {
    render(<Contact />)
    const resumeBtn = screen.getByText(/download resume/i)
    expect(resumeBtn).toHaveAttribute('href', '/William_Chen_Resume.pdf')
    expect(resumeBtn).toHaveAttribute('download')
  })

  it('has proper accessibility attributes', () => {
    render(<Contact />)
    
    const section = screen.getByRole('region', { name: /contact/i })
    expect(section).toBeInTheDocument()
    
    // Check aria-labels for social links
    expect(screen.getByLabelText('Email')).toBeInTheDocument()
    expect(screen.getByLabelText('LinkedIn')).toBeInTheDocument() 
    expect(screen.getByLabelText('GitHub')).toBeInTheDocument()
  })

  it('applies correct CSS classes for styling', () => {
    render(<Contact />)
    const section = screen.getByRole('region', { name: /contact/i })
    expect(section).toHaveClass('py-20', 'bg-white')
  })

  it('has proper link hover states', () => {
    render(<Contact />)
    const emailLink = screen.getByLabelText('Email')
    expect(emailLink).toHaveClass('hover:bg-gray-200')
    
    const resumeBtn = screen.getByText(/download resume/i)
    expect(resumeBtn).toHaveClass('hover:bg-blue-700')
  })
})