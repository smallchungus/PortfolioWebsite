# Operations Runbook

## 🚨 Emergency Response

### **Site Down (P0 Incident)**
**SLA**: 15 minutes response, 1 hour resolution

```bash
# Quick diagnosis
curl -I https://willchenn.com
dig willchenn.com

# Check Vercel status
# https://vercel-status.com

# Emergency rollback
git revert HEAD
git push origin main

# Monitor recovery
watch -n 5 'curl -s -o /dev/null -w "%{http_code}" https://willchenn.com'
```

**Escalation Path**: 
1. Check Vercel status dashboard
2. Verify DNS propagation 
3. Check GitHub Actions for failed deployments
4. Contact Vercel support if infrastructure issue

### **Performance Degradation (P1 Incident)**  
**SLA**: 30 minutes response, 4 hours resolution

```bash
# Performance diagnosis
npm run build -- --analyze
npm run lighthouse

# Check bundle size
ls -la dist/assets/*.js | sort -k5 -nr

# Core Web Vitals check
# Use PageSpeed Insights API
curl "https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=https://willchenn.com"
```

**Common Causes**:
- Bundle size regression (>200KB)
- CDN cache invalidation issues
- Third-party script blocking
- Large image assets not optimized

### **Build Failures (P2 Incident)**
**SLA**: 1 hour response, 8 hours resolution

```bash
# Local debugging
npm ci
npm run type-check
npm run lint
npm test
npm run build

# Check CI logs
gh run list --limit 10
gh run view <run-id>

# Force rebuild
git commit --allow-empty -m "chore: trigger rebuild"
git push origin main
```

---

## 📊 Monitoring & Alerts

### **Daily Health Checks**
```bash
# Automated daily check script
#!/bin/bash
set -e

echo "🔍 Daily Health Check - $(date)"

# Performance check
echo "📊 Running Lighthouse audit..."
npx lighthouse https://willchenn.com --chrome-flags="--headless" --output=json > lighthouse-daily.json

# Extract key metrics
node -e "
const report = JSON.parse(require('fs').readFileSync('lighthouse-daily.json'));
console.log('Performance:', Math.round(report.lhr.categories.performance.score * 100));
console.log('Accessibility:', Math.round(report.lhr.categories.accessibility.score * 100));
console.log('Best Practices:', Math.round(report.lhr.categories['best-practices'].score * 100));
console.log('SEO:', Math.round(report.lhr.categories.seo.score * 100));
"

# Security headers check
echo "🔒 Security headers validation..."
curl -I https://willchenn.com | grep -E "(X-Frame-Options|X-Content-Type-Options|X-XSS-Protection)"

# Uptime check
echo "⚡ Uptime validation..."
status_code=$(curl -s -o /dev/null -w "%{http_code}" https://willchenn.com)
if [ $status_code -eq 200 ]; then
    echo "✅ Site is UP (HTTP $status_code)"
else
    echo "❌ Site is DOWN (HTTP $status_code)"
    exit 1
fi

echo "✅ Daily health check completed"
```

### **Alert Thresholds**
| Metric | Warning | Critical | Action |
|--------|---------|----------|--------|
| Response Time | >2s | >5s | Investigate CDN, optimize assets |
| Lighthouse Score | <90 | <80 | Performance audit, asset optimization |
| Error Rate | >1% | >5% | Check logs, rollback if needed |
| Build Time | >3min | >5min | Optimize CI pipeline, cache strategy |

---

## 🔧 Maintenance Procedures

### **Weekly Maintenance Window**
**Schedule**: Sundays 2:00 AM UTC (off-peak hours)

```bash
# 1. Dependency updates
npm audit
npm update
npm run test

# 2. Security scan
npm audit --audit-level=moderate
npx audit-ci --moderate

# 3. Performance review
npm run build -- --analyze
npm run lighthouse

# 4. Bundle optimization
npx webpack-bundle-analyzer dist/static/js/*.js

# 5. Commit maintenance updates
git add -A
git commit -m "chore: weekly maintenance - dependency updates and security patches"
git push origin main
```

### **Monthly Deep Maintenance**

