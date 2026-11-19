import { useRef, useState } from 'react'
import type { ChangeEvent, DragEvent } from 'react'
import { all, email, EmailInput, minLength, optional, PhoneInput, phone, required, SelectField, TextAreaField, TextInput, useFormState } from '../../components/forms'
import type { Validator } from '../../components/forms'
import iconGateway from '../../assets/icons/for-employers/form-gateway.svg'
import iconLock from '../../assets/icons/for-employers/form-lock.svg'
import iconCompany from '../../assets/icons/for-employers/form-company.svg'
import iconRole from '../../assets/icons/for-employers/form-role.svg'
import iconChevron from '../../assets/icons/for-employers/form-chevron-down.svg'
import iconRadioDot from '../../assets/icons/for-employers/form-radio-dot.svg'
import iconUpload from '../../assets/icons/for-employers/form-upload.svg'
import iconVerified from '../../assets/icons/for-employers/form-verified.svg'
import iconSend from '../../assets/icons/for-employers/form-send.svg'
import { COMPANY_SIZES, ENGAGEMENT_CHOICES, INDUSTRIES, MODALITIES, SENIORITY } from './data'
import { controlBox } from './controlStyles'
import { Field } from './ui'

type F =
  | 'company' | 'email' | 'phone' | 'contact' | 'designation' | 'industry' | 'size'
  | 'title' | 'openings' | 'seniority' | 'modality' | 'engagement' | 'compMin' | 'compMax' | 'notes'
const ORDER: F[] = ['company', 'email', 'phone', 'contact', 'designation', 'industry', 'size', 'title', 'openings', 'seniority', 'modality', 'engagement', 'compMin', 'compMax', 'notes']
/** Defaults are the values drawn in the Figma frame (selects show their first choice; industry shows its placeholder). */
const INITIAL: Record<F, string> = {
  company: '', email: '', phone: '', contact: '', designation: '', industry: '', size: COMPANY_SIZES[0],
  title: '', openings: '1', seniority: 'Senior (6-10 yrs)', modality: MODALITIES[0], engagement: ENGAGEMENT_CHOICES[0], compMin: '', compMax: '', notes: '',
}
const amount = (msg: string): Validator => (v) => (/^\$?\s*\d[\d,]*(\.\d+)?$/.test(v.trim()) ? undefined : msg)
const VALIDATORS: Record<F, Validator> = {
  company: all(required('Please enter the company legal name.'), minLength(2, 'Company name must be at least 2 characters.')),
  email: all(required('Please enter your business email.'), email('Enter a valid email address, e.g. you@company.com.')),
  phone: all(required('Please enter a phone number.'), phone('Enter a valid phone number (7–15 digits).')),
  contact: all(required('Please enter the contact person name.'), minLength(2, 'Name must be at least 2 characters.')),
  designation: required('Please enter the designation / title.'),
  industry: required('Please select the primary industry.'),
  size: required('Please select the company size.'),
  title: all(required('Please enter the target job title.'), minLength(3, 'Job title must be at least 3 characters.')),
  openings: (v) => (/^\d+$/.test(v.trim()) && Number(v) >= 1 && Number(v) <= 500 ? undefined : 'Enter a whole number between 1 and 500.'),
  seniority: required('Please select the seniority level.'),
  modality: required('Please select the work modality.'),
  engagement: required('Please choose an engagement model.'),
  compMin: optional(amount('Enter an amount, e.g. $140,000.')),
  compMax: optional(amount('Enter an amount, e.g. $190,000.')),
  notes: () => undefined,
}
const MAX_BYTES = 10 * 1024 * 1024
const FILE_RE = /\.(pdf|docx)$/i
const SELECT_BG = { backgroundImage: `url("${iconChevron}")`, backgroundSize: '18px 18px', backgroundPosition: 'right 9px center' }
const GROUP_HEAD = 'flex items-center gap-2 border-b border-[#e5e7eb] pb-[9px] font-poppins text-[14px] font-semibold leading-[20px] text-[#111827]'

