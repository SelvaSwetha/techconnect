/**
 * Tablet + mobile layout (< 1024px).
 *
 * NOT defined in Figma — the only approved design is the 1440px desktop frame
 * (202:4483). This file re-flows the SAME content, photos, icons, colours and
 * type styles into stacked / 2-column layouts. Responsive decisions are noted
 * in comments marked "RESPONSIVE:".
 */
import HiringEnquiryForm from '../../../components/hiring-form/HiringEnquiryForm'
import AccordionItem from '../../../components/Accordion'
import { FAQS } from '../faqData'
import type { ReactNode } from 'react'
import {
  imgTechzConnectOfficialLogoVectorTrace as logo,
  imgHeroImageHdBusinessTeam as heroImg,
  imgThoughtfulBusinesswomanWithPenThinkingAboutHiringNeeds as problem1,
  imgYoungMaleProfessionalInShirtWorkingIntentlyOnLaptop as problem2,
  imgTeamOfDiverseCoworkersCollaboratingAroundALaptop as problem3,
  imgOverworkedBusinesswomanWithLaptopAndStackOfApplicantFiles as problem4,
  imgSvgSpecialistSearchTalentIcon as pIcon1,
  imgSvgClockSpeedIcon as pIcon2,
  imgSvgGrowthChartScaleIcon as pIcon3,
  imgSvgGearOperationsIcon as pIcon4,
  imgSvg as iMonitor,
  imgSvg1 as iCloud,
  imgSvg2 as iRocket,
  imgSvg3 as iHeadset,
  imgSvg4 as iCap,
  imgSvg5 as iCart,
  imgSvg6 as iBuilding,
  imgSvg7 as iTrend,
  imgSvg8 as iHeart,
  imgSvg9 as iBriefcase,
  imgSvg10 as iTruck,
  imgSvg11 as iMegaphone,
  imgSouthAsianExecutiveProfessionalWorkingAtLaptopInAnOffice as industriesImg,
  imgAvatar1,
  imgAvatar2,
  imgAvatar3,
  imgAvatar4,
  imgConsultationSessionTakingNotesOnLaptop as step1,
  imgRecruitingTalentMappingSessionInOffice as step2,
  imgExecutiveScreeningAndTalentEvaluation as step3,
  imgRecruiterReviewingCandidateProfilesShortlistOnDisplay as step4,
  imgClientInterviewAndPanelEvaluation as step5,
  imgHandshakeConfirmingEmploymentOfferAcceptance as step6,
  imgPlacedProfessionalSmilingDuringRetentionAndFollowUpCheckIn as step7,
  imgSvg13 as sIcon1,
  imgSvg15 as sIcon2,
  imgSvg16 as sIcon3,
  imgSvg17 as sIcon4,
  imgSvg18 as sIcon5,
  imgSvg19 as sIcon6,
  imgSvg21 as sIcon7,
  imgSmilingProfessionalBusinesswoman as rolesImg,
  imgSvg24 as rCode,
  imgSvg25 as rCloud,
  imgSvg26 as rMonitor,
  imgSvgBrainNeuralLogicIcon as rBulb,
  imgSvgIsometricBoxAiCube as rCube,
  imgSvgProductDeliveryPackage as rPackage,
  imgSvgDatabaseStackIcon as rDatabase,
  imgSvgAnalyticsChartIcon as rAnalytics,
  imgSvgShieldCheckIcon as rShield,
  imgSvgQualityGearIcon as rGear,
  imgSvgDocumentTaskList as rDoc,
  imgSvgBriefcaseIcon as rCase,
  imgSvgIconDocumentWithMagnifyingGlass as pr1,
  imgSvgIconTailoredPlanDocumentWithAvatar as pr2,
  imgSvgIconSourcingTalentNetworkWithLens as pr3,
  imgSvgIconEvaluatedDocumentWithRedCheckmark as pr4,
  imgSvgIconSelectionDiscussionInterviews as pr5,
  imgSvgIconHandshakeSuccessfulJoiningCelebration as pr6,
} from '../assets'

const RED = 'text-[red]'
const eyebrow = 'text-[11px] font-bold tracking-[0.02em] uppercase'
const h2 = 'font-bold leading-[1.2] text-[28px] sm:text-[34px] md:text-[38px]'
const wrap = 'mx-auto w-full max-w-[1100px] px-5 sm:px-8'
const redBtn =
  'inline-flex h-[46px] items-center justify-center rounded-[7px] bg-[red] px-6 text-[13px] font-semibold text-white transition duration-200 hover:brightness-110'

