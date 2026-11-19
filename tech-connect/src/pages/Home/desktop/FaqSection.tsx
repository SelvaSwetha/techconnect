import SectionCanvas from '../../../components/SectionCanvas'
import AccordionItem from '../../../components/Accordion'
import { FAQS } from '../faqData'

/** Figma 202:4483 — y 7292–7822 */
export default function FaqSection() {
  return (
    <SectionCanvas id="faq" height={530} className="bg-white">
      <div className="contents">
      {/* 202:4744 */}
        <p className="[word-break:break-word] absolute font-poppins font-bold leading-[normal] left-[78px] not-italic text-[11px] text-[red] text-left top-[70px] w-[1000px]">
          FREQUENTLY ASKED QUESTIONS
        </p>
      {/* 202:4745 */}
        <div className="[word-break:break-word] absolute font-poppins font-bold leading-[0] left-[78px] not-italic text-[#0f0f12] text-[34px] text-left top-[100px] w-[560px]">
          <p className="leading-[42px] mb-0">A few things you may want</p>
          <p className="leading-[42px]">to know before we begin.</p>
        </div>
      {/* 202:4746–4757: four cards, 640px wide, 16px apart. Accordion; open by default as in Figma (card = 86px when open). */}
        <div className="absolute left-[690px] top-[80px] flex w-[640px] flex-col gap-[16px]">
          {FAQS.map(([q, a]) => (
            <AccordionItem
              key={q}
              defaultOpen
              question={q}
              className="rounded-[8px] border border-solid border-[#e0e0e0] bg-white px-[19px] pb-[11px] pt-[14px] data-[open=true]:min-h-[86px]"
              buttonClassName="font-poppins text-[14px] font-semibold leading-[21px] text-[#0f0f12] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[red]"
              answerClassName="pt-[6px] font-poppins text-[11px] font-normal leading-[16px] text-[#5e6166] max-w-[570px]"
            >
              {a}
            </AccordionItem>
          ))}
        </div>
      </div>
    </SectionCanvas>
  )
}
