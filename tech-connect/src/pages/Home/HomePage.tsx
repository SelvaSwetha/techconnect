import Navbar from '../../components/layout/Navbar'
import Hero from './desktop/Hero'
import TrustStrip from './desktop/TrustStrip'
import ProblemSection from './desktop/ProblemSection'
import SolutionsSection from './desktop/SolutionsSection'
import IndustriesSection from './desktop/IndustriesSection'
import TalentEngineSection from './desktop/TalentEngineSection'
import RolesSection from './desktop/RolesSection'
import PartnerSection from './desktop/PartnerSection'
import ProofSection from './desktop/ProofSection'
import ProcessSection from './desktop/ProcessSection'
import TestimonialSection from './desktop/TestimonialSection'
import LeadCtaSection from './desktop/LeadCtaSection'
import FaqSection from './desktop/FaqSection'
import Footer from './desktop/Footer'
import ResponsiveHome from './responsive/ResponsiveHome'
import { useViewport } from '../../hooks/useViewport'

export default function HomePage() {
  const { isDesktop } = useViewport()
  // >= 1024px: exact Figma 1440px desktop frame. Below: re-flowed tablet/mobile layout. The shared Navbar sits above both.
  return (
    <div className="font-poppins">
      <Navbar variant="home" />
      <main id="top">
        {isDesktop ? (
          <>
            <Hero />
            <TrustStrip />
            <ProblemSection />
            <SolutionsSection />
            <IndustriesSection />
            <TalentEngineSection />
            <RolesSection />
            <PartnerSection />
            <ProofSection />
            <ProcessSection />
            <TestimonialSection />
            <LeadCtaSection />
            <FaqSection />
            <Footer />
          </>
        ) : (
          <ResponsiveHome />
        )}
      </main>
    </div>
  )
}
