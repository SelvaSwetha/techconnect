import { createContext, useContext } from 'react'
import { DOMAINS } from './jobsData'
import type { Job } from './jobsData'

export interface JobFilters {
  query: string
  domain: (typeof DOMAINS)[number]
}

/**
 * Domain chips of the design carry no job-to-domain data, so each chip matches on keywords found in the visible job
 * content (title, company, skills). This mapping is an inference and is listed as such in the reference map.
 */
const DOMAIN_KEYWORDS: Record<(typeof DOMAINS)[number], RegExp | null> = {
  'All Positions': null,
  'IT & Cloud': /cloud|devops|aws|kubernetes|terraform|ci\/cd/i,
  'AI & Machine Learning': /\bai\b|langchain|vector|machine learning/i,
  'FinTech & Backend': /fintech|backend|node\.js|golang|kafka|postgres/i,
  'Engineering Leadership': /manager|leadership|architecture/i,
}

export const matches = (j: Job, f: JobFilters) => {
  const hay = [j.title, j.company, j.location, j.exp, j.pay, j.mode, j.badge.label, ...j.tags].join(' ')
  const q = f.query.trim().toLowerCase()
  if (q && !q.split(/\s+/).every((w) => hay.toLowerCase().includes(w))) return false
  const re = DOMAIN_KEYWORDS[f.domain]
  return re ? re.test(hay) : true
}

export interface Ctx {
  filters: JobFilters
  setFilters: (f: JobFilters) => void
  jobs: Job[]
}
export const JobsStateContext = createContext<Ctx | null>(null)

export function useJobs() {
  const c = useContext(JobsStateContext)
  if (!c) throw new Error('useJobs must be used inside JobsProvider')
  return c
}
