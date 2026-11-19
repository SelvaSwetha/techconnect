/** Server-side validation + sanitising of a hiring enquiry. The client is never trusted. */

export const SOURCES = ['home', 'industries', 'employer-enquiry'] as const
export type Source = (typeof SOURCES)[number]

export const FIELDS = [
  'fullName', 'email', 'phone', 'company', 'service', 'positions', 'message',
  'industry', 'roles', 'location', 'hires', 'timeline',
] as const
export type Field = (typeof FIELDS)[number]
export type EnquiryFields = Partial<Record<Field, string>>

export interface ValidEnquiry {
  source: Source
  idempotencyKey: string
  consent: boolean
  fields: EnquiryFields
}

export type FieldErrors = Partial<Record<Field | 'consent' | 'source' | 'idempotencyKey' | 'jobDescription', string>>

const MAX: Record<Field, number> = {
  fullName: 100, email: 254, phone: 30, company: 150, service: 80, positions: 4,
  message: 4000, industry: 80, roles: 200, location: 200, hires: 40, timeline: 40,
}

/** Which fields each form must supply. Everything else it sends is optional. */
const REQUIRED: Record<Source, readonly Field[]> = {
  home: ['fullName', 'email', 'phone', 'company', 'service', 'message'],
  industries: ['fullName', 'email', 'company', 'industry', 'message'],
  'employer-enquiry': ['fullName', 'email', 'company', 'service', 'roles', 'location', 'message'],
}
const MIN_MESSAGE = 10

const EMAIL_RE = /^[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?(?:\.[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?)*\.[A-Za-z]{2,}$/
const PHONE_CHARS_RE = /^\+?[\d\s\-().]+$/
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

/** Strip control characters. Single-line fields also lose line breaks (header-injection / log-forging safe). */
export function clean(value: unknown, multiline: boolean): string {
  if (typeof value !== 'string') return ''
  let s = value.normalize('NFC').replace(/\r\n?/g, '\n')
  s = s.replace(multiline ? /[\u0000-\u0009\u000b-\u001f\u007f\u2028\u2029]/g : /[\u0000-\u001f\u007f\u2028\u2029]/g, multiline ? '' : ' ')
  s = s.replace(/[\u200b-\u200f\u202a-\u202e\u2066-\u2069\ufeff]/g, '') // zero-width / bidi controls
  return (multiline ? s.replace(/\n{3,}/g, '\n\n') : s.replace(/\s+/g, ' ')).trim()
}

export type ValidationResult = { ok: true; value: ValidEnquiry } | { ok: false; errors: FieldErrors }

export function validateEnquiry(body: unknown): ValidationResult {
  const errors: FieldErrors = {}
  const raw = body && typeof body === 'object' && !Array.isArray(body) ? (body as Record<string, unknown>) : {}

  const source = SOURCES.find((s) => s === raw.source)
  if (!source) errors.source = 'Unknown form.'
  const idempotencyKey = typeof raw.idempotencyKey === 'string' ? raw.idempotencyKey : ''
  if (!UUID_RE.test(idempotencyKey)) errors.idempotencyKey = 'Invalid submission key.'

  const fields: EnquiryFields = {}
  for (const f of FIELDS) {
    const v = clean(raw[f], f === 'message')
    if (v.length > MAX[f]) errors[f] = `Must be at most ${MAX[f]} characters.`
    else if (v) fields[f] = v
  }
  if (!source) return { ok: false, errors }

  for (const f of REQUIRED[source]) if (!fields[f] && !errors[f]) errors[f] = 'This field is required.'

  if (fields.fullName && fields.fullName.length < 2) errors.fullName = 'Full name must be at least 2 characters.'
  if (fields.email && !EMAIL_RE.test(fields.email)) errors.email = 'Enter a valid email address.'
  if (fields.phone) {
    const digits = fields.phone.replace(/\D/g, '')
    if (!PHONE_CHARS_RE.test(fields.phone) || digits.length < 7 || digits.length > 15) errors.phone = 'Enter a valid phone number (7–15 digits).'
  }
  if (fields.positions && (!/^\d+$/.test(fields.positions) || Number(fields.positions) < 1 || Number(fields.positions) > 1000))
    errors.positions = 'Enter a whole number between 1 and 1000.'
  if (fields.message && fields.message.length < MIN_MESSAGE) errors.message = `Please add a little more detail (at least ${MIN_MESSAGE} characters).`

  // JSON sends a boolean; a multipart form (used when a file is attached) sends the string 'true'
  const consent = raw.consent === true || raw.consent === 'true'
  if (source === 'employer-enquiry' && !consent) errors.consent = 'Consent is required.'

  if (Object.keys(errors).length) return { ok: false, errors }
  return { ok: true, value: { source, idempotencyKey, consent, fields } }
}
