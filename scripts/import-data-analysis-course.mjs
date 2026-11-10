#!/usr/bin/env node
/**
 * One-time import of the Data Analysis Career Launch course.
 * (WEBSITE-BUILD-PROMPT.md §6)
 *
 * Reads the course source from _import/data-analysis-course/ (git-ignored) and
 * writes student-facing Markdown into src/content/courses/data-analysis/.
 *
 * Option A (chosen by the owner): facilitator-only content is REMOVED from the
 * files written here, so the public repo never contains it. The build-time
 * remark plugin remains as a backstop.
 *
 * Safe to re-run: existing output files are left untouched unless you pass
 * --force (so it never clobbers edits the owner made after the first import).
 *
 * Run with:  npm run import:data-analysis   [-- --force]
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync, copyFileSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const SRC = join(ROOT, '_import', 'data-analysis-course');
const OUT = join(ROOT, 'src', 'content', 'courses', 'data-analysis');
const DL_OUT = join(ROOT, 'public', 'downloads', 'data-analysis');
const FORCE = process.argv.includes('--force');

const SETUP_URL = '/courses/data-analysis/00-setup-guide/';

const report = { created: [], skipped: [], copied: [], warnings: [] };

// ---------- markdown helpers ----------

function headingDepth(line) {
  const m = /^(#{1,6})\s/.exec(line);
  return m ? m[1].length : 0;
}

/** Remove facilitator heading-sections and facilitator blockquotes (Option A). */
function stripFacilitator(md) {
  const lines = md.split('\n');
  const out = [];
  // Tolerate a numeric section prefix, e.g. "## 7. Facilitator Tips".
  const hiddenRe = /^#{1,6}\s+(?:\d+[.)]\s+)?(Facilitator Notes|Facilitator Tips)\b/i;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Facilitator heading section -> skip to next heading of same/higher level.
    if (hiddenRe.test(line)) {
      const depth = headingDepth(line);
      let j = i + 1;
      while (j < lines.length) {
        const d = headingDepth(lines[j]);
        if (d > 0 && d <= depth) break;
        j++;
      }
      i = j - 1;
      continue;
    }

    // Facilitator blockquote -> skip the whole quote (consecutive `>` lines).
    if (/^>\s*\*\*[^*]*facilitator/i.test(line)) {
      let j = i;
      while (j < lines.length && /^>/.test(lines[j])) j++;
      // also swallow a trailing blank line left behind
      if (j < lines.length && lines[j].trim() === '') j++;
      i = j - 1;
      continue;
    }

    out.push(line);
  }
  return out.join('\n');
}

/** Pull out the first level-1 heading; return { h1, body } with the H1 removed. */
function removeFirstH1(md) {
  const lines = md.split('\n');
  let h1 = null;
  for (let i = 0; i < lines.length; i++) {
    const m = /^#\s+(.*)$/.exec(lines[i]);
    if (m) {
      h1 = m[1].trim();
      lines.splice(i, 1);
      // drop a blank line immediately after
      if (lines[i] !== undefined && lines[i].trim() === '') lines.splice(i, 1);
      break;
    }
  }
  return { h1, body: lines.join('\n') };
}

function firstGoal(md) {
  const m = /^\*\*Goal:\*\*\s*(.+)$/m.exec(md);
  return m ? m[1].trim().replace(/\s+/g, ' ') : null;
}

function rewriteRefs(md) {
  // `01-setup-guide.md` (inline code) -> a real link to the setup lesson.
  return md.replace(/`01-setup-guide\.md`/g, `[Setup Guide](${SETUP_URL})`);
}

function collapse(md) {
  return md.replace(/\n{3,}/g, '\n\n').trim() + '\n';
}

// ---------- YAML frontmatter ----------

function yamlString(s) {
  return `"${String(s).replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`;
}

function frontmatter(obj) {
  const lines = ['---'];
  for (const [key, val] of Object.entries(obj)) {
    if (val === undefined || val === null) continue;
    if (Array.isArray(val)) {
      if (val.length === 0) continue;
      if (typeof val[0] === 'object') {
        lines.push(`${key}:`);
        for (const item of val) {
          const entries = Object.entries(item);
          lines.push(`  - ${entries[0][0]}: ${yamlString(entries[0][1])}`);
          for (let k = 1; k < entries.length; k++) {
            lines.push(`    ${entries[k][0]}: ${yamlString(entries[k][1])}`);
          }
        }
      } else {
        lines.push(`${key}: [${val.map(yamlString).join(', ')}]`);
      }
    } else if (typeof val === 'number' || typeof val === 'boolean') {
      lines.push(`${key}: ${val}`);
    } else {
      lines.push(`${key}: ${yamlString(val)}`);
    }
  }
  lines.push('---', '');
  return lines.join('\n');
}

