# Technical Specifications

## Performance Budget

### Core Metrics
- First Contentful Paint: <1.2s
- Largest Contentful Paint: <2.5s  
- Cumulative Layout Shift: <0.1
- First Input Delay: <100ms
- Time to Interactive: <3s on 3G

### Bundle Size Limits
- Initial Bundle: <300KB gzipped
- Total Assets: <500KB gzipped
- Code Splitting: Route-based chunks <100KB each

### Lighthouse Targets
- Performance: 95+ 
- Accessibility: 100
- Best Practices: 95+
- SEO: 100

## Browser Support

### Desktop
- Chrome 90+, Firefox 88+, Safari 14+, Edge 90+

### Mobile  
- iOS Safari 14+, Android Chrome 90+, Samsung Internet 14+

**Strategy**: Modern JS with Vite's built-in polyfills for critical features only.

## Responsive Design

### Breakpoints
- sm: 640px (Mobile landscape, small tablets)
- md: 768px (Tablets)
- lg: 1024px (Desktop)
- xl: 1280px (Large desktop)
- 2xl: 1536px (Ultra-wide)

### Viewport Strategy
- Mobile-first CSS approach
- Fluid typography with clamp values
- Touch-friendly interactive elements (44px minimum)
- Horizontal scrolling avoided

## Design System

### Color Palette
Primary colors: Blue-600 (#2563eb), Blue-700 (#1d4ed8)
Neutral scale: Gray-50 through Gray-900 with 9 steps
Semantic colors: Success (Emerald-500), Danger (Red-500), Warning (Amber-500)

### Typography Scale
Font sizes: 0.75rem to 3rem (12px to 48px)
Line heights: Tight (1.25), Normal (1.5), Relaxed (1.625)

### Spacing System
Based on 4px grid with 0.25rem increments
Standard spacing values: 4px, 8px, 12px, 16px, 20px, 24px, 32px, 40px, 48px, 64px, 80px, 96px

## Dark Mode Support

### Implementation Strategy
- CSS custom properties for theme switching
- prefers-color-scheme media query for system preference
- LocalStorage persistence for user choice
- Smooth transitions between modes (200ms ease)

### Color Adaptations
Light theme: White background (#ffffff), dark text (#0f172a)
Dark theme: Dark background (#0f172a), light text (#f8fafc)

## Component Architecture

### Structure Principles
- Single Responsibility: One concern per component
- Composition over inheritance
- Props interface clearly defined with TypeScript
- Error boundaries for graceful failure handling

### Naming Conventions
- Components: PascalCase (ProjectCard)
- Hooks: camelCase with 'use' prefix (useTypingAnimation)
- Utilities: camelCase (formatDate)
- Constants: UPPER_SNAKE_CASE (API_ENDPOINTS)

### Testing Strategy
Test file naming: *.test.tsx
Test categories: rendering, interactions, accessibility, edge cases

## SEO Optimization

### Meta Tags Strategy
Page-specific titles and descriptions
Open Graph tags for social sharing
Twitter Cards for enhanced previews
Structured data using Schema.org Person type

## Security Considerations

### Content Security Policy
Restrictive CSP with self-origin as default
Limited external domains for fonts and images
No unsafe-eval for script execution

### External Dependencies
- Regular security audits with npm audit
- Minimize third-party scripts
- Subresource Integrity for external resources
- Environment variables for sensitive config

## Deployment Strategy

### Build Process
1. Lint: ESLint with TypeScript rules
2. Test: Unit tests with coverage validation  
3. Type Check: TypeScript compilation
4. Build: Vite production optimization
5. Deploy: Vercel automatic deployment

### Monitoring
- Performance: Vercel Analytics + Core Web Vitals
- Errors: Console.log analysis
- Usage: Simple page view tracking