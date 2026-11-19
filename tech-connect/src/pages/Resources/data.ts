import photoFlagship from '../../assets/images/photos/resources/resources-photo-01.jpeg'
import photoHrOps from '../../assets/images/photos/resources/resources-photo-02.jpeg'
import photoRecruit from '../../assets/images/photos/resources/resources-photo-03.jpeg'
import photoTalent from '../../assets/images/photos/resources/resources-photo-04.jpeg'
import photoCandidate from '../../assets/images/photos/resources/resources-photo-05.jpeg'
import photoFounder from '../../assets/images/photos/resources/resources-photo-06.jpeg'
import photoRpo from '../../assets/images/photos/resources/resources-photo-07.jpeg'
import photoAdvisor from '../../assets/images/photos/resources/resources-photo-08.jpeg'
import iconChecklist from '../../assets/icons/resources/toolkit-checklist.svg'
import iconQuestions from '../../assets/icons/resources/toolkit-questions.svg'
import iconSop from '../../assets/icons/resources/toolkit-sop.svg'
import iconCompliance from '../../assets/icons/resources/toolkit-compliance.svg'
import iconOnboarding from '../../assets/icons/resources/toolkit-onboarding.svg'
import iconCalculator from '../../assets/icons/resources/toolkit-calculator.svg'

/** Content of the Resources page, transcribed from the Drive PDF export (08_Resources.pdf). PROVISIONAL: not verified against Figma. */

export const HERO = {
  eyebrow: 'KNOWLEDGE & INTELLIGENCE ECOSYSTEM',
  title: 'Recruitment Intelligence & HR Knowledge Hub',
  description: 'Proven playbooks, compensation benchmarks, and downloadable toolkits designed to help founders and HR leaders build winning teams.',
  updated: 'Updated Weekly for 2026 Market Dynamics',
}

export const ALL = 'All Resources'
export const CATEGORIES = [ALL, 'Recruitment Strategies', 'HR & People Ops', 'Founder & Scaling', 'Talent Market Intelligence', 'Candidate Growth'] as const
export type Category = (typeof CATEGORIES)[number]

export const FLAGSHIP = {
  badge: 'ANNUAL FLAGSHIP INTELLIGENCE',
  photo: photoFlagship,
  cohortLabel: 'ANALYZED COHORT',
  cohort: '148,000+ Offers',
  coverageLabel: 'COVERAGE ZONE',
  coverage: 'IN, SG, ID, JP & UAE',
  type: 'REPORT',
  readTime: '24 Min Read',
  updated: 'Updated Oct 2026',
  title: '2026 Tech Salary Benchmarks & Compensation Guide',
  description:
    'Navigating India and APAC Tech Talent Hubs with granular precision. Detailed compensation percentiles across AI/ML engineering, cloud architecture, and technical product leadership.',
  bullets: [
    'P25 to P90 compensation percentiles across Tier-1 and Tier-2 hubs',
    'ESOP vesting shifts and competitive retention structures',
    'Contract-to-hire premia and cross-border payroll strategies',
  ],
  author: 'Rhea V. Nambiar',
  authorRole: 'VP of Talent Intelligence',
  cta: 'Preview & Download',
}

export const TOOLKITS_HEAD = {
  eyebrow: 'FREE OPERATIONAL TEMPLATES',
  title: 'Downloadable Toolkits & Playbooks',
  description: 'Field-tested instruments ready for immediate implementation in your ATS and team workflows.',
  bundle: 'Download All 6 as Single Bundle (.ZIP)',
}

export const TOOLKITS = [
  { title: 'Hiring Checklist', format: 'PDF + NOTION', description: 'Structured 90-day checklist for engineering and technical team hiring.', downloads: '1,420+ Downloads', icon: iconChecklist },
  { title: 'Interview Question Bank', format: 'DOCS + PDF', description: 'Behavioral and technical questions with evaluation rubrics.', downloads: '2,840+ Downloads', icon: iconQuestions },
  { title: 'Recruitment SOP', format: 'DOCX + SOP BOARD', description: 'Standard operating procedure for high-growth hiring.', downloads: '3,110+ Downloads', icon: iconSop },
  { title: 'HR Policy Compliance Checklist', format: 'SPREADSHEET + PDF', description: 'Statutory compliance guide with templates and checklists.', downloads: '980+ Downloads', icon: iconCompliance },
  { title: 'Employee Onboarding Plan', format: 'INTERACTIVE NOTION', description: 'Day-1 to Day-90 roadmap for new joiners.', downloads: '1,950+ Downloads', icon: iconOnboarding },
  { title: 'Hiring Cost Calculator', format: 'EXCEL + SHEETS', description: 'Estimate cost-per-hire, time and in-house ROI.', downloads: '4,200+ Downloads', icon: iconCalculator },
] as const

