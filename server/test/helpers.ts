import { mkdtemp } from 'node:fs/promises'
import type { AddressInfo } from 'node:net'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { randomUUID } from 'node:crypto'
import { createApp } from '../src/app.ts'
import type { Config } from '../src/config.ts'
import type { Logger } from '../src/services/enquiryNotifications.ts'
import type { Mailer, OutgoingMail } from '../src/services/mailer.ts'
import { FileAttachmentStore } from '../src/services/attachments.ts'
import { FileEnquiryStore } from '../src/store/enquiryStore.ts'

export const silentLog: Logger & { errors: string[] } = {
  errors: [],
  info() {},
  warn() {},
  error(m: string) {
    this.errors.push(m)
  },
}

export class FakeMailer implements Mailer {
  sent: OutgoingMail[] = []
  /** recipients whose send should fail */
  failFor = new Set<string>()
  async send(mail: OutgoingMail) {
    if (this.failFor.has(mail.to)) throw Object.assign(new Error('boom'), { code: 'EAUTH', responseCode: 535 })
    this.sent.push(mail)
  }
}

export const testConfig = (over: Partial<Config> = {}): Config => ({
  port: 0,
  corsOrigins: [],
  trustProxy: false,
  storeFile: '',
  uploadDir: '',
  enabledSources: ['home', 'industries', 'employer-enquiry'],
  mail: { smtp: { host: 'x', port: 1, secure: false, user: 'u', pass: 'p' }, from: 'TechzConnect <no-reply@example.test>', adminTo: 'hr@example.test' },
  mailProblems: [],
  ...over,
})

export async function startServer(opts: { mailer: Mailer | null; config?: Partial<Config>; limit?: number }) {
  const dir = await mkdtemp(join(tmpdir(), 'tc-enq-'))
  const config = testConfig({ storeFile: join(dir, 'enquiries.jsonl'), ...opts.config })
  const store = await FileEnquiryStore.open(config.storeFile)
  const uploadDir = join(dir, 'uploads')
  const attachments = new FileAttachmentStore(uploadDir)
  const app = createApp({ config, store, attachments, mailer: opts.mailer, log: silentLog, rateLimit: { windowMs: 60_000, limit: opts.limit ?? 1000 } })
  const server = app.listen(0)
  await new Promise((r) => server.once('listening', r))
  const base = `http://127.0.0.1:${(server.address() as AddressInfo).port}`
  return {
    base,
    config,
    store,
    uploadDir,
    attachments,
    close: () => new Promise<void>((r) => server.close(() => r())),
    /** multipart request, as the browser sends when a job description is attached */
    postForm: (fields: Record<string, unknown>, file?: { name: string; type: string; content: Buffer | string }) => {
      const fd = new FormData()
      for (const [k, v] of Object.entries(fields)) fd.append(k, String(v))
      if (file) fd.append('jobDescription', new Blob([new Uint8Array(Buffer.from(file.content))], { type: file.type }), file.name)
      return fetch(`${base}/api/hiring-enquiries`, { method: 'POST', body: fd })
    },
    post: (body: unknown, raw?: string) =>
      fetch(`${base}/api/hiring-enquiries`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: raw ?? JSON.stringify(body) }),
  }
}

export const homePayload = (over: Record<string, unknown> = {}) => ({
  source: 'home',
  idempotencyKey: randomUUID(),
  fullName: 'Asha Verma',
  email: 'asha@acme-test.example',
  phone: '+91 98765 43210',
  company: 'Acme <Test> & Co',
  service: 'IT & Technical Recruitment',
  positions: '3',
  message: 'We need three backend engineers.\nLine two: <script>alert(1)</script>',
  ...over,
})

export const employerFields = (over: Record<string, unknown> = {}) => ({
  source: 'employer-enquiry',
  idempotencyKey: randomUUID(),
  fullName: 'Ravi Menon',
  email: 'ravi@acme-test.example',
  company: 'Acme Test',
  service: 'Permanent Recruitment',
  roles: 'Software Engineer',
  location: 'Pune',
  message: 'Need two backend engineers with Node experience.',
  consent: true,
  ...over,
})

/** minimal files that carry the real signature of each accepted type */
export const PDF = Buffer.from('%PDF-1.4 1 0 obj<<>>endobj trailer<<>> %%EOF')
export const DOC = Buffer.concat([Buffer.from([0xd0, 0xcf, 0x11, 0xe0, 0xa1, 0xb1, 0x1a, 0xe1]), Buffer.alloc(512, 1)])
export const DOCX = Buffer.concat([Buffer.from([0x50, 0x4b, 0x03, 0x04]), Buffer.from('word/document.xml'), Buffer.alloc(256, 2)])
export const MIME = {
  pdf: 'application/pdf',
  doc: 'application/msword',
  docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
}
