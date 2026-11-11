/**
 * Auth + data helpers for the portal (STUDENT-PORTAL-SPEC.md §6).
 * All calls are wrapped so a failure surfaces a message rather than throwing
 * into the UI. Everything runs client-side.
 */
import type { User } from '@supabase/supabase-js';
import { getSupabase, absoluteUrl } from './supabase';

export type Result<T = void> = { ok: true; data: T } | { ok: false; error: string };

function ok<T>(data: T): Result<T> {
  return { ok: true, data };
}
function err(error: unknown): Result<never> {
  const message = error instanceof Error ? error.message : String(error ?? 'Something went wrong');
  return { ok: false, error: message };
}

export async function currentUser(): Promise<User | null> {
  const sb = getSupabase();
  if (!sb) return null;
  const { data } = await sb.auth.getSession();
  return data.session?.user ?? null;
}

export function onAuthChange(cb: (user: User | null) => void): () => void {
  const sb = getSupabase();
  if (!sb) {
    cb(null);
    return () => {};
  }
  const { data } = sb.auth.onAuthStateChange((_e, session) => cb(session?.user ?? null));
  return () => data.subscription.unsubscribe();
}

export async function signInWithPassword(email: string, password: string): Promise<Result> {
  const sb = getSupabase();
  if (!sb) return err('Portal not configured.');
  try {
    const { error } = await sb.auth.signInWithPassword({ email, password });
    return error ? err(error) : ok(undefined);
  } catch (e) {
    return err(e);
  }
}

/**
 * Self-service sign up with name + email + password. The `full_name` goes into
 * user metadata, which the `handle_new_user` DB trigger copies into profiles.
 * Only works if sign-ups are enabled in Supabase (Authentication settings).
 */
export async function signUpWithPassword(
  email: string,
  password: string,
  fullName: string,
): Promise<Result<{ needsConfirmation: boolean }>> {
  const sb = getSupabase();
  if (!sb) return err('Portal not configured.');
  try {
    const { data, error } = await sb.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName }, emailRedirectTo: absoluteUrl('/auth/callback/') },
    });
    if (error) return err(error);
    // If email confirmation is on, there is a user but no active session yet.
    const needsConfirmation = !data.session;
    return ok({ needsConfirmation });
  } catch (e) {
    return err(e);
  }
}

/** Re-send the sign-up confirmation email. */
export async function resendConfirmation(email: string): Promise<Result> {
  const sb = getSupabase();
  if (!sb) return err('Portal not configured.');
  try {
    const { error } = await sb.auth.resend({
      type: 'signup',
      email,
      options: { emailRedirectTo: absoluteUrl('/auth/callback/') },
    });
    return error ? err(error) : ok(undefined);
  } catch (e) {
    return err(e);
  }
}

export async function signInWithMagicLink(email: string): Promise<Result> {
  const sb = getSupabase();
  if (!sb) return err('Portal not configured.');
  try {
    const { error } = await sb.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: absoluteUrl('/auth/callback/'), shouldCreateUser: false },
    });
    return error ? err(error) : ok(undefined);
  } catch (e) {
    return err(e);
  }
}

export async function sendPasswordReset(email: string): Promise<Result> {
  const sb = getSupabase();
  if (!sb) return err('Portal not configured.');
  try {
    const { error } = await sb.auth.resetPasswordForEmail(email, {
      // Go through /auth/callback/ which verifies the recovery token and then
      // forwards to /account/reset-password/ with an active session.
      redirectTo: absoluteUrl('/auth/callback/'),
    });
    return error ? err(error) : ok(undefined);
  } catch (e) {
    return err(e);
  }
}

export async function updatePassword(password: string): Promise<Result> {
  const sb = getSupabase();
  if (!sb) return err('Portal not configured.');
  try {
    const { error } = await sb.auth.updateUser({ password });
    return error ? err(error) : ok(undefined);
  } catch (e) {
    return err(e);
  }
}

/**
 * Change the password for a logged-in user. If a current password is supplied,
 * it is verified first (re-authentication), which also satisfies Supabase's
 * "secure password change" setting. Leave currentPassword empty for accounts
 * that have no password yet (e.g. invite/magic-link users).
 */
export async function changePassword(
  newPassword: string,
  opts: { currentPassword?: string; totpCode?: string } = {},
): Promise<Result> {
  const sb = getSupabase();
  const user = await currentUser();
  if (!sb || !user?.email) return err('Not signed in.');
  try {
    const factors = await listVerifiedTotp();
    if (factors.length > 0) {
      // 2FA is on: Supabase needs an AAL2 session to change the password.
      const aal = await getAAL();
      if (!aal || aal.current !== 'aal2') {
        if (!opts.totpCode) return err('mfa_required');
        const v = await stepUpTotp(opts.totpCode);
        if (!v.ok) return err('That authenticator code was not accepted. Try again.');
      }
    } else if (opts.currentPassword) {
      // No 2FA: verify the current password (satisfies "secure password change").
      const { error: se } = await sb.auth.signInWithPassword({ email: user.email, password: opts.currentPassword });
      if (se) return err('Current password is incorrect.');
    }
    const { error } = await sb.auth.updateUser({ password: newPassword });
    if (error) {
      if (/current password/i.test(error.message) && !opts.currentPassword && factors.length === 0) {
        return err('Enter your current password above to set a new one.');
      }
      return err(error);
    }
    return ok(undefined);
  } catch (e) {
    return err(e);
  }
}

