import { Link } from 'react-router-dom'
import JobsSearchConsole from './JobsSearchConsole'
import JobsList from './JobsList'
import TalentNetworkForm from './TalentNetworkForm'
import logo from '../../assets/logos/TechzConnectOfficialLogoVectorTrace.svg'
import hero from './assets/provisional/jobs/jobs-x60.png'
import stat1 from './assets/icons/stat1.svg'
import stat2 from './assets/icons/stat2.svg'
import stat3 from './assets/icons/stat3.svg'
import stat4 from './assets/icons/stat4.svg'
import step1 from './assets/icons/step1.svg'
import step2 from './assets/icons/step2.svg'
import step3 from './assets/icons/step3.svg'
import step4 from './assets/icons/step4.svg'
import step5 from './assets/icons/step5.svg'
import step6 from './assets/icons/step6.svg'

const STATS = [
  { icon: stat1, value: '500+', label: 'Verified Roles' },
  { icon: stat2, value: '200+', label: 'Hiring Enterprises' },
  { icon: stat3, value: '₹28 LPA', label: 'Average Package' },
  { icon: stat4, value: '14 Days', label: 'Median Offer Speed' },
]
const STEPS = [
  { n: '01', icon: step1, title: 'Resume Submission', body: 'Upload GitHub, portfolio, and confidential resume.' },
  { n: '02', icon: step2, title: 'Profile Verification', body: 'Tech specialists evaluate architectural skills.' },
  { n: '03', icon: step3, title: 'Talent Database', body: 'Curated private graphs visible to hiring CTOs.' },
  { n: '04', icon: step4, title: 'Job Matching', body: 'Direct mutual consent with confirmed salary parity.' },
  { n: '05', icon: step5, title: 'Tech Interview', body: 'Skip early rounds; leap direct to hiring leads.' },
  { n: '06', icon: step6, title: 'Impact Placement', body: 'Negotiations, perks, and career advisory tenure.' },
]
const FOOT: [string, string[]][] = [
  ['CANDIDATE HUB', ['Explore All Jobs', 'Tech Salary Calculator', 'Candidate Verification', 'Career Advisory', 'Interview Preparation']],
  ['FOR EMPLOYERS', ['Executive Headhunting', 'Dedicated Talent Teams', 'Recruitment Process Outsourcing', 'Contract & Direct Hire', 'Client Portal Access']],
  ['RESOURCES', ['Market Insights & Trends', 'Hiring Benchmark Index', 'Technical Assessment Guides', 'Whitepapers & Reports', 'Customer Case Studies']],
  ['COMPANY', ['About TechzConnect', 'How We Work', 'Global Industries', 'Leadership & Governance', 'Contact Relations']],
]
const wrap = 'mx-auto w-full max-w-[1100px] px-5 sm:px-8'

