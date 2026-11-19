import sla1 from './assets/sla/sla1.svg'
import sla2 from './assets/sla/sla2.svg'
import sla3 from './assets/sla/sla3.svg'
import sla4 from './assets/sla/sla4.svg'
import outcome from './assets/sla/outcome.svg'

/** Recruitment Commitments & SLAs rows. Copy as shown in the design. `unit` is the small label next to / under the number. */
const ROWS = [
  { ring: sla1, value: '72', unit: 'Hours', unitBelow: true, title: 'First Shortlist SLA', body: 'Interview-ready profiles delivered within 3 business days of calibration.' },
  { ring: sla2, value: '94', unit: '%', title: '12-Month Retention', body: 'Placed engineers continuing past their first year across client teams.' },
  { ring: sla3, value: '4:1', unit: '', title: 'Interview-to-Offer', body: 'Zero interview fatigue with razor-sharp upfront candidate calibration.' },
  { ring: sla4, value: '90', unit: 'Days', title: 'Placement Guarantee', body: 'Zero-risk direct replacement guarantee with priority immediate sourcing.' },
] as const

/**
 * "Recruitment Commitments & SLAs" metrics band (How We Work). One flex/grid row per metric, so icon, number, divider
 * and copy share a single vertical centre and can never overlap. Desktop = the 1440px design; `fluid` = stacked.
 */
export default function SlaCommitments({ fluid }: { fluid?: boolean }) {
  return (
    <div className={`border-t-2 border-[#eceef0] bg-[#fff5f5] ${fluid ? 'rounded-[16px] border-2 p-5 sm:p-8' : 'flex h-[511px] w-[1440px]'}`}>
      <ul className={fluid ? 'flex flex-col gap-6' : 'w-[1225px] shrink-0 pl-[480px] pt-[49px]'}>
        {ROWS.map((r) => (
          <li key={r.title} className={`flex items-center ${fluid ? 'flex-wrap gap-x-4 gap-y-3' : 'h-[94px]'}`}>
            <img loading="lazy" decoding="async" src={r.ring} alt="" className={`shrink-0 ${fluid ? 'h-[72px] w-[72px]' : 'h-[100.3px] w-[106px]'}`} />
            <div className={`flex shrink-0 ${fluid ? 'min-w-[96px] flex-col' : 'ml-[16px] w-[178px] flex-col'}`}>
              <p className="flex items-baseline gap-[6px] font-poppins font-bold leading-none text-[red]">
                <span className={`tabular-nums ${fluid ? 'text-[40px]' : 'text-[52px]'}`}>{r.value}</span>
                {r.unit && !('unitBelow' in r) ? <span className={`text-[#111827] ${r.unit === '%' ? 'text-[22px]' : 'text-[13px]'}`}>{r.unit}</span> : null}
              </p>
              {'unitBelow' in r ? <span className="mt-1 font-poppins text-[13px] font-bold leading-[18px] text-[#111827]">{r.unit}</span> : null}
            </div>
            <span aria-hidden="true" className={`h-[40px] w-px shrink-0 bg-[#e5e7eb] ${fluid ? 'hidden sm:block' : ''}`} />
            <div className={`min-w-0 ${fluid ? 'basis-full sm:ml-4 sm:basis-0 sm:flex-1' : 'ml-[24px] w-[262px]'}`}>
              <h3 className="font-poppins text-[15.5px] font-bold leading-[21.7px] text-[#111827]">{r.title}</h3>
              <p className="mt-[3px] font-poppins text-[12.5px] leading-[20px] text-[#6b7280]">{r.body}</p>
            </div>
          </li>
        ))}
      </ul>

      <div className={fluid ? 'mt-8 border-t-2 border-[#f3f4f6] pt-6' : 'relative mt-[60px] h-[460px] flex-1 border-l-2 border-[#f3f4f6]'}>
        {fluid ? (
          <div className="flex items-stretch gap-3">
            <span aria-hidden="true" className="w-[4px] shrink-0 rounded bg-[red]" />
            <p className="font-poppins text-[14px] leading-[20px] text-[#111827]">
              <span className="font-semibold">Measurable outcomes.</span> <span className="font-bold text-[red]">Stronger hiring.</span>
            </p>
          </div>
        ) : (
          <>
            <img loading="lazy" decoding="async" src={outcome} alt="" className="absolute left-[68.7px] top-[154.8px] h-[48px] w-[48px]" />
            <span aria-hidden="true" className="absolute left-[66.7px] top-[222.8px] h-[82.4px] w-[4px] bg-[red]" />
            <p className="absolute left-[82.7px] top-[173.6px] font-poppins text-[14px] font-semibold leading-[19px] tracking-[-0.75px] text-[#111827]">Measurable<br />outcomes.</p>
            <p className="absolute left-[82.7px] top-[215.9px] font-poppins text-[14.5px] font-bold leading-[20px] tracking-[-0.81px] text-[red]">Stronger<br />hiring.</p>
          </>
        )}
      </div>
    </div>
  )
}
