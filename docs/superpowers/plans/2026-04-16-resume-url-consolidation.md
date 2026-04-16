# Resume URL Consolidation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace 5 scattered hardcoded Google Drive resume URL references with a single `RESUME_PATH` constant pointing to `/WillChen_Resume.pdf` (served from Vercel's static assets), and update 2 test assertions accordingly.

**Architecture:** The resume URL becomes **app config**, not CMS content. A single `RESUME_PATH` constant in `src/constants/index.ts` is re-exported from `src/content/index.ts`, imported directly by the two components that link to the resume (Hero, Contact). The Notion schema and transform stop owning the `resume` field entirely — it's removed from `ContactInfoSchema`, both branches of the contact transform, and both JSON content files.

**Tech Stack:** TypeScript, React, Zod, Vitest. This is a pure refactor — no new dependencies.

---

## Working branch

Already on `feat/resume-url-consolidation`. Confirm with:

```bash
git branch --show-current
# Expected: feat/resume-url-consolidation
```

## File map

| File | Action |
|---|---|
| `src/constants/index.ts` | Add `RESUME_PATH`, remove `resume` field from `CONTACT_INFO` |
| `src/content/index.ts` | Re-export `RESUME_PATH` |
| `src/components/sections/Hero/Hero.test.tsx` | Update assertion at line 77 |
| `src/components/sections/Contact/Contact.test.tsx` | Update assertion at line 34 |
| `src/components/sections/Hero/Hero.tsx` | Use `RESUME_PATH` at line 29 |
| `src/components/sections/Contact/Contact.tsx` | Use `RESUME_PATH` at line 62 |
| `src/lib/notion/schemas.ts` | Remove `resume` from `ContactInfoSchema` |
| `src/lib/notion/transform.ts` | Remove `resume` from both branches of `contact` transform |
| `src/content/fallback-content.json` | Remove `resume` object from `contact` |
| `src/content/notion-content.json` | Remove `resume` object from `contact` |
| `public/WillChen_Resume.pdf` | **User action** — replace with latest DE PDF before final push |

---

## Task 1: Add `RESUME_PATH` constant

**Files:**
- Modify: `src/constants/index.ts`

- [ ] **Step 1: Add the constant, remove the old `resume` field from `CONTACT_INFO`**

Change lines 12-21 in `src/constants/index.ts` from:

```ts
export const CONTACT_INFO = {
  email: 'wchen1396@gmail.com',
  linkedin: 'https://linkedin.com/in/willchenn',
  github: 'https://github.com/smallchungus',
  location: 'Phoenix, AZ',
  resume: {
    url: 'https://drive.google.com/file/d/1a21bg5sKo2-TNZ1SGH0_RRnyEjPxxYhV/view',
    isExternal: true
  }
} as const
```

to:

```ts
export const RESUME_PATH = '/WillChen_Resume.pdf'

export const CONTACT_INFO = {
  email: 'wchen1396@gmail.com',
  linkedin: 'https://linkedin.com/in/willchenn',
  github: 'https://github.com/smallchungus',
  location: 'Phoenix, AZ'
} as const
```

- [ ] **Step 2: Verify the change typechecks**

```bash
npm run type-check
```

