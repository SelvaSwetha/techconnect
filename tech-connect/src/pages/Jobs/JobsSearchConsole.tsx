import { DOMAINS } from './jobsData'
import { useJobs } from './jobsState'
import searchIcon from './assets/icons/search.svg'
import searchWhite from './assets/icons/search-white.svg'
import resetIcon from './assets/icons/reset.svg'

/** Search & filter console (Figma 246:6534). Card 1344 x 156; the search filters the visible job openings. */
export default function JobsSearchConsole({ fluid }: { fluid?: boolean }) {
  const { filters, setFilters } = useJobs()
  return (
    <form
      role="search"
      aria-label="Search job openings"
      onSubmit={(e) => {
        e.preventDefault()
        document.getElementById('jobs-list')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }}
      className={`border border-[#e5e7eb] bg-white shadow-[0px_8px_30px_rgba(0,0,0,0.08)] ${fluid ? 'rounded-[16px] p-4 sm:p-5' : 'h-[156px] w-[1344px] rounded-[16px] px-[24px] pt-[24px]'}`}
    >
      <div className={`flex gap-[12px] ${fluid ? 'flex-col sm:flex-row' : ''}`}>
        <label className="relative block flex-1">
          <span className="sr-only">Job title, skill or keywords</span>
          <img loading="lazy" decoding="async" src={searchIcon} alt="" className="pointer-events-none absolute left-[14px] top-1/2 h-[15px] w-[15px] -translate-y-1/2" />
          <input
            type="search"
            value={filters.query}
            onChange={(e) => setFilters({ ...filters, query: e.target.value })}
            placeholder="Job title, skill or keywords (e.g., Python, React, Engineering Manager, Go)"
            className="h-[47px] w-full rounded-[8px] border border-[#e5e7eb] bg-[#f9fafb] pl-[45px] pr-3 font-poppins text-[14px] text-[#0f172a] outline-none placeholder:text-[#9ca3af] focus:border-[red] focus:bg-white"
          />
        </label>
        <button type="submit" className="flex h-[47px] shrink-0 items-center justify-center gap-[9px] rounded-[8px] bg-[red] px-[24px] font-poppins text-[14px] font-semibold text-white transition hover:brightness-110 sm:w-[157px]">
          <img loading="lazy" decoding="async" src={searchWhite} alt="" className="h-[13.5px] w-[13.5px]" />
          Find Roles
        </button>
      </div>
      <div className={`mt-[16px] flex items-center gap-x-[12px] gap-y-3 border-t border-[#f3f4f6] pt-[14px] ${fluid ? 'flex-wrap' : ''}`}>
        <span className="font-poppins text-[12px] font-semibold tracking-[0.68px] text-[#6b7280]">DOMAIN:</span>
        <div role="group" aria-label="Domain" className={`flex gap-[9px] ${fluid ? 'flex-wrap' : 'ml-[2px]'}`}>
          {DOMAINS.map((d) => {
            const on = filters.domain === d
            return (
              <button
                key={d}
                type="button"
                aria-pressed={on}
                onClick={() => setFilters({ ...filters, domain: d })}
                className={`h-[30px] rounded-[8px] border px-[16px] font-poppins text-[12px] font-medium transition-colors ${on ? 'border-[red] bg-[red] text-white' : 'border-[#e5e7eb] bg-white text-[#374151] hover:border-[red] hover:text-[red]'}`}
              >
                {d}
              </button>
            )
          })}
        </div>
        <div className={`flex items-center gap-[14px] ${fluid ? 'w-full justify-between' : 'ml-auto'}`}>
          <span className="flex items-center gap-[8px] font-poppins text-[12px] font-medium text-[#6b7280]">
            Min Package: <span className="rounded-[4px] bg-[#fef2f2] px-[7px] py-[2px] font-bold text-[red]">₹0 LPA</span>
          </span>
          <button type="button" onClick={() => setFilters({ query: '', domain: 'All Positions' })} className="flex items-center gap-[6px] font-poppins text-[12px] font-medium text-[#6b7280] transition-colors hover:text-[red]">
            <img loading="lazy" decoding="async" src={resetIcon} alt="" className="h-[10.7px] w-[10.7px]" />
            Reset
          </button>
        </div>
      </div>
    </form>
  )
}
