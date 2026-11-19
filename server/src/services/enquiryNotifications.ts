import type { MailConfig } from '../config.ts'
import type { EnquiryRecord, NotificationStatus } from '../store/enquiryStore.ts'
import { renderAdminEmail } from '../templates/adminEmail.ts'
import { renderUserEmail } from '../templates/userEmail.ts'
import type { AttachmentStore } from './attachments.ts'
import { describeMailError } from './mailer.ts'
import type { Mailer } from './mailer.ts'

export interface Logger {
  error(message: string): void
  warn(message: string): void
  info(message: string): void
}

interface Deps {
  mailer: Mailer
  mail: Pick<MailConfig, 'adminTo' | 'logoUrl'>
  attachments: AttachmentStore
  log: Logger
}

/**
 * Sends the internal notification and the user's acknowledgement as two independent emails, each with its own outcome.
 * The recipient of the notification is fixed server configuration; the acknowledgement goes only to the address the
 * user typed into the form (validated, single address, no control characters).
 */
export function createNotifier({ mailer, mail, attachments, log }: Deps) {
  const attempt = async (what: string, ref: string, send: () => Promise<void>): Promise<NotificationStatus> => {
    try {
      await send()
      return 'sent'
    } catch (err) {
      log.error(`[mail] ${what} email failed for ${ref}: ${describeMailError(err)}`)
      return 'failed'
    }
  }

  const sendAdmin = (record: EnquiryRecord) => {
    const m = renderAdminEmail(record, { logoUrl: mail.logoUrl })
    return attempt('admin notification', record.reference, async () => {
      const a = record.attachment
      // The job description is attached to the team's email only; if it cannot be read the email is not sent without it.
      const attached = a && !a.removed ? [{ filename: a.originalName, content: await attachments.read(a.storedName), contentType: a.contentType }] : undefined
      await mailer.send({ to: mail.adminTo, replyTo: record.fields.email, subject: m.subject, html: m.html, text: m.text, attachments: attached })
    })
  }

  const sendAcknowledgement = (record: EnquiryRecord) => {
    const m = renderUserEmail(record, { logoUrl: mail.logoUrl })
    return attempt('acknowledgement', record.reference, () =>
      mailer.send({ to: record.fields.email as string, subject: m.subject, html: m.html, text: m.text }),
    )
  }

  return { sendAdmin, sendAcknowledgement }
}

export type Notifier = ReturnType<typeof createNotifier>
