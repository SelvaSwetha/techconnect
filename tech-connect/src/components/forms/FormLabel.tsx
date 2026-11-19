import type { ReactNode } from 'react'

interface Props {
  htmlFor: string
  children: ReactNode
  /** Visually hidden but still announced (the Figma design uses placeholders instead of visible labels). */
  hidden?: boolean
  required?: boolean
  /** Replaces the default visible-label style. */
  className?: string
}

export default function FormLabel({ htmlFor, children, hidden, required, className }: Props) {
  return (
    <label htmlFor={htmlFor} className={hidden ? 'sr-only' : (className ?? 'mb-1 block font-poppins text-[11px] font-medium text-[#0f0f12]')}>
      {children}
      {required && !hidden ? <span aria-hidden="true"> *</span> : null}
    </label>
  )
}
