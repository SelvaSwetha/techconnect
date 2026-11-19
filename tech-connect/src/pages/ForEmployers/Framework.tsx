import { useState } from 'react'
import visualCard from '../../assets/images/for-employers/framework-visual-card.png'
import iconNext from '../../assets/icons/for-employers/step-next.svg'
import { STEPS } from './data'
import { Lines } from './ui'

/** 4-STEP FRAMEWORK (Figma 255:9086 / 257:10414). Steps are focusable cards: hover, focus or click highlights one. */
export default function Framework() {
  const [active, setActive] = useState<number | null>(null)
  return (
    <div className="mx-auto max-w-[1280px] px-5 py-12 sm:px-8 lg:mx-0 lg:px-12 lg:py-[70.75px]">
      <div className="flex flex-col gap-10 lg:grid lg:h-[620.25px] lg:grid-cols-12 lg:gap-x-8">
        <div className="flex flex-col justify-between gap-8 lg:col-span-4 lg:pr-4">
          <div className="flex flex-col gap-[11.4px] pb-6">
            <p className="font-poppins text-[12px] font-bold uppercase leading-[16px] tracking-[0.6px] text-[red]">VETTED PRECISION PIPELINE</p>
            <h2 className="font-poppins text-[30px] font-bold leading-[47.2px] tracking-[-1px] text-[#0f0f12]">
              A 4-step framework
              <br className="hidden lg:inline" /> engineered for
              <br className="hidden lg:inline" /> zero hiring misfires.
            </h2>
            <p className="max-w-[384px] pb-[8.6px] pt-1 font-poppins text-[13.5px] leading-[21.94px] text-[#4b5563]">
              We eliminate candidate spam by replacing keyword <br className="hidden lg:inline" />
              algorithms with code verification, cognitive <br className="hidden lg:inline" />
              calibration, and culture alignment.
            </p>
            <div aria-hidden="true" className="h-[2.5px] w-10 rounded-full bg-[red]" />
          </div>
          <div className="pt-2">
            <div className="relative h-[220px] overflow-hidden rounded-[16px] border border-[#f3f4f6] bg-[linear-gradient(31.6deg,#f9fafb_0%,#fff_50%,#fef2f2_100%)]">
              <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
                <img src={visualCard} alt="" className="absolute left-[-3.2%] top-[-68.29%] h-[169.68%] w-[260%] max-w-none" />
              </div>
              <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-white/30 via-white/0 to-white/0" />
              <p className="absolute bottom-5 left-6 font-poppins text-[15px] font-semibold leading-[18.75px] text-[#374151]">
                Right
                <br />
                Talent
                <span className="block pt-[3px] text-[16px] font-extrabold leading-[20px] text-[red]">Higher</span>
                <span className="block pt-px text-[16px] font-extrabold leading-[20px] text-[red]">Growth</span>
              </p>
              <div aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-[inherit] shadow-[inset_0px_2px_4px_1px_rgba(0,0,0,0.05)]" />
            </div>
          </div>
        </div>
        <ol className="grid list-none grid-cols-1 gap-y-10 sm:grid-cols-2 lg:col-span-8 lg:flex lg:w-[890px] lg:items-stretch lg:justify-center">
          {STEPS.map((s, i) => {
            const on = active === i
            return (
              <li
                key={s.n}
                tabIndex={0}
                aria-current={on ? 'step' : undefined}
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive((a) => (a === i ? null : a))}
                onFocus={() => setActive(i)}
                onBlur={() => setActive((a) => (a === i ? null : a))}
                onClick={() => setActive(i)}
                className={`relative flex cursor-pointer flex-col justify-between gap-8 px-5 outline-none lg:min-w-px lg:flex-1 lg:gap-0 ${i > 0 ? 'lg:border-l lg:border-[#e5e7eb] lg:pl-[21px]' : ''}`}
              >
                <div className="flex flex-col gap-1">
                  <p className={`font-poppins text-[76px] font-extrabold leading-[76px] tracking-[-2px] transition-colors duration-200 ${on ? 'text-[#ffd5ce]' : 'text-[#ffe2db]'}`}>{s.n}</p>
                  <div className="flex size-14 items-center justify-center rounded-full border border-[#ffd5ce] bg-[#fff1ee] p-px">
                    <img src={s.icon} alt="" width={28} height={28} />
                  </div>
                  <h3 className="pt-4 font-poppins text-[16px] font-bold leading-[22px] text-[#111827]">
                    <Lines lines={s.title} />
                  </h3>
                  <p className="pt-[7px] font-poppins text-[12.5px] leading-[20.31px] text-[#4b5563]">
                    <Lines lines={s.body} />
                  </p>
                </div>
                <div className="pt-4">
                  <div className="flex items-center gap-3 border-t border-dashed border-[#e5e7eb] pt-[25px]">
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#fef2f2]">
                      <img src={s.metricIcon} alt="" width={16} height={16} />
                    </span>
                    <div>
                      <p className="-mb-px font-poppins text-[11px] font-medium leading-[16.5px] text-[#6b7280]">{s.metricLabel}</p>
                      <p className={`font-poppins text-[12.5px] font-bold leading-[18.75px] ${s.metricRed ? 'text-[red]' : 'text-[#111827]'}`}>
                        {s.metric.map((m) => (
                          <span key={m} className="block">
                            {m}
                          </span>
                        ))}
                      </p>
                    </div>
                  </div>
                </div>
                {i < STEPS.length - 1 ? (
                  <span aria-hidden="true" className="absolute right-[-14px] top-[195px] hidden size-7 items-center justify-center rounded-full border border-[#e5e7eb] bg-white p-px lg:flex">
                    <img src={iconNext} alt="" width={14} height={14} />
                  </span>
                ) : null}
              </li>
            )
          })}
        </ol>
      </div>
    </div>
  )
}
