import type { ReactNode } from 'react'
import { all, email, EmailInput, FormError, FormLabel, PhoneInput, phone, required, TextInput, useFormState } from '../../components/forms'
import type { Validator } from '../../components/forms'
import { CTA, DOMAINS, ICON } from './data'

type F = 'name' | 'email' | 'phone' | 'focus'
const ORDER: F[] = ['name', 'email', 'phone', 'focus']
const FOCUS_OPTIONS = [CTA.form.focusDefault, ...DOMAINS.items.map((d) => d.title)]
const INITIAL: Record<F, string> = { name: '', email: '', phone: '', focus: CTA.form.focusDefault }
const VALIDATORS: Record<F, Validator> = {
  name: all(required('Please enter your full name.'), (v) => (v.trim().length >= 2 ? undefined : 'Name must be at least 2 characters.')),
  email: all(required('Please enter your work email.'), email('Enter a valid email address, e.g. name@company.com.')),
  phone: all(required('Please enter a phone number.'), phone('Enter a valid phone number (7-15 digits).')),
  focus: required('Please choose a primary focus.'),
}
const LABEL = 'mb-1 block font-poppins text-[11px] font-semibold uppercase leading-[16.5px] text-[#4b5563]'
const CONTROL = 'rounded-[4px]! border-[#e5e7eb]! px-[15px]! text-[12px]! text-[#111827]! placeholder:text-[#6b7280]!'

function Field({ id, label, error, children }: { id: string; label: string; error?: string; children: ReactNode }) {
  return (
    <div className="min-w-0">
      <FormLabel htmlFor={id} className={LABEL}>
        {label}
      </FormLabel>
      {children}
      {error ? <FormError id={`${id}-err`} message={error} /> : null}
    </div>
  )
}

/** "Schedule Recruitment Strategy Call" card. Frontend only: validated, then a simulated send (no backend, nothing stored). */
export default function CtaForm() {
  const { values, errors, status, onChange, onBlur, onSubmit, reset } = useFormState(INITIAL, VALIDATORS, ORDER)
  const submitting = status === 'submitting'
  const bind = (n: F) => ({ id: `about-${n}`, name: n, value: values[n], onChange, onBlur, disabled: submitting, error: errors[n], size: 'md' as const })
  const f = CTA.form

  return (
    <div id="schedule-call" className="w-full rounded-[8px] bg-white p-8 shadow-[0px_20px_25px_-5px_rgba(0,0,0,0.1)] lg:min-h-[387px]">
      <h2 className="m-0 font-poppins text-[18px] font-semibold leading-[28px] text-[#111827]">{f.title}</h2>
      <p className="m-0 font-poppins text-[12px] leading-[16px] text-[#6b7280]">{f.sub}</p>
      {status === 'success' ? (
        <div role="status" className="flex flex-col items-start gap-3 pt-6">
          <p className="m-0 font-poppins text-[14px] font-semibold leading-[22px] text-[#111827]">Thank you, {values.name.trim().split(/\s+/)[0]}.</p>
          <p className="m-0 font-poppins text-[12px] leading-[19px] text-[#4b5563]">Your request has been recorded. An Industry Practice Lead will follow up at {values.email.trim()}.</p>
          <button type="button" onClick={reset} className="cursor-pointer font-poppins text-[12px] font-semibold text-[red] underline">
            Submit another request
          </button>
        </div>
      ) : (
        <form noValidate onSubmit={onSubmit} className="flex flex-col gap-3 pt-5">
          <Field id="about-name" label={f.name} error={errors.name}>
            <TextInput {...bind('name')} autoComplete="name" placeholder={f.namePh} className={CONTROL} style={{ height: 39 }} />
          </Field>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-[284px_284px] sm:justify-between">
            <Field id="about-email" label={f.email} error={errors.email}>
              <EmailInput {...bind('email')} placeholder={f.emailPh} className={CONTROL} style={{ height: 39 }} />
            </Field>
            <Field id="about-phone" label={f.phone} error={errors.phone}>
              <PhoneInput {...bind('phone')} placeholder={f.phonePh} className={CONTROL} style={{ height: 39 }} />
            </Field>
          </div>
          <Field id="about-focus" label={f.focus} error={errors.focus}>
            <select
              id="about-focus"
              name="focus"
              value={values.focus}
              onChange={onChange}
              onBlur={onBlur}
              disabled={submitting}
              aria-invalid={errors.focus ? true : undefined}
              className="w-full appearance-none rounded-[4px] border border-[#e5e7eb] bg-white bg-no-repeat [background-position:right_9px_center] lg:[background-position:473px_center] px-[15px] pr-10 font-poppins text-[12px] text-[#111827] outline-none transition-colors focus:border-[red] disabled:opacity-60"
              style={{ height: 38, backgroundImage: `url("${ICON.chevron}")`, backgroundSize: '18px 18px' }}
            >
              {FOCUS_OPTIONS.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
          </Field>
          <button
            type="submit"
            disabled={submitting}
            className="flex h-10 w-full cursor-pointer items-center justify-center gap-2 rounded-[4px] bg-[red] font-poppins text-[12px] font-semibold text-white shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {submitting ? 'Sending…' : f.submit}
            {submitting ? null : <img src={ICON.arrowW10} alt="" width={10.67} height={10.67} />}
          </button>
        </form>
      )}
    </div>
  )
}
