import { createHash, randomInt } from 'node:crypto'
import { mkdir, readFile, rename, writeFile } from 'node:fs/promises'
import { dirname } from 'node:path'
import type { AttachmentMeta } from '../services/attachments.ts'
import type { EnquiryFields, Source } from '../validation.ts'

export type NotificationStatus = 'pending' | 'sent' | 'failed' | 'skipped'

export interface EnquiryRecord {
  reference: string
  createdAt: string
  source: Source
  idempotencyKey: string
  /** hash of the submitted content, used to catch an accidental re-submit with a fresh key */
  contentHash: string
  consent: boolean
  fields: EnquiryFields
  /** job description uploaded with the enquiry; the file itself is private and removed once the team email has been sent */
  attachment?: AttachmentMeta & { removed?: boolean }
  notifications: { admin: NotificationStatus; acknowledgement: NotificationStatus }
}

/**
 * Where enquiries are recorded. The planned PostgreSQL store can implement this same interface;
 * nothing else in the server knows how records are persisted.
 */
export interface EnquiryStore {
  findByKey(key: string): EnquiryRecord | undefined
  findRecentDuplicate(contentHash: string, sinceMs: number): EnquiryRecord | undefined
  countByEmailSince(email: string, sinceMs: number): number
  insert(record: EnquiryRecord): Promise<void>
  update(reference: string, patch: Partial<Pick<EnquiryRecord, 'notifications' | 'attachment'>>): Promise<void>
}

const REF_ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789' // no 0/O/1/I

export function newReference(now = new Date()): string {
  const day = now.toISOString().slice(0, 10).replaceAll('-', '')
  let tail = ''
  for (let i = 0; i < 6; i++) tail += REF_ALPHABET[randomInt(REF_ALPHABET.length)]
  return `TC-${day}-${tail}`
}

export function contentHash(source: Source, fields: EnquiryFields, fileSha256?: string): string {
  const keys = Object.keys(fields).sort()
  const canon = JSON.stringify([source, ...keys.map((k) => [k, (fields as Record<string, string>)[k].toLowerCase()]), fileSha256 ?? null])
  return createHash('sha256').update(canon).digest('hex')
}

/** JSON-Lines file store: loaded into memory at start, rewritten atomically on every change (low volume by design). */
export class FileEnquiryStore implements EnquiryStore {
  private records = new Map<string, EnquiryRecord>()
  private queue: Promise<void> = Promise.resolve()

  private readonly file: string

  private constructor(file: string) {
    this.file = file
  }

  static async open(file: string): Promise<FileEnquiryStore> {
    const store = new FileEnquiryStore(file)
    try {
      const text = await readFile(file, 'utf8')
      for (const line of text.split('\n')) {
        if (!line.trim()) continue
        const rec = JSON.parse(line) as EnquiryRecord
        store.records.set(rec.reference, rec)
      }
    } catch (err) {
      if ((err as NodeJS.ErrnoException).code !== 'ENOENT') throw err
    }
    return store
  }

  findByKey(key: string) {
    for (const r of this.records.values()) if (r.idempotencyKey === key) return r
    return undefined
  }

  findRecentDuplicate(hash: string, sinceMs: number) {
    for (const r of this.records.values()) if (r.contentHash === hash && Date.parse(r.createdAt) >= sinceMs) return r
    return undefined
  }

  countByEmailSince(email: string, sinceMs: number) {
    const e = email.toLowerCase()
    let n = 0
    for (const r of this.records.values()) if (r.fields.email?.toLowerCase() === e && Date.parse(r.createdAt) >= sinceMs) n++
    return n
  }

  insert(record: EnquiryRecord) {
    this.records.set(record.reference, record)
    return this.flush()
  }

  update(reference: string, patch: Partial<Pick<EnquiryRecord, 'notifications' | 'attachment'>>) {
    const cur = this.records.get(reference)
    if (cur) this.records.set(reference, { ...cur, ...patch })
    return this.flush()
  }

  private flush(): Promise<void> {
    const run = async () => {
      await mkdir(dirname(this.file), { recursive: true })
      const tmp = `${this.file}.tmp`
      await writeFile(tmp, [...this.records.values()].map((r) => JSON.stringify(r)).join('\n') + '\n', 'utf8')
      await rename(tmp, this.file)
    }
    // serialise writes; a failed write rejects its caller but does not poison later ones
    const next = this.queue.then(run, run)
    this.queue = next.catch(() => undefined)
    return next
  }
}
