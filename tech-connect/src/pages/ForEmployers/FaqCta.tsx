import AccordionItem from '../../components/Accordion'
import { CTA, FAQ } from './data'

/** INTERACTIVE FAQ ACCORDION (Figma 255:9251): 768px column, 672px items, 12px gaps. */
export function Faq() {
  return (
    <div className="mx-auto flex max-w-[768px] flex-col gap-10 px-5 sm:px-8 lg:px-12">
      <div className="flex flex-col items-center text-center">
        <p className="font-poppins text-[12px] font-semibold uppercase leading-[16px] tracking-[0.6px] text-[red]">{FAQ.eyebrow}</p>
        <h2 className="pt-1 font-poppins text-[26px] font-semibold leading-[36px] tracking-[-0.75px] text-[#191c1e] sm:text-[30px]">{FAQ.heading}</h2>
        <p className="pt-1 font-poppins text-[14px] leading-[20px] text-[#4b5563]">{FAQ.intro}</p>
      </div>
      <div className="flex flex-col gap-3">
        {FAQ.items.map((it) => (
          <AccordionItem
            key={it.question}
            question={it.question}
            className="rounded-[8px] border border-[#e5e7eb] bg-white"
            buttonClassName="px-5 py-[16px] font-poppins text-[14px] font-medium leading-[20px] text-[#111827]"
            answerClassName="px-5 pb-4 font-poppins text-[13px] leading-[21px] text-[#4b5563]"
          >
            {it.answer}
          </AccordionItem>
        ))}
      </div>
    </div>
  )
}

/** BOTTOM CALL TO ACTION STRIP (Figma 255:9681): solid red band, headline left, link right. */
export function CtaStrip() {
  return (
    <div className="mx-auto flex max-w-[1440px] flex-col items-start justify-between gap-6 px-5 sm:px-8 lg:h-full lg:flex-row lg:items-center lg:px-12">
      <div>
        <h2 className="font-poppins text-[26px] font-semibold leading-[36px] tracking-[-0.75px] text-white sm:text-[30px]">{CTA.heading}</h2>
        <p className="pt-1 font-poppins text-[14px] leading-[20px] text-white">{CTA.sub}</p>
      </div>
      <a href={CTA.href} className="flex h-10 shrink-0 items-center rounded-[8px] bg-white px-7 font-poppins text-[12px] font-semibold leading-[16px] text-[red] shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1)] transition hover:brightness-95">
        {CTA.button}
      </a>
    </div>
  )
}
