import nodemailer from 'nodemailer'
import type { MailConfig } from '../config.ts'

export interface OutgoingMail {
  to: string
  replyTo?: string
  subject: string
  html: string
  text: string
  attachments?: { filename: string; content: Buffer; contentType: string }[]
}

/** Thin seam over the SMTP transport so the rest of the server (and the tests) never touch nodemailer directly. */
export interface Mailer {
  send(mail: OutgoingMail): Promise<void>
}

const NO_CTL = /[\r\n\u0000-\u001f\u007f]/

/** Header values come from validated/fixed sources; this is the last line of defence against header injection. */
function assertHeaderSafe(label: string, value: string): void {
  if (NO_CTL.test(value)) throw new Error(`Refusing to send: ${label} contains control characters`)
}

export function createSmtpMailer(cfg: MailConfig): Mailer {
  const transport = nodemailer.createTransport({
    host: cfg.smtp.host,
    port: cfg.smtp.port,
    secure: cfg.smtp.secure,
    auth: { user: cfg.smtp.user, pass: cfg.smtp.pass },
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 20_000,
  })
  return {
    async send(mail) {
      assertHeaderSafe('to', mail.to)
      assertHeaderSafe('subject', mail.subject)
      if (mail.replyTo) assertHeaderSafe('replyTo', mail.replyTo)
      for (const a of mail.attachments ?? []) assertHeaderSafe('attachment filename', a.filename)
      await transport.sendMail({
        from: cfg.from,
        to: mail.to,
        replyTo: mail.replyTo,
        subject: mail.subject,
        html: mail.html,
        text: mail.text,
        attachments: mail.attachments?.map((a) => ({ filename: a.filename, content: a.content, contentType: a.contentType })),
      })
    },
  }
}

/** What is safe to log about a failed send: error codes and the SMTP status, never credentials or message content. */
export function describeMailError(err: unknown): string {
  const e = err as { code?: unknown; responseCode?: unknown; command?: unknown }
  const parts = [
    typeof e.code === 'string' ? `code=${e.code}` : '',
    typeof e.responseCode === 'number' ? `smtp=${e.responseCode}` : '',
    typeof e.command === 'string' ? `command=${e.command}` : '',
  ].filter(Boolean)
  return parts.join(' ') || 'unknown mail error'
}
