/**
 * Student showcase (WEBSITE-BUILD-PROMPT.md §10 Phase 3).
 *
 * EMPTY BY DESIGN. Only add students who have given WRITTEN permission to be
 * featured. Never invent students, projects, or links (§14). The page shows a
 * friendly "submit your project" state while this list is empty.
 */
export interface ShowcaseItem {
  name: string;
  course: string;
  projectTitle: string;
  url: string; // link to the portfolio / project (opens in a new tab)
  summary?: string;
}

export const showcase: ShowcaseItem[] = [
  // Example shape (delete and add only permitted, real entries):
  // {
  //   name: "A. Student",
  //   course: "Data Analysis Career Launch",
  //   projectTitle: "Retail sales dashboard",
  //   url: "https://github.com/username/project",
  //   summary: "Cleaned and analysed 12 months of sales data; built a Power BI dashboard.",
  // },
];
