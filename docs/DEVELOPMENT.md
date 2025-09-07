# Development Guide

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run tests in watch mode
npm run test:watch

# Run all quality checks
npm run validate
```

## 📋 Available Scripts

### Development
- `npm run dev` - Start development server
- `npm run start` - Alias for `npm run dev`
- `npm run build` - Build for production
- `npm run build:analyze` - Build with bundle analysis
- `npm run preview` - Preview production build locally

### Testing
- `npm test` - Run tests in watch mode
- `npm run test:run` - Run tests once
- `npm run test:ci` - Run tests with coverage for CI
- `npm run test:watch` - Run tests in watch mode
- `npm run test:ui` - Run tests with UI interface
- `npm run test:coverage` - Run tests with coverage report

### Code Quality
- `npm run lint` - Run ESLint with zero warnings policy
- `npm run lint:fix` - Fix ESLint issues automatically
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check if code is formatted
- `npm run type-check` - Run TypeScript type checking
- `npm run type-check:watch` - Run type checking in watch mode

### Maintenance
- `npm run clean` - Clean build artifacts and cache
- `npm run validate` - Run all quality checks (type-check + lint + test + build)

### Deployment
- `npm run deploy:prod` - Deploy to production (pushes to main)
- `npm run deploy:staging` - Deploy to staging (pushes to dev)

## 🏗️ Project Structure

```
├── .github/                # GitHub Actions CI/CD
│   └── workflows/
│       └── ci.yml         # Main CI/CD pipeline
├── .vscode/               # VS Code configuration
│   ├── extensions.json    # Recommended extensions
│   └── settings.json      # Workspace settings
├── coverage/              # Test coverage reports
├── dist/                  # Production build output
├── docs/                  # Project documentation
├── public/                # Static assets
├── src/                   # Source code
│   ├── components/        # React components
│   │   ├── sections/      # Page sections
│   │   └── ui/           # Reusable UI components
│   ├── hooks/            # Custom React hooks
│   ├── pages/            # Page components (legacy)
│   ├── App.jsx           # Root application component
│   └── main.jsx          # Application entry point
├── .eslintrc.cjs         # ESLint configuration
├── .gitignore            # Git ignore rules
├── .lintstagedrc.json    # Lint-staged configuration
├── .prettierrc           # Prettier configuration
├── package.json          # Dependencies and scripts
├── tailwind.config.js    # Tailwind CSS configuration
├── tsconfig.json         # TypeScript configuration
├── vite.config.js        # Vite build configuration
└── vitest.config.js      # Vitest test configuration
```

## 🧪 Testing

### Test Structure
- All test files use the `.test.tsx` extension
- Tests are co-located with their components
- Comprehensive test coverage (95%+ target)

### Test Types
- **Unit Tests**: Individual component functionality
- **Integration Tests**: Component interactions
- **Accessibility Tests**: Screen reader compatibility
- **Performance Tests**: Render efficiency
- **Design System Tests**: Consistent styling

### Running Tests
```bash
# Watch mode for development
npm run test:watch

# Single run for CI
npm run test:ci

# With UI interface
npm run test:ui

# Coverage report
npm run test:coverage
```

## 🎨 Code Style

### Formatting
- **Prettier** for consistent code formatting
- **2 spaces** for indentation
- **Single quotes** for strings
- **No semicolons**
- **Trailing commas** in ES5-compatible locations

### Linting
- **ESLint** with TypeScript support
- **Zero warnings policy** in CI
- **React** and **React Hooks** specific rules
- **Accessibility** linting

### TypeScript
- Strict mode enabled
- No explicit `any` types
- Path aliases configured
- Import/export consistency

## 🔧 Development Workflow

### Before Starting Development
1. Install VS Code recommended extensions
2. Enable format on save in VS Code
3. Run `npm run validate` to ensure everything works

### Making Changes
1. Create feature branch: `git checkout -b feat/your-feature`
2. Make changes with tests
3. Run quality checks: `npm run validate`
4. Commit with conventional commits
5. Push and create PR

### Pre-commit Hooks
- Lint-staged runs automatically on commit
- Fixes formatting and linting issues
- Runs type checking
- Prevents bad commits from being pushed

## 🏢 FAANG Standards

### Code Quality
- **95%+ test coverage** maintained
- **Zero ESLint warnings** in CI
- **TypeScript strict mode** enforced
- **Accessibility compliance** tested

### Performance
- **Bundle size monitoring** via build analyze
- **Component memoization** where appropriate
- **Lazy loading** for route components
- **Optimized asset loading**

### Security
- **Dependency auditing** in CI pipeline
- **No secrets in code** (environment variables)
- **Content Security Policy** headers
- **Regular security updates**

### CI/CD Pipeline
- **Multi-stage pipeline**: Test → Security → Build → Deploy
- **Quality gates** prevent bad deployments
- **Parallel job execution** for speed
- **Artifact management** with retention policies

## 🐛 Troubleshooting

### Common Issues

**Type errors after dependency updates:**
```bash
npm run clean
npm install
npm run type-check
```

**Test failures:**
```bash
npm run test:coverage
# Check coverage reports in coverage/
```

**Build failures:**
```bash
npm run clean
npm run build
```

**Linting errors:**
```bash
npm run lint:fix
npm run format
```

### Getting Help
1. Check the test output for specific errors
2. Run `npm run validate` to see all issues
3. Check VS Code Problems panel
4. Review CI/CD pipeline logs in GitHub Actions