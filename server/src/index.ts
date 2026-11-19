import { createApp } from './app.ts'
import { loadConfig } from './config.ts'
import { createSmtpMailer } from './services/mailer.ts'
import { FileAttachmentStore } from './services/attachments.ts'
import { FileEnquiryStore } from './store/enquiryStore.ts'

const log = {
  info: (m: string) => console.log(m),
  warn: (m: string) => console.warn(m),
  error: (m: string) => console.error(m),
}

const config = loadConfig()
const store = await FileEnquiryStore.open(config.storeFile)
const attachments = new FileAttachmentStore(config.uploadDir)
const mailer = config.mail ? createSmtpMailer(config.mail) : null

if (!mailer) {
  log.warn(`[mail] Email is NOT configured (missing/invalid: ${config.mailProblems.join(', ')}). Enquiries will be refused with 503 until it is.`)
}

createApp({ config, store, attachments, mailer, log }).listen(config.port, () => {
  log.info(`[server] listening on http://localhost:${config.port} (email ${mailer ? 'configured' : 'NOT configured'})`)
})

// Uploads are deleted as soon as the team email is sent; this removes any whose email never got through (kept 24 h for retries).
const sweep = () => attachments.sweep(24 * 60 * 60_000).then((n) => n && log.info(`[uploads] removed ${n} expired file(s)`), (e: Error) => log.error(`[uploads] sweep failed: ${e.message}`))
void sweep()
setInterval(sweep, 60 * 60_000).unref()
log.info(`[server] forms enabled: ${config.enabledSources.join(', ') || 'none'}`)
