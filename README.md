# InnovaTech World Knowledge Hub

A fast, mobile-first learning website that hosts InnovaTech World's training courses
as readable, weekly Markdown lessons. Built with [Astro](https://astro.build), styled
in logo navy and white with classic burgundy accents, and deployed on Vercel.

- **Owner:** David C. Igberi — InnovaTech World, Yenagoa, Bayelsa State, Nigeria
- **Current content:** *Data Analysis Career Launch* (12 weeks), plus "coming soon" courses
- **Tagline:** *Learn digital skills. Build a global career.*

---

## Tech stack

| Concern | Choice |
|---|---|
| Framework | Astro + Content Collections |
| Styling | Tailwind CSS v4 + design tokens in `src/styles/global.css` |
| Content | Markdown with GFM tables, Shiki highlighting, heading anchors |
| Search | Pagefind — built into Vercel's static output (works in production, not `dev`) |
| Language | TypeScript (strict) |
| Fonts | Poppins, self-hosted via `@fontsource/poppins` |
| Hosting | Vercel with Astro SSR for Insights and static prerendering for other pages |
| Icons | Lucide via `astro-icon` |

---

## Run it locally

You need [Node.js](https://nodejs.org) 20.3+.

```powershell
npm install        # install dependencies (first time only)
npm run dev        # start the dev server (URL includes the local base path)
npm run build      # build static pages and Vercel server output
npm run preview    # preview the built site locally
```

Other useful commands:

```powershell
npm run verify             # build + check links + facilitator-content test
npm run check:links        # fail if any internal link is broken (needs a build first)
npm run test:facilitator   # prove no facilitator-only content is published
npm run generate:assets    # regenerate favicons + social image from the logo
npm run import:data-analysis -- --force   # re-import the course (overwrites generated files)
```

---

## Folder structure

```
src/
  config/        site.ts (all editable settings), hidden-sections.mjs
  content/       courses/<slug>/_course.md + lesson .md files; config.ts (schemas)
  components/    Header, Footer, CourseCard, CourseSidebar, Toc, LessonNav, …
  layouts/       BaseLayout, LessonLayout
  pages/         home, Academy, Services, About, Insights, auth/account/admin, RSS, robots, sitemap, 404
  plugins/       remark/rehype plugins (facilitator strip, callouts, self-check, tables, base links)
  scripts/       progress + idle-timeout + admin blog behavior
  styles/        global.css (design tokens + prose/callout styles)
  data/          resources.ts
  lib/           portal, Supabase, admin, and Insights CMS helpers
public/          logo, favicons, social image, downloads/
supabase/        schema, owner-run migrations, and RLS tests
scripts/         import + asset generation + safety/validation scripts
_import/         course SOURCE files (git-ignored — see warning below)
```

The **course folder name is the URL slug**:
`src/content/courses/data-analysis/week-05-sql-querying.md` → `/courses/data-analysis/week-05-sql-querying/`.

See [CONTRIBUTING.md](CONTRIBUTING.md) for how to add courses and lessons (written for non-developers).

---

## Deployment (Vercel — recommended, free)

The site uses Vercel because Insights pages, RSS, robots, and the Insights sitemap are
server-rendered. Other pages are statically prerendered. The Vercel adapter creates the
deployment output; do not set a custom output directory.

1. Push this repo to GitHub (see the git note below).
2. Go to <https://vercel.com>, sign in with GitHub, **Add New → Project**, and import this repo.
3. Vercel auto-detects Astro and runs `npm run build`. Keep the framework's default build
   output settings so the adapter's server and static output are deployed together.
   Click **Deploy**. You get a free `*.vercel.app` URL.
4. **Environment variables** (Project → Settings → Environment Variables), all optional:
   - For the student portal and Supabase-backed Insights CMS:
     `PUBLIC_SUPABASE_URL` and `PUBLIC_SUPABASE_ANON_KEY`. The owner must first apply the
     SQL migrations manually; see `docs/SUPABASE-SETUP.md`.
   - You normally don't need `SITE_URL`/`BASE_PATH` — on Vercel the base is `/` and the site URL is detected automatically. Set `SITE_URL` only to pin a custom domain's canonical URL.
5. **Custom domain:** Project → Settings → Domains → add your domain and follow the DNS steps.
6. After it's live, update your Supabase **Site URL / Redirect URLs** to the Vercel domain
   (`https://<project>.vercel.app/auth/callback/` and `/account/reset-password/`). See `docs/SUPABASE-SETUP.md`.

Every push to `main` triggers a new Vercel deployment automatically. Preview deployments are
created for pull requests. GitHub Actions runs checks for pull requests; GitHub Pages deployment
is not supported because it cannot serve the Insights SSR routes.

---

## ⚠️ Important: facilitator content and repository privacy

The original course files contain **Facilitator Notes / Facilitator Tips** meant for the
teacher, not students. This project uses **Option A**:

- Facilitator content is **removed at import time** from the files in `src/content/`, and
  a build-time plugin strips it again as a backstop. A test (`npm run test:facilitator`)
  proves it never reaches the published HTML.
- The **source** files (with facilitator notes) live in `_import/`, which is **git-ignored**
  and must **never** be committed.

Even so, **hiding content on the website does not hide it in a public repo** — anyone can read
raw Markdown on GitHub. Only commit student-facing content here. Keep facilitator-only
material in `_import/` (or a separate private repo).

**Never commit:** signed agreements, student names or contact details, commitment-fee or
pricing documents, `.env` files, or any secrets. These patterns are in `.gitignore`.

### Supabase safety

This repo is wired to **one** Supabase project (`rrjyfrqidwndgfgdncnp`, Phase 4 only).
`scripts/check-supabase-target.mjs` runs before `dev`/`build` and fails if `PUBLIC_SUPABASE_URL`
is ever pointed elsewhere. Phases 1–3 use no Supabase at all. Never put a `service_role` key or
database password anywhere in this repo.

### Lesson access

Lessons are **public** by design (good for SEO and prospective students). The student portal
protects the **student data** (progress, submissions, feedback, attendance), not the lesson pages.
A plain static site can't password-protect lesson pages; if you ever need that, use Cloudflare
Access or store premium lessons privately (see `STUDENT-PORTAL-SPEC.md` §3).

## Student portal (Phase 4)

Login + progress sync + a facilitator dashboard, powered by **Supabase** (Auth + Postgres + RLS).
It is **off by default** — the site builds and works as a public site until you add the two public
Supabase values. Nothing runs against Supabase automatically; you run the SQL yourself.

- SQL + tests: [`supabase/`](supabase/) (`schema.sql`, `migrations/`, `make-admin.sql`, `tests/rls.test.mjs`).
- Setup steps: [`docs/SUPABASE-SETUP.md`](docs/SUPABASE-SETUP.md).
- Turn it on: set repo variables `PUBLIC_SUPABASE_URL` and `PUBLIC_SUPABASE_ANON_KEY`.
- Security: RLS on every table; only the **anon** key ships; a build check (`npm run check:secrets`)
  fails if a `service_role` key ever reaches `dist/`. Run `npm run test:rls` (with test users you
  create) before launch — every check must PASS.

The portal pages are `/login`, `/account`, `/admin`, `/privacy` (plus auth callback + reset).
Signed-in users are signed out after 30 minutes without browser activity. This is a client-side
idle timeout; Supabase Auth and RLS remain the authorization boundary.
