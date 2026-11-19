import type { ReactNode } from 'react'
import SectionCanvas from '../../components/SectionCanvas'
import Calculator from './Calculator'
import Engagement from './Engagement'
import { hasCta, hasFaq } from './data'
import { CtaStrip, Faq } from './FaqCta'
import Footer from './Footer'
import Framework from './Framework'
import Hero from './Hero'
import RequisitionForm from './RequisitionForm'
import SocialProof from './SocialProof'

/** Content of one band on the 1440px canvas (the section scales as a whole between 1024 and 1440px). */
function Canvas({ className = '', children }: { className?: string; children: ReactNode }) {
  return <div className={`absolute left-0 top-0 w-[1440px] ${className}`}>{children}</div>
}

/** Exact 1440px Figma layout of "For Employers" (frame 258:11037); the shared Navbar is rendered by ResponsiveSitePage. */
export default function ForEmployersDesktop() {
  return (
    <>
      {/* Figma draws the hero from y=80 under the 92px navbar: its first 12px sit behind the bar, so the band is 12px shorter. */}
      <SectionCanvas id="fe-hero" height={669.5} className="bg-black">
        <Canvas className="-top-3">
          <Hero />
        </Canvas>
      </SectionCanvas>
      <SectionCanvas id="fe-trust" height={73} className="bg-white">
        <Canvas>
          <SocialProof />
        </Canvas>
      </SectionCanvas>
      <SectionCanvas id="fe-framework" height={801.75} className="bg-[#f7f9fb]">
        <Canvas className="pt-5">
          <Framework />
        </Canvas>
      </SectionCanvas>
      <SectionCanvas id="fe-requisition" height={1026.5} className="border-y border-[#e5e7eb] bg-white">
        <Canvas className="px-12 pt-[81px]">
          <RequisitionForm />
        </Canvas>
      </SectionCanvas>
      <SectionCanvas id="calculator" height={807.5} className="bg-[#f7f9fb]">
        <Canvas className="pt-20">
          <Calculator />
        </Canvas>
      </SectionCanvas>
      <SectionCanvas id="fe-models" height={655.5} className="border-b border-[#e5e7eb] bg-white">
        <Canvas className="pt-20">
          <Engagement />
        </Canvas>
      </SectionCanvas>
      {hasFaq ? (
        <SectionCanvas id="fe-faq" height={536} className="bg-[#f7f9fb]">
          <Canvas className="pt-20">
            <Faq />
          </Canvas>
        </SectionCanvas>
      ) : null}
      {hasCta ? (
        <SectionCanvas id="fe-cta" height={156} className="bg-[red]">
          <Canvas className="h-[156px]">
            <CtaStrip />
          </Canvas>
        </SectionCanvas>
      ) : null}
      <SectionCanvas id="fe-footer" height={417.92} className="bg-[#111315]">
        <Canvas>
          <Footer />
        </Canvas>
      </SectionCanvas>
    </>
  )
}
