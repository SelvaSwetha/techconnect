import { GLYPHS } from './glyphs'
import type { GlyphName } from './glyphs'

/** Renders one of the icons exported with the original design, at its natural size unless `size` is given. */
export default function Glyph({ name, size, className }: { name: GlyphName; size?: number; className?: string }) {
  const g = GLYPHS[name]
  const [, , w, h] = g.vb.split(' ').map(Number)
  const scale = size ? size / Math.max(w, h) : 1
  return (
    <svg aria-hidden="true" focusable="false" viewBox={g.vb} width={w * scale} height={h * scale} className={`shrink-0 ${className ?? ''}`}>
      <path d={g.d} fill={g.fill} />
    </svg>
  )
}
