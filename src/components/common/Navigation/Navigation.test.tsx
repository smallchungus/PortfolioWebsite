import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { Navigation } from './Navigation';

// Mock scrollTo
Object.defineProperty(window, 'scrollTo', {
  value: vi.fn(),
  writable: true,
});

describe('Navigation Component', () => {
  beforeEach(() => {
    // Reset scroll position
    vi.clearAllMocks();
    Object.defineProperty(window, 'scrollY', {
      value: 0,
      writable: true,
    });
  });

  afterEach(() => {
    cleanup();
    // Clean up DOM elements
    document.querySelectorAll('[id]').forEach(el => el.remove());
    document.documentElement.classList.remove('dark');
  });

  it('renders as sticky header', () => {
    render(<Navigation />);
    const nav = screen.getByRole('navigation');
    expect(nav).toHaveClass('sticky');
    expect(nav).toHaveClass('top-0');
    expect(nav).toHaveClass('z-50');
  });

  it('displays all section links', () => {
    render(<Navigation />);
    
    const aboutLink = screen.getByRole('link', { name: 'About' });
    const projectsLink = screen.getByRole('link', { name: 'Projects' });
    const contactLink = screen.getByRole('link', { name: 'Contact' });
    
    expect(aboutLink).toHaveAttribute('href', '#about');
    expect(projectsLink).toHaveAttribute('href', '#projects');
    expect(contactLink).toHaveAttribute('href', '#contact');
  });

  it('highlights active section on scroll', () => {
    // Create mock sections
    const aboutSection = document.createElement('div');
    aboutSection.id = 'about';
    document.body.appendChild(aboutSection);

    // Mock getBoundingClientRect to simulate section in view
    aboutSection.getBoundingClientRect = vi.fn(() => ({
      top: 50,
      bottom: 300,
      left: 0,
      right: 0,
      width: 0,
      height: 250,
    } as DOMRect));

    render(<Navigation />);
    
    // Simulate scroll event
    fireEvent.scroll(window);
    
    const aboutLink = screen.getByRole('link', { name: 'About' });
    expect(aboutLink).toHaveClass('text-gray-900');
  });

  it('applies dark mode styles', () => {
    document.documentElement.classList.add('dark');
    render(<Navigation />);
    
    const nav = screen.getByRole('navigation');
    expect(nav).toHaveClass('dark:bg-gray-900/90');
    expect(nav).toHaveClass('backdrop-blur');
  });

  it('includes logo/home link', () => {
    render(<Navigation />);
    
    const logo = screen.getByRole('link', { name: /WC/i });
    expect(logo).toHaveAttribute('href', '#');
    
    fireEvent.click(logo);
    expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });
  });

  it('applies hover states to navigation links', () => {
    render(<Navigation />);
    
    const aboutLink = screen.getByRole('link', { name: 'About' });
    expect(aboutLink).toHaveClass('hover:text-gray-900');
    expect(aboutLink).toHaveClass('dark:hover:text-white');
  });

  it('uses smooth scroll behavior for all navigation', () => {
    render(<Navigation />);
    
    const aboutLink = screen.getByRole('link', { name: 'About' });
    fireEvent.click(aboutLink);
    
    // Should not call window.scrollTo directly for hash links (browser handles it)
    // But should have proper href for smooth scroll CSS
    expect(aboutLink).toHaveAttribute('href', '#about');
  });

  it('updates active state when multiple sections are in view', () => {
    // Create mock sections
    const aboutSection = document.createElement('div');
    aboutSection.id = 'about';
    const projectsSection = document.createElement('div');
    projectsSection.id = 'projects';
    
    document.body.appendChild(aboutSection);
    document.body.appendChild(projectsSection);

    // Mock projects section as the one in the scroll spy zone
    aboutSection.getBoundingClientRect = vi.fn(() => ({
      top: -100, // Above viewport
      bottom: 50,
    } as DOMRect));
    
    projectsSection.getBoundingClientRect = vi.fn(() => ({
      top: 50, // In viewport
      bottom: 400,
    } as DOMRect));

    render(<Navigation />);
    fireEvent.scroll(window);
    
    const projectsLink = screen.getByRole('link', { name: 'Projects' });
    expect(projectsLink).toHaveClass('text-gray-900');
  });

  it('maintains accessibility with proper ARIA attributes', () => {
    render(<Navigation />);
    
    const nav = screen.getByRole('navigation');
    expect(nav).toBeInTheDocument();
    
    // All links should be focusable
    const links = screen.getAllByRole('link');
    links.forEach(link => {
      expect(link).toBeVisible();
      expect(link).not.toHaveAttribute('tabindex', '-1');
    });
  });
});