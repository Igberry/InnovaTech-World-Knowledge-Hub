---
title: "Databases & Authentication with Supabase"
course: web-development
order: 11
week: 11
phase: "Backend & Capstone"
summary: "Give your app a real backend: save reservations to a database, protect them with security rules, and add user login, all in your own free account."
estimatedHours: 12
tools: ["Supabase (your own free account)", "React", "Vite"]
---

**Goal:** Give your Fresh Bites app a real backend, save reservations to a **database**, protect them with
**security rules**, and add **user login**, using your **own free Supabase account**. Ship **Portfolio
Project 4**. You wire up a genuine full-stack feature by hand.

> **You use your OWN account.** Everything this week happens in a free Supabase project **you** create.
> Never use anyone else's project. Never commit any real keys. These are the exact habits professionals
> live by.

## What you'll be able to do

- Create a Supabase project, tables, and run SQL in the SQL Editor
- Read and write data from React with `@supabase/supabase-js`
- Explain the anon key vs the service_role key, and keep secrets out of your code
- Write Row Level Security (RLS) policies and explain each line
- Add email/password sign-up and login with a protected page

## Before you start (about 10 minutes)

- You created a free Supabase account in Week 0. The client library installs per project.
- If you took the Data Analysis course, keep those SQL ideas in mind, a table is rows and columns, like a
  spreadsheet your app can read and write safely.
- Warm-up (2 minutes): log in to supabase.com and look at the dashboard. You're about to fill it with your
  own data.

## Try it 1 - Create a project and a table

**Why it matters:** the table is where real data lives. You can build it by clicking or with SQL.

**Do this now:**
1. On **supabase.com**, create a **new project** (your own). Pick a region near Nigeria, set a strong
   database password, and save it safely.
2. Open the **SQL Editor** and run:

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

**You've got it when:** your `reservations` table appears in the Table Editor with those columns.

## Try it 2 - Connect from React with the right key

**Why it matters:** your app talks to Supabase with a public key, and knowing which key is which is a
non-negotiable safety habit.

**Do this now:**
1. Install the client: `npm install @supabase/supabase-js`
2. Find your keys in **Project Settings, API**:

| Key | Use | Safe in front-end code? |
|---|---|---|
| **anon / publishable** key | the public key your app uses in the browser | **Yes**, but only because RLS protects your data |
| **service_role / secret** key | full admin access, bypasses all security | **NEVER**, only on a server you control |

3. Put the public values in a git-ignored `.env` and create the client:

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

**You've got it when:** your app has a working `supabase` client and `.env` is listed in `.gitignore`.

> **Warning:** the **service_role / secret key bypasses all security**. If it ever reaches front-end code or
> Git, anyone can read, change or delete everything. Only use the **anon/publishable** key in the browser,
> and only with RLS on.

## Try it 3 - Write and read data

**Why it matters:** this is the live link between your form and the database.

**Do this now:**

```js
import { supabase } from "./supabase";

async function createReservation(form) {
  const { data, error } = await supabase
    .from("reservations")
    .insert({ name: form.name, guests: form.guests, date: form.date, notes: form.notes })
    .select();
  if (error) throw error;
  return data;
}

async function getReservations() {
  const { data, error } = await supabase
    .from("reservations").select("*").order("created_at", { ascending: false });
  if (error) throw error;
  return data;
}
```

1. Submit your reservation form and check the row appears in the Supabase Table Editor.

**You've got it when:** a form submission creates a real row you can see in Supabase. Every call returns
`{ data, error }`, always check `error`.

## Try it 4 - Lock it down with Row Level Security

**Why it matters:** RLS decides who can do what, enforced by the database itself. It's why the public key is
safe to ship.

**Do this now,** run in the SQL Editor and read each line:

```sql
-- Nothing is allowed until a policy says so
alter table public.reservations enable row level security;

-- Anyone (even logged out) may CREATE a reservation (a public booking form)
create policy "Anyone can insert a reservation"
  on public.reservations for insert
  to anon, authenticated with check (true);

-- Only logged-in users may READ all reservations (restaurant staff)
create policy "Authenticated users can read reservations"
  on public.reservations for select
  to authenticated using (true);
```

1. Test it: logged out, you can still insert; logged out, you cannot read the full list.

**You've got it when:** a logged-out visitor can book but cannot read all reservations, and you can explain
each policy line. `with check` is the rule new rows must pass; `using` is the rule for which rows a user can
see.

## Try it 5 - Add sign-up and login

**Why it matters:** auth is how your protected pages know who's who. Supabase handles the hard parts.

**Do this now:**

```js
await supabase.auth.signUp({ email, password });
await supabase.auth.signInWithPassword({ email, password });
const { data } = await supabase.auth.getSession();
await supabase.auth.signOut();

supabase.auth.onAuthStateChange((event, session) => {
  // update your UI based on session
});
```

1. Build a protected **"Reservations list"** page: no session shows the login form; a session shows the
   reservations (which RLS only lets logged-in users read).

**You've got it when:** logging in reveals the reservations list, and logging out hides it. Validate on the
client **and** rely on RLS on the database, defence in depth.

### Watch out for

- Committing `.env` (add it to `.gitignore` first)
- Using the service_role key in the browser (never)
- Forgetting to enable RLS (your data is wide open)
- Not checking the `error` returned from every Supabase call

## This week's build: Portfolio Project 4

**Fresh Bites reservations saved to a database, with login:**

1. Your own Supabase project; a `reservations` table with **RLS enabled** and explained policies.
2. The reservation form inserts to the database (with error handling).
3. Email/password **sign-up and login**; a **protected** reservations list.
4. Deployed; `.env` git-ignored; **no keys in the repo**.
5. A README explaining setup (using placeholders, never real keys).

### Grading guide

| Criteria | % |
|---|---|
| Table + working insert from the app | 20 |
| RLS enabled with correct, explained policies | 25 |
| Auth: sign-up, login, protected read | 25 |
| Secrets handled correctly (no keys committed; anon key only) | 20 |
| Deployed; README with safe setup steps | 10 |

### Definition of done

- [ ] Reservations save to your Supabase table
- [ ] RLS is on; you can explain each policy line
- [ ] Login works; the reservations list is protected
- [ ] `.env` is git-ignored; no real keys anywhere in the repo
- [ ] Deployed; README explains setup with placeholders

## Extra quick wins (optional)

- Load the menu from a `menu_items` table instead of a local file.
- Show a friendly message when a logged-out user tries to view the protected list.
- Add a "sign out" button that updates the UI immediately.

## Mentoring Session Plan (90 min)

| Time | Activity |
|---|---|
| 0-10 | Review Portfolio Project 3 |
| 10-30 | Live: create a project + table; insert from the app |
| 30-55 | Live: enable RLS, write and test policies (logged out vs in) |
| 55-80 | Live: add sign-up/login and a protected page |
| 80-90 | Brief Portfolio Project 4; stress the key-safety rules |

## Facilitator Notes

The non-negotiable teaching points are the two keys (make students recite "service_role never touches the
browser") and enabling RLS (demo what happens with it off, the anon key reads everything). Watch for
committed `.env` files; check `git status` with them before any push. Link back to the Data Analysis SQL
lessons for students who took it. This is instruction for the student's **own** account only, there is no
shared or demo project. Keep any solution code in `_facilitator/`.

## Can you do these now?

1. What is the difference between the anon key and the service_role key?
2. Why is the public anon key safe to use in the browser, what protects your data?
3. What does `enable row level security` do, and why add policies after it?
4. Where do your Supabase URL and key go, and why is `.env` git-ignored?
5. How do you protect a page so only logged-in users can see it?
