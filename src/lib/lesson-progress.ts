/**
 * Unified lesson progress for the browser (STUDENT-PORTAL-SPEC.md §6.3).
 *
 * Logged out: uses localStorage (as in Phases 1–2).
 * Logged in:  the database is the source of truth. We also mirror the signed-in
 *             user's DB progress into the localStorage cache so the existing
 *             sidebar and course progress bars (which read the cache and the
 *             `itw:progress` event) stay correct — without rewriting them.
 */
import { isPortalEnabled } from './supabase';
import { currentUser } from './auth';
import { setLessonComplete as dbSet, getProgress as dbGetAll } from './portal';
import { getCompleted, setComplete as localSet } from '../scripts/progress';

let checked = false;
let loggedIn = false;

export async function isLoggedIn(): Promise<boolean> {
  if (!isPortalEnabled) return false;
  if (!checked) {
    loggedIn = !!(await currentUser());
    checked = true;
  }
  return loggedIn;
}

/** Toggle completion. Optimistic local update, then DB write when signed in. */
export async function toggleLessonComplete(course: string, lesson: string): Promise<boolean> {
  const now = !getCompleted(course).has(lesson);
  localSet(course, lesson, now); // optimistic (updates cache + fires event)
  if (await isLoggedIn()) {
    const r = await dbSet(course, lesson, now);
    if (!r.ok) {
      localSet(course, lesson, !now); // revert on failure
      throw new Error(r.error);
    }
  }
  return now;
}

/** Mirror the signed-in user's DB progress for one course into the local cache. */
export async function bootstrapCourseCache(course: string): Promise<void> {
  if (!(await isLoggedIn())) return;
  try {
    const rows = await dbGetAll();
    const completed = rows
      .filter((r) => r.course_slug === course && r.status === 'completed')
      .map((r) => r.lesson_slug);
    localStorage.setItem(`itw:progress:${course}`, JSON.stringify(completed));
    document.dispatchEvent(new CustomEvent('itw:progress', { detail: { course } }));
  } catch {
    /* keep whatever cache exists */
  }
}
