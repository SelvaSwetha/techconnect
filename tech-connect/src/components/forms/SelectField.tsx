import type { SelectHTMLAttributes } from 'react'
import { controlClass } from './styles'
import type { ControlSize } from './styles'

export interface SelectFieldProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  id: string
  options: readonly string[]
  /** Text of the empty first option (acts as the placeholder). */
  placeholder: string
  error?: string
  size?: ControlSize
}

const CHEVRON_IMAGE =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' fill='none'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%235e6166' stroke-width='1.5'/%3E%3C/svg%3E\")"
const CHEVRON = 'bg-[right_12px_center] bg-no-repeat'

export default function SelectField({ id, options, placeholder, error, size = 'md', value, className, style, name, ...rest }: SelectFieldProps) {
  return (
    <select
      id={id}
      name={name ?? id}
      value={value}
      aria-invalid={error ? true : undefined}
      aria-describedby={error ? `${id}-err` : undefined}
      className={`${controlClass(size, !!error)} appearance-none ${CHEVRON} pr-8 ${value ? '' : 'text-[#5e6166]'} ${className ?? ''}`}
      style={{ height: 40, backgroundImage: CHEVRON_IMAGE, ...style }}
      {...rest}
    >
      <option value="">{placeholder}</option>
      {options.map((o) => (
        <option key={o} value={o} className="text-[#0f0f12]">
          {o}
        </option>
      ))}
    </select>
  )
}
