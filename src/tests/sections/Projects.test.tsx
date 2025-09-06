import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Projects } from '../../sections/Projects'

// Mock GitHub API responses
const mockGitHubStats = {
  stargazers_count: 42,
  forks_count: 8,
  language: 'TypeScript',
  updated_at: '2025-01-01T00:00:00Z'
}

// Mock fetch for GitHub API
global.fetch = jest.fn()

describe('Projects Section', () => {
  beforeEach(() => {
    (fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => mockGitHubStats
    })
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  describe('rendering', () => {
    it('renders project cards with required information', async () => {
      render(<Projects />)
      
      expect(screen.getByRole('heading', { name: /projects/i })).toBeInTheDocument()
      
      // Wait for projects to load
      await waitFor(() => {
        expect(screen.getAllByTestId('project-card')).toHaveLength(4) // Max 4 projects per ADR-005
      })
    })

    it('displays GitHub stats when available', async () => {
      render(<Projects />)
      
      await waitFor(() => {
        expect(screen.getByText('42')).toBeInTheDocument() // Stars
        expect(screen.getByText('8')).toBeInTheDocument() // Forks
      })
    })

    it('shows tech stack badges for each project', async () => {
      render(<Projects />)
      
      await waitFor(() => {
        const techBadges = screen.getAllByTestId('tech-badge')
        expect(techBadges.length).toBeGreaterThan(0)
        
        // Verify common technologies are present
        expect(screen.getByText('TypeScript')).toBeInTheDocument()
        expect(screen.getByText('React')).toBeInTheDocument()
      })
    })

    it('ensures all external links open in new tab', async () => {
      render(<Projects />)
      
      await waitFor(() => {
        const externalLinks = screen.getAllByRole('link', { name: /demo|github/i })
        
        externalLinks.forEach(link => {
          expect(link).toHaveAttribute('target', '_blank')
          expect(link).toHaveAttribute('rel', 'noopener noreferrer')
        })
      })
    })
  })

  describe('filtering functionality', () => {
    it('filters projects by technology', async () => {
      const user = userEvent.setup()
      render(<Projects />)
      
      // Wait for initial render
      await waitFor(() => {
        expect(screen.getAllByTestId('project-card')).toHaveLength(4)
      })
      
      // Click TypeScript filter
      const typeScriptFilter = screen.getByRole('button', { name: /typescript/i })
      await user.click(typeScriptFilter)
      
      // Verify filtered results
      const visibleCards = screen.getAllByTestId('project-card')
      expect(visibleCards.length).toBeLessThanOrEqual(4)
      
      // Verify all visible cards have TypeScript badge
      visibleCards.forEach(card => {
        expect(card).toContainElement(screen.getByText('TypeScript'))
      })
    })

    it('shows all projects when filter is cleared', async () => {
      const user = userEvent.setup()
      render(<Projects />)
      
      // Apply filter
      const reactFilter = screen.getByRole('button', { name: /react/i })
      await user.click(reactFilter)
      
      // Clear filter
      const clearButton = screen.getByRole('button', { name: /all/i })
      await user.click(clearButton)
      
      // Verify all projects are shown
      await waitFor(() => {
        expect(screen.getAllByTestId('project-card')).toHaveLength(4)
      })
    })
  })

  describe('bento grid layout', () => {
    it('applies asymmetric grid layout', async () => {
      render(<Projects />)
      
      const projectsGrid = screen.getByTestId('projects-grid')
      expect(projectsGrid).toHaveClass('grid')
      
      // Verify bento grid classes (asymmetric layout)
      const projectCards = await screen.findAllByTestId('project-card')
      
      // First card should be larger (featured)
      expect(projectCards[0]).toHaveClass('lg:col-span-2', 'lg:row-span-2')
    })

    it('is responsive across different screen sizes', () => {
      render(<Projects />)
      
      const projectsGrid = screen.getByTestId('projects-grid')
      
      // Mobile: single column
      expect(projectsGrid).toHaveClass('grid-cols-1')
      
      // Desktop: multi-column bento
      expect(projectsGrid).toHaveClass('lg:grid-cols-3')
    })
  })

  describe('performance', () => {
    it('lazy loads project images', async () => {
      render(<Projects />)
      
      const projectImages = await screen.findAllByRole('img')
      
      projectImages.forEach(img => {
        expect(img).toHaveAttribute('loading', 'lazy')
      })
    })

    it('handles GitHub API failure gracefully', async () => {
      // Mock API failure
      (fetch as jest.Mock).mockRejectedValueOnce(new Error('API Error'))
      
      render(<Projects />)
      
      // Should still render projects without stats
      await waitFor(() => {
        expect(screen.getAllByTestId('project-card')).toHaveLength(4)
      })
      
      // Should not show GitHub stats
      expect(screen.queryByTestId('github-stats')).not.toBeInTheDocument()
    })
  })
})