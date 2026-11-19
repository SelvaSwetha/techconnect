import { createHash } from 'node:crypto'
import { Router } from 'express'
import type { Request, RequestHandler, Response } from 'express'
import multer from 'multer'
import { MAX_UPLOAD_BYTES, TOO_LARGE_MESSAGE, UPLOAD_FIELD, validateUpload } from '../services/attachments.ts'
import type { AttachmentStore, UploadedFile } from '../services/attachments.ts'
import type { Notifier, Logger } from '../services/enquiryNotifications.ts'
import { contentHash, newReference } from '../store/enquiryStore.ts'
import type { EnquiryRecord, EnquiryStore } from '../store/enquiryStore.ts'
import { validateEnquiry } from '../validation.ts'
import type { Source } from '../validation.ts'

const DUPLICATE_WINDOW_MS = 10 * 60_000
const PER_EMAIL_WINDOW_MS = 60 * 60_000
const PER_EMAIL_LIMIT = 3

interface Deps {
  store: EnquiryStore
  attachments: AttachmentStore
  /** forms that may submit; any other form is refused before anything is stored or sent */
  enabledSources: readonly Source[]
  /** null when SMTP is not configured: the endpoint then refuses to accept enquiries instead of pretending. */
  notifier: Notifier | null
  mailProblems: string[]
  log: Logger
  now?: () => Date
}

