/**
 * Lesson progress stored per-course in localStorage (no accounts).
 * (WEBSITE-BUILD-PROMPT.md §7.4) — all access wrapped so private mode / blocked
 * storage never throws. Phase 4 will merge this into Supabase.
 *
 * Kept deliberately small and framework-free behind this one module so the
 * Phase-4 portal can swap the storage backend without touching the UI.
 */
const KEY = (course: string) => `itw:progress:${course}`;

export function getCompleted(course: string): Set<string> {
  try {
    const raw = localStorage.getItem(KEY(course));
    if (!raw) return new Set();
    const arr = JSON.parse(raw);
    return new Set(Array.isArray(arr) ? arr : []);
  } catch {
    return new Set();
  }
}

export function isComplete(course: string, lesson: string): boolean {
  return getCompleted(course).has(lesson);
}

export function setComplete(course: string, lesson: string, done: boolean): Set<string> {
  const set = getCompleted(course);
  if (done) set.add(lesson);
  else set.delete(lesson);
  try {
    localStorage.setItem(KEY(course), JSON.stringify([...set]));
  } catch {
    /* ignore write failures (private mode etc.) */
  }
  document.dispatchEvent(
    new CustomEvent('itw:progress', { detail: { course, lesson, done } }),
  );
  return set;
}

export function toggleComplete(course: string, lesson: string): boolean {
  const now = !isComplete(course, lesson);
  setComplete(course, lesson, now);
  return now;
}

export function completionPercent(course: string, total: number): number {
  if (total <= 0) return 0;
  return Math.round((getCompleted(course).size / total) * 100);
}
