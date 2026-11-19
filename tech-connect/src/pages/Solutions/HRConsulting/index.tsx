import ResponsivePage from '../components/ResponsivePage'
import Desktop from './Desktop'
import Mobile from './Mobile'

export default function HRConsulting() {
  return <ResponsivePage navbar="solution-hr" Desktop={Desktop} Mobile={Mobile} />
}
