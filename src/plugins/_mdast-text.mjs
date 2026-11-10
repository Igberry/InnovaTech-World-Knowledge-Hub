/** Collect the plain-text content of an mdast node (recursively). */
export function toText(node) {
  if (!node) return '';
  if (typeof node.value === 'string') return node.value;
  if (Array.isArray(node.children)) return node.children.map(toText).join('');
  return '';
}

/**
 * If a blockquote begins with a bold label (`> **Label...`), return the label's
 * text. Otherwise return null. The label is the text of the leading `strong`
 * node inside the blockquote's first paragraph.
 */
export function leadingBoldLabel(blockquote) {
  if (!blockquote || blockquote.type !== 'blockquote') return null;
  const firstBlock = (blockquote.children || [])[0];
  if (!firstBlock || firstBlock.type !== 'paragraph') return null;
  const firstInline = (firstBlock.children || [])[0];
  if (!firstInline || firstInline.type !== 'strong') return null;
  return toText(firstInline).trim();
}
