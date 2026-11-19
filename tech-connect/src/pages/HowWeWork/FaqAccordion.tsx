import { useId, useState } from 'react'

interface Faq {
  q: string
  a: string
}

/**
 * Questions are the page's own. The Drive/Figma exports only show them collapsed, so no approved answer text exists yet:
 * each answer below is assembled only from statements already published on this page (SLA cards, engagement models,
 * hero features). Replace with the approved wording when it is available.
 */
const FAQS: readonly Faq[] = [
  {
    q: 'Can you support niche or senior leadership technical hiring?',
    a: 'Yes. Our Executive Search model is confidential retained search for VP, CTO, and transformational tech leaders, with strict NDA confidentiality, deep leadership profiling, and partner-led search execution.',
  },
  {
    q: 'What is your screening and technical vetting rigor?',
    a: 'Every search runs through Rigorous Dual-Gate Vetting: live code verification paired with cultural and leadership velocity alignment.',
  },
  {
    q: 'How quickly can we expect shortlisted candidates?',
    a: 'Our First Shortlist SLA is 72 hours: interview-ready profiles delivered within 3 business days of calibration.',
  },
  {
    q: 'What happens if a candidate leaves during probation?',
    a: 'Permanent Recruitment includes a 90-day direct replacement, and our Placement Guarantee is a zero-risk direct replacement guarantee with priority immediate sourcing.',
  },
]

/** FAQ accordion: one answer open at a time, all collapsed initially. */
export default function FaqAccordion() {
  const [open, setOpen] = useState<number | null>(null)
  const uid = useId()

  return (
    <div className="font-poppins text-[#191c1e]">
      <div className="text-center">
        <p className="text-[12px] font-semibold leading-[16.8px] tracking-[0.65px] text-[#ff0000]">CLEAR ANSWERS</p>
        <h2 className="mt-[2px] text-[26px] font-bold leading-[1.2] tracking-[-0.03em] sm:text-[30px] sm:leading-[42px]">Frequently Asked Questions</h2>
        <p className="mt-[4px] text-[14px] leading-[19.6px] tracking-[0.07px] text-[#565e74]">Everything you need to know regarding delivery speed, warranties, and vetting.</p>
      </div>

      <div className="mt-[44px] flex flex-col gap-[10px]">
        {FAQS.map((f, i) => {
          const isOpen = open === i
          const btnId = `${uid}-q${i}`
          const panelId = `${uid}-a${i}`
          return (
            <div key={f.q} className={`rounded-[8px] border-2 bg-white transition-colors duration-200 ${isOpen ? 'border-[#ff0000]/40' : 'border-[#e6e8ea]'}`}>
              <h3>
                <button
                  id={btnId}
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex min-h-[50px] w-full items-center justify-between gap-4 rounded-[6px] px-[21px] py-[12px] text-left text-[14px] font-semibold leading-[19.6px] focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[#ff0000]"
                >
                  <span>{f.q}</span>
                  <svg aria-hidden="true" width="12" height="12" viewBox="0 0 12 12" className="shrink-0 text-[#ff0000]" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
                    <path d="M1.5 6h9" />
                    <path d="M6 1.5v9" className={`origin-center transition-transform duration-200 ${isOpen ? 'scale-y-0' : 'scale-y-100'}`} />
                  </svg>
                </button>
              </h3>
              <div className={`grid transition-[grid-template-rows] duration-300 ease-out ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                <div id={panelId} role="region" aria-labelledby={btnId} inert={!isOpen} className="overflow-hidden">
                  <p className="px-[21px] pb-[18px] pt-[2px] text-[13px] leading-[21px] text-[#565e74]">{f.a}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
