/**
 * POST /api/send-certificate  (Vercel serverless function)
 *
 * Emails a student their certificate via Gmail SMTP. This runs ONLY on Vercel
 * (the static site has no backend otherwise). Security:
 *   - The caller must send their Supabase access token.
 *   - The function reads the certificate from Supabase using that token, so RLS
 *     only returns a row if the caller is an admin AND the certificate exists.
 *     That means this endpoint cannot be used as an open email relay.
 *   - The certificate CONTENT is taken from the database row, not from the caller.
 *
 * Required Vercel env vars (set in Project → Settings → Environment Variables):
 *   GMAIL_USER             the Gmail/Workspace address that sends the mail
 *   GMAIL_APP_PASSWORD     a Google App Password (needs 2-Step Verification on)
 *   PUBLIC_SUPABASE_URL    already set for the portal
 *   PUBLIC_SUPABASE_ANON_KEY  already set for the portal
 */
import nodemailer from 'nodemailer';
import { createClient } from '@supabase/supabase-js';

const send = (res, status, body) => {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(body));
};

const esc = (s) =>
  String(s ?? '').replace(/[&<>"']/g, (c) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

function niceDate(iso) {
  if (!iso) return '';
  const d = new Date(iso);
  if (isNaN(d)) return esc(iso);
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
}

/** Email body: email-safe inline styles, table layout, brand navy. */
function emailHtml(cert, achievements, verifyLink) {
  const meta = [cert.duration, cert.grade].filter(Boolean).map(esc).join(' &middot; ');
  const skills = achievements.length
    ? `<tr><td style="padding:0 32px 8px;">
         <p style="margin:18px 0 6px;font:700 11px/1.4 Arial,sans-serif;letter-spacing:.1em;text-transform:uppercase;color:#0b3b66;">Skills demonstrated</p>
         <ul style="margin:0;padding-left:18px;color:#334155;font:13px/1.6 Arial,sans-serif;">
           ${achievements.map((a) => `<li>${esc(a)}</li>`).join('')}
         </ul></td></tr>`
    : '';
  const verifyBtn = verifyLink
    ? `<tr><td align="center" style="padding:8px 32px 28px;">
         <a href="${esc(verifyLink)}" style="display:inline-block;background:#0b3b66;color:#ffffff;text-decoration:none;font:600 14px/1 Arial,sans-serif;padding:13px 22px;border-radius:6px;">Verify this certificate</a>
       </td></tr>`
    : '';
  return `<!doctype html><html><body style="margin:0;background:#eef2f7;padding:24px 0;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#eef2f7;">
   <tr><td align="center">
    <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:10px;overflow:hidden;border:1px solid #dbe3ec;">
      <tr><td style="background:#04172b;padding:22px 32px;">
        <p style="margin:0;color:#ffffff;font:700 16px/1.2 Arial,sans-serif;letter-spacing:.02em;">InnovaTech World</p>
        <p style="margin:4px 0 0;color:#9fc0e0;font:12px/1.4 Arial,sans-serif;">Knowledge Hub</p>
      </td></tr>
      <tr><td style="padding:28px 32px 6px;">
        <h1 style="margin:0 0 4px;color:#0b3b66;font:700 22px/1.3 Arial,sans-serif;">Certificate of Completion</h1>
        <p style="margin:0 0 16px;color:#64748b;font:14px/1.6 Arial,sans-serif;">Congratulations, ${esc(cert.student_name)}.</p>
        <p style="margin:0;color:#334155;font:15px/1.7 Arial,sans-serif;">
          This confirms that <strong>${esc(cert.student_name)}</strong> has successfully completed
          <strong>${esc(cert.course)}</strong>${meta ? ` (${meta})` : ''} with InnovaTech World.
        </p>
      </td></tr>
      ${skills}
      <tr><td style="padding:14px 32px 4px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f3f6fa;border-radius:8px;">
          <tr><td style="padding:14px 16px;color:#334155;font:14px/1.7 Arial,sans-serif;">
            <strong>Certificate code:</strong> ${esc(cert.code)}<br>
            <strong>Issued:</strong> ${niceDate(cert.issued_at)}
          </td></tr>
        </table>
      </td></tr>
      ${verifyBtn}
      <tr><td style="padding:4px 32px 26px;color:#475569;font:14px/1.7 Arial,sans-serif;">
        A copy of your certificate is attached (open it in a browser to print or save as PDF).<br><br>
        Warm regards,<br>David C. Igberi<br>Lead Facilitator, InnovaTech World
      </td></tr>
      <tr><td style="background:#f8fafc;border-top:1px solid #e2e8f0;padding:14px 32px;color:#94a3b8;font:12px/1.5 Arial,sans-serif;">
        Anyone can verify this certificate using the code above on the InnovaTech World verification page.
      </td></tr>
    </table>
   </td></tr>
  </table>
  </body></html>`;
}

/** Standalone printable certificate, attached to the email as an .html file. */
function certificateDoc(cert, achievements, verifyLink, signatureUrl) {
  const meta = [cert.duration, cert.grade].filter(Boolean).map(esc).join(' &middot; ');
  const skills = achievements.length
    ? `<div style="max-width:640px;margin:8px auto 22px;text-align:left;">
         <p style="text-align:center;text-transform:uppercase;letter-spacing:.1em;font:700 11px/1.4 Poppins,Arial,sans-serif;color:#0b3b66;margin:0 0 8px;">Skills demonstrated</p>
         <ul style="columns:2;column-gap:36px;margin:0;padding-left:18px;font:12.5px/1.6 Poppins,Arial,sans-serif;color:#334155;">
           ${achievements.map((a) => `<li style="margin:3px 0;break-inside:avoid;">${esc(a)}</li>`).join('')}
         </ul></div>`
    : '';
  const sigImg = signatureUrl
    ? `<img src="${esc(signatureUrl)}" alt="" style="max-height:60px;max-width:220px;height:auto;vertical-align:bottom;" onerror="this.style.display='none'" />`
    : '';
  return `<!doctype html><html><head><meta charset="utf-8">
  <title>Certificate - ${esc(cert.student_name)}</title>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap">
  <style>@page{size:A4 landscape;margin:0}body{margin:0;background:#eef2f7;font-family:Poppins,Arial,sans-serif;}</style>
  </head><body>
  <div style="max-width:900px;margin:28px auto;background:#fff;padding:14px;">
   <div style="border:3px solid #0b3b66;padding:40px 48px;text-align:center;">
     <p style="text-transform:uppercase;letter-spacing:.18em;font:700 13px/1 Poppins,Arial,sans-serif;color:#0b3b66;margin:0 0 18px;">InnovaTech World</p>
     <h1 style="font:700 34px/1.2 Poppins,Arial,sans-serif;color:#04172b;margin:0 0 6px;">Certificate of Completion</h1>
     <p style="color:#64748b;font:15px/1.5 Poppins,Arial,sans-serif;margin:14px 0 2px;">This is to certify that</p>
     <p style="font:700 30px/1.2 Poppins,Arial,sans-serif;color:#0b3b66;margin:4px 0 10px;">${esc(cert.student_name)}</p>
     <p style="color:#64748b;font:15px/1.5 Poppins,Arial,sans-serif;margin:0 0 2px;">has successfully completed</p>
     <p style="font:600 22px/1.3 Poppins,Arial,sans-serif;color:#04172b;margin:6px 0 4px;">${esc(cert.course)}</p>
     ${meta ? `<p style="color:#475569;font:14px/1.5 Poppins,Arial,sans-serif;margin:0 0 14px;">${meta}</p>` : '<div style="height:10px"></div>'}
     ${skills}
     <table role="presentation" width="100%" style="margin-top:14px;"><tr>
       <td style="text-align:center;font:13px/1.6 Poppins,Arial,sans-serif;color:#334155;">
         <div style="height:62px;">${sigImg}</div>
         <div style="border-top:1px solid #94a3b8;width:220px;margin:0 auto 4px;"></div>David C. Igberi, Lead Facilitator</td>
       <td style="text-align:center;font:13px/1.6 Poppins,Arial,sans-serif;color:#334155;">
         <div style="height:62px;"></div>
         <div style="border-top:1px solid #94a3b8;width:220px;margin:0 auto 4px;"></div>Date: ${niceDate(cert.issued_at)}</td>
     </tr></table>
     <p style="margin:22px 0 0;font:12px/1.5 Poppins,Arial,sans-serif;color:#64748b;">
       Certificate code: <strong>${esc(cert.code)}</strong>${verifyLink ? ` &middot; Verify at ${esc(verifyLink)}` : ''}</p>
   </div>
  </div>
  </body></html>`;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return send(res, 405, { ok: false, error: 'Method not allowed.' });

  const { GMAIL_USER, GMAIL_APP_PASSWORD, PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } = process.env;
  if (!GMAIL_USER || !GMAIL_APP_PASSWORD)
    return send(res, 500, { ok: false, error: 'Email is not set up on the server yet (missing GMAIL_USER / GMAIL_APP_PASSWORD).' });
  if (!PUBLIC_SUPABASE_URL || !PUBLIC_SUPABASE_ANON_KEY)
    return send(res, 500, { ok: false, error: 'Supabase is not configured on the server.' });

  let body = req.body;
  if (!body || typeof body === 'string') { try { body = JSON.parse(body || '{}'); } catch { body = {}; } }
  const { token, code, email, verifyUrl, signatureUrl, achievements } = body || {};

  if (!token) return send(res, 401, { ok: false, error: 'Not signed in.' });
  if (!code) return send(res, 400, { ok: false, error: 'Missing certificate code.' });
  if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email))
    return send(res, 400, { ok: false, error: 'A valid student email is required.' });

  // Verify admin + fetch authoritative certificate via RLS.
  const sb = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
    global: { headers: { Authorization: `Bearer ${token}` } },
    auth: { persistSession: false, autoRefreshToken: false },
  });
  const { data: rows, error } = await sb
    .from('certificates')
    .select('code, student_name, course, duration, grade, issued_at')
    .eq('code', code)
    .limit(1);
  if (error) return send(res, 403, { ok: false, error: 'Not authorized to send certificates.' });
  const cert = rows && rows[0];
  if (!cert) return send(res, 403, { ok: false, error: 'Certificate not found. Save (issue) it first, and make sure you are an admin.' });

  const safeAch = Array.isArray(achievements)
    ? achievements.filter((a) => typeof a === 'string' && a.trim() && a.length < 160).slice(0, 12)
    : [];
  const vLink = (typeof verifyUrl === 'string' && /^https?:\/\//.test(verifyUrl))
    ? `${verifyUrl}${verifyUrl.includes('?') ? '&' : '?'}code=${encodeURIComponent(cert.code)}`
    : '';
  const sigUrl = (typeof signatureUrl === 'string' && /^https?:\/\//.test(signatureUrl)) ? signatureUrl : '';

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    // Google shows App Passwords with spaces; strip them so a pasted value still works.
    auth: { user: GMAIL_USER.trim(), pass: GMAIL_APP_PASSWORD.replace(/\s+/g, '') },
  });

  try {
    await transporter.sendMail({
      from: `"InnovaTech World" <${GMAIL_USER}>`,
      to: email,
      subject: `Your InnovaTech World certificate - ${cert.course}`,
      html: emailHtml(cert, safeAch, vLink),
      attachments: [{
        filename: `certificate-${String(cert.code).replace(/[^a-z0-9-]/gi, '')}.html`,
        content: certificateDoc(cert, safeAch, vLink, sigUrl),
        contentType: 'text/html; charset=utf-8',
      }],
    });
  } catch (e) {
    return send(res, 502, { ok: false, error: 'Email failed to send: ' + (e?.message || 'unknown error') });
  }

  return send(res, 200, { ok: true });
}
