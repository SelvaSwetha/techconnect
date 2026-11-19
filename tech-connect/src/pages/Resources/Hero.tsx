import { Link } from 'react-router-dom'
import iconHome from '../../assets/icons/resources/breadcrumb-home.svg'
import { CATEGORIES, HERO } from './data'
import type { Category } from './data'

/** Black hero (PDF 08_Resources, y 92-492): breadcrumb, eyebrow pill, heading, description. */
export function Hero() {
  return (
    <div className="px-5 pb-12 pt-10 sm:px-8 lg:h-[400px] lg:px-12 lg:pb-0 lg:pt-[66px]">
      <nav aria-label="Breadcrumb" className="flex h-4 items-center gap-2 font-poppins text-[12px] leading-4">
        <Link to="/" className="flex items-center gap-[5px] text-[#6b7280] transition-colors hover:text-white">
          <img src={iconHome} alt="" width={10} height={11.25} />
          Home
        </Link>
        <span aria-hidden="true" className="text-[#6b7280]">/</span>
        <span aria-current="page" className="font-medium text-[red]">
          Resources
        </span>
      </nav>
      <p className="mt-[26px] inline-flex h-[27px] items-center gap-2 rounded-full border border-[#4b4b50] px-[14px] font-poppins text-[11px] font-semibold uppercase leading-4 tracking-[0.55px] text-[#e0e0e0]">
        <span aria-hidden="true" className="size-2 rounded-full bg-[red]" />
        {HERO.eyebrow}
      </p>
      <h1 className="mt-[15px] max-w-[798px] font-poppins text-[34px] font-semibold leading-[1.1] tracking-[-0.96px] text-white sm:text-[44px] lg:text-[48px] lg:leading-[48px]">{HERO.title}</h1>
      <p className="mt-4 max-w-[690px] font-poppins text-[16px] leading-[26px] text-[#e0e0e0] lg:text-[18px] lg:leading-[28px]">{HERO.description}</p>
    </div>
  )
}

interface FilterProps {
  category: Category
  onCategory: (c: Category) => void
}

/** Category filter bar under the hero (PDF y 492-553): pills + "updated weekly" note. */
export function FilterBar({ category, onCategory }: FilterProps) {
  return (
    <div className="px-5 py-3 sm:px-8 lg:flex lg:h-[61.5px] lg:items-center lg:px-12 lg:py-0">
      <div role="group" aria-label="Filter resources by category" className="flex flex-wrap items-center gap-[9px] lg:flex-nowrap lg:gap-[9px]">
        {CATEGORIES.map((c) => {
          const active = c === category
          return (
            <button
              key={c}
              type="button"
              aria-pressed={active}
              onClick={() => onCategory(c)}
              className={`h-[34px] whitespace-nowrap rounded-[8px] px-4 font-poppins text-[12px] leading-4 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[red] ${
                active ? 'bg-[red] font-semibold text-white' : 'bg-[#f2f4f6] font-medium text-[#4b5462] hover:bg-[#e5e7eb] hover:text-[#111826]'
              }`}
            >
              {c}
            </button>
          )
        })}
        <p className="ml-0 flex items-center gap-2 pl-1 font-poppins text-[12px] leading-4 text-[#6b7280] lg:ml-[7px] lg:whitespace-nowrap">
          <span aria-hidden="true" className="size-2 rounded-full bg-[red]" />
          {HERO.updated}
        </p>
      </div>
    </div>
  )
}
