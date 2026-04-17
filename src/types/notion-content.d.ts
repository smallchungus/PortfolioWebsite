// Ambient module declaration for the build-time-generated notion-content.json.
//
// The file is created by scripts/fetch-notion-content.ts (the `prebuild` npm
// script) on every build. It does not exist in the repo and is gitignored,
// so a literal static import fails type-check when CI runs `tsc --noEmit`
// before `prebuild`.
//
// This declaration tells TypeScript "if you see an import of
// notion-content.json, treat it as PortfolioContent" without needing the
// file present on disk. At build time, Vite resolves the import from the
// freshly generated JSON.
declare module '*/notion-content.json' {
  const value: import('@/lib/notion/schemas').PortfolioContent
  export default value
}
