/**
 * Curated free learning resources shown on /resources/.
 * (WEBSITE-BUILD-PROMPT.md §7.6) Seeded from the Data Analysis setup guide.
 * The owner can add entries by appending to this list — nothing else to change.
 *
 * YouTube channels link to a channel search (not a fixed video) because, as the
 * course notes, video links change over time.
 */
export interface Resource {
  title: string;
  url: string;
  category: string;
  description: string;
}

const yt = (channel: string) =>
  `https://www.youtube.com/results?search_query=${encodeURIComponent(channel)}`;

export const resources: Resource[] = [
  // Official docs & training
  { title: 'Microsoft Learn', url: 'https://learn.microsoft.com', category: 'Official docs & training', description: 'Official Excel and Power BI training from Microsoft.' },
  { title: 'pandas documentation', url: 'https://pandas.pydata.org/docs', category: 'Official docs & training', description: 'The reference for Python data analysis with pandas.' },

  // Interactive practice
  { title: 'SQLBolt', url: 'https://sqlbolt.com', category: 'Interactive practice', description: 'Interactive, hands-on SQL lessons from scratch.' },
  { title: 'Mode SQL Tutorial', url: 'https://mode.com/sql-tutorial', category: 'Interactive practice', description: 'SQL written for data analysts, with real examples.' },
  { title: 'W3Schools (SQL / Python)', url: 'https://www.w3schools.com', category: 'Interactive practice', description: 'Quick syntax reference for SQL and Python.' },
  { title: 'Kaggle Learn', url: 'https://www.kaggle.com/learn', category: 'Interactive practice', description: 'Free micro-courses in Python, pandas and SQL, plus practice datasets.' },

  // Statistics
  { title: 'Khan Academy — Statistics', url: 'https://www.khanacademy.org/math/statistics-probability', category: 'Statistics', description: 'Clear fundamentals of statistics and probability.' },

  // YouTube channels (search-based)
  { title: 'Alex The Analyst', url: yt('Alex The Analyst'), category: 'YouTube channels', description: 'Data analyst career and tool tutorials.' },
  { title: 'freeCodeCamp.org', url: yt('freeCodeCamp'), category: 'YouTube channels', description: 'Long-form, free full courses on data and programming.' },
  { title: 'Kevin Stratvert', url: yt('Kevin Stratvert'), category: 'YouTube channels', description: 'Approachable Microsoft Office and Excel tutorials.' },
  { title: 'Leila Gharani', url: yt('Leila Gharani'), category: 'YouTube channels', description: 'Excel and data skills, clearly explained.' },
  { title: 'ExcelIsFun', url: yt('ExcelIsFun'), category: 'YouTube channels', description: 'Deep, practical Excel training.' },
  { title: 'Corey Schafer', url: yt('Corey Schafer'), category: 'YouTube channels', description: 'Excellent Python tutorials for beginners onward.' },
  { title: 'Keith Galli', url: yt('Keith Galli'), category: 'YouTube channels', description: 'Python, pandas and real data projects.' },
  { title: 'Programming with Mosh', url: yt('Programming with Mosh'), category: 'YouTube channels', description: 'Beginner-friendly programming fundamentals.' },
  { title: 'StatQuest with Josh Starmer', url: yt('StatQuest with Josh Starmer'), category: 'YouTube channels', description: 'Statistics and machine learning, made intuitive.' },
  { title: 'Guy in a Cube', url: yt('Guy in a Cube'), category: 'YouTube channels', description: 'Power BI tips and tutorials.' },
  { title: 'Curbal', url: yt('Curbal'), category: 'YouTube channels', description: 'Power BI and DAX tutorials.' },
];

export const resourceCategories = Array.from(new Set(resources.map((r) => r.category)));
