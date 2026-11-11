-- =====================================================================
-- Admin 2FA enforcement
-- Run in Supabase -> SQL Editor AFTER you have set up 2FA on the Admin
-- dashboard (so you are not briefly locked out of admin DATA).
--
-- What it does:
--   * is_admin_member()  -> true if you are in the admins table (NO 2FA check).
--                           Used only by the UI to decide whether to show the
--                           2FA step. Safe: a non-admin gets false.
--   * is_admin()         -> now also requires the session to be at AAL2
--                           (password + TOTP). Every admin RLS policy and the
--                           certificate/payment functions use this, so admin
--                           data and actions require 2FA to be completed.
-- Re-running is safe (create or replace).
-- =====================================================================

-- Membership only (no assurance-level requirement) -- for client UX.
create or replace function public.is_admin_member()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (select 1 from public.admins where user_id = auth.uid());
$$;
revoke all on function public.is_admin_member() from public, anon;
grant execute on function public.is_admin_member() to authenticated;

-- Admin privileges now require AAL2 (two-factor completed this session).
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (select 1 from public.admins where user_id = auth.uid())
     and coalesce(auth.jwt() ->> 'aal', 'aal1') = 'aal2';
$$;
revoke all on function public.is_admin() from public, anon;
grant execute on function public.is_admin() to authenticated;
