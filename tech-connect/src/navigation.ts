/**
 * Single source of truth for the main navigation: labels, order and routes.
 * Used by the one shared Navbar (src/components/layout/Navbar.tsx) on every page, desktop and mobile.
 */
export interface NavItem {
  label: string
  /** Route. `undefined` = the page is not implemented yet (the link is rendered inert). */
  to?: string
  /** Pathname prefix(es) that highlight this item; matching is segment-based ("/solutions" matches "/solutions/x", never "/solutionsfoo"). */
  match?: readonly string[]
}

export const ENQUIRY_ROUTE = '/employer-enquiry'
export const FOR_EMPLOYERS_ROUTE = '/for-employers'

export const NAV_ITEMS: readonly NavItem[] = [
  { label: 'Home', to: '/', match: ['/'] },
  { label: 'Solutions', to: '/solutions', match: ['/solutions'] },
  { label: 'Industries', to: '/industries', match: ['/industries'] },
  { label: 'How We Work', to: '/how-we-work', match: ['/how-we-work'] },
  { label: 'For Employers', to: FOR_EMPLOYERS_ROUTE, match: [FOR_EMPLOYERS_ROUTE] },
  { label: 'Jobs', to: '/jobs', match: ['/jobs'] },
  { label: 'Resources', to: '/resources', match: ['/resources'] },
  { label: 'About', to: '/about', match: ['/about'] },
]

function matches(pathname: string, prefix: string): boolean {
  if (prefix === '/') return pathname === '/'
  return pathname === prefix || pathname.startsWith(`${prefix}/`)
}

/** Which nav label is active for a pathname (exact segment match; Solutions detail pages highlight Solutions). */
export function activeNavLabel(pathname: string): string | undefined {
  const path = pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname
  return NAV_ITEMS.find((item) => item.match?.some((prefix) => matches(path, prefix)))?.label
}
