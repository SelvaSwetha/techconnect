import { CASES } from './data'

/**
 * Case-study switcher. The design draws three tabs but only the first case study ("Tier-1 SaaS Platform") has content,
 * so it is the only selectable one; the other two are drawn exactly as designed but stay inert (nothing is invented).
 */
export default function CaseTabs() {
  return (
    <div role="tablist" aria-label="Case studies" className="flex flex-wrap gap-[10px]">
      {CASES.tabs.map((t, i) => (
        <button
          key={t}
          type="button"
          role="tab"
          aria-selected={i === 0}
          aria-disabled={i !== 0 ? true : undefined}
          tabIndex={i === 0 ? 0 : -1}
          className={`h-9 rounded-[4px] px-4 font-poppins text-[12px] font-semibold ${i === 0 ? 'cursor-default bg-[red] text-white' : 'cursor-not-allowed bg-white/10 text-[#d1d5db]'}`}
        >
          {t}
        </button>
      ))}
    </div>
  )
}
