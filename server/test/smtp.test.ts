import assert from 'node:assert/strict'
import type { AddressInfo } from 'node:net'
import { test } from 'node:test'
import { simpleParser } from 'mailparser'
import type { ParsedMail } from 'mailparser'
import { SMTPServer } from 'smtp-server'
import { createSmtpMailer } from '../src/services/mailer.ts'
import { DOCX, MIME, PDF, employerFields, homePayload, startServer } from './helpers.ts'

/** A real SMTP server on localhost (authenticated), so these tests exercise the actual SMTP transport end to end. */
async function startSmtp(validPass: string) {
  const received: ParsedMail[] = []
  const server = new SMTPServer({
    authOptional: false,
    allowInsecureAuth: true,
    disabledCommands: ['STARTTLS'],
    onAuth(auth, _session, cb) {
      if (auth.username === 'smtp-user' && auth.password === validPass) cb(null, { user: auth.username })
      else cb(new Error('Invalid login'))
    },
    onData(stream, _session, cb) {
      simpleParser(stream).then((m) => { received.push(m); cb() }, cb)
    },
  })
  await new Promise<void>((r) => server.listen(0, '127.0.0.1', r))
  return { received, port: (server.server.address() as AddressInfo).port, close: () => new Promise<void>((r) => server.close(() => r())) }
}

const mailCfg = (port: number, pass: string) => ({
  smtp: { host: '127.0.0.1', port, secure: false, user: 'smtp-user', pass },
  from: 'TechzConnect <no-reply@example.test>',
  adminTo: 'hr@example.test',
})

test('real SMTP: both emails are delivered with correct headers, HTML and plain-text parts', async () => {
  const smtp = await startSmtp('correct-pass')
  const s = await startServer({ mailer: createSmtpMailer(mailCfg(smtp.port, 'correct-pass')), config: { mail: mailCfg(smtp.port, 'correct-pass') } })
  const res = await s.post(homePayload({ fullName: 'Asha Verma' }))
  assert.equal(res.status, 201)
  const { reference } = await res.json()
  assert.equal(smtp.received.length, 2)

  const admin = smtp.received.find((m) => m.subject === 'New Hiring Enquiry – TechzConnect')
  const ack = smtp.received.find((m) => m.subject === 'We Have Received Your Hiring Enquiry – TechzConnect')
  assert.ok(admin && ack)
  assert.equal(admin.from?.value[0].address, 'no-reply@example.test')
  assert.equal(admin.to && !Array.isArray(admin.to) ? admin.to.value[0].address : '', 'hr@example.test')
  assert.equal(admin.replyTo?.value[0].address, 'asha@acme-test.example')
  assert.ok(admin.html && admin.text && admin.html.includes('New Hiring Enquiry Received'))
  assert.ok(admin.html.includes('&lt;script&gt;'))
  assert.equal(ack.to && !Array.isArray(ack.to) ? ack.to.value[0].address : '', 'asha@acme-test.example')
  assert.ok(ack.text?.includes(reference))
  assert.equal(admin.bcc, undefined)
  await s.close()
  await smtp.close()
})

test('real SMTP: authentication failure is a 502, not a success, and no credentials are logged', async () => {
  const smtp = await startSmtp('correct-pass')
  const cfg = mailCfg(smtp.port, 'WRONG-pass-xyz')
  const errors: string[] = []
  const s = await startServer({ mailer: createSmtpMailer(cfg), config: { mail: cfg } })
  // capture what the server logs
  const { silentLog } = await import('./helpers.ts')
  const before = silentLog.errors.length
  const res = await s.post(homePayload())
  assert.equal(res.status, 502)
  const body = await res.json()
  assert.equal(body.ok, false)
  assert.deepEqual(body.notifications, { admin: 'failed', acknowledgement: 'skipped' })
  assert.equal(smtp.received.length, 0)
  errors.push(...silentLog.errors.slice(before))
  assert.ok(errors.length >= 1)
  assert.ok(!JSON.stringify(errors).includes('WRONG-pass-xyz') && !JSON.stringify(body).includes('WRONG-pass-xyz'))
  await s.close()
  await smtp.close()
})

test('unreachable SMTP host fails safely within the timeout window', async () => {
  const cfg = { ...mailCfg(1, 'x'), smtp: { host: '127.0.0.1', port: 1, secure: false, user: 'u', pass: 'x' } }
  const s = await startServer({ mailer: createSmtpMailer(cfg), config: { mail: cfg } })
  const res = await s.post(homePayload())
  assert.equal(res.status, 502)
  await s.close()
})

test('real SMTP: the job description arrives as an attachment on the team email only', async () => {
  const smtp = await startSmtp('correct-pass')
  const s = await startServer({ mailer: createSmtpMailer(mailCfg(smtp.port, 'correct-pass')), config: { mail: mailCfg(smtp.port, 'correct-pass') } })
  for (const [name, type, content] of [['Backend JD.pdf', MIME.pdf, PDF], ['Role.docx', MIME.docx, DOCX]] as const) {
    smtp.received.length = 0
    const res = await s.postForm(employerFields({ email: `${name.split('.')[0].replace(' ', '').toLowerCase()}@acme-test.example` }), { name, type, content })
    assert.equal(res.status, 201, name)
    assert.equal(smtp.received.length, 2)
    const admin = smtp.received.find((m) => m.subject === 'New Hiring Enquiry – TechzConnect')
    const ack = smtp.received.find((m) => m.subject === 'We Have Received Your Hiring Enquiry – TechzConnect')
    assert.ok(admin && ack)
    assert.equal(admin.attachments.length, 1)
    assert.equal(admin.attachments[0].filename, name)
    assert.equal(admin.attachments[0].contentType, type)
    assert.ok(admin.attachments[0].content.equals(content), 'attachment bytes are identical')
    assert.equal(ack.attachments.length, 0)
  }
  await s.close()
  await smtp.close()
})
