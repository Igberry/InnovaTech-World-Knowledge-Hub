/**
 * Highlight the "Weekly Assignment" section as a distinct card.
 * (WEBSITE-BUILD-PROMPT.md §10 Phase 2) Finds a heading whose text starts with
 * "Weekly Assignment" and wraps it + its section into <section class="assignment-card">.
 */
import { toText } from './_mdast-text.mjs';

// Courses use different names for the weekly deliverable. Treat all of these as
// the assignment section (so each gets the card, the submit hint, and the box).
const ASSIGNMENT_PATTERNS = [
  /^weekly assignment/,
  /^this week[’']?s build/, // SmartyPants turns the source ' into a curly ’
  /^final deliverable/,
  /^capstone/,
];

function isAssignmentHeading(node) {
  if (node.type !== 'heading') return false;
  const t = toText(node).trim().toLowerCase();
  return ASSIGNMENT_PATTERNS.some((re) => re.test(t));
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
        // Append a standard "how to submit" line so every assignment explains it.
        const submitHint = {
          type: 'paragraph',
          data: { hName: 'p', hProperties: { className: ['assignment-submit-hint'] } },
          children: [
            { type: 'strong', children: [{ type: 'text', value: 'How to submit: ' }] },
            {
              type: 'text',
              value:
                'use the "Submit your assignment" box below this lesson. You can upload a file (PDF, Word, PowerPoint, CSV, Markdown or text), paste a link to your work, or type your answer. You must be logged in and enrolled.',
            },
          ],
        };
        out.push({
          type: 'assignmentCard',
          data: { hName: 'section', hProperties: { className: ['assignment-card'], 'data-assignment': 'true' } },
          children: [...section, submitHint],
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
