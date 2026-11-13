-- =====================================================================
-- Pricing for the newer courses (Typing, Microsoft Office, Google
-- Workspace, Video Editing). Run in Supabase -> SQL Editor after 0004.
-- Money is in KOBO (1 naira = 100 kobo). Safe to re-run (does nothing if
-- a course/plan row already exists, so your admin edits are preserved).
-- =====================================================================
with tiers(plan, sort, features) as (values
  ('basic',    1, array['All lessons and course materials','Downloadable templates and resources','Certificate of completion']),
  ('advanced', 2, array['Everything in Basic','Live group mentoring sessions','Assignment feedback']),
  ('premium',  3, array['Everything in Advanced','1:1 priority mentoring','Career and portfolio support'])
),
course_prices(course_slug, plan, price_kobo) as (values
  ('typing-skills',    'basic',     8000000), ('typing-skills',    'advanced', 11000000), ('typing-skills',    'premium', 15000000),
  ('microsoft-office', 'basic',     8000000), ('microsoft-office', 'advanced', 12000000), ('microsoft-office', 'premium', 18000000),
  ('google-workspace', 'basic',     8000000), ('google-workspace', 'advanced', 12000000), ('google-workspace', 'premium', 18000000),
  ('video-editing',    'basic',    10000000), ('video-editing',    'advanced', 15000000), ('video-editing',    'premium', 25000000)
)
insert into public.course_plans (course_slug, plan, price_kobo, features, sort)
  select cp.course_slug, cp.plan, cp.price_kobo, t.features, t.sort
  from course_prices cp join tiers t on t.plan = cp.plan
on conflict (course_slug, plan) do nothing;
