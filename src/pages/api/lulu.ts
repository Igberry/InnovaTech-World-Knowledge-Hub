import { createHmac, randomBytes } from 'node:crypto';
import type { APIRoute } from 'astro';
import { getRelevantLuluKnowledge } from '../../lib/lulu-knowledge';
import { createLocalRateLimiter } from '../../lib/lulu-rate-limit.mjs';
import { withBase } from '../../utils/links';

export const prerender = false;

const MAX_BODY_BYTES = 10000;
const MAX_MESSAGE_LENGTH = 1500;
const rateLimitSecret = process.env.LULU_RATE_LIMIT_SECRET ?? randomBytes(32).toString('hex');
const rateLimit = createLocalRateLimiter({ tenMinuteLimit: 6, dailyLimit: 30 });
const responseHeaders = {
  'Content-Type': 'application/json; charset=utf-8',
  'Cache-Control': 'no-store, max-age=0',
  'X-Content-Type-Options': 'nosniff',
};

function jsonResponse(status: number, body: Record<string, unknown>, extraHeaders: Record<string, string> = {}): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...responseHeaders, ...extraHeaders },
  });
}

export const POST: APIRoute = async ({ request, clientAddress }) => {
  const origin = request.headers.get('origin');
  if (origin && origin !== new URL(request.url).origin) {
    return jsonResponse(403, { error: 'This request is not allowed.' });
  }

  if (request.headers.get('content-type')?.split(';')[0].trim().toLowerCase() !== 'application/json') {
    return jsonResponse(415, { error: 'Send a JSON request.' });
  }

  const contentLength = Number(request.headers.get('content-length') ?? '0');
  if (contentLength > MAX_BODY_BYTES) {
    return jsonResponse(413, { error: 'That message is too large.' });
  }

  let payload: unknown;
  try {
    const raw = await request.text();
    if (new TextEncoder().encode(raw).byteLength > MAX_BODY_BYTES) {
      return jsonResponse(413, { error: 'That message is too large.' });
    }
    payload = JSON.parse(raw);
  } catch {
    return jsonResponse(400, { error: 'The message could not be read. Please try again.' });
  }

  if (!payload || typeof payload !== 'object') {
    return jsonResponse(400, { error: 'Send a message to continue.' });
  }
  const body = payload as Record<string, unknown>;
  if (typeof body.message !== 'string' || body.message.trim().length === 0 || body.message.length > MAX_MESSAGE_LENGTH) {
    return jsonResponse(400, { error: `Your question must be between 1 and ${MAX_MESSAGE_LENGTH} characters.` });
  }

  if (process.env.LULU_ENABLED === 'false') {
    return jsonResponse(503, { error: 'Lulu is temporarily unavailable. Please use the Contact page.' });
  }

  if (!clientAddress) {
    return jsonResponse(503, { error: 'Lulu is not available from this connection. Please use the Contact page.' });
  }

  const clientKey = createHmac('sha256', rateLimitSecret).update(clientAddress).digest('hex');
  const limit = rateLimit(clientKey);
  if (!limit.allowed) {
    return jsonResponse(
      429,
      { error: limit.reason === 'daily' ? 'You have reached today’s chat limit.' : 'Please wait a little before searching again.' },
      { 'Retry-After': String(limit.retryAfterSeconds) },
    );
  }

  let excerpts: string[];
  try {
    excerpts = await getRelevantLuluKnowledge(body.message.trim());
  } catch {
    console.error('[lulu] Public knowledge could not be loaded.');
    return jsonResponse(503, { error: 'Lulu could not search the published information. Please try again later.' });
  }

  const answer = excerpts.length
    ? `Here are the closest matches from InnovaTech’s published pages:\n\n${excerpts.join('\n\n---\n\n')}\n\nFor a confirmed answer, contact InnovaTech: ${withBase('/contact/')}`
    : `I couldn’t find a matching answer in the published pages. Try another wording, or contact InnovaTech: ${withBase('/contact/')}`;

  return jsonResponse(200, { answer });
};
