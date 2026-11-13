import type { APIRoute } from 'astro';
import { getPublicLuluKnowledge } from '../lib/lulu-knowledge';

export const prerender = true;

export const GET: APIRoute = async () => new Response(
  JSON.stringify(await getPublicLuluKnowledge()),
  {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
      'X-Content-Type-Options': 'nosniff',
    },
  },
);
