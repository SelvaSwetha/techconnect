import { ENQUIRY_HREF } from '../data'

/** "Start a conversation" black band shared by every Solutions page (text verbatim from the Overview PDF). */
export default function CtaBand() {
  return (
    <section className="w-full bg-black">
      <div className="relative mx-auto h-[300px] w-[1440px] max-w-full">
        <p className="absolute left-[78px] top-[60px] font-poppins text-[10px] font-bold text-[#ff3838]">START A CONVERSATION</p>
        <h2 className="absolute left-[78px] top-[88px] font-poppins text-[38px] font-bold leading-[56px] text-white">Not sure which solution fits?</h2>
        <p className="absolute left-[78px] top-[150px] w-[720px] font-poppins-light text-[17px] leading-[25px] text-[#ccc]">
          Share your hiring goals, required skills and timelines. We can discuss the right starting point.
        </p>
        <a
          href={ENQUIRY_HREF}
          className="absolute left-[78px] top-[220px] flex h-[46px] w-[235px] items-center justify-center rounded-[7px] bg-[red] font-poppins text-[13px] font-semibold text-white transition duration-200 hover:brightness-110"
        >
          Discuss Your Hiring Needs
        </a>
      </div>
    </section>
  )
}
