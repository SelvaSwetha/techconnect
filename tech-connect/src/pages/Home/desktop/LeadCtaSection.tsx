import SectionCanvas from '../../../components/SectionCanvas'
import HiringEnquiryForm from '../../../components/hiring-form/HiringEnquiryForm'

/** Figma 202:4483 — y 6882–7292 (height extended to fit the functional form) */
export default function LeadCtaSection() {
  return (
    <SectionCanvas id="contact" height={610} className="bg-black">
      <div className="contents">
      {/* 202:4721 */}
        <div className="absolute bg-black h-[610px] left-0 top-[0px] w-[1440px]" />
      {/* 202:4722 */}
        <p className="[word-break:break-word] absolute font-poppins font-bold leading-[normal] left-[78px] not-italic text-[#ff4040] text-[11px] text-left top-[60px] w-[400px]">{`LET'S BUILD YOUR NEXT TEAM`}</p>
      {/* 202:4723 */}
        <p className="[word-break:break-word] absolute font-poppins font-bold leading-[48px] left-[78px] not-italic text-[40px] text-left text-white top-[90px] w-[620px]">
          Ready to build your team?
        </p>
      {/* 202:4724 */}
        <p className="[word-break:break-word] absolute font-poppins font-normal leading-[23px] left-[78px] not-italic text-[#ccc] text-[15px] text-left top-[155px] w-[560px]">
          Tell us what you need to hire. We’ll help you identify the right next step.
        </p>
      {/* 202:4725 */}
        <a href="#contact" className="absolute cursor-pointer transition duration-200 hover:brightness-110 bg-[red] h-[46px] left-[78px] rounded-[7px] top-[230px] w-[240px]" ></a>
      {/* 202:4726 */}
        <p className="-translate-x-1/2 [word-break:break-word] absolute pointer-events-none font-poppins font-semibold leading-[normal] left-[198px] not-italic text-[13px] text-center text-white top-[243px] w-[216px]">
          Submit Hiring Requirement
        </p>
      {/* 202:4727 */}
        <a href="#contact" className="absolute cursor-pointer transition duration-200 hover:border-white bg-black border border-[#7a7a7a] border-solid h-[46px] left-[340px] rounded-[7px] top-[230px] w-[190px]" ></a>
      {/* 202:4728 */}
        <p className="-translate-x-1/2 [word-break:break-word] absolute pointer-events-none font-poppins font-semibold leading-[normal] left-[435px] not-italic text-[13px] text-center text-white top-[243px] w-[166px]">
          Book Consultation
        </p>
      {/* 202:4729 */}
        <div className="absolute bg-white h-[520px] left-[800px] rounded-[12px] top-[45px] w-[535px]" />
      {/* 202:4730 */}
        <p className="[word-break:break-word] absolute font-poppins font-bold leading-[normal] left-[830px] not-italic text-[#0f0f12] text-[23px] text-left top-[72px] w-[440px]">
          Start a hiring conversation
        </p>
      {/* 202:4731 */}
        <p className="[word-break:break-word] absolute font-poppins font-normal leading-[normal] left-[830px] not-italic text-[#5e6166] text-[12px] text-left top-[108px] w-[430px]">
          Share a few details and our team can follow up.
        </p>
      {/* 202:4732–4743: fields + submit replaced by the functional form (same input/button styling) */}
        <div className="absolute left-[830px] top-[150px] w-[475px]">
          <HiringEnquiryForm variant="desktop" />
        </div>
      </div>
    </SectionCanvas>
  )
}
