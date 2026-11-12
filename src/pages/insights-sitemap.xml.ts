import type { APIContext } from 'astro';
import { getPublicInsights } from '../lib/insights';
import { withBase } from '../utils/links';

export const prerender = false;

function xml(value: string): string {
  return value.replace(/[<>&'"]/g, (char) => ({
    '<': '&lt;',
    '>': '&gt;',
    '&': '&amp;',
    "'": '&apos;',
    '"': '&quot;',
  })[char]!);
}

export async function GET(context: APIContext): Promise<Response> {
  const posts = await getPublicInsights();
  const siteOrigin = context.site ?? new URL(context.request.url);
  const entries = posts.map((post) => {
    const url = new URL(withBase(`/insights/${encodeURIComponent(post.slug)}/`), siteOrigin).toString();
    const lastmod = (post.updatedDate ?? post.publishDate).toISOString();
    return `<url><loc>${xml(url)}</loc><lastmod>${lastmod}</lastmod></url>`;
  });

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${entries.join('')}</urlset>`,
    {
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, max-age=900',
      },
    },
  );
}
