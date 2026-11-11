/**
 * Testimonials (WEBSITE-BUILD-PROMPT.md §10 Phase 3).
 *
 * EMPTY BY DESIGN. Only add real testimonials the owner has collected WITH the
 * person's permission. Never invent quotes, names, or outcomes (§14). The
 * section is hidden automatically while this list is empty.
 */
export interface Testimonial {
  quote: string;
  name: string;
  /** Optional: course taken, role, or location - only what the person agreed to show. */
  detail?: string;
}

export const testimonials: Testimonial[] = [
  // Example shape (delete this comment and add real, permitted entries):
  // {
  //   quote: "The weekly structure kept me going, and I finished with a real portfolio.",
  //   name: "A. Student",
  //   detail: "Data Analysis Career Launch",
  // },
];
