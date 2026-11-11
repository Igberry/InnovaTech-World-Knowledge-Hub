#!/usr/bin/env node
/**
 * Row Level Security tests (STUDENT-PORTAL-SPEC.md §7).
 *
 * Proves students can only touch their own rows and can never grant themselves
 * admin, write scores/attendance/enrolments, or edit a reviewed submission.
 *
 * SAFETY:
 *   - Uses ONLY the public anon key. NEVER the service_role key.
 *   - Does NOT create users. YOU create them by hand first in Supabase
 *     (Authentication → Users): two students and one admin, then make the admin
 *     an admin via supabase/make-admin.sql.
 *   - Put their credentials in a git-ignored supabase/tests/.env.test
 *     (copy .env.test.example). The test only signs in and reads/writes rows.
 *
 * Run:  npm run test:rls
 */
import { createClient } from '@supabase/supabase-js';
import { readFileSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { randomUUID } from 'node:crypto';

const HERE = dirname(fileURLToPath(import.meta.url));

// --- tiny .env parser (no dependency) ---
function loadEnv() {
  const path = join(HERE, '.env.test');
  const env = { ...process.env };
  if (existsSync(path)) {
    for (const line of readFileSync(path, 'utf8').split('\n')) {
      const m = /^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/.exec(line);
      if (m) env[m[1]] = m[2].replace(/^["']|["']$/g, '');
    }
  }
  return env;
}
const env = loadEnv();

const URL = env.PUBLIC_SUPABASE_URL;
const ANON = env.PUBLIC_SUPABASE_ANON_KEY;
const required = ['PUBLIC_SUPABASE_URL', 'PUBLIC_SUPABASE_ANON_KEY',
  'STUDENT1_EMAIL', 'STUDENT1_PASSWORD', 'STUDENT2_EMAIL', 'STUDENT2_PASSWORD',
  'ADMIN_EMAIL', 'ADMIN_PASSWORD'];
const missing = required.filter((k) => !env[k]);
if (missing.length) {
  console.error('[rls] Missing values in supabase/tests/.env.test: ' + missing.join(', '));
  console.error('      Copy .env.test.example and fill it in. See the file header.');
  process.exit(2);
}
if (ANON.length > 0 && /service_role/.test(ANON)) {
  console.error('[rls] Refusing to run: that looks like a service_role key. Use the ANON key only.');
  process.exit(2);
}

let pass = 0;
let fail = 0;
function check(name, ok, extra = '') {
  if (ok) { pass++; console.log(`  PASS  ${name}`); }
  else { fail++; console.log(`  FAIL  ${name}${extra ? ' — ' + extra : ''}`); }
}
const mkClient = () => createClient(URL, ANON, { auth: { persistSession: false, autoRefreshToken: false } });

async function signIn(email, password) {
  const c = mkClient();
  const { data, error } = await c.auth.signInWithPassword({ email, password });
  if (error || !data.user) throw new Error(`sign-in failed for ${email}: ${error?.message}`);
  return { client: c, uid: data.user.id };
}

async function run() {
  console.log('\n=== RLS tests (anon key only) ===');
  const anon = mkClient();
  const s1 = await signIn(env.STUDENT1_EMAIL, env.STUDENT1_PASSWORD);
  const s2 = await signIn(env.STUDENT2_EMAIL, env.STUDENT2_PASSWORD);
  const admin = await signIn(env.ADMIN_EMAIL, env.ADMIN_PASSWORD);

  // 0. anon cannot read any table
  {
    const { data, error } = await anon.from('profiles').select('id').limit(1);
    check('anon cannot read profiles', !!error || (data?.length ?? 0) === 0, error?.message);
  }

  // 1. student reads own profile, not the other student's
  {
    const own = await s1.client.from('profiles').select('id').eq('id', s1.uid);
    check('student reads own profile', !own.error && own.data?.length === 1, own.error?.message);
    const other = await s1.client.from('profiles').select('id').eq('id', s2.uid);
    check('student cannot read another profile', (other.data?.length ?? 0) === 0);
  }

  // 2. student manages own progress; cannot write progress for another user
  {
    const ownUp = await s1.client.from('lesson_progress')
      .upsert({ user_id: s1.uid, course_slug: 'data-analysis', lesson_slug: 'rls-test-' + randomUUID() });
    check('student writes own progress', !ownUp.error, ownUp.error?.message);
    const spoof = await s1.client.from('lesson_progress')
      .insert({ user_id: s2.uid, course_slug: 'data-analysis', lesson_slug: 'spoof' });
    check('student cannot write progress as another user', !!spoof.error, 'expected RLS denial');
  }

  // 3. student cannot make themselves admin
  {
    const r = await s1.client.from('admins').insert({ user_id: s1.uid });
    check('student cannot insert into admins', !!r.error, 'expected denial');
  }

  // 4. student cannot write attendance or enrolments (admin-only)
  {
    const att = await s1.client.from('attendance')
      .insert({ user_id: s1.uid, course_slug: 'data-analysis', session_date: '2026-01-01', status: 'present' });
    check('student cannot write attendance', !!att.error, 'expected denial');
    const enr = await s1.client.from('enrollments')
      .insert({ user_id: s1.uid, course_slug: 'data-analysis' });
    check('student cannot self-enrol', !!enr.error, 'expected denial');
  }

  // 5. student cannot write a review (score/feedback)
  {
    const fakeSub = randomUUID();
    const r = await s1.client.from('reviews')
      .insert({ submission_id: fakeSub, reviewer_id: s1.uid, status: 'approved', score: 100 });
    check('student cannot write reviews', !!r.error, 'expected denial');
  }

  // 6. admin can read all profiles and write enrolment + attendance
  {
    const all = await admin.client.from('profiles').select('id');
    check('admin reads all profiles', !all.error && (all.data?.length ?? 0) >= 2, all.error?.message);
    const enr = await admin.client.from('enrollments')
      .upsert({ user_id: s1.uid, course_slug: 'data-analysis', status: 'active' });
    check('admin can enrol a student', !enr.error, enr.error?.message);
    const att = await admin.client.from('attendance')
      .upsert({ user_id: s1.uid, course_slug: 'data-analysis', session_date: '2026-01-02', status: 'present' },
              { onConflict: 'user_id,course_slug,session_date' });
    check('admin can record attendance', !att.error, att.error?.message);
  }

  // 7. student cannot edit a submission after it is reviewed
  {
    const sub = await s1.client.from('submissions')
      .insert({ user_id: s1.uid, course_slug: 'data-analysis', lesson_slug: 'rls-test', link_url: 'https://example.com/a' })
      .select('id').single();
    if (sub.error) {
      check('student can create a submission', false, sub.error.message);
    } else {
      check('student can create a submission', true);
      const rev = await admin.client.from('reviews')
        .insert({ submission_id: sub.data.id, reviewer_id: admin.uid, status: 'needs_changes', feedback: 'rls test' });
      check('admin can review a submission', !rev.error, rev.error?.message);
      const edit = await s1.client.from('submissions')
        .update({ link_url: 'https://example.com/b' }).eq('id', sub.data.id).select('id');
      check('student cannot edit a reviewed submission', (edit.data?.length ?? 0) === 0 || !!edit.error);
    }
  }

  console.log(`\n=== ${pass} passed, ${fail} failed ===\n`);
  if (fail > 0) {
    console.log('Some security rules are NOT holding. Do not launch until every test passes.');
    process.exit(1);
  }
  console.log('All RLS tests passed.');
}

run().catch((e) => {
  console.error('\n[rls] Test run error:', e.message);
  process.exit(1);
});
