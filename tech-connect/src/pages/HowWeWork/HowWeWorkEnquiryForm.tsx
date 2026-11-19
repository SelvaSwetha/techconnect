import { EmailInput, FormButton, FormField, PhoneInput, SelectField, TextInput } from '../../components/forms'
import { all, email, optional, phone, required, minLength, useFormState } from '../../components/forms'

/**
 * The design only shows one value ("Software Engineering & Architecture") for this select; the other options are not
 * defined in the Figma export, so none are invented here.
 */
const REQUIREMENTS = ['Software Engineering & Architecture'] as const

type Field = 'fullName' | 'email' | 'phone' | 'requirement'
const ORDER: Field[] = ['fullName', 'email', 'phone', 'requirement']
const INITIAL: Record<Field, string> = { fullName: '', email: '', phone: '', requirement: REQUIREMENTS[0] }
const VALIDATORS = {
  fullName: all(required('Please enter your full name.'), minLength(2, 'Full name must be at least 2 characters.')),
  email: all(required('Please enter your work email.'), email('Enter a valid email address, e.g. name@company.com.')),
  phone: optional(phone('Enter a valid phone number (7–15 digits).')),
  requirement: required('Please choose a primary requirement.'),
}

const LABEL = 'mb-[7px] block font-poppins text-[11px] font-semibold uppercase leading-[13px] text-[#4b5462]'
const BOX = 'border-[#e4e6eb]! rounded-[6px]! bg-white'

/** "Schedule Recruitment Strategy Call" form of the How We Work page. Frontend only: nothing is sent or stored. */
export default function HowWeWorkEnquiryForm({ fluid }: { fluid?: boolean }) {
  const { values, errors, status, onChange, onBlur, onSubmit, reset } = useFormState(INITIAL, VALIDATORS, ORDER)
  const submitting = status === 'submitting'
  const bind = (n: Field) => ({ id: `hww-${n}`, name: n, value: values[n], onChange, onBlur, disabled: submitting, error: errors[n], size: 'md' as const })
  const field = (n: Field, label: string, req?: boolean) => ({ id: `hww-${n}`, label, error: errors[n], required: req, reserveErrorSpace: true, labelClassName: LABEL })
  const wrap = fluid ? 'w-full rounded-[10px] p-5 sm:p-8' : 'w-[596px] rounded-[10px] px-8 pb-8 pt-[32px]'

  return (
    <div id="enquiry" className={`bg-white text-[#181c1d] ${wrap}`}>
      {status === 'success' ? (
        <div role="status" className="rounded-[6px] border border-[#e4e6eb] p-6">
          <p className="font-poppins text-[18px] font-bold">Thank you — your request is complete.</p>
          <p className="mt-2 font-poppins text-[13px] leading-[20px] text-[#565d74]">
            Your details passed validation. This form is not connected to a server yet, so nothing has been sent or saved.
          </p>
          <FormButton variant="secondary" onClick={reset} className="mt-4">
            Send another request
          </FormButton>
        </div>
      ) : (
        <form noValidate onSubmit={onSubmit} aria-busy={submitting}>
          <h2 className="font-poppins text-[18px] font-bold leading-[27px]">Schedule Recruitment Strategy Call</h2>
          <p className="mb-[14px] font-poppins text-[12px] leading-[18px] text-[#565d74]">Connect with a sector partner to review roles.</p>
          <div className={`grid gap-x-[12px] gap-y-[4px] ${fluid ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-2'}`}>
            <FormField {...{ ...field('fullName', 'Full name', true), wide: true }}>
              <TextInput {...bind('fullName')} type="text" autoComplete="name" placeholder="e.g. Sarah Jenkins" className={BOX} />
            </FormField>
            <FormField {...field('email', 'Work email', true)}>
              <EmailInput {...bind('email')} placeholder="name@company.com" className={BOX} />
            </FormField>
            <FormField {...field('phone', 'Phone')}>
              <PhoneInput {...bind('phone')} placeholder="+1 (555) 000-0000" className={BOX} />
            </FormField>
            <FormField {...{ ...field('requirement', 'Primary requirement', true), wide: true }}>
              <SelectField {...bind('requirement')} options={REQUIREMENTS} placeholder="Select a requirement" className={BOX} />
            </FormField>
          </div>
          <FormButton type="submit" fullWidth disabled={submitting} style={{ height: 40 }} className="mt-[6px] rounded-[6px]! text-[12px]!">
            {submitting ? 'Scheduling…' : 'Schedule Strategy Call →'}
          </FormButton>
        </form>
      )}
    </div>
  )
}
