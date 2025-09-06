# Technical Specifications

## Performance Budget

### Core Metrics
- **First Contentful Paint**: <1.2s
- **Largest Contentful Paint**: <2.5s  
- **Cumulative Layout Shift**: <0.1
- **First Input Delay**: <100ms
- **Time to Interactive**: <3s on 3G

### Bundle Size Limits
- **Initial Bundle**: <300KB gzipped
- **Total Assets**: <500KB gzipped
- **Code Splitting**: Route-based chunks <100KB each

### Lighthouse Targets
- Performance: 95+ 
- Accessibility: 100
- Best Practices: 95+
- SEO: 100

## Browser Support

### Desktop
- Chrome 90+
- Firefox 88+  
- Safari 14+
- Edge 90+

### Mobile  
- iOS Safari 14+
- Android Chrome 90+
- Samsung Internet 14+

**Strategy**: Modern JS with Vite's built-in polyfills for critical features only.

## Responsive Design

### Breakpoints
```scss
sm: 640px   // Mobile landscape, small tablets
md: 768px   // Tablets  
lg: 1024px  // Desktop
xl: 1280px  // Large desktop
2xl: 1536px // Ultra-wide
```

### Viewport Strategy
- Mobile-first CSS approach
- Fluid typography (clamp values)
- Touch-friendly interactive elements (44px minimum)
- Horizontal scrolling avoided

## Design System

### Color Palette
```scss
// Semantic Colors
--color-primary: #2563eb     // Blue-600
--color-primary-dark: #1d4ed8  // Blue-700
--color-secondary: #64748b   // Slate-500
--color-success: #10b981     // Emerald-500
--color-danger: #ef4444      // Red-500
--color-warning: #f59e0b     // Amber-500

// Neutral Scale
--gray-50: #f8fafc
--gray-100: #f1f5f9
--gray-200: #e2e8f0
--gray-300: #cbd5e1
--gray-400: #94a3b8
--gray-500: #64748b
--gray-600: #475569
--gray-700: #334155
--gray-800: #1e293b
--gray-900: #0f172a
```

### Typography Scale
```scss
// Font Sizes (rem)
--text-xs: 0.75rem      // 12px
--text-sm: 0.875rem     // 14px  
--text-base: 1rem       // 16px
--text-lg: 1.125rem     // 18px
--text-xl: 1.25rem      // 20px
--text-2xl: 1.5rem      // 24px
--text-3xl: 1.875rem    // 30px
--text-4xl: 2.25rem     // 36px
--text-5xl: 3rem        // 48px

// Line Heights
--leading-tight: 1.25
--leading-normal: 1.5
--leading-relaxed: 1.625
```

### Spacing System
Based on 4px grid (0.25rem increments):
```scss
4px, 8px, 12px, 16px, 20px, 24px, 32px, 40px, 48px, 64px, 80px, 96px
```

## Dark Mode Support

### Implementation Strategy
- CSS custom properties for theme switching
- `prefers-color-scheme` media query for system preference
- LocalStorage persistence for user choice
- Smooth transitions between modes (200ms ease)

### Color Adaptations
```scss
:root[data-theme="light"] {
  --bg-primary: #ffffff;
  --text-primary: #0f172a;
}

:root[data-theme="dark"] {
  --bg-primary: #0f172a;
  --text-primary: #f8fafc;
}
```

## Component Architecture

### Structure Principles
- Single Responsibility: One concern per component
- Composition over inheritance
- Props interface clearly defined with TypeScript
- Error boundaries for graceful failure handling

### Naming Conventions
```typescript
// Components: PascalCase
export const ProjectCard: React.FC<ProjectCardProps>

// Hooks: camelCase with 'use' prefix
export const useTypingAnimation

// Utilities: camelCase
export const formatDate

// Constants: UPPER_SNAKE_CASE
export const API_ENDPOINTS
```

### Testing Strategy
```typescript
// Test file naming: *.test.tsx
// Test categories:
describe('ComponentName', () => {
  describe('rendering', () => {})      // Visual output tests
  describe('interactions', () => {})   // User event tests  
  describe('accessibility', () => {})  // A11y compliance
  describe('edge cases', () => {})     // Error conditions
})
```

## SEO Optimization

### Meta Tags Strategy
```html
<!-- Per-page customization -->
<title>Will Chen - Full Stack Engineer</title>
<meta name="description" content="Full stack engineer specializing in React, TypeScript, and scalable web applications.">

<!-- Open Graph -->
<meta property="og:title" content="Will Chen - Portfolio">
<meta property="og:type" content="website">
<meta property="og:image" content="/og-image.jpg">
<meta property="og:url" content="https://willchen.dev">

<!-- Twitter Cards -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:creator" content="@willchen">
```

### Structured Data
```json
{
  "@context": "https://schema.org",
  "@type": "Person", 
  "name": "Will Chen",
  "jobTitle": "Software Engineer",
  "url": "https://willchen.dev",
  "sameAs": [
    "https://github.com/willchen",
    "https://linkedin.com/in/willchen"
  ]
}
```

## Security Considerations

### Content Security Policy
```
default-src 'self';
script-src 'self' 'unsafe-inline' *.vercel.app;
style-src 'self' 'unsafe-inline' fonts.googleapis.com;
img-src 'self' data: *.githubusercontent.com;
font-src 'self' fonts.gstatic.com;
```

### External Dependencies
- Regular security audits: `npm audit`
- Minimize third-party scripts
- Subresource Integrity for external resources
- Environment variables for sensitive config

## Deployment Strategy

### Build Process
1. **Lint**: ESLint with TypeScript rules
2. **Test**: Unit tests with coverage validation  
3. **Type Check**: TypeScript compilation
4. **Build**: Vite production optimization
5. **Deploy**: Vercel automatic deployment

### Environment Configuration
```bash
# Development
VITE_APP_ENV=development
VITE_APP_ANALYTICS_ID=

# Production  
VITE_APP_ENV=production
VITE_APP_ANALYTICS_ID=G-XXXXXXXXXX
VITE_APP_EMAILJS_SERVICE_ID=service_xxxxxx
```

### Monitoring
- **Performance**: Vercel Analytics + Core Web Vitals
- **Errors**: Console.log analysis (no external service needed)
- **Usage**: Simple page view tracking