import { useEffect, useRef } from 'react'
import type { RefObject } from 'react'

/**
 * Scroll-reveal engine shared by the whole site.
 *
 * Content is visible by default (no JS / no IntersectionObserver / reduced motion => nothing is hidden). After mount,
 * only elements that are still below the fold get `data-reveal="hidden"`; they are switched to `"shown"` once, the first
 * time they enter the viewport. Only opacity + a small translateY are animated, so there is no layout shift.
 * The CSS lives in index.css (`[data-reveal]`).
 */
const reduced = () => typeof window === 'undefined' || window.matchMedia('(prefers-reduced-motion: reduce)').matches

function observe(els: Element[]) {
  if (!els.length || reduced() || typeof IntersectionObserver === 'undefined') return () => {}
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue
        e.target.setAttribute('data-reveal', 'shown')
        io.unobserve(e.target)
      }
    },
    { threshold: 0.08, rootMargin: '0px 0px -8% 0px' },
  )
  const vh = window.innerHeight
  for (const el of els) {
    if (el.getBoundingClientRect().top < vh * 0.92) continue // already on screen: never hidden, no flash
    el.setAttribute('data-reveal', 'hidden')
    io.observe(el)
  }
  return () => {
    io.disconnect()
    for (const el of els) el.removeAttribute('data-reveal')
  }
}

/** Reveal a single element once when it scrolls into view. */
export function useReveal<T extends HTMLElement>(): RefObject<T | null> {
  const ref = useRef<T>(null)
  useEffect(() => (ref.current ? observe([ref.current]) : undefined), [])
  return ref
}

/** Reveal the content container of every top-level `<section>` inside `root` (used by the generated mobile layouts). */
export function useRevealSections(root: RefObject<HTMLElement | null>, deps: unknown[] = []) {
  useEffect(() => {
    const host = root.current
    if (!host) return
    const targets = [...host.querySelectorAll(':scope section, :scope > * > section')]
      .map((s) => s.firstElementChild)
      .filter((el): el is Element => !!el && !el.closest('header'))
    return observe([...new Set(targets)])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}
