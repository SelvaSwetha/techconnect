import assert from 'node:assert/strict'
import { randomUUID } from 'node:crypto'
import { test } from 'node:test'
import { FakeMailer, homePayload, silentLog, startServer } from './helpers.ts'

test('valid enquiry: 201, admin mail goes only to the configured address, user gets an acknowledgement', async () => {
  const mailer = new FakeMailer()
  const s = await startServer({ mailer })
  const res = await s.post(homePayload({ to: 'attacker@evil.test', bcc: 'attacker@evil.test', adminTo: 'attacker@evil.test' }))
  assert.equal(res.status, 201)
  const body = await res.json()
  assert.equal(body.ok, true)
  assert.match(body.reference, /^TC-\d{8}-[A-Z2-9]{6}$/)
  assert.deepEqual(body.notifications, { admin: 'sent', acknowledgement: 'sent' })
  assert.equal(mailer.sent.length, 2)
  const [admin, ack] = mailer.sent
  assert.equal(admin.to, 'hr@example.test')
  assert.equal(admin.replyTo, 'asha@acme-test.example')
  assert.equal(ack.to, 'asha@acme-test.example')
  assert.ok(ack.text.includes(body.reference))
  assert.ok(![...mailer.sent].some((m) => m.to.includes('evil')))
  await s.close()
})

test('missing fields and invalid email: 400 with field errors and nothing is sent', async () => {
  const mailer = new FakeMailer()
  const s = await startServer({ mailer })
  let res = await s.post({ source: 'home', idempotencyKey: randomUUID() })
  assert.equal(res.status, 400)
  assert.ok((await res.json()).fieldErrors.fullName)
  res = await s.post(homePayload({ email: 'nope' }))
  assert.equal(res.status, 400)
  assert.ok((await res.json()).fieldErrors.email)
  res = await s.post(null, '{not json')
  assert.equal(res.status, 400)
  assert.equal(mailer.sent.length, 0)
  await s.close()
})

test('same idempotency key (double click / retry) does not send twice', async () => {
  const mailer = new FakeMailer()
  const s = await startServer({ mailer })
  const p = homePayload()
  const a = await (await s.post(p)).json()
  const bRes = await s.post(p)
  const b = await bRes.json()
  assert.equal(bRes.status, 200)
  assert.equal(b.duplicate, true)
  assert.equal(b.reference, a.reference)
  assert.equal(mailer.sent.length, 2)
  await s.close()
})

test('identical content with a fresh key inside the window is treated as a duplicate', async () => {
  const mailer = new FakeMailer()
  const s = await startServer({ mailer })
  const a = await (await s.post(homePayload({ idempotencyKey: randomUUID() }))).json()
  const b = await (await s.post(homePayload({ idempotencyKey: randomUUID() }))).json()
  assert.equal(b.reference, a.reference)
  assert.equal(b.duplicate, true)
  assert.equal(mailer.sent.length, 2)
  await s.close()
})

test('admin email failure: 502, not reported as success, acknowledgement is NOT sent, retry delivers', async () => {
  const mailer = new FakeMailer()
  mailer.failFor.add('hr@example.test')
  const s = await startServer({ mailer })
  const p = homePayload()
  const res = await s.post(p)
  assert.equal(res.status, 502)
  const body = await res.json()
  assert.equal(body.ok, false)
  assert.deepEqual(body.notifications, { admin: 'failed', acknowledgement: 'skipped' })
  assert.equal(mailer.sent.length, 0)
  assert.ok(silentLog.errors.some((e) => e.includes('code=EAUTH smtp=535')))
  assert.ok(!JSON.stringify(silentLog.errors).includes('p@ss'))
  mailer.failFor.clear()
  const retry = await s.post(p)
  assert.equal(retry.status, 200)
  assert.deepEqual((await retry.json()).notifications, { admin: 'sent', acknowledgement: 'sent' })
  assert.equal(mailer.sent.length, 2)
  await s.close()
})

test('acknowledgement failure is reported separately; the enquiry still succeeded', async () => {
  const mailer = new FakeMailer()
  mailer.failFor.add('asha@acme-test.example')
  const s = await startServer({ mailer })
  const res = await s.post(homePayload())
  assert.equal(res.status, 201)
  assert.deepEqual((await res.json()).notifications, { admin: 'sent', acknowledgement: 'failed' })
  await s.close()
})

test('email not configured: 503, nothing is accepted or faked', async () => {
  const s = await startServer({ mailer: null, config: { mail: null, mailProblems: ['SMTP_HOST'] } })
  const res = await s.post(homePayload())
  assert.equal(res.status, 503)
  const body = await res.json()
  assert.equal(body.code, 'EMAIL_NOT_CONFIGURED')
  assert.equal(body.ok, false)
  const health = await (await fetch(`${s.base}/api/health`)).json()
  assert.equal(health.emailConfigured, false)
  await s.close()
})

test('rate limit: requests over the per-IP limit get 429', async () => {
  const mailer = new FakeMailer()
  const s = await startServer({ mailer, limit: 3 })
  const codes: number[] = []
  for (let i = 0; i < 5; i++) codes.push((await s.post({ source: 'home' })).status)
  assert.deepEqual(codes, [400, 400, 400, 429, 429])
  await s.close()
})

test('one email address cannot trigger more than 3 acknowledgements per hour', async () => {
  const mailer = new FakeMailer()
  const s = await startServer({ mailer })
  const codes: number[] = []
  for (let i = 0; i < 5; i++) codes.push((await s.post(homePayload({ message: `Different requirement number ${i} for hiring` }))).status)
  assert.deepEqual(codes, [201, 201, 201, 429, 429])
  await s.close()
})

test('oversized body is rejected and unknown routes 404', async () => {
  const s = await startServer({ mailer: new FakeMailer() })
  const big = await s.post(homePayload({ message: 'x'.repeat(40_000) }))
  assert.equal(big.status, 413)
  assert.equal((await fetch(`${s.base}/api/nope`)).status, 404)
  await s.close()
})