/** STREAMLINED HIRING REQUISITION FORM (Figma 255:9383). Frontend only: nothing is sent or stored. */
export default function RequisitionForm() {
  const { values, errors, status, onChange, onBlur, onSubmit, reset } = useFormState(INITIAL, VALIDATORS, ORDER)
  const [file, setFile] = useState<File | null>(null)
  const [fileError, setFileError] = useState<string>()
  const [dragging, setDragging] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)
  const submitting = status === 'submitting'
  const bind = (n: F) => ({ id: `req-${n}`, name: n, value: values[n], onChange, onBlur, disabled: submitting, error: errors[n], size: 'md' as const })
  const text = controlBox('white')
  const h41 = { height: 41 }
  const sel = { height: 40, ...SELECT_BG }

  const accept = (f: File | undefined) => {
    if (!f) return
    if (!FILE_RE.test(f.name)) { setFile(null); setFileError('Please attach a PDF or DOCX file.'); return }
    if (f.size > MAX_BYTES) { setFile(null); setFileError('The file must be 10 MB or smaller.'); return }
    setFileError(undefined)
    setFile(f)
  }
  const pick = (e: ChangeEvent<HTMLInputElement>) => { accept(e.target.files?.[0]); e.target.value = '' }
  const drop = (e: DragEvent<HTMLElement>) => { e.preventDefault(); setDragging(false); if (!submitting) accept(e.dataTransfer.files?.[0]) }
  const clear = () => { reset(); setFile(null); setFileError(undefined) }

  return (
    <div id="requisition" className="scroll-mt-24 overflow-hidden rounded-[16px] border border-[#e5e7eb] bg-[#f7f9fb] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)]">
      <div className="flex flex-col items-start justify-between gap-5 bg-black p-6 sm:p-10 lg:flex-row lg:items-center">
        <div className="flex flex-col gap-1">
          <p className="flex items-center gap-[6px] font-poppins text-[12px] font-medium uppercase leading-[16px] tracking-[0.6px] text-[red]">
            <img src={iconGateway} alt="" width={13.5} height={15} />
            ENTERPRISE REQUISITION GATEWAY
          </p>
          <h2 className="pt-1 font-poppins text-[26px] font-semibold leading-[36px] tracking-[-0.75px] text-white sm:text-[30px]">Submit Your Hiring Requisition</h2>
          <p className="font-poppins text-[12px] leading-[16px] text-[#d1d5db]">
            Complete your specification below. Our specialized technical recruitment division reviews all inputs within 2 working hours.
          </p>
        </div>
        <p className="flex shrink-0 items-center gap-2 rounded-[8px] border border-white/10 bg-white/10 px-[17px] py-[9px] font-poppins text-[12px] leading-[16px] text-white">
          <img src={iconLock} alt="" width={12} height={15.75} />
          Enterprise Encrypted &amp; Protected
        </p>
      </div>
      {status === 'success' ? (
        <div role="status" className="p-6 sm:p-10">
          <p className="font-poppins text-[20px] font-semibold text-[#111827]">Thank you, your requisition is complete.</p>
          <p className="mt-2 font-poppins text-[13px] leading-[20px] text-[#6b7280]">
            Your details passed validation. This form is not connected to a server yet, so nothing has been sent or saved.
          </p>
          <button type="button" onClick={clear} className="mt-5 h-10 rounded-[8px] border border-[#d1d5db] bg-white px-5 font-poppins text-[12px] font-medium text-[#1f2937] hover:border-[#111827]">
            Submit another requisition
          </button>
        </div>
      ) : (
        <form noValidate onSubmit={onSubmit} aria-busy={submitting} className="flex flex-col gap-8 p-6 sm:p-10">
          <div className="flex flex-col gap-8 lg:flex-row">
            <div className="flex min-w-0 flex-col gap-4 lg:flex-1">
              <h3 className={`${GROUP_HEAD} w-full`}><img src={iconCompany} alt="" width={15} height={13.5} />Company &amp; Contact Details</h3>
              <Field id="req-company" label="Company legal name" required error={errors.company}>
                <TextInput {...bind('company')} autoComplete="organization" placeholder="e.g. Acme Cloud Technologies Inc." className={text} style={h41} />
              </Field>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field id="req-email" label="Business email" required error={errors.email}>
                  <EmailInput {...bind('email')} placeholder="you@company.com" className={text} style={h41} />
                </Field>
                <Field id="req-phone" label="Phone number" required error={errors.phone}>
                  <PhoneInput {...bind('phone')} placeholder="+1 (555) 000-0000" className={text} style={h41} />
                </Field>
                <Field id="req-contact" label="Contact person name" required error={errors.contact}>
                  <TextInput {...bind('contact')} autoComplete="name" placeholder="e.g. Marcus Vance" className={text} style={h41} />
                </Field>
                <Field id="req-designation" label="Designation / title" required error={errors.designation}>
                  <TextInput {...bind('designation')} autoComplete="organization-title" placeholder="e.g. VP of Engineering" className={text} style={h41} />
                </Field>
                <Field id="req-industry" label="Primary industry" required error={errors.industry}>
                  <SelectField {...bind('industry')} options={INDUSTRIES} placeholder="Select industry" className={text} style={sel} />
                </Field>
                <Field id="req-size" label="Company size" required error={errors.size}>
                  <SelectField {...bind('size')} options={COMPANY_SIZES} placeholder="Select company size" className={text} style={sel} />
                </Field>
              </div>
            </div>
            <div className="flex min-w-0 flex-col gap-4 pb-1 lg:flex-1">
              <h3 className={`${GROUP_HEAD} w-full`}><img src={iconRole} alt="" width={15} height={15} />Role &amp; Scope Parameters</h3>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <Field id="req-title" label="Target job title" required error={errors.title} className="sm:col-span-2">
                  <TextInput {...bind('title')} placeholder="e.g. Lead Distributed Systems Engineer" className={text} style={h41} />
                </Field>
                <Field id="req-openings" label="Openings" required error={errors.openings}>
                  <TextInput {...bind('openings')} type="number" inputMode="numeric" min={1} max={500} className={`${text} px-[13px]!`} style={h41} />
                </Field>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field id="req-seniority" label="Seniority level" required error={errors.seniority}>
                  <SelectField {...bind('seniority')} options={SENIORITY} placeholder="Select seniority" className={text} style={sel} />
                </Field>
                <Field id="req-modality" label="Work modality" required error={errors.modality}>
                  <SelectField {...bind('modality')} options={MODALITIES} placeholder="Select modality" className={text} style={sel} />
                </Field>
              </div>
              <div role="radiogroup" aria-labelledby="req-engagement-label" className="flex flex-col gap-1">
                <p id="req-engagement-label" className="font-poppins text-[11px] font-medium uppercase leading-[16.5px] text-[#4b5563]">ENGAGEMENT MODEL *</p>
                <div className="flex flex-col gap-3 sm:flex-row">
                  {ENGAGEMENT_CHOICES.map((c) => {
                    const on = values.engagement === c
                    return (
                      <label
                        key={c}
                        className={`flex min-w-0 flex-1 cursor-pointer items-center rounded-[8px] border border-[#e5e7eb] bg-white font-poppins text-[12px] leading-[16px] text-[#1f2937] has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-[red] ${on ? 'gap-[7px] py-[10px] pl-[10px]' : 'gap-2 p-[11px]'}`}
                      >
                        <input type="radio" name="engagement" value={c} checked={on} onChange={onChange} disabled={submitting} className="sr-only" />
                        {on ? (
                          <span aria-hidden="true" className="flex size-[18px] shrink-0 items-center justify-center rounded-[16px] border border-transparent bg-[red] p-px">
                            <img src={iconRadioDot} alt="" width={16} height={16} />
                          </span>
                        ) : (
                          <span aria-hidden="true" className="size-4 shrink-0 rounded-[16px] border border-[#6b7280] bg-white" />
                        )}
                        {c}
                      </label>
                    )
                  })}
                </div>
                {errors.engagement ? <p role="alert" className="mt-1 text-[10px] leading-[13px] text-[#d40000]">{errors.engagement}</p> : null}
              </div>
              <div className="flex flex-col gap-1">
                <p id="req-comp-label" className="font-poppins text-[11px] font-medium uppercase leading-[16.5px] text-[#4b5563]">TARGET ANNUAL COMPENSATION BAND</p>
                <div role="group" aria-labelledby="req-comp-label" className="flex items-start gap-2">
                  <div className="min-w-0 flex-1">
                    <TextInput {...bind('compMin')} inputMode="numeric" aria-label="Minimum compensation" placeholder="Min (e.g. $140,000)" className={controlBox('white')} style={{ height: 40 }} />
                    {errors.compMin ? <p id="req-compMin-err" role="alert" className="mt-1 text-[10px] leading-[13px] text-[#d40000]">{errors.compMin}</p> : null}
                  </div>
                  <span aria-hidden="true" className="pt-2 font-poppins text-[16px] leading-[24px] text-[#9ca3af]">-</span>
                  <div className="min-w-0 flex-1">
                    <TextInput {...bind('compMax')} inputMode="numeric" aria-label="Maximum compensation" placeholder="Max (e.g. $190,000)" className={controlBox('white')} style={{ height: 40 }} />
                    {errors.compMax ? <p id="req-compMax-err" role="alert" className="mt-1 text-[10px] leading-[13px] text-[#d40000]">{errors.compMax}</p> : null}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-8 border-t border-[#e5e7eb] pt-[25px] lg:flex-row">
            <div className="flex min-w-0 flex-col gap-1 lg:flex-1">
              <p id="req-file-label" className="font-poppins text-[11px] font-medium uppercase leading-[16.5px] text-[#4b5563]">UPLOAD EXISTING JOB SPEC (OPTIONAL)</p>
              <input ref={fileRef} id="req-file" type="file" accept=".pdf,.docx" className="sr-only" onChange={pick} disabled={submitting} aria-labelledby="req-file-label" aria-describedby={fileError ? 'req-file-err' : undefined} />
              <button
                type="button"
                disabled={submitting}
                onClick={() => fileRef.current?.click()}
                onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
                onDragLeave={() => setDragging(false)}
                onDrop={drop}
                className={`flex cursor-pointer flex-col items-center rounded-[8px] border-2 border-dashed bg-white p-[26px] ${dragging ? 'border-[red]' : 'border-[#e5e7eb]'}`}
              >
                <img src={iconUpload} alt="" width={29.333} height={21.333} />
                <span className="pt-[7px] font-poppins text-[12px] font-medium leading-[16px] text-[#1f2937]">{file ? file.name : 'Drag and drop file, or browse'}</span>
                <span className="font-poppins text-[11px] leading-[16.5px] text-[#9ca3af]">PDF or DOCX up to 10MB</span>
              </button>
              {fileError ? <p id="req-file-err" role="alert" className="mt-1 text-[10px] leading-[13px] text-[#d40000]">{fileError}</p> : null}
            </div>
            <div className="flex min-w-0 flex-col gap-1 lg:flex-1 lg:pb-[33.5px]">
              <label htmlFor="req-notes" className="font-poppins text-[11px] font-medium uppercase leading-[16.5px] text-[#4b5563]">TECH STACK &amp; KEY REQUISITION NOTES</label>
              <TextAreaField {...bind('notes')} placeholder="e.g. Golang, Kubernetes, Kafka, AWS. Prior distributed systems high-throughput experience required." className={`${controlBox('white')} px-[13px]!`} height={110} />
            </div>
          </div>
          <div className="flex flex-col items-start justify-between gap-4 border-t border-[#e5e7eb] pt-[17px] sm:flex-row sm:items-center">
            <p className="flex items-center gap-2 font-poppins text-[12px] leading-[16px] text-[#6b7280]">
              <img src={iconVerified} alt="" width={16.5} height={15.75} />
              Dedicated practice lead assigned immediately upon receipt.
            </p>
            <button
              type="submit"
              disabled={submitting}
              className="flex cursor-pointer items-center justify-center gap-2 rounded-[8px] bg-[red] px-8 py-3 font-poppins text-[12px] font-medium leading-[16px] text-white drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {submitting ? 'Submitting…' : 'Submit Hiring Requisition'}
              <img src={iconSend} alt="" width={12.667} height={10.667} />
            </button>
          </div>
        </form>
      )}
    </div>
  )
}
