---
title: "Databases & Authentication with Supabase"
course: web-development
order: 11
week: 11
phase: "Backend & Capstone"
summary: "Add a real database and user login to your app with Supabase: tables, security rules, and auth."
estimatedHours: 12
tools: ["Supabase (your own free account)", "React", "Vite"]
---

**Goal:** Give your Fresh Bites app a real backend — save reservations to a **database**, protect them
with **security rules**, and add **user login** — using your **own free Supabase account**. Ship
**Portfolio Project 4**.

> **You use your OWN account.** Everything this week happens in a free Supabase project **you** create.
> Never use anyone else's project. Never commit any real keys. These are the exact habits professionals
> live by.

This week connects to the SQL ideas from the Data Analysis course — a table is rows and columns, like a
spreadsheet, that your app can read and write safely.

## Learning Objectives

By the end of this week you can:

- Create a Supabase project, tables, and run SQL in the SQL Editor
- Read and write data from React with `@supabase/supabase-js`
- Explain the anon key vs the service_role key, and keep secrets out of your code
- Write Row Level Security (RLS) policies and explain each line
- Add email/password sign-up and login with a protected page

## Tools to Install This Week

A free **Supabase** account (from Week 0). The client library installs per-project.

## Pre-Session Resources (about 2 hours)

- Read: **supabase.com/docs** → "Getting Started with React", "Row Level Security", "Auth".
- Watch (search YouTube): *"Supabase crash course"* (recent), *"Web Dev Simplified Supabase"*.

## Lesson 1: Backend, database, API — the ideas

- A **backend** is the part of an app the user doesn't see: the database and the rules around it.
- A **database** stores data in **tables** (rows and columns) — like the spreadsheets you met in the
  Data Analysis course.
- Your React app talks to the database over an **API** (web requests). Supabase gives you a database, an
  auto-generated API, authentication, and security rules — a free backend without writing a server.

## Lesson 2: Create a project and tables

1. On **supabase.com**, create a **new project** (your own). Choose a region near Nigeria, set a strong
   database password, and save it safely.
2. Open the **Table Editor** → **New table**. Create a `reservations` table. Add columns:

| Column | Type | Notes |
|---|---|---|
| `id` | `uuid` | primary key, default `gen_random_uuid()` |
| `created_at` | `timestamptz` | default `now()` |
| `name` | `text` | |
| `guests` | `int2` | |
| `date` | `date` | |
| `notes` | `text` | nullable |

You can do the same in the **SQL Editor** instead:

```sql
create table public.reservations (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  guests int2 not null,
  date date not null,
  notes text
);
```

Make a `menu_items` table too (id, name, category, price) if you want to load the menu from the
database.

## Lesson 3: Connect from React — the keys

Install the client:

```bash
npm install @supabase/supabase-js
```

Find your keys in **Project Settings → API**. There are two:

| Key | Use | Safe in front-end code? |
|---|---|---|
| **anon / publishable** key | the public key your app uses in the browser | **Yes** — but only because RLS (Lesson 4) protects your data |
| **service_role / secret** key | full admin access, bypasses all security | **NEVER** — only on a server you control |

Put the public values in a git-ignored `.env`:

```
# .env  (never commit this)
VITE_SUPABASE_URL=YOUR_SUPABASE_URL
VITE_SUPABASE_ANON_KEY=YOUR_ANON_KEY
```

```js
// src/supabase.js
import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);
```

> **Warning:** The **service_role / secret key bypasses all security**. If it ever appears in front-end
> code or Git, anyone can read, change or delete all your data. Only ever use the **anon/publishable**
> key in the browser, and only with RLS turned on.

## Lesson 4: Read and write data

```js
import { supabase } from "./supabase";

// INSERT a reservation
async function createReservation(form) {
  const { data, error } = await supabase
    .from("reservations")
    .insert({ name: form.name, guests: form.guests, date: form.date, notes: form.notes })
    .select();
  if (error) throw error;
  return data;
}

// SELECT reservations
async function getReservations() {
  const { data, error } = await supabase
    .from("reservations")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data;
}
```

Every call returns `{ data, error }` — **always check `error`**. In React, call these from an event
handler (insert) or `useEffect` (read), tracking loading and error state as usual.

## Lesson 5: Row Level Security (RLS) — the rules

By default a new table is locked. **RLS** decides who can do what, enforced by the database itself — not
just your app. Turn it on and add policies. Run this in the SQL Editor and read each line:

