/**
 * Single source of truth for facilitator-only section headings that must be
 * stripped from the rendered site. Imported by both src/config/site.ts and the
 * remark plugin so they never drift apart. (WEBSITE-BUILD-PROMPT.md §5.3, §8)
 *
 * Matching is case-insensitive. A heading matches if its text equals one of
 * these, or begins with it (so "Facilitator Notes (optional)" still matches).
 *
 * NOTE: "Mentoring Session Plan" and "Self-Check Questions" are intentionally
 * NOT here - they stay visible to students (Self-Check is wrapped in <details>).
 */
export const HIDDEN_SECTION_HEADINGS = ['Facilitator Notes', 'Facilitator Tips'];
