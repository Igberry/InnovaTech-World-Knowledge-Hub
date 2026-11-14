-- =====================================================================
-- Let LOGGED-OUT visitors read prices.  (run in Supabase -> SQL Editor)
--
-- Symptom: service prices only showed after logging in. Cause: the `anon`
-- role was missing the table-level SELECT privilege on the pricing tables,
-- so anonymous reads were denied (Row Level Security already limits anon to
-- active rows, but the GRANT is also required). Course *pages* avoided this
-- by reading via a SECURITY DEFINER function; the services page and Lulu read
-- the tables directly, so they needed the grant.
--
-- This grants SELECT to anon + authenticated. RLS still restricts anon to
-- active rows only (policies defined in 0004 / 0008 / 0011). Re-running is safe.
-- =====================================================================

grant select on public.course_plans   to anon, authenticated;
grant select on public.service_plans  to anon, authenticated;
grant select on public.service_rates  to anon, authenticated;
