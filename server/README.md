# TechzConnect server

Node.js + Express API for the website. Currently: `POST /api/hiring-enquiries` (validates, records, and sends two emails) and `GET /api/health`.

## Run

```
cd server
npm install
cp .env.example .env     # fill in the SMTP values (see below)
npm run dev              # http://localhost:4000
```

The frontend (`tech-connect`, `npm run dev`) proxies `/api` to `http://localhost:4000`. For production set `VITE_API_BASE_URL` in the frontend build, or serve both from one origin, and list the site origin in `CORS_ORIGINS` if they differ.

## Email configuration

| Variable | Meaning |
| --- | --- |
| `SMTP_HOST`, `SMTP_PORT` | Your provider's SMTP server (e.g. 587 with STARTTLS, or 465 with `SMTP_SECURE=true`). |
| `SMTP_USER`, `SMTP_PASS` | SMTP credentials. Only ever in `.env` / the host's secret store, never in the frontend or Git. |
| `MAIL_FROM` | Sender on both emails, e.g. `TechzConnect <no-reply@your-domain.com>`. Must be allowed by the provider. |
| `HIRING_ENQUIRY_TO` | **The recipient of the enquiry notification** (HR / company inbox). Change it here; users can never choose it. |
| `ENQUIRY_FORMS_ENABLED` | Which forms may send: `home`, `industries`, `employer-enquiry` (comma-separated). **Default `industries,employer-enquiry`** — the Homepage form is refused (403, nothing stored or sent) until it is added here. |
| `UPLOAD_DIR` | Private folder for job-description uploads (default `data/uploads`). |
| `MAIL_LOGO_URL` | Optional public https URL of a logo PNG for the email header. Empty = text wordmark. |

If any SMTP variable is missing the server still starts but answers every enquiry with `503` and sends nothing.

## Behaviour

- The enquiry is validated server-side, written to `data/enquiries.jsonl` (the store sits behind an interface so PostgreSQL can replace it), then the **team notification** is sent; only if that succeeds is the **user acknowledgement** sent. Each outcome is recorded separately and returned as `notifications: { admin, acknowledgement }`.
- The success response (201/200) means: recorded and the team was notified. If the notification fails the API answers `502` and the form shows an error; retrying the same form is safe (idempotency key) and re-sends only what is missing.
- Duplicate protection: same idempotency key, or identical content within 10 minutes, never creates or sends twice.
- Limits: 10 requests / 15 min per IP, and 3 enquiries / hour per email address (the acknowledgement goes to a user-supplied address).

## Job description uploads (Employer Enquiry form)

- PDF, DOC or DOCX, **5 MB max**, one file, sent as `multipart/form-data` field `jobDescription`. Only the Employer Enquiry form accepts a file.
- Checked on the server independently of the browser: extension, declared type, file *content* (PDF / OLE / Word-zip signature, so a renamed `.exe` is refused), size, and a sanitised file name.
- The file is attached to the **team notification only** (never the user's acknowledgement). It is held in a private folder (`UPLOAD_DIR`, never served over HTTP, random server-generated names, mode 0600) only until that email is sent, then deleted. If the email fails the file is kept so a retry can attach it; anything older than 24 h is swept.
- No antivirus scanning is performed: the file is passed to the team inbox as-is, so rely on the mail provider's / mailbox's scanning.

## Test

```
npm test            # unit + API + real-SMTP integration tests (local SMTP server, no external traffic)
npm run typecheck
npm run mail-sink   # local SMTP sink on :2525 for manual testing; set SMTP_HOST=127.0.0.1 SMTP_PORT=2525 SMTP_USER=x SMTP_PASS=x
```
