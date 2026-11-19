import ResponsiveSitePage from '../../components/ResponsiveSitePage'
import Desktop from './Desktop'
import Mobile from './Mobile'

/** About (Drive PDF 00_Abouts.pdf; the Figma frame "Jobs" 246:6710 is About). Navbar: same bar as Jobs (Industries drawn semibold). */
export default function About() {
  return <ResponsiveSitePage navbar="jobs" Desktop={Desktop} Mobile={Mobile} />
}
