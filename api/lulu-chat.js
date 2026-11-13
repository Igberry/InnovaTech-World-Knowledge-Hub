/**
 * POST /api/lulu-chat  (Vercel serverless function)
 *
 * Lulu, the InnovaTech World site assistant, powered by Google's Gemini. The
 * browser sends the conversation so far; this function adds a full InnovaTech
 * knowledge system prompt (with LIVE pricing pulled from Supabase) and returns
 * Gemini's reply. No chat transcripts are stored.
 *
 * Required Vercel env var (Project -> Settings -> Environment Variables):
 *   GEMINI_API_KEY           the Google Gemini (AI Studio) API key (NEVER commit it)
 * Optional:
 *   GEMINI_MODEL             model id (default: gemini-2.5-flash, on the free tier)
 * Reused from the portal (already set):
 *   PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY   for live pricing
 *
 * Security / cost guards:
 *   - POST only; message count and length are capped.
 *   - Best-effort per-IP rate limit (per warm instance).
 *   - Small max output tokens to keep replies fast and cheap.
 *   - The key is sent in a header (x-goog-api-key), never in the URL.
 */

const GEMINI_MODEL = process.env.GEMINI_MODEL || 'gemini-2.5-flash';

const send = (res, status, body) => {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.end(JSON.stringify(body));
};

