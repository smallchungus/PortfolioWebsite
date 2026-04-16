# Resume URL Consolidation

**Date:** 2026-04-16
**Status:** Approved, pending implementation

## Problem

The resume URL (`https://drive.google.com/file/d/1a21bg5sKo2-TNZ1SGH0_RRnyEjPxxYhV/view`) is hardcoded in 5 source locations plus 2 test assertions:

- [src/constants/index.ts:18](../../../src/constants/index.ts#L18)
- [src/lib/notion/transform.ts:145](../../../src/lib/notion/transform.ts#L145) (fallback branch)
- [src/lib/notion/transform.ts:155](../../../src/lib/notion/transform.ts#L155) (fallback branch)
- [src/content/fallback-content.json:16](../../../src/content/fallback-content.json#L16)
- [src/content/notion-content.json:16](../../../src/content/notion-content.json#L16) (generated; regenerates on build)
- [src/components/sections/Hero/Hero.test.tsx:77](../../../src/components/sections/Hero/Hero.test.tsx#L77)
- [src/components/sections/Contact/Contact.test.tsx:34](../../../src/components/sections/Contact/Contact.test.tsx#L34)

Changing the URL today means touching every one of these. An unused [public/WillChen_Resume.pdf](../../../public/WillChen_Resume.pdf) also sits in the repo with no references.

## Goal

Serve the resume from the portfolio's own domain via Vercel's static assets, and route all references to it through a single constant. Retire the Google Drive URL.

Update workflow after this change: edit `.tex` in Overleaf → download compiled PDF → replace `public/WillChen_Resume.pdf` → commit → deploy. The served URL (`/WillChen_Resume.pdf`) is stable forever because it's a path, not a Drive file ID.

## Non-goals

- **Content sync.** Updating Notion or [src/content/fallback-content.json](../../../src/content/fallback-content.json) to reflect the new Data Engineer resume (Newark NJ, Viatris, Isaac Lab, Distributed Task Queue project, etc.) is a separate spec.
- **LaTeX CI automation.** Auto-compiling `.tex` → PDF on push to the resume repo was considered and rejected as over-engineered for a resume updated a handful of times a year. Manual download + commit is the accepted workflow.
- **SEO, UI refresh, other improvements** flagged in conversation. Separate specs.

## Design

### Conceptual split

The resume URL becomes **app config, not CMS content** — it points to a file committed to this same repo, so there is no reason to route its location through Notion. The other content (job descriptions, project descriptions) remains CMS-owned.

Concretely: the `resume` object is removed from `ContactInfoSchema` and from the Notion transform. A new `RESUME_PATH` constant lives in [src/constants/index.ts](../../../src/constants/index.ts) and is re-exported from [src/content/index.ts](../../../src/content/index.ts) alongside the existing named exports (`contactInfo`, `projects`, etc.).

The currently unused `isExternal: boolean` field is deleted as dead code.

### File changes

| File | Change |
|---|---|
| [src/constants/index.ts](../../../src/constants/index.ts) | Replace the hardcoded Drive-based resume object with `export const RESUME_PATH = '/WillChen_Resume.pdf'`. Preserve any other constants. |
| [src/lib/notion/schemas.ts](../../../src/lib/notion/schemas.ts) | Remove the `resume` field from `ContactInfoSchema`. |
| [src/lib/notion/transform.ts](../../../src/lib/notion/transform.ts) | Remove `resume` object from both the Notion-present and fallback branches of the `contact` transform. |
| [src/content/fallback-content.json](../../../src/content/fallback-content.json) | Remove `resume` object from `contact`. |
| [src/content/notion-content.json](../../../src/content/notion-content.json) | Same. Will also regenerate on next `npm run build`. |
| [src/content/index.ts](../../../src/content/index.ts) | Add `export { RESUME_PATH } from '@/constants'` alongside existing exports. |
| [src/components/sections/Hero/Hero.tsx](../../../src/components/sections/Hero/Hero.tsx) | Replace `contactInfo.resume.url` with `RESUME_PATH`. |
| [src/components/sections/Contact/Contact.tsx](../../../src/components/sections/Contact/Contact.tsx) | Same. |
| [src/components/sections/Hero/Hero.test.tsx](../../../src/components/sections/Hero/Hero.test.tsx) | Update assertion to `/WillChen_Resume.pdf`. |
| [src/components/sections/Contact/Contact.test.tsx](../../../src/components/sections/Contact/Contact.test.tsx) | Same. |
| [public/WillChen_Resume.pdf](../../../public/WillChen_Resume.pdf) | User replaces with latest Data Engineer PDF before pushing. On-disk filename stays `WillChen_Resume.pdf` regardless of what Overleaf exports it as — the public URL (`/WillChen_Resume.pdf`) depends on this name being stable. |

### Data flow

Before:
```
Notion DB --> transform.ts --> contact.resume.url --> components
                 (or fallback)       ^
                                     |
                             Drive URL (hardcoded)
```

After:
```
constants/index.ts --> RESUME_PATH --> components (direct import)

Notion DB --> transform.ts --> contact object (no resume field)
```

### Error handling

No runtime branches change. Zod validation is relaxed by removing a required field — existing content passes by definition. If the PDF file is missing from `public/`, the link 404s; this is a deploy-time concern, not a code concern.

## Testing

- `npm run type-check` — passes (schema and import changes must typecheck cleanly).
- `npm run test:run` — all existing tests pass. The two updated test assertions (Hero, Contact) continue to verify the link points to the intended resource.
- `npm run build` — completes without errors. Prebuild (Notion fetch) still runs and writes `notion-content.json` without the `resume` field.
- Manual smoke: `npm run preview` after build, click resume button in Hero, click resume link in Contact, confirm PDF opens at `/WillChen_Resume.pdf`.

## Rollout

Single commit, conventional message: `refactor(resume): consolidate resume URL to single constant`. Feature branch → PR to `dev` → CI passes → auto-merges to `main` → Vercel deploys.

If the user forgets to drop the new PDF into `public/` before pushing, the existing placeholder PDF there today still serves — site does not break, just shows the older PDF. Worth calling out but not worth guarding against.
