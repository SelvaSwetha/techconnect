import { Link } from 'react-router-dom'
import iconCalendar from '../../assets/icons/for-employers/hero-calendar.svg'
import iconArrow from '../../assets/icons/resources/arrow-right-white.svg'
import { ENQUIRY_ROUTE, FOR_EMPLOYERS_ROUTE } from '../../navigation'
import { ADVISORY } from './data'

/** Black enterprise-advisory banner (PDF x 176-1520, y 3580-3892): copy + CTAs left, round portrait right. */
export default function Advisory() {
  return (
    <div className="flex flex-col gap-8 overflow-hidden rounded-[24px] bg-black p-6 sm:p-12 lg:h-[312px] lg:py-0 lg:pr-0 lg:flex-row lg:items-center lg:justify-between lg:gap-0">
      <div className="lg:w-[848px] lg:shrink-0">
        <p className="m-0 font-poppins text-[12px] font-medium uppercase leading-4 tracking-[1.2px] text-[#f87070]">{ADVISORY.eyebrow}</p>
        <h2 className="m-0 mt-[10px] max-w-[680px] font-poppins text-[24px] font-semibold leading-[1.2] text-white sm:text-[30px] lg:leading-[36px]">{ADVISORY.title}</h2>
        <p className="m-0 mt-[10px] max-w-[670px] font-poppins text-[14px] leading-[21px] text-[#d1d5db]">{ADVISORY.description}</p>
        <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-4">
          <Link
            to={ENQUIRY_ROUTE}
            className="flex h-9 items-center gap-2 rounded-[8px] bg-[red] px-6 font-poppins text-[12px] font-semibold text-white transition hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            {ADVISORY.primary}
            <img src={iconCalendar} alt="" width={12} height={13.33} />
          </Link>
          <Link
            to={FOR_EMPLOYERS_ROUTE}
            className="flex h-9 items-center gap-2 font-poppins text-[12px] font-semibold text-white transition-opacity hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            {ADVISORY.secondary}
            <img src={iconArrow} alt="" width={10.67} height={10.67} />
          </Link>
        </div>
      </div>
      <div className="flex shrink-0 justify-center lg:w-[448px] lg:justify-end lg:pr-12">
        <img src={ADVISORY.photo} alt={ADVISORY.photoAlt} width={232} height={232} className="size-[232px] rounded-full border-[3px] border-white/80 object-cover object-[55%_center]" />
      </div>
    </div>
  )
}
