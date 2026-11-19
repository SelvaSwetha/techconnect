import type { EnquiryRecord } from '../store/enquiryStore.ts'
import type { RenderedEmail } from './adminEmail.ts'
import { BRAND, escapeHtml, layout } from './layout.ts'

export const USER_SUBJECT = 'We Have Received Your Hiring Enquiry – TechzConnect'

/** Acknowledgement to the person who submitted the form. Deliberately makes no promise about response time. */
export function renderUserEmail(record: EnquiryRecord, opts: { logoUrl?: string } = {}): RenderedEmail {
  const name = record.fields.fullName ?? ''
  const html = layout({
    title: USER_SUBJECT,
    preheader: 'We have received your hiring enquiry.',
    logoUrl: opts.logoUrl,
    bodyHtml: `<p style="margin:0 0 16px;">Hello ${escapeHtml(name)},</p>
<p style="margin:0 0 16px;">Thank you for reaching out to ${BRAND}.</p>
<p style="margin:0 0 16px;">We have successfully received your hiring enquiry. Our team will review your requirements and contact you regarding the next steps.</p>
<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 20px;"><tr><td style="background-color:#f9fafb;border:1px solid #e5e7eb;border-left:4px solid #ff0000;border-radius:6px;padding:12px 16px;font-size:14px;color:#111827;">Your enquiry reference: <strong style="font-size:15px;letter-spacing:0.5px;">${escapeHtml(record.reference)}</strong></td></tr></table>
<p style="margin:0 0 16px;">Thank you for considering ${BRAND}.</p>
<p style="margin:0;">Best regards,<br>${BRAND} Team</p>`,
    footerHtml: `<strong style="color:#374151;">${BRAND}</strong><br>This is an automated confirmation. You are receiving it because this email address was entered in a hiring enquiry form on the ${BRAND} website.`,
  })
  const text = [
    `Hello ${name},`,
    '',
    `Thank you for reaching out to ${BRAND}.`,
    '',
    'We have successfully received your hiring enquiry. Our team will review your requirements and contact you regarding the next steps.',
    '',
    `Your enquiry reference: ${record.reference}`,
    '',
    `Thank you for considering ${BRAND}.`,
    '',
    'Best regards,',
    `${BRAND} Team`,
  ].join('\n')
  return { subject: USER_SUBJECT, html, text }
}
