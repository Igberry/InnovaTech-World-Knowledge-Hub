# Lulu chatbot deployment and capacity

Lulu is an opt-in AI assistant grounded in the currently published site. It uses an Astro server endpoint on Vercel and the OpenAI Responses API. Course, lesson, resource, and published Insights content are re-read by each newly started function instance, so deployments refresh its public knowledge. Facilitator-only headings and facilitator-labelled blockquotes are stripped again before retrieval. Admin, student, draft, and database content is not included.

The site does not store transcripts. A short conversation history lives in browser memory while the chat is open and is sent with the next message. The API sends only the current relevant public excerpts and recent chat turns to OpenAI, with response storage disabled in the request. Provider operational retention is governed by OpenAI's current terms and account settings; do not promise zero provider retention. Lulu must identify itself as AI and must not impersonate a person or live agent.

## Required owner setup before enabling

Do not set the enable flags until all safeguards below are configured and tested.

1. **OpenAI project and key:** create a dedicated API project/key for the site. Select a currently supported, low-cost model in the OpenAI account and set its exact model ID in `OPENAI_MODEL`. Store `OPENAI_API_KEY` only as a Vercel server-side environment variable. Never use a `PUBLIC_` prefix, browser code, Git, or a committed `.env` file for the key.
2. **Provider spend stop:** configure the strictest available project/account spend limit and alerts. Confirm in the current OpenAI dashboard and documentation whether the limit actually stops API requests or only sends alerts. The application cannot enforce a global monthly spend or request quota without shared storage. If there is no hard stop appropriate to the business's risk, do not enable Lulu; reconsider a shared quota store before launch.
3. **Vercel Firewall:** create rate-limit rules for the `POST /api/lulu/` route, per source IP:
   - maximum **6 requests in 10 minutes**;
   - maximum **30 requests in 24 hours**.

   Confirm that the selected Vercel plan supports both rules, that the rules apply to the production deployment and preview environments as intended, and that rejected requests receive a rate-limit response. Shared school, office, mobile-carrier or household networks can share one public IP; monitor false positives and adjust cautiously. Do not mark the firewall configured until you have tested the deployed rule.
4. **Create a server-only HMAC salt:** generate a random value locally, for example:

   ```powershell
   node -e "console.log(require('node:crypto').randomBytes(32).toString('hex'))"
   ```

   Add it as `LULU_RATE_LIMIT_SECRET` in Vercel. Do not paste it into chat or commit it. The application uses it to hash the request address before its best-effort, per-function-instance secondary limiter.
5. Add these server-side Vercel environment variables only after the safeguards are ready:

   - `OPENAI_API_KEY`
   - `OPENAI_MODEL`
   - `LULU_RATE_LIMIT_SECRET`
   - `LULU_ENABLED=true`
   - `LULU_FIREWALL_CONFIGURED=true`
   - `LULU_BILLING_CAP_CONFIRMED=true`

6. Add `PUBLIC_LULU_ENABLED=true` as a build-time setting and redeploy to show the widget. This value is not secret. The API stays unavailable unless all server-side readiness flags, model, key, and salt are present. Do not set the firewall or billing confirmation flags merely to bypass this gate.
7. Review the privacy policy, OpenAI data controls, Vercel Firewall logging and retention, and the business's legal obligations before launch. The chat UI warns users not to submit sensitive information. Do not send student or admin records to the model.

## Limits and capacity

- The selected initial per-IP limits are 6 messages per 10 minutes and 30 per day. Vercel Firewall is the shared control; the in-process limiter is only defense in depth and resets when a serverless instance is replaced. It is not a global quota.
- The site pages remain static/prerendered where configured; only a user who sends a chat message invokes a serverless function and an OpenAI request. Lulu caps each message at 1,500 characters, retrieved context at 9,000 characters, output at 500 tokens, and waits no longer than 25 seconds for OpenAI.
- A monthly total of 10,000 visitors is not the same as 10,000 concurrent chat users. This implementation does not guarantee 10,000 simultaneous chats. Capacity depends on the Vercel plan, function concurrency and duration, OpenAI project rate limits, model availability, per-IP distribution, and response latency.
- No shared monthly application request quota is implemented because Redis was declined. Enforce a provider-side hard spend stop and use Vercel Firewall before enabling. If those controls cannot meet the desired cap, use a shared quota/rate-limit service before launch.
- Before advertising capacity, run a controlled load test against a protected deployment using synthetic prompts. Test expected peak concurrency plus an agreed safety margin; observe API errors, response latency, Vercel function concurrency/duration, OpenAI rate limits and provider spend. Do not use real student or customer data. Repeat after model, hosting, quota, or prompt changes.
- Keep Lulu disabled if there is no verified hard spending control, the firewall rules are unavailable, or the deployed route has not been tested.

## Knowledge updates and accuracy

Published course, lesson, resource and non-draft Insights content refreshes when the site is deployed. Business facts from `src/config/site.ts` are also included. The assistant does not read the admin portal, Supabase, facilitator notes, private documents, draft Insights, or unpublished working-tree changes. If a business fact is not on the public site, publish it through the approved site content/configuration and redeploy before expecting Lulu to answer it. Do not put secret keys, private student data, prices or confidential agreements in public course content.

Lulu uses keyword-based excerpt retrieval, not a human support agent or a guarantee of complete factual coverage. It is instructed to say when public evidence is missing and to offer the configured WhatsApp Contact route. Confirm important or account-specific information with InnovaTech.
