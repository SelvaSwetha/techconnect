import type { ButtonHTMLAttributes } from 'react'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** primary = solid red (Figma CTA); secondary = outlined; link = underlined text link. */
  variant?: 'primary' | 'secondary' | 'link'
  fullWidth?: boolean
}

const VARIANT = {
  primary:
    'h-[46px] rounded-[7px] bg-[red] text-[13px] font-semibold text-white transition duration-200 hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70',
  secondary:
    'h-[40px] rounded-[7px] border border-[#d1d1d1] bg-white px-5 text-[12px] font-semibold text-[#0f0f12] transition-colors hover:border-[#0f0f12]',
  link: 'text-[11px] underline transition-colors hover:text-[#0f0f12] disabled:opacity-50',
} as const

export default function FormButton({ variant = 'primary', fullWidth, className, type = 'button', ...rest }: Props) {
  return <button type={type} className={`font-poppins ${VARIANT[variant]} ${fullWidth ? 'w-full' : ''} ${className ?? ''}`} {...rest} />
}
