import { useRef, useState } from 'react'
import type { ChangeEvent } from 'react'
import { EmailInput, FormButton, FormField, PhoneInput, SelectField, TextAreaField, TextInput } from '../../components/forms'
import { all, email, minLength, optional, phone, required, useFormState } from '../../components/forms'
import { checkUpload, submitHiringEnquiry, UPLOAD_ACCEPT } from '../../services/enquiries'
import type { EnquiryReceipt } from '../../services/enquiries'

/** Services shown across the Solutions pages. The design only shows the preselected "Permanent Recruitment". */
const SERVICES = ['Permanent Recruitment', 'IT & Technical Recruitment', 'Executive Search', 'HR Consulting'] as const
/**
 * PROVISIONAL: the design shows only the placeholders "Select a range" / "Select a timeline". These option lists are not
 * in the reference and need confirmation.
 */
const HIRES = ['1', '2–5', '6–10', '11+'] as const
const TIMELINES = ['Immediately', 'Within 1 month', '1–3 months', '3+ months'] as const

type Field = 'service' | 'fullName' | 'company' | 'email' | 'phone' | 'roles' | 'location' | 'hires' | 'timeline' | 'details' | 'consent'
const ORDER: Field[] = ['service', 'fullName', 'company', 'email', 'phone', 'roles', 'location', 'hires', 'timeline', 'details', 'consent']
const INITIAL: Record<Field, string> = {
  service: SERVICES[0], fullName: '', company: '', email: '', phone: '', roles: '', location: '', hires: '', timeline: '', details: '', consent: '',
}
const VALIDATORS = {
  service: required('Please choose a service.'),
  fullName: all(required('Please enter your full name.'), minLength(2, 'Full name must be at least 2 characters.')),
  company: required('Please enter your company name.'),
  email: all(required('Please enter your work email.'), email('Enter a valid email address, e.g. you@company.com.')),
  phone: optional(phone('Enter a valid phone number (7–15 digits).')),
  roles: required('Please tell us which role(s) you are hiring for.'),
  location: required('Please enter the hiring location(s).'),
  hires: () => undefined,
  timeline: () => undefined,
  details: all(required('Please tell us about the role(s).'), minLength(10, 'Please add a little more detail (at least 10 characters).')),
  consent: required('Please confirm your consent to be contacted.'),
}

const LABEL = 'mb-[8px] block font-poppins text-[13px] font-medium leading-[18px] text-[#0f0f12]'
const BOX = 'border-[#dcdcdc]! rounded-[6px]! text-[13px]!'
const H = { height: 46 }