function writeOut(name, content) {
  const path = join(OUT, name);
  if (existsSync(path) && !FORCE) {
    report.skipped.push(name);
    return;
  }
  writeFileSync(path, content, 'utf8');
  report.created.push(name);
}

// ---------- per-week metadata ----------

const DATASETS = {
  orders_clean: { file: 'orders_clean.csv', label: 'Orders (clean) CSV' },
  orders_raw: { file: 'orders_raw.csv', label: 'Orders (raw, messy) CSV' },
  customers: { file: 'customers.csv', label: 'Customers CSV' },
  products: { file: 'products.csv', label: 'Products CSV' },
  generate: { file: 'generate_data.py', label: 'Data generator (Python)' },
};

const WEEK_DOWNLOADS = {
  1: ['orders_clean'],
  2: ['orders_raw'],
  3: ['orders_clean', 'customers', 'products'],
  5: ['orders_clean', 'customers', 'products'],
  6: ['orders_clean', 'customers', 'products'],
  8: ['orders_clean', 'customers', 'products', 'orders_raw'],
  9: ['orders_clean', 'customers', 'products', 'orders_raw'],
  10: ['orders_clean', 'customers', 'products', 'orders_raw'],
};

const WEEK_TOOLS = {
  1: ['Excel'],
  2: ['Excel'],
  3: ['Excel'],
  4: ['Excel'],
  5: ['SQLite', 'DB Browser for SQLite'],
  6: ['SQLite', 'DB Browser for SQLite'],
  7: ['Python', 'Google Colab'],
  8: ['Python', 'pandas'],
  9: ['Python', 'pandas', 'Matplotlib'],
  10: ['Power BI', 'Power Query'],
  11: ['Power BI', 'DAX'],
  12: ['GitHub'],
};

function phaseForWeek(w) {
  if (w <= 4) return 'Foundations';
  if (w <= 6) return 'Databases';
  if (w <= 9) return 'Programming';
  if (w <= 11) return 'Business Intelligence';
  return 'Career';
}

function downloadsFor(week) {
  const keys = WEEK_DOWNLOADS[week];
  if (!keys) return undefined;
  return keys.map((k) => ({
    label: DATASETS[k].label,
    href: `/downloads/data-analysis/${DATASETS[k].file}`,
  }));
}

// ---------- main ----------

