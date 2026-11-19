import { ERROR_COLOR } from './styles'

interface Props {
  id: string
  message?: string
  /** Keep a fixed 13px row so the layout does not jump when an error appears (fixed Figma geometry). */
  reserveSpace?: boolean
}

export default function FormError({ id, message, reserveSpace }: Props) {
  return (
    <p
      id={id}
      role={message ? 'alert' : undefined}
      className={`mt-1 text-[10px] leading-[13px] ${reserveSpace ? 'h-[13px]' : 'min-h-[13px]'}`}
      style={{ color: ERROR_COLOR }}
    >
      {message}
    </p>
  )
}
