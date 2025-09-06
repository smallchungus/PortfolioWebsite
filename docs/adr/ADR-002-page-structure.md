# ADR-002: Page Structure - Single Page vs Multi-Page

## Status
Accepted

## Context
Need to choose between traditional multi-page navigation or modern single-page application. Current trend favors single-page with smooth scrolling for better user experience and storytelling flow.

## Decision
Implement single-page application with smooth scroll navigation:
- **Sections**: Hero → Experience → Projects → Contact
- **Navigation**: Sticky header with anchor links
- **Resume**: Modal/drawer overlay (not separate page)
- **Blog**: External links to Medium/Dev.to (no integrated blog)
- **Smooth scroll**: Polyfill-free CSS scroll-behavior: smooth

## Consequences
**Positive:**
- Better storytelling flow and user journey
- Single bundle load improves perceived performance
- Modern UX aligned with 2025 trends
- Easier SEO optimization (one page to optimize)
- Mobile-friendly navigation without page reloads

**Negative:**
- Longer initial page load with all content
- Less granular analytics per section
- Harder to deep-link to specific sections
- Resume not indexable separately by search engines

## Implementation Notes
- Use `useIntersectionObserver` for active nav states
- Resume opens as modal with print CSS for PDF export
- All sections lazy-loaded below fold for performance