export function createHiringEnquiryRouter({ store, attachments, enabledSources, notifier, mailProblems, log, now = () => new Date() }: Deps): Router {
  const router = Router()

  // Multipart is only parsed when a file is sent (non-multipart JSON requests pass straight through). The file is held in
  // memory, capped at 5 MB / 1 file, and only written to the private upload directory once the enquiry is accepted.
  const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: MAX_UPLOAD_BYTES, files: 1, fields: 30, fieldSize: 16 * 1024, parts: 40 },
  }).single(UPLOAD_FIELD)
  const tooLarge = (res: Response) =>
    res.status(413).json({ ok: false, code: 'FILE_TOO_LARGE', error: TOO_LARGE_MESSAGE, fieldErrors: { [UPLOAD_FIELD]: TOO_LARGE_MESSAGE } })
  const parseUpload: RequestHandler = (req, res, next) => {
    const declared = Number(req.headers['content-length'])
    if (Number.isFinite(declared) && declared > MAX_UPLOAD_BYTES + 256 * 1024) {
      // refuse an obviously oversized body without reading it
      res.setHeader('Connection', 'close')
      tooLarge(res)
      return
    }
    upload(req, res, (err: unknown) => {
      if (!err) return next()
      if (err instanceof multer.MulterError && err.code === 'LIMIT_FILE_SIZE') return void tooLarge(res)
      res.status(400).json({ ok: false, code: 'INVALID_UPLOAD', error: 'The upload could not be read. Please attach a single PDF, DOC or DOCX file.' })
    })
  }

  /** Sends the internal notification, then (only if that worked) the acknowledgement; persists each outcome. */
  const notify = async (record: EnquiryRecord): Promise<EnquiryRecord['notifications']> => {
    const n = notifier as Notifier
    const notifications = { ...record.notifications }
    if (notifications.admin !== 'sent') notifications.admin = await n.sendAdmin(record)
    if (notifications.admin === 'sent' && notifications.acknowledgement !== 'sent') {
      notifications.acknowledgement = await n.sendAcknowledgement(record)
    } else if (notifications.admin !== 'sent') {
      notifications.acknowledgement = 'skipped' // never confirm an enquiry the team has not been notified about
    }
    let attachment = record.attachment
    if (notifications.admin === 'sent' && attachment && !attachment.removed) {
      // The document now lives in the team email; do not keep a second copy on the server.
      try {
        await attachments.remove(attachment.storedName)
        attachment = { ...attachment, removed: true }
      } catch (err) {
        log.error(`[uploads] could not remove temporary file for ${record.reference}: ${(err as Error).message}`) // the periodic sweep retries
      }
    }
    try {
      await store.update(record.reference, { notifications, ...(attachment ? { attachment } : {}) })
    } catch (err) {
      log.error(`[store] could not record notification status for ${record.reference}: ${(err as Error).message}`)
    }
    return notifications
  }

  const respond = (res: Response, record: EnquiryRecord, notifications: EnquiryRecord['notifications'], status: number, duplicate = false) => {
    if (notifications.admin === 'sent') {
      res.status(status).json({ ok: true, reference: record.reference, duplicate, notifications })
    } else {
      res.status(502).json({
        ok: false,
        code: 'DELIVERY_FAILED',
        reference: record.reference,
        error: 'We saved your enquiry but could not notify our team. Please try again in a few minutes.',
        notifications,
      })
    }
  }

  router.post('/', parseUpload, async (req: Request, res: Response) => {
    if (!notifier) {
      log.error(`[mail] enquiry refused: email is not configured (${mailProblems.join(', ')})`)
      res.status(503).json({ ok: false, code: 'EMAIL_NOT_CONFIGURED', error: 'Enquiries cannot be sent right now. Please try again later.' })
      return
    }

    const parsed = validateEnquiry(req.body)
    if (!parsed.ok) {
      res.status(400).json({ ok: false, code: 'VALIDATION_FAILED', error: 'Please check the highlighted fields.', fieldErrors: parsed.errors })
      return
    }
    const { source, idempotencyKey, consent, fields } = parsed.value

    if (!enabledSources.includes(source)) {
      res.status(403).json({ ok: false, code: 'FORM_NOT_ENABLED', error: 'This form is not accepting enquiries yet.' })
      return
    }

    const file = req.file as UploadedFile | undefined
    let upload: ReturnType<typeof validateUpload> | undefined
    if (file) {
      const reject = (error: string) =>
        res.status(400).json({ ok: false, code: 'VALIDATION_FAILED', error, fieldErrors: { [UPLOAD_FIELD]: error } })
      if (source !== 'employer-enquiry') return void reject('File uploads are not accepted for this form.')
      upload = validateUpload(file)
      if (!upload.ok) return void reject(upload.error)
    }
    const fileSha256 = file ? createHash('sha256').update(file.buffer).digest('hex') : undefined

    // Same submission retried (double click, network retry): never create or send twice.
    const sameKey = store.findByKey(idempotencyKey)
    if (sameKey) {
      const notifications = sameKey.notifications.admin === 'sent' ? sameKey.notifications : await notify(sameKey)
      respond(res, sameKey, notifications, 200, true)
      return
    }

    const hash = contentHash(source, fields, fileSha256)
    const t = now().getTime()
    const sameContent = store.findRecentDuplicate(hash, t - DUPLICATE_WINDOW_MS)
    if (sameContent) {
      const notifications = sameContent.notifications.admin === 'sent' ? sameContent.notifications : await notify(sameContent)
      respond(res, sameContent, notifications, 200, true)
      return
    }

    // The acknowledgement goes to a user-supplied address, so cap how often one address can trigger it.
    if (store.countByEmailSince(fields.email as string, t - PER_EMAIL_WINDOW_MS) >= PER_EMAIL_LIMIT) {
      res.status(429).json({ ok: false, code: 'TOO_MANY_REQUESTS', error: 'Too many enquiries from this email address. Please try again later.' })
      return
    }

    let attachment: EnquiryRecord['attachment']
    if (file && upload?.ok) {
      try {
        const storedName = await attachments.save(file.buffer, upload.kind)
        attachment = { storedName, originalName: upload.originalName, contentType: upload.contentType, size: file.size }
      } catch (err) {
        log.error(`[uploads] could not store upload: ${(err as Error).message}`)
        res.status(500).json({ ok: false, code: 'STORE_FAILED', error: 'We could not store your file. Please try again.' })
        return
      }
    }

    const record: EnquiryRecord = {
      reference: newReference(now()),
      createdAt: now().toISOString(),
      source,
      idempotencyKey,
      contentHash: hash,
      consent,
      fields,
      ...(attachment ? { attachment } : {}),
      notifications: { admin: 'pending', acknowledgement: 'pending' },
    }
    try {
      await store.insert(record)
    } catch (err) {
      log.error(`[store] could not record enquiry: ${(err as Error).message}`)
      if (attachment) await attachments.remove(attachment.storedName).catch(() => undefined) // no orphan upload
      res.status(500).json({ ok: false, code: 'STORE_FAILED', error: 'We could not record your enquiry. Please try again.' })
      return
    }

    respond(res, record, await notify(record), 201)
  })

  return router
}
