/**
 * Build a small course/lesson catalog at build time for the portal pages to read
 * client-side (as a JSON island). Lesson content is NOT included — only slugs,
 * titles and links — so the catalog stays tiny.
 */
import { getAllCourses, getLessons, lessonSlug } from './courses';
import { withBase } from './links';

export interface CatalogLesson {
  slug: string;
  title: string;
  href: string;
  hasAssignment?: boolean;
}
export interface CatalogCourse {
  slug: string;
  title: string;
  href: string;
  status: string;
  lessons: CatalogLesson[];
}

export async function buildCatalog(): Promise<CatalogCourse[]> {
  const courses = await getAllCourses();
  const out: CatalogCourse[] = [];
  for (const c of courses) {
    const lessons = c.data.status === 'available' ? await getLessons(c.data.slug) : [];
    out.push({
      slug: c.data.slug,
      title: c.data.title,
      href: withBase(`/courses/${c.data.slug}/`),
      status: c.data.status,
      lessons: lessons.map((l) => ({
        slug: lessonSlug(l),
        title: l.data.title,
        href: withBase(`/courses/${c.data.slug}/${lessonSlug(l)}/`),
        hasAssignment: /(^|\n)#{1,6}\s+Weekly Assignment/i.test(l.body ?? ''),
      })),
    });
  }
  return out;
}
