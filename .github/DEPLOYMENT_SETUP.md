# 🚀 Deployment Setup Guide

## Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **GitHub Repository**: Connected to this project
3. **Domain** (optional): Custom domain configuration

## 1. Vercel Project Setup

### Connect GitHub Repository
```bash
# 1. Go to Vercel dashboard
# 2. Click "New Project" 
# 3. Import from GitHub: smallchungus/PortfolioWebsite
# 4. Configure project settings:
#    - Framework Preset: Vite
#    - Build Command: npm run build
#    - Output Directory: dist
#    - Install Command: npm install
```

### Environment Variables in Vercel Dashboard
Add these in Vercel → Project Settings → Environment Variables:

```bash
# Optional: Contact form integration
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key

# Optional: Analytics
VITE_GA_TRACKING_ID=your_ga_id
VITE_HOTJAR_ID=your_hotjar_id

# Optional: GitHub API for live stats
VITE_GITHUB_TOKEN=your_github_token
```

## 2. GitHub Repository Secrets

Add these in GitHub → Settings → Secrets and Variables → Actions:

```bash
VERCEL_TOKEN=your_vercel_token
VERCEL_ORG_ID=your_vercel_org_id
VERCEL_PROJECT_ID=your_vercel_project_id
```

### How to Get Vercel Credentials:

**VERCEL_TOKEN:**
1. Go to Vercel → Account Settings → Tokens
2. Create new token with appropriate scope
3. Copy the token value

**VERCEL_ORG_ID & VERCEL_PROJECT_ID:**
1. In your project root, run: `npx vercel link`
2. Follow prompts to link to your Vercel project
3. Check `.vercel/project.json` for the IDs

## 3. Domain Configuration (Optional)

### Custom Domain Setup:
1. Vercel Dashboard → Project → Settings → Domains
2. Add your custom domain: `willchenn.com`
3. Configure DNS records with your domain provider:
   ```
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   
   Type: A
   Name: @
   Values: 76.76.19.61, 76.76.19.60
   ```

## 4. Branch Strategy & Deployment Flow

```bash
# Development workflow
git checkout -b feat/new-feature
# ... make changes ...
git push origin feat/new-feature
# → Creates preview deployment

# Staging deployment (dev branch)
git checkout dev
git merge feat/new-feature
git push origin dev
# → Deploys to staging-willchenn.vercel.app

# Production deployment (main branch)  
git checkout main
git merge dev
git push origin main
# → Deploys to willchenn.com
```

## 5. Monitoring & Analytics

### GitHub Actions will automatically:
- ✅ Run tests, linting, type checking
- ✅ Build and deploy preview for PRs
- ✅ Run Lighthouse performance audits
- ✅ Deploy to staging (dev branch)
- ✅ Deploy to production (main branch)
- ✅ Security audits with npm audit

### Performance Targets:
- Performance Score: 90+
- Accessibility Score: 95+
- Best Practices: 90+
- SEO Score: 90+
- FCP: < 2s
- LCP: < 3s  
- CLS: < 0.1

## 6. Rollback Strategy

```bash
# Quick rollback on production
git revert HEAD
git push origin main

# Or rollback to specific commit
git reset --hard <commit-hash>
git push --force-with-lease origin main
```

## 7. Troubleshooting

### Build Failures:
```bash
# Test build locally
npm run predeploy
npm run build

# Check TypeScript errors
npm run type-check

# Fix linting issues
npm run lint
```

### Deployment Issues:
1. Check Vercel build logs
2. Verify environment variables
3. Test locally with `npm run preview`
4. Check GitHub Actions workflow logs

## 8. Production URLs

- **Production**: https://willchenn.com
- **Staging**: https://staging-willchenn.vercel.app  
- **PR Previews**: Auto-generated Vercel preview URLs
- **Status**: [![Website](https://img.shields.io/website?url=https://willchenn.com)](https://willchenn.com)

---

🎉 **Ready for deployment!** Push to `main` branch to go live.