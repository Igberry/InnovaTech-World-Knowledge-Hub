-- =====================================================================
-- Payments, plans, entitlements, vouchers  (run in Supabase -> SQL Editor)
-- Needs public.is_admin() (0001) and is_admin_member() (0003).
-- Money is stored in KOBO (1 naira = 100 kobo). Re-running is safe.
-- =====================================================================

-- ---------- Plans & pricing (one row per course per tier) ----------
create table if not exists public.course_plans (
  id          uuid primary key default gen_random_uuid(),
  course_slug text not null,
  plan        text not null check (plan in ('basic','advanced','premium')),
  price_kobo  integer not null check (price_kobo >= 0),
  currency    text not null default 'NGN',
  features    text[] not null default '{}',
  active      boolean not null default true,
  sort        integer not null default 0,
  updated_at  timestamptz not null default now(),
  unique (course_slug, plan)
);
alter table public.course_plans enable row level security;
drop policy if exists course_plans_read on public.course_plans;
create policy course_plans_read on public.course_plans
  for select to anon, authenticated using (active or public.is_admin());
drop policy if exists course_plans_admin on public.course_plans;
create policy course_plans_admin on public.course_plans
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

-- ---------- Entitlements (who can open which course, at what tier) ----------
create table if not exists public.entitlements (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references auth.users(id) on delete cascade,
  course_slug text not null,
  plan        text not null check (plan in ('basic','advanced','premium')),
  source      text not null check (source in ('paystack','voucher','free_pass')),
  status      text not null default 'active' check (status in ('active','revoked')),
  granted_by  uuid,
  note        text,
  created_at  timestamptz not null default now(),
  expires_at  timestamptz,
  unique (user_id, course_slug)
);
alter table public.entitlements enable row level security;
drop policy if exists ent_read_own on public.entitlements;
create policy ent_read_own on public.entitlements
  for select to authenticated using (user_id = (select auth.uid()) or public.is_admin());
drop policy if exists ent_admin_write on public.entitlements;
create policy ent_admin_write on public.entitlements
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

-- ---------- Vouchers / discount codes ----------
create table if not exists public.vouchers (
  id          uuid primary key default gen_random_uuid(),
  code        text not null unique,
  kind        text not null check (kind in ('percent','fixed','free')),
  value       integer not null default 0,     -- percent 1-100, or fixed kobo; ignored for 'free'
  course_slug text,                            -- null = any course
  plan        text,                            -- null = any plan
  max_uses    integer,                         -- null = unlimited
  used_count  integer not null default 0,
  expires_at  timestamptz,
  active      boolean not null default true,
  created_at  timestamptz not null default now()
);
alter table public.vouchers enable row level security;
drop policy if exists vouchers_admin on public.vouchers;
create policy vouchers_admin on public.vouchers
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

-- ---------- Payments (Paystack transaction records) ----------
create table if not exists public.payments (
  id          uuid primary key default gen_random_uuid(),
  reference   text not null unique,
  user_id     uuid references auth.users(id) on delete set null,
  course_slug text not null,
  plan        text not null,
  amount_kobo integer not null,
  currency    text not null default 'NGN',
  status      text not null default 'pending' check (status in ('pending','success','failed')),
  voucher_code text,
  created_at  timestamptz not null default now()
);
alter table public.payments enable row level security;
drop policy if exists pay_read_own on public.payments;
create policy pay_read_own on public.payments
  for select to authenticated using (user_id = (select auth.uid()) or public.is_admin());
drop policy if exists pay_admin_write on public.payments;
create policy pay_admin_write on public.payments
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

-- ---------- Safe read helpers ----------

-- Public: active plans + prices for a course (for the pricing display).
create or replace function public.get_course_plans(p_course text)
returns table (plan text, price_kobo int, currency text, features text[])
language sql stable security definer set search_path = public as $$
  select plan, price_kobo, currency, features
  from public.course_plans
  where course_slug = p_course and active
  order by sort, price_kobo;
$$;
grant execute on function public.get_course_plans(text) to anon, authenticated;

