# ADR-003: Static Site vs CMS/Blog

## Status
Accepted

## Context
Need to decide between static content (faster, simpler) vs dynamic CMS (more flexible for blog posts). Portfolio primarily showcases existing work rather than frequent content updates.

## Decision
Use static site generation with Vite. Add optional `/writing` section with MDX for technical articles. No complex CMS or database required.

## Consequences
**Positive:**
- Maximum performance and reliability
- Easy deployment to CDN (Vercel, Netlify)
- No server maintenance or security updates
- Version controlled content
- Perfect Lighthouse scores possible

**Negative:**
- Content updates require code deployments
- No admin interface for non-technical editors
- Limited dynamic features (comments, search)