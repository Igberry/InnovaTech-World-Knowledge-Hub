# InnovaTech World Knowledge Hub — Website Build Prompt

> **Purpose of this file:** This is the master brief for Claude Code. Put it in the root of the GitHub repository and tell Claude Code to read it and build the site.
> **Owner:** David C. Igberi, InnovaTech World, Yenagoa, Bayelsa State, Nigeria.

---

## 0. How to Use This File (for the Owner)

1. Create a GitHub repository, e.g. `innovatech-knowledge-hub`.
2. Add this file as `WEBSITE-BUILD-PROMPT.md` in the repo root.
3. Keep `STUDENT-PORTAL-SPEC.md` in the repo root too (Claude Code needs it for Phase 4). Unzip `data-analysis-course.zip` into `_import/data-analysis-course/` (Claude Code will git-ignore `_import/` and import from it in Phase 1 — see section 6). Do not leave course source files loose at the repo root.
4. Put the logo at `public/images/logo.png` (the file `innovatech-logo.png` provided alongside this brief).
5. Open the repo in your terminal, start Claude Code, and paste this as your first message:

```
Read WEBSITE-BUILD-PROMPT.md fully before doing anything. Then build Phase 1 exactly as
specified. Work step by step, run the build after each major step, commit often with clear
messages, and ask me before making any decision listed under "Open Decisions".
When Phase 1 is finished, give me a checklist of what to test and what you need from me.
```

6. After each phase, review the live preview, then tell Claude Code: *"Proceed to Phase 2."*

---

## 0A. CRITICAL: Supabase Account Safety (Read Before Touching Anything)

**The only Supabase project for this website is:**

