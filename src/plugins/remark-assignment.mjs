/**
 * Highlight the "Weekly Assignment" section as a distinct card.
 * (WEBSITE-BUILD-PROMPT.md §10 Phase 2) Finds a heading whose text starts with
 * "Weekly Assignment" and wraps it + its section into <section class="assignment-card">.
 */
import { toText } from './_mdast-text.mjs';

function isAssignmentHeading(node) {
  return node.type === 'heading' && toText(node).trim().toLowerCase().startsWith('weekly assignment');
}

export function remarkAssignment() {
  return (tree) => {
    const children = tree.children || [];
    const out = [];

    for (let i = 0; i < children.length; i++) {
      const node = children[i];

      if (isAssignmentHeading(node)) {
        const depth = node.depth;
        let j = i + 1;
        while (j < children.length) {
          const next = children[j];
          if (next.type === 'heading' && next.depth <= depth) break;
          j++;
        }
        const section = children.slice(i, j); // include the heading
        out.push({
          type: 'assignmentCard',
          data: { hName: 'section', hProperties: { className: ['assignment-card'], 'data-assignment': 'true' } },
          children: section,
        });
        i = j - 1;
        continue;
      }

      out.push(node);
    }

    tree.children = out;
  };
}

export default remarkAssignment;
