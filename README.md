# InnovaTech World Knowledge Hub

A fast, mobile-first learning website that hosts InnovaTech World's training courses
as readable, weekly Markdown lessons. Built with [Astro](https://astro.build), styled
in royal blue and white, and deployed free on GitHub Pages.

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
| Search | Pagefind — static index built after the Astro build (works in `preview`/production, not `dev`) |
| Language | TypeScript (strict) |
| Fonts | Poppins, self-hosted via `@fontsource/poppins` |
| Hosting | GitHub Pages via GitHub Actions |
| Icons | Lucide via `astro-icon` |

---

## Run it locally

You need [Node.js](https://nodejs.org) 20.3+.

```powershell
npm install        # install dependencies (first time only)
npm run dev        # start the dev server at http://localhost:4321
npm run build      # build the production site into dist/
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
  pages/         index, courses/, courses/[course]/, courses/[course]/[lesson], about, contact, resources, 404
  plugins/       remark/rehype plugins (facilitator strip, callouts, self-check, tables, base links)
  scripts/       progress.ts (localStorage progress)
  styles/        global.css (design tokens + prose/callout styles)
  data/          resources.ts
public/          logo, favicons, og image, robots.txt, downloads/
scripts/         import + asset generation + safety/validation scripts
_import/         course SOURCE files (git-ignored — see warning below)
```

The **course folder name is the URL slug**:
`src/content/courses/data-analysis/week-05-sql-querying.md` → `/courses/data-analysis/week-05-sql-querying/`.

See [CONTRIBUTING.md](CONTRIBUTING.md) for how to add courses and lessons (written for non-developers).

---

## Deployment (GitHub Pages)

1. Push to the `main` branch. The workflow in `.github/workflows/deploy.yml` builds and deploys automatically.
2. In the repo: **Settings → Pages → Source: GitHub Actions**.
3. The site URL and base path are detected automatically for a project site
   (`https://<username>.github.io/<repo>/`). To override (for example a **custom domain**),
   set repository **Variables** `SITE_URL` and `BASE_PATH`:
   - Custom domain served at the root: `SITE_URL=https://hub.example.com`, `BASE_PATH=/`
   - Add a `public/CNAME` file containing the domain, and point your DNS at GitHub Pages.
4. Pull requests run `.github/workflows/pr-check.yml` (build + link check + facilitator test).

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

### Lesson access (open decision)

Lessons are currently built as a **static, public** site. True "students-only" access is not
possible on a plain static site — it needs either **Cloudflare Access** (free, works now) or the
**Phase 4 Supabase portal**. See the handoff notes / `STUDENT-PORTAL-SPEC.md`.