function main() {
  if (!existsSync(SRC)) {
    console.error(`\n[import] Source not found: ${SRC}`);
    console.error('  Unzip the course into _import/data-analysis-course/ first (see WEBSITE-BUILD-PROMPT.md §6).\n');
    process.exit(1);
  }
  mkdirSync(OUT, { recursive: true });
  mkdirSync(DL_OUT, { recursive: true });

  // 1) Course overview -> _course.md
  {
    const raw = readFileSync(join(SRC, '00-course-overview.md'), 'utf8');
    const { body } = removeFirstH1(stripFacilitator(raw));
    const fm = frontmatter({
      title: 'Data Analysis Career Launch',
      slug: 'data-analysis',
      status: 'available',
      category: 'Data & Analytics',
      level: 'Beginner',
      duration: '12 weeks',
      format: 'Weekly lessons + in-person mentoring',
      summary:
        'Go from zero to job-ready data analyst using Excel, SQL, Python and Power BI.',
      outcomes: [
        'Clean and analyse real business data',
        'Write SQL queries with joins and window functions',
        'Build dashboards in Excel and Power BI',
        'Analyse data with Python and pandas',
        'Publish a GitHub portfolio and apply for remote roles',
      ],
      tools: ['Excel', 'SQL', 'Python', 'Power BI'],
      icon: 'bar-chart-3',
      order: 1,
      featured: true,
    });
    writeOut('_course.md', fm + collapse(rewriteRefs(body)));
  }

  // 2) Setup guide -> 00-setup-guide.md (order 0)
  {
    const raw = readFileSync(join(SRC, '01-setup-guide.md'), 'utf8');
    const { body } = removeFirstH1(stripFacilitator(raw));
    const fm = frontmatter({
      title: 'Setup Guide: Install Your Tools',
      course: 'data-analysis',
      order: 0,
      phase: 'Getting Started',
      summary: 'Install everything you need, step by step, before the week that needs it.',
      estimatedHours: 2,
      tools: ['Excel', 'SQLite', 'Python', 'Power BI'],
    });
    writeOut('00-setup-guide.md', fm + collapse(rewriteRefs(body)));
  }

  // 3) Weekly lessons
  const weekFiles = readdirSync(join(SRC, 'weeks')).filter((f) => f.endsWith('.md')).sort();
  for (const file of weekFiles) {
    const m = /^week-(\d{2})-/.exec(file);
    if (!m) {
      report.warnings.push(`Unexpected week filename: ${file}`);
      continue;
    }
    const week = parseInt(m[1], 10);
    const raw = readFileSync(join(SRC, 'weeks', file), 'utf8');
    const stripped = stripFacilitator(raw);
    const { h1, body } = removeFirstH1(stripped);
    const title = (h1 || file).replace(/^Week\s+\d+\s*[:：]\s*/i, '').trim();
    const summary = firstGoal(stripped) || `Week ${week} of the Data Analysis Career Launch course.`;
    if (!firstGoal(stripped)) report.warnings.push(`No **Goal:** line found in ${file}; used a fallback summary.`);

    const fm = frontmatter({
      title,
      course: 'data-analysis',
      order: week,
      week,
      phase: phaseForWeek(week),
      summary,
      estimatedHours: 10,
      tools: WEEK_TOOLS[week],
      downloads: downloadsFor(week),
    });
    writeOut(file, fm + collapse(rewriteRefs(body)));
  }

  // 4) Copy datasets into public/downloads/data-analysis/
  const dsDir = join(SRC, 'datasets');
  if (existsSync(dsDir)) {
    for (const f of readdirSync(dsDir)) {
      copyFileSync(join(dsDir, f), join(DL_OUT, f));
      report.copied.push(`public/downloads/data-analysis/${f}`);
    }
  } else {
    report.warnings.push('datasets/ folder not found; no downloads copied.');
  }

  // 5) Coming-soon placeholder courses
  const comingSoon = [
    { slug: 'web-development', title: 'Web Development', category: 'Engineering', icon: 'code', order: 2,
      summary: 'Build and deploy real websites and web apps, from HTML and CSS to modern JavaScript.' },
    { slug: 'social-media-marketing', title: 'Social Media Marketing', category: 'Marketing', icon: 'megaphone', order: 3,
      summary: 'Plan content, grow an audience, and run campaigns that reach the right people.' },
    { slug: 'virtual-assistant', title: 'Virtual Assistant (VA Launch)', category: 'Remote Work', icon: 'headset', order: 4,
      summary: 'Land and deliver remote VA work: tools, workflows, and client communication.' },
    { slug: 'remote-ready', title: 'Remote Ready', category: 'Career', icon: 'globe', order: 5,
      summary: 'Position yourself for global remote roles: profiles, portfolios, and interviews.' },
    { slug: 'graphic-design', title: 'Graphic Design', category: 'Design', icon: 'palette', order: 6,
      summary: 'Design clean, professional graphics for brands and social media.' },
    { slug: 'digital-marketing', title: 'Digital Marketing', category: 'Marketing', icon: 'trending-up', order: 7,
      summary: 'Reach customers online across search, social, email, and ads.' },
  ];
  for (const c of comingSoon) {
    mkdirSync(join(ROOT, 'src', 'content', 'courses', c.slug), { recursive: true });
    const fm = frontmatter({
      title: c.title,
      slug: c.slug,
      status: 'coming-soon',
      category: c.category,
      summary: c.summary,
      icon: c.icon,
      order: c.order,
      featured: false,
    });
    const body = `This course is coming soon. Want to be told when it opens? Ask us about **${c.title}** and we will let you know.\n`;
    const path = join('courses', c.slug, '_course.md');
    const full = join(ROOT, 'src', 'content', path);
    if (existsSync(full) && !FORCE) {
      report.skipped.push(path);
    } else {
      writeFileSync(full, fm + body, 'utf8');
      report.created.push(path);
    }
  }

  // ---------- report ----------
  console.log('\n=== Data Analysis course import ===');
  console.log(`Created (${report.created.length}):`);
  report.created.forEach((f) => console.log('  + ' + f));
  if (report.skipped.length) {
    console.log(`\nSkipped (already present, use --force to overwrite) (${report.skipped.length}):`);
    report.skipped.forEach((f) => console.log('  = ' + f));
  }
  console.log(`\nDatasets copied (${report.copied.length}):`);
  report.copied.forEach((f) => console.log('  > ' + f));
  if (report.warnings.length) {
    console.log(`\nWarnings (${report.warnings.length}):`);
    report.warnings.forEach((w) => console.log('  ! ' + w));
  }
  console.log('\nDone. Review the generated files in src/content/courses/data-analysis/.');
  console.log('From now on, edit those Markdown files directly — this script is only for the first import.\n');
}

main();
