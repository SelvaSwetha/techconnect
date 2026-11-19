import SectionCanvas from '../../../components/SectionCanvas'
import { imgHeroImageHdBusinessTeam } from '../assets'

/** Figma 202:4483 — y 92–742 */
export default function Hero() {
  return (
    <SectionCanvas id="hero" height={650} className="bg-black">
      {/* 202:4497 */}
      <div className="absolute bg-black h-[650px] left-0 top-[0px] w-[1440px]" />
      {/* 202:4498 */}
      <p className="[word-break:break-word] absolute font-poppins font-bold leading-[normal] left-[78px] not-italic text-[#ff3d3d] text-[11px] text-left top-[66px] w-[540px]">{`STRATEGIC TALENT & WORKFORCE SOLUTIONS`}</p>
      {/* 202:4499 */}
      <div className="[word-break:break-word] absolute font-poppins font-bold leading-[0] left-[78px] not-italic text-[62px] text-left text-white top-[105px] tracking-[-1.4px] w-[650px]">
        <p className="leading-[70px] mb-0">Build the Team</p>
        <p className="leading-[70px] mb-0">That Moves Your</p>
        <p className="leading-[70px]">Business Forward.</p>
      </div>
      {/* 202:4500 */}
      <p className="[word-break:break-word] absolute font-poppins font-normal leading-[28px] left-[80px] not-italic text-[#d6d6d6] text-[18px] text-left top-[323px] w-[540px]">
        Strategic recruitment, staffing and HR solutions for growing businesses. Find the right people, build stronger teams, and scale with confidence.
      </p>
      {/* 202:4501 */}
      <a href="#contact" className="absolute cursor-pointer transition duration-200 hover:brightness-110 bg-[red] h-[46px] left-[80px] rounded-[7px] shadow-[0px_6px_18px_0px_rgba(255,0,0,0.24)] top-[443px] w-[142px]" ></a>
      {/* 202:4502 */}
      <p className="-translate-x-1/2 [word-break:break-word] absolute pointer-events-none font-poppins font-semibold leading-[normal] left-[151px] not-italic text-[13px] text-center text-white top-[456px] w-[118px]">
        Hire Talent
      </p>
      {/* 202:4503 */}
      <a href="#contact" className="absolute cursor-pointer transition duration-200 hover:border-white bg-black border border-[#7a7a7a] border-solid h-[46px] left-[238px] rounded-[7px] top-[443px] w-[185px]" ></a>
      {/* 202:4504 */}
      <p className="-translate-x-1/2 [word-break:break-word] absolute pointer-events-none font-poppins font-semibold leading-[normal] left-[330.5px] not-italic text-[13px] text-center text-white top-[456px] w-[161px]">
        Book Consultation
      </p>
      {/* 202:4505 */}
      <p className="[word-break:break-word] absolute font-poppins font-medium leading-[normal] left-[80px] not-italic text-[#b8b8b8] text-[12px] text-left top-[533px] w-[650px] whitespace-pre-wrap">{`PERMANENT HIRING   ·   CONTRACT STAFFING   ·   RPO   ·   EXECUTIVE SEARCH`}</p>
      {/* 202:4506 */}
      <div className="absolute bg-[red] h-[428px] left-[845px] rounded-[18px] top-[65px] w-[477px]" />
      {/* 202:4507 */}
      <div className="absolute bg-[#1f1f21] border border-[#3d3d3d] border-solid h-[442px] left-[825px] rounded-[16px] shadow-[0px_16px_34px_0px_rgba(255,0,0,0.18)] top-[46px] w-[492px]" />
      {/* 202:4508 */}
      <div className="absolute h-[308px] left-[842px] rounded-[10px] top-[63px] w-[458px]">
        <img alt="Hero Image HD Business Team" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[10px] size-full" src={imgHeroImageHdBusinessTeam} />
      </div>
      {/* 202:4509 */}
      <div className="absolute bg-[#4d4d4f] h-px left-[842px] top-[390px] w-[458px]" />
      {/* 202:4510 */}
      <p className="[word-break:break-word] absolute font-poppins font-bold leading-[normal] left-[846px] not-italic text-[30px] text-left text-white top-[408px] w-[60px]">
        01
      </p>
      {/* 202:4511 */}
      <p className="[word-break:break-word] absolute font-poppins font-medium leading-[normal] left-[846px] not-italic text-[#c9c9c9] text-[11px] text-left top-[448px] w-[130px]">
        REQUIREMENT-LED
      </p>
      {/* 202:4512 */}
      <p className="[word-break:break-word] absolute font-poppins font-bold leading-[normal] left-[1004px] not-italic text-[30px] text-left text-white top-[408px] w-[60px]">
        02
      </p>
      {/* 202:4513 */}
      <p className="[word-break:break-word] absolute font-poppins font-medium leading-[normal] left-[1004px] not-italic text-[#c9c9c9] text-[11px] text-left top-[448px] w-[170px]">
        STRUCTURED SCREENING
      </p>
      {/* 202:4514 */}
      <p className="[word-break:break-word] absolute font-poppins font-bold leading-[normal] left-[1192px] not-italic text-[30px] text-left text-white top-[408px] w-[60px]">
        03
      </p>
      {/* 202:4515 */}
      <p className="[word-break:break-word] absolute font-poppins font-medium leading-[normal] left-[1192px] not-italic text-[#c9c9c9] text-[11px] text-left top-[448px] w-[125px]">
        HIRING PARTNERSHIP
      </p>
    </SectionCanvas>
  )
}
