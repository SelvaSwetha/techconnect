import { TRUSTED_BY } from './data'

/** SOCIAL PROOF STRIP (Figma 255:9071). */
export default function SocialProof() {
  return (
    <div className="border-b border-[#e5e7eb] bg-white pb-[25px] pt-6">
      <div className="mx-auto flex max-w-[1440px] flex-col items-start justify-between gap-4 px-5 sm:px-8 lg:h-6 lg:flex-row lg:items-center lg:px-12">
        <p className="font-poppins text-[12px] font-semibold uppercase leading-[16px] tracking-[0.6px] text-[#6b7280]">TRUSTED BY ENGINEERING LEADERS AT:</p>
        <ul className="flex flex-wrap items-center gap-x-8 gap-y-2 opacity-75 lg:gap-12">
          {TRUSTED_BY.map((b) => (
            <li key={b.lead} className="font-poppins text-[16px] font-bold leading-[24px] text-[#111827]" style={{ letterSpacing: b.tracking }}>
              {b.lead}
              {b.accent ? <span style={{ color: b.accentColor }}>{b.accent}</span> : null}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
