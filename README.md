# Will Chen - Portfolio

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=black)](https://reactjs.org/)
[![Vitest](https://img.shields.io/badge/Tested-Vitest-6E9F18?style=flat&logo=vitest&logoColor=white)](https://vitest.dev/)
[![Lighthouse](https://img.shields.io/badge/Lighthouse-95+-00C853?style=flat&logo=lighthouse&logoColor=white)](#)
[![Vercel](https://img.shields.io/badge/Deploy-Vercel-000000?style=flat&logo=vercel&logoColor=white)](#)

Modern portfolio showcasing full-stack engineering skills with enterprise-grade practices.

## Quick Start

```bash
npm install && npm run dev    # Start development
npm test                      # Run test suite  
npm run build                 # Production build
```

## Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Build**: Vite with HMR and optimized bundling  
- **Testing**: Vitest, React Testing Library (80%+ coverage)
- **Deploy**: Vercel with automatic previews

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Hero.tsx        # Landing page hero section
│   └── Hero.test.tsx   # Component tests
├── pages/              # Route components  
├── hooks/              # Custom React hooks
└── constants/          # Static data and config

docs/
├── adr/               # Architecture Decision Records
├── SITEMAP.md         # Site structure and navigation
├── TECHNICAL.md       # Performance specs and requirements  
└── CONTRIBUTING.md    # Development workflow
```

## Performance Budget

- **Load Time**: <2s on 3G
- **Lighthouse**: 95+ all metrics
- **Bundle Size**: <500KB gzipped
- **Accessibility**: WCAG 2.1 AA compliant

## Links

- **Live Site**: [willchen.dev](#) *(Coming soon)*
- **Design System**: [Figma](docs/TECHNICAL.md#design-tokens) *(Internal)*
- **Architecture**: [ADR Documents](docs/adr/)
