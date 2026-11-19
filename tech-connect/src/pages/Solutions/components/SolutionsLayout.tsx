import type { ReactNode } from 'react'
import SolutionsFooter from './SolutionsFooter'

export default function SolutionsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="font-poppins">
      <div>{children}</div>
      <SolutionsFooter />
    </div>
  )
}
