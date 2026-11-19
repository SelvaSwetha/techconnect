import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import CaseTabs from './CaseTabs'
import CtaForm from './CtaForm'
import { ADVANTAGE, CASES, CTA, DOMAINS, FOOTPRINT, HERO, ICON, LEADERSHIP, NARRATIVE, PHOTO, STATS, VALUES } from './data'
import Footer from './Footer'
import { Flow } from './ui'

const WRAP = 'mx-auto max-w-[760px] px-5 sm:px-8'
const EYEBROW = 'm-0 font-poppins text-[12px] font-bold uppercase leading-[16px] tracking-[0.6px] text-[red]'
const H2 = 'm-0 font-poppins text-[26px] font-bold leading-[34px] tracking-[-0.65px] text-[#111827] sm:text-[30px] sm:leading-[38px]'

function Head({ eyebrow, title, sub, dark, center }: { eyebrow: string; title: ReactNode; sub?: ReactNode; dark?: boolean; center?: boolean }) {
  return (
    <div className={`flex flex-col gap-2 ${center ? 'items-center text-center' : ''}`}>
      <p className={EYEBROW}>{eyebrow}</p>
      <h2 className={`${H2} ${dark ? '!text-white' : ''}`}>{title}</h2>
      {sub ? <p className={`m-0 font-poppins text-[14px] leading-[22px] ${dark ? 'text-[#9ca3af]' : 'text-[#4b5563]'}`}>{sub}</p> : null}
    </div>
  )
}

