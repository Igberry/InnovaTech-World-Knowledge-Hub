/**
 * Curated free learning resources shown on /resources/.
 * (WEBSITE-BUILD-PROMPT.md §7.6) Seeded from the Data Analysis setup guide.
 * The owner can add entries by appending to this list - nothing else to change.
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
  { title: 'Microsoft Support: XLOOKUP', url: 'https://support.microsoft.com/en-us/excel/functions/xlookup', category: 'Microsoft Office skills', description: 'Official XLOOKUP syntax and version availability, including the Excel 2016/2019 limitation (checked November 2026).' },
  { title: 'Microsoft 365 for the web', url: 'https://www.microsoft.com/en-us/microsoft-365/free-office-online-for-the-web', category: 'Microsoft Office skills', description: 'Official overview of free web versions of Word, Excel and PowerPoint; check current account and regional availability (checked November 2026).' },
  { title: 'OneDrive plans and features', url: 'https://www.microsoft.com/en-us/microsoft-365/onedrive/free-online-cloud-storage', category: 'Microsoft Office skills', description: 'Official OneDrive overview, including its free account option; check current terms and storage in your region (checked November 2026).' },
  { title: 'Microsoft Office Specialist: Associate (Microsoft 365 Apps)', url: 'https://learn.microsoft.com/en-us/credentials/certifications/microsoft-office-specialist-associate-m365-apps/', category: 'Microsoft Office skills', description: 'Official certification requirements and qualifying exams; exam fees depend on country or region (checked November 2026).' },
  { title: 'LibreOffice', url: 'https://www.libreoffice.org/', category: 'Microsoft Office skills', description: 'Official site for the free, open-source Writer, Calc and Impress desktop suite (checked November 2026).' },
  { title: 'pandas documentation', url: 'https://pandas.pydata.org/docs', category: 'Official docs & training', description: 'The reference for Python data analysis with pandas.' },

  // Interactive practice
  { title: 'SQLBolt', url: 'https://sqlbolt.com', category: 'Interactive practice', description: 'Interactive, hands-on SQL lessons from scratch.' },
  { title: 'Mode SQL Tutorial', url: 'https://mode.com/sql-tutorial', category: 'Interactive practice', description: 'SQL written for data analysts, with real examples.' },
  { title: 'W3Schools (SQL / Python)', url: 'https://www.w3schools.com', category: 'Interactive practice', description: 'Quick syntax reference for SQL and Python.' },
  { title: 'Kaggle Learn', url: 'https://www.kaggle.com/learn', category: 'Interactive practice', description: 'Free micro-courses in Python, pandas and SQL, plus practice datasets.' },

  // Statistics
  { title: 'Khan Academy - Statistics', url: 'https://www.khanacademy.org/math/statistics-probability', category: 'Statistics', description: 'Clear fundamentals of statistics and probability.' },

  // Web development
  { title: 'MDN Web Docs', url: 'https://developer.mozilla.org', category: 'Web development', description: 'The reference for HTML, CSS and JavaScript.' },
  { title: 'javascript.info', url: 'https://javascript.info', category: 'Web development', description: 'A thorough, modern JavaScript tutorial.' },
  { title: 'web.dev (Learn)', url: 'https://web.dev/learn', category: 'Web development', description: "Google's courses on HTML, CSS, accessibility and performance." },
  { title: 'The Odin Project', url: 'https://www.theodinproject.com', category: 'Web development', description: 'A free, project-based full-stack curriculum.' },
  { title: 'freeCodeCamp', url: 'https://www.freecodecamp.org', category: 'Web development', description: 'Free, interactive coding courses and projects.' },
  { title: 'React docs', url: 'https://react.dev', category: 'Web development', description: 'Official React tutorials and reference.' },
  { title: 'React Router', url: 'https://reactrouter.com', category: 'Web development', description: 'Routing for React single-page apps.' },
  { title: 'Tailwind CSS docs', url: 'https://tailwindcss.com/docs', category: 'Web development', description: 'The utility-first CSS framework, with install guides.' },
  { title: 'Vite', url: 'https://vite.dev', category: 'Web development', description: 'The fast build tool and dev server used in this course.' },
  { title: 'Supabase docs', url: 'https://supabase.com/docs', category: 'Web development', description: 'Database, auth and APIs for your apps.' },
  { title: 'GitHub Docs', url: 'https://docs.github.com', category: 'Web development', description: 'Git, GitHub, Pages and pull requests, explained.' },
  { title: 'Flexbox Froggy', url: 'https://flexboxfroggy.com', category: 'Web development', description: 'Learn CSS Flexbox as a game.' },
  { title: 'Grid Garden', url: 'https://cssgridgarden.com', category: 'Web development', description: 'Learn CSS Grid as a game.' },

  // Remote work & careers
  { title: 'LinkedIn', url: 'https://www.linkedin.com', category: 'Remote work & careers', description: 'Build a professional profile and search for jobs.' },
  { title: 'We Work Remotely', url: 'https://weworkremotely.com', category: 'Remote work & careers', description: 'A popular board for remote-first job listings.' },
  { title: 'Upwork', url: 'https://www.upwork.com', category: 'Remote work & careers', description: 'A major freelance platform (check current fees and terms).' },
  { title: 'Trello', url: 'https://trello.com', category: 'Remote work & careers', description: 'A simple task board for organising work.' },
  { title: 'Notion', url: 'https://www.notion.so', category: 'Remote work & careers', description: 'Notes, documents and task boards in one place.' },
  { title: 'Google Workspace', url: 'https://workspace.google.com', category: 'Google Workspace skills', description: 'Official overview of Google productivity apps; personal accounts and paid Workspace plans have different features.' },
  { title: 'Google Workspace Learning Center', url: 'https://support.google.com/a/users/', category: 'Google Workspace skills', description: 'Official how-to guides for Gmail, Calendar, Drive, Docs, Sheets and other Workspace apps (checked November 2026).' },
  { title: 'Google Docs, Sheets and Slides offline', url: 'https://support.google.com/docs/answer/6388102', category: 'Google Workspace skills', description: 'Official offline setup steps and browser requirements; account administrators may restrict access (checked November 2026).' },
  { title: 'Gmail search operators', url: 'https://support.google.com/mail/answer/7190', category: 'Google Workspace skills', description: 'Official examples for searching messages and creating filters (checked November 2026).' },
  { title: 'Google Sheets QUERY function', url: 'https://support.google.com/docs/answer/3093343', category: 'Google Workspace skills', description: 'Official syntax and examples for summarising Sheets data with QUERY (checked November 2026).' },
  { title: 'Google Sites publish and share', url: 'https://support.google.com/sites/answer/6372880', category: 'Google Workspace skills', description: 'Official publishing and audience settings; review who can view a site before sharing (checked November 2026).' },
  { title: 'Associate Google Workspace Administrator', url: 'https://cloud.google.com/learn/certification/associate-google-workspace-administrator', category: 'Google Workspace skills', description: 'Official certification exam details and recommended experience; verify current eligibility, fee and regional access before registering (checked November 2026).' },

  // Cybersecurity
  { title: 'Have I Been Pwned', url: 'https://haveibeenpwned.com', category: 'Cybersecurity', description: 'Check whether your email appeared in a known data breach.' },
  { title: 'Bitwarden', url: 'https://bitwarden.com', category: 'Cybersecurity', description: 'A free, reputable password manager to create and store strong passwords.' },
  { title: 'Google Safety Center', url: 'https://safety.google', category: 'Cybersecurity', description: 'Plain-language guides on accounts, 2FA, and staying safe online.' },
  { title: 'StaySafeOnline', url: 'https://staysafeonline.org', category: 'Cybersecurity', description: 'Beginner-friendly cybersecurity basics and tips.' },
  { title: 'TypingClub', url: 'https://www.typingclub.com', category: 'Typing practice', description: 'Individual typing lessons; its official site describes the individual offer as free (checked November 2026).' },
  { title: '10FastFingers', url: 'https://10fastfingers.com', category: 'Typing practice', description: 'Typing test and custom-text practice; check the current terms and options before use (checked November 2026).' },

  // Automation
  { title: 'Zapier', url: 'https://zapier.com', category: 'Automation', description: 'Connect apps with no-code "when X, do Y" automations (check current free tier).' },
  { title: 'Make', url: 'https://www.make.com', category: 'Automation', description: 'Build visual, multi-step automations between apps (check current free tier).' },
  { title: 'IFTTT', url: 'https://ifttt.com', category: 'Automation', description: 'Simple one-step automations for everyday apps and devices.' },
  { title: 'n8n', url: 'https://n8n.io', category: 'Automation', description: 'Open-source workflow automation you can self-host.' },

  // Artificial intelligence
  { title: 'Elements of AI', url: 'https://www.elementsofai.com', category: 'Artificial intelligence', description: 'A free, beginner-friendly course on what AI is and how it works.' },
  { title: 'AI for Everyone (Coursera)', url: 'https://www.coursera.org/learn/ai-for-everyone', category: 'Artificial intelligence', description: 'A non-technical overview of AI and how to use it (audit for free).' },
  { title: 'Microsoft Learn - AI', url: 'https://learn.microsoft.com/training/', category: 'Artificial intelligence', description: 'Free, structured training modules, including AI basics.' },

  // Virtual assistant tools
  { title: 'Trello', url: 'https://trello.com', category: 'Virtual assistant tools', description: 'A simple task board for tracking work per client.' },
  { title: 'ClickUp', url: 'https://clickup.com', category: 'Virtual assistant tools', description: 'Tasks, docs and projects in one tool (free tier).' },
  { title: 'Calendly', url: 'https://calendly.com', category: 'Virtual assistant tools', description: 'Let clients book time from your free slots (check current free tier).' },
  { title: 'Bitwarden', url: 'https://bitwarden.com', category: 'Virtual assistant tools', description: 'A password manager to store and share access safely.' },
  { title: 'Toggl Track', url: 'https://toggl.com/track', category: 'Virtual assistant tools', description: 'Track hours per client and task (check current free tier).' },

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
