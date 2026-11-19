/**
 * Local SMTP sink for testing without real credentials: accepts any login, prints each message and saves it as .eml
 * under data/sink/. Nothing leaves this machine.
 *   npm run mail-sink      then point the server at it:  SMTP_HOST=127.0.0.1 SMTP_PORT=2525 SMTP_USER=x SMTP_PASS=x
 */
import { mkdir, writeFile } from 'node:fs/promises'
import { simpleParser } from 'mailparser'
import { SMTPServer } from 'smtp-server'

const port = Number(process.env.SINK_PORT) || 2525
await mkdir('data/sink', { recursive: true })
let n = 0

const server = new SMTPServer({
  authOptional: true,
  allowInsecureAuth: true,
  disabledCommands: ['STARTTLS'],
  onAuth: (auth, _s, cb) => cb(null, { user: auth.username }),
  onData(stream, _session, cb) {
    const chunks: Buffer[] = []
    stream.on('data', (c: Buffer) => chunks.push(c))
    stream.on('end', async () => {
      const raw = Buffer.concat(chunks)
      const mail = await simpleParser(raw)
      const to = Array.isArray(mail.to) ? mail.to.map((t) => t.text).join(', ') : (mail.to?.text ?? '')
      const file = `data/sink/${String(++n).padStart(3, '0')}-${Date.now()}.eml`
      await writeFile(file, raw)
      console.log(`[sink] ${file}  to=${to}  subject=${mail.subject}`)
      cb()
    })
  },
})
server.listen(port, '127.0.0.1', () => console.log(`[sink] SMTP sink listening on 127.0.0.1:${port}`))
