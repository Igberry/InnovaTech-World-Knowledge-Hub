-- =====================================================================
-- InnovaTech World Knowledge Hub — student portal schema
-- Run ONCE in Supabase → SQL Editor for project rrjyfrqidwndgfgdncnp.
-- (STUDENT-PORTAL-SPEC.md §5). RLS is enabled on every table; no anon access.
--
-- Additions beyond the spec's base schema (owner-approved):
--   * profiles.email        — populated by the signup trigger, for the admin dashboard
--   * profiles.consented_at — first-login privacy consent timestamp (§8)
-- =====================================================================

-- ---------- Tables ----------
create table public.profiles (
  id           uuid primary key references auth.users(id) on delete cascade,
  full_name    text not null default '',
  email        text,
  cohort       text,
  consented_at timestamptz,
  created_at   timestamptz not null default now()
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
  insert into public.profiles (id, full_name, email)
  values (new.id, coalesce(new.raw_user_meta_data->>'full_name', ''), new.email);
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

-- profiles: read own (admin reads all); students may edit ONLY their name and consent
grant select on public.profiles to authenticated;
grant update (full_name, consented_at) on public.profiles to authenticated;
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

-- =====================================================================
-- After your OWN account exists, make yourself an admin (run once):
--   insert into public.admins (user_id)
--   select id from auth.users where email = 'OWNER_EMAIL_HERE';
-- =====================================================================
