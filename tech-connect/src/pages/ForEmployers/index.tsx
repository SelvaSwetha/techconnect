import ResponsiveSitePage from '../../components/ResponsiveSitePage'
import Desktop from './Desktop'
import Mobile from './Mobile'

export default function ForEmployers() {
  return <ResponsiveSitePage navbar="for-employers" Desktop={Desktop} Mobile={Mobile} />
}
