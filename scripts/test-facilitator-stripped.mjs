#!/usr/bin/env node
/**
 * Facilitator-content test (WEBSITE-BUILD-PROMPT.md §8 point 1).
 * Proves that facilitator-only content never appears in the built HTML, and that
 * student-facing sections we deliberately keep are still present.
 */
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const DIST = join(ROOT, 'dist');

if (!existsSync(DIST)) {
  console.error('[facilitator-test] dist/ not found. Run `npm run build` first.');
  process.exit(1);
}

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, out);
    else if (p.endsWith('.html')) out.push(p);
  }
  return out;
}

const html = walk(DIST)
  .map((p) => ({ file: p.slice(DIST.length), body: readFileSync(p, 'utf8') }));

// Strings that must NEVER appear (facilitator-only headings and known notes).
const FORBIDDEN = [
  'Facilitator Notes',
  'Facilitator Tips',
  'Note for the facilitator',
  'Give each student a different seed', // from the overview's Facilitator Tips
  'do each week&#x27;s assignment yourself first', // facilitator tip text
  'Preview the top 1', // facilitator blockquote in the setup guide
];

// Student-facing content we KEEP — at least one page must contain each.
const REQUIRED_SOMEWHERE = ['Mentoring Session Plan', 'Self-Check Questions'];

const failures = [];
const luluIndexPath = join(DIST, 'client', 'lulu-index.json');

for (const { file, body } of html) {
  for (const bad of FORBIDDEN) {
    if (body.toLowerCase().includes(bad.toLowerCase())) {
      failures.push(`FORBIDDEN "${bad}" found in ${file}`);
    }
  }
}

for (const need of REQUIRED_SOMEWHERE) {
  const found = html.some((h) => h.body.includes(need));
  if (!found) failures.push(`EXPECTED "${need}" not found in any built page (over-stripped?)`);
}

if (!existsSync(luluIndexPath)) {
  failures.push('Lulu public knowledge index was not emitted');
} else {
  const index = readFileSync(luluIndexPath, 'utf8');
  let documents;
  try {
    documents = JSON.parse(index);
  } catch {
    failures.push('Lulu public knowledge index is not valid JSON');
  }

  if (Array.isArray(documents)) {
    for (const bad of FORBIDDEN) {
      if (index.toLowerCase().includes(bad.toLowerCase())) {
        failures.push(`FORBIDDEN "${bad}" found in Lulu public knowledge index`);
      }
    }
  } else if (documents !== undefined) {
    failures.push('Lulu public knowledge index must contain a document array');
  }
}

if (failures.length) {
  console.error(`\n[facilitator-test] FAILED (${failures.length}):`);
  for (const f of failures) console.error('  - ' + f);
  console.error('');
  process.exit(1);
}
console.log(`[facilitator-test] OK — no facilitator-only content in ${html.length} pages or Lulu's knowledge index; kept sections present.`);
