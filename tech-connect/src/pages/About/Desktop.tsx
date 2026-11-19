import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import SectionCanvas from '../../components/SectionCanvas'
import CtaForm from './CtaForm'
import CaseTabs from './CaseTabs'
import { ADVANTAGE, CASES, CTA, DOMAINS, FOOTPRINT, HERO, ICON, LEADERSHIP, NARRATIVE, PHOTO, STATS, VALUES } from './data'
import Footer from './Footer'
import { B, T } from './ui'

/** One horizontal band of the frame. Children use absolute page coordinates (y measured from the top of the 6387px frame). */
function Band({ id, y0, y1, className = '', children }: { id: string; y0: number; y1: number; className?: string; children: ReactNode }) {
  return (
    <SectionCanvas id={id} height={y1 - y0} className={className}>
      <div className="absolute left-0 w-[1440px]" style={{ top: -y0, height: 6387 }}>
        {children}
      </div>
    </SectionCanvas>
  )
}

/** Icon centred on (cx, cy). */
function Ic({ src, cx, cy, w, h = w }: { src: string; cx: number; cy: number; w: number; h?: number }) {
  return <img src={src} alt="" width={w} height={h} className="absolute block max-w-none" style={{ left: cx - w / 2, top: cy - h / 2 }} />
}

const RED = '#ff0000'
const INK = '#111827'
const GRAY = '#4b5563'

