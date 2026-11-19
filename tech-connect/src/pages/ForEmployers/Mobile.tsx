import Calculator from './Calculator'
import Engagement from './Engagement'
import { hasCta, hasFaq } from './data'
import { CtaStrip, Faq } from './FaqCta'
import Footer from './Footer'
import Framework from './Framework'
import Hero from './Hero'
import RequisitionForm from './RequisitionForm'
import SocialProof from './SocialProof'

/** Single-column reflow (< 1024px) of the same sections, content and links as the 1440px design. */
export default function ForEmployersMobile() {
  return (
    <>
      <section id="fe-hero" className="bg-black">
        <Hero />
      </section>
      <section id="fe-trust" className="bg-white">
        <SocialProof />
      </section>
      <section id="fe-framework" className="bg-[#f7f9fb]">
        <Framework />
      </section>
      <section id="fe-requisition" className="border-y border-[#e5e7eb] bg-white px-0 py-10 sm:py-14">
        <div className="mx-auto max-w-[760px] px-5 sm:px-8">
          <RequisitionForm />
        </div>
      </section>
      <section id="calculator" className="bg-[#f7f9fb] py-12 sm:py-16">
        <Calculator />
      </section>
      <section id="fe-models" className="border-b border-[#e5e7eb] bg-white py-12 sm:py-16">
        <Engagement />
      </section>
      {hasFaq ? (
        <section id="fe-faq" className="bg-[#f7f9fb] py-12 sm:py-16">
          <Faq />
        </section>
      ) : null}
      {hasCta ? (
        <section id="fe-cta" className="bg-[red] py-10">
          <CtaStrip />
        </section>
      ) : null}
      <Footer />
    </>
  )
}
