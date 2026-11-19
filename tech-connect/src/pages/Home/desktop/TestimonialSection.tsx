import SectionCanvas from '../../../components/SectionCanvas'

/** Figma 202:4483 — y 6607–6882 */
export default function TestimonialSection() {
  return (
    <SectionCanvas id="testimonial" height={275} className="bg-white">
      <div className="contents">
      {/* 202:4715 */}
        <p className="[word-break:break-word] absolute font-poppins font-bold leading-[normal] left-[78px] not-italic text-[11px] text-[red] text-left top-[0px] w-[1000px]">
          CLIENT PERSPECTIVE
        </p>
      {/* 202:4716 */}
        <div className="[word-break:break-word] absolute font-poppins font-bold leading-[0] left-[78px] not-italic text-[#0f0f12] text-[36px] text-left top-[30px] w-[620px]">
          <p className="leading-[44px] mb-0">Partnership is built through</p>
          <p className="leading-[44px]">reliable hiring experiences.</p>
        </div>
      {/* 202:4717 */}
        <div className="absolute bg-white border border-[#e0e0e0] border-solid h-[185px] left-[760px] rounded-[12px] top-[35px] w-[570px]" />
      {/* 202:4718 */}
        <p className="[word-break:break-word] absolute font-poppins font-bold leading-[normal] left-[788px] not-italic text-[48px] text-[red] text-left top-[49px] w-[42px]">
          “
        </p>
      {/* 202:4719 */}
        <p className="[word-break:break-word] absolute font-poppins font-semibold leading-[26px] left-[830px] not-italic text-[#0f0f12] text-[16px] text-left top-[70px] w-[455px]">
          Add an approved client testimonial here, supported by a verified name, role and company permission.
        </p>
      {/* 202:4720 */}
        <p className="[word-break:break-word] absolute font-poppins font-medium leading-[normal] left-[830px] not-italic text-[#5e6166] text-[10px] text-left top-[155px] w-[430px] whitespace-pre-wrap">{`CLIENT NAME  ·  DESIGNATION  ·  COMPANY`}</p>
      </div>
    </SectionCanvas>
  )
}
