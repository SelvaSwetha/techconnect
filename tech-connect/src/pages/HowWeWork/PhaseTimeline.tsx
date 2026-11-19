import { useId, useRef, useState } from 'react'
import type { KeyboardEvent } from 'react'
import { Link } from 'react-router-dom'
import { ENQUIRY_ROUTE } from '../../navigation'
import { FRAMEWORK_ANCHOR } from './HeroSection'

interface Phase {
  /** short label on the tab */
  tab: string
  /** heading of the panel, after "Phase N:" */
  title: string
  /** shown in the progress row, e.g. "Days 1–2" */
  duration: string
  /** shown as the chip in the panel header */
  chip: string
  description: string
  activities: readonly string[]
  deliverables: readonly string[]
}

/** Four-phase workflow. Progress is derived from the phase index (1/4 … 4/4), not stored separately. */
const PHASES: readonly Phase[] = [
  {
    tab: 'Discovery',
    title: 'Discovery & Talent Mapping',
    duration: 'Days 1–2',
    chip: 'Days 1 – 2',
    description: 'Understand the hiring requirements, business goals and ideal candidate profile before beginning the recruitment process.',
    activities: [
      'Initial hiring consultation',
      'Job role and responsibility analysis',
      'Required skills and experience identification',
      'Salary range and hiring timeline confirmation',
      'Candidate profile and selection criteria finalization',
    ],
    deliverables: ['Approved job requirement', 'Candidate profile', 'Recruitment strategy and hiring timeline'],
  },
  {
    tab: 'Sourcing & Vetting',
    title: 'Sourcing & Vetting',
    duration: 'Days 3–7',
    chip: 'Days 3 – 7',
    description: 'Identify suitable candidates through relevant sourcing channels and evaluate their qualifications against the approved requirements.',
    activities: [
      'Targeted candidate sourcing',
      'Database and professional network search',
      'Resume screening',
      'Initial candidate conversations',
      'Skills and experience evaluation',
      'Availability and compensation validation',
    ],
    deliverables: ['Qualified candidate pool', 'Screened and evaluated candidate profiles', 'Initial assessment notes'],
  },
  {
    tab: 'Shortlist Delivery',
    title: 'Shortlist Delivery',
    duration: 'Days 8–10',
    chip: 'Days 8 – 10',
    description: 'Present qualified, interview-ready candidates with clear evaluation details to support informed hiring decisions.',
    activities: [
      'Final candidate assessment',
      'Shortlist preparation',
      'Candidate profile presentation',
      'Interview coordination',
      'Client feedback collection',
      'Interview scheduling support',
    ],
    deliverables: ['Interview-ready candidate shortlist', 'Candidate evaluation summaries', 'Interview schedule and feedback tracking'],
  },
  {
    tab: 'Offer & Retention',
    title: 'Offer & Retention',
    duration: 'Day 11 onward',
    chip: 'Day 11 onward',
    description: 'Support the final selection, offer coordination and post-placement follow-up to help complete the hiring process smoothly.',
    activities: [
      'Final interview coordination',
      'Selection confirmation',
      'Offer discussion and negotiation support',
      'Candidate acceptance follow-up',
      'Joining coordination',
      'Post-placement follow-up',
    ],
    deliverables: ['Offer coordination support', 'Candidate acceptance confirmation', 'Joining status updates', 'Post-placement follow-up'],
  },
]

const CheckIcon = () => (
  <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ff0000" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className="mt-[3px] shrink-0">
    <circle cx="12" cy="12" r="10" />
    <path d="m8 12.5 3 3 5-6" />
  </svg>
)

/**
 * "The 10-Stage Comprehensive Hiring Framework" section: heading, four phase tabs, timeline progress and the selected
 * phase's content. One component for desktop and mobile; base styles are the small-screen layout, `lg:` the desktop one.
 */
