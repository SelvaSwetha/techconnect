import step1 from '../../assets/icons/for-employers/step-1.svg'
import step1Metric from '../../assets/icons/for-employers/step-1-metric.svg'
import step2 from '../../assets/icons/for-employers/step-2.svg'
import step2Metric from '../../assets/icons/for-employers/step-2-metric.svg'
import step3 from '../../assets/icons/for-employers/step-3.svg'
import step3Metric from '../../assets/icons/for-employers/step-3-metric.svg'
import step4 from '../../assets/icons/for-employers/step-4.svg'
import step4Metric from '../../assets/icons/for-employers/step-4-metric.svg'
import audit1 from '../../assets/icons/for-employers/audit-1.svg'
import audit2 from '../../assets/icons/for-employers/audit-2.svg'
import audit3 from '../../assets/icons/for-employers/audit-3.svg'

/** Social-proof strip (Figma 255:9071): name, accent suffix, accent colour, letter-spacing. */
export const TRUSTED_BY = [
  { lead: 'SYNTH', accent: 'AI', accentColor: 'red', tracking: '-0.4px' },
  { lead: 'VERTEX', accent: 'SYS', accentColor: '#6b7280', tracking: '0.8px' },
  { lead: 'NEXUS', accent: 'CLOUD', accentColor: 'red', tracking: '-0.4px' },
  { lead: 'OCTA', accent: 'FIN', accentColor: '#6b7280', tracking: '1.6px' },
  { lead: 'AERODYNAMICS', accent: '', accentColor: 'red', tracking: '-0.4px' },
] as const

export interface Step {
  n: string
  icon: string
  title: readonly string[]
  body: readonly string[]
  metricIcon: string
  metricLabel: string
  metric: readonly string[]
  metricRed?: boolean
}

/** 4-step framework (Figma 257:10414). `title`/`body` hold the line breaks drawn in the 1440px frame. */
export const STEPS: readonly Step[] = [
  {
    n: '01', icon: step1, title: ['Requisition', 'Briefing & Scope', 'Definition'],
    body: ['Deconstruction of', 'technical architectures,', 'reporting lines, stack', 'dependencies, and key', 'deliverable milestones.'],
    metricIcon: step1Metric, metricLabel: 'Duration', metric: ['Within 24 Hours'],
  },
  {
    n: '02', icon: step2, title: ['Tailored Pipeline &', 'Tech Assessment'],
    body: ['Proprietary passive', 'candidate network', 'sourcing coupled with', 'rigorous blind coding', 'and architecture', 'evaluations.'],
    metricIcon: step2Metric, metricLabel: 'Velocity', metric: ['48 – 72 Hours'], metricRed: true,
  },
  {
    n: '03', icon: step3, title: ['Streamlined', 'Interviews &', 'Decision Support'],
    body: ['Calibrated dossier', 'submissions,', 'automated interview', 'synchronization,', 'comparative', 'assessment cards, and', 'offer advisory.'],
    metricIcon: step3Metric, metricLabel: 'Offer Ratio', metric: ['3:1 Offer Rate'],
  },
  {
    n: '04', icon: step4, title: ['Seamless', 'Onboarding &', 'Assurance'],
    body: ['Thorough background', 'verifications, workspace', 'readiness tracking,', 'backed by a', 'comprehensive 90-day', 'guarantee.'],
    metricIcon: step4Metric, metricLabel: 'Warranty', metric: ['90-Day', 'Guarantee'],
  },
]

/** Option lists are NOT shown in the design (only the default / placeholder text is): provisional, to be confirmed. */
export const INDUSTRIES = ['Software & SaaS', 'Fintech & Banking', 'Healthcare & Life Sciences', 'Manufacturing & Supply Chain', 'Retail & E-commerce', 'Other'] as const
export const COMPANY_SIZES = ['< 50 (Seed / Series A)', '50 – 200 (Series B / C)', '200 – 1,000', '1,000+'] as const
export const SENIORITY = ['Junior (0-2 yrs)', 'Mid-level (3-5 yrs)', 'Senior (6-10 yrs)', 'Lead / Principal (10+ yrs)', 'Executive'] as const
export const MODALITIES = ['Remote (Global/US)', 'Hybrid', 'On-site'] as const
export const ENGAGEMENT_CHOICES = ['Permanent', 'Contract', 'Pod / RPO'] as const
export const HERO_POSITIONS = ['1 - 3 roles', '4 - 10 roles', '10+ roles'] as const
export const HERO_TIMELINES = ['Immediate (<15d)', '15 - 30 days', '30+ days'] as const

