# ADR-001: Remove 3D Graphics for Minimal Design

## Status
Accepted

## Context
Original portfolio used Three.js with 3D island, planes, and fox models. While visually impressive, it creates performance overhead, accessibility issues, and doesn't align with modern professional portfolio trends (Stripe, Linear, Vercel).

## Decision
Remove all Three.js dependencies and 3D components. Implement clean, minimal design focused on typography, content, and fast loading.

## Consequences
**Positive:**
- 200KB+ bundle size reduction
- 2s+ faster initial load time
- Better mobile performance and battery life
- Improved accessibility (no motion-sensitive content)
- Easier to maintain and test

**Negative:**
- Less visually distinctive
- May appear generic compared to 3D version