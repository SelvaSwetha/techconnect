import { useState } from 'react'
import type { FormEvent, ReactNode } from 'react'
import { all, email, EmailInput, FormError, FormLabel, required, SelectField, TextInput, useFormState } from '../../components/forms'
import iconChevron from '../../assets/icons/for-employers/form-chevron-down.svg'
import iconMail from '../../assets/icons/resources/mail-check.svg'
import iconShield from '../../assets/icons/resources/shield-alert.svg'
import iconRefresh from '../../assets/icons/resources/refresh.svg'
import iconUsers from '../../assets/icons/resources/users.svg'
import iconTray from '../../assets/icons/resources/download-tray-white.svg'
import iconCheck from '../../assets/icons/resources/check-white.svg'
import { LEAD } from './data'

type F = 'email' | 'company' | 'role' | 'size'
const ORDER: F[] = ['email', 'company', 'role', 'size']
const INITIAL: Record<F, string> = { email: '', company: '', role: '', size: LEAD.teamSizes[0] }
const VALIDATORS = {
  email: all(required('Please enter your work email.'), email('Enter a valid email address, e.g. alex@company.com.')),
  company: required('Please enter your company or organization.'),
  role: required('Please select your current role.'),
  size: required('Please select your team size.'),
}
const CONTROL = 'rounded-[6px]! border-[#e5e7eb]! bg-[#f9fafb]! px-[15px]! text-[12px]! text-[#111826]! placeholder:text-[#6b7280]!'
const SELECT_BG = { backgroundImage: `url("${iconChevron}")`, backgroundSize: '18px 18px', backgroundPosition: 'right 55px center' }
const POINT_ICONS = [
  { src: iconShield, w: 12, h: 15 },
  { src: iconRefresh, w: 13.5, h: 13.5 },
  { src: iconUsers, w: 18, h: 9 },
]

function Field({ id, label, required: req, error, children }: { id: string; label: string; required?: boolean; error?: string; children: ReactNode }) {
  return (
    <div className="flex min-w-0 flex-col gap-[6px]">
      <FormLabel htmlFor={id} className="block font-poppins text-[12px] font-semibold leading-4 text-[#364150]">
        {label}
        {req ? <span className="text-[red]"> *</span> : null}
      </FormLabel>
      {children}
      {error ? <FormError id={`${id}-err`} message={error} /> : null}
    </div>
  )
}

/** Dark panel with the promise of the lead magnet (PDF x 176-736, y 3040-3517). */
function Pitch() {
  return (
    <div className="flex flex-col bg-black p-6 sm:p-12 lg:w-[560px] lg:shrink-0">
      <span className="flex size-12 items-center justify-center rounded-[12px] bg-[red]">
        <img src={iconMail} alt="" width={22.75} height={19.5} />
      </span>
      <h2 className="m-0 mt-[14px] max-w-[400px] font-poppins text-[22px] font-semibold leading-[30px] text-white sm:text-[24px]">{LEAD.title}</h2>
      <p className="m-0 mt-[18px] max-w-[400px] font-poppins text-[14px] leading-[21px] text-[#d1d5db]">{LEAD.description}</p>
      <ul className="m-0 mt-[22px] flex list-none flex-col gap-[11px] p-0">
        {LEAD.points.map((p, i) => (
          <li key={p} className="flex items-center gap-[10px] font-poppins text-[12px] leading-4 text-[#d1d5db]">
            <span className="flex w-[18px] shrink-0 justify-center">
              <img src={POINT_ICONS[i].src} alt="" width={POINT_ICONS[i].w} height={POINT_ICONS[i].h} />
            </span>
            {p}
          </li>
        ))}
      </ul>
      <div className="mt-6 flex items-center gap-3 border-t border-[#181818] pt-6 lg:mt-[22px]">
        <ul className="m-0 flex list-none p-0" aria-label="Regions served">
          {LEAD.regions.map((r, i) => (
            <li
              key={r}
              className={`-ml-[6px] flex size-7 items-center justify-center rounded-full border-2 border-black font-poppins text-[10px] font-bold text-white first:ml-0 ${i === 1 ? 'bg-[red]' : 'bg-[#374151]'}`}
              style={{ zIndex: i === 1 ? 2 : 1 }}
            >
              {r}
            </li>
          ))}
        </ul>
        <p className="m-0 font-poppins text-[11px] leading-4 text-[#9ca3af]">{LEAD.curated}</p>
      </div>
    </div>
  )
}

