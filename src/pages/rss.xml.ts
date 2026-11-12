import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getPublicInsights } from '../lib/insights';
import { site } from '../config/site';

export const prerender = false;

export async function GET(context: APIContext) {
  const posts = await getPublicInsights();
  const siteRoot = new URL(import.meta.env.BASE_URL, context.site ?? new URL(context.request.url)).toString();
  return rss({
    title: `${site.name} - Insights`,
    description: 'Practical articles on tech careers, remote work, and learning digital skills.',
    site: siteRoot,
    items: posts.map((post) => ({
      title: post.title,
      description: post.description,
      pubDate: post.publishDate,
      link: `insights/${post.slug}/`,
    })),
  });
}
