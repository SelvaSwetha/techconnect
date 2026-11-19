export const SERVICES = [
  'Permanent Recruitment',
  'Contract Staffing',
  'IT & Technical Recruitment',
  'HR Consulting',
  'Executive Search',
  'RPO',
  'Other',
] as const

export type FieldName = 'fullName' | 'email' | 'phone' | 'company' | 'service' | 'positions' | 'message'
export type FormValues = Record<FieldName, string>
export type FormErrors = Partial<Record<FieldName, string>>

export const EMPTY_VALUES: FormValues = {
  fullName: '',
  email: '',
  phone: '',
  company: '',
  service: '',
  positions: '',
  message: '',
}

export const FIELD_ORDER: FieldName[] = ['fullName', 'email', 'phone', 'company', 'service', 'positions', 'message']

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
// digits with optional leading +, spaces, dashes, dots and brackets
const PHONE_CHARS_RE = /^\+?[\d\s\-().]+$/

export function validateField(name: FieldName, raw: string): string | undefined {
  const v = raw.trim()
  switch (name) {
    case 'fullName':
      if (!v) return 'Please enter your full name.'
      if (v.length < 2) return 'Full name must be at least 2 characters.'
      return undefined
    case 'email':
      if (!v) return 'Please enter your work email.'
      if (!EMAIL_RE.test(v)) return 'Enter a valid email address, e.g. name@company.com.'
      return undefined
    case 'phone': {
      if (!v) return 'Please enter your phone number.'
      const digits = v.replace(/\D/g, '')
      if (!PHONE_CHARS_RE.test(v) || digits.length < 7 || digits.length > 15)
        return 'Enter a valid phone number (7–15 digits, e.g. +91 98765 43210).'
      return undefined
    }
    case 'company':
      return v ? undefined : 'Please enter your company name.'
    case 'service':
      return v ? undefined : 'Please select the service you require.'
    case 'positions':
      if (!v) return undefined // optional
      if (!/^\d+$/.test(v) || Number(v) < 1 || Number(v) > 1000)
        return 'Enter a whole number between 1 and 1000.'
      return undefined
    case 'message':
      if (!v) return 'Please describe your hiring requirements.'
      if (v.length < 10) return 'Please add a little more detail (at least 10 characters).'
      return undefined
  }
}

export function validateAll(values: FormValues): FormErrors {
  const errors: FormErrors = {}
  for (const name of FIELD_ORDER) {
    const e = validateField(name, values[name])
    if (e) errors[name] = e
  }
  return errors
}
