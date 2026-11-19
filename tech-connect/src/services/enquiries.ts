/**
 * Hiring-enquiry API client. Talks to the Node/Express backend (server/ at the repo root): POST /api/hiring-enquiries.
 * In dev, Vite proxies /api to the server; in production set VITE_API_BASE_URL (or serve both from one origin).
 */
const API_BASE = (import.meta.env.VITE_API_BASE_URL ?? '').replace(/\/+$/, '')
const TIMEOUT_MS = 45_000

/** Job-description upload limits. The server enforces the same rules (type, content and size) independently. */
export const MAX_UPLOAD_BYTES = 5 * 1024 * 1024
export const UPLOAD_ACCEPT = '.pdf,.doc,.docx'
export const UPLOAD_TYPE_MESSAGE = 'Please attach a PDF, DOC or DOCX file.'
export const UPLOAD_SIZE_MESSAGE = 'The file must be 5 MB or smaller.'
/** Returns an error message, or undefined when the file is acceptable. */
export function checkUpload(file: File): string | undefined {
  if (!/\.(pdf|docx?)$/i.test(file.name)) return UPLOAD_TYPE_MESSAGE
  if (file.size === 0) return 'The file is empty.'
  if (file.size > MAX_UPLOAD_BYTES) return UPLOAD_SIZE_MESSAGE
  return undefined
}

export type EnquirySource = 'home' | 'industries' | 'employer-enquiry'

export interface EnquiryPayload {
  source: EnquirySource
  /** same key = same submission; the server will not create or send it twice */
  idempotencyKey: string
  fullName: string
  email: string
  company: string
  message: string
  phone?: string
  service?: string
  positions?: string
  industry?: string
  roles?: string
  location?: string
  hires?: string
  timeline?: string
  consent?: boolean
}

export interface EnquiryReceipt {
  reference: string
  /** false when the enquiry was recorded and our team notified, but the confirmation email to the user failed */
  confirmationEmailSent: boolean
}

export class EnquiryError extends Error {
  readonly fieldErrors?: Record<string, string>
  constructor(message: string, fieldErrors?: Record<string, string>) {
    super(message)
    this.name = 'EnquiryError'
    this.fieldErrors = fieldErrors
  }
}

interface ApiBody {
  ok?: boolean
  reference?: string
  error?: string
  fieldErrors?: Record<string, string>
  notifications?: { admin?: string; acknowledgement?: string }
}

/** Sends the enquiry. Resolves only when the backend confirms it was recorded AND the team was notified. */
export async function submitHiringEnquiry(payload: EnquiryPayload, signal?: AbortSignal, file?: File | null): Promise<EnquiryReceipt> {
  const timeout = AbortSignal.timeout(TIMEOUT_MS)
  let res: Response
  try {
    // With a file the request is multipart (the browser sets the boundary header); otherwise plain JSON.
    let body: BodyInit
    const headers: Record<string, string> = { Accept: 'application/json' }
    if (file) {
      const form = new FormData()
      for (const [k, v] of Object.entries(payload)) if (v !== undefined) form.append(k, String(v))
      form.append('jobDescription', file, file.name)
      body = form
    } else {
      headers['Content-Type'] = 'application/json'
      body = JSON.stringify(payload)
    }
    res = await fetch(`${API_BASE}/api/hiring-enquiries`, {
      method: 'POST',
      headers,
      body,
      signal: signal ? AbortSignal.any([signal, timeout]) : timeout,
    })
  } catch (err) {
    if (signal?.aborted) throw err // the form was closed: not an error to show
    throw new EnquiryError('We could not reach the server. Please check your connection and try again.')
  }

  let reply: ApiBody = {}
  try {
    reply = (await res.json()) as ApiBody
  } catch {
    /* non-JSON response (proxy error page etc.) */
  }

  if (res.ok && reply.ok && reply.reference) {
    return { reference: reply.reference, confirmationEmailSent: reply.notifications?.acknowledgement === 'sent' }
  }
  if (res.status === 400 || res.status === 413) throw new EnquiryError(reply.error ?? 'Please check the highlighted fields.', reply.fieldErrors)
  if (res.status === 429) throw new EnquiryError(reply.error ?? 'Too many attempts. Please wait a little and try again.')
  throw new EnquiryError(reply.error ?? 'Something went wrong while sending your enquiry. Please try again.')
}

export const newSubmissionKey = (): string => crypto.randomUUID()
