import { useEffect } from 'react'

interface SectionTitleConfig {
  id: string
  title: string
}

const BASE_TITLE = 'Will Chen | Data Engineer & Software Engineer'

/**
 * Updates document.title based on which section is most visible in the viewport.
 * Falls back to BASE_TITLE when no section dominates (e.g. page load at top).
 */
export function useSectionTitle(sections: SectionTitleConfig[]) {
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return

    const originalTitle = document.title
    let mostVisible: SectionTitleConfig | null = null
    let maxRatio = 0

    const updateTitle = () => {
      document.title = mostVisible
        ? `${mostVisible.title} — Will Chen`
        : BASE_TITLE
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const config = sections.find((s) => s.id === entry.target.id)
          if (!config) continue

          if (entry.isIntersecting && entry.intersectionRatio > maxRatio) {
            maxRatio = entry.intersectionRatio
            mostVisible = config
          } else if (!entry.isIntersecting && mostVisible?.id === config.id) {
            mostVisible = null
            maxRatio = 0
          }
        }
        updateTitle()
      },
      { threshold: [0.25, 0.5, 0.75] }
    )

    const observed: Element[] = []
    for (const section of sections) {
      const el = document.getElementById(section.id)
      if (el) {
        observer.observe(el)
        observed.push(el)
      }
    }

    return () => {
      observer.disconnect()
      document.title = originalTitle
    }
  }, [sections])
}
