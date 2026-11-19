import ResponsivePage from '../components/ResponsivePage'
import Desktop from './Desktop'
import Mobile from './Mobile'

export default function PermanentRecruitment() {
  return <ResponsivePage navbar="solution-permanent" Desktop={Desktop} Mobile={Mobile} />
}
