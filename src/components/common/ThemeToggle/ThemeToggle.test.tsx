import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import { ThemeToggle } from './ThemeToggle'

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn()
}
Object.defineProperty(window, 'localStorage', { value: localStorageMock })

describe('ThemeToggle', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    // Reset document classes
    document.documentElement.className = ''
    localStorageMock.getItem.mockReturnValue('light')
  })

  afterEach(() => {
    cleanup()
  })

  it('renders theme toggle button', () => {
    render(<ThemeToggle />)
    
    const toggle = screen.getByRole('button', { name: /switch to dark mode/i })
    expect(toggle).toBeInTheDocument()
  })

  it('starts in light mode by default', () => {
    render(<ThemeToggle />)
    
    expect(document.documentElement).not.toHaveClass('dark')
    expect(localStorageMock.setItem).toHaveBeenCalledWith('theme', 'light')
  })

  it('toggles to dark mode when clicked', () => {
    render(<ThemeToggle />)
    
    const toggle = screen.getByRole('button', { name: /switch to dark mode/i })
    fireEvent.click(toggle)
    
    expect(document.documentElement).toHaveClass('dark')
    expect(localStorageMock.setItem).toHaveBeenCalledWith('theme', 'dark')
  })

  it('toggles back to light mode on second click', () => {
    render(<ThemeToggle />)
    
    const toggle = screen.getByRole('button', { name: /switch to dark mode/i })
    
    // Click to dark mode
    fireEvent.click(toggle)
    expect(document.documentElement).toHaveClass('dark')
    
    // Click back to light mode - now the button text changes
    const toggleAfterClick = screen.getByRole('button', { name: /switch to light mode/i })
    fireEvent.click(toggleAfterClick)
    expect(document.documentElement).not.toHaveClass('dark')
    expect(localStorageMock.setItem).toHaveBeenCalledWith('theme', 'light')
  })

  it('restores theme from localStorage', () => {
    localStorageMock.getItem.mockReturnValue('dark')
    
    render(<ThemeToggle />)
    
    expect(document.documentElement).toHaveClass('dark')
  })

  it('shows correct icon for current theme', () => {
    render(<ThemeToggle />)
    
    const toggle = screen.getByRole('button', { name: /switch to dark mode/i })
    
    // Should show moon icon in light mode (to switch to dark)
    expect(toggle.querySelector('svg')).toBeInTheDocument()
    
    // Click to switch to dark mode
    fireEvent.click(toggle)
    
    // Should now show sun icon in dark mode (to switch to light)
    const toggleAfterClick = screen.getByRole('button', { name: /switch to light mode/i })
    expect(toggleAfterClick.querySelector('svg')).toBeInTheDocument()
  })

  it('has proper accessibility attributes', () => {
    render(<ThemeToggle />)
    
    const toggle = screen.getByRole('button', { name: /switch to dark mode/i })
    
    expect(toggle).toHaveAttribute('aria-label')
    expect(toggle).toHaveAttribute('type', 'button')
  })

  it('handles keyboard navigation', () => {
    render(<ThemeToggle />)
    
    const toggle = screen.getByRole('button', { name: /switch to dark mode/i })
    
    // Should be focusable
    toggle.focus()
    expect(toggle).toHaveFocus()
    
    // Should activate with Enter key
    fireEvent.keyDown(toggle, { key: 'Enter' })
    expect(document.documentElement).toHaveClass('dark')
  })
})