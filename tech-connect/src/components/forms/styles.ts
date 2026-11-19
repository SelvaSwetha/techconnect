export type ControlSize = 'sm' | 'md'

/** 'sm' = 11px text (fixed 1440px Figma layout), 'md' = 12px text (fluid layouts). */
export const controlClass = (size: ControlSize, invalid: boolean) =>
  `w-full rounded-[5px] border bg-white px-3 font-poppins font-normal text-[#0f0f12] outline-none transition-colors placeholder:text-[#5e6166] focus:border-[red] disabled:opacity-60 ${
    size === 'sm' ? 'text-[11px]' : 'text-[12px]'
  } ${invalid ? 'border-[#d40000]' : 'border-[#d1d1d1]'}`

export const ERROR_COLOR = '#d40000'