function Section({ id, bg, children }: { id?: string; bg: string; children: ReactNode }) {
  return (
    <section id={id} className={`${bg} py-12 sm:py-16`}>
      <div className={wrap}>{children}</div>
    </section>
  )
}

/* -------------------------------------------------------------------- hero */
function MobileHero() {
  return (
    <section className="bg-black py-12 text-white sm:py-16">
      <div className={`${wrap} grid items-center gap-10 md:grid-cols-2`}>
        <div>
          <p className={`${eyebrow} text-[#ff3d3d]`}>STRATEGIC TALENT &amp; WORKFORCE SOLUTIONS</p>
          <h1 className="mt-5 text-[38px] font-bold leading-[1.13] tracking-[-0.02em] sm:text-[48px] md:text-[40px]">
            Build the Team
            <br />
            That Moves Your
            <br />
            Business Forward.
          </h1>
          <p className="mt-5 max-w-[540px] text-[16px] leading-[1.6] text-[#d6d6d6] sm:text-[18px] sm:leading-[28px]">
            Strategic recruitment, staffing and HR solutions for growing businesses. Find the right
            people, build stronger teams, and scale with confidence.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a href="#contact" className={`${redBtn} shadow-[0px_6px_18px_0px_rgba(255,0,0,0.24)]`}>
              Hire Talent
            </a>
            <a
              href="#contact"
              className="inline-flex h-[46px] items-center justify-center rounded-[7px] border border-[#7a7a7a] bg-black px-6 text-[13px] font-semibold text-white transition duration-200 hover:border-white"
            >
              Book Consultation
            </a>
          </div>
          <p className="mt-8 text-[11px] font-medium leading-[1.8] text-[#b8b8b8]">
            PERMANENT HIRING · CONTRACT STAFFING · RPO · EXECUTIVE SEARCH
          </p>
        </div>
        <div className="relative mx-auto w-full max-w-[492px] pr-[14px] pb-[14px]">
          <div className="absolute inset-0 left-[20px] top-[19px] rounded-[18px] bg-[red]" />
          <div className="relative rounded-[16px] border border-[#3d3d3d] bg-[#1f1f21] p-[17px] shadow-[0px_16px_34px_0px_rgba(255,0,0,0.18)]">
            <img
              src={heroImg}
              alt="HD business team"
              className="aspect-[458/308] w-full rounded-[10px] object-cover"
            />
            <div className="mt-4 grid grid-cols-3 gap-2 border-t border-[#4d4d4f] pt-4">
              {[
                ['01', 'REQUIREMENT-LED'],
                ['02', 'STRUCTURED SCREENING'],
                ['03', 'HIRING PARTNERSHIP'],
              ].map(([n, l]) => (
                <div key={n}>
                  <p className="text-[24px] font-bold leading-none sm:text-[30px]">{n}</p>
                  <p className="mt-1 text-[9px] font-medium leading-tight text-[#c9c9c9] sm:text-[10px]">{l}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------- trust strip */
function MobileTrust() {
  const items = ['Requirement intelligence', 'Structured screening', 'Flexible hiring models', 'Dedicated support']
  return (
    <section className="bg-[#f5f5f5] py-8">
      <div className={`${wrap} grid gap-6 md:grid-cols-[1fr_1.4fr] md:items-center`}>
        <div>
          <p className="text-[17px] font-semibold text-[#0f0f12]">A talent partner built around your business goals</p>
          <p className="mt-1 text-[13px] text-[#5e6166]">
            Clear hiring support from first conversation through joining and beyond.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-y-5 sm:grid-cols-4">
          {items.map((t, i) => (
            <div key={t} className="border-l border-[#e0e0e0] pl-4">
              <p className="text-[21px] font-bold text-[red]">{`0${i + 1}`}</p>
              <p className="text-[13px] font-semibold text-[#0f0f12]">{t}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ----------------------------------------------------------------- problem */
const PROBLEMS = [
  { n: '01', t: 'Hard-to-fill specialist roles', d: 'Access relevant IT, technical and niche talent.', img: problem1, icon: pIcon1 },
  { n: '02', t: 'Hiring at speed', d: 'Build capacity around deadlines and growth plans.', img: problem2, icon: pIcon2 },
  { n: '03', t: 'Scaling a team or function', d: 'Add the people and skills your next phase needs.', img: problem3, icon: pIcon3 },
  { n: '04', t: 'Recruitment process overload', d: 'Extend your team with structured sourcing and screening.', img: problem4, icon: pIcon4 },
]
function MobileProblem() {
  return (
    <Section bg="bg-white">
      <p className={`${eyebrow} ${RED}`}>START WITH THE CHALLENGE</p>
      <h2 className={`${h2} mt-3 text-[#0f0f12]`}>What hiring problem are you trying to solve?</h2>
      <div className="mt-8 grid gap-8 sm:grid-cols-2">
        {PROBLEMS.map((p) => (
          <article key={p.n}>
            {/* RESPONSIVE: desktop uses leaf-shaped crops joined by a curved flow line; here rounded photo cards */}
            <img src={p.img} alt={p.t} className="aspect-[512/279] w-full rounded-[24px_6px_24px_6px] object-cover shadow-[0_4px_14px_rgba(255,0,0,0.12)]" />
            <div className="mt-4 flex items-center gap-3">
              <span className="text-[40px] font-bold leading-none tracking-[-0.05em] text-[#ffd6d6]">{p.n}</span>
              <span className="flex size-[42px] items-center justify-center rounded-full bg-[#feecee]">
                <img src={p.icon} alt="" className="size-[22px]" />
              </span>
            </div>
            <h3 className="mt-2 text-[17px] font-bold text-[#111827]">{p.t}</h3>
            <p className="mt-1 text-[13px] leading-[1.6] text-[#5e6166]">{p.d}</p>
          </article>
        ))}
      </div>
    </Section>
  )
}

/* --------------------------------------------------------------- solutions */
const SOLUTIONS = [
  ['Permanent Recruitment', 'Find long-term talent aligned to your roles, culture and goals.'],
  ['IT & Technical Recruitment', 'Source software, data, cloud, DevOps, AI/ML, QA and product talent.'],
  ['Contract Staffing', 'Add specialized capacity for projects, peak demand and rapid expansion.'],
  ['RPO / Recruitment Outsourcing', 'Extend your recruitment team with sourcing, screening and hiring coordination.'],
  ['Executive Search', 'Identify experienced leaders and specialized senior talent.'],
  ['HR Consulting', 'Strengthen HR processes, policies, onboarding and workforce planning.'],
]
function MobileSolutions() {
  return (
    <Section id="solutions" bg="bg-black text-white">
      <p className={`${eyebrow} text-[#ff4040]`}>SOLUTIONS DESIGNED AROUND OUTCOMES</p>
      <h2 className={`${h2} mt-3`}>The right talent solution for every stage of growth.</h2>
      <p className="mt-4 max-w-[640px] text-[14px] leading-[1.7] text-[#bababa]">
        From a critical permanent hire to a flexible workforce or a more effective recruitment engine, our support
        adapts to your needs.
      </p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {SOLUTIONS.map(([t, d], i) => (
          <a
            key={t}
            href="#contact"
            className="group rounded-[12px] border border-[#3b3b3d] bg-[#131314] p-6 shadow-[0px_8px_20px_0px_rgba(0,0,0,0.18)] transition duration-200 hover:-translate-y-2"
          >
            <p className="text-[12px] font-bold text-[#ff4040]">{`0${i + 1}`}</p>
            <h3 className="mt-2 text-[19px] font-semibold leading-[24px]">{t}</h3>
            <p className="mt-2 text-[13px] leading-[1.6] text-[#bababa]">{d}</p>
            <p className="mt-5 text-[12px] font-semibold text-[red]">Explore solution →</p>
          </a>
        ))}
      </div>
      <a href="#contact" className={`${redBtn} mt-8`}>
        View All Solutions
      </a>
    </Section>
  )
}

/* -------------------------------------------------------------- industries */
const INDUSTRIES: [string, string][] = [
  ['IT & Software', iMonitor], ['SaaS & Technology', iCloud], ['Startups', iRocket], ['BPO / KPO', iHeadset],
  ['Education', iCap], ['E-commerce', iCart], ['Manufacturing', iBuilding], ['Finance', iTrend],
  ['Healthcare', iHeart], ['Professional Services', iBriefcase], ['Logistics', iTruck], ['Digital Marketing', iMegaphone],
]
function MobileIndustries() {
  return (
    <Section id="industries" bg="bg-white">
      <p className={`${eyebrow} ${RED}`}>WHO WE SERVE</p>
      <h2 className={`${h2} mt-3 text-[#0f0f12]`}>Talent for the markets moving business forward.</h2>
      <div className="mt-8 grid gap-10 md:grid-cols-[1.2fr_1fr] md:items-center">
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-2">
          {INDUSTRIES.map(([label, icon]) => (
            <li key={label} className="flex items-center gap-3 rounded-[12px] border border-[#e0e0e0] bg-white p-3">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#feecee]">
                <img src={icon} alt="" className="size-5" />
              </span>
              <span className="text-[13px] font-bold text-[#111827]">{label}</span>
            </li>
          ))}
        </ul>
        <div className="relative mx-auto w-full max-w-[380px]">
          <img src={industriesImg} alt="Executive professional working at a laptop" className="aspect-[3/4] w-full rounded-[24px] object-cover" />
          <div className="absolute inset-x-4 bottom-4 rounded-[14px] bg-white p-4 shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1)]">
            <p className="text-[13px] font-bold leading-tight text-[#0f0f12]">Connecting talent across industries</p>
            <div className="mt-2 flex items-center gap-2">
              {[imgAvatar1, imgAvatar2, imgAvatar3, imgAvatar4].map((a, i) => (
                <img key={i} src={a} alt="" className="size-7 rounded-full object-cover shadow-[0px_0px_0px_2px_white]" />
              ))}
              <span className="text-[11px] font-semibold text-[#5e6166]">North America · Europe · Asia</span>
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}

/* ------------------------------------------------------------ talent engine */
const STEPS = [
  { n: '01', t: 'Discover', d: 'Understand your hiring goals, role requirements and business context.', img: step1, icon: sIcon1 },
  { n: '02', t: 'Map & Source', d: 'Identify and engage relevant talent pools through targeted sourcing.', img: step2, icon: sIcon2 },
  { n: '03', t: 'Screen & Validate', d: 'Assess skills, culture fit and experience through a structured screening process.', img: step3, icon: sIcon3 },
  { n: '04', t: 'Shortlist', d: 'Present the best-fit candidates for your review with complete profiles.', img: step4, icon: sIcon4 },
  { n: '05', t: 'Interview', d: 'Coordinate client and candidate conversations for a smooth interview experience.', img: step5, icon: sIcon5 },
  {
    n: '06', t: 'Offer & Join', d: 'Support communication, contract structuring, compensation negotiation, and joining formalities.',
    img: step6, icon: sIcon6, extra: ['Offer Vetting', 'Negotiation SLA', '48 hrs', 'PLACEMENT PHASE'],
  },
  {
    n: '07', t: 'Follow Up', d: 'Structured check-ins at Day 30, 60, & 90 to protect retention and guarantee seamless ramp-up.',
    img: step7, icon: sIcon7, extra: ['90-Day Guarantee', 'Retention Warranty', '100% Assurance', 'RETENTION PILLAR'],
  },
]
function MobileTalentEngine() {
  return (
    <Section bg="bg-[#f5f5f5]">
      <p className={`${eyebrow} ${RED}`}>HOW WE WORK</p>
      <h2 className={`${h2} mt-3 text-[#0f0f12]`}>A structured engine for better hiring decisions.</h2>
      <ol className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {STEPS.map((s) => (
          <li key={s.n} className="overflow-hidden rounded-[14px] border border-[#e0e0e0] bg-white">
            <div className="relative">
              <img src={s.img} alt={s.t} className="aspect-[512/279] w-full object-cover" />
              <span className="absolute bottom-3 right-3 flex size-10 items-center justify-center rounded-full bg-white shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1)]">
                <img src={s.icon} alt="" className="size-5" />
              </span>
            </div>
            <div className="p-4">
              <p className="text-[12px] font-bold text-[red]">{s.n}</p>
              <h3 className="text-[17px] font-bold text-[#111827]">{s.t}</h3>
              <p className="mt-1 text-[13px] leading-[1.6] text-[#5e6166]">{s.d}</p>
              {s.extra && (
                <div className="mt-3 rounded-[8px] bg-[#feecee] p-3">
                  <p className="text-[10px] font-bold text-[red]">{s.extra[3]}</p>
                  <p className="text-[12px] font-semibold text-[#111827]">{s.extra[0]}</p>
                  <p className="text-[12px] text-[#5e6166]">
                    {s.extra[1]}: <b className="text-[#111827]">{s.extra[2]}</b>
                  </p>
                </div>
              )}
            </div>
          </li>
        ))}
      </ol>
    </Section>
  )
}

/* ------------------------------------------------------------------- roles */
const ROLES: [string, string, string][] = [
  ['Full Stack', 'Build end-to-end solutions.', rCode],
  ['Cloud & DevOps', 'Scalable and reliable infrastructure.', rCloud],
  ['UI / UX', 'User-focused digital experiences.', rMonitor],
  ['Frontend / React', 'Modern and scalable interfaces.', rBulb],
  ['AI / ML', 'Intelligent and data-driven solutions.', rCube],
  ['Product', 'From idea to market-ready products.', rPackage],
  ['Backend', 'Robust and secure systems.', rDatabase],
  ['Data Engineering', 'Turn data into opportunities.', rAnalytics],
  ['Cybersecurity', 'Protect what matters.', rShield],
  ['QA / SDET', 'Quality at every step.', rGear],
  ['Project Management', 'Deliver projects with precision.', rDoc],
  ['Business Operations', 'Drive efficiency and growth.', rCase],
]
function MobileRoles() {
  return (
    <Section bg="bg-white">
      <p className={`${eyebrow} ${RED}`}>THE TALENT LANDSCAPE</p>
      <h2 className={`${h2} mt-3 text-[#0f0f12]`}>Specialized talent. Relevant skills. Real context.</h2>
      {/* RESPONSIVE: the radial diagram is replaced by a photo badge + two-column role list */}
      <div className="relative mx-auto mt-8 size-[220px]">
        <img src={rolesImg} alt="Smiling professional" className="size-full rounded-full border-[6px] border-[#ffe4e6] object-cover" />
        <div className="absolute -bottom-3 left-1/2 w-[170px] -translate-x-1/2 rounded-full bg-[red] px-4 py-3 text-center text-[12px] font-semibold leading-tight text-white shadow-[0px_4px_5px_rgba(255,0,0,0.35)]">
          Specialized talent across every function.
        </div>
      </div>
      <ul className="mt-12 grid gap-3 sm:grid-cols-2 md:grid-cols-3">
        {ROLES.map(([t, d, icon]) => (
          <li key={t} className="flex items-center gap-3 rounded-[12px] border border-[#e0e0e0] p-3">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-[#ffe4e6] bg-white shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1)]">
              <img src={icon} alt="" className="size-[18px]" />
            </span>
            <div>
              <p className="text-[14px] font-bold text-[#111827]">{t}</p>
              <p className="text-[12px] text-[#5e6166]">{d}</p>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  )
}

/* ----------------------------------------------------------------- partner */
const WHY = [
  ['Requirement intelligence', 'Start with the role, business need and success criteria.'],
  ['Specialized talent networks', 'Reach relevant candidate pools for priority roles.'],
  ['Structured evaluation', 'Use a consistent, requirement-led screening approach.'],
  ['Flexible engagement', 'Choose a model aligned to hiring volume and urgency.'],
  ['Dedicated support', 'Keep communication moving through interview and offer stages.'],
  ['Data-informed decisions', 'Bring clarity to the hiring pipeline and next steps.'],
]
function MobilePartner() {
  return (
    <Section bg="bg-black text-white">
      <p className={`${eyebrow} text-[#ff4040]`}>WHY TECHZCONNECT</p>
      <h2 className={`${h2} mt-3`}>A hiring partner that thinks beyond the vacancy.</h2>
      <p className="mt-4 max-w-[560px] text-[14px] leading-[1.7] text-[#bababa]">
        We connect recruitment execution with the business context behind every role — so you can make clearer
        decisions and build teams with purpose.
      </p>
      <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
        {WHY.map(([t, d], i) => (
          <div key={t} className="rounded-[10px] border border-[#3d3d40] bg-[#17171a] p-5">
            <p className="text-[12px] font-bold text-[#ff4040]">{`0${i + 1}`}</p>
            <h3 className="mt-2 text-[15px] font-semibold">{t}</h3>
            <p className="mt-1 text-[12px] leading-[1.6] text-[#bababa]">{d}</p>
          </div>
        ))}
      </div>
    </Section>
  )
}

/* ------------------------------------------------------------------- proof */
const PROOF = [
  ['Scaling a technical team', 'Challenge → Talent strategy → Screening → Shortlist → Outcome', '#0f0f12'],
  ['Supporting a hiring deadline', 'Requirement → Sourcing → Candidate validation → Joining', '#212124'],
  ['Building a leadership pipeline', 'Market mapping → Confidential search → Assessment → Selection', '#29292b'],
]
function MobileProof() {
  return (
    <Section bg="bg-white">
      <p className={`${eyebrow} ${RED}`}>PROOF OVER PROMISES</p>
      <h2 className={`${h2} mt-3 text-[#0f0f12]`}>Hiring success starts with a clear strategy.</h2>
      <p className="mt-4 max-w-[640px] text-[14px] leading-[24px] text-[#5e6166]">
        Show the challenge, the recruitment approach and the outcome. Publish client names and metrics only when
        verified and approved.
      </p>
      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {PROOF.map(([t, d, band], i) => (
          <article key={t} className="overflow-hidden rounded-[12px] border border-[#e0e0e0] bg-white">
            <div className="h-[80px] border-b-[12px] border-[red] p-4" style={{ background: band }}>
              <p className="text-[12px] font-bold text-[#ff4d4d]">{`0${i + 1}`}</p>
            </div>
            <div className="p-5">
              <h3 className="text-[16px] font-semibold text-[#0f0f12]">{t}</h3>
              <p className="mt-2 text-[12px] leading-[1.5] text-[#5e6166]">{d}</p>
              <p className="mt-4 text-[12px] font-semibold text-[red]">Read success story →</p>
            </div>
          </article>
        ))}
      </div>
    </Section>
  )
}

/* ----------------------------------------------------------------- process */
const PROCESS: [string, string, string, string][] = [
  ['01', 'Discover', 'Clarify the requirement', pr1],
  ['02', 'Plan', 'Align on profile and model', pr2],
  ['03', 'Source', 'Build a relevant pipeline', pr3],
  ['04', 'Evaluate', 'Screen and validate', pr4],
  ['05', 'Select', 'Coordinate interviews', pr5],
  ['06', 'Join', 'Support offer and joining', pr6],
]
function MobileProcess() {
  return (
    <Section id="how-we-work" bg="bg-white">
      <p className={`${eyebrow} ${RED}`}>FROM NEED TO NEW HIRE</p>
      <h2 className={`${h2} mt-3 text-[#0f0f12]`}>A transparent path from first conversation to joining.</h2>
      <ol className="mt-8 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3">
        {PROCESS.map(([n, t, d, icon]) => (
          <li key={n} className="flex flex-col items-center text-center">
            <span className="relative flex size-[96px] items-center justify-center rounded-full bg-white p-5 shadow-[0px_10px_30px_-4px_rgba(255,59,48,0.12),inset_0px_0px_0px_1.5px_rgba(255,230,230,0.9)]">
              <img src={icon} alt="" className="size-full object-contain" />
              <span className="absolute -bottom-3 left-1/2 flex size-7 -translate-x-1/2 items-center justify-center rounded-full bg-[red] text-[11px] font-bold text-white">
                {n}
              </span>
            </span>
            <h3 className="mt-5 text-[16px] font-bold text-[#111827]">{t}</h3>
            <p className="mt-1 text-[12px] text-[#5e6166]">{d}</p>
          </li>
        ))}
      </ol>
    </Section>
  )
}

/* ------------------------------------------------------------- testimonial */
function MobileTestimonial() {
  return (
    <Section bg="bg-white">
      <div className="grid gap-8 md:grid-cols-2 md:items-center">
        <div>
          <p className={`${eyebrow} ${RED}`}>CLIENT PERSPECTIVE</p>
          <h2 className={`${h2} mt-3 text-[#0f0f12]`}>Partnership is built through reliable hiring experiences.</h2>
        </div>
        <figure className="rounded-[12px] border border-[#e0e0e0] bg-white p-7">
          <span className="text-[48px] font-bold italic leading-none text-[red]">“</span>
          <blockquote className="text-[16px] font-semibold leading-[26px] text-[#0f0f12]">
            Add an approved client testimonial here, supported by a verified name, role and company permission.
          </blockquote>
          <figcaption className="mt-5 text-[10px] font-medium text-[#5e6166]">CLIENT NAME · DESIGNATION · COMPANY</figcaption>
        </figure>
      </div>
    </Section>
  )
}

/* ---------------------------------------------------------------- lead CTA */
function MobileLeadCta() {
  return (
    <Section id="contact" bg="bg-black text-white">
      <div className="grid gap-10 md:grid-cols-2 md:items-center">
        <div>
          <p className={`${eyebrow} text-[#ff3838]`}>LET'S BUILD YOUR NEXT TEAM</p>
          <h2 className="mt-3 text-[32px] font-bold leading-[1.2] sm:text-[40px] sm:leading-[48px]">Ready to build your team?</h2>
          <p className="mt-4 max-w-[480px] text-[14px] leading-[23px] text-[#ccc]">
            Tell us what you need to hire. We’ll help you identify the right next step.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href="#contact" className={redBtn}>Submit Hiring Requirement</a>
            <a href="#contact" className="inline-flex h-[46px] items-center rounded-[7px] border border-[#7a7a7a] bg-black px-6 text-[13px] font-semibold transition duration-200 hover:border-white">
              Book Consultation
            </a>
          </div>
        </div>
        <div className="rounded-[12px] bg-white p-6 text-[#0f0f12]">
          <h3 className="text-[18px] font-bold">Start a hiring conversation</h3>
          <p className="mb-4 mt-1 text-[12px] text-[#5e6166]">Share a few details and our team can follow up.</p>
          <HiringEnquiryForm variant="fluid" />
        </div>
      </div>
    </Section>
  )
}

/* --------------------------------------------------------------------- FAQ */
function MobileFaq() {
  return (
    <Section id="faq" bg="bg-white">
      <div className="grid gap-8 md:grid-cols-[1fr_1.3fr]">
        <div>
          <p className={`${eyebrow} ${RED}`}>FREQUENTLY ASKED QUESTIONS</p>
          <h2 className={`${h2} mt-3 text-[#0f0f12]`}>A few things you may want to know before we begin.</h2>
        </div>
        <div className="flex flex-col gap-3">
          {FAQS.map(([q, a]) => (
            <AccordionItem
              key={q}
              defaultOpen
              question={q}
              className="rounded-[8px] border border-[#e0e0e0] bg-white p-5"
              buttonClassName="text-[14px] font-semibold text-[#0f0f12] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[red]"
              answerClassName="pt-2 text-[12px] leading-[16px] text-[#5e6166] sm:leading-[1.6]"
            >
              {a}
            </AccordionItem>
          ))}
        </div>
      </div>
    </Section>
  )
}

/* ------------------------------------------------------------------ footer */
const FOOT: [string, string[]][] = [
  ['SOLUTIONS', ['Permanent Recruitment', 'IT & Technical Recruitment', 'Contract Staffing', 'RPO & HR Consulting']],
  ['COMPANY', ['About TechzConnect', 'How We Work', 'Industries', 'Contact']],
  ['FOR TALENT', ['Find Jobs', 'Submit Resume', 'Talent Network', 'Career Resources']],
]
function MobileFooter() {
  return (
    <footer className="border-t-[5px] border-[red] bg-black pt-12 text-[#b8b8b8]">
      <div className={`${wrap} grid gap-8 sm:grid-cols-2 md:grid-cols-4`}>
        <div>
          <img src={logo} alt="TechzConnect" className="h-[38px] w-[152px]" />
          <p className="mt-4 text-[13px]">Talent. Teams. Growth.</p>
          <p className="mt-2 max-w-[260px] text-[13px] leading-[20px]">Strategic talent and workforce solutions for growing businesses.</p>
        </div>
        {FOOT.map(([title, links]) => (
          <div key={title}>
            <p className="text-[12px] font-bold text-white">{title}</p>
            <ul className="mt-3 flex flex-col gap-2">
              {links.map((l) => (
                <li key={l}><a href="#" className="text-[13px] transition-colors hover:text-white">{l}</a></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className={`${wrap} mt-10 flex flex-col gap-2 border-t border-[#404040] py-6 text-[12px] sm:flex-row sm:justify-between`}>
        <span>© TechzConnect. All rights reserved.</span>
        <span>Privacy Policy &nbsp; Terms &amp; Conditions</span>
      </div>
    </footer>
  )
}

export default function ResponsiveHome() {
  return (
    <>
      <MobileHero />
      <MobileTrust />
      <MobileProblem />
      <MobileSolutions />
      <MobileIndustries />
      <MobileTalentEngine />
      <MobileRoles />
      <MobilePartner />
      <MobileProof />
      <MobileProcess />
      <MobileTestimonial />
      <MobileLeadCta />
      <MobileFaq />
      <MobileFooter />
    </>
  )
}