Expected: Exits 0 with no output. (`CONTACT_INFO` is defined but unused anywhere in the codebase, so removing a field from it won't break compilation.)

---

## Task 2: Re-export `RESUME_PATH` from content index

**Files:**
- Modify: `src/content/index.ts`

- [ ] **Step 1: Add the re-export**

Append this line to `src/content/index.ts` (below the existing named exports, before the `export type` block):

```ts
export { RESUME_PATH } from '@/constants'
```

The file should then contain (showing just the new line's neighborhood):

```ts
export const heroContent = content.hero

export { RESUME_PATH } from '@/constants'

// Re-export types
export type {
  // ...
```

- [ ] **Step 2: Verify the re-export resolves**

```bash
npm run type-check
```

Expected: Exits 0.

---

## Task 3: Update Hero test to expect new path (TDD red)

**Files:**
- Modify: `src/components/sections/Hero/Hero.test.tsx`

- [ ] **Step 1: Change the assertion at line 77**

Change:

```ts
      expect(mockOpen).toHaveBeenCalledWith('https://drive.google.com/file/d/1a21bg5sKo2-TNZ1SGH0_RRnyEjPxxYhV/view', '_blank')
```

to:

```ts
      expect(mockOpen).toHaveBeenCalledWith('/WillChen_Resume.pdf', '_blank')
```

- [ ] **Step 2: Run just this file to see it fail**

```bash
npx vitest run src/components/sections/Hero/Hero.test.tsx
```

Expected: 1 test failure, the `renders CTA buttons with correct functionality` test, with a diff showing the mock was called with the old Drive URL but expected `/WillChen_Resume.pdf`. Other tests in the file continue to pass.

---

## Task 4: Update Contact test to expect new path (TDD red)

**Files:**
- Modify: `src/components/sections/Contact/Contact.test.tsx`

- [ ] **Step 1: Change the assertion at line 34**

Change:

```ts
    expect(resumeBtn).toHaveAttribute('href', 'https://drive.google.com/file/d/1a21bg5sKo2-TNZ1SGH0_RRnyEjPxxYhV/view')
```

to:

```ts
    expect(resumeBtn).toHaveAttribute('href', '/WillChen_Resume.pdf')
```

- [ ] **Step 2: Run just this file to see it fail**

```bash
npx vitest run src/components/sections/Contact/Contact.test.tsx
```

Expected: 1 test failure, the `has view resume button with correct href` test. Other tests in the file continue to pass.

---

## Task 5: Update `Hero.tsx` to use `RESUME_PATH` (TDD green for Hero)

**Files:**
- Modify: `src/components/sections/Hero/Hero.tsx`

- [ ] **Step 1: Swap the import and usage**

Change line 4 from:

```ts
import { contactInfo, heroContent } from '@/content'
```

to:

```ts
import { heroContent, RESUME_PATH } from '@/content'
```

Change line 27-30 from:

```ts
  const handleViewResume = useCallback(() => {
    // Open resume in new tab (Google Drive)
    window.open(contactInfo.resume.url, '_blank')
  }, [])
```

to:

```ts
  const handleViewResume = useCallback(() => {
    window.open(RESUME_PATH, '_blank')
  }, [])
```

(The `// Open resume in new tab (Google Drive)` comment is no longer accurate and would rot; deleting it.)

- [ ] **Step 2: Run Hero tests, confirm green**

```bash
npx vitest run src/components/sections/Hero/Hero.test.tsx
```

Expected: All tests in the file pass.

---

## Task 6: Update `Contact.tsx` to use `RESUME_PATH` (TDD green for Contact)

**Files:**
- Modify: `src/components/sections/Contact/Contact.tsx`

- [ ] **Step 1: Swap the import and usage**

Change line 2 from:

```ts
import { contactInfo } from '@/content'
```

to:

```ts
import { contactInfo, RESUME_PATH } from '@/content'
```

Change line 62 from:

```tsx
          href={contactInfo.resume.url}
```

to:

```tsx
          href={RESUME_PATH}
```

(`contactInfo` is still used for email/linkedin/github on lines 25, 37, 49 — keep the import.)

- [ ] **Step 2: Run Contact tests, confirm green**

```bash
npx vitest run src/components/sections/Contact/Contact.test.tsx
```

Expected: All tests in the file pass.

---

## Task 7: Remove `resume` from `ContactInfoSchema`

**Files:**
- Modify: `src/lib/notion/schemas.ts`

- [ ] **Step 1: Remove the `resume` field**

Change lines 38-47 from:

```ts
export const ContactInfoSchema = z.object({
  email: z.string().email(),
  linkedin: z.string().url(),
  github: z.string().url(),
  location: z.string(),
  resume: z.object({
    url: z.string().url(),
    isExternal: z.boolean()
  })
})
```

to:

```ts
export const ContactInfoSchema = z.object({
  email: z.string().email(),
  linkedin: z.string().url(),
  github: z.string().url(),
  location: z.string()
})
```

- [ ] **Step 2: Run type-check to surface transform.ts errors**

```bash
npm run type-check
```

Expected: TypeScript errors in `src/lib/notion/transform.ts` at the `contact` object literals (both branches) — they're populating a `resume` field that no longer exists on `ContactInfo`. This is expected; Task 8 fixes it.

---

## Task 8: Remove `resume` from transform.ts (both branches)

**Files:**
- Modify: `src/lib/notion/transform.ts:131-158` (the `contact` transform block)

- [ ] **Step 1: Remove `resume` from the Notion-present branch**

Change lines 131-148 from:

```ts
  const contactItem = bySection['contact']?.[0]
  const contact: ContactInfo = contactItem
    ? {
        email: contactItem.title,
        linkedin:
          contactItem.tags.find((t) => t.includes('linkedin')) ||
          'https://linkedin.com/in/willchenn',
        github:
          contactItem.tags.find((t) => t.includes('github')) ||
          'https://github.com/smallchungus',
        location: contactItem.company || 'Phoenix, AZ',
        resume: {
          url:
            contactItem.url ||
            'https://drive.google.com/file/d/1a21bg5sKo2-TNZ1SGH0_RRnyEjPxxYhV/view',
          isExternal: true
        }
      }
```

to:

```ts
  const contactItem = bySection['contact']?.[0]
  const contact: ContactInfo = contactItem
    ? {
        email: contactItem.title,
        linkedin:
          contactItem.tags.find((t) => t.includes('linkedin')) ||
          'https://linkedin.com/in/willchenn',
        github:
          contactItem.tags.find((t) => t.includes('github')) ||
          'https://github.com/smallchungus',
        location: contactItem.company || 'Phoenix, AZ'
      }
```

- [ ] **Step 2: Remove `resume` from the fallback branch**

Change lines 149-158 (immediately following, the `:` branch of the ternary) from:

```ts
    : {
        email: 'wchen1396@gmail.com',
        linkedin: 'https://linkedin.com/in/willchenn',
        github: 'https://github.com/smallchungus',
        location: 'Phoenix, AZ',
        resume: {
          url: 'https://drive.google.com/file/d/1a21bg5sKo2-TNZ1SGH0_RRnyEjPxxYhV/view',
          isExternal: true
        }
      }
```

to:

```ts
    : {
        email: 'wchen1396@gmail.com',
        linkedin: 'https://linkedin.com/in/willchenn',
        github: 'https://github.com/smallchungus',
        location: 'Phoenix, AZ'
      }
```

- [ ] **Step 3: Verify type-check now passes**

```bash
npm run type-check
```

Expected: Exits 0.

---

## Task 9: Remove `resume` from fallback-content.json

**Files:**
- Modify: `src/content/fallback-content.json:10-19` (the `contact` object)

- [ ] **Step 1: Delete the `resume` object and fix trailing comma**

Change lines 10-19 from:

```json
  "contact": {
    "email": "wchen1396@gmail.com",
    "linkedin": "https://linkedin.com/in/willchenn",
    "github": "https://github.com/smallchungus",
    "location": "Phoenix, AZ",
    "resume": {
      "url": "https://drive.google.com/file/d/1a21bg5sKo2-TNZ1SGH0_RRnyEjPxxYhV/view",
      "isExternal": true
    }
  },
```

to:

```json
  "contact": {
    "email": "wchen1396@gmail.com",
    "linkedin": "https://linkedin.com/in/willchenn",
    "github": "https://github.com/smallchungus",
    "location": "Phoenix, AZ"
  },
```

(Watch the trailing comma on the `"location"` line — JSON requires no comma after the last field in an object.)

- [ ] **Step 2: Validate JSON parses**

```bash
node -e "JSON.parse(require('fs').readFileSync('src/content/fallback-content.json', 'utf8'))"
```

Expected: No output, exit code 0. Any syntax error would print here.

---

## Task 10: Remove `resume` from notion-content.json

**Files:**
- Modify: `src/content/notion-content.json:10-19` (the `contact` object)

- [ ] **Step 1: Same edit as Task 9, applied to notion-content.json**

Change lines 10-19 from:

```json
  "contact": {
    "email": "wchen1396@gmail.com",
    "linkedin": "https://linkedin.com/in/willchenn",
    "github": "https://github.com/smallchungus",
    "location": "Phoenix, AZ",
    "resume": {
      "url": "https://drive.google.com/file/d/1a21bg5sKo2-TNZ1SGH0_RRnyEjPxxYhV/view",
      "isExternal": true
    }
  },
```

to:

```json
  "contact": {
    "email": "wchen1396@gmail.com",
    "linkedin": "https://linkedin.com/in/willchenn",
    "github": "https://github.com/smallchungus",
    "location": "Phoenix, AZ"
  },
```

- [ ] **Step 2: Validate JSON parses**

```bash
node -e "JSON.parse(require('fs').readFileSync('src/content/notion-content.json', 'utf8'))"
```

Expected: No output, exit code 0.

Note: `notion-content.json` is `.gitignored` ([.gitignore:221](../../.gitignore#L221)) and regenerates from Notion on the next `npm run build`. This in-place edit keeps local dev consistent during implementation, but the committed state is driven by Task 11's prebuild step.

---

## Task 11: Full validation

- [ ] **Step 1: Run the full validate suite**

```bash
npm run validate
```

Expected: Passes all stages — `type-check`, `lint` (zero warnings), `test:run` (all tests pass), `build` (including the `prebuild` Notion fetch, which will regenerate `notion-content.json` matching the new schema).

If lint fails with zero-warnings policy, run `npm run lint` alone to see the errors, and fix them — most likely an unused import left behind (e.g. if `contactInfo` was left imported in a file that no longer uses it).

- [ ] **Step 2: Smoke test the built output locally**

```bash
npm run preview
```

Then in a browser, open the previewed URL, click "View Resume" on Hero and Contact sections. Expected: both open `/WillChen_Resume.pdf` in a new tab. Close preview when done (Ctrl+C).

Note: The PDF at that path today is the old one committed to the repo. It will open correctly; user replaces the file in Task 12 before pushing.

---

## Task 12: User replaces the PDF

- [ ] **Step 1: User action — replace the PDF file**

The user must drop their latest compiled resume PDF into `public/` with the exact filename `WillChen_Resume.pdf`, replacing the existing file. This happens outside any tool here — the user does it manually (drag into VSCode, Finder copy, whatever).

After replacement, verify from the terminal:

```bash
ls -la public/WillChen_Resume.pdf
```

Expected: File exists, modification timestamp is recent, size is non-zero.

Optionally inspect it's actually a PDF:

```bash
file public/WillChen_Resume.pdf
# Expected: "public/WillChen_Resume.pdf: PDF document, ..."
```

---

## Task 13: Commit and push

- [ ] **Step 1: Review the diff**

```bash
git status
git diff
```

Expected files changed:
- `src/constants/index.ts`
- `src/content/index.ts`
- `src/content/fallback-content.json`
- `src/components/sections/Hero/Hero.tsx`
- `src/components/sections/Hero/Hero.test.tsx`
- `src/components/sections/Contact/Contact.tsx`
- `src/components/sections/Contact/Contact.test.tsx`
- `src/lib/notion/schemas.ts`
- `src/lib/notion/transform.ts`
- `public/WillChen_Resume.pdf` (binary, user's replacement)

Note: `src/content/notion-content.json` is gitignored and should NOT appear in the diff.

- [ ] **Step 2: Stage and commit**

```bash
git add src/constants/index.ts \
        src/content/index.ts \
        src/content/fallback-content.json \
        src/components/sections/Hero/Hero.tsx \
        src/components/sections/Hero/Hero.test.tsx \
        src/components/sections/Contact/Contact.tsx \
        src/components/sections/Contact/Contact.test.tsx \
        src/lib/notion/schemas.ts \
        src/lib/notion/transform.ts \
        public/WillChen_Resume.pdf

git commit -m "$(cat <<'EOF'
refactor(resume): consolidate resume URL to single constant

Replace 5 hardcoded Google Drive URL references with a single
RESUME_PATH constant pointing to /WillChen_Resume.pdf, served
from Vercel's static assets.

- Add RESUME_PATH to src/constants/index.ts, re-exported from content
- Remove resume field from ContactInfoSchema (Zod) and both branches
  of the Notion contact transform
- Remove resume object from fallback-content.json
- Drop unused isExternal boolean (dead field)
- Update Hero and Contact components + their tests to use RESUME_PATH

Update workflow going forward: download new PDF from Overleaf → replace
public/WillChen_Resume.pdf → commit. URL stays stable.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

Expected: Commit succeeds. If husky hooks are active (check `ls .husky/pre-commit`), lint-staged may reformat staged files; verify the commit still captured everything with `git show --stat HEAD`. If no hooks are installed, the commit goes through as-is — Task 11's `npm run validate` already enforced the same quality gates.

- [ ] **Step 3: Push to remote**

```bash
git push -u origin feat/resume-url-consolidation
```

Expected: Push succeeds. CI on GitHub Actions will then run the type-check, lint, test, and build gates.

- [ ] **Step 4: Open a PR (optional, can be done from GitHub UI instead)**

```bash
gh pr create --base dev --title "refactor(resume): consolidate resume URL to single constant" --body "$(cat <<'EOF'
## Summary
- Single `RESUME_PATH` constant replaces 5 hardcoded Google Drive URL references
- Resume is now served from `/WillChen_Resume.pdf` (same domain via Vercel), not Drive
- Resume URL no longer flows through Notion — it's app config, not CMS content

## Test plan
- [x] \`npm run validate\` passes (type-check + lint + tests + build)
- [x] Hero "View Resume" button opens the PDF
- [x] Contact "View Resume" link points to the PDF
- [ ] Preview deploy renders the PDF correctly

Design doc: [docs/superpowers/specs/2026-04-16-resume-url-consolidation-design.md](docs/superpowers/specs/2026-04-16-resume-url-consolidation-design.md)
EOF
)"
```

Expected: PR URL printed. Per the repo's CI setup, merging to `dev` auto-promotes to `main` after checks pass.

---

## Self-review summary

- **Spec coverage:** All spec file-level changes mapped to tasks. The conceptual split (app config vs CMS content), the dead `isExternal` removal, and the stable `/WillChen_Resume.pdf` path are all realized.
- **Type consistency:** `RESUME_PATH` is the exact name across Tasks 1-6. All imports use `@/content` path alias consistently.
- **Non-goals respected:** No content sync, no SEO work, no LaTeX CI. Those are separate specs/plans.
