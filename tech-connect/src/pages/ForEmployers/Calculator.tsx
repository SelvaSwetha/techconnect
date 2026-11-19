import { useId, useState } from 'react'
import iconCalc from '../../assets/icons/for-employers/calc-icon.svg'
import iconDownload from '../../assets/icons/for-employers/calc-download.svg'
import iconAudit from '../../assets/icons/for-employers/audit-icon.svg'
import iconVerified from '../../assets/icons/for-employers/audit-verified.svg'
import { AUDIT_CHECKS, CALC } from './data'

const usd = (n: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(Math.round(n))

function Slider({ label, value, shown, min, max, step, onChange }: { label: string; value: number; shown: string; min: number; max: number; step: number; onChange: (v: number) => void }) {
  const id = useId()
  return (
    <div className="flex flex-col gap-[7px] pb-[7px]">
      <div className="flex items-start justify-between font-poppins text-[12px] leading-[16px]">
        <label htmlFor={id} className="font-medium text-[#4b5563]">{label}</label>
        <output htmlFor={id} className="font-bold text-[red]">{shown}</output>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        aria-valuetext={shown}
        className="h-4 w-full cursor-pointer bg-white accent-[red]"
      />
    </div>
  )
}

/** INTERACTIVE HIRING COST CALCULATOR & AUDIT (Figma 255:9148). */
export default function Calculator() {
  const [salary, setSalary] = useState<number>(CALC.salary.initial)
  const [roles, setRoles] = useState<number>(CALC.roles.initial)
  const total = salary * roles
  const inHouse = total * CALC.inHouseRate
  const pod = total * CALC.podRate

  const exportAssessment = () => {
    const lines = [
      'TechzConnect - Hiring Cost & Time-to-Fill Assessment',
      '',
      `Annual base compensation: ${usd(salary)}`,
      `Open roles to hire: ${roles}`,
      `In-house cost (overhead + vacancy): ${usd(inHouse)} (~${CALC.inHouseDays} days avg. time-to-fill)`,
      `TechzConnect pod cost: ${usd(pod)} (${CALC.podDays} days first onboarding)`,
      `Estimated difference: ${usd(inHouse - pod)}`,
    ]
    const url = URL.createObjectURL(new Blob([lines.join('\n')], { type: 'text/plain' }))
    const a = document.createElement('a')
    a.href = url
    a.download = 'techzconnect-hiring-assessment.txt'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="mx-auto flex max-w-[1440px] flex-col items-center gap-12 px-5 sm:px-8 lg:px-12">
      <div className="flex w-full max-w-[672px] flex-col items-center gap-1 text-center">
        <p className="font-poppins text-[12px] font-semibold uppercase leading-[16px] tracking-[0.6px] text-[red]">DECISION INTELLIGENCE TOOLS</p>
        <h2 className="font-poppins text-[26px] font-semibold leading-[36px] tracking-[-0.75px] text-[#191c1e] sm:text-[30px]">Optimize Talent Acquisition Economics</h2>
        <p className="pt-1 font-poppins text-[14px] leading-[20px] text-[#4b5563]">Uncover hidden vacancy costs and evaluate hiring timelines using dynamic benchmarks.</p>
      </div>
      <div className="flex w-full flex-col gap-8 lg:flex-row lg:items-stretch">
        <section aria-labelledby="calc-title" className="flex min-w-0 flex-col justify-between rounded-[12px] border border-[#e5e7eb] bg-white p-[25px] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] sm:p-[33px] lg:flex-1">
          <div className="flex flex-col gap-1 pb-6">
            <div className="flex items-center justify-between">
              <span className="flex size-10 items-center justify-center rounded-[8px] bg-[#fef2f2]">
                <img src={iconCalc} alt="" width={16.5} height={16.5} />
              </span>
              <span className="rounded-[4px] bg-[#f3f4f6] px-[10px] py-[2px] font-poppins text-[11px] font-semibold leading-[16.5px] text-[#6b7280]">Live Dynamic Tool</span>
            </div>
            <h3 id="calc-title" className="pt-3 font-poppins text-[20px] font-bold leading-[28px] text-[#111827]">Hiring Cost &amp; Time-to-Fill Calculator</h3>
            <p className="font-poppins text-[12px] leading-[16px] text-[#6b7280]">
              Adjust sliders to compare internal recruitment drag against TechzConnect <br className="hidden lg:inline" />
              accelerated delivery.
            </p>
            <div className="flex flex-col gap-4 rounded-[8px] border border-[#f3f4f6] bg-[#f9fafb] px-[17px] pb-[17px] pt-[37px]">
              <Slider label="Annual Base Compensation:" value={salary} shown={usd(salary)} {...CALC.salary} onChange={setSalary} />
              <Slider label="Open Roles to Hire:" value={roles} shown={`${roles} ${roles === 1 ? 'Role' : 'Roles'}`} {...CALC.roles} onChange={setRoles} />
              <div className="flex gap-4 border-t border-[#e5e7eb] pt-[17px]" aria-live="polite">
                <div className="flex min-w-0 flex-1 flex-col gap-[2px]">
                  <p className="font-poppins text-[11px] leading-[16.5px] text-[#6b7280]">In-House Cost (Overhead + Vacancy)</p>
                  <p className="font-poppins text-[20px] font-bold leading-[28px] text-[#111827]">{usd(inHouse)}</p>
                  <p className="font-poppins text-[11px] leading-[16.5px] text-[#9ca3af]">~{CALC.inHouseDays} Days avg. time-to-fill</p>
                </div>
                <div className="flex min-w-0 flex-1 flex-col gap-[2px] border-l border-[#e5e7eb] pl-[17px]">
                  <p className="font-poppins text-[11px] leading-[16.5px] text-[#6b7280]">TechzConnect Pod Cost</p>
                  <p className="font-poppins text-[20px] font-bold leading-[28px] text-[red]">{usd(pod)}</p>
                  <p className="font-poppins text-[11px] font-semibold leading-[16.5px] text-[red]">{CALC.podDays} Days first onboarding</p>
                </div>
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={exportAssessment}
            className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-[8px] bg-[red] py-3 font-poppins text-[12px] font-medium leading-[16px] text-white drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] transition hover:brightness-110"
          >
            Export Customized Hiring Assessment
            <img src={iconDownload} alt="" width={10.667} height={10.667} />
          </button>
        </section>
        <section aria-labelledby="audit-title" className="flex min-w-0 flex-col justify-between gap-[40.5px] rounded-[12px] border border-[#e5e7eb] bg-white p-[25px] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] sm:p-[33px] lg:flex-1">
          <div className="flex flex-col gap-1 pb-6">
            <div className="flex items-center justify-between">
              <span className="flex size-10 items-center justify-center rounded-[8px] bg-[#f3f4f6]">
                <img src={iconAudit} alt="" width={20.167} height={15.583} />
              </span>
              <span className="rounded-[4px] bg-[#f3f4f6] px-[10px] py-[2px] font-poppins text-[11px] font-semibold leading-[16.5px] text-[#6b7280]">No Obligation</span>
            </div>
            <h3 id="audit-title" className="pt-3 font-poppins text-[20px] font-bold leading-[28px] text-[#111827]">Complimentary Talent &amp; Market Audit</h3>
            <p className="font-poppins text-[12px] leading-[16px] text-[#6b7280]">
              Are requirements limiting Tier-1 applicant flow? Receive an assessment of liquidity, <br className="hidden lg:inline" />
              compensation parity, and keyword efficacy.
            </p>
            <ul className="flex list-none flex-col gap-3 pt-5">
              {AUDIT_CHECKS.map((c) => (
                <li key={c.title} className="flex items-start gap-3 rounded-[4px] border border-[#f3f4f6] bg-[#f9fafb] p-[13px]">
                  <img src={c.icon} alt="" width={c.w} height={c.h} className="shrink-0" />
                  <div>
                    <h4 className="font-poppins text-[12px] font-bold leading-[16px] text-[#111827]">{c.title}</h4>
                    <p className="font-poppins text-[11px] leading-[16.5px] text-[#6b7280]">{c.body}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <a href="#requisition" className="flex w-full items-center justify-center gap-2 rounded-[8px] bg-black py-3 font-poppins text-[12px] font-medium leading-[16px] text-white transition hover:bg-[#1f2937]">
            Request Complimentary Role Audit
            <img src={iconVerified} alt="" width={14.667} height={14} />
          </a>
        </section>
      </div>
    </div>
  )
}
