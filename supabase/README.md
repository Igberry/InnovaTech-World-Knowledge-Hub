# Supabase — student portal database

This folder holds the **SQL and tests** for the Phase 4 student portal. Nothing here runs
automatically. **You** run the SQL by hand in the Supabase SQL Editor for your project
(`https://rrjyfrqidwndgfgdncnp.supabase.co`). Full steps: [`docs/SUPABASE-SETUP.md`](../docs/SUPABASE-SETUP.md).

## Files
- `schema.sql` — creates all tables, security rules, and helpers. Run once.
- `migrations/0001_init.sql` — the same content as a numbered migration.
- `make-admin.sql` — makes your account an admin (run after your account exists).
- `tests/rls.test.mjs` — checks the security rules are working (see below).

## The tables, in plain language
| Table | What it holds | Who can see it | Who can change it |
|---|---|---|---|
| `profiles` | Each user's name, email, cohort, consent date | The user (their own) + admin | The user edits only their own name/consent |
| `admins` | Which users are facilitators | No one via the website | No one via the website (set by SQL) |
| `enrollments` | Which courses a student is on, and status | The student (own) + admin | Admin only |
| `lesson_progress` | Which lessons a student finished | The student (own) + admin | The student (their own) |
| `submissions` | Assignment links + notes a student sent | The student (own) + admin | The student, until it's reviewed |
| `reviews` | Approve / needs-changes, score, feedback | The student (their own) + admin | Admin only |
| `attendance` | Present / absent per mentoring session | The student (own) + admin | Admin only |
| `certificates` | Graduate records (code, name, course, duration, date) | **Nobody can list all**; anyone can verify ONE by its exact code via the `verify_certificate` function | Admin only (issue from `/admin` → Certificates) |

**Row Level Security (RLS)** is on for every table, so these rules are enforced by the database
itself — not just the website. A student can never read another student's data, make themselves
an admin, change a score, or write attendance.

Lesson *content* is **not** stored here. It lives in the Markdown files. Only progress and
student data live in the database. Course and lesson slugs here match the Markdown folder/file names.

## Running the security tests
See `tests/rls.test.mjs`. It signs in as test users with the **public anon key** (never the
service_role key) and checks what each can and cannot do. You create the test users by hand first
(the test never creates users). Steps are in the test file header and in `docs/SUPABASE-SETUP.md`.