export default function PhaseTimeline() {
  const [index, setIndex] = useState(0)
  const uid = useId()
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])
  const phase = PHASES[index]
  const percent = ((index + 1) / PHASES.length) * 100
  const tabId = (i: number) => `${uid}-tab-${i}`
  const panelId = `${uid}-panel`

  const select = (i: number, focus = false) => {
    setIndex(i)
    if (focus) tabRefs.current[i]?.focus()
  }
  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    const last = PHASES.length - 1
    const next =
      e.key === 'ArrowRight' || e.key === 'ArrowDown' ? (index === last ? 0 : index + 1)
      : e.key === 'ArrowLeft' || e.key === 'ArrowUp' ? (index === 0 ? last : index - 1)
      : e.key === 'Home' ? 0
      : e.key === 'End' ? last
      : -1
    if (next < 0) return
    e.preventDefault()
    select(next, true)
  }

  return (
    <div id={FRAMEWORK_ANCHOR} className="scroll-mt-[110px] font-poppins text-[#191c1e]">
      <div className="flex flex-col items-center text-center">
        <p className="text-[12px] font-semibold leading-[16.8px] tracking-[0.59px] text-[#ff0000]">STRUCTURED WORKFLOW</p>
        <h2 className="mt-[6px] max-w-[720px] text-[24px] font-bold leading-[1.25] tracking-[-0.03em] text-[#181c1d] sm:text-[30px] sm:leading-[42px]">
          The 10-Stage Comprehensive Hiring Framework
        </h2>
        <p className="mt-[8px] max-w-[640px] text-[14px] leading-[19.6px] tracking-[0.07px] text-[#565e74]">
          Organized into 4 synchronized execution phases for transparent, rapid delivery.
        </p>
      </div>

      <div className="mx-auto mt-[40px] w-full max-w-[898px]">
        <div
          role="tablist"
          aria-label="Hiring phases"
          className="grid grid-cols-2 gap-[6px] rounded-[16px] border border-[#e6e8ea] bg-white p-[8px] shadow-[0_1px_2px_rgba(16,24,40,0.05)] sm:grid-cols-4"
        >
          {PHASES.map((p, i) => {
            const active = i === index
            return (
              <button
                key={p.tab}
                ref={(el) => {
                  tabRefs.current[i] = el
                }}
                id={tabId(i)}
                type="button"
                role="tab"
                aria-selected={active}
                aria-controls={panelId}
                tabIndex={active ? 0 : -1}
                onClick={() => select(i)}
                onKeyDown={onKeyDown}
                className={`flex h-[44px] min-w-0 items-center justify-center gap-[10px] rounded-[10px] px-2 text-[12px] font-semibold leading-[16.8px] transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff0000] ${
                  active ? 'bg-[#ff0000] text-white' : 'text-[#565e74] hover:bg-[#f7f9fb] hover:text-[#191c1e]'
                }`}
              >
                <span
                  aria-hidden="true"
                  className={`flex size-[20px] shrink-0 items-center justify-center rounded-full text-[10px] font-bold leading-[14px] transition-colors duration-200 ${
                    active ? 'bg-white text-[#ff0000]' : 'bg-[#e6e8ea] text-[#565e74]'
                  }`}
                >
                  {i + 1}
                </span>
                <span className="truncate">{p.tab}</span>
              </button>
            )
          })}
        </div>

        <div className="mt-[18px] flex items-center gap-[14px] px-[4px] text-[11px] leading-[15.4px]">
          <span className="hidden shrink-0 tracking-[1.24px] text-[#565e74] sm:inline">Timeline Progress:</span>
          <div
            role="progressbar"
            aria-label="Timeline progress"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={percent}
            aria-valuetext={`Phase ${index + 1} of ${PHASES.length}, ${percent}% complete`}
            className="h-[8px] min-w-0 flex-1 overflow-hidden rounded-full bg-[#eceef0]"
          >
            <div className="h-full rounded-full bg-[#ff0000] transition-[width] duration-500 ease-out" style={{ width: `${percent}%` }} />
          </div>
          <span className="shrink-0 font-semibold text-[#ff0000]">{percent}%</span>
          <span className="shrink-0 whitespace-nowrap font-semibold text-[#191c1e]">
            Phase {index + 1} / {PHASES.length} ({phase.duration})
          </span>
        </div>
      </div>

      <div
        role="tabpanel"
        id={panelId}
        aria-labelledby={tabId(index)}
        tabIndex={0}
        className="mt-[40px] min-h-[560px] rounded-[16px] border border-[#eceef0] bg-white p-5 shadow-[0_8px_30px_rgba(16,24,40,0.08)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff0000] sm:p-8 lg:min-h-[372px]"
      >
        <div className="flex flex-col gap-4 border-b-2 border-[#eceef0] pb-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex min-w-0 items-start gap-[14px]">
            <span className="flex size-[42px] shrink-0 items-center justify-center rounded-[10px] border border-[#fee2e2] bg-[#fef2f2] text-[12px] font-bold text-[#ff0000]">
              P{index + 1}
            </span>
            <div className="min-w-0">
              <h3 className="text-[17px] font-bold leading-[25.2px] sm:text-[18px]">
                Phase {index + 1}: {phase.title}
              </h3>
              <p className="mt-[2px] max-w-[640px] text-[12px] leading-[19px] text-[#565e74]">{phase.description}</p>
            </div>
          </div>
          <div className="flex shrink-0 flex-wrap items-center gap-x-4 gap-y-2 pl-[56px] lg:pl-0">
            <span className="whitespace-nowrap rounded-full border border-[#eceef0] bg-[#f7f9fb] px-[14px] py-[6px] text-[12px] font-semibold leading-[16.8px] text-[#565e74]">{phase.chip}</span>
            <Link to={ENQUIRY_ROUTE} className="text-[12px] font-semibold leading-[16.8px] text-[#ff0000] hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff0000]">
              Book Scope Review →
            </Link>
          </div>
        </div>

        <div className="mt-6 grid gap-5 lg:grid-cols-[minmax(0,1fr)_340px]">
          <section aria-labelledby={`${uid}-act`} className="rounded-[12px] bg-[#f7f9fb] p-5">
            <h4 id={`${uid}-act`} className="text-[12px] font-bold leading-[16.8px] tracking-[0.6px] text-[#565e74]">
              KEY ACTIVITIES
            </h4>
            <ul className="mt-4 grid gap-x-6 gap-y-3 sm:grid-cols-2">
              {phase.activities.map((a, i) => (
                <li key={a} className="flex items-start gap-[10px]">
                  <span className="flex size-[26px] shrink-0 items-center justify-center rounded-[8px] border border-[#fee2e2] bg-[#fef2f2] text-[11px] font-bold text-[#ff0000]">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="pt-[3px] text-[13px] font-semibold leading-[19px] text-[#191c1e]">{a}</span>
                </li>
              ))}
            </ul>
          </section>
          <section aria-labelledby={`${uid}-del`} className="rounded-[12px] bg-[#f7f9fb] p-5">
            <h4 id={`${uid}-del`} className="text-[12px] font-bold leading-[16.8px] tracking-[0.6px] text-[#565e74]">
              DELIVERABLES
            </h4>
            <ul className="mt-4 flex flex-col gap-3">
              {phase.deliverables.map((d) => (
                <li key={d} className="flex items-start gap-[10px]">
                  <CheckIcon />
                  <span className="text-[13px] font-semibold leading-[19px] text-[#b91c1c]">{d}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </div>
  )
}
