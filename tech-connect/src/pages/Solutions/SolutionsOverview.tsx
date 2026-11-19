import { Link } from 'react-router-dom'
import SolutionsLayout from './components/SolutionsLayout'
import ResponsivePage from './components/ResponsivePage'
import ScaleToFit from '../../components/ScaleToFit'
import CtaBand from './components/CtaBand'
import { ENQUIRY_HREF, SERVICES } from './data'
import type { Service } from './data'
import hero from './assets/SolutionsHeroTechnologyTalent.png'

/** Drive PDF: "Solutions Card Hover – Permanent Recruitment (2)" / "– IT & Technical Recruitment" (1440 x 2450). */
function ServiceCard({ s }: { s: Service }) {
  const body = (
    <>
      <img loading="lazy" decoding="async" src={s.image} alt={s.title} className="h-[210px] w-full object-cover" />
      <div className="flex flex-1 flex-col px-[21px] pb-[23px] pt-[16px]">
        <p className="font-poppins text-[10.4px] font-bold text-[red]">{s.number} / TECHZCONNECT</p>
        <h3 className="mt-[7px] font-poppins text-[19px] font-bold leading-[28px] text-[#0f0f12]">{s.title}</h3>
        <p className="mt-[9px] max-w-[340px] font-poppins-light text-[13px] leading-[20.5px] text-[#5e6166]">{s.summary}</p>
        <span className="mt-auto pt-[14px] font-poppins text-[13px] font-semibold text-[red]">Explore service →</span>
      </div>
    </>
  )
  const base =
    'flex min-h-[404px] flex-col overflow-hidden rounded-[12px] border bg-white transition duration-200'
  // Contract Staffing / RPO: no design reference yet, so no detail page to link to.
  if (!s.path) return <div className={`${base} border-[#e0e0e0]`}>{body}</div>
  return (
    <Link
      to={s.path}
      className={`${base} border-[#e0e0e0] hover:border-[red] hover:shadow-[0_10px_24px_rgba(255,0,0,0.22)] focus-visible:border-[red] focus-visible:shadow-[0_10px_24px_rgba(255,0,0,0.22)] focus-visible:outline-none`}
    >
      {body}
    </Link>
  )
}

