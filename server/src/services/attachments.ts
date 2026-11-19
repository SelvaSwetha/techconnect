import { randomUUID } from 'node:crypto'
import { mkdir, readdir, readFile, stat, unlink, writeFile } from 'node:fs/promises'
import { join } from 'node:path'

/** Job-description uploads: PDF, DOC and DOCX only, at most 5 MB. */
export const MAX_UPLOAD_BYTES = 5 * 1024 * 1024
export const UPLOAD_FIELD = 'jobDescription'

export type AttachmentKind = 'pdf' | 'doc' | 'docx'

export interface AttachmentMeta {
  /** server-generated file name inside the private upload directory (never derived from user input) */
  storedName: string
  /** sanitised name the user's file had; used only as the attachment's file name in the team email */
  originalName: string
  /** content type derived from the verified file kind, not from what the client claimed */
  contentType: string
  size: number
}

export interface UploadedFile {
  originalname: string
  mimetype: string
  size: number
  buffer: Buffer
}

const KINDS: Record<AttachmentKind, { mimes: string[]; contentType: string }> = {
  pdf: { mimes: ['application/pdf'], contentType: 'application/pdf' },
  doc: { mimes: ['application/msword'], contentType: 'application/msword' },
  docx: {
    mimes: ['application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
    contentType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  },
}
/** Browsers/OSes sometimes send no useful type for Office files; the content check below is what decides. */
const GENERIC_MIMES = ['application/octet-stream', '']

const FILE_TYPE_MESSAGE = 'Please attach a PDF, DOC or DOCX file.'
export const TOO_LARGE_MESSAGE = 'The file must be 5 MB or smaller.'

const OLE_MAGIC = Buffer.from([0xd0, 0xcf, 0x11, 0xe0, 0xa1, 0xb1, 0x1a, 0xe1]) // legacy .doc container
const ZIP_MAGIC = Buffer.from([0x50, 0x4b, 0x03, 0x04]) // .docx is a zip

/** Does the file's content match the kind its extension claims? An executable renamed to .pdf fails here. */
function contentMatches(kind: AttachmentKind, b: Buffer): boolean {
  if (kind === 'pdf') return b.subarray(0, 1024).includes('%PDF-') // header may be preceded by a little junk
  if (kind === 'doc') return b.subarray(0, 8).equals(OLE_MAGIC)
  return b.subarray(0, 4).equals(ZIP_MAGIC) && b.includes('word/') // zip entries are listed uncompressed
}

/** File name that is safe to show and to put in a mail header: no path, no control/markup characters, bounded length. */
export function sanitizeFileName(name: string, kind: AttachmentKind): string {
  const base = (name.split(/[\\/]/).pop() ?? '')
    .normalize('NFC')
    // control, bidi/zero-width and the characters that matter in paths, headers and markup
    .replace(/[\u0000-\u001f\u007f\u200b-\u200f\u202a-\u202e\u2066-\u2069\ufeff<>:"|?*\u2028\u2029]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
  const stem = base.replace(/\.[^.]*$/, '').replace(/^\.+/, '').slice(0, 100).trim()
  return `${stem || 'job-description'}.${kind}`
}

export type UploadCheck = { ok: true; kind: AttachmentKind; originalName: string; contentType: string } | { ok: false; error: string }

export function validateUpload(file: UploadedFile): UploadCheck {
  const ext = /\.([A-Za-z0-9]+)$/.exec(file.originalname)?.[1]?.toLowerCase()
  const kind = (['pdf', 'doc', 'docx'] as const).find((k) => k === ext)
  if (!kind) return { ok: false, error: FILE_TYPE_MESSAGE }
  if (file.size === 0 || file.buffer.length === 0) return { ok: false, error: 'The file is empty.' }
  if (file.size > MAX_UPLOAD_BYTES || file.buffer.length > MAX_UPLOAD_BYTES) return { ok: false, error: TOO_LARGE_MESSAGE }
  const declared = file.mimetype.toLowerCase().split(';')[0].trim()
  if (!KINDS[kind].mimes.includes(declared) && !GENERIC_MIMES.includes(declared)) return { ok: false, error: FILE_TYPE_MESSAGE }
  if (!contentMatches(kind, file.buffer)) return { ok: false, error: 'The file does not look like a valid PDF, DOC or DOCX document.' }
  return { ok: true, kind, originalName: sanitizeFileName(file.originalname, kind), contentType: KINDS[kind].contentType }
}

/**
 * Where uploaded files live between the upload and the team email. Files are private: they are never served over HTTP
 * and can only be read back by the notifier. An object-storage implementation can replace this later.
 */
export interface AttachmentStore {
  save(buffer: Buffer, kind: AttachmentKind): Promise<string>
  read(storedName: string): Promise<Buffer>
  remove(storedName: string): Promise<void>
  /** delete files older than `maxAgeMs` (uploads whose email never got through); returns how many were removed */
  sweep(maxAgeMs: number): Promise<number>
}

const STORED_NAME_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\.(?:pdf|doc|docx)$/

export class FileAttachmentStore implements AttachmentStore {
  private readonly dir: string
  constructor(dir: string) {
    this.dir = dir
  }

  private path(storedName: string): string {
    if (!STORED_NAME_RE.test(storedName)) throw new Error('invalid stored attachment name')
    return join(this.dir, storedName)
  }

  async save(buffer: Buffer, kind: AttachmentKind): Promise<string> {
    await mkdir(this.dir, { recursive: true, mode: 0o700 })
    const storedName = `${randomUUID()}.${kind}`
    await writeFile(this.path(storedName), buffer, { flag: 'wx', mode: 0o600 })
    return storedName
  }

  async read(storedName: string): Promise<Buffer> {
    return readFile(this.path(storedName))
  }

  async remove(storedName: string): Promise<void> {
    try {
      await unlink(this.path(storedName))
    } catch (err) {
      if ((err as NodeJS.ErrnoException).code !== 'ENOENT') throw err
    }
  }

  async sweep(maxAgeMs: number): Promise<number> {
    let names: string[]
    try {
      names = await readdir(this.dir)
    } catch (err) {
      if ((err as NodeJS.ErrnoException).code === 'ENOENT') return 0
      throw err
    }
    let removed = 0
    for (const name of names) {
      if (!STORED_NAME_RE.test(name)) continue
      try {
        if (Date.now() - (await stat(join(this.dir, name))).mtimeMs > maxAgeMs) {
          await unlink(join(this.dir, name))
          removed++
        }
      } catch {
        /* already gone or in use: next sweep */
      }
    }
    return removed
  }
}
