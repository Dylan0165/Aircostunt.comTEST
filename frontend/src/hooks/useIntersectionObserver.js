import { useEffect, useRef, useState } from 'react'

/**
 * Triggers a fade-in animation when the element scrolls into view.
 * Returns [ref, isVisible] — attach ref to the element you want to animate.
 * Once visible, the observer disconnects (fires only once).
 */
export function useIntersectionObserver(options = {}) {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px', ...options }
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  return [ref, isVisible]
}
