import permanent from './assets/ServiceImagePermanentRecruitment.png'
import itTech from './assets/SolutionsHeroTechnologyTalent.png'
import contract from './assets/ServiceImageContractStaffing.png'
import rpo from './assets/ServiceImageRpoRecruitmentOutsourcing.png'
import executive from './assets/ServiceImageExecutiveSearch.png'
import hr from './assets/ServiceImageHrConsulting.png'

export interface Service {
  slug: string
  number: string
  title: string
  /** Short label used in the footer link row (per the Solutions PDF). */
  footerLabel: string
  summary: string
  image: string
  /** Route to the detail page, or null while no verified design reference exists. */
  path: string | null
}

/** Card copy is verbatim from the Solutions Overview PDF. */
export const SERVICES: Service[] = [
  {
    slug: 'permanent-recruitment',
    number: '01',
    title: 'Permanent Recruitment',
    footerLabel: 'Permanent Recruitment',
    summary: 'Full-time hiring; sourcing; screening; interview coordination; offer coordination; replacement/support where applicable.',
    image: permanent,
    path: '/solutions/permanent-recruitment',
  },
  {
    slug: 'it-technical-recruitment',
    number: '02',
    title: 'IT & Technical Recruitment',
    footerLabel: 'IT Recruitment',
    summary: 'Software, Full Stack, Data, Cloud, DevOps, AI/ML, Cybersecurity, QA/SDET, UI/UX, Product and Project roles.',
    image: itTech,
    path: '/solutions/it-technical-recruitment',
  },
  {
    slug: 'contract-staffing',
    number: '03',
    title: 'Contract Staffing',
    footerLabel: 'Contract Staffing',
    summary: 'Temporary/project capacity; specialized skills; rapid expansion; contract-to-hire; workforce scaling.',
    image: contract,
    path: null, // PENDING: no design reference yet
  },
  {
    slug: 'rpo',
    number: '04',
    title: 'RPO / Recruitment Outsourcing',
    footerLabel: 'RPO',
    summary: 'Extended recruitment team; sourcing; screening; interview coordination; reporting; hiring analytics; employer branding support.',
    image: rpo,
    path: null, // PENDING: no design reference yet
  },
  {
    slug: 'executive-search',
    number: '05',
    title: 'Executive Search',
    footerLabel: 'Executive Search',
    summary: 'CXO, Directors, Senior Management, specialized leadership, confidential searches, market mapping and candidate assessment.',
    image: executive,
    path: '/solutions/executive-search',
  },
  {
    slug: 'hr-consulting',
    number: '06',
    title: 'HR Consulting',
    footerLabel: 'HR Consulting',
    summary: 'HR processes, policies, recruitment process, onboarding, performance management, HR documentation, operations, workforce planning and HR advisory.',
    image: hr,
    path: '/solutions/hr-consulting',
  },
]

/** Where "Discuss ..." CTAs go until the Employer Enquiry page is built: the Homepage hiring form. */
export const ENQUIRY_HREF = '/employer-enquiry'
