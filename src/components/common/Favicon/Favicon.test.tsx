import { describe, it, expect, beforeEach } from 'vitest';
import { render, waitFor } from '@testing-library/react';
import { Favicon } from './Favicon';

describe('Favicon Component', () => {
  beforeEach(() => {
    // Clear document head of any existing favicons
    document.querySelectorAll('link[rel="icon"]').forEach(el => el.remove());
    document.querySelectorAll('link[rel="shortcut icon"]').forEach(el => el.remove());
  });

  it('adds favicon to document head', () => {
    render(<Favicon />);
    const favicon = document.querySelector('link[rel="icon"]');
    expect(favicon).toBeTruthy();
    expect(favicon?.getAttribute('href')).toContain('favicon');
  });

  it('switches favicon for dark mode', () => {
    document.documentElement.classList.add('dark');
    render(<Favicon />);
    const favicon = document.querySelector('link[rel="icon"]');
    expect(favicon?.getAttribute('href')).toBe('/favicon-dark.svg');
    document.documentElement.classList.remove('dark');
  });

  it('switches favicon for light mode', () => {
    document.documentElement.classList.remove('dark');
    render(<Favicon />);
    const favicon = document.querySelector('link[rel="icon"]');
    expect(favicon?.getAttribute('href')).toBe('/favicon-light.svg');
  });

  it('updates favicon when theme changes', async () => {
    const { unmount } = render(<Favicon />);
    
    // Start in light mode
    document.documentElement.classList.remove('dark');
    await waitFor(() => {
      const favicon = document.querySelector('link[rel="icon"]');
      expect(favicon?.getAttribute('href')).toBe('/favicon-light.svg');
    });
    
    // Switch to dark mode
    document.documentElement.classList.add('dark');
    // Trigger mutation observer
    document.documentElement.dispatchEvent(new Event('classchange'));
    
    await waitFor(() => {
      const favicon = document.querySelector('link[rel="icon"]');
      expect(favicon?.getAttribute('href')).toBe('/favicon-dark.svg');
    });

    // Switch back to light mode
    document.documentElement.classList.remove('dark');
    document.documentElement.dispatchEvent(new Event('classchange'));
    
    await waitFor(() => {
      const favicon = document.querySelector('link[rel="icon"]');
      expect(favicon?.getAttribute('href')).toBe('/favicon-light.svg');
    });

    unmount();
  });

  it('cleans up event listeners on unmount', () => {
    const { unmount } = render(<Favicon />);
    
    // Verify favicon exists
    expect(document.querySelector('link[rel="icon"]')).toBeTruthy();
    
    // Unmount component
    unmount();
    
    // Change theme - favicon should not update after unmount
    const initialHref = document.querySelector('link[rel="icon"]')?.getAttribute('href');
    document.documentElement.classList.toggle('dark');
    const afterHref = document.querySelector('link[rel="icon"]')?.getAttribute('href');
    
    expect(afterHref).toBe(initialHref);
  });

  it('handles multiple render without duplicating favicons', () => {
    const { rerender } = render(<Favicon />);
    rerender(<Favicon />);
    rerender(<Favicon />);
    
    const favicons = document.querySelectorAll('link[rel="icon"]');
    expect(favicons.length).toBe(1);
  });
});