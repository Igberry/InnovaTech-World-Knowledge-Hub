#!/usr/bin/env node
/**
 * Supabase safety guard (WEBSITE-BUILD-PROMPT.md §0A, item 5).
 *
 * Runs before `dev` and `build`. If PUBLIC_SUPABASE_URL is set to anything
 * other than the one approved project, the process FAILS so the site can
 * never be pointed at another Supabase project by accident.
 *
 * Phases 1–3 need no Supabase at all, so an unset URL is fine and passes.
 */

const ALLOWED_URL = 'https://rrjyfrqidwndgfgdncnp.supabase.co';
const ALLOWED_REF = 'rrjyfrqidwndgfgdncnp';

const url = (process.env.PUBLIC_SUPABASE_URL || '').trim();

if (url === '') {
  // No Supabase configured — correct for Phases 1–3.
  console.log('[supabase-guard] PUBLIC_SUPABASE_URL is not set — OK for Phases 1–3.');
  process.exit(0);
}

const normalised = url.replace(/\/+$/, '');

if (normalised !== ALLOWED_URL) {
  console.error('\n[supabase-guard] REFUSING TO CONTINUE.');
  console.error(`  PUBLIC_SUPABASE_URL is set to: ${url}`);
  console.error(`  The ONLY allowed project is:   ${ALLOWED_URL} (ref ${ALLOWED_REF})`);
  console.error('  See WEBSITE-BUILD-PROMPT.md §0A. Stop and tell the owner.\n');
  process.exit(1);
}

console.log(`[supabase-guard] PUBLIC_SUPABASE_URL matches the approved project (${ALLOWED_REF}). OK.`);
process.exit(0);
