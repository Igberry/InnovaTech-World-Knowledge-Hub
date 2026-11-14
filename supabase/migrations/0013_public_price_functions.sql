-- =====================================================================
-- Public read functions for prices (run in Supabase -> SQL Editor).
--
-- Why: the pricing tables' RLS read policy is `using (active or is_admin())`,
-- but EXECUTE on is_admin() is revoked from anon (migration 0001). So a
-- logged-out visitor's direct table read calls is_admin() -> permission denied
-- -> the read fails. That is why prices only showed after logging in.
--
-- Fix: SECURITY DEFINER functions (same pattern as get_course_plans) that
-- return only active rows and bypass RLS. The services page and Lulu call these
-- instead of reading the tables directly. Granted to anon + authenticated.
-- Re-running is safe.
-- =====================================================================

-- All active service packages (fixed one-time price in NGN kobo).
create or replace function public.get_service_plans()
returns table (service_slug text, plan text, price_kobo int, fixed_price_kobo int, currency text, features text[])
language sql stable security definer set search_path = public as $$
  select service_slug, plan, price_kobo, fixed_price_kobo, currency, features
  from public.service_plans
  where active
  order by service_slug, sort, plan;
$$;
grant execute on function public.get_service_plans() to anon, authenticated;

-- Per-service hourly rate (USD cents).
create or replace function public.get_service_rates()
returns table (service_slug text, hourly_price_kobo int, currency text)
language sql stable security definer set search_path = public as $$
  select service_slug, hourly_price_kobo, currency
  from public.service_rates
  where active;
$$;
grant execute on function public.get_service_rates() to anon, authenticated;

-- All active course plans in one call (used by Lulu to quote live course prices).
create or replace function public.get_all_course_plans()
returns table (course_slug text, plan text, price_kobo int, currency text, features text[])
language sql stable security definer set search_path = public as $$
  select course_slug, plan, price_kobo, currency, features
  from public.course_plans
  where active
  order by course_slug, sort, plan;
$$;
grant execute on function public.get_all_course_plans() to anon, authenticated;
