import { Link } from 'react-router-dom'
import logo from '../../assets/logos/TechzConnectFooterMarkOnDark.svg'
import social1 from '../../assets/icons/for-employers/footer-social-1.svg'
import social2 from '../../assets/icons/for-employers/footer-social-2.svg'
import social3 from '../../assets/icons/for-employers/footer-social-3.svg'
import { FOOTER } from '../ForEmployers/data'

/** Routes that exist for footer labels; everything else is plain text until its page exists. */
const ROUTES: Record<string, string> = {
  'Explore All Jobs': '/jobs',
  'How We Work': '/how-we-work',
  'Global Industries': '/industries',
  'About TechzConnect': '/about',
}
const SOCIAL = [
  { src: social1, label: 'Share' },
  { src: social2, label: 'Network' },
  { src: social3, label: 'Feed' },
]

/** Footer of the About frame: identical content and geometry to the other pages' footer (same copy, columns and legal row). */
export default function Footer() {
  return (
    <footer className="bg-[#111315]">
      <div className="mx-auto max-w-[1440px] px-5 pb-8 pt-12 sm:px-8 lg:px-12 lg:pb-12 lg:pt-[65px]">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[236.8px_236.8px_236.8px_236.8px_236.8px] lg:justify-between lg:gap-10">
          <div className="flex flex-col">
            <img src={logo} alt="TechzConnect" width={151.92} height={37.92} />
            <p className="max-w-[236.8px] pt-4 font-poppins text-[12px] leading-[19px] text-[#9ca3af]">{FOOTER.about.map((l, i) => (
                <span key={l}>
                  {i > 0 ? <br className="hidden lg:inline" /> : null}
                  {i > 0 ? <span className="lg:hidden"> </span> : null}
                  {l}
                </span>
              ))}</p>
            <div className="flex gap-3 pt-6">
              {SOCIAL.map((s) => (
                <span key={s.label} role="img" aria-label={s.label} className="block">
                  <img src={s.src} alt="" width={32} height={32} />
                </span>
              ))}
            </div>
          </div>
          {FOOTER.columns.map((c) => (
            <nav key={c.title} aria-label={c.title}>
              <h2 className="font-poppins text-[12px] font-semibold leading-[16px] tracking-[0.6px] text-white">{c.title}</h2>
              <ul className="m-0 flex list-none flex-col gap-[10px] p-0 pt-4">
                {c.links.map((l) => (
                  <li key={l} className="font-poppins text-[12px] leading-[16px] text-[#9ca3af]">
                    {ROUTES[l] ? (
                      <Link to={ROUTES[l]} className="transition-colors hover:text-white">
                        {l}
                      </Link>
                    ) : (
                      l
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
        <div className="mt-12 flex flex-col justify-between gap-4 border-t border-[#1f2937] pt-8 lg:mt-[48px] lg:flex-row">
          <p className="font-poppins text-[12px] leading-[16px] text-[#6b7280]">© 2026 TechzConnect Enterprise Recruitment Inc. All rights reserved.</p>
          <ul className="m-0 flex list-none flex-wrap gap-x-6 gap-y-2 p-0 font-poppins text-[12px] leading-[16px] text-[#6b7280]">
            {FOOTER.legal.map((l) => (
              <li key={l}>{l}</li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  )
}
