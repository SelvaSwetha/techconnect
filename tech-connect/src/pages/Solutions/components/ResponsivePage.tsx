import type { ComponentType } from 'react'
import Navbar from '../../../components/layout/Navbar'
import type { NavbarVariant } from '../../../components/layout/navbarVariants'
import { useViewport } from '../../../hooks/useViewport'
import { SolutionsMobileShell } from './SolutionsMobileChrome'

interface Props {
  Desktop: ComponentType
  Mobile: ComponentType
  /** Page-specific desktop layout of the shared Navbar. */
  navbar: NavbarVariant
}

/**
 * >= 1024px: the exact 1440px design (scaled down between 1024 and 1380px, like the Homepage).
 * < 1024px: single-column reflow with the shared mobile footer. The shared Navbar sits above both.
 */
export default function ResponsivePage({ Desktop, Mobile, navbar }: Props) {
  const { isDesktop } = useViewport()
  return (
    <div className="font-poppins">
      <Navbar variant={navbar} />
      {isDesktop ? (
        <main>
          <Desktop />
        </main>
      ) : (
        <SolutionsMobileShell>
          <Mobile />
        </SolutionsMobileShell>
      )}
    </div>
  )
}
