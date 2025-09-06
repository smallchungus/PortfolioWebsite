# ADR-003: Tech Stack for 2025 Portfolio

## Status
Accepted

## Context
Need modern, performant stack that showcases current best practices. Options include React ecosystem, Vue, or Svelte. React remains dominant in FAANG hiring with strong TypeScript support.

## Decision
React + TypeScript + Tailwind CSS stack:
- **React 18**: Latest stable with concurrent features
- **TypeScript**: Strict mode for enterprise-grade type safety
- **Vite**: Lightning-fast builds and HMR
- **Tailwind CSS**: Utility-first with custom design tokens
- **Framer Motion**: Minimal, purposeful animations only
- **React Hook Form**: Performance-optimized form handling
- **No UI library**: Custom components to demonstrate skills

## Consequences
**Positive:**
- Aligns with FAANG tech stacks and hiring preferences
- Excellent DX with fast builds and type safety
- Full control over design and bundle size
- Modern React patterns (hooks, suspense, concurrent features)
- Easy deployment to Vercel/Netlify

**Negative:**
- Need to build all components from scratch
- More initial setup compared to UI libraries
- Requires maintaining custom design system

## Alternative Libraries Considered
- **Chakra UI**: Too opinionated, adds bundle weight
- **Material UI**: Doesn't fit minimal aesthetic
- **Next.js**: Overkill for static portfolio site