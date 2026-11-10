/**
 * Course/lesson data layer. Centralises loading, sorting, cross-validation and
 * navigation so pages stay simple and the content rules live in one place.
 * (WEBSITE-BUILD-PROMPT.md §5.2 validation, §7.3, §7.4)
 */
import { getCollection, type CollectionEntry } from 'astro:content';

export type Course = CollectionEntry<'courses'>;
export type Lesson = CollectionEntry<'lessons'>;

const isProd = import.meta.env.PROD;

/** The URL slug for a lesson = its filename without extension (stable). */
export function lessonSlug(lesson: Lesson): string {
  return lesson.id.split('/').pop() as string;
}

let validated = false;

async function loadAll(): Promise<{ courses: Course[]; lessons: Lesson[] }> {
  const courses = await getCollection('courses');
  const lessons = (await getCollection('lessons')).filter(
    (l) => !(isProd && l.data.draft),
  );

  if (!validated) {
    validate(courses, lessons);
    validated = true;
  }
  return { courses, lessons };
}

/** Fail the build with a clear message on content errors (§5.2). */
function validate(courses: Course[], lessons: Lesson[]): void {
  const errors: string[] = [];
  const courseSlugs = new Set(courses.map((c) => c.data.slug));

  // Course folder name must equal its slug.
  for (const c of courses) {
    const folder = c.id.split('/')[0];
    if (folder !== c.data.slug) {
      errors.push(
        `Course "${c.id}": folder "${folder}" does not match slug "${c.data.slug}".`,
      );
    }
  }

  // Lessons must reference an existing course, and orders must be unique per course.
  const seen = new Map<string, Map<number, string>>();
  for (const l of lessons) {
    if (!courseSlugs.has(l.data.course)) {
      errors.push(
        `Lesson "${l.id}": course "${l.data.course}" does not exist. ` +
          `Known courses: ${[...courseSlugs].join(', ')}.`,
      );
      continue;
    }
    const byOrder = seen.get(l.data.course) ?? new Map<number, string>();
    if (byOrder.has(l.data.order)) {
      errors.push(
        `Course "${l.data.course}": lessons "${byOrder.get(l.data.order)}" and ` +
          `"${lessonSlug(l)}" share order ${l.data.order}. Orders must be unique.`,
      );
    } else {
      byOrder.set(l.data.order, lessonSlug(l));
    }
    seen.set(l.data.course, byOrder);
  }

  if (errors.length) {
    throw new Error(
      `\nContent validation failed (${errors.length}):\n` +
        errors.map((e) => `  - ${e}`).join('\n') +
        '\n',
    );
  }
}

export async function getAllCourses(): Promise<Course[]> {
  const { courses } = await loadAll();
  return courses.sort((a, b) => a.data.order - b.data.order);
}

export async function getCourseBySlug(slug: string): Promise<Course | undefined> {
  const { courses } = await loadAll();
  return courses.find((c) => c.data.slug === slug);
}

export async function getLessons(courseSlug: string): Promise<Lesson[]> {
  const { lessons } = await loadAll();
  return lessons
    .filter((l) => l.data.course === courseSlug)
    .sort((a, b) => a.data.order - b.data.order);
}

/** Previous/next lesson within the same course, by order. */
export async function getAdjacentLessons(
  lesson: Lesson,
): Promise<{ prev: Lesson | null; next: Lesson | null }> {
  const siblings = await getLessons(lesson.data.course);
  const idx = siblings.findIndex((l) => l.id === lesson.id);
  return {
    prev: idx > 0 ? siblings[idx - 1] : null,
    next: idx >= 0 && idx < siblings.length - 1 ? siblings[idx + 1] : null,
  };
}

/** Group a course's lessons by their optional `phase` field (preserving order). */
export function groupByPhase(lessons: Lesson[]): Array<{ phase: string | null; lessons: Lesson[] }> {
  const groups: Array<{ phase: string | null; lessons: Lesson[] }> = [];
  for (const l of lessons) {
    const phase = l.data.phase ?? null;
    const last = groups[groups.length - 1];
    if (last && last.phase === phase) last.lessons.push(l);
    else groups.push({ phase, lessons: [l] });
  }
  return groups;
}
