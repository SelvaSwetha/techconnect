import iconHome from '../../assets/icons/about/about-Container.svg'
import iconArrowW12 from '../../assets/icons/about/about-Container1.svg'
import iconArrowW10 from '../../assets/icons/about/about-Container24.svg'
import iconArrowRed from '../../assets/icons/about/about-Container11.svg'
import iconBadge from '../../assets/icons/about/about-Container2.svg'
import iconCheckBadge from '../../assets/icons/about/about-Container23.svg'
import iconHires from '../../assets/icons/about/about-Container3.svg'
import iconClients from '../../assets/icons/about/about-Container4.svg'
import iconDomains from '../../assets/icons/about/about-Container5.svg'
import iconHubs from '../../assets/icons/about/about-Container6.svg'
import iconEthos from '../../assets/icons/about/about-Icon.svg'
import iconRigor from '../../assets/icons/about/about-Icon1.svg'
import iconShield24 from '../../assets/icons/about/about-SvgShieldIcon.svg'
import iconGauge from '../../assets/icons/about/about-SvgGaugeSpeedometerIcon.svg'
import iconTeam from '../../assets/icons/about/about-SvgTeamHumanFirstIcon.svg'
import iconTrend from '../../assets/icons/about/about-SvgTrendUpwardArrowIcon.svg'
import iconCode from '../../assets/icons/about/about-Container7.svg'
import iconFilter from '../../assets/icons/about/about-Container8.svg'
import iconRubrics from '../../assets/icons/about/about-Container9.svg'
import iconShield20 from '../../assets/icons/about/about-Container10.svg'
import iconChart from '../../assets/icons/about/about-SvgChartGrowthIcon.svg'
import iconUsers from '../../assets/icons/about/about-SvgUsersTeamGrowthIcon.svg'
import iconBulb from '../../assets/icons/about/about-SvgIdeaLightbulbIcon.svg'
import iconGlobe from '../../assets/icons/about/about-SvgGlobeIcon.svg'
import iconAlert from '../../assets/icons/about/about-Container12.svg'
import iconFork from '../../assets/icons/about/about-Container13.svg'
import iconOutcome from '../../assets/icons/about/about-Container14.svg'
import iconIt from '../../assets/icons/about/about-Container15.svg'
import iconSaas from '../../assets/icons/about/about-Container16.svg'
import iconFintech from '../../assets/icons/about/about-Container17.svg'
import iconHealth from '../../assets/icons/about/about-Container18.svg'
import iconEcom from '../../assets/icons/about/about-Container19.svg'
import iconLogistics from '../../assets/icons/about/about-Container20.svg'
import iconManufacturing from '../../assets/icons/about/about-Container21.svg'
import iconAi from '../../assets/icons/about/about-Container22.svg'
import iconBuilding from '../../assets/icons/about/about-SvgBuildingHqIcon.svg'
import iconTransfer from '../../assets/icons/about/about-SvgNetworkHubNodesIcon.svg'
import iconSkyscraper from '../../assets/icons/about/about-SvgSkyscraperFintechLandmarkIcon.svg'
import iconChevron from '../../assets/icons/about/about-Image.svg'
import ribbon from '../../assets/icons/about/values-ribbon.svg'
import photoHero from '../../assets/images/about/about-hero-office-woman.png'
import photoTeam from '../../assets/images/about/about-narrative-team.png'
import photoBoard from '../../assets/images/about/about-narrative-whiteboard.png'
import photoIndia from '../../assets/images/about/about-hub-india.png'
import photoApac from '../../assets/images/about/about-hub-apac.png'
import photoUae from '../../assets/images/about/about-hub-uae.png'
import leadershipComposite from '../../assets/images/about/about-leadership-composite.png'
import quote from './assets/provisional/about/icons/quote.svg'
import leadershipDecor from './assets/provisional/about/icons/leadership-decor.svg'
import hubArc from './assets/provisional/about/icons/hub-arc.svg'

export const ICON = {
  home: iconHome, arrowW12: iconArrowW12, arrowW10: iconArrowW10, arrowRed: iconArrowRed, badge: iconBadge, checkBadge: iconCheckBadge,
  ethos: iconEthos, rigor: iconRigor, chevron: iconChevron, quote, leadershipDecor, hubArc, ribbon,
  alert: iconAlert, fork: iconFork, outcome: iconOutcome,
}
export const PHOTO = { hero: photoHero, team: photoTeam, board: photoBoard, leadership: leadershipComposite }

export const HERO = {
  crumbHome: 'Home',
  crumbHere: 'About TechzConnect',
  pill: 'ENTERPRISE TALENT ARCHITECTS',
  title: ['People. Partnerships.', 'Progress.'],
  lead: ['We are a specialized recruitment firm bridging exceptional', 'engineering, product, and leadership talent with fast-scaling', 'global enterprises.'],
  primary: 'Book a Consultation',
  secondary: 'View Proven Impact',
  badgeTitle: 'Strategic Talent Orchestration',
  badgeSub: 'Specialized ICs to C-suite technical leaders',
}

