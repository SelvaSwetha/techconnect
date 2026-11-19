import type { ElementType, ReactNode } from 'react'
import { useReveal } from '../hooks/useReveal'

interface Props {
  children: ReactNode
  as?: ElementType
  className?: string
  /** `stagger` reveals the direct children one after another (cards, lists). */
  stagger?: boolean
}

/** Fade + small upward move the first time the content enters the viewport. Respects prefers-reduced-motion. */
export default function ScrollReveal({ children, as: Tag = 'div', className, stagger }: Props) {
  const ref = useReveal<HTMLElement>()
  return (
    <Tag ref={ref} className={`${stagger ? 'reveal-stagger ' : ''}${className ?? ''}`}>
      {children}
    </Tag>
  )
}

/** Convenience alias for a group of cards that appear with a gentle stagger. */
export const StaggerContainer = (p: Omit<Props, 'stagger'>) => <ScrollReveal {...p} stagger />
