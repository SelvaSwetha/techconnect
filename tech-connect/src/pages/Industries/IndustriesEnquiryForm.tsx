import { EmailInput, FormButton, FormField, PhoneInput, SelectField, TextAreaField, TextInput } from '../../components/forms'
import { all, email, minLength, optional, phone, required, useFormState } from '../../components/forms'
import { submitHiringEnquiry } from '../../services/enquiries'
import type { EnquiryReceipt } from '../../services/enquiries'

/** The twelve industries shown on the Industries page cards (Figma 225:25). */
const INDUSTRIES = [
  'IT & Software',
  'SaaS & Technology',
  'Startups',
  'BPO / KPO',
  'Education',
  'E-commerce',
  'Manufacturing',
  'Finance',
  'Healthcare',
  'Professional Services',
  'Logistics',
  'Digital Marketing',
] as const

type Field = 'fullName' | 'email' | 'company' | 'phone' | 'industry' | 'message'
const ORDER: Field[] = ['fullName', 'email', 'company', 'phone', 'industry', 'message']
const INITIAL: Record<Field, string> = { fullName: '', email: '', company: '', phone: '', industry: '', message: '' }
const VALIDATORS = {
  fullName: all(required('Please enter your full name.'), minLength(2, 'Full name must be at least 2 characters.')),
  email: all(required('Please enter your work email.'), email('Enter a valid email address, e.g. name@company.com.')),
  company: required('Please enter your company name.'),
  phone: optional(phone('Enter a valid phone number (7–15 digits).')),
  industry: required('Please select your industry.'),
  message: all(required('Please tell us what you are hiring for.'), minLength(10, 'Please add a little more detail (at least 10 characters).')),
}

const LABEL = 'mb-[7px] block font-poppins text-[12px] font-semibold leading-[18px] text-[#0f0f11]'
const BOX = 'border-[#e0e0e0]! rounded-[8px]!'

interface Props {
  /** Fluid layout for tablet/mobile; default = the fixed 604px card from the 1440px design. */
  fluid?: boolean
}

/** "Start a hiring conversation" enquiry form of the Industries page. Sends through the backend (validated, stored, emailed). */
export default function IndustriesEnquiryForm({ fluid }: Props) {
  const { values, errors, status, submitError, receipt, onChange, onBlur, onSubmit, reset } = useFormState<Field, EnquiryReceipt>(INITIAL, VALIDATORS, ORDER, {
    submit: (v, idempotencyKey, signal) =>
      submitHiringEnquiry(
        { source: 'industries', idempotencyKey, fullName: v.fullName, email: v.email, company: v.company, phone: v.phone, industry: v.industry, message: v.message },
        signal,
      ),
  })
  const submitting = status === 'submitting'
  const bind = (n: Field) => ({ id: `ind-${n}`, name: n, value: values[n], onChange, onBlur, disabled: submitting, error: errors[n], size: 'md' as const })
  const field = (n: Field, label: string, req?: boolean) => ({ id: `ind-${n}`, label, error: errors[n], required: req, reserveErrorSpace: true, labelClassName: LABEL })
  const wrap = fluid ? 'w-full rounded-[16px] p-5 sm:p-8' : 'h-[661px] w-[604px] rounded-[16px] px-8 pt-[34px]'

  return (
    <div id="enquiry" className={`bg-white text-[#0f0f11] ${wrap}`}>
      {status === 'success' ? (
        <div role="status" className="rounded-[8px] border border-[#e0e0e0] p-6">
          <p className="font-poppins text-[18px] font-bold">Thank you — your enquiry has been received.</p>
          <p className="mt-2 font-poppins text-[13px] leading-[20px] text-[#5d6066]">
            Your enquiry reference: <strong className="text-[#0f0f11]">{receipt?.reference}</strong>.{' '}
            {receipt?.confirmationEmailSent
              ? 'A confirmation has been sent to your email address.'
              : 'We could not send the confirmation email, so please keep this reference.'}
          </p>
          <FormButton variant="secondary" onClick={reset} className="mt-4">
            Send another enquiry
          </FormButton>
        </div>
      ) : (
        <form noValidate onSubmit={onSubmit} aria-busy={submitting}>
          <h2 className="font-poppins text-[23px] font-bold leading-[34px]">Start a hiring conversation</h2>
          <p className="mb-[18px] mt-[2px] font-poppins text-[13px] leading-[20px] text-[#5d6066]">Tell us a little about your team and hiring plans.</p>
          <div className={`grid gap-x-[14px] gap-y-[6px] ${fluid ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-2'}`}>
            <FormField {...field('fullName', 'Full name', true)}>
              <TextInput {...bind('fullName')} type="text" autoComplete="name" placeholder="Your name" className={BOX} style={{ height: 48 }} />
            </FormField>
            <FormField {...field('email', 'Work email', true)}>
              <EmailInput {...bind('email')} placeholder="you@company.com" className={BOX} style={{ height: 48 }} />
            </FormField>
            <FormField {...field('company', 'Company', true)}>
              <TextInput {...bind('company')} type="text" autoComplete="organization" placeholder="Company name" className={BOX} style={{ height: 48 }} />
            </FormField>
            <FormField {...field('phone', 'Phone number')}>
              <PhoneInput {...bind('phone')} placeholder="Phone number" className={BOX} style={{ height: 48 }} />
            </FormField>
            <FormField {...{ ...field('industry', 'Industry', true), wide: true }}>
              <SelectField {...bind('industry')} options={INDUSTRIES} placeholder="Select your industry" className={BOX} style={{ height: 48 }} />
            </FormField>
            <FormField {...{ ...field('message', 'What are you hiring for?', true), wide: true }}>
              <TextAreaField {...bind('message')} rows={3} placeholder="Share roles, key skills, location and expected timelines" className={BOX} height={86} />
            </FormField>
          </div>
          <p className="mb-[18px] mt-[4px] font-poppins text-[11px] leading-[18px] text-[#5d6066]">
            By submitting, you agree to be contacted about your enquiry. See our Privacy Policy for how we handle your information.
          </p>
          {submitError ? <p role="alert" className="mb-2 font-poppins text-[12px] leading-[18px] text-[#b3261e]">{submitError}</p> : null}
          <FormButton type="submit" fullWidth disabled={submitting} style={{ height: 48 }} className="rounded-[8px]!">
            {submitting ? 'Sending…' : 'Send Hiring Enquiry'}
          </FormButton>
        </form>
      )}
    </div>
  )
}
