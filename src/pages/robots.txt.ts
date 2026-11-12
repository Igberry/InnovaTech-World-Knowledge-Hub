import type { APIContext } from 'astro';
import { withBase } from '../utils/links';

export const prerender = false;

export async function GET(context: APIContext): Promise<Response> {
  const siteOrigin = context.site ?? new URL(context.request.url);
  const content = [
    'User-agent: *',
    'Allow: /',
    `Sitemap: ${new URL(withBase('/sitemap-index.xml'), siteOrigin).toString()}`,
    `Sitemap: ${new URL(withBase('/insights-sitemap.xml'), siteOrigin).toString()}`,
    '',
  ].join('\n');

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
