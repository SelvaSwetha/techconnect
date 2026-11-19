import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import logo from '../../../assets/logos/TechzConnectOfficialLogoVectorTrace.svg'
import { SERVICES } from '../data'

export function SolutionsMobileFooter() {
  return (
    <footer className="border-t-[3px] border-[red] bg-black">
      <div className="mx-auto max-w-[760px] px-5 py-10 sm:px-8">
        <Link to="/" aria-label="TechzConnect home">
          <img loading="lazy" decoding="async" src={logo} alt="TechzConnect" width={152} height={38} />
        </Link>
        <p className="mt-3 font-poppins text-[13px] text-[#b8b8b8]">Talent. Teams. Growth.</p>
        <ul className="mt-6 flex flex-wrap gap-x-4 gap-y-2 font-poppins text-[13px] text-[#b8b8b8]">
          {SERVICES.map((s) => (
            <li key={s.slug}>
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

export function SolutionsMobileShell({ children }: { children: ReactNode }) {
  return (
    <div className="font-poppins">
      <main>{children}</main>
      <SolutionsMobileFooter />
    </div>
  )
}
