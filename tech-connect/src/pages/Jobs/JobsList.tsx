import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { useJobs } from './jobsState'
import type { Job } from './jobsData'
import buildingIcon from './assets/icons/building.svg'
import pinIcon from './assets/icons/pin.svg'
import briefcaseIcon from './assets/icons/briefcase.svg'
import rupeeIcon from './assets/icons/rupee.svg'
import arrowIcon from './assets/icons/arrow.svg'
import chevron from './assets/icons/sort-chevron.svg'

const TONE: Record<Job['badge']['tone'], string> = {
  red: 'bg-[#fee2e2] text-[red]',
  green: 'bg-[#d1fae5] text-[#065f46]',
  blue: 'bg-[#dbeafe] text-[#1e40af]',
  purple: 'bg-[#ede9fe] text-[#5b21b6]',
  amber: 'bg-[#fef3c7] text-[#92400e]',
}
const Dot = () => <span aria-hidden="true" className="h-[5.5px] w-[3.9px] rounded-full bg-[#6b7280]" />


/** Details of one opening. Shows only the information already present on the card (no added content). */
function JobDetails({ job, onClose }: { job: Job; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null)
  useEffect(() => {
    const prev = document.activeElement as HTMLElement | null
    closeRef.current?.focus()
    const key = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', key)
    const overflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.removeEventListener('keydown', key); document.body.style.overflow = overflow; prev?.focus() }
  }, [onClose])
  const rows: [string, string][] = [
    ['Company', job.company], ['Location', job.location], ['Experience', job.exp], ['Package', job.pay],
    ['Work mode', job.mode], ['Posted', job.posted.replace(/^Posted /, '')], ['Deadline', job.deadline.replace(/^Deadline: /, '')],
  ]
  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose() }}>
      <div role="dialog" aria-modal="true" aria-labelledby="job-details-title" className="max-h-[90vh] w-full max-w-[560px] overflow-auto rounded-[16px] bg-white p-6 font-poppins text-[#0f172a] shadow-2xl sm:p-8">
        <div className="flex items-start gap-4">
          <img loading="lazy" decoding="async" src={job.icon} alt="" className="h-[44px] w-[44px] shrink-0" />
          <div className="min-w-0 flex-1">
            <h3 id="job-details-title" className="text-[18px] font-semibold leading-[26px]">{job.title}</h3>
            <span className={`mt-1 inline-block rounded-[4px] px-[8px] py-[2.5px] text-[10px] font-bold leading-[14px] tracking-[0.6px] ${TONE[job.badge.tone]}`}>{job.badge.label}</span>
          </div>
          <button ref={closeRef} type="button" onClick={onClose} aria-label="Close details" className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[20px] leading-none text-[#6b7280] transition-colors hover:bg-[#f3f4f6] hover:text-[red]">×</button>
        </div>
        <dl className="mt-5 grid grid-cols-[110px_1fr] gap-x-4 gap-y-2 text-[13px]">
          {rows.map(([k, v]) => (
            <div key={k} className="contents">
              <dt className="text-[#6b7280]">{k}</dt>
              <dd className={`font-medium ${k === 'Package' ? 'text-[red]' : 'text-[#334155]'}`}>{v}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-5 text-[11px] font-semibold tracking-[0.6px] text-[#6b7280]">SKILLS</p>
        <div className="mt-2 flex flex-wrap gap-[6px]">
          {job.tags.map((t) => <span key={t} className="rounded-[4px] bg-[#f3f4f6] px-[8px] py-[3px] text-[11px] text-[#4b5563]">{t}</span>)}
        </div>
        <div className="mt-6 flex justify-end gap-2">
          <button type="button" onClick={onClose} className="h-[36px] rounded-[6px] border border-[#e5e7eb] px-4 text-[12px] font-semibold text-[#374151] transition-colors hover:border-[red] hover:text-[red]">Close</button>
          <a href="#join" onClick={onClose} className="flex h-[36px] items-center justify-center rounded-[6px] bg-[red] px-5 text-[12px] font-semibold text-white transition hover:brightness-110">Apply Now →</a>
        </div>
      </div>
    </div>,
    document.body,
  )
}

/** "Curated Job Openings" (Figma 246:5920). Cards 1344 x 135 at a 151px pitch. */
export default function JobsList({ fluid }: { fluid?: boolean }) {
  const { jobs } = useJobs()
  const [open, setOpen] = useState<Job | null>(null)
  const total = jobs.length
  return (
    <div id="jobs-list" className={fluid ? 'w-full' : 'w-[1344px]'}>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="flex flex-wrap items-center gap-[16px]">
            <h2 className="font-poppins text-[24px] font-bold leading-[33.6px] tracking-[-0.66px] text-[#0f172a]">Curated Job Openings</h2>
            <span className="rounded-[8px] bg-[#f3f4f6] px-[10px] py-[3px] font-poppins text-[12px] font-semibold text-[#374151]" aria-live="polite">
              {total} {total === 1 ? 'Opportunity' : 'Opportunities'} Active
            </span>
          </div>
          <p className="mt-[2px] font-poppins text-[12px] tracking-[-0.05px] text-[#6b7280]">Hand-picked positions offering verified compensation structures and modern tech stacks.</p>
        </div>
        <label className="flex items-center gap-[8px] font-poppins text-[12px] tracking-[-0.08px] text-[#6b7280]">
          Sort By:
          <span className="relative">
            <select aria-label="Sort by" defaultValue="recent" className="h-[34px] w-[164px] appearance-none rounded-[8px] border border-[#e5e7eb] bg-white pl-[12px] pr-8 font-poppins text-[12px] text-[#374151] outline-none focus:border-[red]">
              <option value="recent">Most Recent</option>
            </select>
            <img loading="lazy" decoding="async" src={chevron} alt="" className="pointer-events-none absolute right-[11px] top-1/2 h-[5.1px] w-[8.7px] -translate-y-1/2" />
          </span>
        </label>
      </div>

      <ul className="mt-[22px] flex flex-col gap-[16px]">
        {jobs.map((j) => (
          <li key={j.id} className={`rounded-[12px] border border-[#e5e7eb] bg-white ${fluid ? 'p-4 sm:p-6' : 'flex h-[135px] items-start px-[24px] pt-[29px]'}`}>
            <div className={`flex w-full gap-[16px] ${fluid ? 'flex-col sm:flex-row sm:items-start' : ''}`}>
              <img loading="lazy" decoding="async" src={j.icon} alt="" className="h-[44px] w-[44px] shrink-0" />
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-[10px]">
                  <h3 className="font-poppins text-[16px] font-semibold leading-[22.4px] text-[#0f172a]">{j.title}</h3>
                  <span className={`rounded-[4px] px-[8px] py-[2.5px] font-poppins text-[10px] font-bold leading-[14px] tracking-[0.6px] ${TONE[j.badge.tone]}`}>{j.badge.label}</span>
                </div>
                <div className="mt-[6px] flex flex-wrap items-center gap-x-[12px] gap-y-1 font-poppins text-[12px] leading-[16.8px] text-[#6b7280]">
                  <span className="flex items-center gap-[4px] font-medium text-[#334155]"><img loading="lazy" decoding="async" src={buildingIcon} alt="" className="h-[11.2px] w-[12.5px]" />{j.company}</span>
                  <Dot />
                  <span className="flex items-center gap-[4px]"><img loading="lazy" decoding="async" src={pinIcon} alt="" className="h-[12.5px] w-[10px]" />{j.location}</span>
                  <Dot />
                  <span className="flex items-center gap-[4px]"><img loading="lazy" decoding="async" src={briefcaseIcon} alt="" className="h-[11.9px] w-[12.5px]" />{j.exp}</span>
                  <Dot />
                  <span className="flex items-center gap-[4px] font-bold text-[red]"><img loading="lazy" decoding="async" src={rupeeIcon} alt="" className="h-[10px] w-[13.8px]" />{j.pay}</span>
                </div>
                <div className="mt-[12px] flex flex-wrap gap-[6px]">
                  {j.tags.map((t) => (
                    <span key={t} className="rounded-[4px] bg-[#f3f4f6] px-[8px] py-[3px] font-poppins text-[11px] leading-[15.4px] text-[#4b5563]">{t}</span>
                  ))}
                  <span className="rounded-[4px] bg-[#fef2f2] px-[8px] py-[3px] font-poppins text-[11px] font-medium leading-[15.4px] text-[red]">{j.mode}</span>
                </div>
              </div>
              <div className={`flex shrink-0 ${fluid ? 'flex-row items-center justify-between gap-4 sm:flex-col sm:items-end' : 'h-[81px] flex-col items-end justify-between'}`}>
                <div className="text-right font-poppins text-[11px] leading-[15.4px]">
                  <p className="tracking-[0.08px] text-[#9ca3af]">{j.posted}</p>
                  <p className="mt-[6px] font-medium text-[#64748b]">{j.deadline}</p>
                </div>
                <div className="flex gap-[7px]">
                  <button type="button" aria-haspopup="dialog" onClick={() => setOpen(j)} className="h-[32px] w-[70px] rounded-[6px] border border-[#e5e7eb] bg-white font-poppins text-[12px] font-semibold text-[#374151] transition-colors hover:border-[red] hover:text-[red]">Details</button>
                  <a href="#join" className="flex h-[32px] w-[112px] items-center justify-center gap-[6px] rounded-[6px] bg-[red] font-poppins text-[12px] font-semibold tracking-[0.05px] text-white transition hover:brightness-110">
                    Apply Now <img loading="lazy" decoding="async" src={arrowIcon} alt="" className="h-[9.3px] w-[9.3px]" />
                  </a>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
      {jobs.length === 0 ? (
        <p role="status" className="rounded-[12px] border border-[#e5e7eb] bg-white p-6 font-poppins text-[13px] text-[#6b7280]">No openings match your search. Try a different keyword or reset the filters.</p>
      ) : null}
      {open ? <JobDetails job={open} onClose={() => setOpen(null)} /> : null}
    </div>
  )
}