/** Tablet / mobile layout (< 1024px). RESPONSIVE (not in Figma): the Figma frame is 1440px desktop only. */
export default function JobsMobile() {
  return (
    <>
      <section id="jobs-hero" className="bg-black text-white">
        <div className={`${wrap} pb-24 pt-8 sm:pb-28`}>
          <p className="font-poppins text-[12px] tracking-[0.49px]">Home / Jobs &amp; Talent</p>
          <span className="mt-5 inline-flex items-center gap-2 rounded-full border border-[#374151] bg-[#1f2937] px-3 py-[6px] font-poppins text-[10px] font-semibold tracking-[0.6px] text-[#e5e7eb]">
            <span className="h-[6px] w-[6px] rounded-full bg-[red]" />CURATED CAREER OPPORTUNITIES
          </span>
          <h1 className="mt-5 font-poppins text-[34px] font-bold leading-[1.08] tracking-[-1.6px] sm:text-[48px] sm:tracking-[-2.4px]">Explore High-Impact Careers at Leading Tech Companies</h1>
          <p className="mt-5 max-w-[560px] font-poppins text-[15px] leading-[1.6] text-[#d1d5db]">
            Discover hand-vetted roles matching your expertise across hyper-growth startups, unicorn scaleups, and Tier-1 global technology enterprises.
          </p>
          <ul className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {STATS.map((s) => (
              <li key={s.label} className="rounded-[12px] border border-[#374151] bg-[#111827]/70 p-4">
                <img loading="lazy" decoding="async" src={s.icon} alt="" className="h-[18px] w-auto" />
                <p className="mt-3 font-poppins text-[22px] font-bold leading-none">{s.value}</p>
                <p className="mt-1 font-poppins text-[12px] text-[#9ca3af]">{s.label}</p>
              </li>
            ))}
          </ul>
          <div className="relative mt-8 overflow-hidden rounded-[16px]">
            <img loading="lazy" decoding="async" src={hero} alt="" className="aspect-[531/384] w-full object-cover object-[51%_50%]" />
            <div className="absolute inset-x-3 bottom-3 flex items-center justify-between gap-3 rounded-[12px] bg-white px-4 py-3 text-[#0f172a] shadow-lg">
              <div className="flex items-center gap-3">
                <span className="flex h-[34px] w-[34px] items-center justify-center rounded-[6px] bg-[red] font-poppins text-[12px] font-bold text-white">TC</span>
                <div>
                  <p className="font-poppins text-[9px] font-semibold tracking-[0.5px] text-[#6b7280]">LATEST MATCHED PLACEMENT</p>
                  <p className="font-poppins text-[12px] font-semibold">Staff Cloud Architect · ₹48 LPA</p>
                </div>
              </div>
              <span className="font-poppins text-[11px] font-semibold text-[red]">✓ Verified</span>
            </div>
          </div>
        </div>
      </section>

      <section id="jobs-console" className="bg-[#f8f9fb]">
        <div className={`${wrap} -mt-14 pb-8`}>
          <JobsSearchConsole fluid />
        </div>
      </section>

      <section id="jobs-steps" className="bg-[#f8f9fb]">
        <div className={`${wrap} pb-10`}>
          <div className="rounded-[16px] border border-[#f3f4f6] bg-white p-5 shadow-[0px_4px_20px_rgba(0,0,0,0.05)] sm:p-8">
            <p className="font-poppins text-[11px] font-semibold tracking-[1px] text-[red]">CANDIDATE ARCHITECTURE</p>
            <h2 className="mt-1 font-poppins text-[24px] font-bold leading-[1.2] tracking-[-0.7px] text-[#0f172a]">How Top Engineers Get Placed with TechzConnect</h2>
            <p className="mt-2 max-w-[560px] font-poppins text-[14px] leading-[1.5] text-[#6b7280]">
              A transparent, confidential hiring protocol engineered to respect your calendar while matching you with high-trust cultures.
            </p>
            <a href="#join" className="mt-3 inline-block font-poppins text-[12px] font-semibold text-[red] hover:underline">Fast-track via Talent Pool →</a>
            <ol className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {STEPS.map((s, i) => (
                <li key={s.n} className={`rounded-[12px] border p-4 ${i === 5 ? 'border-[#fecaca] bg-[#fef2f2]' : 'border-[#f3f4f6] bg-[#f9fafb]'}`}>
                  <span className={`flex h-[28px] w-[28px] items-center justify-center rounded-full font-poppins text-[11px] font-bold ${i === 5 ? 'bg-[red] text-white' : 'bg-[#fee2e2] text-[red]'}`}>{s.n}</span>
                  <h3 className="mt-3 font-poppins text-[13px] font-semibold text-[#0f172a]">{s.title}</h3>
                  <p className="mt-1 font-poppins text-[12px] leading-[1.5] text-[#6b7280]">{s.body}</p>
                  <img loading="lazy" decoding="async" src={s.icon} alt="" className="mt-4 h-[15px] w-auto" />
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section id="jobs-openings" className="bg-[#f8f9fb]">
        <div className={`${wrap} pb-10`}>
          <JobsList fluid />
        </div>
      </section>

      <section id="jobs-join" className="bg-[#f8f9fb]">
        <div className={`${wrap} pb-10`}>
          <TalentNetworkForm fluid />
        </div>
      </section>

      <section id="jobs-employers" className="bg-[#f8f9fb]">
        <div className={`${wrap} pb-12`}>
          <div className="rounded-[20px] bg-black p-6 text-white shadow-[0px_20px_40px_rgba(0,0,0,0.25)] sm:p-10">
            <span className="inline-block rounded-[6px] bg-[#1f2937] px-3 py-[6px] font-poppins text-[10px] font-semibold tracking-[0.6px]">FOR EMPLOYERS &amp; ENGINEERING LEADERS</span>
            <h2 className="mt-4 font-poppins text-[26px] font-bold leading-[1.15] tracking-[-0.8px] sm:text-[36px]">Are you an employer looking for top-tier candidates like these?</h2>
            <p className="mt-3 max-w-[520px] font-poppins text-[14px] leading-[1.55] text-[#d1d5db]">
              TechzConnect eliminates hiring drag. Access thoroughly vetted senior engineering, product, and tech leadership candidates ready to interview within 48 hours.
            </p>
            <ul className="mt-5 flex flex-col gap-2 font-poppins text-[12px] text-[#d1d5db] sm:flex-row sm:flex-wrap sm:gap-x-6">
              {['96% Offer Acceptance Rate', 'Zero Placement Fee until 90-Day Retention', 'Dedicated CTO-level Screening'].map((t) => (
                <li key={t}><span className="mr-2 text-[red]">✓</span>{t}</li>
              ))}
            </ul>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link to="/employer-enquiry" className="flex h-[46px] items-center justify-center rounded-[7px] bg-[red] px-6 font-poppins text-[12px] font-semibold text-white transition hover:brightness-110">Post a Job / Hire Talent →</Link>
              <Link to="/solutions" className="flex h-[46px] items-center justify-center rounded-[7px] border border-[#374151] bg-[#1f2937] px-6 font-poppins text-[12px] font-semibold text-white transition hover:border-[red]">Review Enterprise Solutions</Link>
            </div>
          </div>
        </div>
      </section>

      <footer id="jobs-footer" className="bg-[#111315] text-[#9ca3af]">
        <div className={`${wrap} py-12`}>
          <img loading="lazy" decoding="async" src={logo} alt="TechzConnect" width={152} height={38} />
          <p className="mt-4 max-w-[340px] font-poppins text-[12px] leading-[1.7]">The authoritative enterprise recruitment ecosystem orchestrating high-velocity placements between top tech innovators and market leaders.</p>
          <div className="mt-8 grid grid-cols-2 gap-8 sm:grid-cols-4">
            {FOOT.map(([h, items]) => (
              <div key={h}>
                <p className="font-poppins text-[11px] font-semibold tracking-[0.65px] text-white">{h}</p>
                <ul className="mt-4 flex flex-col gap-3 font-poppins text-[12px]">
                  {items.map((i) => <li key={i}>{i}</li>)}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-10 flex flex-col gap-3 border-t border-[#1f2937] pt-6 font-poppins text-[12px] sm:flex-row sm:justify-between">
            <span>© 2026 TechzConnect Enterprise Recruitment Inc. All rights reserved.</span>
            <span className="flex flex-wrap gap-x-6 gap-y-1"><span>Privacy Policy</span><span>Terms of Service</span><span>Security &amp; Compliance</span><span>Cookie Preferences</span></span>
          </div>
        </div>
      </footer>
    </>
  )
}
