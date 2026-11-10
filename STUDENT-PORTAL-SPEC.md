# Student Portal Spec — Login & Progress Tracking (Phase 4)

> **Read with:** `WEBSITE-BUILD-PROMPT.md`. Build this **only after Phase 1 is live** (Phase 2 can run in parallel if the owner wants).
> **Backend:** **Supabase** (Auth + Postgres + Row Level Security). **Not Google Sheets.** See section 1.

---

> **CRITICAL: Target project.** This portal uses **only** the owner's Supabase project:
> **URL:** `https://rrjyfrqidwndgfgdncnp.supabase.co`  |  **ref:** `rrjyfrqidwndgfgdncnp`
> Claude Code may be connected via MCP to a **different, unrelated Supabase account.** Follow **section 0A of `WEBSITE-BUILD-PROMPT.md`** strictly: **never use Supabase MCP tools, never create projects/branches, never run SQL automatically, never request the `service_role` key.** Write files and instructions; the owner runs SQL manually in their own SQL Editor.

## 1. Why Supabase, and What Google Sheets Is For

| | Google Sheets | Supabase |
|---|---|---|
| Safe place for logins | **No.** No password hashing, no per-user access rules; reaching it from a website means publishing an Apps Script URL or a sheet that anyone with the link can read or edit | **Yes.** Built-in Auth (passwords hashed, magic links, sessions) |
| Per-student privacy | Not enforceable | Enforced in the database by **Row Level Security (RLS)** |
| Works from a static site | Awkward and insecure | Yes, via `@supabase/supabase-js` |
| Cost | Free | Free tier is enough for small cohorts (check current limits) |

**Decision:** Supabase holds student accounts and progress.
**Google Sheets' role (optional):** the owner's reporting copy. The admin dashboard has an **Export CSV** button; the owner can open that in Google Sheets or Excel. **Never store passwords, or any login data, in a sheet.**

---

## 2. What the Portal Does (Scope)

**Students can:**
- Log in (invite-only) and see **My Learning**: enrolled courses, progress bars, next lesson
- Mark lessons complete (progress follows them across devices)
- Submit assignments as a **link** (GitHub, Google Drive, Kaggle, etc.) plus a short note
- See reviewer **feedback and status** on their submissions
- See their own attendance record

**The facilitator (admin) can:**
- See every student, their progress per course, and a last-activity date
- Review submissions: approve or request changes, add a score and feedback
- Record attendance for each mentoring session
- Enrol, pause, or complete a student's course
- **Export** progress, submissions and attendance as CSV

**Out of scope for now:** payments, in-app file uploads (links only), chat, certificates with personal data (see Phase 3 verification note), public student profiles.

---

## 3. Critical Design Decision: Lesson Content Stays Public

The site is static. **Any lesson hidden only by a client-side login check can still be read** from the page source or the GitHub repo. So:

- **Default (recommended):** lessons remain **public** (good for marketing and search). The **login protects progress, submissions, feedback and attendance**, which is where real student data lives.
- **If paid/students-only lessons are required later:** options are (a) host on Cloudflare Pages with **Cloudflare Access** in front, (b) store lesson bodies in Supabase behind RLS and render them client-side (slower, worse SEO), or (c) keep premium lessons in a private repo and deploy a separate private site. Present these to the owner and let them choose; do **not** pretend a front-end check is security.

---

## 4. Auth Design

- **Invite-only.** In Supabase **Authentication → Providers/Settings**, **disable public sign-ups.** The owner invites each student by email from the Supabase dashboard (**Authentication → Users → Invite user**). This is right for a cohort of 2 to 20 students.
- **Login methods:** email + password **and** email magic link (passwordless). Offer **"Sign in with Google"** only if the owner enables it.
- **Password rules:** minimum 8 characters; leave Supabase's defaults for hashing and sessions. Never build custom password storage.
- **Email delivery:** Supabase's built-in email sender is heavily rate-limited and meant for testing. For real use, the owner should configure a **custom SMTP provider** (e.g., Resend, Brevo, or Mailgun free tiers). Document the steps in `docs/SUPABASE-SETUP.md`.
- **Redirect URLs:** set **Site URL** and **Redirect URLs** in Supabase to the live site, including the GitHub Pages base path and later the custom domain, plus `http://localhost:4321` for development.
- **Roles:** there are two: *student* (default) and *admin*. Admin status is stored in a separate `admins` table (see schema) that students can never write to. **Never** store the role in a column a student can edit, or in user metadata they can change.

