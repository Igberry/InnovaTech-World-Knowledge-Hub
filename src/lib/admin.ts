/**
 * Admin-side portal data (STUDENT-PORTAL-SPEC.md §6.4). Admins can read all rows
 * (enforced by RLS); related tables are fetched separately and joined in the
 * client by user_id, since there are no direct profile foreign keys to embed.
 */
import { getSupabase } from './supabase';
import { currentUser, type Result } from './auth';

export interface AdminProfile {
  id: string;
  full_name: string;
  email: string | null;
  cohort: string | null;
}
export interface AdminEnrollment { user_id: string; course_slug: string; status: string; enrolled_at: string }
export interface AdminProgress { user_id: string; course_slug: string; lesson_slug: string; updated_at: string }
export interface AdminSubmission {
  id: string; user_id: string; course_slug: string; lesson_slug: string;
  link_url: string | null; note: string | null; submitted_at: string;
}
export interface AdminReview {
  submission_id: string; status: 'approved' | 'needs_changes'; score: number | null;
  feedback: string | null; reviewed_at: string;
}
export interface AdminAttendance {
  id: string; user_id: string; course_slug: string; session_date: string;
  status: 'present' | 'absent' | 'excused'; note: string | null;
}

async function selectAll<T>(table: string, columns: string): Promise<T[]> {
  const sb = getSupabase();
  if (!sb) return [];
  const { data } = await sb.from(table).select(columns);
  return (data as T[]) ?? [];
}

export const getProfiles = () => selectAll<AdminProfile>('profiles', 'id, full_name, email, cohort');
export const getEnrollments = () => selectAll<AdminEnrollment>('enrollments', 'user_id, course_slug, status, enrolled_at');
export const getProgress = () => selectAll<AdminProgress>('lesson_progress', 'user_id, course_slug, lesson_slug, updated_at');
export const getSubmissions = () => selectAll<AdminSubmission>('submissions', 'id, user_id, course_slug, lesson_slug, link_url, note, submitted_at');
export const getReviews = () => selectAll<AdminReview>('reviews', 'submission_id, status, score, feedback, reviewed_at');
export const getAttendance = () => selectAll<AdminAttendance>('attendance', 'id, user_id, course_slug, session_date, status, note');

export async function saveReview(
  submissionId: string,
  status: 'approved' | 'needs_changes',
  score: number | null,
  feedback: string,
): Promise<Result> {
  const sb = getSupabase();
  const user = await currentUser();
  if (!sb || !user) return { ok: false, error: 'Not signed in.' };
  try {
    const { error } = await sb.from('reviews').upsert(
      {
        submission_id: submissionId,
        reviewer_id: user.id,
        status,
        score,
        feedback: feedback || null,
        reviewed_at: new Date().toISOString(),
      },
      { onConflict: 'submission_id' },
    );
    return error ? { ok: false, error: error.message } : { ok: true, data: undefined };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : String(e) };
  }
}

export async function setEnrollment(
  userId: string,
  courseSlug: string,
  status: 'active' | 'paused' | 'completed',
): Promise<Result> {
  const sb = getSupabase();
  if (!sb) return { ok: false, error: 'Portal not configured.' };
  try {
    const { error } = await sb
      .from('enrollments')
      .upsert({ user_id: userId, course_slug: courseSlug, status }, { onConflict: 'user_id,course_slug' });
    return error ? { ok: false, error: error.message } : { ok: true, data: undefined };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : String(e) };
  }
}

export async function saveAttendance(
  rows: Array<{ user_id: string; course_slug: string; session_date: string; status: string; note?: string }>,
): Promise<Result> {
  const sb = getSupabase();
  if (!sb) return { ok: false, error: 'Portal not configured.' };
  if (rows.length === 0) return { ok: true, data: undefined };
  try {
    const { error } = await sb
      .from('attendance')
      .upsert(rows, { onConflict: 'user_id,course_slug,session_date' });
    return error ? { ok: false, error: error.message } : { ok: true, data: undefined };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : String(e) };
  }
}

/** Build a CSV string and trigger a download in the browser. */
export function downloadCsv(filename: string, headers: string[], rows: (string | number | null)[][]): void {
  const esc = (v: string | number | null) => {
    const s = v === null || v === undefined ? '' : String(v);
    return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };
  const csv = [headers.map(esc).join(','), ...rows.map((r) => r.map(esc).join(','))].join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
