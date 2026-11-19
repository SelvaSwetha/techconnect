import ResponsiveSitePage from '../../components/ResponsiveSitePage'
import Desktop from './Desktop'
import Mobile from './Mobile'

export default function HowWeWork() {
  return <ResponsiveSitePage navbar="how-we-work" Desktop={Desktop} Mobile={Mobile} />
}
