/**
 * POST /api/paystack-verify  (Vercel serverless function)
 *
 * Called by the browser right after a Paystack payment succeeds. It:
 *   1. identifies the user from their Supabase access token,
 *   2. recomputes the expected price server-side (course_plans + voucher),
 *   3. verifies the transaction with Paystack (secret key),
 *   4. signs a grant (HMAC) and applies it via the apply_grant RPC.
 *
 * No service_role key. apply_grant only trusts the HMAC signature, which needs
 * GRANT_SIGNING_SECRET (server-only, also stored in Supabase app_config).
 *
 * Env (Vercel): PAYSTACK_SECRET_KEY, GRANT_SIGNING_SECRET,
 *               PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY
 */
import crypto from 'crypto';
import { createClient } from '@supabase/supabase-js';

const send = (res, status, body) => {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'no-store');
  res.end(JSON.stringify(body));
};

export default async function handler(req, res) {
  if (req.method !== 'POST') return send(res, 405, { ok: false, error: 'Method not allowed.' });
  const { PAYSTACK_SECRET_KEY, GRANT_SIGNING_SECRET, PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY } = process.env;
  if (!PAYSTACK_SECRET_KEY || !GRANT_SIGNING_SECRET)
    return send(res, 500, { ok: false, error: 'Payments are not configured on the server.' });
  if (!PUBLIC_SUPABASE_URL || !PUBLIC_SUPABASE_ANON_KEY)
    return send(res, 500, { ok: false, error: 'Supabase is not configured.' });

  let body = req.body;
  if (!body || typeof body === 'string') { try { body = JSON.parse(body || '{}'); } catch { body = {}; } }
  const { token, reference, course, plan, voucher } = body || {};
  if (!token) return send(res, 401, { ok: false, error: 'Not signed in.' });
  if (!reference || !course || !plan) return send(res, 400, { ok: false, error: 'Missing payment details.' });

  const sb = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
    global: { headers: { Authorization: `Bearer ${token}` } },
    auth: { persistSession: false, autoRefreshToken: false },
  });

  // 1) Who is this?
  const { data: ud, error: ue } = await sb.auth.getUser();
  if (ue || !ud?.user) return send(res, 401, { ok: false, error: 'Invalid session.' });
  const user = ud.user;

  // 2) Expected price from the DB (never trust the client).
  const { data: plans, error: pe } = await sb.rpc('get_course_plans', { p_course: course });
  if (pe) return send(res, 500, { ok: false, error: 'Could not read pricing.' });
  const planRow = (plans || []).find((p) => p.plan === plan);
  if (!planRow) return send(res, 400, { ok: false, error: 'Unknown plan.' });
  let expected = planRow.price_kobo;

  // 3) Apply a voucher discount server-side, if one was used.
  let voucherCode = null;
  if (voucher) {
    const { data: vv } = await sb.rpc('validate_voucher', { p_code: voucher, p_course: course, p_plan: plan });
    const v = Array.isArray(vv) ? vv[0] : vv;
    if (v && v.valid) {
      voucherCode = String(voucher);
      if (v.kind === 'percent') expected = Math.round((expected * (100 - v.value)) / 100);
      else if (v.kind === 'fixed') expected = Math.max(0, expected - v.value);
      else if (v.kind === 'free') expected = 0;
    }
  }

  // 4) Verify the transaction with Paystack.
  const pv = await fetch(`https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`, {
    headers: { Authorization: `Bearer ${PAYSTACK_SECRET_KEY}` },
  });
  const pj = await pv.json().catch(() => ({}));
  if (!pj.status || pj.data?.status !== 'success')
    return send(res, 402, { ok: false, error: 'Payment was not successful.' });
  if (pj.data.currency !== 'NGN') return send(res, 400, { ok: false, error: 'Unexpected currency.' });
  if (Number(pj.data.amount) < expected)
    return send(res, 400, { ok: false, error: 'Amount paid is less than the price.' });

  // 5) Sign and apply the grant.
  const amount = Number(pj.data.amount);
  const exp = Math.floor(Date.now() / 1000) + 3600;
  const canonical = `${user.id}|${course}|${plan}|${reference}|${amount}|${exp}`;
  const sig = crypto.createHmac('sha256', GRANT_SIGNING_SECRET).update(canonical).digest('hex');
  const { data: gr, error: ge } = await sb.rpc('apply_grant', {
    p_user: user.id, p_course: course, p_plan: plan, p_reference: reference,
    p_amount: amount, p_exp: exp, p_sig: sig, p_voucher: voucherCode,
  });
  if (ge) return send(res, 500, { ok: false, error: 'Could not apply access: ' + ge.message });
  if (gr !== 'granted' && gr !== 'already') return send(res, 400, { ok: false, error: 'Access not granted (' + gr + ').' });

  return send(res, 200, { ok: true, plan });
}