-- Does the current user have active access to a course? Returns the plan or null.
create or replace function public.my_entitlement(p_course text)
returns text language sql stable security definer set search_path = public as $$
  select plan from public.entitlements
  where user_id = auth.uid() and course_slug = p_course and status = 'active'
    and (expires_at is null or expires_at > now())
  limit 1;
$$;
grant execute on function public.my_entitlement(text) to authenticated;

-- Validate a voucher for a course/plan WITHOUT consuming it (for checkout preview).
create or replace function public.validate_voucher(p_code text, p_course text, p_plan text)
returns table (valid boolean, kind text, value int, reason text)
language plpgsql stable security definer set search_path = public as $$
declare v public.vouchers;
begin
  select * into v from public.vouchers where lower(code) = lower(btrim(p_code)) limit 1;
  if not found then return query select false, null::text, null::int, 'Invalid code'; return; end if;
  if not v.active then return query select false, v.kind, v.value, 'Code is inactive'; return; end if;
  if v.expires_at is not null and v.expires_at < now() then return query select false, v.kind, v.value, 'Code has expired'; return; end if;
  if v.max_uses is not null and v.used_count >= v.max_uses then return query select false, v.kind, v.value, 'Code is fully used'; return; end if;
  if v.course_slug is not null and v.course_slug <> p_course then return query select false, v.kind, v.value, 'Not valid for this course'; return; end if;
  if v.plan is not null and v.plan <> p_plan then return query select false, v.kind, v.value, 'Not valid for this plan'; return; end if;
  return query select true, v.kind, v.value, null::text;
end; $$;
grant execute on function public.validate_voucher(text, text, text) to anon, authenticated;

-- Redeem a 100%-off (free) voucher: grants entitlement to the current user, no payment.
create or replace function public.redeem_free_voucher(p_code text, p_course text, p_plan text)
returns text language plpgsql security definer set search_path = public as $$
declare v public.vouchers;
begin
  select * into v from public.vouchers where lower(code) = lower(btrim(p_code)) for update;
  if not found or not v.active then return 'invalid'; end if;
  if v.kind <> 'free' then return 'not_free'; end if;
  if v.expires_at is not null and v.expires_at < now() then return 'expired'; end if;
  if v.max_uses is not null and v.used_count >= v.max_uses then return 'used_up'; end if;
  if v.course_slug is not null and v.course_slug <> p_course then return 'wrong_course'; end if;
  if v.plan is not null and v.plan <> p_plan then return 'wrong_plan'; end if;
  insert into public.entitlements (user_id, course_slug, plan, source, note)
  values (auth.uid(), p_course, p_plan, 'voucher', 'voucher:' || v.code)
  on conflict (user_id, course_slug) do update set plan = excluded.plan, status = 'active';
  update public.vouchers set used_count = used_count + 1 where id = v.id;
  return 'granted';
end; $$;
grant execute on function public.redeem_free_voucher(text, text, text) to authenticated;

-- ---------- Seed pricing (NGN, in kobo). Edit later in the admin dashboard. ----------
with tiers(plan, sort, features) as (values
  ('basic',    1, array['All lessons and course materials','Downloadable templates and resources','Certificate of completion']),
  ('advanced', 2, array['Everything in Basic','Live group mentoring sessions','Assignment feedback']),
  ('premium',  3, array['Everything in Advanced','1:1 priority mentoring','Career and portfolio support'])
),
flagship(course_slug) as (values ('web-development'),('data-analysis')),
others(course_slug)   as (values ('virtual-assistant'),('artificial-intelligence'),('automation'),('cybersecurity'),('remote-ready')),
prices(p, flagship_kobo, other_kobo) as (values
  ('basic', 10000000, 8000000), ('advanced', 15000000, 12000000), ('premium', 25000000, 18000000))
insert into public.course_plans (course_slug, plan, price_kobo, features, sort)
  select f.course_slug, t.plan, pr.flagship_kobo, t.features, t.sort
    from flagship f cross join tiers t join prices pr on pr.p = t.plan
  union all
  select o.course_slug, t.plan, pr.other_kobo, t.features, t.sort
    from others o cross join tiers t join prices pr on pr.p = t.plan
on conflict (course_slug, plan) do nothing;