export async function signOut(): Promise<void> {
  const sb = getSupabase();
  if (sb) await sb.auth.signOut();
}

export async function isAdmin(): Promise<boolean> {
  const sb = getSupabase();
  if (!sb) return false;
  try {
    const { data, error } = await sb.rpc('is_admin');
    return !error && data === true;
  } catch {
    return false;
  }
}

/**
 * Is the current user listed in the admins table, IGNORING the 2FA (aal2)
 * requirement? Used only for UX (to decide whether to show the 2FA step).
 * Falls back to is_admin() if the dedicated function isn't deployed yet.
 */
export async function isAdminMember(): Promise<boolean> {
  const sb = getSupabase();
  if (!sb) return false;
  try {
    const { data, error } = await sb.rpc('is_admin_member');
    if (!error) return data === true;
    const r = await sb.rpc('is_admin');
    return !r.error && r.data === true;
  } catch {
    return false;
  }
}

// ---------- Multi-factor auth (TOTP) ----------

/** Current / next authenticator assurance level. aal2 = password + TOTP done. */
export async function getAAL(): Promise<{ current: string; next: string } | null> {
  const sb = getSupabase();
  if (!sb) return null;
  try {
    const { data, error } = await sb.auth.mfa.getAuthenticatorAssuranceLevel();
    if (error || !data) return null;
    return { current: data.currentLevel ?? 'aal1', next: data.nextLevel ?? 'aal1' };
  } catch {
    return null;
  }
}

/** Verified TOTP factors on the account. */
export async function listVerifiedTotp(): Promise<{ id: string }[]> {
  const sb = getSupabase();
  if (!sb) return [];
  try {
    const { data, error } = await sb.auth.mfa.listFactors();
    if (error || !data) return [];
    return (data.totp ?? [])
      .filter((f) => f.status === 'verified')
      .map((f) => ({ id: f.id }));
  } catch {
    return [];
  }
}

/** Start TOTP enrollment: returns a QR (SVG), secret and otpauth URI to display. */
export async function enrollTotp(): Promise<
  Result<{ factorId: string; qr: string; secret: string; uri: string }>
> {
  const sb = getSupabase();
  if (!sb) return err('Portal not configured.');
  try {
    const { data, error } = await sb.auth.mfa.enroll({
      factorType: 'totp',
      friendlyName: 'Authenticator ' + new Date().toISOString().slice(0, 16),
    });
    if (error) return err(error);
    return ok({ factorId: data.id, qr: data.totp.qr_code, secret: data.totp.secret, uri: data.totp.uri });
  } catch (e) {
    return err(e);
  }
}

/** Verify a code against a factor (confirms enrollment AND steps the session up to aal2). */
export async function verifyTotp(factorId: string, code: string): Promise<Result> {
  const sb = getSupabase();
  if (!sb) return err('Portal not configured.');
  try {
    const ch = await sb.auth.mfa.challenge({ factorId });
    if (ch.error) return err(ch.error);
    const { error } = await sb.auth.mfa.verify({ factorId, challengeId: ch.data.id, code });
    return error ? err(error) : ok(undefined);
  } catch (e) {
    return err(e);
  }
}

/** Step up an existing (aal1) session to aal2 using the first verified TOTP factor. */
export async function stepUpTotp(code: string): Promise<Result> {
  const sb = getSupabase();
  if (!sb) return err('Portal not configured.');
  try {
    const { data, error } = await sb.auth.mfa.listFactors();
    if (error) return err(error);
    const totp = (data?.totp ?? []).find((f) => f.status === 'verified');
    if (!totp) return err('No 2FA factor is set up.');
    return await verifyTotp(totp.id, code);
  } catch (e) {
    return err(e);
  }
}

/** Remove a TOTP factor (requires the current session; use with care). */
export async function unenrollTotp(factorId: string): Promise<Result> {
  const sb = getSupabase();
  if (!sb) return err('Portal not configured.');
  try {
    const { error } = await sb.auth.mfa.unenroll({ factorId });
    return error ? err(error) : ok(undefined);
  } catch (e) {
    return err(e);
  }
}

export interface Profile {
  id: string;
  full_name: string;
  email: string | null;
  cohort: string | null;
  consented_at: string | null;
}

export async function getProfile(): Promise<Profile | null> {
  const sb = getSupabase();
  const user = await currentUser();
  if (!sb || !user) return null;
  const { data } = await sb
    .from('profiles')
    .select('id, full_name, email, cohort, consented_at')
    .eq('id', user.id)
    .single();
  return (data as Profile) ?? null;
}

export async function updateFullName(name: string): Promise<Result> {
  const sb = getSupabase();
  const user = await currentUser();
  if (!sb || !user) return err('Not signed in.');
  try {
    const { error } = await sb.from('profiles').update({ full_name: name }).eq('id', user.id);
    return error ? err(error) : ok(undefined);
  } catch (e) {
    return err(e);
  }
}

export async function recordConsent(): Promise<Result> {
  const sb = getSupabase();
  const user = await currentUser();
  if (!sb || !user) return err('Not signed in.');
  try {
    const { error } = await sb
      .from('profiles')
      .update({ consented_at: new Date().toISOString() })
      .eq('id', user.id);
    return error ? err(error) : ok(undefined);
  } catch (e) {
    return err(e);
  }
}
