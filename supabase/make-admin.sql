-- Make the owner an admin. Run ONCE, AFTER your own account exists
-- (sign in to the site at least once, or invite yourself in Authentication → Users).
-- Replace the email with YOUR login email, then run in Supabase → SQL Editor.

insert into public.admins (user_id)
select id from auth.users where email = 'OWNER_EMAIL_HERE'
on conflict (user_id) do nothing;
