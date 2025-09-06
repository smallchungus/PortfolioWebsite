# Will Chen - Portfolio

[![Website](https://img.shields.io/website?url=https://willchenn.com&label=willchenn.com)](https://willchenn.com)
[![Deployment](https://img.shields.io/github/deployments/smallchungus/PortfolioWebsite/production?label=deployment&logo=vercel)](https://github.com/smallchungus/PortfolioWebsite/deployments)
[![CI/CD](https://github.com/smallchungus/PortfolioWebsite/workflows/CI/CD%20Pipeline/badge.svg)](https://github.com/smallchungus/PortfolioWebsite/actions)
[![Coverage](https://codecov.io/gh/smallchungus/PortfolioWebsite/branch/main/graph/badge.svg)](https://codecov.io/gh/smallchungus/PortfolioWebsite)

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=black)](https://reactjs.org/)
[![Vitest](https://img.shields.io/badge/Tested-Vitest-6E9F18?style=flat&logo=vitest&logoColor=white)](https://vitest.dev/)
[![Lighthouse](https://img.shields.io/badge/Lighthouse-95+-00C853?style=flat&logo=lighthouse&logoColor=white)](#)

## 🚀 Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/smallchungus/PortfolioWebsite&env=VITE_PUBLIC_EMAIL,VITE_PUBLIC_GITHUB,VITE_PUBLIC_LINKEDIN&demo-title=Will%20Chen%20Portfolio&demo-description=Modern%202025%20portfolio%20with%20minimal%20brutalist%20design)

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

## Deployment & Monitoring

### Production URLs
- **Production**: [willchenn.com](https://willchenn.com)
- **Staging**: [staging-willchenn.vercel.app](https://staging-willchenn.vercel.app)
- **Preview**: Auto-generated for every PR

### CI/CD Pipeline
- ✅ **Automated Testing**: 68 tests with 95%+ coverage
- ✅ **Performance Audits**: Lighthouse CI with 90+ scores
- ✅ **Security Scanning**: npm audit + dependency checks  
- ✅ **Type Safety**: TypeScript strict mode compliance
- ✅ **Zero-Downtime Deploys**: Vercel with instant rollbacks

### Development Workflow
```bash
# Feature development
git checkout -b feat/new-feature    # → Creates preview deployment on PR
git push origin feat/new-feature

# Staging deployment  
git checkout dev                    # → Auto-deploys to staging
git merge feat/new-feature
git push origin dev

# Production deployment
git checkout main                   # → Auto-deploys to production  
git merge dev
git push origin main
```

## Links

- **Live Site**: [willchenn.com](https://willchenn.com)
- **Deployment Setup**: [Guide](.github/DEPLOYMENT_SETUP.md)
- **Architecture**: [ADR Documents](docs/adr/)
- **Performance**: [Lighthouse Reports](https://github.com/smallchungus/PortfolioWebsite/actions)
