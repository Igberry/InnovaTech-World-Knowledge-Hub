/**
 * Wrap every Markdown <table> in <div class="table-wrap"> so wide tables scroll
 * horizontally on mobile and never break the page layout.
 * (WEBSITE-BUILD-PROMPT.md §6 content conventions, §12)
 */
import { visit } from 'unist-util-visit';

export function rehypeTableWrap() {
  return (tree) => {
    visit(tree, 'element', (node, index, parent) => {
      if (node.tagName !== 'table' || !parent || index === null || index === undefined) return;
      // Avoid double-wrapping.
      if (parent.type === 'element' && parent.tagName === 'div' &&
          parent.properties?.className?.includes?.('table-wrap')) return;

      const wrapper = {
        type: 'element',
        tagName: 'div',
        properties: { className: ['table-wrap'] },
        children: [node],
      };
      parent.children[index] = wrapper;
      return [visit.SKIP, index + 1];
    });
  };
}

export default rehypeTableWrap;
