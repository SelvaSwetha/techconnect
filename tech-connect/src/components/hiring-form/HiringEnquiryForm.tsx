import type { ControlSize } from '../forms/styles'
import { EmailInput, FormButton, FormField, PhoneInput, SelectField, TextAreaField, TextInput } from '../forms'
import { useHiringForm } from './useHiringForm'
import { SERVICES } from './validation'
import type { FieldName } from './validation'

interface Props {
  /** 'desktop' = fixed Figma geometry (220/240px columns, 11px text); 'fluid' = responsive stack. */
  variant: 'desktop' | 'fluid'
}

export default function HiringEnquiryForm({ variant }: Props) {
  const { values, errors, status, submitError, receipt, onChange, onBlur, onSubmit, reset } = useHiringForm()
  const desktop = variant === 'desktop'
  const submitting = status === 'submitting'
  const size: ControlSize = desktop ? 'sm' : 'md'

  // Props shared by every control; field state comes from useHiringForm.
  const bind = (name: FieldName) => ({
    id: `hf-${name}`,
    name,
    value: values[name],
    onChange,
    onBlur,
    disabled: submitting,
    error: errors[name],
    size,
  })
  const field = (name: FieldName, label: string, extra?: { wide?: boolean; required?: boolean }) => ({
    id: `hf-${name}`,
    label,
    error: errors[name],
    hideLabel: true,
    reserveErrorSpace: desktop,
    ...extra,
  })

  if (status === 'success') {
    return (
      <div role="status" className="rounded-[5px] border border-[#d1d1d1] p-5">
        <p className="font-poppins text-[15px] font-bold text-[#0f0f12]">Thank you — your hiring enquiry has been received.</p>
        {receipt ? (
          <p className="mt-2 font-poppins text-[12px] leading-[19px] text-[#5e6166]">
            Your enquiry reference: <strong className="text-[#0f0f12]">{receipt.reference}</strong>.{' '}
            {receipt.confirmationEmailSent
              ? 'A confirmation has been sent to your email address.'
              : 'We could not send the confirmation email, so please keep this reference.'}
          </p>
        ) : null}
        <FormButton variant="secondary" onClick={reset} className="mt-4">
          Fill in another brief
        </FormButton>
      </div>
    )
  }

  const grid = desktop ? 'grid-cols-[220px_240px] gap-x-[15px]' : 'grid-cols-1 gap-x-3 sm:grid-cols-2'

  return (
    <form noValidate onSubmit={onSubmit} aria-busy={submitting}>
      <div className={`grid ${grid} gap-y-2`}>
        <FormField {...field('fullName', 'Full name')}>
          <TextInput {...bind('fullName')} type="text" autoComplete="name" placeholder="Full name" />
        </FormField>
        <FormField {...field('email', 'Work email')}>
          <EmailInput {...bind('email')} placeholder="Work email" />
        </FormField>
        <FormField {...field('phone', 'Phone number')}>
          <PhoneInput {...bind('phone')} placeholder="Phone number" />
        </FormField>
        <FormField {...field('company', 'Company name')}>
          <TextInput {...bind('company')} type="text" autoComplete="organization" placeholder="Company name" />
        </FormField>
        <FormField {...field('service', 'Service required')}>
          <SelectField {...bind('service')} options={SERVICES} placeholder="Service required" />
        </FormField>
        <FormField {...field('positions', 'Number of positions (optional)')}>
          <TextInput
            {...bind('positions')}
            type="number"
            inputMode="numeric"
            min={1}
            max={1000}
            step={1}
            placeholder="Number of positions (optional)"
          />
        </FormField>
        <FormField {...field('message', 'Hiring requirements / message', { wide: true })}>
          <TextAreaField {...bind('message')} rows={3} placeholder="Hiring requirements / message" />
        </FormField>
      </div>

      {submitError ? <p role="alert" className="mt-1 font-poppins text-[12px] leading-[18px] text-[#b3261e]">{submitError}</p> : null}
      <FormButton type="submit" fullWidth disabled={submitting} className="mt-2">
        {submitting ? 'Sending…' : 'Send Hiring Brief'}
      </FormButton>
      <div className="mt-2 flex items-center justify-between font-poppins text-[11px] text-[#5e6166]">
        <span />
        <FormButton variant="link" onClick={reset} disabled={submitting}>
          Clear form
        </FormButton>
      </div>
    </form>
  )
}
