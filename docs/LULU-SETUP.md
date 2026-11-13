# Lulu site guide

Lulu is a keyless, keyword-based site search guide. The build creates `/lulu-index.json` from public site content; the browser downloads it when a visitor asks a searchable question and performs the search locally. Lulu returns up to three matching excerpts with source links. It does not generate or interpret answers, and it does not call an AI provider or send questions to a server.

The widget is shown by default. To hide it, set the build-time variable `PUBLIC_LULU_ENABLED=false` and redeploy. Remove the old `LULU_ENABLED` variable if it was added; the static guide no longer reads it. No API key, server function, model, or rate-limit secret is required for Lulu.

## Public content

The index contains business contact details, services, resources, available courses and lessons, and published non-draft Insights. Coming-soon courses, draft lessons and Insights, admin/student data, database content, facilitator notes, and unpublished working-tree changes are excluded. The index is public, like the pages it summarizes, and is refreshed by each site build.

Greetings receive a short welcome. Questions about price or payment methods are directed to InnovaTech because the published site does not confirm those details. Other questions use keyword matching; results may be incomplete or unrelated if the wording does not match the published content. Confirm important or account-specific information with InnovaTech.

## Privacy and performance

The browser fetches the public index once per page and keeps it in memory while the page is open. Search queries remain in browser memory and are not sent to Vercel, OpenAI, or another AI service. Lulu does not save transcripts or use local storage for conversation history. The search index is static and can be served by the site CDN; chat messages do not invoke a serverless function.

This removes per-message AI charges and the Vercel API-route dependency. It does not create a global query quota or guarantee a particular concurrency level. Capacity depends on the hosting plan and static asset delivery. Before making a 10,000-concurrent-user promise, run a controlled load test against the deployed site and monitor asset delivery and errors.

## Verify after deploying

Open `/lulu-index.json` on the deployed site. It should return JSON containing public knowledge documents. Then ask Lulu “Hi Lulu” (a greeting) and “How do I pay for the courses?” (a contact fallback); neither requires an API route. A `404` for `/api/lulu/` is expected because Lulu no longer calls that endpoint.
