import { useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { JOBS } from './jobsData'
import { JobsStateContext, matches } from './jobsState'
import type { JobFilters } from './jobsState'

export function JobsProvider({ children }: { children: ReactNode }) {
  const [filters, setFilters] = useState<JobFilters>({ query: '', domain: 'All Positions' })
  const value = useMemo(() => ({ filters, setFilters, jobs: JOBS.filter((j) => matches(j, filters)) }), [filters])
  return <JobsStateContext.Provider value={value}>{children}</JobsStateContext.Provider>
}
