# ADR-004: Resume Strategy - Interactive Web + PDF Export

## Status
Accepted

## Context
Need strategy that serves both human readers (recruiters, hiring managers) and ATS systems. Options: PDF-only, web-only, or hybrid approach. Modern approach favors web-first with PDF export capability.

## Decision
Interactive web resume with native PDF export:
- **Web-first**: HTML resume with responsive design
- **Print CSS**: Optimized styles for PDF generation
- **One-click export**: `window.print()` for PDF download
- **ATS-friendly**: Semantic HTML structure for parsing
- **Dynamic content**: URL params for role customization (`?role=frontend`)
- **Modal overlay**: Opens over portfolio, not separate page

## Consequences
**Positive:**
- Single source of truth for resume data
- Always up-to-date across formats
- Better mobile experience than PDF
- SEO benefits from web version
- Demonstrates modern web development skills
- ATS compatibility with semantic HTML

**Negative:**
- More complex implementation than static PDF
- Browser print variations across different systems
- Need to maintain print CSS alongside regular styles

## Implementation Details
- TypeScript interface for resume data structure
- Print media queries for PDF optimization
- URL parameter handling for role customization
- Semantic HTML: `<section>`, `<article>`, `<time>` tags