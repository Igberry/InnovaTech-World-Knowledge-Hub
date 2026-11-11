/**
 * POST /api/paystack-webhook  (Vercel serverless function)
 *
 * Backstop so access is granted even if the buyer closes the tab before the
 * browser callback runs. Paystack POSTs charge.success here. We re-verify the
 * transaction with Paystack's API (secret key) rather than trusting the payload,
 * then apply the same signed grant as the verify endpoint (idempotent).
 *
 * Point your Paystack dashboard webhook URL at: https://<your-site>/api/paystack-webhook/
 *
 * Env (Vercel): PAYSTACK_SECRET_KEY, GRANT_SIGNING_SECRET,
 *               PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY
 */
import crypto from 'crypto';
import { createClient } from '@supabase/supabase-js';

export default async function handler(req, res) {
  if (req.method !== 'POST') { res.statusCode = 405; return res.end('Method not allowed'); }
  const { PAYSTACK_SECRET_KEY, GRANT_SIGNING_SECRET, PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } = process.env;

  // Always ack quickly; do the work best-effort.
  const ack = (msg) => { res.statusCode = 200; res.end(msg || 'ok'); };
  if (!PAYSTACK_SECRET_KEY || !GRANT_SIGNING_SECRET || !PUBLIC_SUPABASE_URL || !PUBLIC_SUPABASE_ANON_KEY) return ack('not-configured');

  let event = req.body;
  if (!event || typeof event === 'string') { try { event = JSON.parse(event || '{}'); } catch { event = {}; } }
  if (event?.event !== 'charge.success') return ack('ignored');

  const reference = event?.data?.reference;
  if (!reference) return ack('no-ref');

  try {
    // Re-verify with Paystack (do not trust the webhook body alone).
    const pv = await fetch(`https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`, {
      headers: { Authorization: `Bearer ${PAYSTACK_SECRET_KEY}` },
    });
    const pj = await pv.json().catch(() => ({}));
    if (!pj.status || pj.data?.status !== 'success') return ack('not-success');

    const d = pj.data;
    const meta = d.metadata || {};
    const user = meta.user_id, course = meta.course, plan = meta.plan;
    const voucher = meta.voucher || null;
    const amount = Number(d.amount);
    if (!user || !course || !plan) return ack('missing-metadata');

    const exp = Math.floor(Date.now() / 1000) + 3600;
    const canonical = `${user}|${course}|${plan}|${reference}|${amount}|${exp}`;
    const sig = crypto.createHmac('sha256', GRANT_SIGNING_SECRET).update(canonical).digest('hex');

    const sb = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, { auth: { persistSession: false } });
    await sb.rpc('apply_grant', {
      p_user: user, p_course: course, p_plan: plan, p_reference: reference,
      p_amount: amount, p_exp: exp, p_sig: sig, p_voucher: voucher,
    });
    return ack('granted');
  } catch {
    return ack('error');
  }
}
