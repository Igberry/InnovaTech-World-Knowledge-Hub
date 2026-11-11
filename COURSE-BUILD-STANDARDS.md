# Course Build Standards (Shared by Every Course Prompt)

> **For:** Claude Code, working inside the InnovaTech World Knowledge Hub repository.
> **Read first, every time.** Each course prompt (`VA-LAUNCH-...`, `REMOTE-READY-...`, `AI-...`, `AUTOMATION-...`, `CYBERSECURITY-...`) tells you *what* to build. This file tells you *how* to build it.
> **Also read:** `WEBSITE-BUILD-PROMPT.md` (sections 0A, 5, 6, 7.5, 8) and **three existing Data Analysis lessons** for style.

---

## 0. How to Use (for the Owner)

1. Keep this file and the course prompts in the repo (e.g., in a `prompts/` folder). The Phase 1 website must already build.
2. **Disable the Supabase MCP server, and any other connected-account MCP servers (Google Drive, Calendar, Sheets, Zapier, etc.) for this session.** They may be linked to accounts that are not yours to modify.
3. Build **one course per Claude Code session** (start a fresh session for each) so quality stays high. Suggested order: Remote Ready, VA Launch, Artificial Intelligence, Automation, Cybersecurity.
4. Paste into Claude Code (replace the file name):

```
Read prompts/COURSE-BUILD-STANDARDS.md and prompts/<COURSE-PROMPT-FILE>.md fully, then read WEBSITE-BUILD-PROMPT.md
(sections 0A, 5, 6, 7.5, 8) and three existing Data Analysis lessons for style. Build the course exactly as specified,
in the order given. Run the site build after each batch, commit after each batch, and ask me before deciding anything
under "Open Decisions". Do not use any MCP tool connected to an external account. Give me the handoff report when done.
```

---

## 1. CRITICAL Safety Rules

1. **Supabase:** do not use any Supabase MCP tool; never create or modify any Supabase project, branch, database or SQL. The owner's only project is `https://rrjyfrqidwndgfgdncnp.supabase.co` and nothing in course-writing needs it. Never put that URL in lesson content.
2. **Other connected accounts:** do **not** use any MCP tool connected to external accounts (Google Drive, Google Sheets, Google Calendar, Zapier, email, etc.). Do not create files, automations, calendar events, emails, or sheets in anyone's account. Write instructions and downloadable files inside the repo only.
3. **Never invent** contact details, statistics, salaries, prices, testimonials, partnerships, job-placement claims, or **video/URL links**.
4. **Never commit** signed agreements, commitment-fee or pricing documents, student names or contact details, answer keys, `.env` files, or real API keys.
5. If anything unexpected appears (another project ref, an unfamiliar account, a tool asking to create something), **stop and ask the owner.**

---

## 2. Required Files for Every Course

```
src/content/courses/<slug>/
├── _course.md            ← course landing page + overview
├── 00-setup-guide.md     ← tools and accounts (use this name even if short)
├── week-01-<topic>.md
├── week-02-<topic>.md
└── ...                   ← one file per week
public/downloads/<slug>/  ← templates, checklists, small data files (CSV/MD/JSON)
```
- Folder name = **course slug** (must match exactly). Lesson `order` = week number (setup guide = 0).
- **Replace** any existing "Coming soon" placeholder for the course (keep its `title`, `category`, `icon` and `summary` unless the course prompt says otherwise).

---

## 3. Lesson Template (Every Weekly File)

Match the Data Analysis lessons. In order:

1. **H1 title** and a one-line **Goal:**
2. **Learning Objectives** (4 to 6 measurable "can do" statements)
3. **Tools / Accounts Needed This Week**
4. **Pre-Session Resources** (about 2 hours; see section 6 for link rules)
5. **Lessons** ("Lesson 1, Lesson 2…"): short explanation, examples, templates and scripts, tables for comparisons, callouts, and a **"Common mistakes"** list
6. **Practice Exercises** (5 to 8, easy to stretch)
7. **Weekly Assignment (Due Before Week N+1)**: exact deliverables, **grading guide with percentages**, and a **"Definition of done"** checklist
8. **Mentoring Session Plan** (time-boxed table; length is given in each course prompt)
9. **Facilitator Notes** (exact heading `Facilitator Notes`; the site hides this section from public pages)
10. **Self-Check Questions** (3 to 5)

**Length:** 1,800 to 3,500 words per weekly file. Quality over padding.

### Callouts (the site styles blockquotes that start with a bold label)
`> **Note:**` · `> **Tip:**` · `> **Warning:**` · `> **Important:**` · `> **Rule of thumb:**` · `> **Privacy:**`
(`> **Teaching tip:**` is allowed only inside Facilitator Notes.)

---

## 4. Frontmatter (Follow `WEBSITE-BUILD-PROMPT.md` §5 Exactly)

**Course (`_course.md`):** `title, slug, status: available, category, level, duration, format, summary, outcomes (4 to 6), tools, icon (Lucide name), order, featured`
**Lesson:** `title` (no "Week N:" prefix), `course`, `order`, `week`, `summary`, `estimatedHours`, `tools`, optional `downloads` (only for files that exist), `draft: false`

