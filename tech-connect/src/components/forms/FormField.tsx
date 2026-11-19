import type { ReactNode } from 'react'
import FormError from './FormError'
import FormLabel from './FormLabel'

interface Props {
  /** DOM id of the control inside; the error is `${id}-err` and the helper `${id}-help`. */
  id: string
  label: string
  error?: string
  helperText?: string
  required?: boolean
  /** Hide the visible label (placeholder-style fields); it stays available to screen readers. */
  hideLabel?: boolean
  /** Span all grid columns. */
  wide?: boolean
  reserveErrorSpace?: boolean
  labelClassName?: string
  children: ReactNode
}

export default function FormField({ id, label, error, helperText, required, hideLabel, wide, reserveErrorSpace, labelClassName, children }: Props) {
  return (
    <div className={wide ? 'col-span-full' : undefined}>
      <FormLabel htmlFor={id} hidden={hideLabel} required={required} className={labelClassName}>
        {label}
      </FormLabel>
      {children}
      {helperText && !error ? (
        <p id={`${id}-help`} className="mt-1 font-poppins text-[10px] leading-[13px] text-[#5e6166]">
          {helperText}
        </p>
      ) : null}
      <FormError id={`${id}-err`} message={error} reserveSpace={reserveErrorSpace && !helperText} />
    </div>
  )
}
