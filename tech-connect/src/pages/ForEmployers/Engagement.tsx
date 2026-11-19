import { useState } from 'react'
import iconCheck from '../../assets/icons/for-employers/model-check.svg'
import { MODELS } from './data'
import { Lines } from './ui'

/** FLEXIBLE ENGAGEMENT MODELS, interactive selector (Figma 255:9560). */
export default function Engagement() {
  const [selected, setSelected] = useState<string>(MODELS[0].id)
  const current = MODELS.find((m) => m.id === selected) ?? MODELS[0]
  return (
    <div className="mx-auto flex max-w-[1440px] flex-col gap-10 px-5 sm:px-8 lg:px-12">
      <div className="flex flex-col items-start justify-between gap-4 lg:flex-row lg:items-end">
        <div className="flex max-w-[672px] flex-col gap-1">
          <p className="font-poppins text-[12px] font-semibold uppercase leading-[16px] tracking-[0.6px] text-[red]">SERVICE ARCHITECTURE</p>
          <h2 className="font-poppins text-[26px] font-semibold leading-[36px] tracking-[-0.75px] text-[#191c1e] sm:text-[30px]">Flexible Engagement Models</h2>
          <p className="pt-1 font-poppins text-[14px] leading-[20px] text-[#4b5563]">Tailored structures aligned with your hiring volume, growth trajectory, and budget.</p>
        </div>
        <p aria-live="polite" className="flex shrink-0 items-center gap-2 rounded-full border border-[#e5e7eb] bg-[#f3f4f6] px-[13px] py-[5px] font-poppins text-[12px] leading-[16px] text-[#4b5563]">
          <span aria-hidden="true" className="size-2 rounded-full bg-[red]" />
          <span>
            Active Choice: <strong className="font-bold text-[#111827]">{current.name}</strong>
          </span>
        </p>
      </div>
      <ul className="grid list-none grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {MODELS.map((m) => {
          const on = m.id === selected
          return (
            <li
              key={m.id}
              className={`relative flex min-w-0 flex-col justify-between rounded-[12px] border-2 bg-[#f7f9fb] p-[26px] ${on ? 'border-[red]' : 'border-[#e5e7eb]'}`}
            >
              <div className="flex flex-col gap-1 pb-6">
                <p className="font-poppins text-[11px] font-bold uppercase leading-[16.5px] text-[red]">{m.tier}</p>
                <h3 className="font-poppins text-[18px] font-bold leading-[28px] text-[#111827]">{m.name}</h3>
                <p className="pt-1 font-poppins text-[12px] leading-[19.5px] text-[#6b7280]">
                  <Lines lines={m.blurb} />
                </p>
                <ul className="flex list-none flex-col gap-[7.5px] pt-3">
                  {m.perks.map((p) => (
                    <li key={p} className="flex items-center gap-2 font-poppins text-[12px] leading-[16px] text-[#374151]">
                      <img src={iconCheck} alt="" width={10.867} height={8.017} />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-col gap-2 border-t border-[#e5e7eb] pt-[17px]">
                <p className="font-poppins text-[11px] leading-[16.5px] text-[#9ca3af]">{m.bestFor}</p>
                <button
                  type="button"
                  aria-pressed={on}
                  onClick={() => setSelected(m.id)}
                  className={`w-full cursor-pointer rounded-[8px] font-poppins text-[12px] font-medium leading-[16px] transition ${on ? 'bg-[red] py-[10px] text-white' : 'border border-[#d1d5db] bg-white px-px py-[11px] text-[#1f2937] hover:border-[#111827]'}`}
                >
                  {on ? 'Selected Plan' : m.choose}
                </button>
              </div>
              {on ? (
                <span className="absolute right-4 top-4 rounded-[4px] bg-[red] px-2 py-[2px] font-poppins text-[10px] font-bold uppercase leading-[15px] text-white">ACTIVE CHOICE</span>
              ) : null}
            </li>
          )
        })}
      </ul>
    </div>
  )
}