// ---- Best-effort per-IP rate limit (resets when the instance is recycled) ----
const HITS = new Map();
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 15;
function rateLimited(ip) {
  const now = Date.now();
  const list = (HITS.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  list.push(now);
  HITS.set(ip, list);
  if (HITS.size > 5000) HITS.clear(); // keep memory bounded
  return list.length > MAX_PER_WINDOW;
}

// ---- Static business knowledge (slow-changing) ----
const COURSES = [
  ['artificial-intelligence', 'Artificial Intelligence (AI at Work)', 'available', 'Beginner', '8 weeks', 'Use AI tools confidently and responsibly to write, research, create and build simple AI-assisted workflows, with facts always checked.'],
  ['automation', 'Automation (Less Work, More Done)', 'available', 'Beginner', '8 weeks', 'Automate repetitive work with free no-code tools: spot what to automate, build simple and multi-step workflows, keep them safe.'],
  ['cybersecurity', 'Cybersecurity (Stay Safe Online)', 'available', 'Beginner', '8 weeks', 'Protect yourself, your data and a small organisation online: strong accounts, spotting scams, safe devices, backups, recovery.'],
  ['data-analysis', 'Data Analysis Career Launch', 'available', 'Beginner', '12 weeks', 'Go from zero to job-ready data analyst using Excel, SQL, Python and Power BI.'],
  ['google-workspace', 'Google Workspace Skills', 'available', 'Beginner', '5 weeks', 'Use Gmail, Drive, Docs, Sheets, Slides, Forms and Meet to work and collaborate professionally.'],
  ['microsoft-office', 'Microsoft Office Skills', 'available', 'Beginner', '6 weeks', 'Master Word, Excel, PowerPoint, Outlook and Teams for professional office and remote work.'],
  ['remote-ready', 'Remote Ready', 'available', 'Beginner', '6 weeks', 'Get ready for global remote and freelance work: a strong profile, a portfolio, smart applications, interview confidence.'],
  ['typing-skills', 'Typing Skills', 'available', 'Beginner', '4 weeks', 'Learn touch typing and keyboard shortcuts to work faster and more accurately. Includes a free practice tool at /tools/typing-practice/.'],
  ['video-editing', 'Video Editing', 'available', 'Beginner', '8 weeks', 'Shoot, edit and deliver professional videos for social media, events and businesses.'],
  ['virtual-assistant', 'Virtual Assistant (VA Launch)', 'available', 'Beginner', '7 weeks', 'Land and deliver remote VA work: tools, workflows and client communication, with 1:1 live mentorship.'],
  ['web-development', 'Web Development Career Launch', 'available', 'Beginner', '12 weeks', 'Go from zero to building and deploying real websites and web apps with HTML, CSS, JavaScript, React and Supabase.'],
  ['digital-marketing', 'Digital Marketing', 'coming-soon', '', '', 'Reach customers online across search, social, email and ads.'],
  ['graphic-design', 'Graphic Design', 'coming-soon', '', '', 'Design clean, professional graphics for brands and social media.'],
  ['social-media-marketing', 'Social Media Marketing', 'coming-soon', '', '', 'Plan content, grow an audience and run campaigns that reach the right people.'],
];

const BASE_KNOWLEDGE = `You are Lulu, the friendly assistant for the InnovaTech World Knowledge Hub website.

ABOUT INNOVATECH WORLD
- InnovaTech World is a digital-skills training provider based in Yenagoa, Bayelsa State, Nigeria. Founder and Lead Facilitator: David C. Igberi.
- The Knowledge Hub offers practical, beginner-friendly courses with weekly lessons, downloadable datasets/templates, in-person or live mentoring, a portfolio focus, and a verifiable certificate on completion.
- InnovaTech World also offers done-for-you services (an agency side): Full Stack Web Development, Data Analysis, Automation, Graphics Design, WordPress Web Development, SEO/AEO/GEO, and Virtual Assistance. See /services/.

CONTACT
- WhatsApp: https://wa.me/2349121681159  (best for a quick human reply)
- Email: info.innovatech.expertise@gmail.com
- Phone: +234 912 168 1159
- Contact page: /contact/

HOW THE SITE WORKS
- Browse all courses at /courses/. Each course has its own page with lessons, outcomes, downloads and a "Plans & pricing" section.
- To take a paid course a learner creates a free account at /login/, then unlocks the course by choosing a plan and paying online. Lesson progress is saved to their account; see /account/.
- Payments are handled securely by Paystack (card, bank or transfer). InnovaTech never sees or stores card details. A discount or access code can be entered at checkout.
- Certificates are issued on completion and can be checked at /verify/. Other pages: Resources /resources/, Insights (blog) /insights/, About /about/.
- Free typing practice tool (no account needed): /tools/typing-practice/.

PLANS
- Most courses offer three tiers: Basic, Advanced and Premium. Higher tiers add perks such as live mentoring, assignment feedback and 1:1/career support. Exact perks and prices are on each course page.
- A plan is personal to one learner and must not be shared or resold.
- Because course materials open immediately on payment, fees are generally non-refundable; if someone was charged in error or cannot access a course they paid for, they should contact InnovaTech within 7 days.

COURSES (status, level, duration, summary):
${COURSES.map(([slug, title, status, level, dur, sum]) =>
  `- ${title} [/courses/${slug}/] — ${status}${level ? `, ${level}` : ''}${dur ? `, ${dur}` : ''}. ${sum}`,
).join('\n')}

HOW TO ANSWER
- Be warm, clear and concise (usually 2-5 sentences). Plain text only. No emoji.
- Use only the information in this prompt and the live pricing provided. If you are unsure or it is not covered, say so briefly and point the person to /contact/ or WhatsApp — do NOT invent prices, dates, URLs, phone numbers, policies or course details.
- When useful, include a site link as a plain relative path, e.g. /courses/data-analysis/ or /contact/.
- Prices are in Nigerian Naira (write them like ₦30,000). Only quote prices from the LIVE PRICING section; if a course is not listed there, say pricing is on the course page.
- Never promise or guarantee a job, income or specific results. Say the courses build "job-ready skills", not guaranteed outcomes.
- Never ask for, and never accept, passwords, one-time codes, full card numbers or student records. If a user shares something sensitive, gently tell them not to and continue safely.
- For account access, payment problems, refunds, enrolment decisions, or anything needing a person, direct them to /contact/ or WhatsApp (https://wa.me/2349121681159).
- Stay on InnovaTech topics. If asked something unrelated, briefly steer back to how you can help with InnovaTech courses and services.
- You may reply in the language the user writes in; default to clear English.`;

// ---- Live pricing from Supabase (cached per warm instance) ----
let pricingCache = { text: '', at: 0 };
const PRICING_TTL_MS = 5 * 60_000;

async function livePricing() {
  const now = Date.now();
  if (pricingCache.text && now - pricingCache.at < PRICING_TTL_MS) return pricingCache.text;
  const url = process.env.PUBLIC_SUPABASE_URL;
  const key = process.env.PUBLIC_SUPABASE_ANON_KEY;
  let text = 'LIVE PRICING: unavailable right now — tell the user prices are shown on each course page.';
  if (url && key && !/PASTE_/i.test(key)) {
    try {
      const r = await fetch(
        `${url}/rest/v1/course_plans?select=course_slug,plan,price_kobo,active&active=eq.true&order=course_slug,price_kobo`,
        { headers: { apikey: key, Authorization: `Bearer ${key}` } },
      );
      if (r.ok) {
        const rows = await r.json();
        const title = Object.fromEntries(COURSES.map(([s, t]) => [s, t]));
        const byCourse = {};
        for (const row of rows) (byCourse[row.course_slug] ||= []).push(row);
        const order = { basic: 1, advanced: 2, premium: 3 };
        const lines = Object.keys(byCourse).sort().map((slug) => {
          const plans = byCourse[slug]
            .sort((a, b) => (order[a.plan] || 9) - (order[b.plan] || 9))
            .map((p) => `${p.plan} ₦${Math.round(p.price_kobo / 100).toLocaleString('en-NG')}`)
            .join(', ');
          return `- ${title[slug] || slug}: ${plans}`;
        });
        if (lines.length) text = `LIVE PRICING (Nigerian Naira):\n${lines.join('\n')}`;
      }
    } catch {
      /* keep the fallback text */
    }
  }
  pricingCache = { text, at: now };
  return text;
}

// ---- Validate and normalise the conversation from the browser ----
function cleanMessages(raw) {
  if (!Array.isArray(raw)) return null;
  const out = [];
  for (const m of raw.slice(-12)) {
    if (!m || (m.role !== 'user' && m.role !== 'assistant')) continue;
    const content = typeof m.content === 'string' ? m.content.trim().slice(0, 1500) : '';
    if (!content) continue;
    out.push({ role: m.role, content });
  }
  // Must start with a user turn and end with a user turn.
  while (out.length && out[0].role !== 'user') out.shift();
  if (!out.length || out[out.length - 1].role !== 'user') return null;
  return out;
}

async function readBody(req) {
  if (req.body && typeof req.body === 'object') return req.body;
  const chunks = [];
  for await (const c of req) chunks.push(c);
  if (!chunks.length) return {};
  try {
    return JSON.parse(Buffer.concat(chunks).toString('utf8'));
  } catch {
    return {};
  }
}

const REDIRECT = 'https://wa.me/2349121681159';

export default async function handler(req, res) {
  if (req.method !== 'POST') return send(res, 405, { error: 'Method not allowed.' });
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return send(res, 503, { error: 'Lulu is not configured yet. Please contact InnovaTech: /contact/' });
  }

  const ip =
    (req.headers['x-forwarded-for'] || '').split(',')[0].trim() ||
    req.socket?.remoteAddress ||
    'unknown';
  if (rateLimited(ip)) {
    return send(res, 429, { error: 'You are sending messages a bit fast. Please wait a moment and try again.' });
  }

  const body = await readBody(req);
  const messages = cleanMessages(body.messages);
  if (!messages) return send(res, 400, { error: 'No valid message to answer.' });

  try {
    const pricing = await livePricing();
    // Gemini uses roles "user" and "model" (not "assistant").
    const contents = messages.map((m) => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }],
    }));

    const r = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(GEMINI_MODEL)}:generateContent`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-goog-api-key': apiKey },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: `${BASE_KNOWLEDGE}\n\n${pricing}` }] },
          contents,
          generationConfig: { maxOutputTokens: 800, temperature: 0.4 },
        }),
      },
    );

    if (!r.ok) {
      const status = r.status === 429 ? 429 : 502;
      return send(res, status, {
        error:
          status === 429
            ? 'Lulu is busy right now. Please try again shortly.'
            : `Lulu could not reply right now. Please contact InnovaTech: ${REDIRECT}`,
      });
    }

    const data = await r.json();

    // Blocked prompt or safety stop -> polite redirect.
    const finish = data.candidates?.[0]?.finishReason;
    if (data.promptFeedback?.blockReason || finish === 'SAFETY' || finish === 'BLOCKLIST' || finish === 'PROHIBITED_CONTENT') {
      return send(res, 200, {
        reply: `Sorry, I can't help with that. If it's about InnovaTech courses or your account, please contact InnovaTech: ${REDIRECT}`,
      });
    }

    const reply = (data.candidates?.[0]?.content?.parts || [])
      .map((p) => p.text || '')
      .join('')
      .trim();

    return send(res, 200, {
      reply: reply || `Sorry, I could not find an answer. Please contact InnovaTech: ${REDIRECT}`,
    });
  } catch {
    return send(res, 502, {
      error: `Lulu could not reply right now. Please contact InnovaTech: ${REDIRECT}`,
    });
  }
}
