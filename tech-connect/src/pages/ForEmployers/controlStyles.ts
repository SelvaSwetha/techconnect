/** Input / select styling shared by the Figma hero card and requisition form (border #e5e7eb, radius 8, 12px text). */
export const controlBox = (bg: 'white' | 'gray') =>
  `rounded-[8px]! border-[#e5e7eb]! ${bg === 'white' ? 'bg-white' : 'bg-[#f9fafb]'} px-[15px]! text-[12px]! text-[#111827]! placeholder:text-[#6b7280]!`
