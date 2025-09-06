# Will Chen - Portfolio

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=black)](https://reactjs.org/)
[![Vitest](https://img.shields.io/badge/Tested-Vitest-6E9F18?style=flat&logo=vitest&logoColor=white)](https://vitest.dev/)
[![Lighthouse](https://img.shields.io/badge/Lighthouse-95+-00C853?style=flat&logo=lighthouse&logoColor=white)](#)
[![Vercel](https://img.shields.io/badge/Deploy-Vercel-000000?style=flat&logo=vercel&logoColor=white)](#)

Modern 2025 portfolio with minimal brutalist design, showcasing full-stack engineering skills through performance and accessibility.

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
├── components/         # Reusable UI components
│   ├── Hero.tsx       # Landing page hero section
│   └── Resume.tsx     # Interactive resume modal
├── sections/          # Page sections (single-page app)
│   ├── Hero.tsx       # Hero section with typing animation
│   └── Projects.tsx   # Project showcase with bento grid
├── tests/             # Test-driven development suite
│   ├── sections/      # Section component tests
│   └── components/    # Reusable component tests
├── hooks/             # Custom React hooks
└── constants/         # Static data and configuration

docs/
├── adr/              # Architecture Decision Records (2025)
├── SITEMAP.md        # Site structure and navigation
├── TECHNICAL.md      # Performance specs and requirements  
└── CONTRIBUTING.md   # Development workflow
```

## 2025 Architecture Highlights

- **Design Philosophy**: Minimal brutalist inspired by Linear.app/Stripe
- **Single Page**: Smooth scroll sections (Hero → Experience → Projects → Contact)
- **Core Web Vitals**: LCP <1.5s, CLS <0.1, FID <100ms
- **Quality Focus**: Max 4 projects with metrics and live demos
- **Resume Strategy**: Interactive web view + native PDF export

## Links

- **Live Site**: [willchen.dev](#) *(Coming soon)*
- **Design System**: [Figma](docs/TECHNICAL.md#design-tokens) *(Internal)*
- **Architecture**: [ADR Documents](docs/adr/)
