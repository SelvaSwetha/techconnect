export const BRAND = 'TechzConnect'
export const BRAND_RED = '#ff0000'

const ESCAPES: Record<string, string> = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }
export const escapeHtml = (s: string): string => s.replace(/[&<>"']/g, (c) => ESCAPES[c])

export function formatTimestamp(d: Date): string {
  const date = d.toLocaleDateString('en-GB', { timeZone: 'UTC', day: '2-digit', month: 'short', year: 'numeric' })
  const time = d.toLocaleTimeString('en-GB', { timeZone: 'UTC', hour: '2-digit', minute: '2-digit', hour12: false })
  return `${date}, ${time} UTC`
}

/**
 * Email shell: table layout with inline styles only (works in Outlook/Gmail/Apple Mail), 600px max and fluid below that.
 * `preheader` is the hidden inbox preview line. Without a logo URL the brand is a text wordmark: nothing is invented.
 */
export function layout(opts: { title: string; preheader: string; bodyHtml: string; footerHtml: string; logoUrl?: string }): string {
  const brand = opts.logoUrl
    ? `<img src="${escapeHtml(opts.logoUrl)}" alt="${BRAND}" height="38" style="display:block;border:0;height:38px;width:auto;max-width:100%;">`
    : `<span style="font-family:Arial,Helvetica,sans-serif;font-size:24px;font-weight:700;letter-spacing:-0.3px;color:#ffffff;">Techz<span style="color:${BRAND_RED};">Connect</span></span>`
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="x-apple-disable-message-reformatting">
<title>${escapeHtml(opts.title)}</title>
</head>
<body style="margin:0;padding:0;background-color:#f3f4f6;">
<div style="display:none;font-size:1px;line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;">${escapeHtml(opts.preheader)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f3f4f6;">
<tr><td align="center" style="padding:24px 12px;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;background-color:#ffffff;border-radius:10px;overflow:hidden;border:1px solid #e5e7eb;">
    <tr><td style="background-color:#000000;padding:22px 28px;border-bottom:4px solid ${BRAND_RED};">${brand}</td></tr>
    <tr><td style="padding:28px;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.6;color:#1f2937;">${opts.bodyHtml}</td></tr>
    <tr><td style="background-color:#f9fafb;border-top:1px solid #e5e7eb;padding:18px 28px;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:1.6;color:#6b7280;">${opts.footerHtml}</td></tr>
  </table>
</td></tr>
</table>
</body>
</html>`
}
