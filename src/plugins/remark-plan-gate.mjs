/**
 * Plan-gated lesson sections. An author tags a section heading with a plan
 * marker, e.g.  `### One-on-one coaching {premium}`  or  `## Deep dive {advanced}`.
 *
 * The marker is stripped from the heading (so it never shows), and everything
 * from that heading down to the next heading of the same or higher level is
 * wrapped so lower-tier students see a "Locked - upgrade" panel instead of the
 * content. The heading itself stays visible so students can see the section
 * exists. Unlocking is done client-side from the student's entitlement in
 * LessonLayout (soft lock, consistent with the existing paywall).
 *
 * Plan hierarchy: premium > advanced > basic. Admins unlock everything.
 */
import { toText } from './_mdast-text.mjs';

const TAG = /\s*\{(advanced|premium)\}\s*$/i;

function courseSlugFromPath(file) {
  const p = file && file.path ? String(file.path) : '';
  const m = p.replace(/\\/g, '/').match(/content\/courses\/([^/]+)\//);
  return m ? m[1] : '';
}

/** Detect the plan marker on a heading from its full text. */
function detectPlan(node) {
  const m = toText(node).match(TAG);
  return m ? m[1].toLowerCase() : null;
}

/** Remove the `{plan}` marker from the heading's trailing text node. */
function stripTag(node) {
  for (let i = node.children.length - 1; i >= 0; i--) {
    const c = node.children[i];
    if (c.type === 'text') {
      const cleaned = c.value.replace(TAG, '');
      if (cleaned !== c.value) { c.value = cleaned; return; }
      if (c.value.trim() !== '') return; // real text, not the marker
    } else if (c.type !== 'html') {
      return;
    }
  }
}

export function remarkPlanGate() {
  return (tree, file) => {
    const courseSlug = courseSlugFromPath(file);
    const children = tree.children || [];
    const out = [];

    for (let i = 0; i < children.length; i++) {
      const node = children[i];

      if (node.type === 'heading') {
        const plan = detectPlan(node);
        if (plan) {
          stripTag(node);
          out.push(node); // keep the section heading visible

          const depth = node.depth;
          let j = i + 1;
          while (j < children.length) {
            const next = children[j];
            if (next.type === 'heading' && next.depth <= depth) break;
            j++;
          }
          const body = children.slice(i + 1, j);

          const planName = plan === 'premium' ? 'Premium' : 'Advanced';
          const href = courseSlug ? `/courses/${courseSlug}/#course-pricing` : '/courses/';

          const lock = {
            type: 'planGateLock',
            data: { hName: 'div', hProperties: { className: ['plan-gate-lock'] } },
            children: [
              {
                type: 'planGateLockTitle',
                data: { hName: 'p', hProperties: { className: ['plan-gate-lock-title'] } },
                children: [{ type: 'text', value: 'Locked' }],
              },
              {
                type: 'planGateLockMsg',
                data: { hName: 'p', hProperties: { className: ['plan-gate-lock-msg'] } },
                children: [
                  { type: 'text', value: `This part is available to students on the ${planName} plan. ` },
                  {
                    type: 'link',
                    url: href,
                    data: { hProperties: { className: ['plan-gate-upgrade'] } },
                    children: [{ type: 'text', value: 'Upgrade your plan for access' }],
                  },
                  { type: 'text', value: '.' },
                ],
              },
            ],
          };
          const content = {
            type: 'planGateContent',
            data: { hName: 'div', hProperties: { className: ['plan-gate-content'] } },
            children: body,
          };
          const gate = {
            type: 'planGate',
            data: {
              hName: 'div',
              hProperties: { className: ['plan-gate'], 'data-requires-plan': plan },
            },
            children: [lock, content],
          };

          out.push(gate);
          i = j - 1; // continue after the wrapped section
          continue;
        }
      }

      out.push(node);
    }

    tree.children = out;
  };
}

export default remarkPlanGate;