/** Single-column reflow (< 1024px) of the About sections, same copy, images, icons and links as the 1440px frame. */
export default function AboutMobile() {
  return (
    <>
      <section id="about-hero" className="bg-[#0f0f12] pb-10 pt-10 text-white">
        <div className={`${WRAP} flex flex-col gap-6`}>
          <p className="m-0 flex items-center gap-2 font-poppins text-[12px] leading-[16px] text-[#6b7280]">
            <img src={ICON.home} alt="" width={10} height={11.25} />
            {HERO.crumbHome}
            <span className="text-[#d1d5db]">/</span>
            <span className="font-medium text-white">{HERO.crumbHere}</span>
          </p>
          <p className="m-0 flex w-fit items-center gap-2 rounded-full bg-[#191919] px-4 py-2 font-poppins text-[11px] font-bold leading-[16px] tracking-[0.44px] text-[#e0e0e0]">
            <span className="h-2 w-2 rounded-full bg-[red]" />
            {HERO.pill}
          </p>
          <h1 className="m-0 font-poppins text-[40px] font-semibold leading-[1.02] tracking-[-1px] sm:text-[56px]">
            {HERO.title.map((l) => (
              <span key={l} className="block">
                {l}
              </span>
            ))}
          </h1>
          <p className="m-0 max-w-[600px] font-poppins text-[16px] leading-[26px] text-[#4b5563] sm:text-[18px] sm:leading-[28px]">
            <Flow lines={HERO.lead} />
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link to="/employer-enquiry" className="flex h-12 items-center justify-center gap-3 rounded-[4px] bg-[red] px-7 font-poppins text-[14px] font-semibold text-white">
              {HERO.primary}
              <img src={ICON.arrowW12} alt="" width={12} height={12} />
            </Link>
            <a href="#case-studies" className="flex h-12 items-center justify-center rounded-[4px] border border-[#e5e7eb] bg-[#f3f4f6] px-6 font-poppins text-[14px] font-semibold text-[#1f2937]">
              {HERO.secondary}
            </a>
          </div>
          <div className="relative overflow-hidden rounded-[8px] border border-[#e5e7eb] bg-[#f9fafb]">
            <img src={PHOTO.hero} alt="Executive in a modern office reviewing hiring analytics" className="aspect-[529/388] w-full object-cover" style={{ objectPosition: '62% 50%' }} />
            <div className="absolute inset-x-3 bottom-3 flex items-center gap-4 rounded-[6px] border border-[#e5e7eb] bg-white/95 p-4">
              <span className="flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-[4px] border border-[#fee2e2] bg-[#fef2f2]">
                <img src={ICON.badge} alt="" width={20.17} height={19.25} />
              </span>
              <div>
                <p className="m-0 font-poppins text-[14px] font-semibold leading-[20px] text-[#111827]">{HERO.badgeTitle}</p>
                <p className="m-0 font-poppins text-[12px] leading-[16px] text-[#6b7280]">{HERO.badgeSub}</p>
              </div>
            </div>
          </div>
          <hr className="m-0 border-0 border-t border-[#e5e7eb]" />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {STATS.map((s) => (
              <div key={s.value} className="flex items-center gap-4 rounded-[6px] border border-[#e5e7eb] bg-[#0f0f12] p-5">
                <span className={`flex h-[50px] w-[50px] shrink-0 items-center justify-center rounded-[6px] border ${s.tone === 'red' ? 'border-[#fee2e2] bg-[#fef2f2]' : 'border-[#e5e7eb] bg-[#f3f4f6]'}`}>
                  <img src={s.icon} alt="" className="max-h-[26px] max-w-[26px]" />
                </span>
                <div>
                  <p className="m-0 font-poppins text-[30px] font-semibold leading-[36px] text-white">{s.value}</p>
                  <p className="m-0 font-poppins text-[12px] font-medium leading-[16px] text-white">{s.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="about-narrative" className="border-t border-[#e5e7eb] bg-white py-12 sm:py-16">
        <div className={`${WRAP} flex flex-col gap-10`}>
          <div className="flex flex-col gap-5">
            <p className={EYEBROW}>{NARRATIVE.eyebrow}</p>
            <h2 className="m-0 font-poppins text-[28px] font-bold leading-[1.1] tracking-[-0.7px] text-[#111827] sm:text-[36px]">{NARRATIVE.title.join(' ')}</h2>
            <p className="m-0 font-poppins text-[14px] leading-[23px] text-[#4b5563]">
              <Flow lines={NARRATIVE.body} />
            </p>
            <div className="flex flex-wrap gap-4">
              {NARRATIVE.kpis.map((k) => (
                <div key={k.value} className="flex-1 rounded-[6px] border border-[#e5e7eb] bg-[#f7f9fb] px-5 py-6">
                  <p className={`m-0 font-poppins text-[28px] font-bold leading-[36px] ${k.red ? 'text-[red]' : 'text-[#111827]'}`}>{k.value}</p>
                  <p className="m-0 font-poppins text-[12px] font-medium leading-[16px] text-[#4b5563]">{k.label}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <img src={PHOTO.team} alt="Colleagues collaborating at a glass whiteboard" className="aspect-[312/240] w-full rounded-[6px] border border-[#e5e7eb] object-cover" />
            <div className="rounded-[6px] bg-[red] p-5 text-white">
              <img src={ICON.rigor} alt="" width={22.18} height={23.33} />
              <p className="m-0 pt-3 font-poppins text-[16px] font-semibold leading-[24px]">{NARRATIVE.rigor.title}</p>
              <p className="m-0 font-poppins text-[12px] leading-[19px] text-white/90">
                <Flow lines={NARRATIVE.rigor.lines} />
              </p>
            </div>
            <div className="rounded-[6px] border border-[#1f2937] bg-black p-5">
              <img src={ICON.ethos} alt="" width={25.68} height={23.33} />
              <p className="m-0 pt-3 font-poppins text-[16px] font-semibold leading-[24px] text-white">{NARRATIVE.ethos.title}</p>
              <p className="m-0 font-poppins text-[12px] leading-[19px] text-[#9ca3af]">
                <Flow lines={NARRATIVE.ethos.lines} />
              </p>
            </div>
            <img src={PHOTO.board} alt="Leader presenting a strategic growth plan to colleagues" className="aspect-[312/240] w-full rounded-[6px] border border-[#e5e7eb] object-cover" />
          </div>
        </div>
      </section>

      <section id="about-values" className="border-y border-[#e5e7eb] bg-[#f7f9fb] py-12 sm:py-16">
        <div className={`${WRAP} flex flex-col gap-10`}>
          <Head eyebrow={VALUES.eyebrow} title={VALUES.title} />
          <ol className="m-0 grid list-none grid-cols-1 gap-4 p-0 sm:grid-cols-2">
            {VALUES.items.map((v) => (
              <li key={v.n} className="relative overflow-hidden rounded-[6px] border border-[#e5e7eb] bg-white p-6">
                <span className="absolute right-4 top-2 font-poppins text-[58px] font-bold leading-[58px] text-[#fca5a5]/45">{v.n}</span>
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#ff1e27]">
                  <img src={v.icon} alt="" width={24} height={24} />
                </span>
                <h3 className="m-0 pt-4 font-poppins text-[17px] font-bold leading-[24px] tracking-[-0.43px] text-[#0f172a]">{v.title}</h3>
                <p className="m-0 pt-2 font-poppins text-[12.5px] leading-[20px] text-[#64748b]">
                  <Flow lines={v.lines} />
                </p>
              </li>
            ))}
          </ol>
          <div className="flex flex-col gap-6 pt-6">
            <Head eyebrow={ADVANTAGE.eyebrow} title={ADVANTAGE.title} sub={<Flow lines={ADVANTAGE.sub} />} />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {ADVANTAGE.cards.map((c) => (
                <div key={c.title} className="flex flex-col rounded-[6px] border border-[#e5e7eb] bg-white p-6">
                  <span className="flex h-[46px] w-[46px] items-center justify-center rounded-[4px] border border-[#fee2e2] bg-[#fef2f2]">
                    <img src={c.icon} alt="" width={c.iw} height={c.ih} />
                  </span>
                  <h3 className="m-0 pt-5 font-poppins text-[16px] font-semibold leading-[24px] text-[#111827]">{c.title}</h3>
                  <p className="m-0 pt-2 font-poppins text-[12px] leading-[19.5px] text-[#4b5563]">
                    <Flow lines={c.lines} />
                  </p>
                  <p className="m-0 mt-5 border-t border-[#f3f4f6] pt-4 font-poppins text-[11px] font-bold leading-[16px] text-[red]">{c.tag}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="about-leadership" className="border-b border-[#e5e7eb] bg-white py-12 sm:py-16">
        <div className={`${WRAP} flex flex-col gap-8`}>
          <div className="flex flex-col gap-4">
            <p className={`${EYEBROW} tracking-[1.8px]`}>{LEADERSHIP.eyebrow}</p>
            <h2 className={H2}>{LEADERSHIP.title.join(' ')}</h2>
            <p className="m-0 font-poppins text-[15px] leading-[24px] text-[#4b5563]">
              <Flow lines={LEADERSHIP.lead} />
            </p>
            <span className="h-[2.5px] w-11 bg-[red]" />
          </div>
          <div className="relative aspect-[840/819] overflow-hidden rounded-[8px] bg-[#f7f9fb]">
            <img src={PHOTO.leadership} alt="Sivaraj, Founder and Chief Executive Officer" className="absolute top-0 block h-full max-w-none" style={{ left: '-129%', width: '229%' }} />
          </div>
          <div className="rounded-[8px] border border-[#1f2937] bg-[#121417] p-6">
            <p className="m-0 font-poppins text-[10px] font-bold leading-[14px] tracking-[1.35px] text-[red]">{LEADERSHIP.role}</p>
            <p className="m-0 pt-2 font-poppins text-[24px] font-bold leading-[32px] tracking-[-0.6px] text-white">{LEADERSHIP.name}</p>
            <p className="m-0 pt-3 font-poppins text-[12px] leading-[19px] text-[#d1d5db]">
              <Flow lines={LEADERSHIP.bio} />
            </p>
            <p className="m-0 flex items-center gap-2 pt-4 font-poppins text-[12px] font-semibold text-[red]">
              {LEADERSHIP.link}
              <img src={ICON.arrowRed} alt="" width={8.29} height={3.28} />
            </p>
          </div>
          <div className="rounded-[8px] border border-[#f3f4f6] bg-white p-5 shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1)]">
            <img src={ICON.quote} alt="" width={14} height={20} />
            <p className="m-0 pt-3 font-poppins text-[16px] font-bold leading-[21px] tracking-[-0.4px] text-[#111827]">{LEADERSHIP.quote.join(' ')}</p>
            <span className="mt-3 block h-[2px] w-8 bg-[red]" />
          </div>
          <ul className="m-0 flex list-none flex-col gap-6 p-0">
            {LEADERSHIP.facts.map((x) => (
              <li key={x.title} className="flex items-center gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#ffeaea]">
                  <img src={x.icon} alt="" width={20} height={20} />
                </span>
                <div>
                  <p className="m-0 font-poppins text-[15px] font-bold leading-[20px] text-[#111827]">{x.title}</p>
                  <p className="m-0 font-poppins text-[13px] leading-[18px] text-[#6b7280]">{x.sub}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="case-studies" className="scroll-mt-20 bg-black py-12 sm:py-16">
        <div className={`${WRAP} flex flex-col gap-8`}>
          <Head dark eyebrow={CASES.eyebrow} title={CASES.title} sub={<Flow lines={CASES.sub} />} />
          <CaseTabs />
          <div className="flex flex-col gap-4 rounded-[8px] border border-white/15 bg-white/5 p-4 sm:p-8">
            <div className="rounded-[6px] border border-white/10 bg-white/5 p-6">
              <span className="inline-block rounded-[2px] bg-[red] px-[10px] py-[4px] font-poppins text-[10px] font-bold leading-[14px] tracking-[0.48px] text-white">{CASES.active.tag}</span>
              <p className="m-0 pt-4 font-poppins text-[20px] font-bold leading-[28px] text-white">{CASES.active.title.join(' ')}</p>
              <p className="m-0 pt-2 font-poppins text-[12px] leading-[16px] text-[#9ca3af]">{CASES.active.location}</p>
              <div className="mt-5 rounded-[4px] border border-white/10 bg-black/60 p-4">
                <p className="m-0 font-poppins text-[10px] font-semibold leading-[14px] tracking-[0.5px] text-[#9ca3af]">{CASES.active.benchLabel}</p>
                <p className="m-0 font-poppins text-[20px] font-bold leading-[28px] text-[red]">{CASES.active.bench}</p>
              </div>
            </div>
            {CASES.active.columns.map((c) => (
              <div key={c.label} className="rounded-[6px] border border-white/10 bg-white/5 p-5">
                <p className="m-0 flex items-center gap-2 font-poppins text-[12px] font-bold leading-[16px] tracking-[0.48px]" style={{ color: c.color }}>
                  <img src={ICON[c.icon as 'alert' | 'fork' | 'outcome']} alt="" width={16} height={16} />
                  {c.label}
                </p>
                <p className="m-0 pt-3 font-poppins text-[12px] leading-[19.5px] text-[#d1d5db]">
                  <Flow lines={c.lines} />
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="about-domains" className="border-b border-[#e5e7eb] bg-white py-12 sm:py-16">
        <div className={`${WRAP} flex flex-col gap-8`}>
          <Head center eyebrow={DOMAINS.eyebrow} title={DOMAINS.title} sub={<Flow lines={DOMAINS.sub} />} />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {DOMAINS.items.map((d) => (
              <div key={d.title} className="flex items-center gap-4 rounded-[6px] border border-[#e5e7eb] bg-[#f7f9fb] p-4">
                <span className="flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-[4px] border border-[#fee2e2] bg-[#fef2f2]">
                  <img src={d.icon} alt="" className="max-h-[18px] max-w-[18px]" />
                </span>
                <div>
                  <p className="m-0 font-poppins text-[14px] font-semibold leading-[20px] text-[#111827]">{d.title}</p>
                  <p className="m-0 font-poppins text-[11px] leading-[16px] text-[#6b7280]">{d.sub}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="rounded-[8px] border border-[#e5e7eb] bg-[#f7f9fb] p-5 sm:p-8">
            <div className="flex flex-col gap-4 border-b border-[#e5e7eb] pb-5">
              <div>
                <p className={EYEBROW}>{FOOTPRINT.eyebrow}</p>
                <h3 className="m-0 pt-2 font-poppins text-[20px] font-bold leading-[28px] text-[#111827]">{FOOTPRINT.title}</h3>
              </div>
              <p className="m-0 flex gap-5 font-poppins text-[12px] font-medium leading-[16px] text-[#4b5563]">
                <span className="flex items-center gap-2">
                  <span className="h-[10px] w-[10px] rounded-full bg-[red]" />
                  {FOOTPRINT.legend[0]}
                </span>
                <span className="flex items-center gap-2">
                  <span className="h-[10px] w-[10px] rounded-full bg-[#6b7280]" />
                  {FOOTPRINT.legend[1]}
                </span>
              </p>
            </div>
            <div className="grid grid-cols-1 gap-5 pt-6">
              {FOOTPRINT.hubs.map((h) => (
                <div key={h.title} className="relative flex flex-col gap-3 overflow-hidden rounded-[12px] border border-[#e2e8f0] bg-white p-6">
                  <div className="flex items-start justify-between gap-3">
                    <span className="font-poppins text-[36px] font-bold leading-[40px] text-[#fee2e2]">{h.n}</span>
                    <span className={`flex h-10 w-10 items-center justify-center rounded-[8px] border ${h.hq ? 'border-[#fee2e2] bg-[#fef2f2]' : 'border-[#e2e8f0] bg-[#f8fafc]'}`}>
                      <img src={h.icon} alt="" width={20} height={20} />
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="min-w-0 flex-1">
                      <p className="m-0 font-poppins text-[20px] font-bold leading-[28px] text-[#0f172a]">{h.title}</p>
                      <p className="m-0 font-poppins text-[12px] font-medium leading-[16px] text-[#64748b]">{h.place.join(' ')}</p>
                    </div>
                    <img src={h.photo} alt={`${h.title} skyline`} width={116} height={116} className="h-[96px] w-[96px] shrink-0 rounded-full border-2 border-[#f87171]/50 object-cover" />
                  </div>
                  <p className="m-0 font-poppins text-[12px] leading-[19.5px] text-[#475569]">
                    <Flow lines={h.lines} />
                  </p>
                  <span className={`w-fit rounded-full border px-4 py-2 font-poppins text-[11px] font-bold leading-[16px] tracking-[0.55px] ${h.hq ? 'border-[#fecaca] bg-[#fef2f2] text-[red]' : 'border-[#e2e8f0] bg-[#f1f5f9] text-[#334155]'}`}>{h.badge}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="about-cta" className="bg-black py-12 sm:py-16">
        <div className={`${WRAP} flex flex-col gap-10`}>
          <div className="flex flex-col gap-4">
            <p className="m-0 font-poppins text-[12px] font-bold leading-[16px] tracking-[0.96px] text-[#f87171]">{CTA.eyebrow}</p>
            <h2 className="m-0 font-poppins text-[28px] font-bold leading-[1.1] tracking-[-0.7px] text-white sm:text-[36px]">{CTA.title.join(' ')}</h2>
            <p className="m-0 font-poppins text-[14px] leading-[23px] text-[#d1d5db]">
              <Flow lines={CTA.lead} />
            </p>
            <ul className="m-0 flex list-none flex-wrap gap-x-6 gap-y-3 p-0">
              {CTA.perks.map((p) => (
                <li key={p} className="flex items-center gap-2 font-poppins text-[12px] leading-[16px] text-[#d1d5db]">
                  <img src={ICON.checkBadge} alt="" width={16.5} height={15.75} />
                  {p}
                </li>
              ))}
            </ul>
          </div>
          <CtaForm />
        </div>
      </section>
      <Footer />
    </>
  )
}
