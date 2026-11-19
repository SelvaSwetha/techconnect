import ResponsiveSitePage from '../../components/ResponsiveSitePage'
import Desktop from './Desktop'
import Mobile from './Mobile'

export default function Industries() {
  return <ResponsiveSitePage navbar="standard" Desktop={Desktop} Mobile={Mobile} />
}
