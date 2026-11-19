import { Link } from 'react-router-dom'
import { all, email, EmailInput, required, SelectField, useFormState } from '../../components/forms'
import iconHome from '../../assets/icons/for-employers/hero-home.svg'
import iconArrowDown from '../../assets/icons/for-employers/hero-arrow-down.svg'
import iconCalculator from '../../assets/icons/for-employers/hero-calculator.svg'
import iconChevron from '../../assets/icons/for-employers/hero-chevron-down.svg'
import iconCalendar from '../../assets/icons/for-employers/hero-calendar.svg'
import iconShield from '../../assets/icons/for-employers/hero-shield.svg'
import { HERO_POSITIONS, HERO_TIMELINES } from './data'
import { controlBox } from './controlStyles'
import { Field } from './ui'

const STATS = [
  { value: '500+', label: 'Key Roles Closed', red: false },
  { value: '72h', label: 'Shortlist Turnaround', red: true },
  { value: '94%', label: '12-Mo Retention', red: false },
]

type F = 'email' | 'positions' | 'timeline'
const ORDER: F[] = ['email', 'positions', 'timeline']
const INITIAL: Record<F, string> = { email: '', positions: HERO_POSITIONS[0], timeline: HERO_TIMELINES[0] }
const VALIDATORS = {
  email: all(required('Please enter your work email.'), email('Enter a valid email address, e.g. vp.eng@company.com.')),
  positions: required('Please choose the number of open positions.'),
  timeline: required('Please choose a timeline.'),
}
const SELECT_BG = { backgroundImage: `url("${iconChevron}")`, backgroundSize: '18px 18px', backgroundPosition: 'right 9px center' }

/** "Request Instant Strategy Session" card of the hero (Figma 255:9336). Frontend only: nothing is sent or stored. */
function StrategyCard() {
  const { values, errors, status, onChange, onBlur, onSubmit, reset } = useFormState(INITIAL, VALIDATORS, ORDER)
  const submitting = status === 'submitting'
  const bind = (n: F) => ({ id: `hero-${n}`, name: n, value: values[n], onChange, onBlur, disabled: submitting, error: errors[n], size: 'md' as const })
  return (
    <div className="relative flex flex-col gap-1 rounded-[12px] border-t-4 border-[red] bg-white px-5 pb-8 pt-9 shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)] sm:px-8">
      <div className="flex items-center justify-between">
        <p className="font-poppins text-[12px] font-semibold uppercase leading-[16px] tracking-[0.6px] text-[red]">FAST-TRACK STRATEGY</p>
        <span className="rounded-[8px] bg-[#f3f4f6] px-[10px] py-[2px] font-poppins text-[11px] font-medium leading-[16.5px] text-[#4b5563]">Response &lt; 2 Hours</span>
      </div>
      <h2 className="pt-2 font-poppins text-[20px] font-semibold leading-[28px] text-[#111827]">Request Instant Strategy Session</h2>
      <p className="font-poppins text-[12px] leading-[19.5px] text-[#6b7280]">
        Speak directly with an enterprise practice lead to review role <br className="hidden lg:inline" />
        requisitions, bench liquidity, and comp bands.
      </p>
      {status === 'success' ? (
        <div role="status" className="mt-4 rounded-[8px] border border-[#e5e7eb] bg-[#f9fafb] p-4">
          <p className="font-poppins text-[14px] font-semibold text-[#111827]">Thank you, your request is complete.</p>
          <p className="mt-1 font-poppins text-[12px] leading-[19.5px] text-[#6b7280]">
            Your details passed validation. This form is not connected to a server yet, so nothing has been sent or saved.
          </p>
          <button type="button" onClick={reset} className="mt-3 font-poppins text-[12px] font-medium text-[red] hover:underline">
            Send another request
          </button>
        </div>
      ) : (
        <form noValidate onSubmit={onSubmit} aria-busy={submitting} className="flex flex-col gap-[14px] pb-3 pt-4">
          <Field id="hero-email" label="Work email" error={errors.email}>
            <EmailInput {...bind('email')} placeholder="vp.eng@company.com" className={controlBox('gray')} style={{ height: 41 }} />
          </Field>
          <div className="flex flex-col gap-[14px] sm:flex-row sm:gap-3">
            <Field id="hero-positions" label="Open positions" error={errors.positions} className="flex-1">
              <SelectField {...bind('positions')} options={HERO_POSITIONS} placeholder="Select a range" className={controlBox('gray')} style={{ height: 40, ...SELECT_BG }} />
            </Field>
            <Field id="hero-timeline" label="Timeline" error={errors.timeline} className="flex-1">
              <SelectField {...bind('timeline')} options={HERO_TIMELINES} placeholder="Select a timeline" className={controlBox('gray')} style={{ height: 40, ...SELECT_BG }} />
            </Field>
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-[8px] bg-[red] py-3 font-poppins text-[12px] font-medium leading-[16px] text-white drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {submitting ? 'Sending…' : 'Book Hiring Consultation'}
            <img src={iconCalendar} alt="" width={12} height={13.333} />
          </button>
        </form>
      )}
      <div className="flex items-center gap-2 border-t border-[#f3f4f6] pt-[13px]">
        <img src={iconShield} alt="" width={10.667} height={13.333} />
        <p className="font-poppins text-[11px] leading-[16.5px] text-[#6b7280]">100% Bilateral NDA Protected • Zero Commitment</p>
      </div>
    </div>
  )
}

