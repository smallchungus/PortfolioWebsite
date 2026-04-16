# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev           # Vite dev server
npm run build         # Prebuild (fetch Notion) + Vite build
npm test              # Vitest watch mode
npm run test:ci       # Tests with coverage (80% threshold enforced)
npm run lint          # ESLint, zero warnings allowed
npm run type-check    # tsc --noEmit
npm run validate      # type-check + lint + test + build (full CI check)
```

Run a single test file: `npx vitest run src/components/sections/Hero/Hero.test.tsx`

## Architecture

**React 18 SPA** (no router) built with Vite 7, TypeScript strict mode, Tailwind CSS 3. Deployed to Vercel on push to main.

### Content Pipeline

All content comes from a **Notion database fetched at build time** — there are no runtime API calls.

1. `npm run build` triggers `prebuild` → `scripts/fetch-notion-content.ts`
2. Script queries Notion API, transforms via `src/lib/notion/transform.ts`, validates with Zod schemas in `src/lib/notion/schemas.ts`
3. Writes to `src/content/notion-content.json` (gitignored, generated)
4. `src/content/index.ts` loads this JSON, falling back to `src/content/fallback-content.json` if missing
5. Components import named exports: `import { projects, skills } from '@/content'`

Notion secrets (`NOTION_API_KEY`, `NOTION_DATABASE_ID`) live in `.env.local` (local) and Vercel env vars (production). They are NOT `VITE_`-prefixed — never exposed to the browser.

### Component Structure

- `src/components/sections/` — Full-page scroll sections (Hero, About, Projects, Contact)
- `src/components/common/` — App chrome (Navigation, Favicon, ThemeToggle)
- `src/components/ui/` — Primitive reusable components (Badge)

Each component folder: `ComponentName.tsx` + `ComponentName.test.tsx` + `index.ts` barrel export.

`App.jsx` renders sections linearly: Navigation → Hero → About → Projects → Contact. Navigation uses scroll-based active section detection (`src/lib/navigation.ts`).

### Dark Mode

Class-based (`darkMode: 'class'` in Tailwind config). `useTheme` hook manages `localStorage` persistence and `document.documentElement` class toggling.

### Path Aliases

`@/` → `src/`, plus `@components`, `@hooks`, `@utils`, `@types`, `@content`, `@lib` (configured in both `vite.config.js` and `tsconfig.json`).

## Code Style

- **Prettier**: no semicolons, single quotes, JSX single quotes, 2-space indent, 80-char width, `prettier-plugin-tailwindcss` for class sorting
- **TypeScript**: strict mode with `noUnusedLocals` and `noUnusedParameters`
- Tests use `@testing-library/react` with `data-testid` attributes and role queries

## CI/CD

GitHub Actions on push to main/dev/feat/*: type-check → lint → test with coverage → build → bundle size check (<1MB). Pushes to `dev` auto-merge to `main` after CI passes. Vercel auto-deploys `main`.

## Technical Debt

Some files remain `.jsx`/`.js` (`App.jsx`, `main.jsx`, `useAlert.js`) — ongoing migration to `.tsx`/`.ts`.

## Rules for Claude

Non-negotiable. Apply to every action in this repo.

- **No `Co-Authored-By` trailer in commit messages.** No attribution trailers of any kind (no "Generated with Claude Code", no "🤖 Generated", nothing). Commit messages end at the subject + body.
- **No emojis.** Not in commits, not in PR descriptions, not in code comments, not in chat replies, not in any file. Do not add them unless the user explicitly asks for them in a specific place.
- **Minimal diffs.** Do only what was asked. Do not refactor adjacent code, rename variables you don't need to rename, reformat files you aren't editing, or add "while I'm here" improvements. If you see an unrelated issue, mention it in chat; do not fix it in the same commit.
- **No AI slop in prose.** No hedging filler ("it's worth noting", "as an AI", "feel free to"), no unnecessary adjectives ("comprehensive", "robust", "seamless"), no padding. Short declarative sentences. If a word isn't carrying weight, delete it.
- **No Markdown clutter in chat updates.** Headers and tables when they help the reader parse; plain prose when they don't.

If any of these rules conflict with a skill or default behavior, these rules win.
