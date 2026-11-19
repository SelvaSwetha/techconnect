import type { ReactNode } from 'react'
import { useReveal } from '../hooks/useReveal'
import { CANVAS_WIDTH, useViewport } from '../hooks/useViewport'

interface Props {
  id: string
  /** section height on the 1440px Figma canvas */
  height: number
  /** full-bleed background so the section extends past 1440px viewports */
  className?: string
  /** let content cross the band edge (cards overlapping the previous band); the band is then painted above it */
  overlap?: boolean
  children: ReactNode
}

/**
 * One horizontal band of the Figma desktop frame. Children are absolutely
 * positioned in Figma's 1440px coordinate space (relative to this band) and
 * the band scales down uniformly between 1024px and 1440px.
 */
export default function SectionCanvas({ id, height, className = '', overlap, children }: Props) {
  const { scale } = useViewport()
  const reveal = useReveal<HTMLDivElement>()
  return (
    <section
      id={id}
      className={`relative w-full ${overlap ? 'z-[1] overflow-x-clip overflow-y-visible' : 'overflow-hidden'} ${className}`}
      style={{ height: height * scale }}
    >
      <div
        className="absolute left-1/2 top-0 origin-top"
        style={{
          width: CANVAS_WIDTH,
          height,
          transform: `translateX(-50%) scale(${scale})`,
        }}
      >
        <div ref={reveal} className="absolute inset-0">
          {children}
        </div>
      </div>
    </section>
  )
}
