import { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './pages/Home/HomePage'
import ScrollManager from './components/ScrollManager'
import MobileReveal from './components/MobileReveal'
import RouteErrorBoundary from './components/RouteErrorBoundary'
import RouteFallback from './components/RouteFallback'

// Route-level code splitting: every page except the entry (Homepage) is its own chunk.
const SolutionsOverview = lazy(() => import('./pages/Solutions/SolutionsOverview'))
const PermanentRecruitment = lazy(() => import('./pages/Solutions/PermanentRecruitment'))
const HRConsulting = lazy(() => import('./pages/Solutions/HRConsulting'))
const ExecutiveSearch = lazy(() => import('./pages/Solutions/ExecutiveSearch'))
const ITTechnical = lazy(() => import('./pages/Solutions/ITTechnical'))
const Industries = lazy(() => import('./pages/Industries'))
const HowWeWork = lazy(() => import('./pages/HowWeWork'))
const EmployerEnquiry = lazy(() => import('./pages/EmployerEnquiry'))
const Jobs = lazy(() => import('./pages/Jobs'))
const ForEmployers = lazy(() => import('./pages/ForEmployers'))
const Resources = lazy(() => import('./pages/Resources'))
const About = lazy(() => import('./pages/About'))

export default function App() {
  return (
    <BrowserRouter>
      <ScrollManager />
      <MobileReveal />
      <RouteErrorBoundary>
        <Suspense fallback={<RouteFallback />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/solutions" element={<SolutionsOverview />} />
            <Route path="/solutions/permanent-recruitment" element={<PermanentRecruitment />} />
            <Route path="/solutions/hr-consulting" element={<HRConsulting />} />
            <Route path="/solutions/executive-search" element={<ExecutiveSearch />} />
            <Route path="/solutions/it-technical-recruitment" element={<ITTechnical />} />
            <Route path="/industries" element={<Industries />} />
            <Route path="/how-we-work" element={<HowWeWork />} />
            <Route path="/employer-enquiry" element={<EmployerEnquiry />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/for-employers" element={<ForEmployers />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/about" element={<About />} />
            {/* Unknown paths fall back to the Homepage (no dedicated 404 design exists). */}
            <Route path="*" element={<HomePage />} />
          </Routes>
        </Suspense>
      </RouteErrorBoundary>
    </BrowserRouter>
  )
}
