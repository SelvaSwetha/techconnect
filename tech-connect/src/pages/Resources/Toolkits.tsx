import iconDownloadArrow from '../../assets/icons/resources/download-arrow.svg'
import iconDownloadTray from '../../assets/icons/resources/download-tray-red.svg'
import mockup from '../../assets/images/resources/toolkit-desk-mockup.png'
import { MOCKUP_ALT, TOOLKITS, TOOLKITS_HEAD } from './data'

/** Positions (page y 1389...1867, x 650...647) of the six ring markers on the dashed arc, in PDF coordinates. */
const DOTS: ReadonlyArray<readonly [number, number]> = [
  [650, 1389],
  [678, 1485],
  [690, 1581],
  [690, 1677],
  [674, 1773],
  [647, 1867],
]

/** Dashed curve with six ring markers between the desk mockup and the toolkit list (desktop only). */
function Arc() {
  return (
    <svg aria-hidden="true" className="absolute left-[480px] top-[200px] hidden lg:block" width={100} height={520} viewBox="608 1367 100 520" fill="none">
      <path d="M622 1408 C700 1520 715 1740 638 1860" stroke="#ff0000" strokeOpacity="0.55" strokeWidth="1" strokeDasharray="3 3" />
      {DOTS.map(([x, y]) => (
        <g key={y}>
          <circle cx={x} cy={y} r={6} fill="#ff0000" />
          <circle cx={x} cy={y} r={4.5} fill="#fff" />
          <circle cx={x} cy={y} r={2} fill="#ff0000" />
        </g>
      ))}
    </svg>
  )
}

/** Header, desk mockup, arc and the six downloadable toolkit rows. No toolkit files were provided, so the Download buttons are inert. */
export default function Toolkits() {
  return (
    <div className="relative px-5 pb-12 pt-10 sm:px-8 lg:h-full lg:px-12 lg:pb-0 lg:pt-[30px]">
      <div className="flex flex-col justify-between gap-3 lg:flex-row">
        <header>
          <p className="font-poppins text-[12px] font-bold uppercase leading-4 tracking-[0.6px] text-[red]">{TOOLKITS_HEAD.eyebrow}</p>
          <h2 className="font-poppins text-[26px] font-semibold leading-[1.25] text-[#111826] sm:text-[30px] lg:leading-[38px]">{TOOLKITS_HEAD.title}</h2>
          <p className="mt-[6px] font-poppins text-[14px] leading-[22px] text-[#4b5462]">{TOOLKITS_HEAD.description}</p>
        </header>
        <button
          type="button"
          title="The bundle file is not available yet"
          className="flex items-center gap-[6px] self-start pt-[2px] font-poppins text-[12px] font-bold leading-4 text-[red] transition-opacity hover:opacity-75 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[red] lg:mt-[56px] lg:self-auto"
        >
          {TOOLKITS_HEAD.bundle}
          <img src={iconDownloadTray} alt="" width={10.67} height={10.67} />
        </button>
      </div>

      <img src={mockup} alt={MOCKUP_ALT} width={490} height={620} className="mx-auto mt-10 h-auto w-full max-w-[490px] lg:absolute lg:left-0 lg:top-[143px] lg:mt-0 lg:w-[490px] lg:max-w-none [mask-image:linear-gradient(to_right,#000_88%,transparent),linear-gradient(to_bottom,transparent,#000_6%,#000_94%,transparent)] [mask-composite:intersect] [-webkit-mask-composite:source-in]" />
      <Arc />

      <ul className="m-0 mt-10 flex list-none flex-col gap-8 p-0 lg:absolute lg:left-[584px] lg:top-[190px] lg:mt-0 lg:w-[658px] lg:gap-[44px]">
        {TOOLKITS.map((t) => (
          <li key={t.title} className="flex flex-wrap items-center gap-x-4 gap-y-3 lg:flex-nowrap lg:gap-y-0">
            <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[#ffeae8] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]">
              <img src={t.icon} alt="" className="max-h-5 max-w-5" />
            </span>
            <div className="min-w-0 flex-1 lg:w-[300px] lg:flex-none">
              <div className="flex items-center gap-4">
                <h3 className="m-0 font-poppins text-[15px] font-semibold leading-6 text-[#030711]">{t.title}</h3>
                <span className="rounded-[4px] bg-[#f2f4f6] px-2 py-1 font-poppins text-[10px] font-medium uppercase leading-[14px] tracking-[0.5px] text-[#4b5462]">{t.format}</span>
              </div>
              <p className="m-0 font-poppins text-[12px] leading-[18px] text-[#6b7280]">{t.description}</p>
            </div>
            <div className="flex w-full items-center gap-3 pl-[64px] lg:-ml-[13px] lg:w-[170px] lg:pl-0">
              <span aria-hidden="true" className="size-[6px] shrink-0 rounded-full bg-[#9ca3af]" />
              <span aria-hidden="true" className="hidden h-px min-w-[38px] flex-1 bg-[#e5e7eb] lg:block" />
              <span className="whitespace-nowrap font-poppins text-[12px] leading-4 text-[#6b7280]">{t.downloads}</span>
            </div>
            <button
              type="button"
              title="The file is not available yet"
              aria-label={`Download ${t.title}`}
              className="ml-[64px] flex shrink-0 items-center gap-[6px] font-poppins text-[14px] font-semibold leading-5 text-[red] transition-opacity hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[red] lg:-ml-[5px]"
            >
              Download
              <img src={iconDownloadArrow} alt="" width={11.16} height={13.75} />
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
