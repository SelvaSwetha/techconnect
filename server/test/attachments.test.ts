import assert from 'node:assert/strict'
import { readdir, utimes, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { test } from 'node:test'
import { loadConfig } from '../src/config.ts'
import { FileAttachmentStore, MAX_UPLOAD_BYTES, sanitizeFileName, validateUpload } from '../src/services/attachments.ts'
import { renderAdminEmail } from '../src/templates/adminEmail.ts'
import { renderUserEmail } from '../src/templates/userEmail.ts'
import { contentHash } from '../src/store/enquiryStore.ts'
import type { EnquiryRecord } from '../src/store/enquiryStore.ts'
import { DOC, DOCX, FakeMailer, MIME, PDF, employerFields, homePayload, startServer } from './helpers.ts'

const file = (name: string, type: string, content: Buffer) => ({ originalname: name, mimetype: type, size: content.length, buffer: content })
const ADMIN = 'hr@example.test'
const filesIn = async (dir: string) => readdir(dir).catch(() => [] as string[])

// ---------- unit: type / content / name checks ----------

test('upload check: PDF, DOC and DOCX with matching content are accepted', () => {
  for (const [name, type, buf, kind] of [['jd.pdf', MIME.pdf, PDF, 'pdf'], ['jd.doc', MIME.doc, DOC, 'doc'], ['JD.DOCX', MIME.docx, DOCX, 'docx']] as const) {
    const r = validateUpload(file(name, type, buf))
    assert.ok(r.ok, name)
    assert.equal(r.kind, kind)
  }
  // Office files from some browsers/OSes carry no useful type; the content decides
  assert.ok(validateUpload(file('jd.docx', 'application/octet-stream', DOCX)).ok)
})

test('upload check: wrong extension, wrong declared type, renamed executables and empty files are rejected', () => {
  const exe = Buffer.concat([Buffer.from('MZ'), Buffer.alloc(200)])
  assert.equal(validateUpload(file('notes.txt', 'text/plain', Buffer.from('hello'))).ok, false)
  assert.equal(validateUpload(file('setup.exe', 'application/x-msdownload', exe)).ok, false)
  assert.equal(validateUpload(file('image.png', 'image/png', PDF)).ok, false)
  assert.equal(validateUpload(file('noext', MIME.pdf, PDF)).ok, false)
  assert.equal(validateUpload(file('virus.pdf', MIME.pdf, exe)).ok, false) // an executable renamed to .pdf
  assert.equal(validateUpload(file('fake.docx', MIME.docx, PDF)).ok, false) // wrong container for the extension
  assert.equal(validateUpload(file('plain.docx', MIME.docx, Buffer.from('PK\x03\x04 no word entry'))).ok, false) // a zip that is not a Word file
  assert.equal(validateUpload(file('x.pdf', 'text/html', PDF)).ok, false)
  assert.equal(validateUpload(file('empty.pdf', MIME.pdf, Buffer.alloc(0))).ok, false)
})

test('upload check: size limit is 5 MB', () => {
  const at = Buffer.concat([PDF, Buffer.alloc(MAX_UPLOAD_BYTES - PDF.length)])
  assert.equal(at.length, MAX_UPLOAD_BYTES)
  assert.ok(validateUpload(file('big.pdf', MIME.pdf, at)).ok)
  const over = validateUpload(file('big.pdf', MIME.pdf, Buffer.concat([at, Buffer.from('x')])))
  assert.equal(over.ok, false)
})

test('file names are stripped of paths, control characters and markup', () => {
  assert.equal(sanitizeFileName('..\\..\\windows\\Job <b>Desc.PDF', 'pdf'), 'Job bDesc.pdf')
  assert.equal(sanitizeFileName('/etc/passwd.doc', 'doc'), 'passwd.doc')
  assert.equal(sanitizeFileName('a\r\nBcc: x@y.z.pdf', 'pdf'), 'aBcc x@y.z.pdf')
  assert.equal(sanitizeFileName('.pdf', 'pdf'), 'job-description.pdf')
  assert.ok(sanitizeFileName(`${'a'.repeat(500)}.pdf`, 'pdf').length <= 104)
})

// ---------- API: attachment delivery ----------

test('employer enquiry with a PDF: 201, the team email carries the file, the acknowledgement does not, and no copy is kept', async () => {
  const mailer = new FakeMailer()
  const s = await startServer({ mailer })
  const res = await s.postForm(employerFields(), { name: 'Backend JD.pdf', type: MIME.pdf, content: PDF })
  assert.equal(res.status, 201)
  const body = await res.json()
  assert.equal(body.ok, true)

  const admin = mailer.sent.find((m) => m.to === ADMIN)
  const ack = mailer.sent.find((m) => m.to === 'ravi@acme-test.example')
  assert.ok(admin && ack)
  assert.equal(admin.attachments?.length, 1)
  assert.equal(admin.attachments[0].filename, 'Backend JD.pdf')
  assert.equal(admin.attachments[0].contentType, 'application/pdf')
  assert.ok(admin.attachments[0].content.equals(PDF))
  assert.ok(admin.html.includes('Job Description') && admin.html.includes('Backend JD.pdf'))
  assert.equal(ack.attachments, undefined)
  assert.deepEqual(await filesIn(s.uploadDir), [], 'temporary file removed after the team email was sent')
  await s.close()
})

test('DOC and DOCX uploads are delivered too', async () => {
  for (const [name, type, content] of [['jd.doc', MIME.doc, DOC], ['jd.docx', MIME.docx, DOCX]] as const) {
    const mailer = new FakeMailer()
    const s = await startServer({ mailer })
    const res = await s.postForm(employerFields(), { name, type, content })
    assert.equal(res.status, 201, name)
    assert.ok(mailer.sent.find((m) => m.to === ADMIN)?.attachments?.[0].content.equals(content), name)
    await s.close()
  }
})

test('exactly 5 MB is accepted', async () => {
  const mailer = new FakeMailer()
  const s = await startServer({ mailer })
  const content = Buffer.concat([PDF, Buffer.alloc(MAX_UPLOAD_BYTES - PDF.length)])
  const res = await s.postForm(employerFields(), { name: 'max.pdf', type: MIME.pdf, content })
  assert.equal(res.status, 201)
  assert.equal(mailer.sent.find((m) => m.to === ADMIN)?.attachments?.[0].content.length, MAX_UPLOAD_BYTES)
  await s.close()
})

test('the enquiry still works without a file (multipart and JSON)', async () => {
  const mailer = new FakeMailer()
  const s = await startServer({ mailer })
  assert.equal((await s.postForm(employerFields())).status, 201)
  assert.equal((await s.post(employerFields({ email: 'other@acme-test.example' }))).status, 201)
  assert.ok(mailer.sent.every((m) => !m.attachments))
  await s.close()
})

// ---------- API: rejected uploads ----------

test('invalid file type: 400 with a file error, nothing stored, nothing emailed', async () => {
  const mailer = new FakeMailer()
  const s = await startServer({ mailer })
  const res = await s.postForm(employerFields(), { name: 'notes.txt', type: 'text/plain', content: 'hello' })
  assert.equal(res.status, 400)
  const body = await res.json()
  assert.equal(body.fieldErrors.jobDescription, 'Please attach a PDF, DOC or DOCX file.')
  assert.equal(mailer.sent.length, 0)
  assert.deepEqual(await filesIn(s.uploadDir), [])
  assert.equal(s.store.findByKey(employerFields().idempotencyKey), undefined)
  await s.close()
})

test('a file whose content does not match its extension is rejected', async () => {
  const mailer = new FakeMailer()
  const s = await startServer({ mailer })
  const res = await s.postForm(employerFields(), { name: 'invoice.pdf', type: MIME.pdf, content: 'MZ this is not a pdf' })
  assert.equal(res.status, 400)
  assert.match((await res.json()).fieldErrors.jobDescription, /does not look like a valid/)
  assert.equal(mailer.sent.length, 0)
  await s.close()
})

test('oversized file (5 MB + 1 byte): 413, nothing stored, nothing emailed', async () => {
  const mailer = new FakeMailer()
  const s = await startServer({ mailer })
  const content = Buffer.concat([PDF, Buffer.alloc(MAX_UPLOAD_BYTES - PDF.length + 1)])
  const res = await s.postForm(employerFields(), { name: 'big.pdf', type: MIME.pdf, content })
  assert.equal(res.status, 413)
  const body = await res.json()
  assert.equal(body.code, 'FILE_TOO_LARGE')
  assert.equal(body.fieldErrors.jobDescription, 'The file must be 5 MB or smaller.')
  assert.equal(mailer.sent.length, 0)
  assert.deepEqual(await filesIn(s.uploadDir), [])
  await s.close()
})

test('a much larger body is refused up front', async () => {
  const mailer = new FakeMailer()
  const s = await startServer({ mailer })
  const content = Buffer.concat([PDF, Buffer.alloc(7 * 1024 * 1024)])
  const res = await s.postForm(employerFields(), { name: 'huge.pdf', type: MIME.pdf, content }).catch(() => undefined)
  // the server may close the connection before the client finishes sending; either way nothing is accepted
  if (res) assert.equal(res.status, 413)
  assert.equal(mailer.sent.length, 0)
  assert.deepEqual(await filesIn(s.uploadDir), [])
  await s.close()
})

test('only the Employer Enquiry form accepts a file', async () => {
  const mailer = new FakeMailer()
  const s = await startServer({ mailer })
  const res = await s.postForm({ ...homePayload() }, { name: 'jd.pdf', type: MIME.pdf, content: PDF })
  assert.equal(res.status, 400)
  assert.equal((await res.json()).fieldErrors.jobDescription, 'File uploads are not accepted for this form.')
  assert.equal(mailer.sent.length, 0)
  await s.close()
})

test('a file under an unexpected field name or several files are rejected', async () => {
  const s = await startServer({ mailer: new FakeMailer() })
  const fd = new FormData()
  for (const [k, v] of Object.entries(employerFields())) fd.append(k, String(v))
  fd.append('somethingElse', new Blob([PDF], { type: MIME.pdf }), 'a.pdf')
  assert.equal((await fetch(`${s.base}/api/hiring-enquiries`, { method: 'POST', body: fd })).status, 400)
  await s.close()
})

test('field validation still applies with a file attached (and the file is not kept)', async () => {
  const mailer = new FakeMailer()
  const s = await startServer({ mailer })
  const res = await s.postForm(employerFields({ email: 'not-an-email' }), { name: 'jd.pdf', type: MIME.pdf, content: PDF })
  assert.equal(res.status, 400)
  assert.ok((await res.json()).fieldErrors.email)
  assert.deepEqual(await filesIn(s.uploadDir), [])
  await s.close()
})

// ---------- API: failure handling, retries, duplicates ----------

test('team email fails: 502, the upload is kept for a retry; the retry attaches it and then removes it', async () => {
  const mailer = new FakeMailer()
  mailer.failFor.add(ADMIN)
  const s = await startServer({ mailer })
  const fields = employerFields()
  const first = await s.postForm(fields, { name: 'jd.pdf', type: MIME.pdf, content: PDF })
  assert.equal(first.status, 502)
  assert.equal((await filesIn(s.uploadDir)).length, 1)
  assert.equal(mailer.sent.length, 0)

  mailer.failFor.clear()
  const retry = await s.postForm(fields) // same submission key; the file is not sent again
  assert.equal(retry.status, 200)
  const admin = mailer.sent.find((m) => m.to === ADMIN)
  assert.ok(admin?.attachments?.[0].content.equals(PDF))
  assert.deepEqual(await filesIn(s.uploadDir), [])
  await s.close()
})

test('acknowledgement failure does not lose the attachment or the success', async () => {
  const mailer = new FakeMailer()
  mailer.failFor.add('ravi@acme-test.example')
  const s = await startServer({ mailer })
  const res = await s.postForm(employerFields(), { name: 'jd.pdf', type: MIME.pdf, content: PDF })
  assert.equal(res.status, 201)
  assert.deepEqual((await res.json()).notifications, { admin: 'sent', acknowledgement: 'failed' })
  assert.ok(mailer.sent.find((m) => m.to === ADMIN)?.attachments?.[0].content.equals(PDF))
  await s.close()
})

test('duplicate submission with the same file is sent once; the same text with a different file is a new enquiry', async () => {
  const mailer = new FakeMailer()
  const s = await startServer({ mailer })
  const a = await s.postForm(employerFields(), { name: 'jd.pdf', type: MIME.pdf, content: PDF })
  const b = await s.postForm(employerFields(), { name: 'jd.pdf', type: MIME.pdf, content: PDF }) // fresh key, same content
  assert.equal(a.status, 201)
  assert.equal(b.status, 200)
  assert.equal((await b.json()).duplicate, true)
  assert.equal(mailer.sent.filter((m) => m.to === ADMIN).length, 1)

  const c = await s.postForm(employerFields(), { name: 'jd2.docx', type: MIME.docx, content: DOCX })
  assert.equal(c.status, 201)
  assert.equal(mailer.sent.filter((m) => m.to === ADMIN).length, 2)
  await s.close()
})

test('the upload folder is private: no route serves it', async () => {
  const mailer = new FakeMailer()
  mailer.failFor.add(ADMIN) // keep the file on disk
  const s = await startServer({ mailer })
  await s.postForm(employerFields(), { name: 'jd.pdf', type: MIME.pdf, content: PDF })
  const [stored] = await filesIn(s.uploadDir)
  assert.ok(stored)
  for (const path of [`/uploads/${stored}`, `/data/uploads/${stored}`, `/api/uploads/${stored}`, `/${stored}`]) {
    const r = await fetch(`${s.base}${path}`)
    assert.equal(r.status, 404, path)
  }
  await s.close()
})

// ---------- storage ----------

test('stored names are server-generated and the store refuses path traversal', async () => {
  const s = await startServer({ mailer: null })
  const name = await s.attachments.save(PDF, 'pdf')
  assert.match(name, /^[0-9a-f-]{36}\.pdf$/)
  await assert.rejects(s.attachments.read('../enquiries.jsonl'))
  await assert.rejects(s.attachments.remove('..\\..\\x.pdf'))
  await s.attachments.remove(name)
  await s.attachments.remove(name) // already gone is fine
  await s.close()
})

test('the sweep removes expired uploads and keeps fresh ones', async () => {
  const s = await startServer({ mailer: null })
  const old = await s.attachments.save(PDF, 'pdf')
  const fresh = await s.attachments.save(PDF, 'pdf')
  const past = new Date(Date.now() - 3 * 24 * 60 * 60_000)
  await utimes(join(s.uploadDir, old), past, past)
  await writeFile(join(s.uploadDir, 'notes.txt'), 'not ours') // unrelated files are never touched
  assert.equal(await new FileAttachmentStore(s.uploadDir).sweep(24 * 60 * 60_000), 1)
  assert.deepEqual((await filesIn(s.uploadDir)).sort(), [fresh, 'notes.txt'].sort())
  await s.close()
})

// ---------- brand ----------

test('every email uses the TechzConnect brand name', () => {
  const fields = { fullName: 'Asha Verma', email: 'a@b.example', company: 'Acme', message: 'Need an engineer soon.' }
  const record: EnquiryRecord = {
    reference: 'TC-20261112-ABC234', createdAt: '2026-11-12T14:32:00.000Z', source: 'employer-enquiry', idempotencyKey: 'k', consent: true,
    contentHash: contentHash('employer-enquiry', fields), fields,
    attachment: { storedName: 'x.pdf', originalName: 'Role <1>.pdf', contentType: 'application/pdf', size: 2_400_000 },
    notifications: { admin: 'pending', acknowledgement: 'pending' },
  }
  for (const m of [renderAdminEmail(record), renderUserEmail(record)]) {
    assert.ok(m.subject.endsWith('– TechzConnect'), m.subject)
    for (const out of [m.html, m.text]) {
      assert.ok(out.includes('TechzConnect'))
      assert.ok(!/Tech Connect|TechConnect/.test(out), 'old brand name still present')
    }
  }
  const admin = renderAdminEmail(record)
  assert.ok(admin.html.includes('Job Description') && admin.html.includes('2.3 MB') && admin.html.includes('Role &lt;1&gt;.pdf'))
  assert.ok(admin.text.includes('Job Description: Role <1>.pdf (2.3 MB)'))
  assert.ok(!renderUserEmail(record).html.includes('Job Description'))
})

// ---------- form scope ----------

test('by default only Industries and Employer Enquiry may send; the Homepage form is refused with no record and no email', async () => {
  assert.deepEqual(loadConfig({}).enabledSources, ['industries', 'employer-enquiry'])
  const mailer = new FakeMailer()
  const s = await startServer({ mailer, config: { enabledSources: loadConfig({}).enabledSources } })
  const payload = homePayload()
  const res = await s.post(payload)
  assert.equal(res.status, 403)
  assert.equal((await res.json()).code, 'FORM_NOT_ENABLED')
  assert.equal(mailer.sent.length, 0)
  assert.equal(s.store.findByKey(payload.idempotencyKey as string), undefined)
  assert.equal((await s.post(employerFields())).status, 201) // the approved forms still work
  await s.close()
})

test('the Homepage form can be enabled explicitly through configuration', async () => {
  assert.deepEqual(loadConfig({ ENQUIRY_FORMS_ENABLED: 'home, industries,bogus' }).enabledSources, ['home', 'industries'])
  const mailer = new FakeMailer()
  const s = await startServer({ mailer, config: { enabledSources: ['home'] } })
  assert.equal((await s.post(homePayload())).status, 201)
  await s.close()
})
