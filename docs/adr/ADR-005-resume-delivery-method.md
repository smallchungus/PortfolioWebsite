# ADR-005: Resume Delivery Method

## Status
Accepted

## Context
Need strategy for resume presentation. Options: PDF download only, web view only, or hybrid approach. Must balance accessibility, ATS compatibility, and user experience.

## Decision
Implement hybrid approach: web-based resume view with PDF download option. Use react-pdf or similar to generate PDF from same data source as web view.

## Consequences
**Positive:**
- Single source of truth for resume data
- SEO-friendly web version for discoverability
- ATS-compatible PDF for applications
- Always up-to-date across formats
- Better mobile experience with web view

**Negative:**
- More complex implementation
- PDF generation adds build step
- Need to maintain formatting consistency