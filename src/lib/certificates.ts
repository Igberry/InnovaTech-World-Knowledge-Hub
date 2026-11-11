/**
 * Public certificate verification (STUDENT-PORTAL-SPEC.md / certificates table).
 * Calls the `verify_certificate` security-definer function, which returns only the
 * single matching record for an exact code - no listing of all graduates.
 */
import { getSupabase } from './supabase';

export interface CertificateRecord {
  code: string;
  student_name: string;
  course: string;
  duration: string | null;
  grade: string | null;
  issued_at: string;
}

export async function verifyCertificate(code: string): Promise<CertificateRecord | null> {
  const sb = getSupabase();
  if (!sb) return null;
  try {
    const { data, error } = await sb.rpc('verify_certificate', { p_code: code });
    if (error || !data || (data as unknown[]).length === 0) return null;
    return (data as CertificateRecord[])[0];
  } catch {
    return null;
  }
}
