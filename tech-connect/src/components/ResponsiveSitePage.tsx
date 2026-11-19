import type { ComponentType } from 'react'
import Navbar from './layout/Navbar'
import type { NavbarVariant } from './layout/navbarVariants'
import { useViewport } from '../hooks/useViewport'

interface Props {
  Desktop: ComponentType
  Mobile: ComponentType
  /** Page-specific desktop layout of the shared Navbar. */
  navbar: NavbarVariant
}

/** >= 1024px: exact 1440px design (scaled between 1024 and 1380px). < 1024px: single-column reflow. The shared Navbar sits above both. */
export default function ResponsiveSitePage({ Desktop, Mobile, navbar }: Props) {
  const { isDesktop } = useViewport()
  return (
    <div className="font-poppins">
      <Navbar variant={navbar} />
      <main>{isDesktop ? <Desktop /> : <Mobile />}</main>
    </div>
  )
}
