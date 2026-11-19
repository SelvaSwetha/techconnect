import { SOURCES } from './validation.ts'
import type { Source } from './validation.ts'

export interface SmtpConfig {
  host: string
  port: number
  secure: boolean
  user: string
  pass: string
}

export interface MailConfig {
  smtp: SmtpConfig
  from: string
  adminTo: string
  logoUrl?: string
}

export interface Config {
  port: number
  corsOrigins: string[]
  trustProxy: boolean
  storeFile: string
  /** private directory for uploaded job descriptions (never served over HTTP) */
  uploadDir: string
  /** forms allowed to submit enquiries; a form not listed here is refused (no record, no email) */
  enabledSources: Source[]
  /** null = email is not configured: the API refuses enquiries instead of pretending to send them. */
  mail: MailConfig | null
  /** names of the variables that are missing/invalid when `mail` is null */
  mailProblems: string[]
}

const EMAIL_RE = /^[^\s@<>",;]+@[^\s@<>",;]+\.[^\s@<>",;]{2,}$/
const FROM_RE = /^(?:[^<>\r\n]+<)?[^\s@<>",;]+@[^\s@<>",;]+\.[^\s@<>",;]{2,}>?$/

export function loadConfig(env: NodeJS.ProcessEnv = process.env): Config {
  const problems: string[] = []
  const need = (name: string): string => {
    const v = (env[name] ?? '').trim()
    if (!v) problems.push(name)
    return v
  }
  const host = need('SMTP_HOST')
  const portRaw = need('SMTP_PORT')
  const user = need('SMTP_USER')
  const pass = need('SMTP_PASS')
  const from = need('MAIL_FROM')
  const adminTo = need('HIRING_ENQUIRY_TO')
  const port = Number(portRaw)
  if (portRaw && (!Number.isInteger(port) || port < 1 || port > 65535)) problems.push('SMTP_PORT (invalid)')
  if (from && !FROM_RE.test(from)) problems.push('MAIL_FROM (invalid)')
  if (adminTo && !EMAIL_RE.test(adminTo)) problems.push('HIRING_ENQUIRY_TO (invalid)')

  const logoUrl = (env.MAIL_LOGO_URL ?? '').trim()
  const mail: MailConfig | null =
    problems.length === 0
      ? {
          smtp: { host, port, secure: (env.SMTP_SECURE ?? '').trim().toLowerCase() === 'true', user, pass },
          from,
          adminTo,
          logoUrl: /^https:\/\/\S+$/.test(logoUrl) ? logoUrl : undefined,
        }
      : null

  return {
    port: Number(env.PORT) || 4000,
    corsOrigins: (env.CORS_ORIGINS ?? '').split(',').map((s) => s.trim()).filter(Boolean),
    trustProxy: (env.TRUST_PROXY ?? '').trim() === '1',
    storeFile: (env.ENQUIRY_STORE_FILE ?? '').trim() || 'data/enquiries.jsonl',
    uploadDir: (env.UPLOAD_DIR ?? '').trim() || 'data/uploads',
    enabledSources: (env.ENQUIRY_FORMS_ENABLED ?? 'industries,employer-enquiry')
      .split(',').map((s) => s.trim()).filter((s): s is Source => (SOURCES as readonly string[]).includes(s)),
    mail,
    mailProblems: problems,
  }
}