```bash
# 1. Full dependency audit
npm outdated
npm audit fix

# 2. Code quality review
npm run lint -- --fix
npm run type-check

# 3. Performance benchmark
npm run lighthouse -- --view
npm run test:coverage

# 4. Security review
npx check-outdated
npx nsp check

# 5. Documentation update
# Review and update all documentation
# Check for broken links in README and docs/
```

---

## 📈 Performance Optimization

### **Bundle Analysis Workflow**
```bash
# Generate bundle report
npm run build -- --analyze

# Analyze largest chunks
npx webpack-bundle-analyzer dist/static/js/*.js --mode server

# Check for duplicate dependencies
npx duplicate-package-checker-webpack-plugin

# Tree-shaking validation
npx webpack-bundle-analyzer dist/static/js/*.js --mode static
```

### **Core Web Vitals Optimization**

#### **Largest Contentful Paint (LCP) < 2.5s**
```bash
# Image optimization
npx imagemin src/assets/images/* --out-dir=src/assets/images/optimized

# Critical path CSS
npx critical https://willchenn.com --base dist --inline

# Resource hints
# Add preload/prefetch hints to index.html
```

#### **First Input Delay (FID) < 100ms**
```bash
# Code splitting analysis
npx bundlesize
npx size-limit

# JavaScript optimization
npx terser dist/assets/*.js --compress --mangle
```

#### **Cumulative Layout Shift (CLS) < 0.1**
```bash
# Layout validation
npx puppeteer-cls-checker https://willchenn.com

# Font loading optimization
# Implement font-display: swap
# Preload critical fonts
```

---

## 🔐 Security Operations

### **Vulnerability Management**
```bash
# Daily security scan
npm audit --audit-level=moderate
npx audit-ci --moderate

# Dependency vulnerability check
npx better-npm-audit audit --level moderate

# Check for known security issues
npx snyk test
```

### **Security Headers Validation**
```bash
# Test security headers
curl -I https://willchenn.com | grep -E "(X-Frame-Options|X-Content-Type-Options|X-XSS-Protection|Strict-Transport-Security)"

# Comprehensive security check
npx observatory-cli https://willchenn.com

# SSL/TLS validation
npx ssllabs-scan --host willchenn.com
```

---

## 📋 Deployment Checklist

### **Pre-deployment**
- [ ] All tests passing (`npm test`)
- [ ] TypeScript compilation successful (`npm run type-check`)  
- [ ] No linting errors (`npm run lint`)
- [ ] Bundle size within limits (<200KB total)
- [ ] Lighthouse score >95 (`npm run lighthouse`)
- [ ] Security audit clean (`npm audit`)

### **Deployment Process**
```bash
# 1. Final validation
npm run predeploy

# 2. Deploy to production
git push origin main

# 3. Verify deployment
curl -I https://willchenn.com
npm run lighthouse -- --url=https://willchenn.com

# 4. Monitor for 10 minutes
# Check error rates, performance metrics
```

### **Post-deployment**
- [ ] Site loads successfully
- [ ] Core Web Vitals within targets
- [ ] Error monitoring shows no new errors
- [ ] Performance metrics stable
- [ ] SEO meta tags rendering correctly

---

## 📞 On-call Information

### **Primary Contacts**
- **Engineering**: GitHub Issues / Email
- **Infrastructure**: Vercel Support  
- **DNS**: Domain registrar support
- **Security**: Security team on-call rotation

### **Useful Links**
- **Status Page**: [Vercel Status](https://vercel-status.com)
- **Monitoring**: [GitHub Actions](https://github.com/smallchungus/PortfolioWebsite/actions)
- **Performance**: [PageSpeed Insights](https://pagespeed.web.dev/?url=https://willchenn.com)
- **Uptime**: [Uptime monitoring dashboard]
- **Documentation**: [Project README](/README.md)

### **Escalation Matrix**
| Severity | Response Time | Resolution Time | Escalation |
|----------|---------------|-----------------|------------|
| P0 - Site Down | 15 minutes | 1 hour | Immediate |
| P1 - Performance | 30 minutes | 4 hours | Within 1 hour |
| P2 - Build Issues | 1 hour | 8 hours | Within 4 hours |
| P3 - Minor Issues | 24 hours | 72 hours | Next business day |

---

*Last Updated: January 2025*  
*Next Review: Quarterly (March 2025)*