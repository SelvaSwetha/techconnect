import { useRef } from 'react'
import type { ChangeEvent } from 'react'
import { EmailInput, FormButton, FormField, PhoneInput, SelectField, TextInput } from '../../components/forms'
import { all, email, phone, required, minLength, useFormState } from '../../components/forms'
import type { Validator } from '../../components/forms'
import lock from './assets/icons/lock.svg'
import feat1 from './assets/icons/feat1.svg'
import feat2 from './assets/icons/feat2.svg'
import feat3 from './assets/icons/feat3.svg'
import network from './assets/icons/network.svg'
import paperclip from './assets/icons/paperclip.svg'
import joinArrow from './assets/icons/join-arrow.svg'

/**
 * PROVISIONAL: the design only shows the placeholders "Select" / "Select notice timeline". These option lists are not
 * in the reference and need confirmation.
 */
const EXPERIENCE = ['0-2 Yrs', '3-5 Yrs', '6-8 Yrs', '9-12 Yrs', '12+ Yrs'] as const
const NOTICE = ['Immediate', '15 Days', '30 Days', '60 Days', '90 Days'] as const

type Field = 'fullName' | 'email' | 'phone' | 'skill' | 'experience' | 'currentCtc' | 'expectedCtc' | 'notice' | 'resume' | 'consent'
const ORDER: Field[] = ['fullName', 'email', 'phone', 'skill', 'experience', 'currentCtc', 'expectedCtc', 'notice', 'resume', 'consent']
const INITIAL: Record<Field, string> = { fullName: '', email: '', phone: '', skill: '', experience: '', currentCtc: '', expectedCtc: '', notice: '', resume: '', consent: '' }
const ctc = (msg: string): Validator => (v) => (/^\d{1,3}(\.\d{1,2})?$/.test(v.trim()) && Number(v) > 0 ? undefined : msg)
const VALIDATORS: Record<Field, Validator> = {
  fullName: all(required('Please enter your full name.'), minLength(2, 'Full name must be at least 2 characters.')),
  email: all(required('Please enter your email.'), email('Enter a valid email address, e.g. name@example.com.')),
  phone: all(required('Please enter your contact number.'), phone('Enter a valid phone number (7–15 digits).')),
  skill: required('Please enter your primary skill or domain.'),
  experience: required('Please select your total experience.'),
  currentCtc: all(required('Enter your current CTC.'), ctc('Enter a number in LPA, e.g. 24.')),
  expectedCtc: all(required('Enter your expected CTC.'), ctc('Enter a number in LPA, e.g. 35.')),
  notice: required('Please select your notice period.'),
  resume: required('Please attach your resume (PDF or DOCX).'),
  consent: required('Please confirm your consent.'),
}

const LABEL = 'mb-[5px] block font-poppins text-[11px] font-semibold uppercase leading-[15.4px] text-[#4b5563]'
const BOX = 'border-[#e5e7eb]! rounded-[8px]! text-[12px]! placeholder:text-[#6b7280]!'
const H = { height: 39 }
const MAX_BYTES = 5 * 1024 * 1024

const FEATURES = [
  { icon: feat1, title: 'Pre-Screened Fast Track', body: 'Verified candidates skip ATS queues and speak straight to decision makers.' },
  { icon: feat2, title: 'Compensation Transparency', body: 'No low-ball offers. We verify market CTC bands prior to scheduling discussions.' },
  { icon: feat3, title: 'Current Employer Shield', body: 'Your profile is systematically masked from your existing company and affiliates.' },
]

