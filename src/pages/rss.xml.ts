import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getInsights, insightSlug } from '../utils/insights';
import { site } from '../config/site';

export async function GET(context: APIContext) {
  const posts = await getInsights();
  // Base-aware site root so item links include the deployment base path.
  const siteRoot = new URL(import.meta.env.BASE_URL, context.site ?? site.url).toString();
  return rss({
    title: `${site.name} - Insights`,
    description: 'Practical articles on tech careers, remote work, and learning digital skills.',
    site: siteRoot,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.publishDate,
      link: `insights/${insightSlug(post)}/`,
    })),
  });
}
