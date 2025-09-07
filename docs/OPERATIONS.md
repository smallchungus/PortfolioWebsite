# Operations Runbook

## 🚨 Emergency Response

### **Site Down (P0)**
**SLA**: 15 min response, 1 hour resolution

```bash
# Quick check
curl -I https://willchenn.com
# Emergency rollback
git revert HEAD && git push origin main
```

**Escalation**: Vercel status → GitHub Actions → DNS check

### **Performance Issues (P1)**
**SLA**: 30 min response, 4 hours resolution

```bash
# Diagnose
npm run build -- --analyze
npm run lighthouse
# Check bundle size
ls -la dist/assets/*.js | sort -k5 -nr
```

### **Build Failures (P2)**
**SLA**: 1 hour response, 8 hours resolution

```bash
# Debug locally
npm ci && npm run type-check && npm run lint && npm test && npm run build
# Force rebuild
git commit --allow-empty -m "chore: trigger rebuild" && git push origin main
```

## 📊 Daily Health Check

```bash
#!/bin/bash
# Performance check
npx lighthouse https://willchenn.com --chrome-flags="--headless" --output=json

# Security headers
curl -I https://willchenn.com | grep -E "(X-Frame|X-Content|X-XSS)"

# Uptime validation
curl -s -o /dev/null -w "%{http_code}" https://willchenn.com
```

## 🔧 Weekly Maintenance

```bash
# Dependencies & security
npm audit && npm update && npm run test
npx audit-ci --moderate

# Performance review  
npm run build -- --analyze && npm run lighthouse

# Commit updates
git add -A && git commit -m "chore: weekly maintenance" && git push origin main
```

## 🚀 Deployment Checklist

**Pre-deploy:**
- [ ] Tests pass (`npm test`)
- [ ] TypeScript compiles (`npm run type-check`)
- [ ] No lint errors (`npm run lint`)
- [ ] Bundle size <200KB
- [ ] Lighthouse score >95

**Deploy:** `git push origin main`

**Post-deploy:**
- [ ] Site loads at https://willchenn.com
- [ ] Performance metrics stable
- [ ] No error spikes

## 📞 Contacts & Links

- **Status**: [Vercel Status](https://vercel-status.com)
- **Performance**: [PageSpeed Insights](https://pagespeed.web.dev/?url=https://willchenn.com)
- **Monitoring**: [GitHub Actions](https://github.com/smallchungus/PortfolioWebsite/actions)

### **Alert Thresholds**
| Metric | Warning | Critical |
|--------|---------|----------|
| Response Time | >2s | >5s |
| Lighthouse Score | <90 | <80 |
| Error Rate | >1% | >5% |

---
*Last Updated: January 2025*