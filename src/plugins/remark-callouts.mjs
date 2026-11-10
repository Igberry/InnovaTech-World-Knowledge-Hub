/**
 * Turn labelled blockquotes (`> **Label...`) into styled callouts.
 * (WEBSITE-BUILD-PROMPT.md §7.5)
 *
 * Keyword matching, case-insensitive, first match wins, in THIS order:
 *   1. contains "facilitator"  -> dropped already by remark-facilitator (guard here too)
 *   2. warning/caution/important/scam/"be careful"/privacy/date -> amber  (type: warning)
 *   3. tip/"teaching tip"/rule (covers "rule of thumb" and "rule")        -> tip    (type: tip)
 *   4. note                                                                -> blue   (type: note)
 *   5. any other bold label                                                -> neutral
 * Blockquotes with no bold label stay as normal <blockquote>.
 *
 * The blockquote becomes <blockquote class="callout" data-callout="TYPE">. The
 * bold label remains as the visible text label; the icon is added by CSS from
 * data-callout (so we never rely on colour alone).
 */
import { leadingBoldLabel } from './_mdast-text.mjs';

function calloutType(label) {
  const l = label.toLowerCase();
  if (l.includes('facilitator')) return null; // safety: should already be gone
  if (/(warning|caution|important|scam|be careful|privacy|date)/.test(l)) return 'warning';
  if (/(teaching tip|tip|rule)/.test(l)) return 'tip';
  if (l.includes('note')) return 'note';
  return 'neutral';
}

export function remarkCallouts() {
  return (tree) => {
    for (const node of tree.children || []) {
      if (node.type !== 'blockquote') continue;
      const label = leadingBoldLabel(node);
      if (!label) continue; // plain quote, leave alone

      const type = calloutType(label);
      if (!type) continue;

      node.data = node.data || {};
      node.data.hName = 'blockquote';
      node.data.hProperties = {
        ...(node.data.hProperties || {}),
        className: ['callout', `callout-${type}`],
        'data-callout': type,
      };
    }
  };
}

export default remarkCallouts;