export const STATS = [
  { value: '500+', label: 'Successful Tech Hires', icon: iconHires, tone: 'red' },
  { value: '120+', label: 'Enterprise Clients', icon: iconClients, tone: 'gray' },
  { value: '15+', label: 'Specialized Domains', icon: iconDomains, tone: 'red' },
  { value: '3+ Hubs', label: 'India, APAC & UAE', icon: iconHubs, tone: 'gray' },
] as const

export const NARRATIVE = {
  eyebrow: 'OUR NARRATIVE & FOUNDING',
  title: ['Moving beyond transactional', 'recruiting into high-trust', 'alignment.'],
  body: [
    'TechzConnect was established with a singular conviction: technology is only as',
    'transformative as the engineers, architects, and leaders who construct it. For',
    'over a decade, hyper-growth startups and mature conglomerates endured',
    'generic resume dumps and transactional staffing brokers.',
  ],
  kpis: [
    { value: '94.2%', label: 'First-Year Retention Rate', red: true },
    { value: '21 Days', label: 'Avg. Time-To-Offer', red: false },
  ],
  ethos: { title: 'Embedded Ethos', lines: ['We represent your employer brand', 'with meticulous technical integrity.'] },
  rigor: { title: 'Technical Rigor', lines: ['Curated by veteran engineering', 'heads, not entry-level keyword', 'screeners.'] },
}

export const VALUES = {
  eyebrow: 'GUIDING PRINCIPLES',
  title: 'The values that steer every placement',
  items: [
    { n: '01', title: 'Integrity First', icon: iconShield24, lines: ['Total transparency regarding', 'compensation expectations,', 'organizational runway, candidate fit', 'and timeline feasibility.'] },
    { n: '02', title: 'Speed with Precision', icon: iconGauge, lines: ['Agile sprints that deliver qualified', 'shortlists in days, without cutting', 'corners on technical assessment', 'or character references.'] },
    { n: '03', title: 'Human-First Rigor', icon: iconTeam, lines: ['Respectful candidate care that', 'elevates your reputation in tech', 'circles, treating every professional', 'as a long-term partner.'] },
    { n: '04', title: 'Long-Term Value', icon: iconTrend, lines: ['We gauge victory not on signed', 'offer sheets, but on code shipped,', 'architectural milestones', 'achieved, and multi-year tenure.'] },
  ],
}

export const ADVANTAGE = {
  eyebrow: 'ARCHITECTURAL ADVANTAGE',
  title: 'Why Top Enterprises Rely On Our Engine',
  sub: ['A bespoke recruitment engine engineered specifically to', 'eliminate hiring latency and mitigate technical mis-hires.'],
  cards: [
    { title: 'Domain Specialization', icon: iconCode, iw: 20, ih: 12, lines: ['Our practice leads possess', 'background experience in cloud,', 'AI/ML, distributed systems, and', 'modern SaaS infrastructure stacks.'], tag: 'ENGINEERING-LED SCREENING' },
    { title: 'Pre-Vetted Pipeline', icon: iconFilter, iw: 16, ih: 16, lines: ['Proprietary pool of over 45,000', 'passive engineering leaders, ready to', 'deploy into mission-critical', 'roadmaps on rapid notice.'], tag: 'HIGH-VELOCITY SHORTLISTS' },
    { title: 'Structured Rubrics', icon: iconRubrics, iw: 20, ih: 18, lines: ['Every candidate comes packaged', 'with a comprehensive dossier:', 'system design scorecards,', 'communication assessments, and', 'verified code repositories.'], tag: 'ZERO RESUME GUESSWORK' },
    { title: 'Retention Warranty', icon: iconShield20, iw: 16, ih: 20, lines: ['We stand firmly behind our matches', 'with a full 90-day replacement', 'guarantee and scheduled 30/60/90-', 'day sentiment check-ins.'], tag: '100% RISK MITIGATION' },
  ],
}

export const LEADERSHIP = {
  eyebrow: 'OUR LEADERSHIP',
  title: ['The mind shaping our', 'recruitment ecosystem'],
  lead: ['Seasoned recruitment executive and technologist who bridges', 'high-level corporate talent strategy with grounded engineering', 'realities.'],
  facts: [
    { title: '9+ years of experience', sub: 'Driving technology solutions and digital transformation.', icon: iconChart },
    { title: 'Led business growth', sub: 'Across diverse industries and global markets.', icon: iconUsers },
    { title: 'Specialist in consulting', sub: 'Data analytics, digital strategy and recruitment.', icon: iconBulb },
    { title: 'Global perspective', sub: 'Working with teams across India, Singapore and Dubai.', icon: iconGlobe },
  ],
  quote: ['Great talent builds', 'greater products.'],
  role: 'FOUNDER & CHIEF EXECUTIVE OFFICER',
  name: 'Sivaraj',
  bio: ['9+ years of experience driving technology', 'solutions, digital transformation, and business', 'growth across diverse industries. Founder and', 'business leader specializing in IT consulting,', 'data analytics, and digital strategy.'],
  link: 'View Track Record',
}

