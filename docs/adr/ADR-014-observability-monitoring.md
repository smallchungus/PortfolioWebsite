# ADR-014: Observability and Monitoring

## Status
Accepted

## Context
Need comprehensive monitoring for production portfolio website following SRE practices with performance tracking, error detection, and automated alerting.

## Decision
Three-layer observability stack:
- **Infrastructure**: Vercel Analytics (uptime, CDN health, deployment status)
- **Performance**: Lighthouse CI + Core Web Vitals (LCP, FID, CLS monitoring)
- **Quality**: GitHub Actions monitoring, test coverage tracking, security scanning

Critical alerts for site downtime and performance regression >20%.
Warning alerts for Lighthouse score drops >10 points.

## Implementation Strategy
- Vercel Analytics for built-in performance monitoring
- Lighthouse CI for automated performance regression detection
- GitHub Actions notifications for build failures
- Performance budgets enforced in CI/CD pipeline

## Consequences
**Positive:**
- Proactive issue detection before users impacted
- Performance metrics guide optimization decisions
- Professional monitoring demonstrates SRE competence
- Data-driven insights for continuous improvement

**Negative:**
- Alert fatigue risk if thresholds too sensitive
- Additional monitoring tools complexity
- Balance needed between observability and privacy

## Monitoring Tools
- Vercel Analytics for real-time performance data
- Lighthouse CI for automated performance testing
- GitHub Actions for deployment and build monitoring