/** "Tell us about your hiring needs" enquiry of the Employer Enquiry page (Figma 234:222). Sends through the backend (validated, stored, emailed). */
export default function EmployerEnquiryForm({ fluid }: { fluid?: boolean }) {
  const [file, setFile] = useState<File | null>(null)
  const [fileError, setFileError] = useState<string>()
  const { values, errors, status, submitError, receipt, onChange, onBlur, onSubmit, reset, newSubmission } = useFormState<Field, EnquiryReceipt>(INITIAL, VALIDATORS, ORDER, {
    submit: (v, idempotencyKey, signal) =>
      submitHiringEnquiry(
        {
          source: 'employer-enquiry', idempotencyKey, fullName: v.fullName, email: v.email, company: v.company, phone: v.phone,
          service: v.service, roles: v.roles, location: v.location, hires: v.hires, timeline: v.timeline, message: v.details, consent: v.consent === 'yes',
        },
        signal,
        file,
      ),
  })
  const fileRef = useRef<HTMLInputElement>(null)
  const submitting = status === 'submitting'
  const bind = (n: Field) => ({ id: `enq-${n}`, name: n, value: values[n], onChange, onBlur, disabled: submitting, error: errors[n], size: 'md' as const })
  const field = (n: Field, label: string, req?: boolean) => ({ id: `enq-${n}`, label, error: errors[n], required: req, reserveErrorSpace: true, labelClassName: LABEL })

  const pick = (e: ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] ?? null
    if (!f) return
    newSubmission() // a different file is a different submission
    const problem = checkUpload(f)
    if (problem) { setFile(null); setFileError(problem); e.target.value = ''; return }
    setFileError(undefined); setFile(f)
  }
  const removeFile = () => {
    newSubmission()
    setFile(null); setFileError(undefined)
    if (fileRef.current) fileRef.current.value = ''
  }
  const toggleConsent = (e: ChangeEvent<HTMLInputElement>) =>
    onChange({ target: { name: 'consent', value: e.target.checked ? 'yes' : '' } } as unknown as ChangeEvent<HTMLInputElement>)
  const clear = () => { reset(); setFile(null); setFileError(undefined) }

  const wrap = fluid ? 'w-full rounded-[14px] p-5 sm:p-8' : 'w-[847px] rounded-[14px] px-[31px] pb-[36px] pt-[34px]'
  const grid = `grid gap-x-[20px] gap-y-[5px] ${fluid ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-2'}`
  const section = (n: string, t: string) => (
    <div className="col-span-full mb-[17px] mt-[10px] flex items-center gap-[10px] border-t border-[#e6e6e6] pt-[28px]">
      <span className="font-poppins text-[11px] font-semibold text-[red]">{n}</span>
      <h3 className="font-poppins text-[16px] font-semibold leading-[22px] text-[#0f0f12]">{t}</h3>
    </div>
  )

  return (
    <div id="enquiry" className={`border border-[#e0e0e0] bg-white text-[#0f0f12] ${wrap}`}>
      {status === 'success' ? (
        <div role="status" className="rounded-[8px] border border-[#e0e0e0] p-6">
          <p className="font-poppins text-[18px] font-bold">Thank you — your enquiry has been received.</p>
          <p className="mt-2 font-poppins text-[13px] leading-[20px] text-[#5d6066]">
            Your enquiry reference: <strong className="text-[#0f0f12]">{receipt?.reference}</strong>.{' '}
            {receipt?.confirmationEmailSent
              ? 'A confirmation has been sent to your email address.'
              : 'We could not send the confirmation email, so please keep this reference.'}
          </p>
          {file ? (
            <p className="mt-2 font-poppins text-[13px] leading-[20px] text-[#5d6066]">Your job description ({file.name}) was sent with this enquiry.</p>
          ) : null}
          <FormButton variant="secondary" onClick={clear} className="mt-4">
            Send another enquiry
          </FormButton>
        </div>
      ) : (
        <form noValidate onSubmit={onSubmit} aria-busy={submitting}>
          <h2 className="font-poppins text-[24px] font-bold leading-[32px]">Tell us about your hiring needs</h2>
          <p className="mb-[30px] mt-[6px] font-poppins text-[13px] leading-[18px] text-[#5d6066]">
            Fields marked <span className="text-[red]">*</span> are required.
          </p>
          <div className={grid}>
            <FormField {...{ ...field('service', 'Service of interest', true), wide: true, helperText: 'Selected from the service you were viewing. You can change this.' }}>
              <SelectField {...bind('service')} options={SERVICES} placeholder="Select a service" className={BOX} style={H} />
            </FormField>
            {section('01', 'Your contact details')}
            <FormField {...field('fullName', 'Full name', true)}>
              <TextInput {...bind('fullName')} type="text" autoComplete="name" placeholder="Your name" className={BOX} style={H} />
            </FormField>
            <FormField {...field('company', 'Company name', true)}>
              <TextInput {...bind('company')} type="text" autoComplete="organization" placeholder="Your organisation" className={BOX} style={H} />
            </FormField>
            <FormField {...field('email', 'Work email', true)}>
              <EmailInput {...bind('email')} placeholder="you@company.com" className={BOX} style={H} />
            </FormField>
            <FormField {...field('phone', 'Phone number')}>
              <PhoneInput {...bind('phone')} placeholder="Include country code" className={BOX} style={H} />
            </FormField>
            {section('02', 'Your hiring requirements')}
            <FormField {...field('roles', 'Role(s) you’re hiring for', true)}>
              <TextInput {...bind('roles')} type="text" placeholder="e.g. Software Engineer, Finance Manager" className={BOX} style={H} />
            </FormField>
            <FormField {...field('location', 'Hiring location(s)', true)}>
              <TextInput {...bind('location')} type="text" placeholder="City, country or remote" className={BOX} style={H} />
            </FormField>
            <FormField {...field('hires', 'Number of hires')}>
              <SelectField {...bind('hires')} options={HIRES} placeholder="Select a range" className={BOX} style={H} />
            </FormField>
            <FormField {...field('timeline', 'Preferred hiring timeline')}>
              <SelectField {...bind('timeline')} options={TIMELINES} placeholder="Select a timeline" className={BOX} style={H} />
            </FormField>
            <FormField {...{ ...field('details', 'What should we know about the role(s)?', true), wide: true }}>
              <TextAreaField {...bind('details')} rows={4} placeholder="Share key skills, experience, team context and any specific hiring challenges." className={BOX} height={110} />
            </FormField>
          </div>

          <div className="-mt-[6px] flex items-center justify-between rounded-[8px] border border-dashed border-[#d6d6d6] px-[22px] py-[16px]">
            <div className="flex min-w-0 items-center gap-[14px]">
              <svg aria-hidden="true" className="shrink-0" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="red" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48" />
              </svg>
              <div>
                <p className="font-poppins text-[13px] font-semibold leading-[18px]">
                  {file ? file.name : <>Attach a job description <span className="font-normal text-[#5d6066]">(optional)</span></>}
                </p>
                <p className="font-poppins text-[11px] leading-[16px] text-[#5d6066]">PDF, DOC or DOCX, up to 5 MB</p>
              </div>
            </div>
            <input ref={fileRef} id="enq-file" type="file" accept={UPLOAD_ACCEPT} className="sr-only" onChange={pick} disabled={submitting} aria-describedby={fileError ? 'enq-file-err' : undefined} />
            <div className="flex shrink-0 items-center gap-3 whitespace-nowrap pl-3">
              {file ? (
                <button type="button" onClick={removeFile} disabled={submitting} className="font-poppins text-[13px] font-medium text-[#5d6066] hover:underline">
                  Remove
                </button>
              ) : null}
              <button type="button" onClick={() => fileRef.current?.click()} disabled={submitting} className="font-poppins text-[13px] font-semibold text-[red] hover:underline">
                {file ? 'Change' : 'Browse files'}
              </button>
            </div>
          </div>
          {fileError ? <p id="enq-file-err" role="alert" className="mt-1 font-poppins text-[11px] text-[#b3261e]">{fileError}</p> : null}

          <div className="mt-[16px]">
            <label className="flex items-start gap-[10px] font-poppins text-[12px] leading-[18px] text-[#5d6066]">
              <input
                id="enq-consent" name="consent" type="checkbox" checked={values.consent === 'yes'} onChange={toggleConsent} disabled={submitting}
                aria-invalid={errors.consent ? true : undefined} aria-describedby={errors.consent ? 'enq-consent-err' : undefined}
                className="mt-[2px] h-[18px] w-[18px] shrink-0 accent-[red]"
              />
              <span>
                I agree to be contacted by TechzConnect about this enquiry and have read the <a href="#" className="font-medium text-[#0f0f12] underline">Privacy Policy</a>. <span className="text-[red]">*</span>
              </span>
            </label>
            <p id="enq-consent-err" role={errors.consent ? 'alert' : undefined} className="min-h-[16px] pt-1 font-poppins text-[11px] text-[#b3261e]">{errors.consent}</p>
          </div>
          {submitError ? <p role="alert" className="mt-[8px] font-poppins text-[12px] leading-[18px] text-[#b3261e]">{submitError}</p> : null}
          <FormButton type="submit" fullWidth disabled={submitting} style={{ height: 50 }} className="mt-[8px] rounded-[6px]!">
            {submitting ? 'Sending…' : 'Send Hiring Enquiry →'}
          </FormButton>
          <p className="mt-[18px] text-center font-poppins text-[11px] leading-[16px] text-[#5d6066]">This starts a conversation, not a commitment to an engagement.</p>
        </form>
      )}
    </div>
  )
}
