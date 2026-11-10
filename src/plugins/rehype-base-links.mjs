/**
 * Prefix root-relative links/images inside Markdown with the deployment base
 * path, so content-authored links work at /REPO/ and at a custom-domain root.
 * (WEBSITE-BUILD-PROMPT.md §9 point 2 — "never hard-code / for internal links")
 *
 * Only touches href/src that start with a single "/". External URLs, anchors,
 * mailto:/tel:, protocol-relative "//", and links already under the base are
 * left untouched.
 */
import { visit } from 'unist-util-visit';

const RAW_BASE = process.env.BASE_PATH || '/innovatech-knowledge-hub';
const BASE = RAW_BASE === '/' ? '' : RAW_BASE.replace(/\/+$/, '');

function prefix(value) {
  if (!value || !value.startsWith('/') || value.startsWith('//')) return value;
  if (BASE === '') return value;
  if (value === BASE || value.startsWith(BASE + '/')) return value;
  return BASE + value;
}

export function rehypeBaseLinks() {
  return (tree) => {
    visit(tree, 'element', (node) => {
      if (node.tagName === 'a' && node.properties?.href) {
        node.properties.href = prefix(String(node.properties.href));
      }
      if ((node.tagName === 'img' || node.tagName === 'source') && node.properties?.src) {
        node.properties.src = prefix(String(node.properties.src));
      }
    });
  };
}

export default rehypeBaseLinks;