The build **fails** on missing fields or duplicate `order` values. Fix the content; never loosen the schema.

The body of `_course.md` is the **course overview**: audience, outcomes, weekly plan table, time budget, assessment and certification, tools, mentoring format, and an **honest-outcomes statement** (success = real skills, a portfolio, and consistent action, **not guaranteed jobs or income**). Do not include a facilitator-tips section in the public overview, or put it under a heading the site hides.

---

## 5. Writing Standards

- **Voice:** warm, clear, encouraging, practical. Explain jargon the first time. Short paragraphs, concrete examples.
- **Local context:** Nigerian examples (Yenagoa, Port Harcourt, Lagos), **Naira** pricing in examples, mobile-first habits, unreliable power and data (offline-friendly tips, low-data alternatives), and realistic payment options for freelancers (verify current options before naming them).
- **Accuracy and currency:** tools, prices, free tiers, policies, laws and certifications change. **Use web search (if available) to verify current facts**, and prefer **durable concepts over tool-specific clicks**. When a statement is time-sensitive, say "as of <Month Year>, check the current details". If you cannot verify something, say so in the handoff report rather than guessing.
- **No emoji. No gold/yellow branding references. No job, income, or certification-pass guarantees.**
- **Copyright:** original explanations and exercises. Do not copy tutorials, documentation, course content, or paywalled material. Short standard code snippets are fine.
- **Beginner-first:** never assume prior knowledge not taught earlier in the course. Cross-link to related InnovaTech courses instead of repeating content (use site-relative links).
- **Ethics and safety:** each course prompt lists its own extra rules. Follow them.

---

## 6. Resource and Link Rules

- **Videos:** give **search phrases** (e.g., *Search YouTube: "Alex The Analyst Excel pivot tables"*). Never invent video URLs. Name only channels you are confident exist.
- **Direct URLs:** only to **stable, official sites** you are confident exist (documentation sites, well-known learning platforms). If unsure, write the site name and tell the learner to search for it.
- Add each course's key resources to the site's **Resources** data file with category and a one-line description.

---

## 7. Downloads and Templates

- Provide useful **templates** as small files (CSV, Markdown, JSON, plain text) in `public/downloads/<slug>/`, and reference them in lesson `downloads` frontmatter. Test that they open correctly.
- **Starter files only.** Put model answers, full solutions, marking keys, and mock-interview answer sheets in a **git-ignored** folder `_facilitator/<slug>/` and tell the owner in the handoff report.
- Templates must use fictional data only and contain no private information.

---

## 8. Activation Checklist (Course Is Not Done Until Live)

1. `_course.md` has `status: available`; the placeholder is replaced
2. The course appears correctly on **Home, Courses listing, its course page**; curriculum sidebar, previous/next, mark-complete, and downloads boxes all work
3. The WhatsApp **Enroll** button uses the course name (not "waitlist")
4. JSON-LD `Course` data and sitemap include it
5. Resources data file updated
6. **Pricing is not shown** on the site unless the owner confirms it under Open Decisions
7. Build and link check pass; spot-check three lessons at **360px width** (tables scroll, code blocks have Copy buttons, callouts render)
8. If the student portal (Phase 4) is live: **do not write to any database**. Tell the owner the slug is ready to use when enrolling a student.

---

## 9. Quality Checklist

- [ ] `npm run build` passes; schema accepts every file; no broken internal links
- [ ] Every code snippet or formula that can be run or checked **has been**, and matches the output shown
- [ ] Every template/download opens and contains only fictional data
- [ ] Time-sensitive facts verified or clearly date-stamped; unverified items listed in the handoff report
- [ ] No answer keys or solutions committed (`_facilitator/` git-ignored)
- [ ] No invented URLs, no emoji, no guarantees, no copied text
- [ ] Heading `Facilitator Notes` used exactly, and the hiding test passes
- [ ] Course shows as **Available** everywhere

---

## 10. Handoff Report (Give to the Owner When Finished)

1. Files created, with word counts per lesson
2. How to preview, and the live URL if deployed
3. Verification results: what you checked, and what you could **not** verify (and why)
4. Time-sensitive facts and the date you checked them
5. Defaults you chose for Open Decisions
6. Location of facilitator solutions (not committed)
7. Items the owner must supply
8. Suggestions for a second pass

---

## 11. Order of Work (Commit After Each Step)

1. Read standards, the course prompt, the site docs, and three Data Analysis lessons
2. Create downloads and templates
3. Write `_course.md` and `00-setup-guide.md`
4. Write the weekly lessons in batches (about 3 to 4 per batch); build and check after each; commit
5. Verify content, then activate
6. Final build and link check; handoff report

---

## 12. Do NOT

- Use Supabase MCP tools or any connected-account MCP tool
- Invent facts, links, prices, contacts or claims
- Commit solutions, secrets, agreements, pricing documents or student data
- Change the site design system, brand colours or fonts
- Edit or rename other courses' files
- Leave a failing build on `main`
