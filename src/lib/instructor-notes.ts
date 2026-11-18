/**
 * Admin-only instructor notes for a lesson. Stored in Supabase and read at
 * runtime only (never in the published HTML). RLS allows any admin to read and
 * full admins (2FA) to write - see migration 0015_instructor_notes.sql.
 */
import { getSupabase } from './supabase';
import { currentUser, type Result } from './auth';

/** The note body for a lesson, or null if none / not an admin. */
export async function getInstructorNote(course: string, lesson: string): Promise<string | null> {
  const sb = getSupabase();
  if (!sb) return null;
  const { data, error } = await sb
    .from('instructor_notes')
    .select('body')
    .eq('course_slug', course)
    .eq('lesson_slug', lesson)
    .maybeSingle();
  if (error) return null;
  return (data as { body?: string } | null)?.body ?? null;
}

/** Upsert the note for a lesson (admins only; enforced by RLS). */
export async function saveInstructorNote(course: string, lesson: string, body: string): Promise<Result> {
  const sb = getSupabase();
  const user = await currentUser();
  if (!sb || !user) return { ok: false, error: 'Not signed in.' };
  try {
    const { error } = await sb.from('instructor_notes').upsert(
      {
        course_slug: course,
        lesson_slug: lesson,
        body,
        updated_at: new Date().toISOString(),
        updated_by: user.id,
      },
      { onConflict: 'course_slug,lesson_slug' },
    );
    return error ? { ok: false, error: error.message } : { ok: true, data: undefined };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : String(e) };
  }
}

/** Remove a lesson's note (admins only; enforced by RLS). */
export async function deleteInstructorNote(course: string, lesson: string): Promise<Result> {
  const sb = getSupabase();
  if (!sb) return { ok: false, error: 'Portal not configured.' };
  try {
    const { error } = await sb
      .from('instructor_notes')
      .delete()
      .eq('course_slug', course)
      .eq('lesson_slug', lesson);
    return error ? { ok: false, error: error.message } : { ok: true, data: undefined };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : String(e) };
  }
}
