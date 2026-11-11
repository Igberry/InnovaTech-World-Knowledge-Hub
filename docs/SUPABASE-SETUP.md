# Supabase setup — student portal (Phase 4)

Beginner-friendly, screenshot-free steps. You do these **once**. Nothing here runs
automatically; you run the SQL yourself in your own Supabase project.

> **Safety:** use only your project `https://rrjyfrqidwndgfgdncnp.supabase.co`.
> Never share your database password or the **service_role** key. The website only
> ever needs the **Project URL** and the **anon public** key.

## 1. Open your project
1. Go to <https://supabase.com> and sign in to **your own** account.
2. Open the project `rrjyfrqidwndgfgdncnp`. If you can't see it, stop — don't create a new one; it means you're in the wrong account.
3. Save your database password somewhere safe (a password manager).

## 2. Create the tables and security rules
1. In the left menu: **SQL Editor** → **New query**.
2. Open `supabase/schema.sql` from this repo, copy everything, paste it in, and click **Run**.
3. You should see "Success". This creates all tables with Row Level Security on.

## 3. Turn off public sign-ups, set URLs
1. **Authentication → Providers → Email**: keep **Email** enabled; enable **magic link**.
2. **Authentication → Sign In / Providers** (or **Settings**) — choose your model:
   - **Open sign-up (default in this build):** keep **"Allow new users to sign up" ON** so students can
     self-register via the "Create an account" form on `/login` (they enter their name there). Leave
     `site.portal.allowSignups = true`.
   - **Invite-only:** turn **"Allow new users to sign up" OFF**, and set `site.portal.allowSignups = false`
     in `src/config/site.ts` to hide the sign-up form. Invited users still get in via the invite link
     and set their name + password on first login.
3. **Authentication → URL Configuration:**
   - **Site URL:** your live site. On Vercel this is served at the root, e.g.
     `https://innovatech-world-knowledge-hub.vercel.app/` (or your custom domain).
   - **Redirect URLs:** add these exact paths:
     - `https://innovatech-world-knowledge-hub.vercel.app/auth/callback/`
     - `https://innovatech-world-knowledge-hub.vercel.app/account/reset-password/`
     - For local testing (`npm run dev` serves under a sub-path by default):
       `http://localhost:4321/innovatech-knowledge-hub/auth/callback/` and
       `http://localhost:4321/innovatech-knowledge-hub/account/reset-password/`
     - Add your custom-domain versions too once you set one up.

## 4. Email delivery (recommended)
Supabase's built-in email is rate-limited and for testing only. For real use, set up **custom SMTP**:
1. Create a free account with an email service (e.g. **Resend**, **Brevo**, or **Mailgun**).
2. In Supabase: **Authentication → Emails → SMTP Settings**, enter the host, port, user and password from that service, and a sender address you control.
3. Send yourself a test invite to confirm it works.

## 5. Make yourself the admin
1. Create your own account: **Authentication → Users → Invite user**, enter your email, and accept the invite (set a password) — or log in once on the site with a magic link.
2. Open `supabase/make-admin.sql`, replace `OWNER_EMAIL_HERE` with your login email, and **Run** it in the SQL Editor.

## 6. Connect the website to Supabase (Vercel)
1. In Supabase: **Settings → API Keys**. Copy the **Project URL** and the **Publishable** key
   (`sb_publishable_…`, the new replacement for the anon key). **Not** the Secret / service_role key.
   - (The old anon key still works under the **Legacy API Keys** tab, but it's being retired end of 2026 — use the publishable key.)
2. In **Vercel → your project → Settings → Environment Variables**, add these to the **Production**
   environment (also tick **Preview** if you want the portal on preview deployments):
   - `PUBLIC_SUPABASE_URL` = `https://rrjyfrqidwndgfgdncnp.supabase.co`
   - `PUBLIC_SUPABASE_ANON_KEY` = the Publishable key
3. **Redeploy** so the vars apply: **Vercel → Deployments → latest → ⋯ → Redeploy** (or push any commit).
   The portal turns on automatically; without these variables the site still works as a public site.

> **Hosting on GitHub Pages instead?** Put the same two values in **GitHub → Settings → Secrets and
> variables → Actions → Variables**, then run the Pages workflow (**Actions → Deploy to GitHub Pages
> → Run workflow**). That workflow is manual-only now because the site is set up for Vercel.

## 7. Invite and enrol students
1. **Authentication → Users → Invite user** for each student.
2. Log in to the site as yourself, open **/admin/**, go to **Enrolments**, and enrol each student in their course.

## 8. Test with a second email
Log in as a test student, mark a lesson complete, submit an assignment link, then check it appears in **/admin/**. Approve it and confirm the student sees the feedback.

## 9. Run the security tests before launch
1. Create (by hand, in **Authentication → Users**) two test students and one test admin; run `make-admin.sql` for the admin's email.
2. Copy `supabase/tests/.env.test.example` to `supabase/tests/.env.test` and fill in the anon key and the three logins. **This file is git-ignored — never commit it.**
3. Run `npm run test:rls`. Every check must print **PASS**. If anything fails, do not launch — the data isn't safe yet.

## 10. Deleting a student's data
In **Authentication → Users**, delete the user. Their profile, progress, submissions, reviews and attendance are removed automatically (cascade). Keep a CSV export first if you need records.

## 11. Free-tier caution
Free Supabase projects can be **paused** after a period of inactivity. Check the current policy; keep the project active (or upgrade) once students depend on it. Export CSVs regularly from **/admin/** as your own backup.
