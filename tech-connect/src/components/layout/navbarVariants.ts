/**
 * Page-specific desktop layouts of the ONE shared Navbar.
 *
 * The Figma desktop headers differ slightly from page to page (bar height, nav x-positions, font size, CTA label and
 * box), so each page picks a variant here. Everything is in the 1440px Figma canvas space and scales with the page.
 * `lefts` are the x of the 8 nav items in NAV_ITEMS order. Labels/routes live in src/navigation.ts, not here.
 */
export interface NavbarSpec {
  height: number
  /** 1px rule drawn at the bottom of the bar */
  border?: { top: number; color: string }
  logo: { left: number; top: number }
  tagline?: { left: number; top: number }
  nav: { top: number; fontSize: 12 | 13; lefts: readonly number[] }
  /** nav labels that the Figma frame draws semibold even when they are not the active page */
  semiboldInactive?: readonly string[]
  cta: { label: string; left: number; top: number; width: number; height: number; fontSize: 12 | 13 }
}

const standard: NavbarSpec = {
  height: 92,
  logo: { left: 78, top: 27 },
  nav: { top: 37.4, fontSize: 13, lefts: [550, 619, 709, 805, 925, 1047, 1109, 1207] },
  cta: { label: 'Hire Talent', left: 1277, top: 22, width: 115, height: 48, fontSize: 13 },
}

const solutionDetail: NavbarSpec = {
  height: 90,
  logo: { left: 74, top: 12 },
  tagline: { left: 74, top: 50.5 },
  nav: { top: 37.4, fontSize: 12, lefts: [556.1, 624.1, 711.5, 802.8, 917.4, 1034.1, 1095.1, 1189.6] },
  cta: { label: 'Discuss Hiring', left: 1260, top: 21, width: 124, height: 46, fontSize: 12 },
}

export const NAVBAR_VARIANTS = {
  /** Homepage — Figma 202:4483 */
  home: {
    height: 92,
    border: { top: 91, color: '#e0e0e0' },
    logo: { left: 73, top: 20 },
    tagline: { left: 78, top: 62 },
    nav: { top: 39, fontSize: 13, lefts: [440, 523, 627, 735, 868, 1003, 1080, 1192] },
    cta: { label: 'Hire Talent', left: 1280, top: 23, width: 112, height: 46, fontSize: 13 },
  },
  /** Solutions overview */
  solutions: {
    height: 90,
    logo: { left: 74, top: 12 },
    tagline: { left: 74, top: 52 },
    nav: { top: 36, fontSize: 13, lefts: [519, 590, 682, 778, 900, 1023, 1087, 1186] },
    cta: { label: 'Discuss Hiring', left: 1260, top: 21, width: 124, height: 46, fontSize: 13 },
  },
  /** Industries */
  standard,
  /** For Employers — Figma 257:10945 draws the same bar as Industries */
  'for-employers': standard,
  jobs: { ...standard, semiboldInactive: ['Industries'] },
  'how-we-work': {
    ...standard,
    height: 91,
    border: { top: 90, color: '#e0e0e0' },
    logo: { left: 78, top: 26.5 },
    nav: { ...standard.nav, top: 36.8 },
    cta: { ...standard.cta, top: 21.4 },
    semiboldInactive: ['Industries'],
  },
  'employer-enquiry': {
    height: 90,
    logo: { left: 80, top: 16.5 },
    tagline: { left: 80, top: 60 },
    nav: { top: 36.4, fontSize: 12, lefts: [534.1, 602.1, 689.5, 780.8, 895.4, 1012.1, 1073.1, 1167.6] },
    cta: { label: 'Discuss Hiring', left: 1238, top: 24.5, width: 122, height: 41, fontSize: 12 },
  },
  'solution-permanent': {
    height: 90,
    border: { top: 89, color: '#dedede' },
    logo: { left: 74, top: 16 },
    tagline: { left: 74, top: 61.5 },
    nav: { top: 33.4, fontSize: 12, lefts: [532.1, 600.1, 687.5, 778.8, 893.4, 1010.1, 1071.1, 1165.6] },
    cta: { label: 'Discuss Hiring', left: 1236, top: 20, width: 124, height: 41, fontSize: 12 },
  },
  'solution-it': solutionDetail,
  'solution-hr': { ...solutionDetail, height: 91 },
  'solution-executive': {
    ...solutionDetail,
    height: 78,
    logo: { left: 74, top: 0 },
    tagline: { left: 74, top: 38.5 },
    nav: { ...solutionDetail.nav, top: 25.4 },
    cta: { ...solutionDetail.cta, top: 9 },
  },
} as const satisfies Record<string, NavbarSpec>

export type NavbarVariant = keyof typeof NAVBAR_VARIANTS
