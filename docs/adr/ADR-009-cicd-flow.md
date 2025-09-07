# ADR-009: CI/CD Auto-merge Flow

**Date**: 2025-01-09
**Status**: Accepted

## Context

Need automated quality gates before production deployment with minimal manual intervention. Current manual merge process from dev→main creates bottlenecks and human error risk.

## Decision

Implement automated dev→main merge with comprehensive quality gates:

### Flow Architecture
```
feature → dev (quality gates) → main (auto-merge) → Vercel
```

### Quality Gates (all must pass)
- **Type checking**: TypeScript strict mode validation
- **Linting**: ESLint with 0 warnings tolerance
- **Testing**: All tests pass + coverage reporting  
- **Security**: npm audit critical/high vulnerabilities
- **Build**: Production build must succeed

## Implementation

- **Trigger**: Push to dev branch
- **Automation**: GitHub Actions auto-merge on success
- **Safety**: No-fast-forward merge preserves history
- **Monitoring**: Codecov integration for coverage tracking

## Alternatives Considered

1. **Manual merge**: Human bottleneck, error-prone
2. **Direct to main**: No staging validation
3. **Pull request flow**: Added friction for single maintainer

## Consequences

### Positive
- Zero manual intervention for releases
- Comprehensive quality assurance
- Fast feedback loop (< 3 minutes)
- Main branch always deployable

### Negative  
- Additional step in deployment flow
- Requires all team members follow dev→main pattern
- Auto-merge dependency on GitHub Actions reliability

## Success Metrics

- Main branch build success rate: >99%
- Average deployment time: <5 minutes  
- Critical vulnerabilities in production: 0