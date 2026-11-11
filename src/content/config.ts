import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const STATUS = ['available', 'coming-soon'] as const;
const LEVEL = ['Beginner', 'Intermediate', 'Advanced'] as const;

/**
 * Courses: one `_course.md` per course folder. The folder name is the URL slug
 * and must equal the `slug` frontmatter field.
 */
const courses = defineCollection({
  loader: glob({ pattern: '*/_course.md', base: './src/content/courses' }),
  schema: z
    .object({
      title: z.string(),
      slug: z.string(),
      status: z.enum(STATUS),
      category: z.string(),
      summary: z.string(),
      icon: z.string(), // a Lucide icon name, e.g. "bar-chart-3"
      order: z.number().int(),
      // Required for AVAILABLE courses, optional for coming-soon:
      level: z.enum(LEVEL).optional(),
      duration: z.string().optional(),
      format: z.string().optional(),
      outcomes: z.array(z.string()).optional(),
      tools: z.array(z.string()).optional(),
      featured: z.boolean().default(false),
    })
    .superRefine((data, ctx) => {
      if (data.status === 'available') {
        for (const field of ['level', 'duration', 'format', 'outcomes'] as const) {
          if (data[field] === undefined) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: `Available course "${data.slug}" is missing required field "${field}".`,
              path: [field],
            });
          }
        }
      }
    }),
});

/**
 * Lessons: every `.md` in a course folder except `_course.md`.
 */
const lessons = defineCollection({
  loader: glob({ pattern: ['*/*.md', '!*/_course.md'], base: './src/content/courses' }),
  schema: z.object({
    title: z.string(),
    course: z.string(), // must match a course slug (checked in src/utils/courses.ts)
    order: z.number().int(),
    week: z.number().int().optional(),
    phase: z.string().optional(),
    summary: z.string(),
    estimatedHours: z.number().optional(),
    tools: z.array(z.string()).optional(),
    downloads: z
      .array(
        z.object({
          label: z.string(),
          href: z.string(),
        }),
      )
      .optional(),
    draft: z.boolean().default(false),
  }),
});

/**
 * Insights: short blog articles (tech careers in Nigeria, remote work, study tips).
 */
const insights = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/insights' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    author: z.string().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { courses, lessons, insights };
