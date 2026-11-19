import iconArrow from '../../assets/icons/resources/arrow-right-red.svg'
import iconSearch from '../../assets/icons/resources/search.svg'
import { ARTICLES_HEAD } from './data'
import type { Article } from './data'

interface Props {
  articles: readonly Article[]
  query: string
  onQuery: (q: string) => void
  onReset: () => void
  /** true when a category or a search term narrows the list */
  filtered: boolean
}

/** Articles & Thought Leadership: header with live search, then the 3-column card grid (432x418 cards, 24px gap). */
export default function Articles({ articles, query, onQuery, onReset, filtered }: Props) {
  return (
    <div className="px-5 pb-12 pt-10 sm:px-8 lg:px-12 lg:pb-0 lg:pt-[29px]">
      <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
        <header>
          <p className="font-poppins text-[12px] font-bold uppercase leading-4 tracking-[0.6px] text-[red]">{ARTICLES_HEAD.eyebrow}</p>
          <h2 className="font-poppins text-[26px] font-semibold leading-[1.25] text-[#111826] sm:text-[30px] lg:mt-[3px] lg:leading-[38px]">{ARTICLES_HEAD.title}</h2>
        </header>
        <form role="search" onSubmit={(e) => e.preventDefault()} className="relative w-full lg:mb-[3px] lg:w-[320px]">
          <label htmlFor="res-search" className="sr-only">
            Search articles
          </label>
          <img src={iconSearch} alt="" width={13.5} height={13.5} className="pointer-events-none absolute left-[14px] top-[13px]" />
          <input
            id="res-search"
            type="search"
            value={query}
            onChange={(e) => onQuery(e.target.value)}
            placeholder={ARTICLES_HEAD.searchPlaceholder}
            autoComplete="off"
            className="h-[39px] w-full rounded-[8px] border border-[#e5e7eb] bg-white pl-[41px] pr-3 font-poppins text-[12px] text-[#111826] outline-none transition-colors placeholder:text-[#6b7280] focus:border-[red]"
          />
        </form>
      </div>

      <p role="status" aria-live="polite" className="sr-only">
        {articles.length} {articles.length === 1 ? 'article' : 'articles'} shown
      </p>

      {articles.length ? (
        <ul className="m-0 mt-8 grid list-none grid-cols-1 gap-6 p-0 sm:grid-cols-2 lg:mt-[26px] lg:grid-cols-3">
          {articles.map((a) => (
            <li key={a.title} className="group flex flex-col overflow-hidden rounded-[16px] border border-[#e5e7eb] bg-white shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] transition-shadow hover:shadow-[0px_10px_20px_-8px_rgba(0,0,0,0.15)] lg:h-[418px]">
              <div className="relative h-[193px] shrink-0 overflow-hidden">
                <img src={a.photo} alt="" className="size-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <span className="absolute left-3 top-3 rounded-[4px] bg-white px-[10px] py-[5px] font-poppins text-[11px] font-bold uppercase leading-4 tracking-[0.55px] text-[red]">{a.label}</span>
              </div>
              <article className="flex flex-1 flex-col p-6 pb-[22px]">
                <p className="m-0 flex items-center gap-2 font-poppins text-[11px] leading-4 text-[#9ca3af]">
                  <span>{a.date}</span>
                  <span aria-hidden="true">&bull;</span>
                  <span>{a.readTime}</span>
                </p>
                <h3 className="m-0 mt-[10px] max-w-[340px] font-poppins text-[16px] font-semibold leading-[22px] text-[#111826]">{a.title}</h3>
                <p className="m-0 mt-2 max-w-[340px] font-poppins text-[12px] leading-[19.5px] text-[#4b5462]">{a.excerpt}</p>
                {/* article detail pages are not part of the design: the link is an inert button */}
                <button
                  type="button"
                  title="The article page is not available yet"
                  className="mt-5 flex items-center gap-[6px] self-start font-poppins text-[12px] font-semibold leading-4 text-[red] transition-opacity hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[red] lg:mt-auto"
                >
                  Read Article
                  <span className="sr-only">: {a.title}</span>
                  <img src={iconArrow} alt="" width={10.67} height={10.67} className="transition-transform group-hover:translate-x-0.5" />
                </button>
              </article>
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-8 rounded-[16px] border border-dashed border-[#d1d5db] bg-white px-6 py-12 text-center lg:mt-[29px]">
          <p className="m-0 font-poppins text-[16px] font-semibold text-[#111826]">No articles match your search.</p>
          <p className="m-0 mt-1 font-poppins text-[12px] leading-5 text-[#6b7280]">Try a different keyword or category.</p>
          {filtered ? (
            <button type="button" onClick={onReset} className="mt-4 h-9 rounded-[8px] bg-[red] px-5 font-poppins text-[12px] font-semibold text-white hover:brightness-110">
              Show all articles
            </button>
          ) : null}
        </div>
      )}
    </div>
  )
}
