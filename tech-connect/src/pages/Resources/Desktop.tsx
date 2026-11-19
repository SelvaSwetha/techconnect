import type { ReactNode } from 'react'
import SectionCanvas from '../../components/SectionCanvas'
import Advisory from './Advisory'
import Articles from './Articles'
import Flagship from './Flagship'
import Footer from './Footer'
import { FilterBar, Hero } from './Hero'
import LeadMagnet from './LeadMagnet'
import Toolkits from './Toolkits'
import { useResourceFilters } from './useResourceFilters'

/** Content of one band on the 1440px canvas (the section scales as a whole between 1024 and 1440px). */
function Canvas({ className = '', children }: { className?: string; children: ReactNode }) {
  return <div className={`absolute left-0 top-0 w-[1440px] ${className}`}>{children}</div>
}

/** Rows of 418px cards + 24px gaps, plus the header (see Articles) and the 33px band padding. */
const articlesHeight = (count: number) => 145 + (count ? Math.ceil(count / 3) * 442 - 24 : 188)

/**
 * 1440px layout of Resources, built from the Drive PDF export (08_Resources.pdf, 1568px sheet with a 128px side margin):
 * PDF x = canvas x + 128, PDF y = canvas y. PROVISIONAL, not verified against Figma 263:14245.
 */
export default function ResourcesDesktop() {
  const f = useResourceFilters()
  return (
    <>
      <SectionCanvas id="res-hero" height={400} className="bg-[#0f0f11]">
        <Canvas>
          <Hero />
        </Canvas>
      </SectionCanvas>
      <SectionCanvas id="res-filters" height={61.5} className="border-b border-[#e5e7eb] bg-white">
        <Canvas>
          <FilterBar category={f.category} onCategory={f.setCategory} />
        </Canvas>
      </SectionCanvas>
      <SectionCanvas id="res-flagship" height={614} className="bg-[#f6f9fb]">
        <Canvas className="px-12 pt-12">
          <Flagship />
        </Canvas>
      </SectionCanvas>
      <SectionCanvas id="res-toolkits" height={838} className="bg-[#f6f9fb]">
        <Canvas className="h-[838px]">
          <Toolkits />
        </Canvas>
      </SectionCanvas>
      <SectionCanvas id="res-articles" height={articlesHeight(f.articles.length)} className="bg-[#f6f9fb]">
        <Canvas>
          <Articles articles={f.articles} query={f.query} onQuery={f.setQuery} onReset={f.reset} filtered={f.filtered} />
        </Canvas>
      </SectionCanvas>
      <SectionCanvas id="res-lead" height={538} className="bg-[#f6f9fb]">
        <Canvas className="px-12 pt-[30px]">
          <LeadMagnet />
        </Canvas>
      </SectionCanvas>
      <SectionCanvas id="res-advisory" height={362} className="bg-[#f6f9fb]">
        <Canvas className="px-12 pt-8">
          <Advisory />
        </Canvas>
      </SectionCanvas>
      <SectionCanvas id="res-footer" height={417.92} className="bg-[#111315]">
        <Canvas>
          <Footer />
        </Canvas>
      </SectionCanvas>
    </>
  )
}
