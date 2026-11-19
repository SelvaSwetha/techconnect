import { useId, useState } from 'react'
import type { ReactNode } from 'react'

interface Props {
  question: ReactNode
  children: ReactNode
  /** Initial state; follows the Figma default (all answers visible on the Homepage). */
  defaultOpen?: boolean
  className?: string
  buttonClassName?: string
  answerClassName?: string
}

/**
 * Accessible accordion item: real <button> with aria-expanded/aria-controls, keyboard operable (Enter/Space),
 * smooth height + opacity transition (grid-rows 0fr -> 1fr, no JS measuring), icon + / − .
 */
export default function AccordionItem({ question, children, defaultOpen = false, className = '', buttonClassName = '', answerClassName = '' }: Props) {
  const [open, setOpen] = useState(defaultOpen)
  const uid = useId()
  const panel = `${uid}-panel`
  const head = `${uid}-head`
  return (
    <div className={className} data-open={open}>
      <h3 className="m-0">
        <button
          type="button"
          id={head}
          aria-expanded={open}
          aria-controls={panel}
          onClick={() => setOpen((v) => !v)}
          className={`flex w-full cursor-pointer items-start justify-between gap-4 text-left ${buttonClassName}`}
        >
          <span>{question}</span>
          <span aria-hidden="true" className="relative mt-[3px] block h-[14px] w-[14px] shrink-0 text-[red]">
            <span className="absolute left-0 top-1/2 h-[2px] w-full -translate-y-1/2 rounded bg-current" />
            <span className={`absolute left-1/2 top-0 h-full w-[2px] -translate-x-1/2 rounded bg-current transition-transform duration-300 motion-reduce:transition-none ${open ? 'scale-y-0' : 'scale-y-100'}`} />
          </span>
        </button>
      </h3>
      <div
        id={panel}
        role="region"
        aria-labelledby={head}
        inert={!open}
        className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out motion-reduce:transition-none ${open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
      >
        <div className="min-h-0 overflow-hidden">
          <div className={answerClassName}>{children}</div>
        </div>
      </div>
    </div>
  )
}
