import ResponsivePage from '../components/ResponsivePage'
import Desktop from './Desktop'
import Mobile from './Mobile'

export default function ExecutiveSearch() {
  return <ResponsivePage navbar="solution-executive" Desktop={Desktop} Mobile={Mobile} />
}
