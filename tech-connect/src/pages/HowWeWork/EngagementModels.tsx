import { useId, useState } from 'react'
import { Link } from 'react-router-dom'
import Glyph from './Glyph'
import type { GlyphName } from './glyphs'

interface Model {
  name: string
  /** label of the button while the model is not selected */
  choose: string
  icon: GlyphName
  body: string
  points: readonly string[]
  /** existing solution page for this model, if there is one */
  to?: string
  tag?: string
}

const MODELS: readonly Model[] = [
  {
    name: 'Permanent Recruitment',
    choose: 'Choose Permanent',
    icon: 'badge',
    body: 'Contingent or retained search for core engineering and key product specialists.',
    points: ['Single & multi-role scope', '90-Day direct replacement', 'Contingent milestone fees'],
    to: '/solutions/permanent-recruitment',
  },
  {
    name: 'Contract Staffing',
    choose: 'Choose Contract',
    icon: 'bolt',
    body: 'Rapidly deploy specialized contractors for sprint spikes and migration phases.',
    points: ['48-Hour swift mobilization', 'Compliant payroll & taxes', 'Contract-to-hire options'],
  },
  {
    name: 'Executive Search',
    choose: 'Choose Executive',
    icon: 'shieldLock',
    body: 'Confidential retained search for VP, CTO, and transformational tech leaders.',
    points: ['Strict NDA confidentiality', 'Deep leadership profiling', 'Partner-led search execution'],
    to: '/solutions/executive-search',
    tag: 'C-Suite',
  },
  {
    name: 'Enterprise RPO',
    choose: 'Choose Enterprise RPO',
    icon: 'network',
    body: 'Embedded talent squads operating inside your stack for aggressive scale phases.',
    points: ['Full ATS & stack integration', 'Dedicated full-time squad', 'Lowest cost-per-hire aggregate'],
  },
]

/** "Select Your Engagement Model": one selected card at a time, kept in React state. */
export default function EngagementModels() {
  const [selected, setSelected] = useState(0)
  const uid = useId()
  const current = MODELS[selected]

  return (
    <div className="font-poppins text-[#191c1e]">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-[12px] font-semibold leading-[16.8px] tracking-[0.62px] text-[#ff0000]">SERVICE ARCHITECTURE</p>
          <h2 className="mt-[2px] text-[26px] font-bold leading-[1.2] tracking-[-0.027em] sm:text-[30px] sm:leading-[42px]">Select Your Engagement Model</h2>
          <p className="mt-[2px] text-[14px] leading-[19.6px] tracking-[0.06px] text-[#565e74]">Flexible models tailored to your hiring velocity, capacity, and organizational scope.</p>
        </div>
        <p
          role="status"
          className="inline-flex h-[32px] shrink-0 items-center gap-[10px] self-start rounded-full border border-[#eceef0] bg-[#f7f9fb] px-[14px] text-[12px] font-semibold leading-[16.8px] tracking-[0.13px] shadow-[0_1px_2px_rgba(16,24,40,0.05)]"
        >
          <span aria-hidden="true" className="size-[8px] rounded-full bg-[#ff0000]" />
          Selected: {current.name}
        </p>
      </div>

      <div role="group" aria-label="Engagement models" className="-mx-[2px] mt-[38px] grid gap-x-[20px] gap-y-[48px] sm:grid-cols-2 lg:grid-cols-4 lg:gap-y-0">
        {MODELS.map((m, i) => {
          const active = i === selected
          const titleId = `${uid}-t${i}`
          return (
            <div
              key={m.name}
              onClick={() => setSelected(i)}
              className={`relative flex min-h-[345px] cursor-pointer flex-col rounded-[16px] border-2 p-[26px] transition-colors duration-200 has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-4 has-[:focus-visible]:outline-[#ff0000] ${
                active ? 'border-[#ff0000] bg-[#fef2f2]' : 'border-[#e6e8ea] bg-[#f7f9fb] hover:border-[#d1d5db]'
              }`}
            >
              {active || m.tag ? (
                <div className="absolute -top-[33px] right-[20px] flex items-center gap-2">
                  {m.tag ? <span className="rounded-[4px] bg-[#fee2e2] px-[10px] py-[2px] text-[10px] font-bold leading-[14px] text-[#b91c1c]">{m.tag}</span> : null}
                  {active ? <span className="rounded-[4px] bg-[#ff0000] px-[10px] py-[2px] text-[10px] font-bold leading-[14px] tracking-[0.14px] text-white">ACTIVE CHOICE</span> : null}
                </div>
              ) : null}

              <span className="flex size-[40px] items-center justify-center rounded-[10px] bg-[#fef2f2]">
                <Glyph name={m.icon} />
              </span>
              <h3 id={titleId} className="mt-[17px] text-[18px] font-bold leading-[25.2px]">
                {m.to ? (
                  <Link to={m.to} onClick={(e) => e.stopPropagation()} className="transition-opacity hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff0000]">
                    {m.name}
                  </Link>
                ) : (
                  m.name
                )}
              </h3>
              <p className="mt-[6px] text-[12px] leading-[19px] tracking-[-0.2px] text-[#565e74]">{m.body}</p>
              <ul className="mt-[18px] flex flex-col gap-[10px]">
                {m.points.map((pt) => (
                  <li key={pt} className="flex items-center gap-[8px] text-[12px] leading-[14px] tracking-[-0.05px]">
                    <Glyph name="check" />
                    {pt}
                  </li>
                ))}
              </ul>
              <button
                type="button"
                aria-pressed={active}
                aria-label={active ? `${m.name} selected` : `Select ${m.name}`}
                onClick={(e) => {
                  e.stopPropagation()
                  setSelected(i)
                }}
                className={`mt-auto inline-flex h-[40px] w-full items-center justify-center gap-[8px] rounded-[8px] border-2 text-[12px] font-semibold leading-[16.8px] transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#191c1e] ${
                  active ? 'border-[#ff0000] bg-[#ff0000] text-white' : 'border-[#e6e8ea] bg-white text-[#191c1e] hover:border-[#191c1e]'
                }`}
              >
                {active ? (
                  <>
                    Selected Plan
                    <Glyph name="checkWhite" />
                  </>
                ) : (
                  <>
                    {m.choose}
                    <Glyph name="arrowDark" />
                  </>
                )}
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}
