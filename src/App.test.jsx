import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { render, screen, cleanup } from '@testing-library/react'
import App from './App'

describe('App Dark Mode', () => {
  beforeEach(() => {
    // Clear all classes before each test
    document.documentElement.className = ''
    document.body.className = ''
  })

  afterEach(() => {
    cleanup()
    document.documentElement.className = ''
    document.body.className = ''
  })

  it('applies dark background to entire viewport', () => {
    document.documentElement.classList.add('dark')
    render(<App />)
    
    const main = screen.getByRole('main')
    expect(main).toHaveClass('dark:bg-gray-900')
    expect(main).toHaveClass('min-h-screen')
  })

  it('covers full viewport height without white gaps', () => {
    document.documentElement.classList.add('dark')
    render(<App />)
    
    const main = screen.getByRole('main')
    // Should have min-h-screen to cover full viewport
    expect(main).toHaveClass('min-h-screen')
    // Should have dark background
    expect(main).toHaveClass('dark:bg-gray-900')
  })
})