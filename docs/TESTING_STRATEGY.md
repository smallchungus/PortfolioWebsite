# Testing Strategy

## 🧪 Testing Standards

**Coverage Target**: 95%+ line coverage  
**Current**: 98.68% (68 tests across 3 test suites)

### **Testing Pyramid**
- **Unit Tests (80%)**: Component behavior, hooks, utilities
- **Integration Tests (15%)**: Multi-component interactions  
- **E2E Tests (5%)**: Critical user workflows

## 🎯 Test Categories

### **Component Testing**
```typescript
describe('Hero Section', () => {
  it('displays correct typing animation sequence', async () => {
    render(<Hero />)
    const typingElement = screen.getByTestId('typing-role')
    
    await waitFor(() => {
      expect(typingElement.textContent).toMatch(/Software Engineer/)
    }, { timeout: 3000 })
  })
})
```

### **Hook Testing**
```typescript
describe('useTypingAnimation', () => {
  it('cycles through strings with correct timing', async () => {
    const { result } = renderHook(() => 
      useTypingAnimation({ strings: ['Hello', 'World'] })
    )
    
    await waitFor(() => {
      expect(result.current.displayedText).toBe('Hello')
    })
  })
})
```

### **Accessibility Testing**
```typescript
import { axe, toHaveNoViolations } from 'jest-axe'
expect.extend(toHaveNoViolations)

it('meets WCAG 2.1 AA standards', async () => {
  const { container } = render(<Hero />)
  const results = await axe(container)
  expect(results).toHaveNoViolations()
})
```

## 🔄 TDD Workflow

**Red-Green-Refactor Cycle:**
1. **Red**: Write failing test
2. **Green**: Minimal code to pass test
3. **Refactor**: Clean up implementation

## 🚀 Test Execution

```bash
# Development
npm run test:watch        # Watch mode
npm test Hero.test.tsx    # Single file

# CI/CD  
npm run test:ci           # Full suite with coverage
npm run test:coverage     # Generate coverage report
```

## 📊 Quality Gates

| Metric | Target | Current |
|---------|---------|---------|
| Lines | 95% | 98.68% |
| Functions | 90% | 100% |
| Branches | 90% | 87.23% |
| Test Runtime | <30s | 2.1s |

## 🛠️ Tools & Config

- **Framework**: Vitest + React Testing Library
- **Coverage**: v8 (built into Vitest)
- **Accessibility**: jest-axe + @axe-core/react
- **Performance**: Lighthouse CI

```typescript
// vitest.config.ts
export default defineConfig({
  test: {
    environment: 'jsdom',
    coverage: {
      thresholds: { lines: 95, functions: 90, branches: 90 }
    }
  }
})
```

## ✅ Best Practices

**Do's:**
- Test behavior, not implementation
- Use descriptive test names
- Follow AAA pattern (Arrange-Act-Assert)
- Test edge cases and error states
- Mock external dependencies only

**Don'ts:**
- Don't test implementation details
- Don't create dependent tests
- Don't ignore flaky tests
- Don't skip accessibility testing

---
*Review Schedule: Monthly*