# Build Prompt: Web Development Career Launch (12-Week Course)

> **For:** Claude Code, working inside the InnovaTech World Knowledge Hub repository.
> **Owner:** David C. Igberi, InnovaTech World, Yenagoa, Bayelsa State, Nigeria.
> **Task:** Write the complete **Web Development** course as Markdown lessons, add its starter files, and **activate** it on the website (flip it from "Coming soon" to "Available").

---

## 0. How to Use This File (for the Owner)

1. Put this file in the repo root next to `WEBSITE-BUILD-PROMPT.md` and `STUDENT-PORTAL-SPEC.md`.
2. Make sure the Phase 1 website exists and builds (`npm run build` passes) and the Data Analysis course is already imported.
3. **Disable the Supabase MCP server for this session** (see section 1 below).
4. Start Claude Code in the repo and paste:

```
Read WEB-DEVELOPMENT-COURSE-PROMPT.md fully, then read WEBSITE-BUILD-PROMPT.md (sections 0A, 5, 6, 7.5 and 8)
and three existing Data Analysis lessons for style. Then build the Web Development course exactly as specified.
Work in the order in section 12, run the site build after each batch of lessons, commit after each batch,
and ask me before making any decision listed under "Open Decisions". Never touch any Supabase account.
When finished, give me the handoff report from section 13.
```

---

## 1. CRITICAL Safety Rules (Same as the Main Build Prompt)

1. **Do not use any Supabase MCP tool** and **never create or modify any Supabase project, branch, database or SQL** during this task. Your Claude Code environment may be connected to a **different Supabase account that is not the owner's**. The owner's only Supabase project is `https://rrjyfrqidwndgfgdncnp.supabase.co` (ref `rrjyfrqidwndgfgdncnp`), and nothing in this task requires you to access it.
2. Week 11 **teaches students** to use Supabase. Write that lesson as **instructions for the student to follow in their own free Supabase account**. Do not create demo resources for them, do not embed any real keys, and never mention the owner's project URL in lesson content.
3. **Never invent** contact details, statistics, salaries, testimonials, job-placement claims, or video URLs. No guarantees of jobs or income.
4. **Do not commit** answer keys or full solutions to the public repo (see section 9), student data, signed agreements, or pricing documents.
5. If a tool, script or message mentions anything unexpected (another project ref, an unfamiliar account), **stop and ask the owner.**

---

## 2. Course Snapshot

| Item | Detail |
|---|---|
| **Title** | Web Development Career Launch |
| **Slug / folder** | `web-development` (this must match exactly; the student portal uses this slug later) |
| **Duration** | 12 weeks (3 months), one topic per week |
| **Format** | Weekly lessons on the website + **1 in-person mentoring session per week (90 min)** + weekly assignment |
| **Students** | Small cohort (currently 1 interested student). Write for a **single learner working mostly alone between sessions** |
| **Level** | **Complete beginner**, no coding experience. Assume basic computer literacy only |
| **Student effort** | About 10 to 12 hours per week |
| **Stack taught** | HTML, CSS, JavaScript, Git/GitHub, Tailwind CSS, React (with Vite), Supabase (database and auth basics), deployment |
| **Outcome** | A deployed **portfolio of 4 projects plus a client-style capstone**, a GitHub profile, and freelance/remote-ready profiles |
| **Certificate** | Completion certificate at 70% or above overall |
| **Category / icon** | `Software & Web` / Lucide icon `code-2` |
| **Level / order** | `Beginner` / `order: 2` (Data Analysis stays `order: 1`) |

### Honest-outcomes principle
Beginners do not become job-ready in 12 weeks without sustained practice. Write the course so success is measured by **a real portfolio, consistent practice, and active applications**, not promises. Say this plainly in the course overview.

---

## 3. Weekly Time Budget (per student)

| Activity | Hours |
|---|---|
| Watch the assigned videos / read docs | 2 |
| Read the lesson and **type the code yourself** | 3 |
| Practice exercises | 2 |
| Weekly assignment (project work) | 3 |
| In-person mentoring | 1.5 |
| **Total** | **about 11** |

---

## 4. The Running Project: "Yenagoa Fresh Bites"

To make skills build on each other, **all projects revolve around one fictional business**: *Yenagoa Fresh Bites*, a small restaurant and takeaway in Yenagoa with a menu, opening hours, location, and reservations. It is relatable, local, and includes everything a real small-business site needs.