/** Lead-magnet form: client-side validation and a simulated submit only (nothing is sent, no file is delivered). */
export default function LeadMagnet() {
  const { values, errors, status, onChange, onBlur, onSubmit, reset } = useFormState(INITIAL, VALIDATORS, ORDER)
  const [packages, setPackages] = useState<string[]>([...LEAD.packages])
  const [pkgError, setPkgError] = useState<string>()
  const submitting = status === 'submitting'
  const bind = (n: F) => ({ id: `lead-${n}`, name: n, value: values[n], onChange, onBlur, disabled: submitting, error: errors[n], size: 'md' as const })
  const h = { height: 40 }

  const toggle = (p: string) => {
    setPkgError(undefined)
    setPackages((cur) => (cur.includes(p) ? cur.filter((x) => x !== p) : [...cur, p]))
  }
  const submit = (e: FormEvent<HTMLFormElement>) => {
    if (!packages.length) {
      e.preventDefault()
      setPkgError('Select at least one package.')
      return
    }
    onSubmit(e)
  }
  const again = () => {
    reset()
    setPackages([...LEAD.packages])
    setPkgError(undefined)
  }

  return (
    <div id="free-pack" className="overflow-hidden rounded-[16px] border border-[#e5e7eb] bg-white shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] lg:flex lg:h-[477px]">
      <Pitch />
      <div className="flex min-w-0 flex-1 flex-col justify-center p-6 sm:p-12 lg:pb-[56px]">
        {status === 'success' ? (
          <div role="status">
            <p className="m-0 font-poppins text-[20px] font-semibold leading-7 text-[#111826]">Thank you, your request is complete.</p>
            <p className="m-0 mt-2 max-w-[520px] font-poppins text-[12px] leading-5 text-[#6b7280]">
              Your details passed validation. This form is not connected to a server yet, so nothing has been sent and no files have been delivered.
            </p>
            <button type="button" onClick={again} className="mt-5 h-10 rounded-[8px] border border-[#d1d5db] bg-white px-5 font-poppins text-[12px] font-medium text-[#1f2937] hover:border-[#111826]">
              Start again
            </button>
          </div>
        ) : (
          <form noValidate onSubmit={submit} aria-busy={submitting}>
            <h3 className="m-0 font-poppins text-[20px] font-semibold leading-7 text-[#111826]">{LEAD.formTitle}</h3>
            <p className="m-0 mt-[5px] font-poppins text-[12px] leading-4 text-[#6b7280]">{LEAD.formDescription}</p>
            <div className="mt-[23px] grid grid-cols-1 gap-x-4 gap-y-3 sm:grid-cols-2">
              <Field id="lead-email" label="Work Email" required error={errors.email}>
                <EmailInput {...bind('email')} placeholder="alex@company.com" className={CONTROL} style={h} />
              </Field>
              <Field id="lead-company" label="Company / Organization" required error={errors.company}>
                <TextInput {...bind('company')} autoComplete="organization" placeholder="Acme Technologies" className={CONTROL} style={h} />
              </Field>
              <Field id="lead-role" label="Your Role" required error={errors.role}>
                <SelectField {...bind('role')} options={LEAD.roles} placeholder="Select your current role" className={CONTROL} style={{ ...h, ...SELECT_BG }} />
              </Field>
              <Field id="lead-size" label="Current Tech Team Size" error={errors.size}>
                <SelectField {...bind('size')} options={LEAD.teamSizes} placeholder="Select team size" className={CONTROL} style={{ ...h, ...SELECT_BG }} />
              </Field>
            </div>
            <fieldset className="m-0 mt-[15px] min-w-0 border-0 p-0">
              <legend className="mb-[9px] p-0 font-poppins text-[12px] font-semibold leading-4 text-[#364150]">Primary Package of Interest</legend>
              <div className="flex flex-wrap gap-x-4 gap-y-2">
                {LEAD.packages.map((p) => (
                  <label key={p} className="relative flex cursor-pointer items-center gap-2 font-poppins text-[12px] leading-[18px] text-[#4b5462]">
                    <input
                      type="checkbox"
                      checked={packages.includes(p)}
                      onChange={() => toggle(p)}
                      disabled={submitting}
                      className="peer size-[18px] shrink-0 cursor-pointer appearance-none rounded-[4px] border border-[#d1d5db] bg-white checked:border-[#2462eb] checked:bg-[#2462eb] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2462eb]"
                    />
                    <img src={iconCheck} alt="" width={9.18} height={7.2} className="pointer-events-none absolute left-[4.5px] top-[5.5px] hidden peer-checked:block" />
                    {p}
                  </label>
                ))}
              </div>
              {pkgError ? <FormError id="lead-pkg-err" message={pkgError} /> : null}
            </fieldset>
            <button
              type="submit"
              disabled={submitting}
              className="mt-[23px] flex h-10 items-center gap-2 rounded-[8px] bg-[red] px-8 font-poppins text-[12px] font-semibold text-white transition hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[red] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {submitting ? 'Processing...' : LEAD.submit}
              {submitting ? null : <img src={iconTray} alt="" width={12} height={12} />}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
