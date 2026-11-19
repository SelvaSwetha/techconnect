import Advisory from './Advisory'
import Articles from './Articles'
import Flagship from './Flagship'
import Footer from './Footer'
import { FilterBar, Hero } from './Hero'
import LeadMagnet from './LeadMagnet'
import Toolkits from './Toolkits'
import { useResourceFilters } from './useResourceFilters'

/** Single-column reflow (< 1024px) of the same sections and content as the 1440px design. */
export default function ResourcesMobile() {
  const f = useResourceFilters()
  return (
    <>
      <section id="res-hero" className="bg-[#0f0f11]">
        <Hero />
      </section>
      <section id="res-filters" className="border-b border-[#e5e7eb] bg-white">
        <FilterBar category={f.category} onCategory={f.setCategory} />
      </section>
      <section id="res-flagship" className="bg-[#f6f9fb] px-5 py-10 sm:px-8">
        <Flagship />
      </section>
      <section id="res-toolkits" className="bg-[#f6f9fb]">
        <Toolkits />
      </section>
      <section id="res-articles" className="bg-[#f6f9fb]">
        <Articles articles={f.articles} query={f.query} onQuery={f.setQuery} onReset={f.reset} filtered={f.filtered} />
      </section>
      <section id="res-lead" className="bg-[#f6f9fb] px-5 pb-10 sm:px-8">
        <LeadMagnet />
      </section>
      <section id="res-advisory" className="bg-[#f6f9fb] px-5 pb-10 sm:px-8">
        <Advisory />
      </section>
      <Footer />
    </>
  )
}
