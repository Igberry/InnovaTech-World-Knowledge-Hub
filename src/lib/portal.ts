/**
 * Student-side portal data (STUDENT-PORTAL-SPEC.md §6.3).
 * Progress, submissions, reviews, attendance — all scoped to the signed-in user
 * by RLS. Includes the one-time localStorage → database merge on first login.
 */
import { getSupabase } from './supabase';
import { currentUser, type Result } from './auth';

const LOCAL_KEY = (course: string) => `itw:progress:${course}`;

export interface Enrollment {
  course_slug: string;
  status: 'active' | 'paused' | 'completed';
}
export interface ProgressRow {
  course_slug: string;
  lesson_slug: string;
  status: 'in_progress' | 'completed';
}
export interface Submission {
  id: string;
  course_slug: string;
  lesson_slug: string;
  link_url: string | null;
  note: string | null;
  submitted_at: string;
}
export interface Review {
  submission_id: string;
  status: 'approved' | 'needs_changes';
  score: number | null;
  feedback: string | null;
  reviewed_at: string;
}
export interface AttendanceRow {
  course_slug: string;
  session_date: string;
  status: 'present' | 'absent' | 'excused';
  note: string | null;
}

export async function getEnrollments(): Promise<Enrollment[]> {
  const sb = getSupabase();
  if (!sb) return [];
  const { data } = await sb.from('enrollments').select('course_slug, status');
  return (data as Enrollment[]) ?? [];
}

export async function getProgress(): Promise<ProgressRow[]> {
  const sb = getSupabase();
  if (!sb) return [];
  const { data } = await sb.from('lesson_progress').select('course_slug, lesson_slug, status');
  return (data as ProgressRow[]) ?? [];
}

export async function setLessonComplete(
  courseSlug: string,
  lessonSlug: string,
  done: boolean,
): Promise<Result> {
  const sb = getSupabase();
  const user = await currentUser();
  if (!sb || !user) return { ok: false, error: 'Not signed in.' };
  try {
    if (done) {
      const { error } = await sb.from('lesson_progress').upsert(
        { user_id: user.id, course_slug: courseSlug, lesson_slug: lessonSlug, status: 'completed', updated_at: new Date().toISOString() },
        { onConflict: 'user_id,course_slug,lesson_slug' },
      );
      return error ? { ok: false, error: error.message } : { ok: true, data: undefined };
    }
    const { error } = await sb
      .from('lesson_progress')
      .delete()
      .eq('user_id', user.id)
      .eq('course_slug', courseSlug)
      .eq('lesson_slug', lessonSlug);
    return error ? { ok: false, error: error.message } : { ok: true, data: undefined };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : String(e) };
  }
}

/**
 * Merge any localStorage progress into the database for enrolled courses, once.
 * After a successful merge the local copy for those courses is cleared so the DB
 * becomes the single source of truth for this signed-in user.
 */
export async function mergeLocalProgress(enrolledSlugs: string[]): Promise<void> {
  const sb = getSupabase();
  const user = await currentUser();
  if (!sb || !user || enrolledSlugs.length === 0) return;

  const rows: Array<{ user_id: string; course_slug: string; lesson_slug: string; status: string }> = [];
  for (const slug of enrolledSlugs) {
    let local: string[] = [];
    try {
      local = JSON.parse(localStorage.getItem(LOCAL_KEY(slug)) || '[]');
    } catch {
      local = [];
    }
    for (const lesson of local) {
      rows.push({ user_id: user.id, course_slug: slug, lesson_slug: lesson, status: 'completed' });
    }
  }
  if (rows.length === 0) return;

  const { error } = await sb
    .from('lesson_progress')
    .upsert(rows, { onConflict: 'user_id,course_slug,lesson_slug' });
  if (error) return; // leave local intact so we can retry next time

  for (const slug of enrolledSlugs) {
    try {
      localStorage.removeItem(LOCAL_KEY(slug));
    } catch {
      /* ignore */
    }
  }
}

export async function getMySubmissions(): Promise<Submission[]> {
  const sb = getSupabase();
  if (!sb) return [];
  const { data } = await sb
    .from('submissions')
    .select('id, course_slug, lesson_slug, link_url, note, submitted_at')
    .order('submitted_at', { ascending: false });
  return (data as Submission[]) ?? [];
}

export async function getMyReviews(): Promise<Review[]> {
  const sb = getSupabase();
  if (!sb) return [];
  const { data } = await sb
    .from('reviews')
    .select('submission_id, status, score, feedback, reviewed_at');
  return (data as Review[]) ?? [];
}

export async function submitAssignment(
  courseSlug: string,
  lessonSlug: string,
  linkUrl: string,
  note: string,
): Promise<Result> {
  const sb = getSupabase();
  const user = await currentUser();
  if (!sb || !user) return { ok: false, error: 'Not signed in.' };
  if (!/^https?:\/\//i.test(linkUrl)) return { ok: false, error: 'Link must start with http:// or https://' };
  try {
    const { error } = await sb.from('submissions').insert({
      user_id: user.id,
      course_slug: courseSlug,
      lesson_slug: lessonSlug,
      link_url: linkUrl,
      note: note || null,
    });
    return error ? { ok: false, error: error.message } : { ok: true, data: undefined };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : String(e) };
  }
}

export async function getMyAttendance(): Promise<AttendanceRow[]> {
  const sb = getSupabase();
  if (!sb) return [];
  const { data } = await sb
    .from('attendance')
    .select('course_slug, session_date, status, note')
    .order('session_date', { ascending: false });
  return (data as AttendanceRow[]) ?? [];
}
