import ResponsiveSitePage from '../../components/ResponsiveSitePage'
import { JobsProvider } from './JobsContext'
import Desktop from './Desktop'
import Mobile from './Mobile'

export default function Jobs() {
  return (
    <JobsProvider>
      <ResponsiveSitePage navbar="jobs" Desktop={Desktop} Mobile={Mobile} />
    </JobsProvider>
  )
}
