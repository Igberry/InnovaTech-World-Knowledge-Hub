# Lulu site guide and capacity

Lulu is a keyless, keyword-based site search assistant. It searches published public content and returns up to three matching excerpts with source links. It does not generate or interpret answers, and it does not call OpenAI or another AI provider. No API key, model setting, or provider billing account is needed.

The chat widget is enabled by default. To hide it for a deployment, set the build-time variable `PUBLIC_LULU_ENABLED=false` and rebuild. To disable API responses without a rebuild, set the server-side variable `LULU_ENABLED=false`; it is enabled when this variable is unset.

The endpoint is a Vercel server route, not a static file. In Vercel project settings, keep the Astro framework preset and leave any custom Output Directory override blank so the Vercel adapter's `.vercel/output` (including its server function) is deployed. GitHub Pages and static-only deployments cannot run the endpoint. After deployment, a `POST` to `/api/lulu/` with JSON `{"message":"What courses are available?"}` should return JSON. A Vercel `NOT_FOUND` response means the deployed project is missing the server function; confirm the correct Vercel project/deployment and build settings, then redeploy.

## What it searches

Lulu searches public business information, services, resources, available courses and lessons, and published non-draft Insights. Coming-soon courses, draft lessons and Insights, admin/student data, database content, facilitator notes, and unpublished working-tree changes are excluded. Course and Insights content is loaded from the current deployment. Public content changes take effect after redeploying.

Results are based on keyword overlap, not semantic or conversational understanding. Lulu cannot combine facts or reliably answer questions that use terms different from the published wording. If it finds no matching passage, it says so and points to the Contact page. For important or account-specific information, confirm directly with InnovaTech.

## Abuse limits

- The endpoint accepts questions up to 1,500 characters and returns at most three excerpts within a 3,000-character budget.
- A secondary in-memory limiter allows 6 requests per 10-minute window and 30 per day per network address **per serverless instance**. It is not a global limit and may reset when instances restart or distribute requests differently.
- For a reliable shared limit, configure Vercel Firewall rules on `POST /api/lulu/` for 6 requests per 10 minutes and 30 per 24 hours per source IP, if supported by the selected Vercel plan. Test the deployed rules. People sharing a school, office, carrier, or household network may also share an IP and its limit.
- Lulu does not require `OPENAI_API_KEY`, `OPENAI_MODEL`, a billing-cap flag, or a rate-limit secret. The app creates an ephemeral per-instance HMAC salt unless `LULU_RATE_LIMIT_SECRET` is optionally supplied.

## Capacity and privacy

Ordinary site pages remain static/prerendered where configured. Only a chat search invokes the Vercel endpoint; that request does not call an external AI service, so there is no per-question model charge or AI-provider rate limit. Vercel still processes the request and network information to run the endpoint, subject to its plan and current terms.

The site does not store transcripts or use browser local storage for chat history. Each question is handled independently; the endpoint receives only that question. Messages remain in the current page while it is open and clear when the page is reloaded or left. Do not enter passwords, payment details, student records, or other sensitive information.

The in-memory limiter is not a global monthly request quota. A target of 10,000 visitors per month does not establish support for 10,000 simultaneous chat searches. Capacity depends on the Vercel plan, function concurrency, request distribution, deployment region, and traffic pattern. Before making a capacity promise, run a controlled load test on the deployed version using synthetic queries, and monitor function latency, errors, concurrency, and Firewall behavior. Do not test with real student or customer data.
