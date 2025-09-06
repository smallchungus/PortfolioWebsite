# ADR-006: Performance Targets - Core Web Vitals as North Star

## Status
Accepted

## Context
2025 hiring emphasizes performance engineering skills. Google's Core Web Vitals are becoming standard metrics for web quality. Portfolio should demonstrate performance best practices.

## Decision
Core Web Vitals as primary performance metrics:
- **Largest Contentful Paint (LCP)**: <1.5s (excellent threshold)
- **First Input Delay (FID)**: <100ms (excellent threshold)
- **Cumulative Layout Shift (CLS)**: <0.1 (excellent threshold)
- **First Contentful Paint (FCP)**: <1.0s
- **Time to Interactive (TTI)**: <2.5s on slow 3G

## Implementation Strategy
- **No animations on initial load**: Defer all non-critical animations
- **Image optimization**: WebP format with lazy loading and proper sizing
- **Code splitting**: Route-based and component-based splitting
- **Static generation**: Pre-render all content where possible
- **Critical CSS inlined**: Above-fold styles in HTML head
- **Web fonts**: Preload with font-display: swap

## Consequences
**Positive:**
- Demonstrates performance engineering skills to employers
- Better user experience across all devices and connections
- Higher Google search rankings due to Core Web Vitals
- Faster perceived load times improve conversion rates
- Technical competitive advantage in hiring process

**Negative:**
- More complex build process and optimization requirements
- Limited animation and interaction possibilities
- Ongoing monitoring and maintenance needed
- May restrict some design choices for performance

## Monitoring Tools
- Lighthouse CI for automated testing
- Vercel Analytics for real user monitoring
- PageSpeed Insights for periodic auditing