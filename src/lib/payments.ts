/**
 * Client-side payments/entitlements helpers (Paystack + Supabase RPCs).
 * Soft-lock MVP: access is checked client-side via my_entitlement.
 */
import { getSupabase } from './supabase';

const PAYSTACK_KEY = import.meta.env.PUBLIC_PAYSTACK_KEY as string | undefined;

export interface Plan { plan: string; price_kobo: number; currency: string; features: string[] }
export interface VoucherInfo { valid: boolean; kind: string; value: number; reason: string | null }

export const nairaFromKobo = (kobo: number) => '₦' + Math.round((kobo || 0) / 100).toLocaleString('en-NG');

export async function getPlans(course: string): Promise<Plan[]> {
  const sb = getSupabase();
  if (!sb) return [];
  const { data, error } = await sb.rpc('get_course_plans', { p_course: course });
  return error ? [] : ((data as Plan[]) ?? []);
}

export async function myEntitlement(course: string): Promise<string | null> {
  const sb = getSupabase();
  if (!sb) return null;
  const { data, error } = await sb.rpc('my_entitlement', { p_course: course });
  return error ? null : ((data as string) ?? null);
}

export async function validateVoucher(code: string, course: string, plan: string): Promise<VoucherInfo | null> {
  const sb = getSupabase();
  if (!sb || !code) return null;
  const { data, error } = await sb.rpc('validate_voucher', { p_code: code, p_course: course, p_plan: plan });
  if (error) return null;
  const v = Array.isArray(data) ? data[0] : data;
  return (v as VoucherInfo) ?? null;
}

export async function redeemFree(code: string, course: string, plan: string): Promise<string> {
  const sb = getSupabase();
  if (!sb) return 'error';
  const { data, error } = await sb.rpc('redeem_free_voucher', { p_code: code, p_course: course, p_plan: plan });
  return error ? 'error' : (data as string);
}

export function amountAfterVoucher(priceKobo: number, v: VoucherInfo | null): number {
  if (!v || !v.valid) return priceKobo;
  if (v.kind === 'percent') return Math.round((priceKobo * (100 - v.value)) / 100);
  if (v.kind === 'fixed') return Math.max(0, priceKobo - v.value);
  if (v.kind === 'free') return 0;
  return priceKobo;
}

function loadPaystack(): Promise<any> {
  return new Promise((resolve, reject) => {
    const w = window as any;
    if (w.PaystackPop) return resolve(w.PaystackPop);
    const s = document.createElement('script');
    s.src = 'https://js.paystack.co/v1/inline.js';
    s.onload = () => resolve(w.PaystackPop);
    s.onerror = () => reject(new Error('Could not load Paystack.'));
    document.head.appendChild(s);
  });
}

/**
 * Run checkout for a plan. Returns {ok} on success (access granted), or an error.
 * Handles a 100%-free voucher without Paystack.
 */
export async function checkout(opts: {
  course: string; plan: string; priceKobo: number; voucher: VoucherInfo | null; voucherCode: string | null;
}): Promise<{ ok: boolean; error?: string }> {
  const sb = getSupabase();
  if (!sb) return { ok: false, error: 'Portal not configured.' };
  if (!PAYSTACK_KEY) return { ok: false, error: 'Payments are not configured yet.' };

  const { data: sess } = await sb.auth.getSession();
  const token = sess.session?.access_token;
  const email = sess.session?.user?.email;
  const uid = sess.session?.user?.id;
  const studentName = ((sess.session?.user?.user_metadata as any)?.full_name as string) || email || '';
  if (!token || !email || !uid) return { ok: false, error: 'login' };

  const amount = amountAfterVoucher(opts.priceKobo, opts.voucher);

  // Fully covered by a free voucher -> redeem directly.
  if (amount <= 0 && opts.voucherCode) {
    const r = await redeemFree(opts.voucherCode, opts.course, opts.plan);
    return r === 'granted' ? { ok: true } : { ok: false, error: 'Could not redeem code (' + r + ').' };
  }

  const Paystack = await loadPaystack();
  const reference = 'itw_' + opts.course + '_' + Date.now() + '_' + Math.random().toString(36).slice(2, 8);

  return new Promise((resolve) => {
    const handler = Paystack.setup({
      key: PAYSTACK_KEY,
      email,
      amount,
      currency: 'NGN',
      ref: reference,
      label: studentName, // show the student's name on the popup instead of the email

      metadata: {
        user_id: uid, course: opts.course, plan: opts.plan, voucher: opts.voucherCode || null,
        custom_fields: [
          { display_name: 'Course', variable_name: 'course', value: opts.course },
          { display_name: 'Plan', variable_name: 'plan', value: opts.plan },
        ],
      },
      callback: (response: any) => {
        fetch('/api/paystack-verify/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            token, reference: response.reference, course: opts.course, plan: opts.plan, voucher: opts.voucherCode || null,
          }),
        })
          .then((r) => r.json())
          .then((out) => resolve(out.ok ? { ok: true } : { ok: false, error: out.error || 'Verification failed.' }))
          .catch(() => resolve({ ok: false, error: 'Verification request failed. If you were charged, refresh in a minute.' }));
      },
      onClose: () => resolve({ ok: false, error: 'cancelled' }),
    });
    handler.openIframe();
  });
}
