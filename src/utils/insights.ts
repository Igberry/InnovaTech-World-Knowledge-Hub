import { getCollection, type CollectionEntry } from 'astro:content';

export type Insight = CollectionEntry<'insights'>;

const isProd = import.meta.env.PROD;

/** The URL slug for an insight = its filename without extension. */
export function insightSlug(post: Insight): string {
  return post.id.split('/').pop() as string;
}

/** Published posts, newest first (drafts hidden in production). */
export async function getInsights(): Promise<Insight[]> {
  const posts = (await getCollection('insights')).filter((p) => !(isProd && p.data.draft));
  return posts.sort(
    (a, b) => b.data.publishDate.getTime() - a.data.publishDate.getTime(),
  );
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
}
