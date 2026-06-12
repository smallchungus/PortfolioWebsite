import { useEffect, useRef, useState } from 'react'

interface UseInViewOptions {
  threshold?: number
  rootMargin?: string
  once?: boolean
}

export function useInView<T extends HTMLElement>({
  threshold = 0.15,
  rootMargin = '0px 0px -60px 0px',
  once = true
}: UseInViewOptions = {}) {
  const ref = useRef<T | null>(null)
  // Start "in view" when IntersectionObserver is unavailable (old browsers,
  // jsdom test environments) or reduced-motion is preferred — the effect
  // skips observing in those cases.
  const [inView, setInView] = useState(
    () =>
      typeof IntersectionObserver === 'undefined' ||
      (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ??
        false)
  )

  useEffect(() => {
    const element = ref.current
    if (!element) return

    if (
      typeof IntersectionObserver === 'undefined' ||
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    ) {
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          if (once) observer.disconnect()
        } else if (!once) {
          setInView(false)
        }
      },
      { threshold, rootMargin }
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [threshold, rootMargin, once])

  return { ref, inView }
}
