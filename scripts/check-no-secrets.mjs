#!/usr/bin/env node
/**
 * Fails the build if anything resembling a Supabase service_role key (or the
 * literal "service_role") ends up in dist/. (STUDENT-PORTAL-SPEC.md §6.1, §7)
 *
 * The anon key is safe to ship; the service_role key must NEVER reach the browser.
 */
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const DIST = resolve(dirname(fileURLToPath(import.meta.url)), '..', 'dist');
if (!existsSync(DIST)) {
  console.error('[secrets] dist/ not found. Run `npm run build` first.');
  process.exit(1);
}

const TEXT_EXT = new Set(['.html', '.js', '.css', '.json', '.xml', '.txt', '.svg', '.map']);

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, out);
    else out.push(p);
  }
  return out;
}

function decodeJwtRole(token) {
  try {
    const payload = token.split('.')[1];
    const json = Buffer.from(payload.replace(/-/g, '+').replace(/_/g, '/'), 'base64').toString('utf8');
    return JSON.parse(json).role;
  } catch {
    return null;
  }
}

const jwtRe = /eyJ[A-Za-z0-9_-]+\.eyJ[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+/g;
const findings = [];

for (const file of walk(DIST)) {
  const ext = file.slice(file.lastIndexOf('.')).toLowerCase();
  if (!TEXT_EXT.has(ext)) continue;
  const text = readFileSync(file, 'utf8');
  const rel = file.slice(DIST.length);

  if (text.includes('service_role')) {
    findings.push(`${rel}: contains the literal string "service_role"`);
  }
  for (const token of text.match(jwtRe) || []) {
    if (decodeJwtRole(token) === 'service_role') {
      findings.push(`${rel}: contains a JWT whose role is "service_role"`);
    }
  }
}

if (findings.length) {
  console.error('\n[secrets] POSSIBLE SERVICE_ROLE KEY IN BUILD OUTPUT — refusing:');
  for (const f of [...new Set(findings)]) console.error('  - ' + f);
  console.error('  Only the anon public key may ship. Remove the service_role key.\n');
  process.exit(1);
}
console.log('[secrets] OK — no service_role key or marker found in dist/.');
