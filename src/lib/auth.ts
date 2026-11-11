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
      redirectTo: absoluteUrl('/account/reset-password/'),
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
