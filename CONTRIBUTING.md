# Adding and editing content

This guide is for the **owner / facilitator** — no coding needed. You add courses and
lessons by creating Markdown (`.md`) files and pushing them to GitHub. The site rebuilds
and publishes itself.

> A course = one **folder**. A lesson = one **Markdown file** inside that folder.
> The folder name becomes the web address, so keep it short and lowercase with hyphens
> (e.g. `web-development`).

---

## 1. Add a new course

1. In `src/content/courses/`, create a new folder, e.g. `web-development`.
2. Inside it, create a file called `_course.md` with this at the top (between the `---` lines):

   ```yaml
   ---
   title: "Web Development"
   slug: web-development        # MUST match the folder name
   status: available            # "available" or "coming-soon"
   category: "Engineering"
   level: "Beginner"            # Beginner | Intermediate | Advanced
   duration: "10 weeks"
   format: "Weekly lessons + mentoring"
   summary: "Build and deploy real websites from scratch."
   outcomes:
     - "Build responsive pages with HTML and CSS"
     - "Add interactivity with JavaScript"
   tools: ["HTML", "CSS", "JavaScript"]
   icon: "code"                 # a Lucide icon name (see https://lucide.dev/icons)
   order: 2                     # position in the course list
   featured: false
   ---

   Write the course overview here. This text shows on the course page.
   ```

3. For a **coming-soon** course, only these are required: `title`, `slug`, `status`,
   `category`, `summary`, `icon`, `order`. Set `status: coming-soon`.
4. Add lessons (next section). Done — commit and push (section 7).

---

## 2. Add a new lesson

1. Create a file in the course folder, named with its order, e.g.
   `week-01-getting-started.md`. The file name becomes the web address.
2. Put this at the top:

   ```yaml
   ---
   title: "Getting Started"
   course: web-development      # MUST match the course slug
   order: 1                     # position in the course (0 = setup/intro). Must be unique per course.
   week: 1                      # optional
   phase: "Foundations"         # optional; groups lessons on the course page
   summary: "What you'll build and how the course works."
   estimatedHours: 8            # optional
   tools: ["HTML", "CSS"]       # optional
   draft: false                 # true = hidden from the live site
   ---

   Write the lesson here in Markdown. Do NOT repeat the title as a heading —
   the page shows it for you.
   ```

> **Tip:** if the build fails with "lessons share order N", two lessons in the same course
> have the same `order`. Give them different numbers.

---

## 3. Edit an existing lesson

- Edit the `.md` file directly on GitHub (pencil icon) or on your computer, then push.
- Every published lesson has an **"Edit this page on GitHub"** link at the bottom that opens
  the right file (once the repo address is set in `src/config/site.ts`).

---

## 4. Add downloadable files (datasets, templates)

1. Put the file in `public/downloads/<course-slug>/`, e.g.
   `public/downloads/web-development/starter.zip`.
2. Reference it in the lesson's frontmatter:

   ```yaml
   downloads:
     - label: "Starter files (ZIP)"
       href: "/downloads/web-development/starter.zip"
   ```

They appear in a "Files for this lesson" box.

---

## 5. Callouts, tables and code blocks

**Callouts** — start a quote with a bold label and it becomes a styled box:

```markdown
> **Note:** Blue info box.
> **Tip:** Green tip box. ("Teaching tip" and "Rule of thumb" also work.)
> **Warning:** Amber box. ("Caution", "Important", "Privacy", anything about scams/dates too.)
```

**Tables** use normal Markdown; wide ones scroll sideways on phones automatically.

**Code blocks** use triple backticks with a language; a Copy button is added automatically:

~~~markdown
```sql
SELECT * FROM orders;
```
~~~

Keep content plain. **Do not use emoji.**

---

## 6. Update contact details, WhatsApp and social links

Open `src/config/site.ts` and edit the `contact` and `social` values. Anything left as
`"TODO"` is hidden automatically (no broken links). Set the WhatsApp number in international
format **without** the `+` (e.g. `2348012345678`).

Also set `repo.slug` there (e.g. `InnovaTechWorld/innovatech-knowledge-hub`) so the
"Edit on GitHub" links work.

---

## 7. Preview locally and publish

```powershell
npm run dev     # preview at http://localhost:4321
```

To publish:

```powershell
git add .
git commit -m "Add Web Development course"
git push
```

GitHub builds and deploys automatically in a minute or two.

---

## 8. What must never be committed

Do **not** add to this public repository:

- Signed agreements, commitment-fee or pricing documents
- Student names, phone numbers, emails, or any private student data
- Facilitator-only notes (keep them in `_import/`, which is git-ignored)
- `.env` files, passwords, API keys, or any secret (especially a Supabase `service_role` key)

---

## 9. Growth content (blog, forms, testimonials, showcase, certificates)

**Blog / Insights:** add a `.md` file to `src/content/insights/`. Frontmatter:

```yaml
---
title: "Your post title"
description: "One or two sentences for the listing and search."
publishDate: 2026-11-20
author: "David C. Igberi"   # optional
tags: ["careers"]           # optional
draft: false                # true = hidden from the live site
---

Write the article body in Markdown.
```

It appears on `/insights/` and in the RSS feed automatically.

**Contact form & newsletter:** both are **off** until you set a form service. In
`src/config/site.ts` set `forms.provider: "formspree"` and paste your Formspree endpoints
into `forms.contactEndpoint` / `forms.newsletterEndpoint`. Until then, the contact form is
hidden (the WhatsApp/email options still show) and the newsletter box doesn't appear.

**Testimonials:** edit `src/data/testimonials.ts`. Add entries **only with the person's
permission**. The section on the home page shows automatically once the list is non-empty.

**Student showcase:** edit `src/data/showcase.ts`. Add students **only with written
permission**. `/showcase` shows a "submit your project" message while the list is empty.

**Certificate verification:** edit `src/data/certificates.ts`. Store only the certificate ID,
name, course, and issue date — nothing more — and only with the learner's consent. Visitors
check an ID at `/verify`.

> **Important:** never invent testimonials, students, statistics, or certificates. See section 8.

## 10. Troubleshooting

| Message | What it means |
|---|---|
| `... is missing required field "level"` | An available course needs `level`, `duration`, `format`, `outcomes`. |
| `course "x" does not exist` | A lesson's `course:` doesn't match any course `slug`. Fix the spelling. |
| `lessons "a" and "b" share order N` | Two lessons in one course have the same `order`. Make them unique. |
| `broken internal link` | A link points somewhere that doesn't exist. Check the path. |
| `[supabase-guard] REFUSING TO CONTINUE` | `PUBLIC_SUPABASE_URL` is set to the wrong project. Unset it (Phases 1–3 need no Supabase). |

If you're stuck, run `npm run build` and read the first error message — it usually names the file.