---

## 5. Database Schema and Security (Supabase SQL)

Save as `supabase/schema.sql`, plus a copy of each section as a numbered migration in `supabase/migrations/`. The owner runs it once in **Supabase → SQL Editor**.

> **Rule:** RLS is enabled on **every** table. No table is readable or writable by the `anon` role.

```sql
-- =====================================================================
-- InnovaTech World Knowledge Hub — student portal schema
-- =====================================================================

-- ---------- Tables ----------
create table public.profiles (
  id          uuid primary key references auth.users(id) on delete cascade,
  full_name   text not null default '',
  cohort      text,
  created_at  timestamptz not null default now()
);

create table public.admins (
  user_id uuid primary key references auth.users(id) on delete cascade
);

create table public.enrollments (
  user_id      uuid not null references auth.users(id) on delete cascade,
  course_slug  text not null,
  status       text not null default 'active'
               check (status in ('active','paused','completed')),
  enrolled_at  timestamptz not null default now(),
  primary key (user_id, course_slug)
);

create table public.lesson_progress (
  user_id      uuid not null references auth.users(id) on delete cascade,
  course_slug  text not null,
  lesson_slug  text not null,
  status       text not null default 'completed'
               check (status in ('in_progress','completed')),
  updated_at   timestamptz not null default now(),
  primary key (user_id, course_slug, lesson_slug)
);

create table public.submissions (
  id            uuid primary key default gen_random_uuid(),
  user_id       uuid not null references auth.users(id) on delete cascade,
  course_slug   text not null,
  lesson_slug   text not null,
  link_url      text,
  note          text,
  submitted_at  timestamptz not null default now(),
  check (link_url is not null or note is not null),
  check (link_url is null or link_url ~* '^https?://')
);

create table public.reviews (
  submission_id uuid primary key references public.submissions(id) on delete cascade,
  reviewer_id   uuid not null references auth.users(id),
  status        text not null check (status in ('approved','needs_changes')),
  score         numeric(5,2) check (score between 0 and 100),
  feedback      text,
  reviewed_at   timestamptz not null default now()
);

create table public.attendance (
  id            uuid primary key default gen_random_uuid(),
  user_id       uuid not null references auth.users(id) on delete cascade,
  course_slug   text not null,
  session_date  date not null,
  status        text not null check (status in ('present','absent','excused')),
  note          text,
  unique (user_id, course_slug, session_date)
);

create index on public.lesson_progress (user_id);
create index on public.submissions (user_id);
create index on public.attendance (user_id);

-- ---------- Helper: is the current user an admin? ----------
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (select 1 from public.admins where user_id = auth.uid());
$$;
revoke all on function public.is_admin() from public, anon;
grant execute on function public.is_admin() to authenticated;

-- ---------- Auto-create a profile when an account is created ----------
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, coalesce(new.raw_user_meta_data->>'full_name', ''));
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ---------- Turn on Row Level Security everywhere ----------
alter table public.profiles        enable row level security;
alter table public.admins          enable row level security;   -- no policies: unreadable by clients
alter table public.enrollments     enable row level security;
alter table public.lesson_progress enable row level security;
alter table public.submissions     enable row level security;
alter table public.reviews         enable row level security;
alter table public.attendance      enable row level security;

-- ---------- Start from zero privileges, then grant only what is needed ----------
revoke all on public.profiles, public.admins, public.enrollments, public.lesson_progress,
              public.submissions, public.reviews, public.attendance
  from anon, authenticated;

-- profiles: read own (admin reads all); students may edit ONLY their name
grant select on public.profiles to authenticated;
grant update (full_name) on public.profiles to authenticated;
create policy profiles_select on public.profiles for select to authenticated
  using (id = (select auth.uid()) or public.is_admin());
create policy profiles_update_own on public.profiles for update to authenticated
  using (id = (select auth.uid())) with check (id = (select auth.uid()));

-- enrollments: students read own; only admin writes
grant select, insert, update, delete on public.enrollments to authenticated;
create policy enrollments_select on public.enrollments for select to authenticated
  using (user_id = (select auth.uid()) or public.is_admin());
create policy enrollments_admin_write on public.enrollments for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

-- lesson_progress: students manage own; admin reads all
grant select, insert, update, delete on public.lesson_progress to authenticated;
create policy progress_select on public.lesson_progress for select to authenticated
  using (user_id = (select auth.uid()) or public.is_admin());
create policy progress_insert on public.lesson_progress for insert to authenticated
  with check (user_id = (select auth.uid()));
create policy progress_update on public.lesson_progress for update to authenticated
  using (user_id = (select auth.uid())) with check (user_id = (select auth.uid()));
create policy progress_delete on public.lesson_progress for delete to authenticated
  using (user_id = (select auth.uid()));

-- submissions: students insert/read own, and edit only until reviewed; admin reads all
grant select on public.submissions to authenticated;
grant insert (user_id, course_slug, lesson_slug, link_url, note) on public.submissions to authenticated;
grant update (link_url, note) on public.submissions to authenticated;
create policy submissions_select on public.submissions for select to authenticated
  using (user_id = (select auth.uid()) or public.is_admin());
create policy submissions_insert on public.submissions for insert to authenticated
  with check (user_id = (select auth.uid()));
create policy submissions_update on public.submissions for update to authenticated
  using (user_id = (select auth.uid())
         and not exists (select 1 from public.reviews r where r.submission_id = submissions.id))
  with check (user_id = (select auth.uid()));

-- reviews: students read reviews of their own submissions; only admin writes
grant select, insert, update, delete on public.reviews to authenticated;
create policy reviews_select on public.reviews for select to authenticated
  using (public.is_admin()
         or exists (select 1 from public.submissions s
                    where s.id = reviews.submission_id and s.user_id = (select auth.uid())));
create policy reviews_admin_write on public.reviews for all to authenticated
  using (public.is_admin()) with check (public.is_admin() and reviewer_id = (select auth.uid()));

-- attendance: students read own; only admin writes
grant select, insert, update, delete on public.attendance to authenticated;
create policy attendance_select on public.attendance for select to authenticated
  using (user_id = (select auth.uid()) or public.is_admin());
create policy attendance_admin_write on public.attendance for all to authenticated
  using (public.is_admin()) with check (public.is_admin());
```

