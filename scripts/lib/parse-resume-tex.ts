/**
 * Minimal LaTeX parser for the resume template used in
 * github.com/smallchungus/WillChen_Resume03_09_DE.
 *
 * Produces ContentRow entries matching the Notion seed shape used by
 * setup-notion-database.ts. Relies on the template's fixed commands
 * (\resumeSubheading, \resumeItem, \resumeProjectHeading) rather than
 * trying to parse arbitrary LaTeX. If the template changes
 * structurally, this parser needs to be updated.
 */

export type ContentSection =
  | 'hero'
  | 'skills'
  | 'projects'
  | 'experience'
  | 'education'

export interface ContentRow {
  title: string
  section: ContentSection
  order: number
  description?: string
  tags?: string[]
  url?: string
  duration?: string
  impact?: string
  company?: string
  status?: string
  featured?: boolean
}

/**
 * Curated list of tech / tool names we'll recognize as tags when they
 * appear bolded in experience or project descriptions.
 *
 * Keeps tag extraction predictable. Anything not on this list (e.g. a
 * bolded metric like "50+" or an adjective phrase) won't become a tag.
 */
const KNOWN_TAGS = [
  'Python',
  'Go',
  'SQL',
  'JavaScript',
  'TypeScript',
  'Java',
  'Spring Boot',
  'Node.js',
  'React',
  'Redux',
  'Tailwind CSS',
  'Vite',
  'HTML/CSS',
  'PostgreSQL',
  'Redis',
  'Amazon Redshift',
  'Redshift',
  'MongoDB',
  'AWS',
  'AWS Glue',
  'AWS Lambda',
  'Step Functions',
  'S3',
  'Lambda',
  'Glue',
  'Docker',
  'Kubernetes',
  'GitHub Actions',
  'Datadog',
  'Tableau',
  'Bash',
  'scikit-learn',
  'Machine Learning',
  'Mass Spectrometry',
  'Reinforcement Learning',
  'PhysX',
  'Simulation',
  'AMR',
  'Solidity',
  'Hardhat',
  'Next.js',
  'ethers.js',
  'Kafka',
  'Apache Kafka',
  'Bloomberg',
  'Reuters',
  'Grafana',
  'Azure DevOps',
  'CI/CD',
  'ETL'
]

// ---------------------------------------------------------------------------
// Low-level helpers
// ---------------------------------------------------------------------------

/**
 * Extract the content of a balanced `{...}` group starting at `startIdx`.
 * `str[startIdx]` must be `{`. Respects `\{` and `\}` escapes.
 * Returns { content, end } where `end` is the index of the closing `}`.
 */
function extractBalancedBraces(
  str: string,
  startIdx: number
): { content: string; end: number } | null {
  if (str[startIdx] !== '{') return null
  let depth = 1
  let i = startIdx + 1
  while (i < str.length && depth > 0) {
    const ch = str[i]
    if (ch === '\\') {
      // Skip any escaped character (\{, \}, \%, \\, etc.)
      i += 2
      continue
    }
    if (ch === '{') depth++
    else if (ch === '}') depth--
    if (depth === 0) return { content: str.substring(startIdx + 1, i), end: i }
    i++
  }
  return null
}

/** Skip whitespace starting at `idx`, return the first non-whitespace index. */
function skipWhitespace(str: string, idx: number): number {
  while (idx < str.length && /\s/.test(str[idx])) idx++
  return idx
}

/**
 * Strip the LaTeX formatting commands we know about and normalize
 * escape sequences and whitespace.
 */
