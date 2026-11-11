-- =====================================================================
-- Signed-grant application for Paystack payments (NO service_role key).
-- Run in Supabase -> SQL Editor after 0004.
--
-- How it works:
--   * A locked config table holds the grant signing secret (same value you
--     set as GRANT_SIGNING_SECRET in Vercel).
--   * apply_grant() is callable by anon + authenticated, but only succeeds
--     with a valid HMAC-SHA256 signature over the grant, which only our server
--     (the Vercel payment functions, holding the secret) can produce.
--   * It is idempotent on the Paystack reference, so the browser callback and
--     the webhook can both call it safely.
-- =====================================================================

create extension if not exists pgcrypto with schema extensions;

-- Locked config table (RLS on, no policies -> unreadable/unwritable by clients).
create table if not exists public.app_config (
  key   text primary key,
  value text not null
);
alter table public.app_config enable row level security;
revoke all on public.app_config from anon, authenticated;

-- You must set the secret ONCE (same string as Vercel GRANT_SIGNING_SECRET):
--   insert into public.app_config (key, value)
--   values ('grant_signing_secret', 'PASTE_THE_SAME_LONG_RANDOM_STRING')
--   on conflict (key) do update set value = excluded.value;

create or replace function public.apply_grant(
  p_user uuid, p_course text, p_plan text, p_reference text,
  p_amount integer, p_exp bigint, p_sig text, p_voucher text default null
) returns text
language plpgsql
security definer
set search_path = public, extensions
as $$
declare
  secret    text;
  expected  text;
  canonical text;
begin
  select value into secret from public.app_config where key = 'grant_signing_secret';
  if secret is null then return 'no_secret'; end if;
  if p_exp < extract(epoch from now()) then return 'expired'; end if;

  canonical := p_user::text || '|' || p_course || '|' || p_plan || '|' ||
               p_reference || '|' || p_amount::text || '|' || p_exp::text;
  expected := encode(extensions.hmac(canonical, secret, 'sha256'), 'hex');
  if expected is distinct from p_sig then return 'bad_signature'; end if;

  -- Idempotent: if this reference already succeeded, do nothing.
  if exists (select 1 from public.payments where reference = p_reference and status = 'success') then
    return 'already';
  end if;

  insert into public.entitlements (user_id, course_slug, plan, source, note)
  values (p_user, p_course, p_plan, 'paystack', 'ref:' || p_reference)
  on conflict (user_id, course_slug) do update set plan = excluded.plan, status = 'active';

  insert into public.payments (reference, user_id, course_slug, plan, amount_kobo, status, voucher_code)
  values (p_reference, p_user, p_course, p_plan, p_amount, 'success', p_voucher)
  on conflict (reference) do update set status = 'success';

  return 'granted';
end;
$$;
revoke all on function public.apply_grant(uuid, text, text, text, integer, bigint, text, text) from public;
grant execute on function public.apply_grant(uuid, text, text, text, integer, bigint, text, text) to anon, authenticated;
