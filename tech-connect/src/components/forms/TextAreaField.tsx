import type { TextareaHTMLAttributes } from 'react'
import { controlClass } from './styles'
import type { ControlSize } from './styles'

export interface TextAreaFieldProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  id: string
  error?: string
  size?: ControlSize
  height?: number
}

export default function TextAreaField({ id, error, size = 'md', height = 80, className, style, name, ...rest }: TextAreaFieldProps) {
  return (
    <textarea
      id={id}
      name={name ?? id}
      aria-invalid={error ? true : undefined}
      aria-describedby={error ? `${id}-err` : undefined}
      className={`${controlClass(size, !!error)} resize-none py-[11px] leading-[16px] ${className ?? ''}`}
      style={{ height, ...style }}
      {...rest}
    />
  )
}
