/**
 * Strip facilitator-only content from lessons at build time.
 * (WEBSITE-BUILD-PROMPT.md §7.5 rule 1, §8 point 1)
 *
 * Two kinds of facilitator content exist in the course files:
 *   1. Whole sections under a heading like "## Facilitator Notes" / "Facilitator Tips".
 *      Removed from that heading until the next heading of the same or higher level.
 *   2. Blockquotes whose bold label contains "facilitator"
 *      (e.g. `> **Note for the facilitator ...`). Removed entirely - they would
 *      otherwise survive heading-stripping and render as a student callout.
 *
 * Runs BEFORE the callout and self-check plugins so facilitator blockquotes can
 * never be turned into a styled "Note".
 *
 * NOTE: the raw .md in the repo should already have (1) removed by the import
 * script (Option A). This plugin is the build-time backstop the brief requires,
 * and it is what the facilitator test asserts against.
 */
import { HIDDEN_SECTION_HEADINGS } from '../config/hidden-sections.mjs';
import { toText, leadingBoldLabel } from './_mdast-text.mjs';

const hiddenLower = HIDDEN_SECTION_HEADINGS.map((h) => h.toLowerCase());

function headingMatchesHidden(node) {
  if (node.type !== 'heading') return false;
  // Drop a leading section number (e.g. "7. Facilitator Tips") before matching.
  const text = toText(node)
    .trim()
    .toLowerCase()
    .replace(/^\d+[.)]\s*/, '');
  return hiddenLower.some((h) => text === h || text.startsWith(h));
}

export function remarkFacilitator() {
  return (tree) => {
    const kept = [];
    const children = tree.children || [];

    for (let i = 0; i < children.length; i++) {
      const node = children[i];

      // (1) Facilitator heading sections: skip to the next heading of same/higher level.
      if (headingMatchesHidden(node)) {
        const depth = node.depth;
        let j = i + 1;
        while (j < children.length) {
          const next = children[j];
          if (next.type === 'heading' && next.depth <= depth) break;
          j++;
        }
        i = j - 1; // the for-loop ++ lands us on `next`
        continue;
      }

      // (2) Facilitator blockquotes.
      if (node.type === 'blockquote') {
        const label = leadingBoldLabel(node);
        if (label && label.toLowerCase().includes('facilitator')) {
          continue; // drop it
        }
      }

      kept.push(node);
    }

    tree.children = kept;
  };
}

export default remarkFacilitator;
