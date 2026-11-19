import iconBadge from '../../assets/icons/resources/flagship-badge.svg'
import iconCheck from '../../assets/icons/resources/check-circle.svg'
import iconEye from '../../assets/icons/resources/eye.svg'
import iconStat from '../../assets/icons/resources/stat-trend.svg'
import avatar from '../../assets/images/resources/rhea-nambiar-avatar.jpeg'
import { FLAGSHIP } from './data'

/** Featured flagship salary-guide card (PDF x 176-1520, y 601-1135). The report file is not provided, so the button is inert. */
export default function Flagship() {
  return (
    <article className="overflow-hidden rounded-[16px] border border-[#e5e7eb] bg-white shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] lg:flex lg:h-[534.5px]">
      <div className="relative h-[320px] sm:h-[400px] lg:h-auto lg:w-[784px] lg:shrink-0">
        <img src={FLAGSHIP.photo} alt="Analysts presenting salary benchmark dashboards on a large wall display" className="absolute inset-0 size-full object-cover" />
        <p className="absolute left-[21px] top-[20px] flex h-[30px] items-center gap-2 rounded-[8px] bg-black/90 px-[15px] font-poppins text-[11px] font-semibold uppercase leading-4 tracking-[0.55px] text-white">
          <img src={iconBadge} alt="" width={16.5} height={15.75} />
          {FLAGSHIP.badge}
        </p>
        <div className="absolute inset-x-3 bottom-3 flex items-center justify-between gap-3 rounded-[16px] bg-white/95 px-4 py-4 shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1)] lg:inset-x-5 lg:bottom-5 lg:h-[72px] lg:py-0">
          <div className="flex items-center gap-3">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-[12px] bg-[#fef2f2]">
              <img src={iconStat} alt="" width={20} height={21} />
            </span>
            <div>
              <p className="font-poppins text-[10px] font-medium uppercase leading-4 tracking-[0.5px] text-[#6b7280] lg:text-[11px]">{FLAGSHIP.cohortLabel}</p>
              <p className="font-poppins text-[13px] font-bold leading-5 text-[#111826] lg:text-[14px]">{FLAGSHIP.cohort}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="font-poppins text-[10px] font-medium uppercase leading-4 tracking-[0.5px] text-[#6b7280] lg:text-[11px]">{FLAGSHIP.coverageLabel}</p>
            <p className="font-poppins text-[11px] font-bold leading-5 text-[#111826] lg:text-[12px]">{FLAGSHIP.coverage}</p>
          </div>
        </div>
      </div>
      <div className="flex min-w-0 flex-1 flex-col p-6 sm:p-10 lg:pt-[36px]">
        <div className="flex flex-wrap items-center gap-x-[10px] gap-y-1 font-poppins text-[12px] leading-4 text-[#6b7280]">
          <span className="rounded-[4px] bg-[#fdf2f2] px-[10px] py-[5px] text-[11px] font-bold tracking-[0.55px] text-[red]">{FLAGSHIP.type}</span>
          <span>{FLAGSHIP.readTime}</span>
          <span aria-hidden="true" className="size-1 rounded-full bg-[#9ca3af]" />
          <span>{FLAGSHIP.updated}</span>
        </div>
        <h2 className="mt-5 max-w-[420px] font-poppins text-[26px] font-semibold leading-[1.2] text-[#111826] sm:text-[30px] lg:leading-[36px]">{FLAGSHIP.title}</h2>
        <p className="mt-5 max-w-[420px] font-poppins text-[14px] leading-[23.5px] text-[#4b5462]">{FLAGSHIP.description}</p>
        <ul className="m-0 mt-6 flex list-none flex-col gap-2 p-0">
          {FLAGSHIP.bullets.map((b) => (
            <li key={b} className="flex max-w-[400px] items-start gap-2 font-poppins text-[12px] leading-4 text-[#364150]">
              <img src={iconCheck} alt="" width={13.33} height={13.33} className="mt-[1px] shrink-0" />
              <span>{b}</span>
            </li>
          ))}
        </ul>
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-[#f3f4f6] pt-6 lg:mt-auto lg:pb-[2px]">
          <div className="flex items-center gap-3">
            <img src={avatar} alt="" width={40} height={40} className="size-10 rounded-full border border-[#f3f4f6] object-cover" />
            <div>
              <p className="font-poppins text-[12px] font-bold leading-4 text-[#111826]">{FLAGSHIP.author}</p>
              <p className="font-poppins text-[11px] leading-4 text-[#6b7280]">{FLAGSHIP.authorRole}</p>
            </div>
          </div>
          {/* no report file was provided with the design: the button is an accessible placeholder, it does not download anything */}
          <button
            type="button"
            title="The report file is not available yet"
            className="flex h-9 items-center gap-2 rounded-[8px] bg-[red] px-5 font-poppins text-[12px] font-semibold text-white shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] transition hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[red]"
          >
            {FLAGSHIP.cta}
            <img src={iconEye} alt="" width={14.67} height={10} />
          </button>
        </div>
      </div>
    </article>
  )
}
