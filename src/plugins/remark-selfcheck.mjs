/**
 * Wrap the "Self-Check Questions" section in a collapsible <details> block.
 * (WEBSITE-BUILD-PROMPT.md §8 point 2)
 *
 * Finds a heading whose text is "Self-Check Questions" and moves that heading
 * (as the <summary>) plus every following node, until the next heading of the
 * same or higher level, into a <details class="selfcheck"> container.
 */
import { toText } from './_mdast-text.mjs';

function isSelfCheckHeading(node) {
  return node.type === 'heading' && toText(node).trim().toLowerCase() === 'self-check questions';
}

export function remarkSelfCheck() {
  return (tree) => {
    const children = tree.children || [];
    const out = [];

    for (let i = 0; i < children.length; i++) {
      const node = children[i];

      if (isSelfCheckHeading(node)) {
        const depth = node.depth;
        let j = i + 1;
        while (j < children.length) {
          const next = children[j];
          if (next.type === 'heading' && next.depth <= depth) break;
          j++;
        }
        const sectionBody = children.slice(i + 1, j);

        const summary = {
          type: 'selfCheckSummary',
          data: { hName: 'summary' },
          children: node.children, // the heading's inline content
        };
        const details = {
          type: 'selfCheckDetails',
          data: { hName: 'details', hProperties: { className: ['selfcheck'] } },
          children: [summary, ...sectionBody],
        };

        out.push(details);
        i = j - 1; // continue after the section
        continue;
      }

      out.push(node);
    }

    tree.children = out;
  };
}

export default remarkSelfCheck;
