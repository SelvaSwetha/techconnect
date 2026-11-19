import { Link } from 'react-router-dom'
import logo from '../../../assets/logos/TechzConnectOfficialLogoVectorTrace.svg'
import { SERVICES } from '../data'

export default function SolutionsFooter() {
  return (
    <footer className="w-full border-t-[3px] border-[red] bg-black">
      <div className="relative mx-auto h-[207px] w-[1440px] max-w-full">
        <Link to="/" aria-label="TechzConnect home" className="absolute left-[78px] top-[33px] block">
          <img loading="lazy" decoding="async" src={logo} alt="TechzConnect" width={152} height={38} />
        </Link>
        <p className="absolute left-[78px] top-[78px] font-poppins text-[13px] text-[#b8b8b8]">Talent. Teams. Growth.</p>
        <ul className="absolute left-[500px] top-[56px] flex font-poppins text-[13px] text-[#b8b8b8]">
          {SERVICES.map((s, i) => (
            <li key={s.slug} className="flex">
              {i > 0 && (
                <span aria-hidden="true" className="px-[7px]">
                  ·
                </span>
              )}
              {s.path ? (
                <Link to={s.path} className="transition-colors hover:text-white">
                  {s.footerLabel}
                </Link>
              ) : (
                <span>{s.footerLabel}</span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </footer>
  )
}