/** About (PDF 00_Abouts.pdf, 1440 x 6387). Figma frame "Jobs" 246:6710 per assets-review manifest (mis-named; it is About). */
export default function AboutDesktop() {
  return (
    <>
      {/* HERO: black band from the navbar bottom (92) to 810 */}
      <Band id="about-hero" y0={92} y1={810} className="bg-[#0f0f12]">
        <img src={ICON.home} alt="" width={10} height={11.25} className="absolute" style={{ left: 48, top: 146.4 }} />
        <T x={64} y={156} s={12} lh={16} c="#6b7280" w={400} lines={[HERO.crumbHome]} />
        <T x={107.8} y={156} s={12} lh={16} c="#d1d5db" lines={['/']} />
        <T x={121.5} y={156} s={12} lh={16} c="#ffffff" w={500} lines={[HERO.crumbHere]} />
        <B x={48} y={200.8} w={236.8} h={30.4} className="rounded-full border border-[#191919] bg-[#191919]" />
        <B x={63} y={212} w={8} h={8} className="rounded-full bg-[red]" />
        <T x={79} y={220} s={11} lh={16} c="#e0e0e0" w={700} ls={0.44} lines={[HERO.pill]} />
        <T x={48} y={302} s={60} lh={60} c="#ffffff" w={600} ls={-1.5} lines={HERO.title} />
        <T x={48} y={407} s={18} lh={28} c={GRAY} lines={HERO.lead} />
        <Link to="/employer-enquiry" className="absolute flex items-center rounded-[4px] bg-[red] font-poppins text-[14px] font-semibold text-white transition hover:brightness-110" style={{ left: 48, top: 504.2, width: 219.4, height: 48, paddingLeft: 28 }}>
          {HERO.primary}
          <img src={ICON.arrowW12} alt="" width={12} height={12} className="absolute" style={{ left: 179.4, top: 18 }} />
        </Link>
        <a href="#case-studies" className="absolute flex items-center rounded-[4px] border border-[#e5e7eb] bg-[#f3f4f6] font-poppins text-[14px] font-semibold text-[#1f2937] transition hover:bg-white" style={{ left: 282.4, top: 502.2, width: 212.2, height: 52, paddingLeft: 25 }}>
          {HERO.secondary}
        </a>
        <div className="absolute overflow-hidden rounded-[8px] border border-[#e5e7eb] bg-[#f9fafb]" style={{ left: 863.7, top: 183, width: 529.3, height: 388 }}>
          <img src={PHOTO.hero} alt="Executive in a modern office reviewing hiring analytics" className="absolute block max-w-none" style={{ left: -139.9, top: -26.9, width: 807.1 }} />
        </div>
        <B x={881.7} y={479} w={492.6} h={74} className="rounded-[6px] border border-[#e5e7eb] bg-white/95 shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1)]" />
        <B x={897.7} y={495} w={42} h={42} className="rounded-[4px] border border-[#fee2e2] bg-[#fef2f2]" />
        <Ic src={ICON.badge} cx={918.7} cy={516} w={20.17} h={19.25} />
        <T x={950.7} y={513} s={14} lh={20} c={INK} w={600} lines={[HERO.badgeTitle]} />
        <T x={950.7} y={530} s={12} lh={16} c="#6b7280" lines={[HERO.badgeSub]} />
        <B x={48} y={617.5} w={1344} h={1} className="bg-[#e5e7eb]" />
        {STATS.map((s, i) => {
          const x = 48 + i * 342
          return (
            <div key={s.value}>
              <B x={x} y={651} w={318} h={94} className="rounded-[6px] border border-[#e5e7eb] bg-[#0f0f12]" />
              <B x={x + 20} y={673} w={50} h={50} className={`rounded-[6px] border ${s.tone === 'red' ? 'border-[#fee2e2] bg-[#fef2f2]' : 'border-[#e5e7eb] bg-[#f3f4f6]'}`} />
              <Ic src={s.icon} cx={x + 45} cy={698} w={i === 2 ? 26 : 21.67} h={i === 2 ? 24.92 : i === 1 ? 17.33 : 21.67} />
              <T x={x + 85} y={701} s={30} lh={36} c="#ffffff" w={600} lines={[s.value]} />
              <T x={x + 85} y={720} s={12} lh={16} c="#ffffff" w={500} lines={[s.label]} />
            </div>
          )
        })}
      </Band>

      {/* NARRATIVE + guiding principles heading (white) */}
      <Band id="about-narrative" y0={810} y1={1663} className="bg-white">
        <T x={48} y={972} s={12} lh={16} c={RED} w={700} ls={0.6} lines={[NARRATIVE.eyebrow]} />
        <T x={48} y={1016} s={36} lh={40} c={INK} w={700} ls={-0.9} lines={NARRATIVE.title} />
        <T x={48} y={1140} s={14} lh={22.75} c={GRAY} lines={NARRATIVE.body} />
        {NARRATIVE.kpis.map((k, i) => (
          <div key={k.value}>
            <B x={48 + i * 216.8} y={1246.5} w={i ? 159.1 : 192.8} h={98} className="rounded-[6px] border border-[#e5e7eb] bg-[#f7f9fb]" />
            <T x={69 + i * 216.8} y={1296} s={30} lh={36} c={k.red ? RED : INK} w={700} lines={[k.value]} />
            <T x={69 + i * 216.8} y={1320} s={12} lh={16} c={GRAY} w={500} lines={[k.label]} />
          </div>
        ))}
        <div className="absolute overflow-hidden rounded-[6px] border border-[#e5e7eb] bg-[#f3f4f6]" style={{ left: 752, top: 930.8, width: 312, height: 240 }}>
          <img src={PHOTO.team} alt="Colleagues collaborating at a glass whiteboard" className="absolute block max-w-none" style={{ left: -94.7, top: -16.6, width: 501.5 }} />
        </div>
        <B x={752} y={1186.8} w={312} h={140.3} className="rounded-[6px] border border-[#1f2937] bg-black" />
        <Ic src={ICON.ethos} cx={786} cy={1219.5} w={25.68} h={23.33} />
        <T x={773} y={1257} s={16} lh={24} c="#ffffff" w={600} lines={[NARRATIVE.ethos.title]} />
        <T x={773} y={1281} s={12} lh={19.2} c="#9ca3af" lines={NARRATIVE.ethos.lines} />
        <B x={1080} y={954.8} w={312} h={158.3} className="rounded-[6px] bg-[red]" />
        <Ic src={ICON.rigor} cx={1110} cy={988} w={22.18} h={23.33} />
        <T x={1100} y={1028} s={16} lh={24} c="#ffffff" w={600} lines={[NARRATIVE.rigor.title]} />
        <T x={1100} y={1048} s={12} lh={19.2} c="rgba(255,255,255,0.9)" lines={NARRATIVE.rigor.lines} />
        <div className="absolute overflow-hidden rounded-[6px] border border-[#e5e7eb] bg-[#f3f4f6] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" style={{ left: 1080, top: 1129.1, width: 312, height: 240 }}>
          <img src={PHOTO.board} alt="Leader presenting a strategic growth plan to colleagues" className="absolute block max-w-none" style={{ left: -94.7, top: -16.6, width: 501.5 }} />
        </div>
        <B x={48} y={1461.5} w={1344} h={1} className="bg-[#f3f4f6]" />
        <T x={48} y={1523} s={12} lh={16} c={RED} w={700} ls={0.6} lines={[VALUES.eyebrow]} />
        <T x={48} y={1560} s={30} lh={36} c={INK} w={700} ls={-0.75} lines={[VALUES.title]} />
      </Band>

      {/* GUIDING PRINCIPLES ribbon + ARCHITECTURAL ADVANTAGE (pale) */}
      <Band id="about-values" y0={1663} y1={2562} className="border-y border-[#e5e7eb] bg-[#f7f9fb]">
        <img src={ICON.ribbon} alt="" width={1440} height={300} className="absolute block max-w-none" style={{ left: 0, top: 1696 }} />
        {VALUES.items.map((v, i) => {
          const circleX = [40, 407, 774, 1141][i]
          const circleY = [1712, 1704, 1684, 1708][i]
          const numBase = [1837, 1829, 1809, 1833][i]
          const numX = [0, 367, 734, 1101][i]
          const titleX = [74, 451, 821, 1192][i]
          const titleBase = [1814, 1806, 1786, 1810][i]
          const bodyBase = [1843, 1835, 1815, 1839][i]
          return (
            <div key={v.n}>
              <T x={numX} y={numBase} s={58} lh={58} c="rgba(252,165,165,0.45)" w={700} lines={[v.n]} />
              <B x={circleX + 12} y={circleY + 56} w={1} h={24} className="bg-[#fecaca]" />
              {i >= 2 ? <B x={circleX + 9} y={circleY + 76 + (i === 2 ? 0 : 0)} w={8} h={8} className="rounded-full bg-[#ff1e27]" style={{ top: i === 2 ? 1760 : 1784 }} /> : null}
              <B x={circleX} y={circleY} w={56} h={56} className="rounded-full bg-[#ff1e27] shadow-[0px_4px_10px_0px_rgba(255,30,39,0.3)]" />
              <Ic src={v.icon} cx={circleX + 28} cy={circleY + 28} w={24} />
              <T x={titleX} y={titleBase} s={17} lh={24} c="#0f172a" w={700} ls={-0.425} lines={[v.title]} />
              <T x={titleX} y={bodyBase} s={12.5} lh={20} c="#64748b" lines={v.lines} />
            </div>
          )
        })}
        <T x={48} y={2088} s={12} lh={16} c={RED} w={700} ls={0.6} lines={[ADVANTAGE.eyebrow]} />
        <T x={48} y={2125} s={30} lh={36} c={INK} w={700} ls={-0.75} lines={[ADVANTAGE.title]} />
        <T x={944} y={2107} s={14} lh={20} c={GRAY} lines={ADVANTAGE.sub} />
        {ADVANTAGE.cards.map((c, i) => {
          const x = 48 + i * 342
          return (
            <div key={c.title}>
              <B x={x} y={2180} w={318} h={i === 2 ? 301 : 300.5} className="rounded-[6px] border border-[#e5e7eb] bg-white" />
              <B x={x + 24} y={2204} w={46} h={46} className="rounded-[4px] border border-[#fee2e2] bg-[#fef2f2]" />
              <Ic src={c.icon} cx={x + 47} cy={2227} w={c.iw} h={c.ih} />
              <T x={x + 25} y={2283} s={16} lh={24} c={INK} w={600} lines={[c.title]} />
              <T x={x + 25} y={2311} s={12} lh={19.5} c={GRAY} lines={c.lines} />
              <B x={x + 25} y={2417.5} w={268} h={1} className="bg-[#f3f4f6]" />
              <T x={x + 25} y={2448} s={11} lh={16} c={RED} w={700} lines={[c.tag]} />
            </div>
          )
        })}
      </Band>

      {/* LEADERSHIP (white) */}
      <Band id="about-leadership" y0={2562} y1={3574} className="border-b border-[#e5e7eb] bg-white">
        <div className="absolute overflow-hidden" style={{ left: 600, top: 2658, width: 840, height: 819, WebkitMaskImage: 'linear-gradient(to right, transparent 0, #000 140px)', maskImage: 'linear-gradient(to right, transparent 0, #000 140px)' }}>
          <img src={PHOTO.leadership} alt="" width={1923.5} height={819} className="absolute block max-w-none" style={{ left: -1083.5, top: 0, width: 1923.5, height: 819 }} />
        </div>
        <img src={ICON.leadershipDecor} alt="" width={240} height={160} className="absolute block max-w-none" style={{ left: 1165, top: 2725 }} />
        <T x={64} y={2726} s={12} lh={16} c={RED} w={700} ls={1.8} lines={[LEADERSHIP.eyebrow]} />
        <T x={64} y={2777} s={30} lh={49} c={INK} w={700} ls={-0.75} lines={LEADERSHIP.title} />
        <T x={64} y={2873} s={15} lh={24.5} c={GRAY} lines={LEADERSHIP.lead} />
        <B x={64} y={2950} w={44} h={2.5} className="bg-[red]" />
        {LEADERSHIP.facts.map((f, i) => (
          <div key={f.title}>
            <B x={64} y={3141 + i * 72} w={48} h={48} className="rounded-full bg-[#ffeaea]" />
            <Ic src={f.icon} cx={88} cy={3165 + i * 72} w={20} />
            <T x={128} y={3161 + i * 72} s={15} lh={20} c={INK} w={700} lines={[f.title]} />
            <T x={128} y={3179 + i * 72} s={13} lh={18} c="#6b7280" lines={[f.sub]} />
          </div>
        ))}
        <B x={608} y={3070} w={218} h={135.6} className="rounded-[8px] border border-[#f3f4f6] bg-white shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1)]" />
        <img src={ICON.quote} alt="" width={14} height={20} className="absolute block" style={{ left: 629, top: 3096 }} />
        <T x={629} y={3144} s={16} lh={21} c={INK} w={700} ls={-0.4} lines={LEADERSHIP.quote} />
        <B x={629} y={3182.6} w={32} h={2} className="bg-[red]" />
        <B x={973} y={3106} w={431} h={301} className="rounded-[8px] border border-[#1f2937] bg-[#121417] shadow-[0px_20px_25px_-5px_rgba(0,0,0,0.25)]" />
        <T x={998} y={3142} s={10} lh={14} c={RED} w={700} ls={1.35} lines={[LEADERSHIP.role]} />
        <T x={998} y={3174} s={24} lh={32} c="#ffffff" w={700} ls={-0.6} lines={[LEADERSHIP.name]} />
        <T x={998} y={3206} s={11.5} lh={18.75} c="#d1d5db" lines={LEADERSHIP.bio} />
        <T x={998} y={3322} s={12} lh={16} c={RED} w={600} lines={[LEADERSHIP.link]} />
        <img src={ICON.arrowRed} alt="" width={8.29} height={3.28} className="absolute block" style={{ left: 1116.2, top: 3316.7 }} />
      </Band>

      {/* CASE STUDIES (black) */}
      <Band id="case-studies" y0={3574} y1={4323} className="bg-black">
        <T x={48} y={3743} s={12} lh={16} c={RED} w={700} ls={0.6} lines={[CASES.eyebrow]} />
        <T x={48} y={3780} s={30} lh={36} c="#ffffff" w={600} ls={-0.75} lines={[CASES.title]} />
        <T x={944} y={3762} s={14} lh={20} c="#9ca3af" lines={CASES.sub} />
        <B x={48} y={3827}>
          <CaseTabs />
        </B>
        <B x={48} y={3895} w={1344} h={332} className="rounded-[8px] border border-white/15 bg-white/5" />
        <B x={81} y={3928} w={404.7} h={266} className="rounded-[6px] border border-white/10 bg-white/5" />
        <B x={106} y={3955} w={144.9} h={23} className="rounded-[2px] bg-[red]" />
        <T x={116} y={3970} s={10} lh={14} c="#ffffff" w={700} ls={0.48} lines={[CASES.active.tag]} />
        <T x={106} y={4011} s={20} lh={28} c="#ffffff" w={700} lines={CASES.active.title} />
        <T x={106} y={4062} s={12} lh={16} c="#9ca3af" lines={[CASES.active.location]} />
        <B x={106} y={4090} w={354.7} h={79} className="rounded-[4px] border border-white/10 bg-black/60" />
        <T x={123} y={4118} s={10} lh={14} c="#9ca3af" w={600} ls={0.5} lines={[CASES.active.benchLabel]} />
        <T x={123} y={4145} s={20} lh={28} c={RED} w={700} lines={[CASES.active.bench]} />
        {CASES.active.columns.map((col, i) => {
          const x = [517.7, 803.4, 1089.2][i]
          const iconSrc = ICON[col.icon as 'alert' | 'fork' | 'outcome']
          return (
            <div key={col.label}>
              <B x={x} y={3928} w={269.7} h={203} className="rounded-[6px] border border-white/10 bg-white/5" />
              <Ic src={iconSrc} cx={x + 28.3} cy={3957} w={i === 2 ? 14 : 16} h={i === 2 ? 14 : 16} />
              <T x={x + 45.5} y={3961} s={12} lh={16} c={col.color} w={700} ls={0.48} lines={[col.label]} />
              <T x={x + 21} y={3987} s={12} lh={19.5} c="#d1d5db" lines={col.lines} />
            </div>
          )
        })}
      </Band>

      {/* DOMAINS + FOOTPRINT (white) */}
      <Band id="about-domains" y0={4323} y1={5425.5} className="border-b border-[#e5e7eb] bg-white">
        <T x={720} y={4431} s={12} lh={16} c={RED} w={700} ls={0.6} center lines={[DOMAINS.eyebrow]} />
        <T x={720} y={4468} s={30} lh={36} c={INK} w={600} ls={-0.75} center lines={[DOMAINS.title]} />
        <T x={720} y={4498} s={14} lh={20} c={GRAY} center lines={DOMAINS.sub} />
        {DOMAINS.items.map((d, i) => {
          const x = 48 + (i % 4) * 340
          const y = 4571 + Math.floor(i / 4) * 90
          return (
            <div key={d.title}>
              <B x={x} y={y} w={324} h={74} className="rounded-[6px] border border-[#e5e7eb] bg-[#f7f9fb]" />
              <B x={x + 16} y={y + 16} w={42} h={42} className="rounded-[4px] border border-[#fee2e2] bg-[#fef2f2]" />
              <Ic src={d.icon} cx={x + 37} cy={y + 37} w={i === 0 ? 18.33 : i === 1 ? 18.33 : 16.67} h={16.67} />
              <T x={x + 71} y={y + 33} s={14} lh={20} c={INK} w={600} lines={[d.title]} />
              <T x={x + 71} y={y + 50} s={11} lh={16} c="#6b7280" lines={[d.sub]} />
            </div>
          )
        })}
        <B x={48} y={4783} w={1344} h={545.5} className="rounded-[8px] border border-[#e5e7eb] bg-[#f7f9fb]" />
        <T x={81} y={4848} s={12} lh={16} c={RED} w={700} ls={0.6} lines={[FOOTPRINT.eyebrow]} />
        <T x={81} y={4881} s={20} lh={28} c={INK} w={700} lines={[FOOTPRINT.title]} />
        <B x={81} y={4912.5} w={1278} h={1} className="bg-[#e5e7eb]" />
        <B x={1132} y={4855} w={10} h={10} className="rounded-full bg-[red]" />
        <T x={1148.6} y={4864} s={12} lh={16} c={GRAY} w={500} lines={[FOOTPRINT.legend[0]]} />
        <B x={1225} y={4855} w={10} h={10} className="rounded-full bg-[#6b7280]" />
        <T x={1241.2} y={4864} s={12} lh={16} c={GRAY} w={500} lines={[FOOTPRINT.legend[1]]} />
        {FOOTPRINT.hubs.map((h, i) => {
          const x = [81, 488.3, 895.7][i]
          const titleBase = i === 0 ? 5043 : 5051
          const placeBase = i === 0 ? 5064 : 5072
          const bodyBase = i === 0 ? 5108 : 5100
          return (
            <div key={h.title}>
              <div className="absolute overflow-hidden rounded-[12px] border border-[#e2e8f0]/90 bg-white shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]" style={{ left: x, top: 4937, width: 383.3, height: 326.5 }}>
                <img src={ICON.hubArc} alt="" width={240.5} height={406.5} className="absolute block max-w-none" style={{ left: 189.7, top: -39, opacity: 0.6 }} />
              </div>
              <T x={x + 29} y={4999} s={36} lh={40} c="#fee2e2" w={700} lines={[h.n]} />
              <B x={x + 314.3} y={5029 - 63} w={40} h={40} className={`rounded-[8px] border ${h.hq ? 'border-[#fee2e2] bg-[#fef2f2]' : 'border-[#e2e8f0] bg-[#f8fafc]'}`} />
              <Ic src={h.icon} cx={x + 334.3} cy={4986} w={20} />
              <T x={x + 29} y={titleBase} s={20} lh={28} c="#0f172a" w={700} lines={[h.title]} />
              <T x={x + 29} y={placeBase} s={12} lh={16} c="#64748b" w={500} lines={h.place} />
              <T x={x + 29} y={bodyBase} s={12} lh={19.5} c="#475569" lines={h.lines} />
              <div className="absolute overflow-hidden rounded-full" style={{ left: x + 242.3, top: 5038.7, width: 116, height: 116, background: 'rgba(248,113,113,0.5)' }}>
                <div className="absolute overflow-hidden rounded-full bg-white" style={{ left: 2, top: 2, width: 112, height: 112 }}>
                  <img src={h.photo} alt={`${h.title} skyline`} className="absolute block max-w-none" style={{ left: -43.1, top: 2, width: 198.2 }} />
                </div>
              </div>
              <B x={x + 29} y={5203.5} w={h.hq ? 124.8 : i === 1 ? 98.4 : 67.1} h={31} className={`rounded-full border ${h.hq ? 'border-[#fecaca] bg-[#fef2f2]' : 'border-[#e2e8f0] bg-[#f1f5f9]'}`} />
              <T x={x + 44} y={5222} s={11} lh={16} c={h.hq ? RED : '#334155'} w={700} ls={0.55} lines={[h.badge]} />
            </div>
          )
        })}
      </Band>

      {/* CTA (black) */}
      <Band id="about-cta" y0={5425.5} y1={5969} className="bg-black">
        <T x={48} y={5607} s={12} lh={16} c="#f87171" w={700} ls={0.96} lines={[CTA.eyebrow]} />
        <T x={48} y={5652} s={36} lh={40} c="#ffffff" w={600} ls={-0.9} lines={CTA.title} />
        <T x={48} y={5730} s={14} lh={23} c="#d1d5db" lines={CTA.lead} />
        {CTA.perks.map((p, i) => (
          <div key={p}>
            <Ic src={ICON.checkBadge} cx={[56, 223, 436][i]} cy={5791} w={16.5} h={15.75} />
            <T x={[72, 240, 452][i]} y={5796} s={12} lh={16} c="#d1d5db" lines={[p]} />
          </div>
        ))}
        <B x={748} y={5503.7} w={644}>
          <CtaForm />
        </B>
      </Band>

      <Band id="about-footer" y0={5969} y1={6386.9} className="bg-[#111315]">
        <B x={0} y={5969} w={1440}>
          <Footer />
        </B>
      </Band>
    </>
  )
}
