import ResponsiveSitePage from '../../components/ResponsiveSitePage'
import Desktop from './Desktop'
import Mobile from './Mobile'

export default function Resources() {
  return <ResponsiveSitePage navbar="standard" Desktop={Desktop} Mobile={Mobile} />
}
