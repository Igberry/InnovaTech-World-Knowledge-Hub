/**
 * Pure content helpers for Lulu's public-site retrieval.
 * Facilitator-only headings and callouts are removed before any text is sent
 * to the model, even though the same sections are stripped from rendered HTML.
 */

/**
 * @param {string} markdown
 * @param {string[]} hiddenHeadings
 */
export function removeHiddenContent(markdown, hiddenHeadings) {
  const hidden = hiddenHeadings.map((heading) => heading.toLowerCase());
  const lines = markdown.split(/\r?\n/);
  const kept = [];
  let skipDepth = 0;
  let skipFacilitatorQuote = false;

  for (const line of lines) {
    const heading = line.match(/^(#{1,6})\s+(.+?)\s*#*\s*$/);
    if (heading) {
      const depth = heading[1].length;
      const text = heading[2].trim().toLowerCase().replace(/^\d+[.)]\s*/, '');
      if (skipDepth && depth <= skipDepth) skipDepth = 0;
      if (!skipDepth && hidden.some((name) => text === name || text.startsWith(name))) {
        skipDepth = depth;
        skipFacilitatorQuote = false;
        continue;
      }
    }

    if (skipDepth) continue;

    const quote = line.match(/^\s*>\s*\*\*([^*]+)\*\*/);
    if (quote) {
      if (quote[1].toLowerCase().includes('facilitator')) {
        skipFacilitatorQuote = true;
        continue;
      }
      if (skipFacilitatorQuote) skipFacilitatorQuote = false;
    }
    if (skipFacilitatorQuote) {
      if (/^\s*>/.test(line) || line.trim() === '') continue;
      skipFacilitatorQuote = false;
    }
    kept.push(line);
  }

  return kept.join('\n').trim();
}

/**
 * @param {string} text
 */
export function splitKnowledgeParagraphs(text) {
  return text
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, ' ')
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim())
    .filter((paragraph) => paragraph.length >= 35)
    .map((paragraph) => paragraph.slice(0, 1200));
}

const stopWords = new Set([
  'about', 'after', 'again', 'also', 'and', 'are', 'can', 'could', 'does', 'for',
  'from', 'have', 'how', 'into', 'its', 'more', 'much', 'need', 'our', 'please',
  'that', 'the', 'their', 'them', 'then', 'there', 'this', 'what', 'when', 'where',
  'which', 'who', 'will', 'with', 'would', 'you', 'your',
]);

/**
 * @param {string} value
 */
export function knowledgeTerms(value) {
  return [...new Set(
    value.toLowerCase().match(/[\p{L}\p{N}]{2,}/gu)?.filter((term) => !stopWords.has(term)) ?? [],
  )];
}

/**
 * @typedef {{ title: string; content: string; reference?: string; category?: string }} KnowledgeDocument
 */

/**
 * Return the most relevant public paragraphs within a strict context budget.
 * @param {KnowledgeDocument[]} documents
 * @param {string} query
 * @param {{ maxSnippets?: number; maxCharacters?: number }} [options]
 */
export function selectKnowledge(documents, query, options = {}) {
  const maxSnippets = options.maxSnippets ?? 7;
  const maxCharacters = options.maxCharacters ?? 9000;
  const queryTerms = knowledgeTerms(query);
  if (!queryTerms.length) return [];

  const matches = [];
  for (const document of documents) {
    const titleTerms = new Set(knowledgeTerms(document.title));
    for (const paragraph of splitKnowledgeParagraphs(document.content)) {
      const paragraphTerms = knowledgeTerms(paragraph);
      let score = 0;
      for (const term of queryTerms) {
        if (titleTerms.has(term)) score += 3;
        if (paragraphTerms.includes(term)) score += 1;
      }
      if (score > 0) matches.push({ document, paragraph, score });
    }
  }

  matches.sort((a, b) => b.score - a.score);
  const selected = [];
  const seen = new Set();
  let characterCount = 0;

  for (const match of matches) {
    const key = `${match.document.title}\n${match.paragraph}`;
    if (seen.has(key)) continue;
    const formatted = [
      `Source: ${match.document.title}${match.document.category ? ` (${match.document.category})` : ''}`,
      match.document.reference ? `Reference: ${match.document.reference}` : '',
      match.paragraph,
    ].filter(Boolean).join('\n');
    if (characterCount + formatted.length > maxCharacters) continue;
    selected.push(formatted);
    seen.add(key);
    characterCount += formatted.length;
    if (selected.length >= maxSnippets) break;
  }

  return selected;
}
