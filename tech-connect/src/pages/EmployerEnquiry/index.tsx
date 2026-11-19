import ResponsiveSitePage from '../../components/ResponsiveSitePage'
import Desktop from './Desktop'
import Mobile from './Mobile'

export default function EmployerEnquiry() {
  return <ResponsiveSitePage navbar="employer-enquiry" Desktop={Desktop} Mobile={Mobile} />
}