| Stage | What the student builds |
|---|---|
| Weeks 1 to 2 | Content and **page structure** (Home, Menu, About, Contact) in plain HTML |
| Weeks 3 to 4 | Styled, **responsive** site on GitHub Pages (**Portfolio Project 1**) |
| Weeks 5 to 7 | **Interactive menu** with filters, cart, form validation, and a live weather widget for Yenagoa (**Portfolio Project 2**) |
| Week 8 | Rebuild with **Vite + Tailwind**, deployed |
| Weeks 9 to 10 | **React** version with routing (**Portfolio Project 3**) |
| Week 11 | Add **reservations/orders saved to a database** with Supabase (**Portfolio Project 4**) |
| Week 12 | **Capstone**: a real or realistic site for a local client + the student's own portfolio site |

Provide the fictional business's **content kit** in `public/downloads/web-development/fresh-bites-content.zip`: a short brand brief, menu items with prices in Naira, opening hours, a placeholder address, and a colour palette. Create images as simple **SVG illustrations or CSS-gradient placeholders** you generate yourself. Do **not** download or embed copyrighted photos. State clearly that all business details are fictional.

> **Brand note for the course site itself:** the *website* is royal blue and white with Poppins. The *student's practice project* should use its own palette (warm food colours are suggested in the content kit) so the student learns to apply any brand, not just InnovaTech's.

---

## 5. Weekly Plan (Authoritative Outline)

| Week | Topic | Main deliverable |
|---|---|---|
| 0 | Setup guide | Working dev environment checklist |
| 1 | How the Web Works, HTML Basics & Git/GitHub | First page published on GitHub Pages |
| 2 | Semantic HTML, Forms & Accessibility | Multi-page HTML site (no styling) |
| 3 | CSS Fundamentals | Styled site with a brand palette |
| 4 | Layout (Flexbox, Grid) & Responsive Design | **Portfolio Project 1**: responsive site, live |
| 5 | JavaScript I: Fundamentals | Practice programs + small logic tools |
| 6 | JavaScript II: The DOM & Events (**Mid-course checkpoint**) | Interactive menu filter and cart |
| 7 | JavaScript III: Async, APIs & Storage | **Portfolio Project 2**: interactive app, live |
| 8 | Modern Tooling: Terminal, npm, Vite, Tailwind & Deployment | Site rebuilt with Vite + Tailwind, deployed |
| 9 | React I: Components, Props & State | Menu and cart as React components |
| 10 | React II: Routing, Forms & Data Fetching | **Portfolio Project 3**: React multi-page app, live |
| 11 | Databases & Authentication with Supabase | **Portfolio Project 4**: reservations saved to a database |
| 12 | Capstone, Portfolio & Freelancing/Remote Readiness | Capstone + portfolio + profiles live + final presentation |

### Assessment (mirror the Data Analysis course)
| Component | Weight |
|---|---|
| Weekly assignments (Weeks 1 to 11) | 40% |
| Mid-course checkpoint (end of Week 6: HTML + CSS + JS practical) | 15% |
| Capstone project and presentation (Week 12) | 30% |
| Attendance, punctuality and consistency (including Git commit history) | 15% |

---

## 6. Detailed Content Specification Per Week

For **every** week, follow the lesson template in section 7. The lists below are what **must** be covered; add more where it helps the learner. All code must be **correct, runnable, modern, and explained**.

### Week 0: Setup Guide (`00-setup-guide.md`, `order: 0`)
Step-by-step, beginner-friendly, **Windows first, then macOS notes**:
- **VS Code** + extensions (Live Server, Prettier, ESLint optional, GitLens optional); settings (auto-save, format on save)
- **Browser** (Chrome or Edge) and opening **DevTools**
- **Git** install and first-time config (`user.name`, `user.email`); **GitHub account** with a professional username and **two-factor authentication**
- **Node.js LTS** (needed from Week 8; verify with `node -v` and `npm -v`)
- A **free Supabase account** the student creates for themselves (needed Week 11; do not do the project setup yet)
- Folder organisation (`~/projects/web-dev/week-01`, etc.) and file-naming rules (lowercase, hyphens, no spaces)
- **Fallbacks for weak laptops or unreliable power/internet:** browser-based editors such as **StackBlitz** or **CodeSandbox**; offline-friendly habits (download docs, work on battery-saving mode, commit often, push when online). Mention that free-tier limits on online tools can change and should be checked.
- A **verification checklist** the student ticks and shows the facilitator

