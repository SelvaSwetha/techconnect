import express from 'express'
import type { ErrorRequestHandler } from 'express'
import { rateLimit } from 'express-rate-limit'
import helmet from 'helmet'
import type { Config } from './config.ts'
import { createHiringEnquiryRouter } from './routes/hiringEnquiries.ts'
import { createNotifier } from './services/enquiryNotifications.ts'
import type { Logger } from './services/enquiryNotifications.ts'
import type { AttachmentStore } from './services/attachments.ts'
import type { Mailer } from './services/mailer.ts'
import type { EnquiryStore } from './store/enquiryStore.ts'

interface Deps {
  config: Config
  store: EnquiryStore
  attachments: AttachmentStore
  /** null when email is not configured */
  mailer: Mailer | null
  log: Logger
  /** rate limit for POST /api/hiring-enquiries (per IP) */
  rateLimit?: { windowMs: number; limit: number }
}

export function createApp({ config, store, attachments, mailer, log, rateLimit: rl = { windowMs: 15 * 60_000, limit: 10 } }: Deps) {
  const app = express()
  app.disable('x-powered-by')
  if (config.trustProxy) app.set('trust proxy', 1)
  app.use(helmet())

  // Same-origin (or the Vite proxy) needs no CORS; an explicit allow-list is the only way to open it up.
  if (config.corsOrigins.length) {
    app.use((req, res, next) => {
      const origin = req.headers.origin
      if (origin && config.corsOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin)
        res.setHeader('Vary', 'Origin')
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
        res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
      }
      if (req.method === 'OPTIONS') {
        res.sendStatus(204)
        return
      }
      next()
    })
  }

  app.use(express.json({ limit: '32kb' }))

  app.get('/api/health', (_req, res) => {
    res.json({ ok: true, emailConfigured: Boolean(mailer) })
  })

  const limiter = rateLimit({
    windowMs: rl.windowMs,
    limit: rl.limit,
    standardHeaders: 'draft-7',
    legacyHeaders: false,
    handler: (_req, res) => {
      res.status(429).json({ ok: false, code: 'TOO_MANY_REQUESTS', error: 'Too many requests. Please try again later.' })
    },
  })
  const notifier = mailer && config.mail ? createNotifier({ mailer, mail: config.mail, attachments, log }) : null
  app.use('/api/hiring-enquiries', limiter, createHiringEnquiryRouter({ store, attachments, enabledSources: config.enabledSources, notifier, mailProblems: config.mailProblems, log }))

  app.use((_req, res) => {
    res.status(404).json({ ok: false, error: 'Not found.' })
  })

  const onError: ErrorRequestHandler = (err, _req, res, _next) => {
    const status = typeof err?.status === 'number' && err.status >= 400 && err.status < 500 ? err.status : 500
    if (status === 500) log.error(`[server] unhandled error: ${err instanceof Error ? err.message : 'unknown'}`)
    res.status(status).json({ ok: false, error: status === 500 ? 'Something went wrong.' : 'Invalid request.' })
  }
  app.use(onError)
  return app
}