### Make the owner an admin (run once, after the owner's account exists)
```sql
insert into public.admins (user_id)
select id from auth.users where email = 'OWNER_EMAIL_HERE';
```

### Notes for Claude Code
- **Do not run this SQL yourself against any Supabase project.** Review it carefully by reading it, and if you want to test it, use only a **local** throwaway Postgres (e.g., Docker or the Supabase CLI's local stack) with no link to any hosted project. Fix any syntax issue before telling the owner to run it in **their** SQL Editor. Keep the **security intent** exactly: students can only ever touch their own rows; they can't grant themselves admin, edit scores, or write attendance.
- **Course and lesson slugs** match the Markdown folder and file names. Lesson content is **not** stored in the database.
- Keep a `supabase/README.md` explaining the tables in plain language.

---

## 6. Front-End Implementation

**Libraries:** `@supabase/supabase-js` only. Write the portal as small TypeScript modules and Astro components with minimal client-side JavaScript. Do not add React just for this.

### 6.1 Configuration
- `src/lib/supabase.ts` creates **one** client from `PUBLIC_SUPABASE_URL` and `PUBLIC_SUPABASE_ANON_KEY` (Astro `import.meta.env`). The URL must be exactly `https://rrjyfrqidwndgfgdncnp.supabase.co`; `.env.example` ships with that URL and a placeholder for the anon key (`PUBLIC_SUPABASE_ANON_KEY=PASTE_ANON_KEY_HERE`).
- **Target guard:** `scripts/check-supabase-target.mjs` runs before `dev` and `build` and fails if `PUBLIC_SUPABASE_URL` is set and is not `https://rrjyfrqidwndgfgdncnp.supabase.co`. Also fail the build if the placeholder key is used in a production build when the portal is enabled.
- The **anon key is designed to be public**, but it is only safe because RLS is on. **Never** put the `service_role` key in the repo, the front end, GitHub Actions variables used by the build, or documentation. Add a build check that fails if a string resembling a service-role key is found in `dist/`.
- Store the two public values as **GitHub Actions repository variables** and read them in the deploy workflow. Provide `.env.example` and add `.env` to `.gitignore`.
- If the variables are missing (e.g., a contributor's local copy), the site must still build and work as a public site with the portal features hidden.

### 6.2 Pages (all must respect the base path)
| Route | Purpose |
|---|---|
| `/login/` | Email + password form, "Email me a login link" option, "Forgot password" link. Clear error messages. |
| `/auth/callback/` | Handles magic-link and password-reset redirects |
| `/account/` | **My Learning:** enrolled courses, progress bars, "Continue" button, my submissions with feedback, my attendance, profile name |
| `/account/reset-password/` | Set a new password |
| `/admin/` | **Facilitator dashboard** (admins only): see section 6.4 |

Add "Log in" / "My Learning" to the header (shows the right one depending on session). Show the student's name and a log-out button.

### 6.3 Progress and Submissions
- **Mark as complete** on a lesson: if logged in, write to `lesson_progress` (upsert on the composite key); if logged out, keep using `localStorage` and show a gentle "Log in to save your progress across devices" note.
- **On first login:** merge any `localStorage` progress into the database (only for courses the student is enrolled in), then stop using local storage for that user.
- **Assignment box** at the bottom of each lesson that has a "Weekly Assignment" section (visible only when logged in and enrolled): link field (must start with `http`), optional note, Submit button. After submit show status: *Submitted*, *Approved*, or *Needs changes* + the feedback and score.
- Optimistic UI, but always handle errors: failed requests show a retry message and never silently lose data. Wrap every Supabase call in try/catch.
- Course page shows **progress %** = completed lessons ÷ total lessons (count from the content collection at build time).

### 6.4 Admin Dashboard (`/admin/`)
Visible only if `is_admin()` returns true (call `supabase.rpc('is_admin')`. **The real protection is RLS**, since the UI guard is only for convenience). Sections:
1. **Students table:** name, email*, cohort, courses, progress %, last activity, status (active/paused)
2. **Student detail:** lesson-by-lesson progress, submissions, attendance
3. **Submissions queue:** newest first; open a submission, mark *Approved* or *Needs changes*, add score and feedback (writes to `reviews`)
4. **Attendance:** pick course and date, mark each student present/absent/excused
5. **Enrolments:** enrol, pause or complete a student
6. **Export CSV:** progress, submissions, attendance

*Email lives in `auth.users`, which the browser cannot read. Show names from `profiles`; if the owner wants emails in the dashboard, add an `email` column to `profiles` populated by the trigger (copy from `new.email`). This is acceptable because RLS limits who can read it.

### 6.5 UX Rules
- Brand and typography unchanged (royal blue and white, Poppins).
- Mobile-first. Forms are accessible: labels, error text tied with `aria-describedby`, focus management.
- Show friendly empty states ("You are not enrolled in any course yet. Contact your facilitator on WhatsApp.").
- Public pages must not load the portal JavaScript unless needed (load it only on `/login`, `/account`, `/admin` and the lesson progress/assignment widgets).

---

## 7. Security Checklist

- [ ] RLS enabled on every table; no `anon` access to any table
- [ ] Public sign-ups disabled; users are invited by the owner
- [ ] `service_role` key is nowhere in the repo, build, or browser
- [ ] Students cannot: read others' data, change their own role, write scores/attendance/enrolments, or edit a submission after review
- [ ] **Automated RLS test:** `supabase/tests/rls.test.*` proves each rule above and prints PASS/FAIL. It must **not** use the `service_role` key and must **not** create users itself. The **owner** creates two test students and one test admin by hand in the Supabase dashboard (**Authentication → Users**) and puts their emails/passwords only in a git-ignored `.env.test`. The test signs in as each user with the anon key and checks what each can and cannot read or write. Run it before launch and after any schema change.
- [ ] No sensitive data in URLs or `localStorage` beyond the Supabase session
- [ ] Submission links are validated (`http/https` only) and rendered with `rel="noopener noreferrer"` and never auto-loaded in iframes
- [ ] Strong, unique password on the owner's Supabase and GitHub accounts, with **two-factor authentication enabled** on both
- [ ] Rate limiting and CAPTCHA considered for the login form if sign-ups are ever opened

---

## 8. Privacy and Compliance (Nigeria)

Student names, emails, progress and attendance are **personal data**. Nigeria's data protection law (the Nigeria Data Protection Act 2023, overseen by the NDPC) applies. This is not legal advice, but build in these basics:

- **Collect the minimum:** name, email, course progress, submissions, attendance. No phone numbers, addresses, or ID numbers.
- **Privacy notice** page (`/privacy/`) in plain English: what is collected, why, who can see it (student and facilitator), how long it's kept, how to request deletion. The owner supplies the final wording and contact details; Claude Code provides a **draft with `TODO` markers**.
- **Consent:** the first login shows a short consent checkbox (stored with a timestamp in `profiles`: add `consented_at timestamptz`).
- **Deletion:** the owner can delete a user in Supabase and the data cascades away. Document the steps in `docs/SUPABASE-SETUP.md`.
- **No public display** of student names or progress. The Phase 3 "Student showcase" and "Certificate verification" features require **separate written permission** from each student.
- **Backups:** the owner should export CSVs regularly (the admin Export button) and check what automatic backups the current Supabase plan includes.

---

## 9. Operational Notes for the Owner (Put in `docs/SUPABASE-SETUP.md`)

Write these as **numbered, screenshot-free, beginner-friendly steps:**
1. The Supabase project already exists: **`https://rrjyfrqidwndgfgdncnp.supabase.co`**. Confirm you are logged in to **your own** Supabase account (not any other) and open that project. Save the database password somewhere safe
2. Run `supabase/schema.sql` in the SQL Editor
3. Disable public sign-ups; configure Site URL and Redirect URLs
4. Configure custom SMTP (recommended)
5. Create the owner account, then run the "make the owner an admin" SQL
6. Copy the **Project URL** and **anon public key** into GitHub (**Settings → Secrets and variables → Actions → Variables**) as `PUBLIC_SUPABASE_URL` and `PUBLIC_SUPABASE_ANON_KEY`
7. Invite the first students; enrol them (via the admin dashboard)
8. Test with a second email address: log in, mark a lesson complete, submit a link, check the admin view
9. **Free-tier caution:** free Supabase projects can be paused after a period of inactivity. Check the current policy and either keep the project active or upgrade when students depend on it.

---

## 10. Phase 4 Delivery Checklist

- [ ] `supabase/schema.sql`, migrations, `supabase/README.md`, `supabase/tests/`
- [ ] `docs/SUPABASE-SETUP.md`
- [ ] Login, callback, reset-password, account, admin pages
- [ ] Lesson progress sync and `localStorage` merge
- [ ] Assignment submission box and feedback display
- [ ] Admin dashboard with review, attendance, enrolments, CSV export
- [ ] Privacy page draft and first-login consent
- [ ] RLS tests passing, with the results reported to the owner
- [ ] Lighthouse re-run (public pages must not regress)
- [ ] Final handoff: list every `TODO`, every manual step the owner must do in Supabase, and any default decisions made
