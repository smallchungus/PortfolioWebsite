interface BulletedDescriptionProps {
  text: string
  className?: string
  listClassName?: string
  labelClassName?: string
}

/**
 * Renders a newline-separated string as a bulleted list when there are
 * multiple lines, or as a single paragraph otherwise.
 *
 * Each line can optionally use a "Label: text" shape — the label is bolded.
 * This matches how our resume parser emits experience/project descriptions
 * from `\resumeItem{label}{text}` commands.
 */
export const BulletedDescription = ({
  text,
  className = '',
  listClassName = '',
  labelClassName = ''
}: BulletedDescriptionProps) => {
  const lines = text
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean)

  if (lines.length <= 1) {
    return <p className={className}>{text}</p>
  }

  return (
    <ul className={`list-disc pl-5 space-y-2 ${listClassName} ${className}`.trim()}>
      {lines.map((line, idx) => {
        // Match "Label: rest" — label is at the start, followed by a colon
        // within 40 chars (keeps it a short tl;dr-style prefix, not a colon
        // inside a sentence).
        const colonIdx = line.indexOf(':')
        const hasLabel = colonIdx > 0 && colonIdx < 40
        if (hasLabel) {
          const label = line.slice(0, colonIdx)
          const rest = line.slice(colonIdx + 1).trim()
          return (
            <li key={idx}>
              <span className={`font-semibold ${labelClassName}`.trim()}>
                {label}:
              </span>{' '}
              {rest}
            </li>
          )
        }
        return <li key={idx}>{line}</li>
      })}
    </ul>
  )
}