### Week 1: How the Web Works, HTML Basics & Git/GitHub
- Client, server, browser, URL, domain, hosting, HTTP in plain language (use a restaurant-ordering analogy)
- Frontend vs backend vs full-stack; what web developers actually do; job and freelance paths (**no salary claims**)
- HTML anatomy: elements, tags, attributes, nesting, comments, `<!DOCTYPE html>`, `<html lang>`, `<head>`, `<body>`
- Headings, paragraphs, lists, links (absolute vs relative paths), images (`alt`), `div`/`span`
- Project folder structure and file paths
- **Git basics:** `git init`, `status`, `add`, `commit`, `log`, `.gitignore`, connecting to GitHub, `push`; good commit messages
- **Publish on GitHub Pages** (Settings → Pages)
- Assignment: "About Me" page + the first Fresh Bites content page, published, with at least 8 meaningful commits

### Week 2: Semantic HTML, Forms & Accessibility
- Semantic elements (`header`, `nav`, `main`, `section`, `article`, `aside`, `footer`), heading hierarchy
- Tables (and when **not** to use them), `figure`/`figcaption`
- **Forms:** `form`, `label`, `input` types, `textarea`, `select`, `button`, `fieldset`/`legend`, `required`, `pattern`, `min/max`, `name` vs `id`, how forms submit
- **Accessibility basics:** alt text, labels, keyboard navigation, landmarks, colour contrast, link text; run **Lighthouse** and read the accessibility report
- Metadata: `<title>`, meta description, viewport, favicon, Open Graph basics
- Assignment: 4-page Fresh Bites HTML site (Home, Menu, About, Contact with a reservation form), valid and accessible, no CSS yet

### Week 3: CSS Fundamentals
- Linking CSS, selectors (element, class, id, descendant, pseudo-classes), **specificity** and the cascade
- **Box model** (`content`, `padding`, `border`, `margin`, `box-sizing: border-box`)
- Colour (hex, rgb, hsl), contrast, building a palette; typography (font families, sizes, line-height, web fonts, `rem`)
- Units (`px`, `rem`, `em`, `%`, `vw`, `vh`), backgrounds, borders, border-radius, shadows, transitions and hover states
- **CSS custom properties (variables)**
- Using **DevTools** to inspect and live-edit CSS
- Assignment: style the 4-page site with a consistent palette, typography scale and reusable classes

### Week 4: Layout & Responsive Design (Portfolio Project 1)
- `display`, normal flow, `position`, `z-index`
- **Flexbox** in depth (navigation bars, card rows, centring) and **CSS Grid** (menu grid, page layouts)
- **Mobile-first** design; media queries; breakpoints; responsive images (`max-width`, `srcset` intro); fluid typography with `clamp()`
- Common components: navbar (with a no-JS mobile pattern), hero, cards, footer
- Practice games: **Flexbox Froggy** and **Grid Garden** (free online)
- **Portfolio Project 1:** responsive Fresh Bites site tested at 360px, 768px and 1280px, live on GitHub Pages, with a README and screenshots; Lighthouse mobile scores reported

### Week 5: JavaScript I, Fundamentals
- Running JS (`<script>`, console, Node), `let`/`const`, data types, operators, template literals
- Conditionals, loops, **functions** (declarations, arrow functions), scope
- **Arrays and objects**; array methods (`forEach`, `map`, `filter`, `find`, `reduce`, `sort`); destructuring and spread (introductory)
- Reading error messages; `console.log` debugging; using the **debugger** in DevTools
- Practice built from the running project: price calculations in Naira, menu filtering by category, totals with discounts, formatting currency with `Intl.NumberFormat("en-NG", ...)`
- Assignment: a set of small programs plus a tested **menu data module** (array of menu objects)

### Week 6: JavaScript II, The DOM & Events (**Mid-Course Checkpoint**)
- What the DOM is; selecting elements (`querySelector`/`All`); changing text, attributes, classes (`classList`), styles
- **Events:** click, input, submit, keydown; `event.preventDefault()`; **event delegation**
- Creating and inserting elements; rendering a list from an array; toggling UI (menu, tabs, accordion)
- **Form handling and validation** with clear user messages
- Build: **menu filter by category + search + add-to-cart with running total**
- **Mid-course checkpoint (end of week):** 90-minute open-notes practical covering HTML structure, CSS layout, and JS logic (details in the week file: a rubric with scoring)