export const MOCKUP_ALT = 'Preview of the Hiring Toolkit: an ATS toolkit list with Hiring Checklist, Interview Question Bank, Recruitment SOP and HR Policy Compliance, in front of printed template cards'

export const ARTICLES_HEAD = {
  eyebrow: 'INSIGHTS & ANALYSIS',
  title: 'Articles & Thought Leadership',
  searchPlaceholder: 'Search guides, strategies...',
}

export interface Article {
  /** label printed on the card */
  label: string
  /** filter pill this card belongs to (matched by the printed label) */
  category: Exclude<Category, 'All Resources'>
  date: string
  readTime: string
  title: string
  excerpt: string
  photo: string
}

export const ARTICLES: readonly Article[] = [
  { label: 'RECRUITMENT', category: 'Recruitment Strategies', date: 'Oct 15, 2026', readTime: '7 min read', title: '10 Proven Strategies for Faster Technical Hiring', excerpt: 'How elite engineering departments reduce time-to-hire by 45% without diluting candidate technical standards.', photo: photoRecruit },
  { label: 'HR & OPS', category: 'HR & People Ops', date: 'Oct 10, 2026', readTime: '9 min read', title: 'A Complete Executive Guide to Remote Employee Onboarding', excerpt: 'Building an unforgettable first-week experience that locks in 92% first-year retention across distributed squads.', photo: photoHrOps },
  { label: 'TALENT MARKET', category: 'Talent Market Intelligence', date: 'Oct 05, 2026', readTime: '11 min read', title: 'Emerging Shifts in AI & Cloud Architect Compensation', excerpt: 'Key insights into premium multipliers for generative AI practitioners, Kubernetes experts, and distributed database architects.', photo: photoTalent },
  { label: 'FOUNDER & SCALING', category: 'Founder & Scaling', date: 'Sep 28, 2026', readTime: '8 min read', title: 'Hiring Your Founding Engineer: Equity, Vetting, and Buy-in', excerpt: 'Critical heuristics for venture-backed founders seeking foundational builders capable of carrying early tech debt gracefully.', photo: photoFounder },
  { label: 'CANDIDATE GROWTH', category: 'Candidate Growth', date: 'Sep 19, 2026', readTime: '12 min read', title: 'Navigating High-Stakes System Design Interviews', excerpt: 'Frameworks for articulating fault tolerance, caching layers, and asynchronous messaging without getting bogged down in dogma.', photo: photoCandidate },
  { label: 'RECRUITMENT', category: 'Recruitment Strategies', date: 'Sep 12, 2026', readTime: '6 min read', title: 'RPO vs Contingency Search: Calculating Value at Scale', excerpt: 'An objective breakdown comparing dedicated embedded recruitment partners against ad-hoc fee-per-placement structures.', photo: photoRpo },
]

export const LEAD = {
  title: 'Get the Complete 2026 Tech Hiring Toolkit',
  description: 'Delivered straight to your inbox within seconds. Includes all 6 operational frameworks, salary indexes, and interview rubrics.',
  points: ['Zero spam. Instant access link delivered immediately.', 'Free quarterly updates as talent markets evolve.', 'Trusted by 4,500+ leaders across APAC tech.'],
  curated: 'Curated by certified technical headhunters',
  regions: ['IN', 'SG', 'AE'],
  formTitle: 'Claim Your Free Recruitment Pack',
  formDescription: 'Enter your professional details below to immediately unlock and download all asset files.',
  packages: ['Full 2026 Tech Hiring Toolkit (Recommended)', 'APAC Salary & Compensation Guide'],
  submit: 'Download 2026 Toolkit Now',
  /** The design shows only the closed selects: these option lists are assumptions, the PDF does not show them. */
  roles: ['Founder / CEO', 'HR / Talent Acquisition Lead', 'Engineering Manager', 'Recruiter', 'Other'],
  teamSizes: ['1 - 10 Engineers', '11 - 50 Engineers', '51 - 200 Engineers', '200+ Engineers'],
}

export const ADVISORY = {
  eyebrow: 'ENTERPRISE TALENT ADVISORY',
  title: 'Need personalized recruitment advisory for your team?',
  description: 'Talk to our senior talent strategists to formulate custom sourcing pipelines, salary benchmarks, and rapid deployment teams for critical engineering hires.',
  primary: 'Book Strategy Session',
  secondary: 'Explore Employer Solutions',
  photo: photoAdvisor,
  photoAlt: 'Senior talent strategist smiling at her desk',
}