export const CASES = {
  eyebrow: 'PROVEN PRECEDENTS',
  title: 'Structured Case Studies',
  sub: ['How our talent engineering model executes under severe', 'timelines and uncompromising technical bars.'],
  tabs: ['Tier-1 SaaS Platform', 'FinTech Unicorn', 'Global Retail Enterprise GCC'],
  active: {
    tag: 'TIER-1 SAAS PLATFORM',
    title: ['Series C Cloud Infrastructure', 'Suite'],
    location: 'Location: Bangalore & Remote APAC',
    benchLabel: 'PRIMARY BENCHMARK',
    bench: '35 Hires in 90 Days',
    columns: [
      { label: 'THE CHALLENGE', icon: 'alert', color: '#ff0000', lines: ['Sudden customer scale', 'demanded rapid deployment', 'of 35 senior Full-Stack', '(Go/React) & Kubernetes', 'DevOps architects without', 'sacrificing system uptime or', 'code quality.'] },
      { label: 'OUR STRATEGY', icon: 'fork', color: '#ffffff', lines: ['Deployed an embedded 4-', 'person sourcing pod. Instituted', 'automated asynchronous', 'coding benchmarks and', 'conducted live system', 'architecture reviews alongside', 'internal engineering leads.'] },
      { label: 'THE OUTCOME', icon: 'outcome', color: '#f87171', lines: ['100% headcount fulfilled within', '84 calendar days. Achieved a', 'verified 96% first-year retention', 'rate with zero engineering', 'ramp-down.'] },
    ],
  },
}

export const DOMAINS = {
  eyebrow: 'CROSS-SECTOR FLUENCY',
  title: 'Global coverage across strategic domains',
  sub: ['Each domain operates under dedicated industry directors tracking vertical-specific engineering', 'standards.'],
  items: [
    { title: 'IT & Software', sub: 'Backend, Arch, DevOps', icon: iconIt },
    { title: 'SaaS & Cloud', sub: 'Product, PLG, Multi-tenant', icon: iconSaas },
    { title: 'FinTech & Banking', sub: 'Payments, Risk, Ledger', icon: iconFintech },
    { title: 'HealthTech', sub: 'HIPAA, EHR, Diagnostics', icon: iconHealth },
    { title: 'E-Commerce', sub: 'Marketplaces, Scale, Omni', icon: iconEcom },
    { title: 'Logistics & Ops', sub: 'Route Engine, WMS, Tracking', icon: iconLogistics },
    { title: 'Manufacturing', sub: 'IIoT, Robotics, Quality', icon: iconManufacturing },
    { title: 'AI & Data Intelligence', sub: 'LLMs, MLOps, Analytics', icon: iconAi },
  ],
}

export const FOOTPRINT = {
  eyebrow: 'OPERATIONAL FOOTPRINT',
  title: 'Cross-Border Hiring Delivery Infrastructure',
  legend: ['Global HQ', 'Regional Tech Pods'],
  hubs: [
    { n: '01', title: 'India Hub', place: ['Bangalore • Mumbai •', 'Hyderabad'], lines: ['Core engineering assessment', 'lab, sourcing center of', 'excellence, and specialized', 'evaluation pods.'], badge: 'HEADQUARTERS', hq: true, icon: iconBuilding, photo: photoIndia },
    { n: '02', title: 'APAC Hub', place: ['Marina Bay Financial Centre'], lines: ['High-touch regional C-level', 'search, fintech practice', 'advisory, and cross-border', 'relocation management.'], badge: 'SINGAPORE', hq: false, icon: iconTransfer, photo: photoApac },
    { n: '03', title: 'UAE Hub', place: ['DIFC Innovation Precinct'], lines: ['Sovereign fund and enterprise', 'talent, regional banking scale-', 'ups, and Web3 leadership', 'recruitment.'], badge: 'DUBAI', hq: false, icon: iconSkyscraper, photo: photoUae },
  ],
}

export const CTA = {
  eyebrow: 'NEXT STEP',
  title: ['Ready to build your high-', 'performance team?'],
  lead: ['Connect with our recruitment practice heads to analyze your current hiring', 'bottlenecks, technical requirements, and strategic roadmap.'],
  perks: ['72-Hour First Shortlist', '90-Day Placement Warranty', 'NDA Protected'],
  form: {
    title: 'Schedule Recruitment Strategy Call',
    sub: 'Speak directly with an Industry Practice Lead within 24 hours.',
    name: 'FULL NAME',
    namePh: 'e.g. Sarah Jenkins',
    email: 'WORK EMAIL',
    emailPh: 'name@company.com',
    phone: 'PHONE',
    phonePh: '+1 (555) 000-0000',
    focus: 'PRIMARY FOCUS',
    focusDefault: 'Software Engineering & Architecture',
    submit: 'Schedule Consultation',
  },
}