### Week 7: JavaScript III, Async, APIs & Storage (Portfolio Project 2)
- Synchronous vs asynchronous; callbacks to **promises** to `async/await`; `try/catch`
- **`fetch`**, JSON, HTTP methods and status codes, reading API docs
- Calling a **free, keyless public API** (e.g., **Open-Meteo** for Yenagoa's weather, **JSONPlaceholder** for practice). **Verify the current API URL format against the official docs before writing the code**, and never use APIs that need secret keys in this week.
- Handling loading, empty and error states
- `localStorage` (persist the cart), ES modules (`import`/`export`)
- **Portfolio Project 2:** Fresh Bites interactive app: filterable menu, cart saved in `localStorage`, validated order/reservation form, weather widget; live on GitHub Pages; README

### Week 8: Modern Tooling, Vite, Tailwind & Deployment
- Terminal basics (navigate, create, run); what **npm** and `package.json` are; installing packages
- **Vite** project setup (`npm create vite@latest`), dev server, build, preview; project structure
- **Tailwind CSS** (use the **current official installation method for Vite; check the docs**): utility classes, responsive prefixes, reusing components
- **Git workflow:** branches, pull requests, merging, resolving a simple conflict
- **Deployment:** GitHub Pages with a Vite base path, **plus** Netlify, Vercel or Cloudflare Pages (free tiers; mention limits can change); environment variables (`.env`, `VITE_` prefix); what must **never** be committed
- Writing a professional `README.md`
- Assignment: rebuild the Week 7 app with Vite + Tailwind, deployed, with a clean Git history on a feature branch merged via a pull request

### Week 9: React I, Components, Props & State
- Why React; thinking in components; **JSX**; project setup with Vite's React template
- Function components, **props**, children, **state with `useState`**, event handling, **lists and keys**, conditional rendering
- Lifting state up; component file organisation
- `useEffect` (introductory: side effects, dependency array, cleanup)
- Convert the Fresh Bites menu and cart into components (`MenuItem`, `MenuList`, `Cart`, `CategoryFilter`)
- Assignment: React menu and cart with the same behaviour as Week 7; short written reflection on vanilla JS vs React

### Week 10: React II, Routing, Forms & Data Fetching (Portfolio Project 3)
- **React Router** (use the current stable API; check docs): routes, links, layouts, 404
- **Controlled forms**, validation, form state
- Fetching data with `useEffect` + `fetch`; loading/error UI; custom hooks (introductory)
- Context for the cart (introductory); basics of keeping state manageable
- Folder structure for a growing app; accessibility in React; deploying a single-page app (handling refresh/404 on hosts)
- **Portfolio Project 3:** multi-page React Fresh Bites app (Home, Menu, Cart, Reservations, About), responsive, deployed, with README and screenshots

### Week 11: Databases & Authentication with Supabase (Portfolio Project 4)
> **Reminder: teach, don't touch.** Write instructions for the **student's own** Supabase account only (section 1, rule 2).
- Backend, database, API concepts; how a table maps to what they know (rows, columns, a spreadsheet); **link back to the SQL lessons** in the Data Analysis course where relevant
- Creating a free Supabase project (student's own), the **Table Editor**, a `reservations` table and a `menu_items` table; SQL Editor for the same
- **API keys:** the **anon (public) key** vs the **service_role key**. **Never put the service key in front-end code or Git.** Store the project URL and anon key in `.env` (Vite `VITE_` variables), and explain why `.env` is git-ignored
- **`@supabase/supabase-js`:** `select`, `insert`, filters, error handling
- **Row Level Security (RLS):** why it is required; a safe starter policy set (public can insert reservations; only authenticated users can read all). **Explain every policy line**, and give the SQL as copy-paste text for the student to run in their own SQL Editor
- **Authentication:** email/password sign-up and login, session handling, a simple protected "My reservations" page
- Handling errors, loading states, and input validation on both client and database sides
- **Portfolio Project 4:** Fresh Bites reservations saved in Supabase, with an auth-protected view; deployed; README explaining setup without leaking keys
- Free-tier caution: limits and pausing policies can change; check the current Supabase docs.

### Week 12: Capstone, Portfolio & Freelancing/Remote Readiness
- **Capstone options:** (A) a real small-business or organisation website for a local client **with written permission**; (B) a realistic case study (e.g., a school, church, or clinic website) with a written brief
- **Client skills:** discovery questions, scoping, simple pricing models, written proposals, **50% deposit before work starts**, contracts basics, handling feedback and change requests, handover and maintenance
- **Portfolio:** a personal portfolio site (built by the student, deployed), a polished GitHub profile README, pinned repos with READMEs and screenshots, a LinkedIn headline/About
- **Where to look:** Upwork, Fiverr, LinkedIn, local referrals, remote job boards. **Include the scam-awareness section** (never pay to get a job, cheque/overpayment scams, "trial projects" that are real work)
- **Interview prep:** common questions; explaining a project; a **live coding warm-up** (e.g., FizzBuzz-style logic, DOM task); how to talk about what you don't know
- **Final deliverables checklist**, the capstone **presentation rubric**, and the **in-person graduation session plan** (2 hours, mirroring the Data Analysis course)
- A **"What next"** roadmap (TypeScript, Node/Express, testing, Next.js, accessibility depth), clearly marked as optional further learning

---

## 7. Lesson Template (Every Weekly File Must Follow This)

Use the **same structure as the Data Analysis weekly lessons** (read three of them first). In order:

1. **Title (H1)** and a one-line **Goal:**
2. **Learning Objectives**: 4 to 6 measurable "can do" statements
3. **Tools to Install This Week** (if any)
4. **Pre-Session Resources (about 2 hours)**: **search phrases, not invented links**, e.g., *Search YouTube: "Kevin Powell CSS Flexbox tutorial"*. Only include direct URLs for **stable official documentation and sites** you are confident exist (e.g., `developer.mozilla.org`, `javascript.info`, `web.dev/learn`, `react.dev`, `freecodecamp.org`, `theodinproject.com`, `supabase.com/docs`, `tailwindcss.com/docs`, `docs.github.com`). Prefer these real YouTube channels by name: Kevin Powell, Traversy Media, The Net Ninja, Web Dev Simplified, Programming with Mosh, freeCodeCamp.org, Fireship, SuperSimpleDev, Bro Code, Coding Addict.
5. **Lessons** (numbered "Lesson 1, Lesson 2…"): short explanation, then **well-commented code**, then "what this does" explanation. Use **tables** for comparisons, **callouts** (see below) for tips and warnings, and a short **"Common mistakes"** list.
6. **Practice Exercises**: 5 to 8 graded from easy to stretch, all based on the Fresh Bites project where possible
7. **Weekly Assignment (Due Before Week N+1)**: exact deliverables, a **grading guide with percentages**, and a **"Definition of done"** checklist
8. **Mentoring Session Plan (90 min)**: a time-boxed table (review, live coding, pair work, code review, assignment brief)
9. **Facilitator Notes**: common student mistakes, how to coach, pitfalls (the website strips this section from public pages; keep the exact heading **"Facilitator Notes"**)
10. **Self-Check Questions**: 3 to 5 questions

**Length:** typically 2,000 to 3,500 words per week; code-heavy weeks may run longer. Quality over padding.

### Callout syntax (the site styles these)
Use blockquotes starting with a bold label: `> **Note:**`, `> **Tip:**`, `> **Warning:**`, `> **Important:**`, `> **Rule of thumb:**`, `> **Teaching tip:**` (the last one belongs inside Facilitator Notes only).

---

## 8. Writing Standards

- **Voice:** warm, clear, encouraging, practical. Explain jargon the first time it appears. Prefer short paragraphs and concrete examples.
- **Make students type code.** Say "type this, don't paste" for the first weeks and explain why.
- **Local context:** mention slow data, power cuts and phone-first users where relevant: *build for mobile, keep pages light, commit often, work offline when needed*. Use **Naira** and Nigerian examples (Yenagoa, Port Harcourt, Lagos) in sample data.
- **Accuracy:** use **current, stable** syntax and APIs. **Look up the latest official documentation** (web access, if available) for: Vite, Tailwind CSS, React, React Router, Supabase JS client, and any public API used, and follow current recommended install steps. If you cannot verify something, say so in the handoff report rather than guessing.
- **Security hygiene:** never show real keys; use placeholders such as `YOUR_SUPABASE_URL`; teach `.env` and `.gitignore` early.
- **No emoji** (site-wide rule). **No gold/yellow branding** references. **No job or income guarantees.**
- **Copyright:** write all explanations and exercises in your own words; do not copy tutorials, documentation text, or course content from elsewhere. Short code snippets that illustrate standard APIs are fine.
- **Consistent file and heading style** with the Data Analysis lessons (tables, fenced code with language tags, callouts).

---

## 9. Files to Create

```
src/content/courses/web-development/
├── _course.md                                   ← course landing page (see section 10)
├── 00-setup-guide.md
├── week-01-how-the-web-works-html-git.md
├── week-02-semantic-html-forms-accessibility.md
├── week-03-css-fundamentals.md
├── week-04-layout-responsive-design.md
├── week-05-javascript-fundamentals.md
├── week-06-javascript-dom-events.md
├── week-07-javascript-async-apis-storage.md
├── week-08-tooling-vite-tailwind-deployment.md
├── week-09-react-components-props-state.md
├── week-10-react-routing-forms-data.md
├── week-11-supabase-database-auth.md
└── week-12-capstone-portfolio-freelancing.md

public/downloads/web-development/
├── fresh-bites-content.zip                      ← brand brief, menu data (JSON + CSV), palette, SVG placeholders
├── week-04-starter.zip                          ← optional, only if it genuinely helps
├── week-07-menu-data.json
└── (other small starter files as needed)
```

### Starter files and solutions
- Provide **starter** files only (content, data, boilerplate). They must **work** (test with a local build/run).
- **Do not commit full solutions or answer keys** to this public repository. If you write solution code to verify your own lessons, put it in a **git-ignored** folder `_facilitator/web-development-solutions/` and tell the owner in the handoff report so they can store it privately. Add `_facilitator/` to `.gitignore`.
- The Week 6 checkpoint paper and marking rubric may be described in the lesson, but keep any **model answers** in `_facilitator/`.

---

## 10. Frontmatter (Follow the Site's Schema in `WEBSITE-BUILD-PROMPT.md` §5 Exactly)

### `_course.md`
```yaml
---
title: "Web Development Career Launch"
slug: web-development
status: available            # CHANGE from coming-soon
category: "Software & Web"
level: "Beginner"
duration: "12 weeks"
format: "Weekly lessons + in-person mentoring"
summary: "Go from zero to building and deploying real websites and web apps with HTML, CSS, JavaScript, React and Supabase."
outcomes:
  - "Build responsive, accessible websites from scratch"
  - "Write interactive JavaScript and call real APIs"
  - "Build and deploy a React app with Tailwind CSS"
  - "Save and protect data with Supabase (database and login)"
  - "Publish a 5-project portfolio and prepare for freelance or remote work"
tools: ["HTML", "CSS", "JavaScript", "Git & GitHub", "Tailwind CSS", "React", "Supabase"]
icon: "code-2"
order: 2
featured: true
---
```
The body of `_course.md` is the **course overview**: audience, outcomes, the weekly plan table (section 5), time budget, the running project, assessment and certification, tools, the honest-outcomes statement, and how mentoring works (mirror the Data Analysis overview). **Strip any "Facilitator Tips" section** from the public overview, or place it under a heading the site hides.

### Each lesson
```yaml
---
title: "CSS Fundamentals"                # no "Week N:" prefix
course: web-development
order: 3                                 # = week number (setup guide = 0)
week: 3
summary: "One-sentence goal for the week."
estimatedHours: 11
tools: ["VS Code", "Chrome DevTools"]
downloads:                               # only if files exist
  - label: "Fresh Bites content kit"
    href: "/downloads/web-development/fresh-bites-content.zip"
draft: false
---
```
The build **must fail** on missing fields or duplicate `order` values; fix any error rather than relaxing the schema.

---

## 11. Activate the Course on the Site

The course is **not finished until it is live on the site.**

1. Replace the existing "Coming soon" placeholder `_course.md` for `web-development` with the real one (status `available`).
2. Confirm the **Courses listing, Home page featured cards, course page, curriculum sidebar, previous/next buttons, "Mark as complete" and downloads boxes** all work for this course.
3. Make sure the **WhatsApp enroll button** and **JSON-LD `Course` data** use the new course's name.
4. Add this course's key resources (MDN, javascript.info, web.dev, react.dev, freeCodeCamp, The Odin Project, Flexbox Froggy, Grid Garden, Supabase docs, Tailwind docs, GitHub docs) to the **Resources** data file with categories and one-line descriptions.
5. Update the sitemap (automatic), check **internal links**, and run the full build and link check.
6. If the **student portal (Phase 4)** is already live: **do not** write to any database or touch Supabase. Just tell the owner that the slug `web-development` is ready so the course can be added in the admin dashboard when enrolling the student.
7. Spot-check Weeks 1, 4, 8 and 11 in the browser at 360px width: tables scroll, code blocks have Copy buttons, callouts render, no horizontal page scroll.

---

## 12. Order of Work (Commit After Each Step)

1. Read the three reference docs and **three Data Analysis lessons** (Week 2, Week 5, Week 11) for style
2. Create the **content kit** and downloads folder
3. Write **`_course.md`** and **`00-setup-guide.md`**
4. Write **Weeks 1 to 4**, build, check; commit
5. Write **Weeks 5 to 7** (including the mid-course checkpoint), build, check; commit
6. Write **Weeks 8 to 10**, verify tooling instructions against current official docs; commit
7. Write **Weeks 11 to 12**; commit
8. **Verify code** (section 14), then **activate** (section 11)
9. Final build, link check, handoff report

---

## 13. Handoff Report (Give This to the Owner When Finished)

1. A list of every file created, with word counts per lesson
2. How to preview locally and the live URL if deployed
3. **Verification results:** which code samples you ran or built, and which you could **not** verify (and why)
4. Any **version-sensitive instructions** (Vite, Tailwind, React Router, Supabase client) and the version/date you checked them against
5. Any default decisions you made from section 15
6. A note on where the **facilitator solutions** are (`_facilitator/`) and that they are **not** committed
7. Items the owner must supply (e.g., real contact details, a facilitator photo)
8. Suggestions: what to improve in a second pass

---

## 14. Quality Checklist (Run Before Declaring Done)

- [ ] `npm run build` passes; the content schema accepts every file; no broken internal links
- [ ] Every JavaScript snippet that can run in Node has been **run** and gives the output shown in the lesson
- [ ] Every HTML/CSS example has been checked in a browser or validated; the Fresh Bites starter and example projects **build and run**
- [ ] Vite, Tailwind, React Router and Supabase client steps match the **current** official docs
- [ ] Week 11 contains **no real keys, no owner project URL**, and clearly says the student uses their **own** account
- [ ] No answer keys or full solutions are committed (`_facilitator/` is git-ignored)
- [ ] No invented URLs: every direct link is to a stable official site or clearly marked "search for"
- [ ] No emoji, no job or income guarantees, no copied text
- [ ] The Facilitator Notes headings are exactly `Facilitator Notes` so the site hides them (and the build test passes)
- [ ] Tables and code blocks render properly on a 360px-wide screen
- [ ] The course shows as **Available** on Home, Courses and its own page

---

## 15. Open Decisions (Ask the Owner Early, in One Message)

Use the default if the owner says "use your judgment".

| # | Decision | Default |
|---|---|---|
| 1 | **Student's current level and goal** (complete beginner? freelance vs employment? any prior coding?) | Complete beginner; freelance and remote readiness |
| 2 | **Frontend-only, or include the Supabase backend week?** | Include Week 11 as specified |
| 3 | **React in Weeks 9 to 10, or deepen vanilla JavaScript instead?** | React as specified |
| 4 | **Student's laptop**: Windows or Mac, RAM, and reliable power/internet? (affects Week 8 tooling and the fallbacks) | Windows, mid-range, unreliable power |
| 5 | **Mentoring day/time** and whether sessions are all in person | Weekly 90-minute in-person |
| 6 | **Include WordPress** or no-code tools as an optional bonus week? | No |
| 7 | **Capstone client:** does the student already have a local business or organisation in mind? | Realistic case study unless a real client exists |
| 8 | **Business details for "Yenagoa Fresh Bites"** (keep fully fictional, or adapt a real business with permission?) | Fully fictional |

---

## 16. Do NOT

- Do not use any Supabase MCP tool or touch any Supabase account, project, branch or SQL execution
- Do not invent contact details, salaries, statistics, testimonials, job guarantees, or video URLs
- Do not copy third-party tutorials or documentation text
- Do not commit solutions, secrets, `.env` files, or private student information
- Do not change the site's design system, brand colours or fonts
- Do not remove or rename existing Data Analysis files
- Do not leave a failing build on `main`