/** "Join Our Exclusive Talent Network" (Figma 246:6357). Frontend only: nothing is uploaded, sent or stored. */
export default function TalentNetworkForm({ fluid }: { fluid?: boolean }) {
  const { values, errors, status, onChange, onBlur, onSubmit, reset } = useFormState(INITIAL, VALIDATORS, ORDER)
  const fileRef = useRef<HTMLInputElement>(null)
  const submitting = status === 'submitting'
  const bind = (n: Field) => ({ id: `tn-${n}`, name: n, value: values[n], onChange, onBlur, disabled: submitting, error: errors[n], size: 'md' as const })
  const field = (n: Field, label: string) => ({ id: `tn-${n}`, label: `${label} *`, error: errors[n], reserveErrorSpace: true, labelClassName: LABEL })
  const synth = (name: Field, value: string) => onChange({ target: { name, value } } as unknown as ChangeEvent<HTMLInputElement>)

  const pick = (e: ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]
    if (!f) return
    if (!/\.(pdf|docx)$/i.test(f.name) || f.size > MAX_BYTES) { synth('resume', ''); e.target.value = ''; return }
    synth('resume', f.name)
  }
  const onFileFail = !values.resume && errors.resume

  return (
    <div id="join" className={`relative overflow-hidden border border-[#e5e7eb] bg-white text-[#0f172a] ${fluid ? 'rounded-[16px] p-5 sm:p-8' : 'h-[588.5px] w-[1344px] rounded-[16px] px-[49px] pt-[44px]'}`}>
      <span aria-hidden="true" className="absolute inset-x-0 top-0 h-[4px] bg-[red]" />
      {status === 'success' ? (
        <div role="status" className="mx-auto mt-10 max-w-[560px] rounded-[12px] border border-[#e5e7eb] p-6">
          <p className="font-poppins text-[18px] font-bold">Thank you — you are on the list.</p>
          <p className="mt-2 font-poppins text-[13px] leading-[20px] text-[#6b7280]">Your details passed validation. This form is not connected to a server yet, so nothing has been sent or saved.</p>
          <FormButton variant="secondary" onClick={() => reset()} className="mt-4">Submit another profile</FormButton>
        </div>
      ) : (
        <div className={fluid ? 'flex flex-col gap-8 lg:flex-row' : 'flex'}>
          <div className={fluid ? 'lg:w-[406px] lg:shrink-0' : 'w-[487px] shrink-0'}>
            <span className="inline-flex h-[24px] items-center gap-[8px] rounded-[6px] bg-[#fef2f2] px-[12px] font-poppins text-[12px] font-semibold text-[red]">
              <img loading="lazy" decoding="async" src={lock} alt="" className="h-[13.1px] w-[10px]" />100% Confidential Candidate Protocol
            </span>
            <h2 className="mt-[16px] font-poppins text-[30px] font-bold leading-[36px] tracking-[-1.51px]">Join Our Exclusive Talent<br className="hidden sm:block" /> Network</h2>
            <p className="mt-[11px] max-w-[405px] font-poppins text-[14px] leading-[20px] tracking-[-0.05px] text-[#6b7280]">
              Don’t see the exact fit right now? Over 40% of our premier leadership and senior engineering roles are filled privately before ever being published.
            </p>
            <ul className="mt-[28px] flex flex-col gap-[16px]">
              {FEATURES.map((f) => (
                <li key={f.title} className="flex gap-[12px]">
                  <img loading="lazy" decoding="async" src={f.icon} alt="" className="h-[28px] w-[28px] shrink-0" />
                  <div>
                    <p className="font-poppins text-[12px] font-semibold leading-[16.8px]">{f.title}</p>
                    <p className="max-w-[348px] font-poppins text-[12px] leading-[16px] tracking-[-0.14px] text-[#6b7280]">{f.body}</p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-[30px] flex h-[67px] w-full max-w-[487.5px] items-center justify-between rounded-[12px] border border-[#f3f4f6] bg-[#f9fafb] pl-[17px] pr-[26px]">
              <div>
                <p className="font-poppins text-[12px] font-bold leading-[16.8px]">4,800+ Active Network Members</p>
                <p className="font-poppins text-[11px] leading-[15.4px] text-[#6b7280]">Senior engineers, leads, architects &amp; CPOs</p>
              </div>
              <img loading="lazy" decoding="async" src={network} alt="" className="h-[24.9px] w-[26px]" />
            </div>
          </div>

          <form noValidate onSubmit={onSubmit} aria-busy={submitting} className={`rounded-[16px] border border-[#f3f4f6] bg-[#f9fafb] p-[24px] sm:p-[33px] ${fluid ? 'flex-1' : 'ml-[56px] h-[494.5px] w-[703.5px] pt-[28px]'}`}>
            <div className="grid grid-cols-1 gap-x-[16px] gap-y-[1px] sm:grid-cols-2">
              <FormField {...field('fullName', 'Full name')}>
                <TextInput {...bind('fullName')} type="text" autoComplete="name" placeholder="e.g. Priyanshu Sharma" className={BOX} style={H} />
              </FormField>
              <FormField {...field('email', 'Work / personal email')}>
                <EmailInput {...bind('email')} placeholder="e.g. priyanshu@example.com" className={BOX} style={H} />
              </FormField>
              <FormField {...field('phone', 'Contact number')}>
                <PhoneInput {...bind('phone')} placeholder="+91 98765 43210" className={BOX} style={H} />
              </FormField>
              <FormField {...field('skill', 'Primary skill / domain')}>
                <TextInput {...bind('skill')} type="text" placeholder="e.g. Golang / Kubernetes / React" className={BOX} style={H} />
              </FormField>
            </div>
            <div className="grid grid-cols-1 gap-x-[16px] gap-y-[1px] sm:grid-cols-3">
              <FormField {...field('experience', 'Total experience')}>
                <SelectField {...bind('experience')} options={EXPERIENCE} placeholder="Select" className={BOX} style={H} />
              </FormField>
              <FormField {...field('currentCtc', 'Current CTC (LPA)')}>
                <TextInput {...bind('currentCtc')} type="text" inputMode="decimal" placeholder="e.g. 24" className={BOX} style={H} />
              </FormField>
              <FormField {...field('expectedCtc', 'Expected CTC (LPA)')}>
                <TextInput {...bind('expectedCtc')} type="text" inputMode="decimal" placeholder="e.g. 35" className={BOX} style={H} />
              </FormField>
            </div>
            <div className="grid grid-cols-1 gap-x-[16px] gap-y-[1px] sm:grid-cols-2">
              <FormField {...field('notice', 'Notice period')}>
                <SelectField {...bind('notice')} options={NOTICE} placeholder="Select notice timeline" className={BOX} style={H} />
              </FormField>
              <div>
                <label htmlFor="tn-resume-btn" className={LABEL}>Resume file (PDF/DOCX) *</label>
                <input ref={fileRef} id="tn-resume" name="resumeFile" type="file" accept=".pdf,.docx" className="sr-only" tabIndex={-1} onChange={pick} disabled={submitting} />
                <button
                  id="tn-resume-btn"
                  type="button"
                  name="resume"
                  onClick={() => fileRef.current?.click()}
                  disabled={submitting}
                  aria-invalid={errors.resume ? true : undefined}
                  aria-describedby={errors.resume ? 'tn-resume-err' : undefined}
                  className={`flex w-full items-center justify-between rounded-[8px] border bg-white px-3 text-left font-poppins text-[12px] ${errors.resume ? 'border-[#d40000]' : 'border-[#e5e7eb]'} ${values.resume ? 'text-[#0f172a]' : 'text-[#6b7280]'}`}
                  style={{ height: 39 }}
                >
                  <span className="truncate">{values.resume || 'Attach CV (Max 5MB)'}</span>
                  <img loading="lazy" decoding="async" src={paperclip} alt="" className="h-[15px] w-[9.4px] shrink-0" />
                </button>
                <p id="tn-resume-err" role={onFileFail ? 'alert' : undefined} className="min-h-[16px] pt-1 font-poppins text-[11px] leading-[13px] text-[#d40000]">{errors.resume ?? ''}</p>
              </div>
            </div>

            <label className="mt-[2px] flex max-w-[520px] items-start gap-[10px] font-poppins text-[11px] leading-[17px] text-[#6b7280]">
              <input
                id="tn-consent" name="consent" type="checkbox" checked={values.consent === 'yes'} disabled={submitting}
                onChange={(e) => synth('consent', e.target.checked ? 'yes' : '')}
                aria-invalid={errors.consent ? true : undefined} aria-describedby={errors.consent ? 'tn-consent-err' : undefined}
                className="mt-[1px] h-[16px] w-[16px] shrink-0 accent-[red]"
              />
              <span>I agree to confidential representation by TechzConnect and understand my profile will never be shared without prior explicit permission.</span>
            </label>
            <p id="tn-consent-err" role={errors.consent ? 'alert' : undefined} className="min-h-[16px] pt-1 font-poppins text-[11px] leading-[13px] text-[#d40000]">{errors.consent ?? ''}</p>
            <FormButton type="submit" fullWidth disabled={submitting} style={{ height: 40 }} className="rounded-[8px]! text-[12px]!">
              {submitting ? 'Submitting…' : (<>Join Talent Network <img loading="lazy" decoding="async" src={joinArrow} alt="" className="ml-[8px] inline h-[10.7px] w-[10.7px]" /></>)}
            </FormButton>
          </form>
        </div>
      )}
    </div>
  )
}
