import HowWeWorkEnquiryForm from './HowWeWorkEnquiryForm'
import EngagementModels from './EngagementModels'
import FaqAccordion from './FaqAccordion'
import HeroSection from './HeroSection'
import PhaseTimeline from './PhaseTimeline'
import SlaCommitments from './SlaCommitments'

/** GENERATED mobile/tablet reflow of Drive PDF "05_How_to_work_(2).pdf": same text, photos and links in a single column. */
export default function HowWeWorkMobile() {
  return (
    <>
      <section id="hw-m1" className="bg-[#000000]">
        <div className="mx-auto max-w-[760px] px-5 py-10 sm:px-8 sm:py-14">
          <HeroSection />
        </div>
      </section>
      <section id="hw-m2" className="bg-[#ffffff]">
        <div className="mx-auto flex max-w-[760px] flex-col gap-4 px-5 py-10 sm:px-8 sm:py-14">
          <p className="font-poppins font-semibold text-[11px] leading-[1.5] tracking-[0.66px] text-[#ff0000]">DEFINITIVE PERFORMANCE</p>
          <h2 className="font-poppins font-bold text-[22px] leading-[1.25] sm:text-[28px] text-[#191c1e]">Recruitment Commitments & SLAs</h2>
          <p className="font-poppins font-normal text-[14px] leading-[1.55] text-[#565e74]">Predictable, guaranteed talent delivery benchmarked against binding service levels.</p>
          <SlaCommitments fluid />
          <PhaseTimeline />
          <EngagementModels />
          <FaqAccordion />
        </div>
      </section>
      <section id="hw-m3" className="bg-[#000000]">
        <div className="mx-auto flex max-w-[760px] flex-col gap-4 px-5 py-10 sm:px-8 sm:py-14">
          <p className="font-poppins font-semibold text-[11px] leading-[1.5] tracking-[1.22px] text-[#f87171]">NEXT STEP</p>
          <h2 className="font-poppins font-bold text-[22px] leading-[1.25] sm:text-[28px] text-[#ffffff]">Accelerate Your Engineering Roadmap</h2>
          <p className="font-poppins font-normal text-[14px] leading-[1.55] text-[#d1d5db]">Speak directly with an Industry Practice Lead to review open roles, set custom SLAs, and get curated candidate shortlists within 72 hours.</p>
          <p className="font-poppins font-normal text-[11px] leading-[1.5] tracking-[-0.09px] text-[#b8bbc1]">72-Hour First Shortlist</p>
          <p className="font-poppins font-normal text-[11px] leading-[1.5] text-[#b8bbc1]">90-Day Placement Warranty</p>
          <p className="font-poppins font-normal text-[11px] leading-[1.5] text-[#d1d5db]">NDA Protected</p>
          <HowWeWorkEnquiryForm fluid />
        </div>
      </section>
      <section id="hw-m4" className="bg-[#111315]">
        <div className="mx-auto flex max-w-[760px] flex-col gap-4 px-5 py-10 sm:px-8 sm:py-14">
          <p className="font-poppins font-semibold text-[11px] leading-[1.5] tracking-[0.65px] text-[#ffffff]">CANDIDATE HUB</p>
          <p className="font-poppins font-normal text-[11px] leading-[1.5] tracking-[-0.06px] text-[#9ca3af]">Explore All Jobs Tech Salary Calculator Candidate Verification Career Advisory Interview Preparation</p>
          <p className="font-poppins font-normal text-[11px] leading-[1.5] tracking-[-0.27px] text-[#9ca3af]">The authoritative enterprise recruitment ecosystem orchestrating high-velocity placements between top tech innovators and market leaders.</p>
          <p className="font-poppins font-normal text-[11px] leading-[1.5] text-[#6b7280]">© 2026 TechzConnect Enterprise Recruitment Inc. All rights reserved.</p>
          <p className="font-poppins font-semibold text-[11px] leading-[1.5] tracking-[0.64px] text-[#ffffff]">FOR EMPLOYERS</p>
          <p className="font-poppins font-semibold text-[11px] leading-[1.5] tracking-[0.63px] text-[#ffffff]">RESOURCES</p>
          <p className="font-poppins font-normal text-[11px] leading-[1.5] text-[#9ca3af]">Executive Headhunting Dedicated Talent Teams Recruitment Process Outsourcing Contract & Direct Hire Client Portal Access</p>
          <p className="font-poppins font-normal text-[11px] leading-[1.5] tracking-[-0.08px] text-[#9ca3af]">Market Insights & Trends Hiring Benchmark Index Technical Assessment Guides Whitepapers & Reports Customer Case Studies</p>
          <p className="font-poppins font-normal text-[11px] leading-[1.5] text-[#6b7280]"><span className="text-[#6b7280]">Privacy Policy</span> <span className="text-[#6b7280]">Terms of Service</span> <span className="text-[#6b7280]">Security & Compliance</span> <span className="text-[#6b7280]">Cookie Preferences</span></p>
          <p className="font-poppins font-semibold text-[11px] leading-[1.5] tracking-[0.65px] text-[#ffffff]">COMPANY</p>
          <p className="font-poppins font-normal text-[11px] leading-[1.5] tracking-[-0.05px] text-[#9ca3af]">About TechzConnect How We Work Global Industries Leadership & Governance Contact Relations</p>
        </div>
      </section>
    </>
  )
}