function cleanLatex(text: string): string {
  return text
    // Formatting wrappers: \textbf{X}, \textit{X}, \emph{X}, \underline{X}
    // Iterate because of possible nested wrappers.
    .replace(/\\(textbf|textit|emph|underline)\{([^{}]*)\}/g, '$2')
    .replace(/\\(textbf|textit|emph|underline)\{([^{}]*)\}/g, '$2')
    // \href{url}{text} — keep the visible text
    .replace(/\\href\{[^{}]*\}\{([^{}]*)\}/g, '$1')
    // Common escape sequences
    .replace(/\\textasciitilde/g, '~')
    .replace(/\\&/g, '&')
    .replace(/\\%/g, '%')
    .replace(/\\\$/g, '$')
    .replace(/\\_/g, '_')
    .replace(/\\#/g, '#')
    // LaTeX dashes: `--` is an en-dash, `---` em-dash. Normalize to hyphen.
    .replace(/---/g, '-')
    .replace(/--/g, '-')
    // LaTeX line breaks and stretch
    .replace(/\\\\/g, ' ')
    .replace(/\$\|\$/g, '|')
    .replace(/\$/g, '')
    // Collapse whitespace
    .replace(/\s+/g, ' ')
    .trim()
}

/** Extract a whole `\section{Name}` block's body up to the next section. */
function getSection(tex: string, name: string): string | null {
  const sectionRe = new RegExp(`\\\\section\\{\\s*${name}\\s*\\}`, 'i')
  const match = sectionRe.exec(tex)
  if (!match) return null
  const start = match.index + match[0].length
  const rest = tex.substring(start)
  const nextSection = /\\section\{/.exec(rest)
  const endDoc = /\\end\{document\}/.exec(rest)
  let endOffset = rest.length
  if (nextSection) endOffset = Math.min(endOffset, nextSection.index)
  if (endDoc) endOffset = Math.min(endOffset, endDoc.index)
  return rest.substring(0, endOffset)
}

// ---------------------------------------------------------------------------
// Command-level parsers
// ---------------------------------------------------------------------------

interface ParsedSubheading {
  args: string[] // length 4: [institution/company, location, degree/role, duration]
  items: Array<{ label: string; text: string }>
  /** Raw body between this subheading and the next — used for tag extraction. */
  rawBody: string
}

function parseSubheadings(sectionBody: string): ParsedSubheading[] {
  const results: ParsedSubheading[] = []
  const commandRe = /\\resumeSubheading\b/g
  const matches = Array.from(sectionBody.matchAll(commandRe))

  for (let i = 0; i < matches.length; i++) {
    const match = matches[i]
    const cmdEnd = (match.index ?? 0) + match[0].length
    let argPos = cmdEnd
    const args: string[] = []

    for (let a = 0; a < 4; a++) {
      argPos = skipWhitespace(sectionBody, argPos)
      const extract = extractBalancedBraces(sectionBody, argPos)
      if (!extract) break
      args.push(cleanLatex(extract.content))
      argPos = extract.end + 1
    }
    if (args.length < 4) continue

    const nextStart =
      i + 1 < matches.length ? matches[i + 1].index! : sectionBody.length
    const blockBody = sectionBody.substring(argPos, nextStart)
    const items = parseItems(blockBody)

    results.push({ args, items, rawBody: blockBody })
  }
  return results
}

function parseItems(body: string): Array<{ label: string; text: string }> {
  const items: Array<{ label: string; text: string }> = []
  // Match \resumeItem but NOT \resumeItemListStart/End.
  const itemRe = /\\resumeItem(?!ListStart|ListEnd)\b/g
  for (const match of body.matchAll(itemRe)) {
    let argPos = (match.index ?? 0) + match[0].length
    argPos = skipWhitespace(body, argPos)
    const labelExtract = extractBalancedBraces(body, argPos)
    if (!labelExtract) continue
    argPos = skipWhitespace(body, labelExtract.end + 1)
    const textExtract = extractBalancedBraces(body, argPos)
    if (!textExtract) continue
    items.push({
      label: cleanLatex(labelExtract.content),
      text: cleanLatex(textExtract.content)
    })
  }
  return items
}

interface ParsedProject {
  title: string
  techStack: string
  items: Array<{ label: string; text: string }>
  rawBody: string
}

function parseProjects(sectionBody: string): ParsedProject[] {
  const results: ParsedProject[] = []
  const headingRe = /\\resumeProjectHeading\b/g
  const matches = Array.from(sectionBody.matchAll(headingRe))

  for (let i = 0; i < matches.length; i++) {
    const match = matches[i]
    const cmdEnd = (match.index ?? 0) + match[0].length
    let argPos = skipWhitespace(sectionBody, cmdEnd)

    const firstArg = extractBalancedBraces(sectionBody, argPos)
    if (!firstArg) continue
    argPos = skipWhitespace(sectionBody, firstArg.end + 1)
    const secondArg = extractBalancedBraces(sectionBody, argPos)
    // Second arg might be empty `{}`, we just need to advance past it.
    argPos = secondArg ? secondArg.end + 1 : argPos

    // firstArg looks like: \textbf{Title} $|$ \emph{tech, stack, here}
    const raw = firstArg.content
    const titleMatch = /\\textbf\{([^{}]*)\}/.exec(raw)
    const techMatch = /\\emph\{([^{}]*)\}/.exec(raw)
    const title = titleMatch ? cleanLatex(titleMatch[1]) : cleanLatex(raw)
    const techStack = techMatch ? cleanLatex(techMatch[1]) : ''

    const nextStart =
      i + 1 < matches.length ? matches[i + 1].index! : sectionBody.length
    const blockBody = sectionBody.substring(argPos, nextStart)
    const items = parseItems(blockBody)

    results.push({ title, techStack, items, rawBody: blockBody })
  }
  return results
}

/**
 * From a raw LaTeX block, return the subset of KNOWN_TAGS that appear
 * bolded anywhere in the block. Preserves document order, dedupes.
 */
function extractTags(rawBody: string): string[] {
  const boldMatches = Array.from(rawBody.matchAll(/\\textbf\{([^{}]*)\}/g))
  const seen = new Set<string>()
  const ordered: string[] = []
  for (const match of boldMatches) {
    const value = cleanLatex(match[1])
    const hit = KNOWN_TAGS.find(
      (t) => t === value || t.toLowerCase() === value.toLowerCase()
    )
    if (hit && !seen.has(hit)) {
      seen.add(hit)
      ordered.push(hit)
    }
  }
  // If we captured both "Glue" and "AWS Glue", keep only the more specific one.
  return ordered.filter(
    (t) => !ordered.some((other) => other !== t && other.includes(t))
  )
}

/**
 * Split a comma-separated string, respecting parenthesis depth so that
 * "AWS (Glue, Lambda), Docker" splits into ["AWS (Glue, Lambda)", "Docker"].
 */
function splitRespectingParens(str: string): string[] {
  const out: string[] = []
  let depth = 0
  let cur = ''
  for (const ch of str) {
    if (ch === '(') depth++
    else if (ch === ')') depth--
    if (ch === ',' && depth === 0) {
      if (cur.trim()) out.push(cur.trim())
      cur = ''
    } else {
      cur += ch
    }
  }
  if (cur.trim()) out.push(cur.trim())
  return out
}

/**
 * Parse the Technical Skills section. Template uses an `\item` with
 * multiple `\textbf{category}{: a, b, c}` lines separated by `\\`.
 *
 * Paren-annotated items like "AWS (Glue, Lambda, Step Functions)" are
 * flattened: we emit the base name and each inner item as separate tags.
 */
function parseSkills(
  sectionBody: string
): Array<{ title: string; tags: string[] }> {
  const cleaned = sectionBody.replace(/\\small/g, '').replace(/\\item/g, '')
  const categoryRe = /\\textbf\{([^{}]+)\}\{:\s*([^{}]+)\}/g
  const results: Array<{ title: string; tags: string[] }> = []

  for (const match of cleaned.matchAll(categoryRe)) {
    const title = cleanLatex(match[1])
    const list = cleanLatex(match[2])
    const tags: string[] = []
    for (const item of splitRespectingParens(list)) {
      const paren = /^([^(]+)\(([^)]+)\)$/.exec(item)
      if (!paren) {
        tags.push(item.trim())
        continue
      }
      const base = paren[1].trim()
      const inner = paren[2]
        .split(',')
        .map((p) => p.trim())
        .filter(Boolean)
      if (base) tags.push(base)
      for (const sub of inner) tags.push(sub)
    }
    results.push({ title, tags: tags.filter(Boolean) })
  }
  return results
}

/**
 * Build a short "MS Analytics @ Georgia Tech"-style label from an
 * education row, for use as a hero role.
 */
function shortEduLabel(row: ContentRow): string {
  const degree = (row.title || '')
    .replace(/Master of Science in /i, 'MS ')
    .replace(/Master of Arts in /i, 'MA ')
    .replace(/Bachelor of Arts in /i, 'BA ')
    .replace(/Bachelor of Science in /i, 'BS ')
  const school = (row.company || '')
    .replace(/Georgia Institute of Technology/i, 'Georgia Tech')
    .replace(/Arizona State University/i, 'ASU')
    .replace(/Rutgers University/i, 'Rutgers')
    .replace(/Massachusetts Institute of Technology/i, 'MIT')
  return `${degree} @ ${school}`
}

// ---------------------------------------------------------------------------
// Top-level
// ---------------------------------------------------------------------------

export function parseResumeTex(tex: string): ContentRow[] {
  const rows: ContentRow[] = []

  // Parse title line "\textbf{... Software Engineer $|$ Data Engineer}"
  const roleHeaderMatch = /\\textbf\{\s*([^{}]*\$\|\$[^{}]*)\s*\}/.exec(tex)
  const roleRaw = roleHeaderMatch ? cleanLatex(roleHeaderMatch[1]) : ''
  const heroRoles = roleRaw
    .split('|')
    .map((s) => s.trim())
    .filter(Boolean)

  // EDUCATION
  const eduBody = getSection(tex, 'Education')
  if (eduBody) {
    const subs = parseSubheadings(eduBody)
    subs.forEach((s, i) => {
      // args: [institution, location, degree, duration]
      // Degree may embed GPA ("Bachelor of Arts in CS and Psychology, GPA: 3.44")
      let degree = s.args[2]
      let status = ''
      const gpaMatch = /,?\s*GPA:?\s*([\d.]+)/i.exec(degree)
      if (gpaMatch) {
        status = `GPA ${gpaMatch[1]}`
        degree = degree.replace(gpaMatch[0], '').trim().replace(/,$/, '').trim()
      } else if (/Present/i.test(s.args[3])) {
        status = 'Current Student'
      }
      rows.push({
        title: degree,
        section: 'education',
        order: 40 + i,
        company: s.args[0],
        status,
        duration: s.args[3]
      })
    })
  }

  // EXPERIENCE
  const expBody = getSection(tex, 'Experience')
  if (expBody) {
    const subs = parseSubheadings(expBody)
    subs.forEach((s, i) => {
      // args: [company, location, title, duration]
      // Preserve bullet structure — each \resumeItem becomes a newline-separated
      // entry like "Label: Text". The UI splits on newlines and renders <ul>.
      const description = s.items
        .map((it) => (it.label ? `${it.label}: ${it.text}` : it.text))
        .join('\n')
      rows.push({
        title: s.args[2],
        section: 'experience',
        order: 30 + i,
        company: s.args[0],
        duration: s.args[3],
        description,
        tags: extractTags(s.rawBody)
      })
    })
  }

  // PROJECTS
  const projBody = getSection(tex, 'Projects')
  if (projBody) {
    const projects = parseProjects(projBody)
    projects.forEach((p, i) => {
      // All items as newline-separated bullets (same as experience).
      const description = p.items
        .map((it) => (it.label ? `${it.label}: ${it.text}` : it.text))
        .join('\n')
      const techTags = p.techStack
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean)
      rows.push({
        title: p.title,
        section: 'projects',
        order: 20 + i,
        description,
        tags: techTags.length > 0 ? techTags : extractTags(p.rawBody),
        featured: true,
        url: 'https://github.com/smallchungus'
      })
    })

    // Add the portfolio itself as a second project (not in resume).
    rows.push({
      title: 'Portfolio Website',
      section: 'projects',
      order: 20 + projects.length,
      description:
        'Modern, minimal portfolio with dark mode, Notion CMS integration, and 95+ Lighthouse score',
      tags: ['React', 'TypeScript', 'Tailwind CSS', 'Vite'],
      url: 'https://github.com/smallchungus/PortfolioWebsite',
      impact: 'Built with TDD practices and Notion-powered content management',
      featured: true
    })
  }

  // SKILLS
  const skillsBody = getSection(tex, 'Technical Skills')
  if (skillsBody) {
    const categories = parseSkills(skillsBody)
    categories.forEach((c, i) => {
      rows.push({
        title: c.title,
        section: 'skills',
        order: 10 + i,
        tags: c.tags
      })
    })
  }

  // HERO — constructed last so we can derive the current-school label from education.
  const firstEdu = rows.find(
    (r) => r.section === 'education' && /Present/i.test(r.duration || '')
  )
  const eduLabel = firstEdu ? shortEduLabel(firstEdu) : ''

  rows.unshift({
    title: 'Hero',
    section: 'hero',
    order: 1,
    description: 'Python, Go, SQL, AWS, Docker, Kubernetes',
    tags: eduLabel ? [...heroRoles, eduLabel] : heroRoles,
    impact:
      'Building production-grade ETL pipelines and distributed systems. Passionate about data infrastructure, cloud-native tooling, and reliable engineering at scale.'
  })

  return rows
}
