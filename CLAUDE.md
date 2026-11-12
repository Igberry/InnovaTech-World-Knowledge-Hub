# CLAUDE.md — InnovaTech World Knowledge Hub

Conventions for future Claude Code sessions. Read `WEBSITE-BUILD-PROMPT.md` for the full brief
and `STUDENT-PORTAL-SPEC.md` before any Phase 4 work.

## Stack
Astro + Content Collections · Tailwind CSS v4 · TypeScript (strict) · Poppins (self-hosted) ·
Lucide icons (`astro-icon`) · Vercel SSR for Insights and static prerendering for other pages. Node 20.3+.

## Folder map
- `src/config/site.ts` — ALL editable settings (contacts, nav, social, analytics). `hidden-sections.mjs` — facilitator headings.
- `src/content/courses/<slug>/` — `_course.md` + lesson `.md`. `src/content/insights/` — blog posts. Schemas in `src/content/config.ts`.
- `src/pages/` — home, courses, course, lesson, insights, about, contact, resources, search, showcase, verify, privacy, login, account, admin, 404, rss.xml.
- `src/components/`, `src/layouts/` — UI. `src/plugins/` — remark/rehype. `src/scripts/progress.ts` — localStorage.
- `src/data/` — resources, testimonials, showcase, certificates (testimonials/showcase/certificates are EMPTY until the owner adds permitted entries).
- `src/lib/` — Phase 4 portal: `portal-config.ts` (tiny on/off flag), `supabase.ts`, `auth.ts`, `portal.ts` (student data), `admin.ts`, `lesson-progress.ts`, and `insights.ts`. Public Insights routes use Vercel SSR.
- `supabase/` — `schema.sql`, `migrations/`, `make-admin.sql`, `tests/rls.test.mjs`. Never run against Supabase from here; the owner runs SQL manually. `docs/SUPABASE-SETUP.md` has the steps, including migration 0006 for the Insights CMS.
- `_import/` — course SOURCE (git-ignored, has facilitator notes). `scripts/` — import, assets, checks.

## Commands
`npm run dev` · `npm run build` · `npm run verify` (build + links + facilitator test) ·
`npm run check:links` · `npm run test:facilitator` · `npm run generate:assets` ·
`npm run import:data-analysis -- --force`.

## Content model
Course folder name == `slug`. Lesson URL == filename. `order` unique per course (build fails otherwise).
Available courses need `level`, `duration`, `format`, `outcomes`. First-touch frontmatter is authored, not derived.

## Brand rules (do not change)
Deep navy matched to the logo (`--blue-600 #0b3b66`, dark sections `--blue-900 #04172b`) + white,
with classic burgundy (`#800020`) for primary action buttons and selected accents. Primary button text must be white.
**Poppins** only. **No gold, no second web font, no emoji, NO gradients** (owner's call — use solid brand colours).
Never promise jobs or income ("get job-ready", not "guaranteed job"). Tokens live in `src/styles/global.css`.
(The original brief named royal blue `#2457D6`; the owner changed it to the logo navy — keep the navy.)

Current navigation: Home · Academy · Services · About (dropdown: About, Resources, Insights) · Contact.
Social profile URLs are editable in `src/config/site.ts`; do not invent URLs.

## Accessibility & performance
Semantic HTML, skip link, visible focus, `aria-current`, keyboard-operable menus/drawers, alt text,
`prefers-reduced-motion`. WCAG AA contrast. Minimal JS, self-hosted fonts, no third-party scripts in Phase 1.
Lighthouse mobile targets: Perf ≥ 90, A11y ≥ 95, Best Practices ≥ 95, SEO ≥ 95.

## Guardrails
- **Supabase:** never point `PUBLIC_SUPABASE_URL` anywhere but `rrjyfrqidwndgfgdncnp`; never add a `service_role` key.
  Do not run SQL automatically. The owner must manually apply migration 0006 before enabling the Insights CMS. (See `WEBSITE-BUILD-PROMPT.md` §0A.)
- **Facilitator content** must never reach published HTML; keep the import strip + build plugin + test intact.
- **Never commit** secrets, `.env`, agreements, pricing, or student data.
- Do not overwrite lesson Markdown except via the one-time import script; don't reword lessons unless asked.
- **Ask before deciding** anything in `WEBSITE-BUILD-PROMPT.md` §13 (Open Decisions).
