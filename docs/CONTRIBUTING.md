# Contributing to Portfolio

## Development Workflow

### Branch Strategy
```bash
main                    # Production-ready code
├── feature/hero-v2     # New features
├── fix/mobile-nav      # Bug fixes  
└── docs/architecture   # Documentation updates
```

### Getting Started
```bash
# Clone and setup
git clone <repo-url>
cd PortfolioWebsite
npm install

# Create feature branch
git checkout -b feature/project-cards
```

## Commit Convention

Follow conventional commits for automated changelog generation:

```bash
feat(hero): add typing animation
fix(nav): mobile menu overlay z-index
docs(adr): add decision for resume strategy
test(hero): increase coverage to 95%
perf(images): optimize project thumbnails
refactor(hooks): extract useTypingAnimation
```

**Types**: `feat`, `fix`, `docs`, `test`, `perf`, `refactor`, `ci`, `chore`

## Pull Request Process

### 1. Pre-PR Checklist
- [ ] Tests pass: `npm test`
- [ ] Build successful: `npm run build`  
- [ ] Linting clean: `npm run lint`
- [ ] Coverage maintained: `npm run test:coverage`

### 2. PR Template
```markdown
## Changes
- Brief description of what changed

## Testing
- [ ] Unit tests added/updated
- [ ] Manual testing completed
- [ ] Responsive design verified

## Performance
- Bundle size impact: +/- XkB
- Lighthouse score: before/after

## Screenshots
[If UI changes, include before/after]
```

### 3. Review Requirements
- At least 1 approval required
- All CI checks must pass
- No merge conflicts
- Squash and merge preferred

## Testing Standards

### Coverage Requirements
- **New components**: 90%+ coverage required
- **Modified components**: Cannot decrease existing coverage
- **Critical paths**: 100% coverage (authentication, payments)

### Test Structure
```typescript
describe('ComponentName', () => {
  it('renders without crashing', () => {
    // Basic smoke test
  })
  
  it('handles user interactions', () => {
    // User event testing
  })
  
  it('meets accessibility requirements', () => {
    // A11y validation
  })
})
```

## Performance Guidelines

### Bundle Size
- New dependencies require justification
- Analyze impact: `npm run analyze`
- Consider alternatives for large libraries

### Lighthouse Scores
- Performance: 95+
- Accessibility: 100
- Best Practices: 95+  
- SEO: 100

## Code Style

### TypeScript
- Strict mode enabled
- Explicit return types for public functions
- Avoid `any` type

### React
- Functional components with hooks
- PropTypes for external-facing components  
- Memoization for expensive operations

### Styling
- Tailwind utilities preferred
- Custom CSS only when necessary
- Mobile-first responsive design

## Release Process

### Production Deployment
1. Merge approved PR to `main`
2. Automatic Vercel deployment
3. Smoke test production site
4. Update project status if needed

### Rollback Process
If issues detected:
1. Revert commit via GitHub
2. Fix issue in new PR
3. Re-deploy when ready