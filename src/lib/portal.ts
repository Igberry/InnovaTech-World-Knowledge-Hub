/**
 * Student-side portal data (STUDENT-PORTAL-SPEC.md §6.3).
 * Progress, submissions, reviews, attendance - all scoped to the signed-in user
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
  file_path: string | null;
  file_name: string | null;
  text_body: string | null;
  submitted_at: string;
}

/** File types a student may upload for an assignment. */
export const ALLOWED_SUBMISSION_EXTS = ['pdf', 'docx', 'pptx', 'csv', 'md', 'txt'] as const;
export const MAX_SUBMISSION_BYTES = 15 * 1024 * 1024; // 15 MB
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
    .select('id, course_slug, lesson_slug, link_url, note, file_path, file_name, text_body, submitted_at')
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

// ---------- Student project showcase ----------

export interface ShowcaseProject {
  id: string;
  project_title: string;
  course_slug: string | null;
  url: string;
  summary: string | null;
  status: 'pending' | 'approved' | 'rejected';
  submitted_at: string;
}

/** The signed-in student's own showcase submissions (any status). */
export async function getMyShowcaseProjects(): Promise<ShowcaseProject[]> {
  const sb = getSupabase();
  if (!sb) return [];
  const { data } = await sb
    .from('showcase_projects')
    .select('id, project_title, course_slug, url, summary, status, submitted_at')
    .order('submitted_at', { ascending: false });
  return (data as ShowcaseProject[]) ?? [];
}

/** Submit a finished project to the showcase (lands as 'pending' for review). */
export async function submitShowcaseProject(input: {
  projectTitle: string;
  courseSlug?: string;
  url: string;
  summary?: string;
}): Promise<Result> {
  const sb = getSupabase();
  const user = await currentUser();
  if (!sb || !user) return { ok: false, error: 'Please log in to submit a project.' };
  const title = input.projectTitle.trim();
  const url = input.url.trim();
  if (!title) return { ok: false, error: 'Please enter a project title.' };
  if (!/^https?:\/\//i.test(url)) return { ok: false, error: 'Link must start with http:// or https://' };
  const { data: prof } = await sb.from('profiles').select('full_name').eq('id', user.id).single();
  const name = ((prof as { full_name?: string } | null)?.full_name || '').trim() || user.email || 'Student';
  try {
    const { error } = await sb.from('showcase_projects').insert({
      user_id: user.id,
      name,
      project_title: title,
      course_slug: input.courseSlug?.trim() || null,
      url,
      summary: input.summary?.trim() || null,
    });
    return error ? { ok: false, error: error.message } : { ok: true, data: undefined };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : String(e) };
  }
}

/**
 * Submit an assignment. A student may provide any of: a file upload, a link, or
 * a typed answer (at least one required), plus an optional note. Files go to the
 * private "submissions" storage bucket under <user_id>/<course>/<lesson>/.
 */
export async function submitAssignment(
  courseSlug: string,
  lessonSlug: string,
  input: { link?: string; text?: string; note?: string; file?: File | null },
): Promise<Result> {
  const sb = getSupabase();
  const user = await currentUser();
  if (!sb || !user) return { ok: false, error: 'Not signed in.' };

  const link = (input.link || '').trim();
  const text = (input.text || '').trim();
  const note = (input.note || '').trim();
  const file = input.file || null;

  if (!file && !link && !text) {
    return { ok: false, error: 'Add a file, a link, or type your answer.' };
  }
  if (link && !/^https?:\/\//i.test(link)) {
    return { ok: false, error: 'Link must start with http:// or https://' };
  }

  let filePath: string | null = null;
  let fileName: string | null = null;
  if (file) {
    const ext = file.name.split('.').pop()?.toLowerCase() || '';
    if (!(ALLOWED_SUBMISSION_EXTS as readonly string[]).includes(ext)) {
      return { ok: false, error: `Allowed file types: ${ALLOWED_SUBMISSION_EXTS.join(', ')}.` };
    }
    if (file.size > MAX_SUBMISSION_BYTES) {
      return { ok: false, error: 'That file is too large (max 15 MB).' };
    }
    const safe = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
    const path = `${user.id}/${courseSlug}/${lessonSlug}/${Date.now()}-${safe}`;
    const up = await sb.storage.from('submissions').upload(path, file, { upsert: false });
    if (up.error) return { ok: false, error: up.error.message };
    filePath = path;
    fileName = file.name;
  }

  try {
    const { error } = await sb.from('submissions').insert({
      user_id: user.id,
      course_slug: courseSlug,
      lesson_slug: lessonSlug,
      link_url: link || null,
      note: note || null,
      text_body: text || null,
      file_path: filePath,
      file_name: fileName,
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
