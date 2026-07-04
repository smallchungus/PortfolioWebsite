/* eslint-disable no-console */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { build } from 'vite'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const ssrOutDir = path.join(root, 'dist-ssr')

await build({
  logLevel: 'warn',
  build: {
    ssr: 'src/entry-server.jsx',
    outDir: ssrOutDir,
    emptyOutDir: true,
  },
})

const { render } = await import(
  pathToFileURL(path.join(ssrOutDir, 'entry-server.js')).href
)
const appHtml: string = render()

const indexPath = path.join(root, 'dist', 'index.html')
const html = fs.readFileSync(indexPath, 'utf8')
const marker = '<div id="root"></div>'
if (!html.includes(marker)) {
  throw new Error('prerender: <div id="root"></div> not found in dist/index.html')
}
fs.writeFileSync(indexPath, html.replace(marker, `<div id="root">${appHtml}</div>`))
fs.rmSync(ssrOutDir, { recursive: true, force: true })

console.log(`prerender: injected ${Math.round(appHtml.length / 1024)}KB of static HTML into dist/index.html`)
