import assert from 'node:assert/strict'
import { randomUUID } from 'node:crypto'
import { test } from 'node:test'
import { clean, validateEnquiry } from '../src/validation.ts'
import { homePayload } from './helpers.ts'

test('a complete home enquiry is valid and trimmed', () => {
  const r = validateEnquiry(homePayload({ fullName: '  Asha   Verma ' }))
  assert.ok(r.ok)
  assert.equal(r.value.fields.fullName, 'Asha Verma')
  assert.equal(r.value.fields.positions, '3')
})

test('required fields are reported per field', () => {
  const r = validateEnquiry({ source: 'home', idempotencyKey: randomUUID() })
  assert.ok(!r.ok)
  for (const f of ['fullName', 'email', 'phone', 'company', 'service', 'message']) assert.ok(r.errors[f as 'email'], f)
})

test('rejects invalid email, phone, positions and short message', () => {
  const r = validateEnquiry(homePayload({ email: 'not-an-email', phone: 'abc', positions: '0', message: 'short' }))
  assert.ok(!r.ok)
  assert.ok(r.errors.email && r.errors.phone && r.errors.positions && r.errors.message)
})

test('email with CR/LF header-injection payload is rejected', () => {
  for (const email of ['a@b.com\r\nBcc: evil@x.com', 'a@b.com\nBcc:evil@x.com', 'a@b.com, evil@x.com', 'a b@c.com', 'a@b.com>']) {
    const r = validateEnquiry(homePayload({ email }))
    assert.ok(!r.ok && r.errors.email, JSON.stringify(email))
  }
})

test('control characters and line breaks are stripped from single-line fields', () => {
  assert.equal(clean('Asha\r\nBcc: x@y.com\u0000', false), 'Asha Bcc: x@y.com')
  assert.equal(clean('a\n\n\n\nb', true), 'a\n\nb')
})

test('unknown form, bad key and non-string values are refused', () => {
  assert.ok(!validateEnquiry({ ...homePayload(), source: 'evil' }).ok)
  assert.ok(!validateEnquiry({ ...homePayload(), idempotencyKey: 'x' }).ok)
  const r = validateEnquiry(homePayload({ fullName: { $ne: 1 } }))
  assert.ok(!r.ok && r.errors.fullName)
  assert.ok(!validateEnquiry(null).ok)
})

test('industries and employer-enquiry have their own required fields; consent is mandatory for employer-enquiry', () => {
  const key = randomUUID()
  const ind = validateEnquiry({ source: 'industries', idempotencyKey: key, fullName: 'Asha', email: 'a@b.co', company: 'X', industry: 'Finance', message: 'Hiring analysts please' })
  assert.ok(ind.ok)
  const enq = validateEnquiry({ source: 'employer-enquiry', idempotencyKey: key, fullName: 'Asha', email: 'a@b.co', company: 'X', service: 'Executive Search', roles: 'CTO', location: 'Pune', message: 'Hiring a CTO now' })
  assert.ok(!enq.ok && enq.errors.consent)
  assert.ok(validateEnquiry({ source: 'employer-enquiry', idempotencyKey: key, consent: true, fullName: 'Asha', email: 'a@b.co', company: 'X', service: 'Executive Search', roles: 'CTO', location: 'Pune', message: 'Hiring a CTO now' }).ok)
})

test('over-long values are refused', () => {
  const r = validateEnquiry(homePayload({ message: 'x'.repeat(4001) }))
  assert.ok(!r.ok && r.errors.message)
})
