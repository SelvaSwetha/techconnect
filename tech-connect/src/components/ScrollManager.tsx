import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/** On route change: scroll to the #hash target if present (after render), otherwise to the top. */
export default function ScrollManager() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      const id = decodeURIComponent(hash.slice(1))
      // The Homepage mounts its sections on the same tick; wait a frame so the target exists.
      const t = window.setTimeout(() => document.getElementById(id)?.scrollIntoView(), 50)
      return () => window.clearTimeout(t)
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])
  return null
}
