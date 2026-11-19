import type { CSSProperties, ReactNode } from 'react'

/** Absolute box in the 1440px page coordinate space of the Figma/PDF frame. */
export function B({ x, y, w, h, className = '', style, children }: { x: number; y: number; w?: number; h?: number; className?: string; style?: CSSProperties; children?: ReactNode }) {
  return (
    <div className={`absolute ${className}`} style={{ left: x, top: y, width: w, height: h, ...style }}>
      {children}
    </div>
  )
}

interface TProps {
  x: number
  /** baseline of the first line */
  y: number
  s: number
  /** line pitch */
  lh: number
  c: string
  w?: 400 | 500 | 600 | 700
  ls?: number
  center?: boolean
  right?: boolean
  lines: readonly ReactNode[]
  className?: string
}

/** Text placed by baseline (Poppins: baseline sits lh/2 + 0.35em below the top of a line box). One <br> per designed line break. */
export function T({ x, y, s, lh, c, w = 400, ls, center, right, lines, className = '' }: TProps) {
  const style: CSSProperties = {
    left: x,
    top: y - lh / 2 - 0.35 * s,
    fontSize: s,
    lineHeight: `${lh}px`,
    color: c,
    fontWeight: w,
    letterSpacing: ls,
  }
  if (center) style.transform = 'translateX(-50%)'
  if (right) style.transform = 'translateX(-100%)'
  return (
    <p className={`absolute m-0 whitespace-nowrap font-poppins ${center ? 'text-center' : ''} ${className}`} style={style}>
      {lines.map((l, i) => (
        <span key={i}>
          {i > 0 ? <br /> : null}
          {l}
        </span>
      ))}
    </p>
  )
}

/** Copy that the 1440px frame breaks by hand; on narrow screens it flows as one paragraph. */
export function Flow({ lines }: { lines: readonly string[] }) {
  return <>{lines.join(' ')}</>
}
