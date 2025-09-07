# Project Architecture

## Overview
Portfolio website built with React, TypeScript, and Tailwind CSS following FAANG development standards.

## Structure
```
src/
├── components/     # React components
│   ├── common/     # Shared components (Navigation, ThemeToggle)
│   ├── sections/   # Page sections (Hero, About, Projects, Contact)
│   └── ui/         # Design system components (Badge)
├── hooks/          # Custom React hooks (useTypingAnimation, useTheme)
├── lib/            # Utility functions and helpers
├── types/          # TypeScript type definitions
└── constants/      # App constants and configuration
```

## Component Guidelines
- One component per file with colocated tests
- Exported via index.ts barrel files
- TypeScript for all new components
- Test-Driven Development (TDD) approach

## State Management
- React hooks for local component state
- Context API for theme state only
- No external state management library

## Testing Strategy
- TDD: Tests written before implementation
- Vitest + React Testing Library
- Target: 80%+ code coverage
- Integration tests preferred over unit tests

## Styling
- Tailwind CSS with dark mode support
- Responsive design (mobile-first)
- CSS-in-JS avoided (performance)

## Performance
- Code splitting by route (future)
- Lazy loading for images
- Tree shaking enabled
- Bundle analysis with Vite

## Code Quality
- ESLint + Prettier configuration
- Pre-commit hooks for formatting
- TypeScript strict mode enabled
- Conventional commit messages

## Architecture Decisions
See `docs/adr/` for detailed architectural decisions and rationale.