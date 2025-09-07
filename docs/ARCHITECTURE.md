# Portfolio Architecture

## 🏗️ System Overview

**Architecture**: React SPA → Vercel Edge → GitHub CI/CD
**Stack**: React 18 + TypeScript + Tailwind + Vitest
**Deployment**: Automated via GitHub Actions with quality gates

## 📁 Component Structure

```
src/
├── components/
│   ├── sections/
│   │   ├── Hero/           # 19 tests, typing animation
│   │   ├── Projects/       # 22 tests, bento grid
│   │   └── About/          # 27 tests, skills matrix
│   └── ui/
│       └── Badge.tsx       # Reusable tech badges
├── hooks/
│   └── useTypingAnimation.ts
└── App.tsx                 # Single page layout
```

## 🎯 Design Principles

**Minimal Brutalist Design (ADR-001)**
- Typography-first, no decorative elements
- Monochromatic palette, 8px grid system
- Zero custom CSS, pure Tailwind utilities

**Performance-First (ADR-006)**
- Bundle <200KB, code splitting, edge delivery
- Core Web Vitals: LCP <1.5s, CLS <0.1, FID <100ms

**Accessibility-First (ADR-009)**
- WCAG 2.1 AA compliance with axe-core testing
- Full keyboard navigation, screen reader support

## 🔧 Technology Stack

**Core**
- React 18.2.0 (component UI)
- TypeScript 5.9.2 (type safety) 
- Vite 5.2.0 (build tool)
- Tailwind CSS 3.4.3 (styling)

**Testing**
- Vitest 3.2.4 + React Testing Library
- 98.68% coverage (68 tests across 3 suites)
- Accessibility testing with axe-core

**DevOps**
- GitHub Actions CI/CD
- Vercel hosting + CDN
- audit-ci security scanning

## 🚀 CI/CD Pipeline

**Quality Gates**
1. TypeScript compilation
2. ESLint code quality  
3. Unit tests (95%+ coverage)
4. Accessibility tests (WCAG 2.1 AA)
5. Performance tests (Lighthouse 90+)
6. Security audit (npm audit + audit-ci)

**Deployment Strategy**
- PR branches → Preview deployments
- main branch → Production (willchenn.com)
- Automated rollback on failures

## 📊 Quality Metrics

| Metric | Target | Current |
|--------|---------|---------|
| Test Coverage | 95% | 98.68% |
| Performance | 90+ | 96 |
| Accessibility | 95+ | 100 |
| Bundle Size | <200KB | ~150KB |

## 🔐 Security & Compliance

**Security Headers**: X-Frame-Options, CSP, XSS-Protection
**Dependency Security**: npm audit + audit-ci blocking moderate+ vulnerabilities
**WCAG 2.1 AA**: Automated accessibility testing
**GDPR Ready**: No tracking cookies, privacy-first

## 📈 Monitoring

**Performance**: Vercel Analytics + Lighthouse CI
**Quality**: GitHub Actions notifications  
**Security**: Dependabot + vulnerability scanning
**Uptime**: 99.9% SLA with edge redundancy

---
*Last Updated: January 2025*