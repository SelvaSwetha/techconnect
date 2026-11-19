import type { InputHTMLAttributes } from 'react'
import { controlClass } from './styles'
import type { ControlSize } from './styles'

export interface TextInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  id: string
  error?: string
  /** Visual size (text size), not the HTML size attribute. */
  size?: ControlSize
}

/** Base single-line input (text / number / etc.). */
export default function TextInput({ id, error, size = 'md', className, style, name, ...rest }: TextInputProps) {
  return (
    <input
      id={id}
      name={name ?? id}
      aria-invalid={error ? true : undefined}
      aria-describedby={error ? `${id}-err` : undefined}
      className={`${controlClass(size, !!error)} ${className ?? ''}`}
      style={{ height: 40, ...style }}
      {...rest}
    />
  )
}
