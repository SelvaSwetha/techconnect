import { useEffect, useState } from 'react'

export const DESKTOP_MIN = 1024
export const CANVAS_WIDTH = 1440
const SNAP_MIN = 1380

export interface Viewport {
  /** true at >= 1024px: the exact Figma 1440px desktop layout is used */
  isDesktop: boolean
  /** scale applied to the 1440px Figma canvas (never above 1) */
  scale: number
}

function read(): Viewport {
  const w = document.documentElement.clientWidth
  // Viewports from 1380px up render the canvas at 100% (content sits 70px+ inside
  // the 1440px frame, so a classic 15px scrollbar never clips anything meaningful).
  const scale = w >= SNAP_MIN ? 1 : Math.min(1, w / CANVAS_WIDTH)
  return { isDesktop: w >= DESKTOP_MIN, scale }
}

export function useViewport(): Viewport {
  const [vp, setVp] = useState<Viewport>(read)
  useEffect(() => {
    const onResize = () => setVp(read())
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])
  return vp
}
