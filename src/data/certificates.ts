/**
 * Certificate verification records (WEBSITE-BUILD-PROMPT.md §10 Phase 3, §14).
 *
 * EMPTY BY DESIGN. Add a record only with the learner's consent, and store the
 * MINIMUM: a certificate id, the person's name, the course, and the issue date.
 * No other personal data. Never invent certificates.
 *
 * The /verify page looks up an id entered by the visitor and shows the match.
 */
export interface Certificate {
  id: string; // the code printed on the certificate, e.g. "ITW-DA-2026-0001"
  name: string;
  course: string;
  issued: string; // ISO date, e.g. "2026-12-20"
}

export const certificates: Certificate[] = [
  // Example shape (delete and add real, consented records):
  // { id: "ITW-DA-2026-0001", name: "A. Student", course: "Data Analysis Career Launch", issued: "2026-12-20" },
];
