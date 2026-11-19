import ResponsivePage from '../components/ResponsivePage'
import Desktop from './Desktop'
import Mobile from './Mobile'

export default function ITTechnical() {
  return <ResponsivePage navbar="solution-it" Desktop={Desktop} Mobile={Mobile} />
}