```sql
-- Turn on Row Level Security for the table
alter table public.reservations enable row level security;

-- Anyone (even logged out) may CREATE a reservation (a public booking form)
create policy "Anyone can insert a reservation"
  on public.reservations
  for insert
  to anon, authenticated
  with check (true);

-- Only logged-in users may READ all reservations (e.g. the restaurant staff)
create policy "Authenticated users can read reservations"
  on public.reservations
  for select
  to authenticated
  using (true);
```

Line by line:

- `enable row level security` — nothing is allowed until a policy says so.
- `for insert ... with check (true)` — allow inserts for anyone; `with check` is the rule new rows must
  pass (here, always true).
- `for select ... to authenticated using (true)` — only signed-in users can read; `using` is the rule
  for which existing rows they can see.

> **Important:** RLS is why the public anon key is safe to ship. Without RLS, that key could read and
> write everything. Always enable RLS and test it with a logged-out and a logged-in user.

## Lesson 6: Authentication

Supabase Auth handles sign-up, login and sessions for you:

```js
// Sign up
const { error } = await supabase.auth.signUp({ email, password });

// Log in
const { error } = await supabase.auth.signInWithPassword({ email, password });

// Current user / session
const { data } = await supabase.auth.getSession();

// Log out
await supabase.auth.signOut();

// React to login/logout
supabase.auth.onAuthStateChange((event, session) => {
  // update your UI based on session
});
```

Build a simple **protected "Reservations list" page**: if there's no session, show the login form; if
there is, show the reservations (which RLS only lets logged-in users read). Validate inputs on the
client **and** rely on RLS on the database — defence in depth.

> **Note:** Supabase's free tier is generous but limits and pausing policies can change — check the
> current docs. Projects can pause after inactivity; just un-pause when you return.

## Common mistakes

- Committing `.env` (add it to `.gitignore` first).
- Using the service_role key in the browser (never).
- Forgetting to enable RLS (your data is wide open).
- Not checking the `error` returned from every Supabase call.

## Practice Exercises

1. **Easy:** Create your own Supabase project and a `reservations` table.
2. **Easy:** Add `.env` with your URL and anon key; create the `supabase` client.
3. **Medium:** Insert a reservation from your React form.
4. **Medium:** Enable RLS and add the insert + select policies; test them.
5. **Medium:** Add sign-up and login.
6. **Stretch:** Build a protected page that lists reservations only when logged in.
7. **Stretch:** Load the menu from a `menu_items` table instead of a local file.

## Weekly Assignment — Portfolio Project 4 (Due Before Week 12)

**Fresh Bites reservations saved to a database, with login.**

1. Your own Supabase project; a `reservations` table with **RLS enabled** and explained policies.
2. The reservation form inserts to the database (with error handling).
3. Email/password **sign-up and login**; a **protected** reservations list.
4. Deployed; `.env` git-ignored; **no keys in the repo**.
5. A README explaining how to set up the project (using placeholders, never real keys).

**Grading guide (100%):**

| Criteria | % |
|---|---|
| Table + working insert from the app | 20 |
| RLS enabled with correct, explained policies | 25 |
| Auth: sign-up, login, protected read | 25 |
| Secrets handled correctly (no keys committed; anon key only) | 20 |
| Deployed; README with safe setup steps | 10 |

**Definition of done:**

- [ ] Reservations save to your Supabase table
- [ ] RLS is on; you can explain each policy line
- [ ] Login works; the reservations list is protected
- [ ] `.env` is git-ignored; no real keys anywhere in the repo
- [ ] Deployed; README explains setup with placeholders

## Mentoring Session Plan (90 min)

| Time | Activity |
|---|---|
| 0–10 | Review Portfolio Project 3 |
| 10–30 | Live: create a project + table; insert from the app |
| 30–55 | Live: enable RLS, write and test policies (logged out vs in) |
| 55–80 | Live: add sign-up/login and a protected page |
| 80–90 | Brief Portfolio Project 4; stress the key-safety rules |

## Facilitator Notes

The non-negotiable teaching points are the two keys (make students recite "service_role never touches
the browser") and enabling RLS (demo what happens with it off — the anon key reads everything). Watch
for committed `.env` files; check `git status` with them before any push. Link back to the Data Analysis
SQL lessons for students who took it. This is instruction for the student's **own** account only — there
is no shared or demo project. Keep any solution code in `_facilitator/`.

## Self-Check Questions

1. What is the difference between the anon key and the service_role key?
2. Why is the public anon key safe to use in the browser — what protects your data?
3. What does `enable row level security` do, and why add policies after it?
4. Where do your Supabase URL and key go, and why is `.env` git-ignored?
5. How do you protect a page so only logged-in users can see it?
