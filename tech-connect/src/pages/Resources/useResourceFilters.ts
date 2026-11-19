import { useMemo, useState } from 'react'
import { ALL, ARTICLES } from './data'
import type { Category } from './data'

/** Category pill + live search shared by the filter bar and the article grid. */
export function useResourceFilters() {
  const [category, setCategory] = useState<Category>(ALL)
  const [query, setQuery] = useState('')
  const articles = useMemo(() => {
    const q = query.trim().toLowerCase()
    return ARTICLES.filter((a) => (category === ALL || a.category === category) && (!q || [a.title, a.excerpt, a.label, a.category].some((t) => t.toLowerCase().includes(q))))
  }, [category, query])
  const filtered = category !== ALL || query.trim() !== ''
  const reset = () => {
    setCategory(ALL)
    setQuery('')
  }
  return { category, setCategory, query, setQuery, articles, filtered, reset }
}
