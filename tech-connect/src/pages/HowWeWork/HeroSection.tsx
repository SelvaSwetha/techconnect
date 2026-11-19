import { Link } from 'react-router-dom'
import { ENQUIRY_ROUTE } from '../../navigation'
import Glyph from './Glyph'
import heroPhoto from './assets/provisional/hw/hw-x114.png'

const FEATURES = [
  { n: '01', title: 'Sector-Specific Understanding', body: 'Deep tech architecture mapping, organizational culture, and vertical intelligence.' },
  { n: '02', title: 'Rigorous Dual-Gate Vetting', body: 'Live code verification paired with cultural and leadership velocity alignment.' },
  { n: '03', title: 'Flexible Support Models', body: 'From single mission-critical leadership hires to dedicated enterprise RPO squads.' },
] as const

/** Anchor of the phase timeline ("Explore 10-Stage Process" scrolls to it). */
export const FRAMEWORK_ANCHOR = 'hiring-framework'

/**
 * How We Work hero: breadcrumb, badge, heading, copy, two CTAs, image with status card, and the three feature columns.
 * One component for desktop and mobile; base styles are the small-screen layout, `lg:` the 1440px desktop layout.
 */
export default function HeroSection() {
  return (
    <div className="font-poppins text-white">
      <nav aria-label="Breadcrumb" className="flex items-center gap-[8px] text-[13px] font-semibold leading-[18.2px]">
        <Link to="/" className="flex items-center gap-[8px] text-[#9ca3af] transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff0000]">
          <Glyph name="home" />
          Home
        </Link>
        <span aria-hidden="true" className="text-[#4b5563]">/</span>
        <span aria-current="page" className="text-white">How We Work</span>
      </nav>

      <div className="mt-[28px] grid items-start gap-10 lg:mt-[35px] lg:grid-cols-[minmax(0,1fr)_468px] lg:gap-0">
        <div className="min-w-0">
          <p className="mt-[2px] inline-flex h-[27px] items-center gap-[8px] rounded-full border border-white/10 bg-white/10 px-[15px] text-[11px] font-bold leading-[15.4px] tracking-[0.47px] text-[#e5e7eb]">
            <span aria-hidden="true" className="size-[8px] rounded-full bg-[#ff0000]" />
            ENGINEERED RECRUITMENT PROTOCOL
          </p>
          <h1 className="mt-[20px] text-[34px] font-bold leading-[1.1] tracking-[-0.025em] text-white sm:text-[44px] lg:text-[48px] lg:leading-[48px]">
            Precision-Driven <br className="hidden lg:block" />
            Recruitment Methodology
          </h1>
          <p className="font-poppins-light mt-[16px] max-w-[580px] text-[15px] leading-[26px] tracking-[-0.13px] text-[#d1d5db] lg:text-[16px]">
            De-risk talent acquisition with our comprehensive 10-stage framework engineered for velocity, technical precision, and zero-compromise retention.
          </p>
          <div className="mt-[32px] flex flex-col gap-4 sm:flex-row">
            <Link
              to={ENQUIRY_ROUTE}
              className="inline-flex h-[48px] items-center justify-center gap-[10px] rounded-[8px] bg-[#ff0000] px-[24px] text-[16px] leading-[22.4px] text-white transition-colors hover:bg-[#e00000] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:min-w-[276px]"
            >
              Discuss Your Requirement
              <Glyph name="arrowWhite" />
            </Link>
            <a
              href={`#${FRAMEWORK_ANCHOR}`}
              className="inline-flex h-[48px] items-center justify-center gap-[10px] rounded-[8px] border border-white/15 bg-white/10 px-[24px] text-[16px] leading-[22.4px] text-white transition-colors hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:min-w-[270px]"
            >
              <Glyph name="explore" />
              Explore 10-Stage Process
            </a>
          </div>
        </div>

        <div className="relative aspect-[468/322] w-full overflow-hidden rounded-[16px] border border-white/10 lg:w-[468px]">
          <img src={heroPhoto} alt="" className="absolute inset-0 size-full object-cover" />
          <div className="absolute inset-x-[12px] bottom-[16%] flex h-[67px] items-center justify-between rounded-[12px] border border-white/15 bg-black/55 px-[16px] backdrop-blur-md">
            <div>
              <p className="text-[10px] font-semibold leading-[14px] tracking-[1.02px] text-[#f87171]">FRAMEWORK STATUS</p>
              <p className="mt-[2px] text-[14px] font-bold leading-[19.6px] tracking-[-0.1px] text-white">Continuous Calibration</p>
            </div>
            <Glyph name="shield" />
          </div>
        </div>
      </div>

      <div className="mt-[40px] h-[2px] bg-white/15 lg:mt-[31px]" />
      <ul className="mt-[32px] grid gap-8 lg:mt-[45px] lg:grid-cols-3 lg:gap-x-[24px]">
        {FEATURES.map((f) => (
          <li key={f.n} className="grid grid-cols-[32px_minmax(0,1fr)] items-start">
            <span className="pt-[2px] text-[14px] font-semibold leading-[19.6px] text-[#ff0000]">{f.n}</span>
            <div>
              <h2 className="text-[16px] font-semibold leading-[22.4px] text-white">{f.title}</h2>
              <p className="mt-[4px] text-[12px] leading-[16px] text-[#9ca3af]">{f.body}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
