import type { ReactNode } from 'react'
import FormLabel from '../../components/forms/FormLabel'
import FormError from '../../components/forms/FormError'

/** Label + control + error, with the 4px label gap of the Figma form fields (no reserved error row). */
export function Field({ id, label, required, error, className, children }: { id: string; label: string; required?: boolean; error?: string; className?: string; children: ReactNode }) {
  return (
    <div className={`flex min-w-0 flex-col gap-1 ${className ?? ''}`}>
      <FormLabel htmlFor={id} required={required} className="block font-poppins text-[11px] font-medium uppercase leading-[16.5px] text-[#4b5563]">
        {label}
      </FormLabel>
      {children}
      {error ? <FormError id={`${id}-err`} message={error} /> : null}
    </div>
  )
}

/** Lines of copy that the 1440px frame breaks by hand; on narrow screens they flow as one paragraph. */
export function Lines({ lines }: { lines: readonly string[] }) {
  return (
    <>
      {lines.map((l, i) => (
        <span key={l}>
          {i > 0 ? <br className="hidden lg:inline" /> : null}
          {i > 0 ? <span className="lg:hidden"> </span> : null}
          {l}
        </span>
      ))}
    </>
  )
}
