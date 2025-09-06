# ADR-004: Tailwind CSS vs Styled Components

## Status
Accepted

## Context
Need consistent styling approach. Options: Tailwind (utility-first), Styled Components (CSS-in-JS), or CSS Modules. Portfolio requires responsive design, dark/light modes, and maintainable styles.

## Decision
Use Tailwind CSS with custom design system configuration. Extend with custom utilities for brand colors and typography scale.

## Consequences
**Positive:**
- Rapid development with utility classes
- Consistent spacing and color scales
- Built-in responsive and dark mode support
- Smaller CSS bundle with purging
- Easy to maintain design tokens

**Negative:**
- HTML can become verbose with many classes
- Learning curve for team members
- Less flexibility for complex animations