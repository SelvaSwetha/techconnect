import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useViewport } from '../hooks/useViewport'
import { useRevealSections } from '../hooks/useReveal'

/**
 * Applies the shared scroll reveal to the section content of the generated tablet/mobile layouts (< 1024px).
 * Desktop sections reveal themselves through SectionCanvas.
 */
export default function MobileReveal() {
  const { pathname } = useLocation()
  const { isDesktop } = useViewport()
  const root = useRef<HTMLElement | null>(null)
  const [ready, setReady] = useState(0)
  // Pages are lazy chunks: wait (briefly) until the routed <main> has rendered before wiring the reveal.
  useEffect(() => {
    if (isDesktop) return
    let tries = 0
    const id = window.setInterval(() => {
      if (document.querySelector('main section') || ++tries > 40) {
        window.clearInterval(id)
        root.current = document.querySelector('main')
        setReady((n) => n + 1)
      }
    }, 50)
    return () => window.clearInterval(id)
  }, [pathname, isDesktop])
  useRevealSections(root, [pathname, isDesktop, ready])
  return null
}