function OverviewDesktop() {
  return (
    <ScaleToFit>
    <SolutionsLayout>
      {/* Hero */}
      <section className="w-full bg-black">
        <div className="relative mx-auto h-[610px] w-[1440px] max-w-full">
          <p className="absolute left-[78px] top-[55px] font-poppins text-[10px] font-bold text-[#ff3838]">SOLUTIONS FOR GROWING TEAMS</p>
          <h1 className="absolute left-[78px] top-[92px] w-[700px] font-poppins text-[50px] font-bold leading-[65px] text-white">
            Recruitment solutions for the teams you’re building.
          </h1>
          <p className="absolute left-[80px] top-[242px] w-[590px] font-poppins-light text-[16px] leading-[26px] text-[#d1d1d1]">
            From individual specialist roles to ongoing workforce needs, TechzConnect offers recruitment support shaped around your business, hiring goals and timelines.
          </p>
          <a
            href={ENQUIRY_HREF}
            className="absolute left-[80px] top-[355px] flex h-[46px] w-[235px] items-center justify-center rounded-[7px] bg-[red] font-poppins text-[13px] font-semibold text-white transition duration-200 hover:brightness-110"
          >
            Discuss Your Hiring Needs
          </a>
          <img loading="lazy" decoding="async" src={hero} alt="Technology talent team" className="absolute left-[790px] top-[50px] h-[430px] w-[570px] rounded-[22px] object-cover" />
        </div>
      </section>

      {/* Intro strip */}
      <section className="w-full bg-[#f5f5f5]">
        <div className="relative mx-auto h-[150px] w-[1440px] max-w-full">
          <h2 className="absolute left-[78px] top-[39px] font-poppins text-[24px] font-bold leading-[36px] text-[#0f0f12]">
            Find the service that fits your hiring need.
          </h2>
          <p className="absolute left-[790px] top-[47px] font-poppins-light text-[15px] leading-[24px] text-[#5e6166]">
            Explore each service to understand its scope, process and next step.
          </p>
        </div>
      </section>

      {/* Services */}
      <section className="w-full bg-white">
        <div className="relative mx-auto w-[1440px] max-w-full px-[78px] pb-[56px] pt-[50px]">
          <p className="font-poppins text-[10px] font-bold text-[red]">EXPLORE OUR SERVICES</p>
          <h2 className="mt-[13px] font-poppins text-[30px] font-bold leading-[44px] text-[#0f0f12]">One partner. Six ways to move hiring forward.</h2>
          <p className="mt-[5px] font-poppins-light text-[15px] leading-[24px] text-[#5e6166]">
            Select a service to view its dedicated landing page, scope and engagement approach.
          </p>
          <div className="mt-[39px] grid grid-cols-[repeat(3,404px)] gap-x-[28px] gap-y-[36px]">
            {SERVICES.map((s) => (
              <ServiceCard key={s.slug} s={s} />
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </SolutionsLayout>
    </ScaleToFit>
  )
}

/** RESPONSIVE (not in Figma, < 1024px): same text, photo, cards and links in a single column / two columns. */
function OverviewMobile() {
  const btn = 'inline-flex h-[46px] items-center justify-center self-start rounded-[7px] bg-[red] px-6 font-poppins text-[13px] font-semibold text-white transition duration-200 hover:brightness-110'
  return (
    <>
      <section className="bg-black">
        <div className="mx-auto flex max-w-[760px] flex-col gap-5 px-5 py-10 sm:px-8 sm:py-14">
          <p className="font-poppins text-[10px] font-bold text-[#ff3838]">SOLUTIONS FOR GROWING TEAMS</p>
          <h1 className="font-poppins text-[32px] font-bold leading-[1.2] text-white sm:text-[44px]">Recruitment solutions for the teams you’re building.</h1>
          <p className="font-poppins-light text-[15px] leading-[1.6] text-[#d1d1d1] sm:text-[16px]">
            From individual specialist roles to ongoing workforce needs, TechzConnect offers recruitment support shaped around your business, hiring goals and timelines.
          </p>
          <a href={ENQUIRY_HREF} className={btn}>
            Discuss Your Hiring Needs
          </a>
          <img loading="lazy" decoding="async" src={hero} alt="Technology talent team" className="aspect-[570/430] w-full rounded-[22px] object-cover" />
        </div>
      </section>
      <section className="bg-[#f5f5f5]">
        <div className="mx-auto flex max-w-[760px] flex-col gap-3 px-5 py-8 sm:px-8">
          <h2 className="font-poppins text-[22px] font-bold leading-[1.3] text-[#0f0f12]">Find the service that fits your hiring need.</h2>
          <p className="font-poppins-light text-[15px] leading-[1.6] text-[#5e6166]">Explore each service to understand its scope, process and next step.</p>
        </div>
      </section>
      <section className="bg-white">
        <div className="mx-auto max-w-[1100px] px-5 py-10 sm:px-8 sm:py-14">
          <p className="font-poppins text-[10px] font-bold text-[red]">EXPLORE OUR SERVICES</p>
          <h2 className="mt-3 font-poppins text-[24px] font-bold leading-[1.25] text-[#0f0f12] sm:text-[30px]">One partner. Six ways to move hiring forward.</h2>
          <p className="mt-2 font-poppins-light text-[15px] leading-[1.6] text-[#5e6166]">
            Select a service to view its dedicated landing page, scope and engagement approach.
          </p>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {SERVICES.map((s) => (
              <ServiceCard key={s.slug} s={s} />
            ))}
          </div>
        </div>
      </section>
      <section className="bg-black">
        <div className="mx-auto flex max-w-[760px] flex-col gap-4 px-5 py-12 sm:px-8">
          <p className="font-poppins text-[10px] font-bold text-[#ff3838]">START A CONVERSATION</p>
          <h2 className="font-poppins text-[28px] font-bold leading-[1.2] text-white sm:text-[36px]">Not sure which solution fits?</h2>
          <p className="font-poppins-light text-[15px] leading-[1.6] text-[#ccc]">
            Share your hiring goals, required skills and timelines. We can discuss the right starting point.
          </p>
          <a href={ENQUIRY_HREF} className={btn}>
            Discuss Your Hiring Needs
          </a>
        </div>
      </section>
    </>
  )
}

export default function SolutionsOverview() {
  return <ResponsivePage navbar="solutions" Desktop={OverviewDesktop} Mobile={OverviewMobile} />
}
