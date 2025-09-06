# ADR-002: TypeScript over JavaScript

## Status
Accepted

## Context
Original codebase used JavaScript. For professional portfolio targeting FAANG-level positions, type safety and tooling improvements are essential for demonstrating engineering best practices.

## Decision
Migrate to TypeScript with strict mode enabled. Implement comprehensive type definitions for all components and utilities.

## Consequences
**Positive:**
- Enhanced IDE support and developer experience
- Catch errors at compile time vs runtime
- Better code documentation through types
- Demonstrates modern development practices
- Easier refactoring and maintenance

**Negative:**
- Initial migration overhead
- Slightly more verbose syntax
- Additional build step complexity