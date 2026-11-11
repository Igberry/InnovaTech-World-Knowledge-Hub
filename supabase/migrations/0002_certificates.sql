-- =====================================================================
-- Certificates — publicly verifiable graduation records
-- Run in Supabase → SQL Editor AFTER 0001_init.sql (needs public.is_admin()).
-- =====================================================================

create table public.certificates (
  id            uuid primary key default gen_random_uuid(),
  code          text unique not null,            -- printed on the certificate; used to verify
  student_name  text not null,
  course        text not null,                   -- course title, e.g. "Web Development Career Launch"
  duration      text,                            -- e.g. "12 weeks"
  grade         text,                            -- optional, e.g. "Distinction" or "Pass"
  issued_at     date not null default current_date,
  created_at    timestamptz not null default now()
);

create index on public.certificates (lower(code));

-- RLS on; start from zero access.
alter table public.certificates enable row level security;
revoke all on public.certificates from anon, authenticated;

-- Facilitators (admins) manage certificates fully.
grant select, insert, update, delete on public.certificates to authenticated;
create policy certificates_admin_all on public.certificates
  for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

-- ---------------------------------------------------------------------
-- Public verification by EXACT code only (no listing/enumeration).
-- A security-definer function returns just the safe fields for one match,
-- so the public can verify a code but cannot dump the whole graduate list.
-- ---------------------------------------------------------------------
create or replace function public.verify_certificate(p_code text)
returns table (
  code text,
  student_name text,
  course text,
  duration text,
  grade text,
  issued_at date
)
language sql
stable
security definer
set search_path = public
as $$
  select c.code, c.student_name, c.course, c.duration, c.grade, c.issued_at
  from public.certificates c
  where lower(c.code) = lower(btrim(p_code))
  limit 1;
$$;

revoke all on function public.verify_certificate(text) from public;
grant execute on function public.verify_certificate(text) to anon, authenticated;
