#!/usr/bin/env node
/**
 * Internal link checker. Fails the build if any internal <a href>/<img src>/<link>
 * in the built site points at a path that does not exist in dist/.
 * (WEBSITE-BUILD-PROMPT.md §7.10, §12) Base-path aware.
 */
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, dirname, resolve, extname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const DIST = join(ROOT, 'dist');
// Must match astro.config.mjs base resolution.
const RAW_BASE = process.env.BASE_PATH || (process.env.VERCEL ? '/' : '/innovatech-knowledge-hub');
const BASE = RAW_BASE === '/' ? '' : RAW_BASE.replace(/\/+$/, '');

if (!existsSync(DIST)) {
  console.error('[links] dist/ not found. Run `npm run build` first.');
  process.exit(1);
}

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, out);
    else out.push(p);
  }
  return out;
}

const allFiles = walk(DIST).map((p) => p.slice(DIST.length).split('\\').join('/'));
const fileSet = new Set(allFiles);
const htmlFiles = allFiles.filter((f) => f.endsWith('.html'));

function exists(pathNoBase) {
  let p = pathNoBase.split('#')[0].split('?')[0];
  if (p === '' || p === '/') p = '/index.html';
  if (fileSet.has(p)) return true;
  if (p.endsWith('/')) return fileSet.has(p + 'index.html');
  if (!extname(p)) {
    return fileSet.has(p + '/index.html') || fileSet.has(p + '.html');
  }
  return false;
}

const attrRe = /(?:href|src)\s*=\s*"([^"]+)"/g;
const errors = [];
let checked = 0;

for (const file of htmlFiles) {
  const html = readFileSync(join(DIST, file), 'utf8');
  let m;
  while ((m = attrRe.exec(html))) {
    const link = m[1].trim();
    if (
      /^(https?:)?\/\//.test(link) ||
      link.startsWith('mailto:') ||
      link.startsWith('tel:') ||
      link.startsWith('#') ||
      link.startsWith('data:')
    ) {
      continue;
    }
    if (!link.startsWith('/')) continue; // relative (rare) — skip
    let pathNoBase = link;
    if (BASE && (link === BASE || link.startsWith(BASE + '/'))) {
      pathNoBase = link.slice(BASE.length) || '/';
    } else if (BASE && link.startsWith('/') && !link.startsWith(BASE)) {
      // Root-absolute link that ignored the base path — that is itself a bug.
      errors.push(`${file}: "${link}" does not include base path "${BASE}"`);
      continue;
    }
    checked++;
    if (!exists(pathNoBase)) {
      errors.push(`${file}: broken internal link "${link}"`);
    }
  }
}

if (errors.length) {
  console.error(`\n[links] ${errors.length} broken internal link(s):`);
  for (const e of [...new Set(errors)]) console.error('  - ' + e);
  console.error('');
  process.exit(1);
}
console.log(`[links] OK — ${checked} internal links across ${htmlFiles.length} pages all resolve.`);
