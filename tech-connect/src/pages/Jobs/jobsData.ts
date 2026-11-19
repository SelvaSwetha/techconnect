import job1 from './assets/icons/job1.svg'
import job2 from './assets/icons/job2.svg'
import job3 from './assets/icons/job3.svg'
import job4 from './assets/icons/job4.svg'
import job5 from './assets/icons/job5.svg'
import job6 from './assets/icons/job6.svg'

/** Job openings exactly as shown in the design (Jobs page, "Curated Job Openings"). */
export interface Job {
  id: string
  title: string
  badge: { label: string; tone: 'red' | 'green' | 'blue' | 'purple' | 'amber' }
  company: string
  location: string
  exp: string
  pay: string
  tags: string[]
  mode: string
  posted: string
  deadline: string
  icon: string
}

export const JOBS: Job[] = [
  { id: 'j1', title: 'Senior Backend Engineer (Node.js/Go)', badge: { label: 'URGENT', tone: 'red' }, company: 'FinTech Scaleup', location: 'Bangalore', exp: '5-8 Yrs Exp', pay: '₹28 - 40 LPA', tags: ['Node.js', 'Golang', 'PostgreSQL', 'Kafka'], mode: 'Hybrid', posted: 'Posted 1 day ago', deadline: 'Deadline: 25 May', icon: job1 },
  { id: 'j2', title: 'Staff Product Designer (UI/UX)', badge: { label: '100% REMOTE', tone: 'green' }, company: 'Enterprise SaaS', location: 'Remote (India / APAC)', exp: '8+ Yrs Exp', pay: '₹24 - 35 LPA', tags: ['Figma', 'Design Systems', 'User Research', 'B2B Dashboards'], mode: 'Remote', posted: 'Posted 2 days ago', deadline: 'Deadline: 30 May', icon: job2 },
  { id: 'j3', title: 'Cloud & DevOps Architect (AWS / K8s)', badge: { label: 'TIER-1 PARTNER', tone: 'blue' }, company: 'Global IT Services', location: 'Hyderabad', exp: '8+ Yrs Exp', pay: '₹35 - 50 LPA', tags: ['AWS', 'Kubernetes', 'Terraform', 'CI/CD'], mode: 'Hybrid', posted: 'Posted 3 days ago', deadline: 'Deadline: 28 May', icon: job3 },
  { id: 'j4', title: 'Full Stack Engineer (React / Python AI)', badge: { label: 'SERIES-A FUNDED', tone: 'purple' }, company: 'Generative AI Startup', location: 'Pune', exp: '2-5 Yrs Exp', pay: '₹18 - 28 LPA', tags: ['React.js', 'FastAPI', 'Vector DB', 'LangChain'], mode: 'On-site', posted: 'Posted 4 days ago', deadline: 'Deadline: 02 Jun', icon: job4 },
  { id: 'j5', title: 'Engineering Manager - Core Platforms', badge: { label: 'LEADERSHIP TRACK', tone: 'amber' }, company: 'Global Unicorn', location: 'Bangalore', exp: '10+ Yrs Exp', pay: '₹45 - 65 LPA', tags: ['People Leadership', 'Distributed Systems', 'Architecture'], mode: 'Hybrid', posted: 'Posted 5 days ago', deadline: 'Deadline: 15 Jun', icon: job5 },
  { id: 'j6', title: 'QA Automation Lead (Playwright / Java)', badge: { label: '100% REMOTE', tone: 'green' }, company: 'Product Enterprise', location: 'Remote', exp: '5-8 Yrs Exp', pay: '₹20 - 30 LPA', tags: ['Playwright', 'Java', 'Selenium', 'API Testing'], mode: 'Remote', posted: 'Posted 6 days ago', deadline: 'Deadline: 05 Jun', icon: job6 },
]

export const DOMAINS = ['All Positions', 'IT & Cloud', 'AI & Machine Learning', 'FinTech & Backend', 'Engineering Leadership'] as const
