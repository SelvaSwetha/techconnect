import { useLayoutEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { CANVAS_WIDTH, useViewport } from '../hooks/useViewport'

/**
 * Renders flow content designed for a 1440px canvas and scales it down uniformly on 1024-1380px screens
 * (same rule as SectionCanvas). At >= 1380px it is not scaled and spans the full width.
 */
export default function ScaleToFit({ children }: { children: ReactNode }) {
  const { scale } = useViewport()
  const inner = useRef<HTMLDivElement>(null)
  const [h, setH] = useState(0)

  useLayoutEffect(() => {
    const el = inner.current
    if (!el) return
    const update = () => setH(el.offsetHeight)
    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  if (scale === 1) return <div ref={inner}>{children}</div>
  return (
    <div className="w-full overflow-hidden" style={{ height: h * scale }}>
      <div ref={inner} style={{ width: CANVAS_WIDTH, transform: `scale(${scale})`, transformOrigin: 'top left' }}>
        {children}
      </div>
    </div>
  )
}