/** Cost calculator (Figma 255:9148). Defaults $150,000 / 3 roles give the drawn $130,500 / $67,500 (29% / 15% of total comp). */
export const CALC = {
  salary: { min: 60000, max: 400000, step: 5000, initial: 150000 },
  roles: { min: 1, max: 25, step: 1, initial: 3 },
  inHouseRate: 0.29,
  podRate: 0.15,
  inHouseDays: 65,
  podDays: 18,
}

export const AUDIT_CHECKS = [
  { icon: audit1, w: 15, h: 17.75, title: 'Talent Density & Liquidity Map', body: 'Discover active vs. passive candidate volume across your specific tech stack.' },
  { icon: audit2, w: 12.75, h: 15.5, title: 'Compensation Parity Index', body: 'Benchmark base and equity offerings against 90th percentile industry hires.' },
  { icon: audit3, w: 15, h: 14.056, title: 'JD Conversion Optimization', body: 'Eliminate restrictive qualification blockers that discourage elite talent.' },
] as const

export interface Model {
  id: string
  tier: string
  name: string
  blurb: readonly string[]
  perks: readonly string[]
  bestFor: string
  choose: string
}

/** Engagement models (Figma 255:9560). */
export const MODELS: readonly Model[] = [
  {
    id: 'contingent', tier: 'STANDARD DIRECT-HIRE', name: 'Contingent Search',
    blurb: ['Zero upfront investment. Fees are', 'only due upon successful hire', 'completion with full guarantee', 'protection.'],
    perks: ['No initial commitment', 'Pre-screened dossiers', '90-Day guarantee warranty'], bestFor: 'Best for: 1-3 Individual Roles', choose: 'Choose Contingent',
  },
  {
    id: 'retained', tier: 'EXECUTIVE TIER', name: 'Retained Search',
    blurb: ['Dedicated partner focus for mission-', 'critical leadership, Principal', 'Architects, and C-suite roles.'],
    perks: ['Dedicated search director', 'Strict NDA confidentiality', '180-Day extended warranty'], bestFor: 'Best for: VP, CTO, Head of Eng', choose: 'Choose Retained',
  },
  {
    id: 'pods', tier: 'SCALE VELOCITY', name: 'Recruitment Pods',
    blurb: ['An embedded team of senior', 'technical recruiters, sourcers, and', 'coordinators working directly in your', 'ATS.'],
    perks: ['Flat monthly predictable cost', 'Slack & ATS integrated', 'Unlimited volume capacity'], bestFor: 'Best for: 5 - 25+ Roles / Quarter', choose: 'Choose Pods',
  },
  {
    id: 'contract', tier: 'AGILE CAPACITY', name: 'Contract Staffing',
    blurb: ['Swift deployment of specialized', 'individual contributors or squads for', 'project deadlines and migration', 'surges.'],
    perks: ['Deploy within 5 business days', 'Full payroll & compliance handle', 'Contract-to-hire option'], bestFor: 'Best for: 3-12 Month Projects', choose: 'Choose Contract',
  },
]

/**
 * FAQ and bottom CTA copy (Figma 255:9251 / 255:9681) could NOT be read: the Figma MCP Starter-plan call limit was
 * reached before those two nodes were fetched. Fill these from the nodes' design context; each section renders only
 * when filled (the frame draws 4 FAQ items, question widths 497 / 531 / 567 / 496 px at 14px).
 */
export const FAQ = {
  eyebrow: '',
  heading: '',
  intro: '',
  items: [] as { question: string; answer: string }[],
}
export const CTA = { heading: '', sub: '', button: '', href: '#requisition' }
export const hasFaq = FAQ.items.length > 0
export const hasCta = Boolean(CTA.heading && CTA.button)

export const FOOTER = {
  about: ['The authoritative enterprise', 'recruitment ecosystem', 'orchestrating high-velocity', 'placements between top tech', 'innovators and market leaders.'],
  columns: [
    { title: 'CANDIDATE HUB', links: ['Explore All Jobs', 'Tech Salary Calculator', 'Candidate Verification', 'Career Advisory', 'Interview Preparation'] },
    { title: 'FOR EMPLOYERS', links: ['Executive Headhunting', 'Dedicated Talent Teams', 'Recruitment Process Outsourcing', 'Contract & Direct Hire', 'Client Portal Access'] },
    { title: 'RESOURCES', links: ['Market Insights & Trends', 'Hiring Benchmark Index', 'Technical Assessment Guides', 'Whitepapers & Reports', 'Customer Case Studies'] },
    { title: 'COMPANY', links: ['About TechzConnect', 'How We Work', 'Global Industries', 'Leadership & Governance', 'Contact Relations'] },
  ],
  legal: ['Privacy Policy', 'Terms of Service', 'Security & Compliance', 'Cookie Preferences'],
}