/** HERO (Figma 255:9285): solid black, breadcrumb, headline, CTAs, stats, strategy-session card. */
export default function Hero() {
  return (
    <div className="mx-auto flex max-w-[1440px] flex-col gap-8 bg-black px-5 pb-12 pt-10 sm:px-8 lg:px-12 lg:pb-20 lg:pt-16">
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 font-poppins text-[12px] leading-[16px]">
        <Link to="/" className="flex items-center gap-[6px] text-[#9ca3af] hover:text-white">
          <img src={iconHome} alt="" width={10} height={11.25} />
          Home
        </Link>
        <span aria-hidden="true" className="text-[#4b5563]">/</span>
        <span aria-current="page" className="font-medium text-white">For Employers</span>
      </nav>
      <div className="flex flex-col gap-10 lg:grid lg:h-[489.5px] lg:grid-cols-12 lg:items-center lg:gap-x-14">
        <div className="flex flex-col lg:col-span-7">
          <div className="pb-5">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-[15px] py-[5px] font-poppins text-[11px] font-medium uppercase leading-[16.5px] tracking-[0.55px] text-[#e5e7eb]">
              <span aria-hidden="true" className="size-2 shrink-0 rounded-full bg-[red]" />
              ENTERPRISE TECH RECRUITMENT ECOSYSTEM
            </span>
          </div>
          <h1 className="pb-4 font-poppins text-[34px] font-semibold leading-[1.1] tracking-[-1.2px] text-white sm:text-[48px] sm:leading-[48px] lg:pr-[87px]">
            Scale Your Engineering &amp;
            <br className="hidden lg:inline" /> Leadership Teams with
            <br className="hidden lg:inline" /> Precision
          </h1>
          <p className="max-w-[576px] pb-8 font-poppins text-[16px] leading-[26px] text-[#d1d5db] lg:pr-[54px]">
            Connect with pre-vetted specialists who drive business velocity.
            <br className="hidden lg:inline" /> Tailored recruitment solutions for high-growth tech teams across
            <br className="hidden lg:inline" /> modern distributed architectures.
          </p>
          <div className="flex flex-wrap items-center gap-4 pb-10">
            <a href="#requisition" className="relative flex items-center gap-2 rounded-[8px] bg-[red] px-6 py-3 font-poppins text-[14px] font-medium leading-[20px] text-white shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)] transition hover:brightness-110">
              Submit Requisition
              <img src={iconArrowDown} alt="" width={12} height={12} />
            </a>
            <a href="#calculator" className="flex items-center gap-2 rounded-[8px] border border-white/15 bg-white/10 px-[25px] py-[13px] font-poppins text-[14px] font-medium leading-[20px] text-white transition hover:bg-white/20">
              <img src={iconCalculator} alt="" width={13.5} height={13.5} />
              Calculate Hiring Cost
            </a>
          </div>
          <dl className="flex max-w-[576px] justify-center gap-6 border-t border-white/15 pt-[33px] lg:w-[576px]">
            {STATS.map((s) => (
              <div key={s.label} className="flex min-w-0 flex-1 flex-col gap-[2px]">
                <dt className="order-2 font-poppins text-[12px] leading-[16px] text-[#9ca3af]">{s.label}</dt>
                <dd className={`order-1 font-poppins text-[24px] font-semibold leading-[36px] sm:text-[30px] ${s.red ? 'text-[red]' : 'text-white'}`}>{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="lg:col-span-5">
          <StrategyCard />
        </div>
      </div>
    </div>
  )
}
