import { useEffect, useRef, useState } from 'react'
import type { CSSProperties, MouseEvent } from 'react'
import { Link, useLocation } from 'react-router-dom'
import logo from '../../assets/logos/TechzConnectOfficialLogoVectorTrace.svg'
import { useViewport } from '../../hooks/useViewport'
import { ENQUIRY_ROUTE, NAV_ITEMS, activeNavLabel } from '../../navigation'
import type { NavItem } from '../../navigation'
import SectionCanvas from '../SectionCanvas'
import { NAVBAR_VARIANTS } from './navbarVariants'
import type { NavbarSpec, NavbarVariant } from './navbarVariants'

const MOBILE_MENU_ID = 'site-mobile-menu'
const inert = (e: MouseEvent) => e.preventDefault()

interface Props {
  /** Page-specific desktop layout (Figma positions differ slightly per page). Labels and routes are identical everywhere. */
  variant: NavbarVariant
}

/**
 * THE site navbar. One component for every page: the Figma 1440px bar at >= 1024px (scaled like the page canvas),
 * a sticky bar with a hamburger menu below that. Labels / routes / active state come from src/navigation.ts.
 */
export default function Navbar({ variant }: Props) {
  const { isDesktop } = useViewport()
  const { pathname } = useLocation()
  const active = activeNavLabel(pathname)
  const spec: NavbarSpec = NAVBAR_VARIANTS[variant]
  return isDesktop ? <DesktopBar spec={spec} active={active} /> : <MobileBar spec={spec} active={active} />
}

interface BarProps {
  spec: NavbarSpec
  active: string | undefined
}

function DesktopBar({ spec, active }: BarProps) {
  const { height, border, logo: logoPos, tagline, nav, cta } = spec
  return (
    <header>
      <SectionCanvas id="site-header" height={height} className="bg-white">
        {border && <div className="absolute left-0 h-px w-[1440px]" style={{ top: border.top, background: border.color }} />}
        <Link to="/" aria-label="TechzConnect home" className="absolute block" style={{ left: logoPos.left, top: logoPos.top, width: 152, height: 38 }}>
          <img src={logo} alt="TechzConnect" className="block size-full max-w-none" />
        </Link>
        {tagline && (
          <p className="absolute whitespace-nowrap font-poppins text-[9px] font-medium leading-[12.6px] text-[#5e6166]" style={{ left: tagline.left, top: tagline.top }}>
            TALENT. TEAMS. GROWTH.
          </p>
        )}
        <nav aria-label="Main" className="absolute inset-0 pointer-events-none">
          {NAV_ITEMS.map((item, i) => {
            const isActive = item.label === active
            const bold = isActive || spec.semiboldInactive?.includes(item.label)
            const cls = `absolute pointer-events-auto whitespace-nowrap font-poppins transition-colors hover:text-[red] ${
              bold ? 'font-semibold' : 'font-medium'
            } ${isActive ? 'text-[red]' : 'text-[#0f0f12]'}`
            const style = {
              left: nav.lefts[i],
              top: nav.top,
              fontSize: nav.fontSize,
              lineHeight: nav.fontSize === 13 ? '18.2px' : '16.8px',
            }
            return <NavLink key={item.label} item={item} isActive={isActive} className={cls} style={style} />
          })}
        </nav>
        <Link
          to={ENQUIRY_ROUTE}
          className="absolute flex items-center justify-center rounded-[7px] bg-[red] font-poppins font-semibold text-white transition duration-200 hover:brightness-110"
          style={{ left: cta.left, top: cta.top, width: cta.width, height: cta.height, fontSize: cta.fontSize }}
        >
          {cta.label}
        </Link>
      </SectionCanvas>
    </header>
  )
}

function NavLink({ item, isActive, className, style, onNavigate }: {
  item: NavItem
  isActive: boolean
  className: string
  style?: CSSProperties
  onNavigate?: () => void
}) {
  if (!item.to) {
    return (
      <a href="#" className={className} style={style} onClick={(e) => { inert(e); onNavigate?.() }}>
        {item.label}
      </a>
    )
  }
  return (
    <Link to={item.to} className={className} style={style} aria-current={isActive ? 'page' : undefined} onClick={onNavigate}>
      {item.label}
    </Link>
  )
}

/** Below 1024px (no Figma frame exists): sticky bar + hamburger menu, same items in the same order. */
function MobileBar({ spec, active }: BarProps) {
  // The menu is open only for the route it was opened on, so any navigation (links, back/forward) closes it without an effect.
  const [openPath, setOpenPath] = useState<string | null>(null)
  const { pathname } = useLocation()
  const open = openPath === pathname
  const setOpen = (v: boolean) => setOpenPath(v ? pathname : null)
  const button = useRef<HTMLButtonElement>(null)
  const close = () => setOpen(false)

  // While open: Escape closes (focus returns to the button) and the page behind does not scroll.
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpenPath(null)
        button.current?.focus()
      }
    }
    const prevOverflow = document.documentElement.style.overflow
    document.documentElement.style.overflow = 'hidden'
    document.addEventListener('keydown', onKey)
    return () => {
      document.documentElement.style.overflow = prevOverflow
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  const bar = 'block h-[2px] w-6 bg-[#0f0f12] transition'
  return (
    <header className="sticky top-0 z-30 border-b border-[#e0e0e0] bg-white">
      <div className="mx-auto flex h-[64px] max-w-[1100px] items-center justify-between px-5 sm:px-8">
        <Link to="/" aria-label="TechzConnect home" onClick={close}>
          <img src={logo} alt="TechzConnect" width={132} height={33} />
        </Link>
        <button
          ref={button}
          type="button"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls={MOBILE_MENU_ID}
          onClick={() => setOpen(!open)}
          className="flex h-10 w-10 flex-col items-center justify-center gap-[5px]"
        >
          <span className={`${bar} ${open ? 'translate-y-[7px] rotate-45' : ''}`} />
          <span className={`${bar} ${open ? 'opacity-0' : ''}`} />
          <span className={`${bar} ${open ? '-translate-y-[7px] -rotate-45' : ''}`} />
        </button>
      </div>
      {open && (
        <nav id={MOBILE_MENU_ID} aria-label="Main" className="mx-auto max-h-[calc(100dvh-64px)] max-w-[1100px] overflow-y-auto px-5 pb-5 sm:px-8">
          {NAV_ITEMS.map((item) => {
            const isActive = item.label === active
            const cls = `block border-b border-[#e0e0e0] py-3 font-poppins text-[14px] hover:text-[red] ${
              isActive ? 'font-semibold text-[red]' : 'font-medium text-[#0f0f12]'
            }`
            return <NavLink key={item.label} item={item} isActive={isActive} className={cls} onNavigate={close} />
          })}
          <Link
            to={ENQUIRY_ROUTE}
            onClick={close}
            className="mt-4 flex h-[46px] items-center justify-center rounded-[7px] bg-[red] font-poppins text-[13px] font-semibold text-white transition hover:brightness-110"
          >
            {spec.cta.label}
          </Link>
        </nav>
      )}
    </header>
  )
}