| Item | Value |
|---|---|
| Project URL | `https://rrjyfrqidwndgfgdncnp.supabase.co` |
| Project ref | `rrjyfrqidwndgfgdncnp` |
| Owner | David C. Igberi (the owner's **own** Supabase account) |

**Your Claude Code environment may be connected, through an MCP server, to a DIFFERENT Supabase account that does NOT belong to this project's owner.** Nothing in that account is part of this work. Therefore:

1. **Do NOT use any Supabase MCP tool** in this repository for any reason: no `create_project`, `list_projects`-then-act, `execute_sql`, `apply_migration`, `create_branch`, `deploy_edge_function`, `pause_project`, `restore_project`, `delete_*`, or similar. This applies to **all phases**. Phases 1 to 3 need no Supabase access at all.
2. **Never create a Supabase project, branch, organisation or database** under any circumstances, even if a tool offers to, even if no matching project is found, and even if it seems "helpful". If you think a project is missing, **stop and ask the owner**.
3. **Never run SQL against any project automatically.** The owner will run SQL manually in the SQL Editor of **their own** project (`rrjyfrqidwndgfgdncnp`). Your job is to **write** the SQL files (`supabase/schema.sql`, migrations) and clear instructions, not to execute them.
4. **Do not ask for, store, or use** the `service_role` key, the database password, or an access token. The only credentials this website ever needs are the **Project URL** (above) and the **anon public key**, which the owner will paste into GitHub Actions variables or a local `.env` file themselves.
5. **Add a safety guard in the code:** create `scripts/check-supabase-target.mjs`, which runs before `dev` and `build` and **fails** if `PUBLIC_SUPABASE_URL` is set to anything other than `https://rrjyfrqidwndgfgdncnp.supabase.co`. This stops the site from ever being pointed at another project by accident.
6. If any tool, script or error message mentions a project ref **other than `rrjyfrqidwndgfgdncnp`**, stop immediately, do nothing further with it, and tell the owner.
7. If you are unsure whether an action touches Supabase, **assume it does and ask first.**

> **Note to the owner:** before starting Claude Code in this repo, disable or remove the Supabase MCP server for this session so it cannot be used by mistake (for example through the `/mcp` menu inside Claude Code, or `claude mcp list` followed by `claude mcp remove <name>` for that server; re-add it afterwards if you need it for your other work). The rules above are a second layer of protection, not a substitute.

---

## 1. Project Summary

**Name:** InnovaTech World Knowledge Hub
**Tagline options (use the first unless the owner says otherwise):**
1. *Learn digital skills. Build a global career.*
2. *Practical tech training from Bayelsa to the world.*

**What it is:** A fast, clean, mobile-first learning website that hosts InnovaTech World's training courses as readable lessons. Each course is a sequence of weekly lessons written in Markdown.

**Who uses it:**
- **Students** in InnovaTech's mentorship programs, who follow the weekly lessons, download datasets and templates, and review assignments.
- **Prospective students** who browse courses before enrolling.
- **The owner (facilitator)**, who adds new courses and lessons by writing Markdown files, with no coding needed after the build.

**Current content:** one complete course, *Data Analysis Career Launch* (12 weeks), supplied as Markdown files.
**Future courses (show as "Coming soon" cards):** Web Development, Social Media Marketing, Virtual Assistant (VA Launch), Remote Ready (career positioning), Graphic Design, Digital Marketing, and any others the owner adds.

**Success criteria**
- The owner can add a new course by creating a folder of `.md` files and pushing to GitHub. The site rebuilds and deploys automatically.
- Pages load fast on slow mobile connections (typical for many Nigerian users).
- The site looks professional, trustworthy, and consistent with the brand.

---

## 2. Brand & Design System

### 2.1 Brand
- **Colours:** Royal blue and white. Clean, modern, professional.
- **Font:** **Poppins** (headings and body).
- **Logo:** `public/images/logo.png` (navy-blue symbol with the word INNOVATECH). It is designed for white backgrounds. Do not place it on dark blue without providing a white badge or a white logo variant. Generate a favicon and app icons from the logo symbol.
- **Voice:** Friendly, practical, encouraging, honest. Speak to beginners without talking down. **Never promise jobs or specific income.** Say things like "build a portfolio" and "get job-ready", not "guaranteed job".

### 2.2 Colour tokens (define as CSS custom properties)
Royal blue is the signature colour. These tokens are a starting point; adjust slightly if needed to pass contrast, but keep the feel.

| Token | Value | Use |
|---|---|---|
| `--blue-50` | `#EEF3FF` | Soft section backgrounds |
| `--blue-100` | `#DCE6FF` | Hover backgrounds, tags |
| `--blue-200` | `#B9CDFF` | Borders on blue elements |
| `--blue-400` | `#5F86EC` | Accents, illustrations |
| `--blue-500` | `#3D68E0` | Hover states |
| `--blue-600` | `#2457D6` | **Primary brand colour** (buttons, links, headings accents) |
| `--blue-700` | `#1B44B0` | Pressed states, link hover |
| `--blue-900` | `#122A6B` | Footer, dark sections |
| `--white` | `#FFFFFF` | Main background |
| `--ink` | `#0F172A` | Main text |
| `--muted` | `#475569` | Secondary text |
| `--border` | `#E2E8F0` | Dividers, card borders |
| `--success` | `#16A34A` | Completed states |
| `--warning` | `#F59E0B` | Warnings and callouts |
| `--danger` | `#DC2626` | Errors and caution callouts |

**Rules:**
- Page background is **white**. Use `--blue-50` for alternating sections. Use `--blue-600` for primary actions and `--blue-900` sparingly (footer, one hero band).
- All text/background pairs must pass **WCAG AA** contrast (4.5:1 for body text). Verify and fix.
- No gold or other accent colours. The brand is royal blue and white.

### 2.3 Typography
- Load **Poppins** via the `@fontsource/poppins` package (self-hosted, no Google Fonts request, faster and privacy-friendly). Weights: **400, 500, 600, 700**. Use `font-display: swap` and Latin subset only.
- Fallback stack: `Poppins, system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif`.
- **Code font:** a system monospace stack (`ui-monospace, SFMono-Regular, Menlo, Consolas, monospace`). Do not add a second web font.
- Scale (fluid with `clamp`): H1 ≈ 2.25–3.5rem, H2 ≈ 1.75–2.25rem, H3 ≈ 1.25–1.5rem, body 1rem (16px) to 1.0625rem, line-height 1.7 for lessons.
- Lesson body width: max ≈ 72ch for readability.

### 2.4 Look and feel
- Modern ed-tech style: lots of white space, rounded corners (8–16px), soft shadows, blue gradient or blue-50 hero, clear hierarchy.
- Buttons: solid royal blue with white text (primary), white with blue border (secondary). Visible focus rings.
- Cards for courses with icon, title, short description, level, duration and a status badge (*Available* / *Coming soon*).
- Subtle motion only (hover lift, fade in). **Respect `prefers-reduced-motion`.** No heavy animation libraries.
- Illustrations: use simple inline SVG shapes or icons (e.g., `astro-icon` or Lucide). No stock photos required.

### 2.5 Dark mode
Optional but nice: a light/dark toggle (default: follow system, remember choice). In dark mode keep blue as the accent on a very dark navy-slate background, and make sure the logo is still legible (put it on a white rounded badge). **If dark mode risks delaying Phase 1, defer it to Phase 2.**

---

## 3. Technology Decisions

Use these unless a clear problem appears (if so, explain and ask).

| Concern | Choice | Why |
|---|---|---|
| Framework | **Astro** (latest stable) with **Content Collections** | Best fit for Markdown-driven content; ships almost no JavaScript; fast on slow networks; easy GitHub Pages hosting |
| Styling | **Tailwind CSS** (via the official Astro integration) **plus** a small `global.css` with the design tokens above | Fast consistent UI; tokens keep the brand centralised |
| Markdown | Astro's built-in Markdown with **GFM tables**, **Shiki** syntax highlighting, **heading anchors** | Course files rely on tables, code blocks and blockquotes |
| Language | **TypeScript** (strict, for config/schemas/components) | Safer content schemas |
| Search | **Pagefind** (static, built after the Astro build) | Works on GitHub Pages with no server |
| Hosting | **GitHub Pages** via **GitHub Actions** | Free and automatic on every push |
| Package manager | **npm** | Simplest for the owner |
| Icons | Lucide (via `astro-icon` or inline SVG) | Light and consistent |

**Constraints**
- **No backend, no database, no login** in Phases 1–3. It must be a static site. Student login and progress tracking arrive in **Phase 4** using the owner's **Supabase project `https://rrjyfrqidwndgfgdncnp.supabase.co`** (see section 0A and `STUDENT-PORTAL-SPEC.md`). Design Phases 1–3 so Phase 4 can be added without rewrites (e.g., keep progress logic behind one small module, and keep course/lesson slugs stable).
- Keep client-side JavaScript minimal. Anything interactive (copy-code button, mobile menu, progress, theme toggle, search) should be small and progressive.
- No heavy UI frameworks (no React unless clearly necessary for one component).
- Lighthouse targets (mobile): **Performance ≥ 90, Accessibility ≥ 95, Best Practices ≥ 95, SEO ≥ 95.**

---

## 4. Repository Structure

Create this structure (adjust names only if there is a good reason):

```
innovatech-knowledge-hub/
├── WEBSITE-BUILD-PROMPT.md          ← this file
├── CLAUDE.md                        ← you create: short conventions for future sessions
├── README.md                        ← project overview + how to run locally
├── CONTRIBUTING.md                  ← how to add a course/lesson (plain language, for the owner)
├── package.json
├── astro.config.mjs
├── tailwind.config.*                ← if needed by the chosen Tailwind version
├── tsconfig.json
├── .github/
│   └── workflows/
│       └── deploy.yml               ← build + deploy to GitHub Pages
├── public/
│   ├── images/
│   │   └── logo.png                 ← provided
│   ├── favicon.svg / favicon.ico    ← generate from the logo symbol
│   ├── og-default.png               ← social share image (generate, 1200×630)
│   ├── robots.txt
│   └── downloads/
│       └── data-analysis/           ← datasets and templates for that course
├── src/
│   ├── config/
│   │   └── site.ts                  ← ALL editable site settings (name, contacts, nav, social)
│   ├── content/
│   │   ├── config.ts                ← collection schemas (see section 5)
│   │   └── courses/
│   │       ├── data-analysis/
│   │       │   ├── _course.md       ← course landing info (frontmatter + overview body)
│   │       │   ├── 00-setup-guide.md
│   │       │   ├── week-01-....md
│   │       │   └── ... week-12
│   │       ├── web-development/_course.md       ← "coming soon" placeholder
│   │       ├── social-media-marketing/_course.md
│   │       └── ...
│   ├── components/                  ← Header, Footer, CourseCard, LessonNav, Toc, Callout, etc.
│   ├── layouts/                     ← BaseLayout, CourseLayout, LessonLayout
│   ├── pages/
│   │   ├── index.astro
│   │   ├── courses/index.astro
│   │   ├── courses/[course]/index.astro
│   │   ├── courses/[course]/[lesson].astro
│   │   ├── resources.astro
│   │   ├── about.astro
│   │   ├── contact.astro
│   │   ├── 404.astro
│   │   └── sitemap / rss as needed
│   ├── styles/
│   │   └── global.css               ← tokens, typography, Markdown ("prose") styles
│   └── utils/                       ← helpers (e.g., strip facilitator sections, reading time)
└── scripts/
    └── import-data-analysis-course.mjs   ← one-time import/migration (see section 6)
```

> **Important:** the course folder name is the URL slug. Example: `courses/data-analysis/week-05-sql-querying.md` → `/courses/data-analysis/week-05-sql-querying/`.

---

## 5. Content Model (Schemas)

Define with **Zod** in `src/content/config.ts`. Use **one collection** called `courses` containing both course info files and lessons, or two collections (`courses` and `lessons`). Choose whichever is cleaner, but keep the owner's workflow simple: *one folder per course, one Markdown file per lesson.*

### 5.1 Course (`_course.md`) frontmatter
```yaml
title: "Data Analysis Career Launch"
slug: data-analysis                # must match the folder name
status: available                  # available | coming-soon
category: "Data & Analytics"       # used for filtering
level: "Beginner"                  # Beginner | Intermediate | Advanced
duration: "12 weeks"
format: "Weekly lessons + in-person mentoring"
summary: "Go from zero to job-ready data analyst using Excel, SQL, Python and Power BI."
outcomes:                          # 4–6 short bullets shown on the course page
  - "Clean and analyse real business data"
  - "Write SQL queries with joins and window functions"
  - "Build dashboards in Excel and Power BI"
  - "Publish a GitHub portfolio and apply for remote roles"
tools: ["Excel", "SQL", "Python", "Power BI"]
icon: "bar-chart-3"                # a Lucide icon name
order: 1                           # sort order in listings
featured: true
```
For *coming-soon* courses only `title`, `status`, `category`, `summary`, `icon`, `order` are required.

### 5.2 Lesson frontmatter
```yaml
title: "SQL I: Querying Data"
course: data-analysis
order: 5                           # position within the course (0 = setup/intro)
week: 5                            # optional
phase: "SQL"                       # optional; groups lessons on the course page (see 7.3). Omit if the course has no phases.
summary: "Pull exactly the data you need from a database using SQL."
estimatedHours: 10                 # optional
tools: ["SQLite", "DB Browser for SQLite"]
downloads:                         # optional, shown in a "Files for this lesson" box
  - label: "Orders (clean) CSV"
    href: "/downloads/data-analysis/orders_clean.csv"
draft: false                       # true = hidden from production builds
```
**Validation:** the build must **fail with a clear message** if required frontmatter is missing, a lesson's `course` doesn't exist, or two lessons share the same `order` in one course.

### 5.3 Site config (`src/config/site.ts`)
All of the following must be editable in this single file, with obvious `TODO` placeholders where the owner must supply real values. **Never invent contact details.**
```ts
export const site = {
  name: "InnovaTech World Knowledge Hub",
  shortName: "InnovaTech Hub",
  tagline: "Learn digital skills. Build a global career.",
  url: "https://TODO.github.io/innovatech-knowledge-hub",   // or custom domain later
  location: "Yenagoa, Bayelsa State, Nigeria",
  facilitator: { name: "David C. Igberi", title: "Founder & Lead Facilitator" },
  contact: {
    whatsappNumber: "TODO",        // international format without +, e.g. 234XXXXXXXXXX
    email: "TODO",
    whatsappDefaultMessage: "Hello InnovaTech World, I'd like to know more about the {course} course."
  },
  social: { facebook: "TODO", instagram: "TODO", linkedin: "TODO", youtube: "TODO", tiktok: "TODO" },
  nav: [ /* Home, Courses, Resources, About, Contact */ ],
  hideSectionsHeadings: ["Facilitator Notes", "Facilitator Tips"],  // see section 8
};
```
Hide any social link that is still `"TODO"` rather than rendering a broken link.

---

## 6. Phase 1 Task: Import the Data Analysis Course

The source course files contain:
```
00-course-overview.md      01-setup-guide.md
weeks/week-01-....md  …  weeks/week-12-....md
datasets/ (customers.csv, products.csv, orders_clean.csv, orders_raw.csv, generate_data.py)
```

**Before writing the script, fix the source layout and protect it from the public repo:**
1. The source files are currently **not** in `_import/`. They are scattered: a copy of `00-course-overview.md` sits at the repo root, and the full course sits **doubly nested** at `data-analysis-course/data-analysis-course/` (containing `weeks/`, `datasets/`, `00-course-overview.md`, `01-setup-guide.md`). The root-level copies of `00-course-overview.md`, `STUDENT-PORTAL-SPEC.md` and `innovatech-logo.png` are untracked and **not git-ignored** — on a public repo they would be committed, including every `## Facilitator Notes` section. This violates section 8.
2. Create `.gitignore` with `_import/` **first**, then **move** the course source into `_import/data-analysis-course/` (flatten the double nesting) and delete the stray root-level `00-course-overview.md`. Move the logo to `public/images/logo.png` (section 0, step 4). Confirm `git status` shows no course source or facilitator content staged before the first commit.

The script reads from `_import/data-analysis-course/`.

Write `scripts/import-data-analysis-course.mjs` (run once, safe to re-run) that:

1. Creates `src/content/courses/data-analysis/`.
2. Converts `00-course-overview.md` into `_course.md`, adding the frontmatter from section 5.1 and keeping the overview body.
3. Converts `01-setup-guide.md` into `00-setup-guide.md` with lesson frontmatter (`order: 0`, title "Setup Guide: Install Your Tools").
4. Converts each weekly file into a lesson with frontmatter (`order` = week number, `week`, `title` from the H1 with the "Week N:" prefix stripped, `summary` from the **Goal:** line, and `tools` where obvious). Optionally set `phase` to group the curriculum on the course page (the natural groupings are Excel: weeks 1–3, Statistics: week 4, SQL: weeks 5–6, Python: weeks 7–9, Power BI: weeks 10–11, Capstone: week 12). Remove the duplicate H1 from the body, since the layout renders the title.
5. Copies `datasets/*` into `public/downloads/data-analysis/` and adds `downloads:` entries to the relevant lessons (Week 1: `orders_clean.csv`; Week 2: `orders_raw.csv`; Week 3: `orders_clean.csv`, `customers.csv`, `products.csv`; Weeks 5–6 the three clean CSVs; Weeks 8–10 the clean files plus `orders_raw.csv` where used; the course overview lists `generate_data.py`).
6. Rewrites references such as `` `01-setup-guide.md` `` into real site links.
7. Prints a short report of what was created, so the owner can see it worked.

Then **manually check** at least three lessons in the browser (Week 2, Week 5 and Week 11) for table, code-block and blockquote rendering.

> After importing, the lessons are normal Markdown files. The owner edits them directly from then on. The script is only for the first import.

### Content conventions found in the existing course files (the renderer must handle all of these well)
- Headings H1–H3 (H1 comes from frontmatter in the layout)
- **Tables** (many, some wide). They must scroll horizontally inside a wrapper on mobile and never break the page layout.
- Fenced code blocks in `sql`, `python`, `DAX`, plain text, and ASCII diagrams (box-drawing characters). Preserve whitespace. Add a **Copy** button on every code block.
- Blockquotes beginning with `> **Note…**`, `> **Tip…**`, `> **Teaching tip…**`, `> **Rule…**`: style these as callouts (see section 7.5).
- Task lists (`- [ ]`) and inline code
- Emoji-free, plain content. Do not add emoji.

---

## 7. Pages & Features

### 7.1 Home (`/`)
1. **Header** (sticky): logo, nav (Home, Courses, Resources, About, Contact), a primary button "Start Learning" linking to `/courses/`, mobile hamburger menu.
2. **Hero:** headline (the tagline), a one-sentence supporting line (practical, beginner-friendly training from Yenagoa, Bayelsa), two buttons (*Browse Courses*, *Chat on WhatsApp*). Soft blue background with a simple SVG graphic.
3. **Featured courses:** cards from the `courses` collection (`featured: true`, Available first). Show *Coming soon* cards after.
4. **How learning works:** 3–4 steps (Weekly lessons → Hands-on assignments → Mentoring sessions → Portfolio).
5. **Why InnovaTech:** 3 short value points (practical and project-based; beginner-friendly; local mentorship plus global skills).
6. **Call to action band** (royal blue): "Ready to start? Talk to us on WhatsApp."
7. **Footer:** logo, short description, links, location, social icons (only the ones that are configured), © year InnovaTech World.

### 7.2 Courses listing (`/courses/`)
- Grid of all courses with category filter chips (small progressive-enhancement script), status badge, level, duration.
- *Coming soon* courses are visible but not clickable (or open a small page with "Join the waitlist" via WhatsApp).

### 7.3 Course page (`/courses/[course]/`)
- Hero with title, summary, key facts (level, duration, format, tools).
- "What you'll learn" (outcomes).
- **Curriculum:** ordered list of lessons (week number, title, summary, estimated hours), each linking to its lesson. Group by phase if the course provides one (optional `phase` field in lesson frontmatter).
- The course overview body (rendered Markdown).
- "Enroll / Ask about this course" button → WhatsApp link built from `site.contact` (prefilled message with the course name). If the number is still `TODO`, show a note in the dev console and hide the button.

### 7.4 Lesson page (`/courses/[course]/[lesson]/`)
- **Layout (desktop):** left sidebar = course curriculum with the current lesson highlighted; centre = lesson content; right = "On this page" table of contents built from H2/H3 (sticky, highlights the active section).
- **Layout (mobile):** collapsible "Course contents" drawer; the TOC collapses into a dropdown at the top.
- Header: breadcrumb (Courses › Course › Lesson), title, summary, estimated hours, tools chips.
- "Files for this lesson" box if `downloads` exist.
- Reading-friendly typography, anchored headings, **copy buttons on code blocks**, styled tables, callouts.
- **Previous / Next lesson** buttons at the bottom.
- "Mark as complete" button that stores progress in `localStorage` (no accounts). Show a progress bar on the course page and a ✓ in the sidebar. Wrap in try/catch and handle empty storage gracefully.
- "Edit this page on GitHub" link (uses the repo URL from config) and a small "Report a problem" link (WhatsApp or email).
- A print stylesheet so lessons print cleanly (hide nav, sidebar, buttons).

### 7.5 Callouts
Convert blockquotes that start with a **bold label** (`> **Label...`) into styled callouts, at build time (a small remark plugin) or via CSS classes. **Match the label case-insensitively by keyword, not by exact prefix**, so new labels the owner writes still get styled. Evaluate the rules **in this order** and use the first match:

| # | If the label contains | Then | Icon |
|---|---|---|---|
| 1 | `facilitator` (e.g. `**Note for the facilitator`) | **Remove entirely at build time** — not a callout. See section 8, point 1. | — |
| 2 | `warning`, `caution`, `important`, `scam`, `be careful`, `privacy`, `date` (covers `Date caution`, `Dates`) | Amber | alert triangle |
| 3 | `tip`, `teaching tip`, `rule` (covers `Rule of thumb` and `Rule`) | Green / light-blue tip | lightbulb |
| 4 | `note` | Blue info | info circle |
| 5 | any other bold label (e.g. `Indentation matters`, `Correlation`, `Check early`) | Neutral callout (grey, info style) so it still reads as intentional | info circle |

Blockquotes with **no** bold label stay as normal quotes. Each callout has an icon **and** a text label (don't rely on colour alone). Rule 1 runs before all others so a facilitator blockquote can never be rendered as a student-facing "Note" callout.

**Labels confirmed present in the current course content** (verify the matching covers each): `Note`, `Tip`, `Teaching tip`, `Rule of thumb`, `Rule`, `Privacy`, `Date caution`, `Dates`, `Indentation matters`, `Correlation`, `Check early`, `Be careful with scams`, `Note for the facilitator`.

### 7.6 Resources (`/resources/`)
A curated, filterable page of free learning resources (starts with those from the Data Analysis setup guide: Microsoft Learn, SQLBolt, Mode, Kaggle Learn, pandas docs, Khan Academy, and the YouTube channels listed there). Drive it from a simple data file (`src/content/resources.json` or a collection) with `title`, `url`, `category`, `description`, so the owner can add entries easily. External links open in a new tab with `rel="noopener noreferrer"`.

### 7.7 About (`/about/`)
- InnovaTech World: who we are, mission, Yenagoa, Bayelsa (use only facts already in the owner's documents; leave `TODO` placeholders for anything else).
- Facilitator card (name and title from config; photo placeholder).
- "How our training works" summary (live mentoring, practical assignments, portfolio, honest outcomes).

### 7.8 Contact (`/contact/`)
- Large **WhatsApp** button (from config), email link, location, social links.
- No backend form in Phase 1. (If a form is wanted later: use Formspree or similar; see Phase 3.)

### 7.9 404 page
Friendly message, search box (Phase 2), links to Courses and Home.

### 7.10 Cross-cutting requirements
- **Mobile-first** and tested at 360px, 768px, 1024px and 1440px widths.
- **Accessibility:** semantic HTML, skip-to-content link, visible focus states, keyboard-operable menus and drawers, `aria-current` on nav, alt text on all images, form labels, `lang="en"`, reduced-motion support, sufficient contrast.
- **Performance:** no layout shift; images optimised with `astro:assets`; self-hosted fonts; minimal JS; lazy-load below-the-fold images; no third-party scripts in Phase 1.
- **SEO:** unique `<title>` and meta description per page; canonical URLs; Open Graph and Twitter cards (default `og-default.png`); `sitemap.xml` (`@astrojs/sitemap`); `robots.txt`; **JSON-LD** (`Organization` on home, `Course` on each course page).
- **Privacy:** no cookies or trackers by default. Provide an optional analytics slot in config (e.g., Plausible or GA4), **off by default**, with a short privacy note if enabled.
- **Content integrity:** build fails on broken internal links (add a link-check step or script).

---

## 8. Protecting Facilitator-Only Content (Important)

The weekly files contain **Facilitator Notes** (and, in the course overview, *Facilitator Tips*) intended for the teacher, not students.

1. At build time, **remove any section whose heading matches** an entry in `site.hideSectionsHeadings` (from that heading until the next heading of the same or higher level). **Also remove any blockquote whose bold label contains `facilitator`** (e.g. `> **Note for the facilitator ...`) — facilitator material is written as both headings *and* blockquotes, and the latter would otherwise survive heading-stripping and render as a student callout (see section 7.5, rule 1). Implement both as a remark/rehype plugin or a pre-processing step, and **add a test** proving neither the hidden heading sections nor any `facilitator` blockquote text appears in the built HTML.
2. Keep **Mentoring Session Plan** and **Self-Check Questions** visible. They are useful to students. (Render Self-Check Questions inside a collapsible `<details>` block.)
3. **Warn the owner clearly (in the README and in your Phase 1 summary):** hiding sections on the website does **not** hide them in a **public GitHub repository**; anyone can read the raw Markdown there. Offer these options and let the owner choose (see Open Decisions):
   - **Option A (recommended):** keep facilitator notes out of the public repo. Store them in a separate **private** repo (or private folder) and keep only student-facing content here.
   - **Option B:** keep the repo **private** (GitHub Pages from a private repo requires a paid GitHub plan, or deploy to Cloudflare Pages / Netlify instead, both of which have free tiers).
   - **Option C:** accept that facilitator notes are visible in the public repo.
4. **Never commit:** signed agreements, student names or contact details, commitment-fee or pricing documents, or any private student data. Add these patterns to `.gitignore` and mention them in `CONTRIBUTING.md`.

---

## 9. Deployment (GitHub Pages)

1. `astro.config.mjs` reads `SITE_URL` and `BASE_PATH` from environment variables (with sensible defaults) so the same code works at `https://USERNAME.github.io/REPO/` and later at a custom domain with `base: "/"`.
2. **All internal links and asset URLs must respect the base path**: use a helper (e.g. `withBase()`) and never hard-code `/` for internal links.
3. `.github/workflows/deploy.yml`:
   - Triggers on push to `main` and on manual dispatch
   - Installs dependencies with `npm ci`, runs the build, runs Pagefind indexing (Phase 2), uploads the Pages artifact, and deploys with `actions/deploy-pages`
   - Uses the official Astro GitHub Action or equivalent, with caching
4. Document in `README.md` how to enable Pages (**Settings → Pages → Source: GitHub Actions**) and how to add a **custom domain later** (DNS records, the `CNAME` file, and updating `SITE_URL`).
5. Add a pull-request check workflow that runs the build and link check.

---

## 10. Build Phases

Complete each phase, stop, and report before moving on.

### Phase 1: Foundation and Content (MVP)
- [ ] Astro + TypeScript + Tailwind project, ESLint/Prettier basics
- [ ] Design tokens, Poppins self-hosted, global styles, Markdown "prose" styling
- [ ] Layouts and components (Header, Footer, CourseCard, Lesson sidebar, TOC, Callout, CodeBlock copy button, LessonNav, DownloadsBox)
- [ ] Content collection schemas with validation
- [ ] `site.ts` config with TODO placeholders
- [ ] Import script and the full Data Analysis course imported and checked
- [ ] "Coming soon" placeholders for Web Development, Social Media Marketing, Virtual Assistant, Remote Ready, Graphic Design
- [ ] Pages: Home, Courses, Course, Lesson, Resources, About, Contact, 404
- [ ] Facilitator-section stripping plus a test
- [ ] SEO basics (meta, OG, sitemap, robots, JSON-LD)
- [ ] GitHub Actions deploy workflow
- [ ] `README.md`, `CONTRIBUTING.md`, `CLAUDE.md`
- [ ] Lighthouse mobile check (report scores and fix anything below target)

### Phase 2: Learning Experience
- [ ] Pagefind site search (header search + `/search` page + 404 search)
- [ ] Progress tracking polish (course progress bars, "continue where you left off" on the home/course page)
- [ ] Dark mode
- [ ] Course filtering and sorting
- [ ] Per-lesson "Self-check" collapsible blocks, and printable lesson PDFs via the print stylesheet
- [ ] "Assignment" callout/section highlighting (detect the "Weekly Assignment" heading and style it as a distinct card)
- [ ] Open Graph image generation per course (optional)

### Phase 3: Growth
- [ ] Blog / "Insights" collection (short articles on tech careers in Nigeria and remote work)
- [ ] Newsletter signup (via a form service) and a contact form
- [ ] Testimonials section (data-driven, owner supplies the content with permission)
- [ ] Student showcase page (portfolio links, only with written permission)
- [ ] Certificate verification page (static lookup from a JSON file of certificate IDs; no personal data beyond a name and course, and only with consent)
- [ ] Optional: analytics (privacy-friendly), RSS feed, multi-language readiness

### Phase 4: Student Portal (Login & Progress Tracking)
Build exactly as described in **`STUDENT-PORTAL-SPEC.md`** (read it fully first). Summary:
- [ ] Supabase project setup guide, schema with Row Level Security, and automated RLS tests
- [ ] Invite-only student login (email + password and magic link)
- [ ] "My Learning" account page with progress synced across devices (merging earlier `localStorage` progress)
- [ ] Assignment submission (links) with reviewer feedback
- [ ] Facilitator dashboard: students, progress, submissions review, attendance, enrolments, CSV export
- [ ] Privacy page and first-login consent
- [ ] Lesson content stays public unless the owner chooses otherwise (see the spec, section 3)

---

## 11. Documentation Claude Code Must Produce

### `README.md`
What the project is, the tech stack, how to run it locally (`npm install`, `npm run dev`, `npm run build`, `npm run preview`), the folder structure, how deployment works, and the facilitator-content warning from section 8.

### `CONTRIBUTING.md` (written for a non-developer owner)
Plain-language, step-by-step guides with copy-paste examples:
1. **Add a new course** (create the folder, create `_course.md`, set `status: available`, add lessons)
2. **Add a new lesson** (file naming, frontmatter, `order`)
3. **Edit an existing lesson** (including the "Edit on GitHub" button)
4. **Add downloadable files** (put them in `public/downloads/<course>/` and reference them in `downloads`)
5. **Add callouts, tables and code blocks** (the Markdown patterns that the site styles)
6. **Update contact details, WhatsApp number and social links** (`src/config/site.ts`)
7. **Preview locally and publish** (git add / commit / push)
8. **What must never be committed** (section 8, point 4)
9. **Troubleshooting** (build errors and what they mean)

### `CLAUDE.md`
A short file (under 80 lines) for future Claude Code sessions: stack, folder map, commands, content schema summary, brand rules (royal blue and white, Poppins, no gold, no emoji, no job guarantees), accessibility and performance requirements, and the rule *"ask before changing anything listed under Open Decisions."*

---

## 12. Quality Checklist (Run Before Declaring Each Phase Done)

- [ ] `npm run build` passes with **zero errors and zero warnings** that matter
- [ ] All internal links work, including with a non-root base path
- [ ] The facilitator-content test passes
- [ ] Tables scroll on mobile; no horizontal page scrolling at 360px
- [ ] Every code block has a working Copy button
- [ ] Keyboard-only navigation works across header, menu, sidebar and lesson buttons
- [ ] Contrast passes AA (spot-check blue on white, white on blue, muted text, callouts)
- [ ] Lighthouse mobile scores meet targets (report the numbers)
- [ ] Placeholders marked `TODO` are listed in the final report for the owner to fill
- [ ] No private data, agreements or pricing documents committed
- [ ] No emoji, no gold accent colour, no unsupported promises in copy

---

## 13. Open Decisions (Ask the Owner Before Deciding)

Ask these early in Phase 1 (one short message, all at once). Use the stated default if the owner says "use your judgment".

| # | Decision | Default |
|---|---|---|
| 1 | **Repo visibility and facilitator notes** (section 8: A, B, or C) | Option A |
| 2 | **Hosting:** GitHub Pages now, or Cloudflare Pages / Netlify? | GitHub Pages |
| 3 | **Custom domain** (e.g. `hub.innovatechworld...`)? Which one? | None yet |
| 4 | **Is lesson content public or for enrolled students only?** (A static site cannot truly password-protect; if students-only is needed, discuss options such as Cloudflare Access.) | Public |
| 5 | **WhatsApp number, email, and social links** | Leave `TODO`, hide when empty |
| 6 | **Dark mode** in Phase 1 or Phase 2? | Phase 2 |
| 7 | **Facilitator photo and short bio** for the About page | Placeholder |
| 8 | **Course order and names** of future courses | As listed in section 1 |
| 9 | **Student portal backend** (Phase 4): Supabase is **confirmed**, project `https://rrjyfrqidwndgfgdncnp.supabase.co` (see section 0A). Still to decide: which email provider for login emails, and whether lessons stay public or become students-only | Custom SMTP; lessons public |

---

## 14. Things Claude Code Must NOT Do

- Do not invent phone numbers, emails, testimonials, student names, statistics, certifications, partnerships, or job-placement claims.
- Do not add trackers, ads, cookie banners, or third-party scripts without being asked.
- Do not add payment processing. Do not add student login before Phase 4, and when you do, follow `STUDENT-PORTAL-SPEC.md` exactly. **Never use Google Sheets to store credentials or passwords**, and never put a Supabase `service_role` key anywhere in the repo, build or browser.
- Do not change the brand: royal blue and white, **Poppins**.
- Do not overwrite the owner's Markdown lesson content except through the one-time import script, and do not "improve" lesson wording unless asked.
- Do not commit secrets, `.env` files, or private documents.
- Do not leave failing builds on `main`.

---

## 15. Final Handoff Message (What Claude Code Should Tell the Owner After Phase 1)

1. The live preview URL (or how to run locally)
2. A list of every `TODO` placeholder that needs real information
3. The Lighthouse scores
4. Any decisions from section 13 that were made by default
5. A three-line summary of how to add a new course
6. Suggestions for Phase 2 priorities
