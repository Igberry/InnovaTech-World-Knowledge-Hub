# Build Prompt: Eight Additional Courses (One File, Eight Self-Contained Sections)

> **For:** Claude Code, inside the InnovaTech World Knowledge Hub repo.
> **First read:** `COURSE-BUILD-STANDARDS.md` (safety rules, lesson template, frontmatter, writing, activation, quality checklist), then `WEBSITE-BUILD-PROMPT.md` (sections 0A, 5, 6, 7.5, 8), then **three existing Data Analysis lessons** for style.
> **Rule:** each course below fixes its **topics, week order, lessons, deliverables, assessment and templates**. **Follow them exactly.** Do not substitute your own course design, rename weeks, reorder, add or drop weekly deliverables. You write the lesson text, examples, scripts, exercises and templates **inside** the structure given. Where a section lists points, cover **all** of them in that order.

## Courses in This File

| # | Course | Slug | Weeks | Category | Icon | Order |
|---|---|---|---|---|---|---|
| 1 | Remote Ready | `remote-ready` | 4 | Career | `globe` | 4 |
| 2 | Artificial Intelligence (Practical AI for Work and Income) | `artificial-intelligence` | 8 | AI & Automation | `bot` | 5 |
| 3 | Automation (No-Code Workflows for Business) | `automation` | 8 | AI & Automation | `workflow` | 6 |
| 4 | Cybersecurity Foundations | `cybersecurity` | 12 | Cybersecurity | `shield-check` | 7 |
| 5 | Typing Skills | `typing-skills` | 4 | Digital Basics | `keyboard` | 8 |
| 6 | Microsoft Office Skills | `microsoft-office` | 6 | Office & Productivity | `app-window` | 9 |
| 7 | Google Workspace Skills | `google-workspace` | 5 | Office & Productivity | `cloud` | 10 |
| 8 | Video Editing | `video-editing` | 8 | Creative Skills | `clapperboard` | 11 |

(The first two courses already exist as "Coming soon" placeholders: keep their `title`, `category`, `icon` and `summary` as they are in the repo. The owner may reorder `order` later.)

## How to Run (for the Owner)

Build **one course per Claude Code session.** Paste, replacing `<N>` and `<Course Name>`:

```
Read prompts/COURSE-BUILD-STANDARDS.md and prompts/02-REMAINING-COURSES-PROMPT.md (the shared section 0 with rules 0.1 to 0.5, and ONLY
Course <N>: <Course Name>), then WEBSITE-BUILD-PROMPT.md (sections 0A, 5, 6, 7.5, 8) and three Data Analysis lessons for style.
Build ONLY that course exactly as specified. Do not change its weekly structure or deliverables. Ask me before deciding anything
under that course's "Open Decisions". Do not use any MCP tool connected to an external account.
```

---

## 0. Shared Rules for All Eight Courses

### 0.1 Shared fictional case: "Yenagoa Fresh Bites"
Where a course says "the running case", use this **fictional** business consistently (also used in the Web Development course):
- A small restaurant and takeaway in Yenagoa, Bayelsa State; 6 staff (owner-manager, 2 cooks, 2 counter staff, 1 delivery rider); orders by **WhatsApp, phone and walk-in**; payments by transfer, POS and cash.
- Sells rice and stew meals, grilled fish, snacks and drinks; busy lunchtime and weekends; catering for small events.
- Pain points: orders written on paper, no customer list, late replies on WhatsApp, no social media schedule, no inventory record, staff passwords shared.
- **All names, prices, phone numbers and data are fictional.** State this in each course overview. Use Naira.

### 0.2 Standard mentoring format (unless the course says otherwise)
One **90-minute weekly mentoring session** (in person where possible): 10 min review of last week's assignment, 30 min live teaching/demo, 30 min guided practice, 15 min feedback on the learner's work, 5 min assignment brief. Write a time-boxed table in each week's "Mentoring Session Plan" section, **adapted to that week's content** (do not copy one table everywhere).

### 0.3 Assessment default
Unless a course sets its own weights: **weekly assignments 40%, mid-course checkpoint 15%, capstone and presentation 30%, attendance and consistency 15%**; certificate at **70%+**. Each course states its mid-course checkpoint and capstone.

### 0.4 Current-facts rule (critical for AI, Automation, Video, Microsoft, Google, Cybersecurity)
Tools, plans, prices, free tiers, features, exam details, laws and platform policies change often. **Verify with current official sources (web search) before stating any fact**, prefer **concepts that survive tool changes**, and date-stamp time-sensitive statements ("as of <Month Year>"). List anything unverified in the handoff report. Never name a feature as "free" unless verified.

### 0.5 Each course's overview body (`_course.md`) must include
Audience; outcomes; weekly plan table; weekly time budget; the running case (with the fictional notice); assessment table; certificate rule; tools and accounts; how mentoring works; an "Is this right for me?" section; and the **honest-outcomes statement** (success = real skills + a portfolio + consistent practice, not guaranteed jobs or income). **Do not publish fees or pricing**; say "Ask on WhatsApp about enrolment."

---

# COURSE 1: Remote Ready

## 1.1 Snapshot (Fixed)
| Item | Value |
|---|---|
| Title | Remote Ready |
| Full title | Remote Ready: Position Yourself to Get Hired in the Global Remote Market |
| Slug | `remote-ready` |
| Duration | **4 weeks**, cohort-based career positioning program |
| Format | **12 lessons** (3 per week, originally pre-recorded video; write each as a full **written lesson** plus a hidden recording outline) + **4 live Google Meet workshops** (1 per week) + weekly worksheets and templates + cohort WhatsApp group |
| Audience | Working professionals in **software development, marketing, design and research** who have real skills but whose profile, portfolio and proposals are not landing remote clients or roles |
| Outcome | A sharp Personal Positioning Statement; optimised LinkedIn, live portfolio and remote-ready CV (all aligned); a weekly system for finding and applying to remote opportunities; proposals and cover letters that get replies; rehearsed interviews and rate negotiation |
| Tagline (use) | "A 4-week career positioning program for professionals who want remote work, not just remote hope." |
| Summary (keep placeholder's) | "Position yourself for global remote roles: profiles, portfolios, and interviews." |
| Level / category / icon / order | `Beginner to Intermediate` (professionals new to remote) / `Career` / `globe` / `4` |
| Plans | The original offer has three support levels (video-only, video + live workshops, and a mentorship level with two 1:1 sessions and an in-person graduation seat in Yenagoa). **Do not publish prices.** Describe support levels only if the owner confirms (Open Decision 1) |
| Certificate | Completion certificate (the owner's offer also mentions lifetime access to recorded lessons: **do not repeat that claim** unless the owner confirms) |

## 1.2 Who It Is For (Write Four Short Profile Cards in the Overview)
- **Software development:** can build, but profile, portfolio and proposals are not landing remote clients or roles.
- **Marketing:** real results, but needs positioning to compete in a saturated global market.
- **Design:** strong work, but needs a portfolio and outreach system that gets seen by the right clients.
- **Research:** translating academic or local experience into a remote-hireable professional profile.

## 1.3 Weekly Plan (Fixed)
| Wk | Theme | Lessons (written) | Live workshop (60 to 90 min) | Deliverable |
|---|---|---|---|---|
| 1 | Foundation and Positioning | 1.1 The Remote Market Reality; 1.2 Skills Audit and Niche; 1.3 Your Positioning Statement | Positioning Clinic | Skills audit + Positioning Statement |
| 2 | Branding and Presence | 2.1 LinkedIn That Gets Found; 2.2 Proof of Work: Your Portfolio; 2.3 The Remote-Ready CV | Profile and Portfolio Clinic | LinkedIn + portfolio plan/links + CV |
| 3 | Platforms and Outreach | 3.1 Where Remote Work Is and the Weekly Application System; 3.2 Proposals and Cover Letters That Convert; 3.3 Outreach and Networking | Proposal Clinic | Application tracker + 2 tailored proposals + 3 outreach messages |
| 4 | Interview and Landing | 4.1 Remote Interviews; 4.2 Rates, Offers and Negotiation; 4.3 Landing and Starting Strong | Mock Interviews and Negotiation Role-Play | Interview rehearsal + rate plan + 30-day start plan |

**Assessment (course-specific):** Worksheets and deliverables 60% (Wk 1: 15, Wk 2: 20, Wk 3: 15, Wk 4: 10) · Live workshop participation 15% · Final "Remote-Ready Package" review 25%. Certificate at 70%+ (for the video-only level, the owner decides; see Open Decision 2).

## 1.4 `_course.md` Frontmatter
```yaml
---
title: "Remote Ready"
slug: remote-ready
status: available
category: "Career"
level: "Beginner to Intermediate"
duration: "4 weeks"
format: "12 lessons + 4 live workshops + weekly worksheets"
summary: "Position yourself for global remote roles: profiles, portfolios, and interviews."
outcomes:
  - "Write a sharp positioning statement that tells clients why to hire you"
  - "Build an aligned LinkedIn profile, portfolio and remote-ready CV"
  - "Run a weekly system for finding and applying to the right remote opportunities"
  - "Write proposals and cover letters that get replies"
  - "Rehearse remote interviews and negotiate your rate with confidence"
tools: ["LinkedIn", "Google Docs", "Upwork", "GitHub / Behance / Notion portfolio", "Google Meet"]
icon: "globe"
order: 4
featured: false
---
```

## 1.5 Setup Guide (`00-setup-guide.md`)
Professional email; Google account and a folder structure (`Remote-Ready/01-Positioning`, `02-Profiles`, `03-Portfolio`, `04-Applications`, `05-Interviews`); camera, microphone, lighting, **internet and power backup plan** for live workshops and interviews; LinkedIn account readiness (photo, two-factor authentication); copy of the **Application Tracker**; how to join the cohort WhatsApp group and its etiquette (no spam, constructive feedback, privacy); verification checklist.

## 1.6 Week-by-Week Content Specification

### Week 1: Foundation and Positioning
**Goal:** Know what remote employers and clients actually look for, audit your skills, and write your positioning statement.

**Lesson 1.1 The Remote Market Reality.** (1) The difference between **remote employee, contractor/freelancer and agency/outsourced** (table: how paid, contract, benefits, risk, who it suits). (2) What remote employers screen for: **proof of work, written communication, reliability, self-management, time-zone overlap, tool fluency**. (3) Why generic profiles ("hardworking professional seeking opportunities") fail; examples of weak vs strong positioning. (4) Nigerian realities **handled honestly**: time zones, power and data resilience, payment methods, trust gaps, and how to address each in your profile (e.g., state your backup plan). (5) Competition: you compete globally, so you need a **specific, provable niche**. (6) Self-check: "Which of the six employer signals do I already show, and which are missing?" *Worksheet:* "Remote signal scorecard" (score each signal 1 to 5 with evidence).

**Lesson 1.2 Skills Audit and Niche.** (1) Inventory: skills, tools, results, industries, clients, problems solved, languages. (2) **Evidence mapping:** every claimed skill must have proof (link, number, testimonial, project). (3) Transferable-skills translation for local experience (examples for each of the four professions). (4) **Niche formula:** *Profession x industry or client type x specific outcome*, with 3 worked examples per profession (e.g., marketer: "social media for restaurants"; developer: "landing pages and booking sites for small service businesses"; designer: "brand identity for faith-based organisations"; researcher: "market and user research briefs for startups"). (5) A **decision matrix** for choosing between 2 to 3 niches (demand, proof, interest, competition, rate potential). *Worksheet:* "Skills and Proof Audit" + "Niche Decision Matrix".

**Lesson 1.3 Your Positioning Statement.** (1) The formula: **"I help [specific audience] achieve [specific result] using [skills/tools], backed by [proof]."** (2) Three versions to write: 1-sentence (headline), 3-sentence (About opening), 30-second spoken pitch. (3) Before and after examples for each profession (fictional people). (4) A test: **the stranger test** (read it to someone; can they repeat what you do?) and **the specificity test** (could a competitor say the same sentence?). (5) Common mistakes. *Worksheet:* "Positioning Statement Builder".

**Live Workshop (Positioning Clinic, 90 min):** 10 min goals; 20 min examples of strong vs weak statements; 40 min each participant reads their statement and receives structured feedback (use the two tests); 15 min rewrite; 5 min assignment brief.
**Assignment (due before Week 2):** completed Skills and Proof Audit; Niche Decision Matrix; Positioning Statement (3 versions). **Grading:** specificity 40%, proof 30%, clarity 20%, completeness 10%.
**Downloads:** `remote-signal-scorecard.md`, `skills-and-proof-audit.csv`, `niche-decision-matrix.csv`, `positioning-statement-builder.md`.

### Week 2: Branding and Presence
**Goal:** Build a LinkedIn profile, portfolio and CV that prove you are hireable and say the same thing.

**Lesson 2.1 LinkedIn That Gets Found.** (1) How recruiters and clients search (keywords, filters); (2) **Headline formula:** *Role | Niche | Proof or tools* (3 examples per profession); (3) **About section structure** (4 parts: who you help and the result; how you do it; proof with numbers; call to action with how to contact you); (4) Experience bullets: **Action + Metric + Result** (rewrite 5 weak bullets); (5) Featured section, skills, recommendations (how to ask), custom URL, photo and banner guidance; (6) Profile settings: open to work (recruiter-only vs public), location and time-zone statements; (7) Keywords placement; (8) A 15-minute weekly LinkedIn routine. *Worksheet:* "LinkedIn Profile Checklist (25 points)".

**Lesson 2.2 Proof of Work: Your Portfolio.** (1) Why portfolios beat CVs for remote hiring. (2) **Portfolio by profession (give each its own subsection with a "minimum viable portfolio"):** Software developers: GitHub profile README, 3 pinned repos with READMEs, 1 to 2 live demos, clean commit history; marketers: 2 to 3 case studies (goal, strategy, actions, results with numbers; if no client data, use a **clearly labelled self-initiated or mock case**), sample content, a one-page results summary; designers: 4 to 6 pieces, 2 case studies showing **problem, process, outcome**, consistent presentation, mobile-friendly; researchers: 2 to 3 writing samples or research briefs, a methods summary, publications or reports list, a sample insight deck. (3) The **case study template** (Context, Role, Challenge, Approach, Result, Lesson). (4) Hosting options (Notion, GitHub Pages, Behance, personal site; verify free options). (5) Permissions and confidentiality when showing client work. (6) **No-experience route:** build 2 mock projects for fictional clients and label them honestly. *Worksheet:* "Portfolio Plan" (profession, 3 pieces, deadlines).

**Lesson 2.3 The Remote-Ready CV.** (1) 1 to 2 pages, ATS-friendly (simple layout, standard headings, no tables/graphics for text, PDF unless asked). (2) Structure: header (name, headline, location/time zone, links), summary (positioning statement), skills grouped, experience with **Action + Metric + Result** bullets, projects, education, certifications. (3) **Remote signals to include:** time-zone overlap, tools (Slack, Notion, Jira, etc.), async work experience, communication examples. (4) Tailoring: a 10-minute routine to adapt a CV to a job post using its keywords honestly. (5) Do/don't table. (6) Common mistakes (photo/age/marital status, long paragraphs, duties instead of results). *Worksheet:* "CV Tailoring Checklist".

**Live Workshop (Profile and Portfolio Clinic, 90 min):** screen-share reviews, each participant gets feedback on headline/About, one portfolio piece and CV top third; use the checklists as the scoring tool.
**Assignment (due before Week 3):** updated LinkedIn (link or screenshots), portfolio (links or a plan plus at least 1 finished piece), CV (PDF). **Grading:** alignment with positioning statement 30%, proof quality 30%, clarity and keywords 25%, polish 15%.
**Downloads:** `linkedin-profile-checklist.md`, `case-study-template.md`, `portfolio-plan-template.md`, `cv-template.md`, `cv-tailoring-checklist.md`, `linkedin-headline-and-about-examples.md`.

### Week 3: Platforms and Outreach
**Goal:** Build a weekly application system and write messages that get replies.

**Lesson 3.1 Where Remote Work Is and the Weekly Application System.** (1) Channels table: remote job boards, freelance marketplaces, direct outreach, referrals and networks, LinkedIn jobs; **verify each named platform still exists and is accessible to applicants from Nigeria** (candidates to check: LinkedIn Jobs, We Work Remotely, Remote OK, Remotive, Upwork, Fiverr, Wellfound, OnlineJobs.ph, Contra); label what each is best for. (2) **Quality over volume:** target **5 to 10 tailored applications per week** (a default; explain why) and a weekly time budget. (3) The **Application Tracker** (columns below) and a weekly review ritual. (4) Reading a job post: must-haves, nice-to-haves, red flags, hidden requirements, time zone. (5) Job-alert setup. (6) **Scam awareness:** pay-to-apply, fake recruiters, cheque overpayment, requests to move chats off-platform immediately, too-good rates; a verification checklist. *Worksheet:* "Weekly Application Plan".

**Lesson 3.2 Proposals and Cover Letters That Convert.** (1) The **Problem, Proof, Plan (PPP) framework**: Problem (mirror their need in their words), Proof (one relevant result or sample), Plan (what you will do first, timeline, rate or availability, one clear next step). (2) Proposal vs cover letter: when to use each; length rules (proposal 120 to 200 words; cover letter 3 short paragraphs). (3) Three annotated before and after examples (one developer, one marketer or designer, one researcher; all fictional). (4) Subject lines and first lines. (5) Customisation checklist (10 points) and a **reusable-parts library** (proof snippets, plan snippets). (6) Follow-up message schedule (day 3, day 7). (7) Common mistakes. *Worksheet:* "PPP Proposal Builder" + "Proposal Scoring Checklist".

**Lesson 3.3 Outreach and Networking.** (1) Cold outreach structure (one-line intro, observation, specific help, proof, easy next step). (2) LinkedIn connection notes and follow-up DMs (3 templates); email template; (3) **Warm networking:** informational conversations, commenting with value, communities, alumni and referral requests (a referral-request template). (4) Rejection and no-reply handling; resilience routine. (5) A weekly outreach quota (default 5 messages) and tracking. *Worksheet:* "Outreach Message Pack (3 messages)".

**Live Workshop (Proposal Clinic, 90 min):** each participant brings a real job post and a draft proposal; score against the checklist; live rewrite; practise one outreach message.
**Assignment (due before Week 4):** Application Tracker started with at least 5 entries; 2 tailored proposals or cover letters for real posts; 3 outreach messages sent or ready to send. **Grading:** tailoring 35%, proof 25%, clarity 20%, tracker discipline 20%.
**Tracker columns (exact):** `Date, Platform, Role / Client, Niche Match?, Proposal Used, Status, Follow-Up Date, Notes`.
**Downloads:** `application-tracker-template.csv`, `weekly-application-plan.md`, `ppp-proposal-builder.md`, `proposal-scoring-checklist.md`, `outreach-message-pack.md`, `referral-request-template.md`, `scam-verification-checklist.md`.

### Week 4: Interview and Landing
**Goal:** Interview well, negotiate fairly and start strong.

**Lesson 4.1 Remote Interviews.** (1) Stages: screening call, hiring-manager interview, technical or practical test, culture/values round, async video interviews; (2) tech setup and rehearsal (camera, sound, lighting, backup internet and power, fallback plan and how to communicate if it fails); (3) **STAR method** with 4 worked examples (fictional); (4) Answering "Tell me about yourself" from your positioning statement; (5) Role-specific question banks (developer, marketer, designer, researcher: 8 questions each) and a **practical test** guide (time management, asking clarifying questions, communicating assumptions); (6) Questions to ask the interviewer (10); (7) Follow-up email template. *Worksheet:* "Interview Story Bank" (5 STAR stories).

**Lesson 4.2 Rates, Offers and Negotiation.** (1) How to **research rates** (job posts, platform data, peers; do not quote figures as facts). (2) Pricing models: hourly, fixed project, retainer, salary; when to use each. (3) Currency and payments: USD vs NGN, receiving payments (Payoneer, Wise, local bank transfer; **verify current availability, fees and rules; date-stamp**), invoicing and contracts basics, **50% deposit** for freelance work. (4) Negotiation scripts: responding to "what's your rate?", lowball offers, scope creep, asking for a raise; (5) **Reading an offer or contract:** scope, payment terms, IP ownership, termination, probation, hours and time-zone expectations. (6) **When to walk away.** (7) Tax and legal: advise getting professional advice for taxes and contracts; **do not give specific tax rules**. *Worksheet:* "Rate and Negotiation Plan" (minimum, target, walk-away).

**Lesson 4.3 Landing and Starting Strong.** (1) The **first 30 days plan** (week 1 listen and set up, week 2 small wins, weeks 3 to 4 ownership); (2) **Async communication norms:** written updates, clear subject lines, response times, status updates, documenting decisions; (3) Managing time zones (a worked example with a UK or US client and a Nigerian schedule); (4) Tools clients commonly use (Slack, Notion, Trello, Zoom, Loom; verify free tiers if you mention them); (5) Reliability under power or internet problems: communicate early, have a backup; (6) Asking for feedback and testimonials; (7) Growing from first gig to repeat clients; (8) Burnout and boundaries. *Worksheet:* "30-Day Start Plan".

**Live Workshop (Mock Interviews and Negotiation Role-Play, 90 min):** pairs rotate as interviewer and candidate using the role-specific banks and a scoring rubric; one negotiation role-play per participant; group debrief; graduation notes.
**Final Remote-Ready Package (due end of Week 4):** Positioning Statement; LinkedIn; portfolio; CV; tracker with at least 10 entries across Weeks 3 to 4; 2 proposals; interview story bank; rate plan; 30-day start plan. Review against a rubric (alignment, proof, clarity, evidence of action).
**Downloads:** `interview-story-bank.md`, `interview-question-banks-by-role.md`, `mock-interview-scoring-rubric.md`, `rate-and-negotiation-plan.md`, `offer-and-contract-checklist.md`, `thirty-day-start-plan.md`, `remote-ready-package-checklist.md`.

## 1.7 Facilitator Notes (in each weekly file, hidden on the site)
Recording outline for each lesson (5 to 7 timed bullets for the owner to record a video), workshop preparation list, common participant mistakes, and facilitation tips. **Model answers and sample "gold standard" profiles go only in `_facilitator/remote-ready/`.**

## 1.8 Course-Specific Rules
- Use **fictional example people** only; never real names. No salary or rate figures as facts. No promise of employment.
- Keep Nigeria-specific advice practical and honest; do not stereotype employers.
- Cross-link: Week 3 proposals to VA Launch Week 5 (platform tour) and Web Development Week 12 where relevant.

## 1.9 Open Decisions
| # | Decision | Default |
|---|---|---|
| 1 | Show the three support levels (and prices) on the site? | Describe levels only; no prices |
| 2 | Certificate for the video-only level? | Certificate requires submitting the Final Package |
| 3 | Use "lifetime access" wording? | Omit |
| 4 | Live workshops on fixed dates? | Not shown; arranged per cohort |

---

# COURSE 2: Artificial Intelligence (Practical AI for Work and Income)

## 2.1 Snapshot (Fixed)
| Item | Value |
|---|---|
| Title | Artificial Intelligence: Practical AI for Work and Income |
| Slug | `artificial-intelligence` |
| Duration | **8 weeks** |
| Format | Weekly written lessons + hands-on exercises + weekly assignment + 90-min mentoring (see 0.2) |
| Audience | Complete beginners to AI: job seekers, freelancers, students, small-business owners and office workers. **No coding required** (an optional stretch task appears in Week 7) |
| Focus | **Using AI tools well, safely and honestly** to do real work, build services and stay employable. **Not** a machine-learning engineering course (see Open Decision 1) |
| Outcome | A tested personal prompt library, a documented set of AI workflows for a small business, a custom assistant, a verification habit, a responsible-use policy, and an AI-assisted service offer in a portfolio |
| Summary | "Use AI tools confidently and responsibly to work faster, create better content and offer new services." |
| Level / category / icon / order | `Beginner` / `AI & Automation` / `bot` / `5` |
| Running case | Yenagoa Fresh Bites (0.1) plus a second persona, **Amaka**, a fictional job seeker, for CV and career tasks |

## 2.2 Frameworks This Course Teaches (Define Them Once in Week 1/2 and Reuse by Name)
- **CRAFT prompt framework:** **C**ontext (who/what/why), **R**ole (who the AI should act as), **A**ction (exactly what to do), **F**ormat (structure, length, tables, steps), **T**one and constraints (voice, audience, limits, what to avoid).
- **ASK-CRITIQUE-REFINE loop:** draft, ask the AI to critique against your criteria, refine, then human review.
- **VERIFY checklist:** **V**alidate claims against sources, **E**xamine numbers by hand on a sample, **R**un a second opinion (different tool or search), **I**dentify what is private, **F**lag uncertain items, **Y**ou are responsible for the final output.
- **AI Use Log:** a table recording date, task, tool, prompt summary, what was verified, time saved (honest estimate), and lessons. Learners keep it for the whole course.

## 2.3 Weekly Plan and Assessment
| Wk | Topic | Deliverable |
|---|---|---|
| 1 | AI Foundations and Safe Setup | Two-tool comparison experiment + AI Use Log started |
| 2 | Prompting Fundamentals | Personal prompt library (15 tested prompts) |
| 3 | AI for Writing, Research and Communication | Verified one-page research brief |
| 4 | AI for Business and Productivity | AI toolkit: 8 documented workflows |
| 5 | AI with Data and Spreadsheets | Verified data analysis summary |
| 6 | AI for Content and Visuals | One-week content pack + brand guide + disclosure note |
| 7 | Building with AI: Custom Assistants | FAQ assistant + 20-question test sheet |
| 8 | Responsible AI, Careers and Capstone | Capstone: AI Workflow Package + presentation |

**Assessment:** weekly assignments (Weeks 1 to 7) 40% · mid-course checkpoint at end of Week 4 (a 90-minute practical: given a messy business scenario, produce 3 AI-assisted outputs with CRAFT prompts, a VERIFY note and an AI Use Log entry) 15% · capstone and presentation 30% · attendance and consistency (AI Use Log completeness) 15%.

## 2.4 `_course.md` Frontmatter
```yaml
---
title: "Artificial Intelligence: Practical AI for Work and Income"
slug: artificial-intelligence
status: available
category: "AI & Automation"
level: "Beginner"
duration: "8 weeks"
format: "Weekly lessons + hands-on practice + 90-minute mentoring"
summary: "Use AI tools confidently and responsibly to work faster, create better content and offer new services."
outcomes:
  - "Explain what AI can and cannot do, in plain language"
  - "Write clear prompts and improve results with a repeatable method"
  - "Verify AI output and protect private information"
  - "Build AI-assisted workflows and a custom assistant for a small business"
  - "Package AI skills into a portfolio and service offer"
tools: ["AI chat assistants", "Spreadsheets", "Canva or similar", "Google Docs / Word"]
icon: "bot"
order: 5
featured: false
---
```

## 2.5 Setup Guide (`00-setup-guide.md`)
Create accounts for **at least two** general AI chat assistants (verify current free tiers and sign-up requirements; do not endorse one tool); browser and phone readiness; a data-light usage guide (low-bandwidth habits); the AI Use Log template; a **"never paste this" list** (passwords, ID numbers, bank details, clients' confidential files, other people's private information); how to turn off or limit chat history/training use where the tool allows it (verify per tool); verification checklist.

## 2.6 Week-by-Week Content Specification

### Week 1: AI Foundations and Safe Setup
**Lessons:** (1.1) **What AI is, in plain language:** AI vs machine learning vs generative AI; how large language models work conceptually (learn patterns from large text collections and predict likely next words; no claims of human understanding); training data and knowledge cut-offs; context window. (1.2) **What AI is good at and bad at** (table: drafting, summarising, brainstorming, rewriting, translation help, structuring vs maths without checking, recent facts, citations, niche local facts, legal/medical/financial decisions). (1.3) **Hallucinations:** what they are, 3 fictional examples (invented citation, wrong calculation, made-up local fact) and how to spot them. (1.4) **Tool landscape by category:** chat assistants, image generators, audio/video tools, coding assistants, search/research assistants, built-in AI in Office/Google tools (name categories first; name specific tools only after verification and date-stamp). (1.5) **Privacy and safety basics:** the "never paste" list; reading a tool's data-use settings; Nigeria's data protection principles at a high level (consent, minimisation; no legal advice). (1.6) **First conversations:** try a task, then **challenge the answer** (ask for sources, ask what it is unsure about). (1.7) Introduce the **AI Use Log**.
**Exercises:** 5 starter tasks (summarise a paragraph, draft a polite WhatsApp reply, explain a concept to a 12-year-old, suggest 10 names for a snack, convert a list into a table).
**Assignment:** run the **same 5 tasks in two different tools**, score each output 1 to 5 on accuracy, usefulness, tone and risk, and write a 200-word reflection; start the AI Use Log (at least 8 entries). **Grading:** method 40%, honest scoring 30%, reflection 20%, log 10%.
**Downloads:** `ai-use-log-template.csv`, `two-tool-comparison-sheet.csv`, `never-paste-list.md`.

### Week 2: Prompting Fundamentals
**Lessons:** (2.1) Why vague prompts fail (anatomy of a bad prompt). (2.2) **The CRAFT framework** with 3 fully worked examples (Fresh Bites WhatsApp reply, Amaka's cover letter, a lesson summary). (2.3) **Giving examples** (show the style you want) and **asking the AI to ask you questions** before it answers. (2.4) **Step-by-step requests** and requesting structured formats (tables, checklists, scripts, JSON-like lists for later automation). (2.5) The **ASK-CRITIQUE-REFINE loop** with a live example. (2.6) Prompt patterns library: summariser, rewriter, explainer, critic, planner, role-player, extractor. (2.7) Evaluating output with a **5-point rubric** (accuracy, completeness, tone, format, risk). (2.8) Saving prompts and versioning them.
**Exercises:** rewrite **10 weak prompts** (supplied in the lesson) using CRAFT; compare outputs; run the loop twice on one task.
**Assignment:** **Prompt Library**: 15 prompts across at least 5 patterns, each with purpose, CRAFT breakdown, a sample output summary, rating and an improvement note. **Grading:** quality of prompts 40%, evidence of testing 30%, organisation 20%, reflection 10%.
**Downloads:** `weak-prompts-to-fix.md`, `prompt-library-template.csv`, `craft-cheat-sheet.md`, `output-rubric.md`.

### Week 3: AI for Writing, Research and Communication
**Lessons:** (3.1) Writing with AI: emails, WhatsApp messages, notices, bios, CVs and cover letters **honestly** (your facts, AI structure and wording; never invent experience). (3.2) Editing: shorten, change tone, fix grammar, plain-language rewrites. (3.3) **Translation and local languages:** using AI to help with Pidgin, Yoruba, Igbo, Hausa and other languages carries **quality risk**; always have a fluent person review; use it for drafts, not final public messages. (3.4) **Research workflow:** plan questions with AI, gather sources yourself (search engines, official sites), ask AI to summarise **provided** text, then **VERIFY** each claim; why AI-generated citations must be checked and never trusted blindly. (3.5) Summarising documents safely (privacy rules). (3.6) Writing reports and briefs: outline, draft, critique, final human edit. (3.7) Avoiding plagiarism and disclosing AI help where required.
**Exercises:** rewrite 3 messages in different tones; verify 5 AI-stated facts using official sources; summarise a supplied fictional policy memo.
**Assignment:** a **one-page research brief** on a supplied topic (provide 3 topic options: "mobile money fraud awareness for small shops", "benefits of a customer list for small food businesses", "basics of safe online freelancing") with **at least 5 verified claims and sources**, plus an AI Use Log entry showing what you verified and what you rejected. **Grading:** accuracy and verification 40%, clarity 25%, honesty of the log 20%, formatting 15%.
**Downloads:** `fictional-policy-memo.md`, `research-brief-template.md`, `verify-checklist.md`.

### Week 4: AI for Business and Productivity (Mid-Course Checkpoint)
**Lessons:** (4.1) **Business context sheet:** a reusable paragraph describing the business, audience, tone and rules that you paste into prompts (build one for Fresh Bites). (4.2) Customer service: reply templates, FAQs, handling complaints; **human review rule** for anything sent to customers. (4.3) Operations: SOPs, checklists, meeting notes and action items, planning and scheduling, simple policies. (4.4) Marketing basics: offers, product descriptions, content calendars (full content pack comes in Week 6). (4.5) Sales: proposals and quotes drafted with AI and checked by you. (4.6) **Job-seeker tasks (Amaka):** tailor a CV honestly, interview practice with AI as interviewer, feedback on a cover letter. (4.7) Measuring benefit honestly: time saved vs time reviewing; where AI is **not** worth it.
**Exercises:** build the business context sheet; draft 5 customer replies; turn a messy voice-note transcript into meeting minutes.
**Assignment:** **AI Toolkit:** 8 documented workflows for Fresh Bites (each: task, CRAFT prompt, steps, human review step, risk note, before and after time estimate measured by you). **Grading:** workflow quality 35%, review and risk thinking 30%, honest measurement 20%, presentation 15%.
**Mid-course checkpoint (end of week, 90 min):** as in 2.3.
**Downloads:** `business-context-sheet-template.md`, `workflow-documentation-template.md`, `customer-reply-scenarios.md`, `messy-voice-note-transcript.md`.

### Week 5: AI with Data and Spreadsheets
**Lessons:** (5.1) What AI can do with spreadsheets: explain formulas, write formulas, clean text, suggest charts, summarise findings (verify which built-in AI features exist in Excel and Google Sheets now; date-stamp). (5.2) **Prepare data for AI:** anonymise (remove names/phones), small samples, clear column descriptions. (5.3) **Never trust numbers blindly:** the **hand-check method** (recalculate 5 numbers yourself). (5.4) Ask-AI-to-explain-the-formula habit. (5.5) Cleaning messy data with AI and with the learner's own Excel skills (cross-link to Data Analysis Week 2). (5.6) Turning results into plain-language insights and recommendations. (5.7) Limits and privacy: do not upload customer data to tools without permission/policy.
**Exercises:** use AI to explain 5 formulas; ask for a formula to compute net revenue and test it; ask for 5 insight questions about the data.
**Assignment:** analyse the supplied **`fresh-bites-sales-sample.csv` (200 fictional rows)** with AI help; deliver a 1-page summary with **5 numbers you verified by hand** (show the checks) and 3 recommendations. **Grading:** accuracy 40%, verification evidence 30%, insight quality 20%, clarity 10%.
**Downloads:** `fresh-bites-sales-sample.csv` (generate 200 fictional rows: date, item, category, quantity, unit price in Naira, payment method, channel `WhatsApp/Walk-in/Phone`), `hand-check-worksheet.md`.

### Week 6: AI for Content and Visuals
**Lessons:** (6.1) **Brand guide in one page** (voice, audience, colours, do and don't words). (6.2) Social media: post ideas, captions, hashtags, scripts for short videos (cross-link Video Editing). (6.3) **Image generation:** prompt anatomy (subject, style, composition, lighting, mood, avoid), iteration, limits (text in images, faces, hands, consistency), realism and **honest labelling**. (6.4) Presentations and design with AI features (verify tools; date-stamp). (6.5) **Copyright, licensing and attribution:** who owns AI outputs depends on tool terms and law, so **read the terms**; avoid copying living artists' styles or brand logos; do not use celebrities' likeness. (6.6) **Misinformation and deepfakes:** never create misleading images of real people or events; how to fact-check images (reverse image search concept). (6.7) Disclosure norms.
**Exercises:** write 10 captions in Fresh Bites's voice; create 3 image prompts and refine each twice; write a disclosure line.
**Assignment:** **One-week content pack** for Fresh Bites: brand guide (1 page), 7 posts (caption + image or graphic concept), 1 short-video script, 1 disclosure note, and a log of what was edited by hand. **Grading:** brand consistency 30%, quality and usefulness 30%, ethics and disclosure 25%, process log 15%.
**Downloads:** `brand-guide-template.md`, `image-prompt-anatomy.md`, `content-pack-template.md`.

### Week 7: Building with AI: Custom Assistants
**Lessons:** (7.1) What a **custom assistant** is (a saved set of instructions + reference documents inside an AI tool; verify the feature names and availability on current free plans). (7.2) Writing **system instructions:** role, scope, tone, what it must refuse, how to say "I don't know", escalation to a human. (7.3) Reference material: building a clean FAQ document for Fresh Bites. (7.4) **Testing:** a 20-question test sheet (10 normal, 5 tricky, 5 out-of-scope), scoring and fixing. (7.5) Safety: **prompt injection** (concept: hostile text in user input or documents trying to override instructions), never put secrets in instructions, human handoff. (7.6) Where this connects: automation (cross-link Automation Week 7). (7.7) **Optional stretch (no marks):** a short Python script calling an AI provider's API using the **official documentation**, with the learner's own key kept out of code and Git. Mark this clearly optional and verify the current docs before writing any code.
**Exercises:** write instructions for 3 assistants (FAQ bot, CV coach, content helper); test and revise.
**Assignment:** build a **Fresh Bites FAQ assistant**; submit its instructions, the FAQ document, the 20-question test sheet with results, and a failure analysis (3 failures and fixes). **Grading:** instruction quality 30%, testing rigour 35%, safety thinking 20%, documentation 15%.
**Downloads:** `fresh-bites-faq-document.md`, `assistant-instructions-template.md`, `assistant-test-sheet.csv`.

### Week 8: Responsible AI, Careers and Capstone
**Lessons:** (8.1) **Responsible use policy** (personal and small-business): privacy, accuracy, transparency, human review, record-keeping. (8.2) Bias and fairness with Nigerian and African examples (language, names, images). (8.3) Security basics: data leaks, prompt injection, fake AI tools and scams, deepfake voice scams. (8.4) Data protection basics for SMEs (principles only; no legal advice). (8.5) Academic and workplace integrity: disclose when required; follow employer policy. (8.6) **AI and jobs, honestly:** tasks change faster than jobs; avoid hype and predictions; focus on skills that complement AI (judgement, domain knowledge, communication, verification). (8.7) **Packaging AI skills as services:** examples (content support, admin automation support, research and summaries, training small teams, prompt libraries for businesses), how to price using hours and outcomes (teach method, no figures), a one-page service menu, a portfolio page, and honest marketing. (8.8) Capstone brief and presentation tips.
**Capstone (the AI Workflow Package):** for a fictional or consenting small business, deliver (1) business context sheet, (2) 5 documented workflows with CRAFT prompts, (3) a custom assistant with test results, (4) a verification and risk plan, (5) a responsible-use policy (1 page), (6) a service menu, (7) a 10-minute presentation. **Rubric:** usefulness 25, verification and safety 25, quality of documentation 20, ethics and honesty 15, presentation 15.
**Downloads:** `responsible-use-policy-template.md`, `service-menu-template.md`, `capstone-rubric.md`.

## 2.7 Course-Specific Rules
- **No hype.** No claims that AI will make money automatically or replace/guarantee jobs. Show limits and failures.
- **Neutrality:** teach concepts first; name tools only after verification and in a "tools as of <Month Year>" box; do not push paid tools.
- **No misuse:** never teach cheating, impersonation, scams, fake reviews, deepfakes of real people, or bypassing tool safeguards.
- Do not paste real personal data in examples. All examples fictional.
- Keep a "What changed since this was written" note in the overview telling learners to check tool details.

## 2.8 Open Decisions
| # | Decision | Default |
|---|---|---|
| 1 | Add a later "Machine Learning with Python" course? | Not in this build; mention as a future track |
| 2 | Which two AI assistants to use in Week 1? | Any two with working free access after verification |
| 3 | Include the optional Week 7 API stretch? | Yes, clearly optional |
| 4 | Show certificate on the course page? | Yes (70%+) |

---

# COURSE 3: Automation (No-Code Workflows for Business)

## 3.1 Snapshot (Fixed)
| Item | Value |
|---|---|
| Title | Automation: No-Code Workflows for Business |
| Slug | `automation` |
| Duration | **8 weeks** |
| Format | Weekly written lessons + guided builds + weekly assignment + 90-min mentoring |
| Audience | Beginners comfortable with a computer and spreadsheets (the Google Workspace or Microsoft Office course is recommended first; not required) |
| Outcome | The ability to map a process, automate it with spreadsheets and no-code tools, connect apps with APIs and webhooks, add AI steps safely, and **package and sell automation services** |
| Summary | "Automate repetitive business tasks with spreadsheets, no-code tools and simple integrations." |
| Level / category / icon / order | `Beginner` / `AI & Automation` / `workflow` / `6` |
| Running case | Yenagoa Fresh Bites (0.1): reservations and orders, enquiries, reminders, invoices, social posting |
| Tools (decided) | **Google Sheets, Google Forms, Google Apps Script (intro)** · **Zapier (primary no-code platform)** · **Make (second platform)** · **n8n (overview and comparison)** · a free API-testing tool (Hoppscotch or Postman, verify) |

## 3.2 Frameworks This Course Teaches
- **FTES score** (for choosing what to automate): **F**requency (how often), **T**ime (minutes per run), **E**rror risk (how costly mistakes are), **S**tability (how consistent the steps are). Score each 1 to 5; automate high F, T and S first; treat high E with human approval steps.
- **Trigger → Filter → Action → Log** pattern for every workflow.
- **Automation Runbook:** one page per workflow: purpose, trigger, steps, accounts used, owner, error contact, how to pause, how to test.
- **Time-saved formula:** (minutes per run x runs per week x 52) ÷ 60 = hours per year (show worked examples; always net out setup and maintenance time).

## 3.3 Weekly Plan and Assessment
| Wk | Topic | Deliverable |
|---|---|---|
| 1 | Automation Thinking and Process Mapping | 3 mapped and FTES-scored processes |
| 2 | Spreadsheet and Forms Automation | Reservation form to sheet with status and confirmation email |
| 3 | No-Code I: Zapier | 2 documented working zaps |
| 4 | No-Code II: Make and n8n | Rebuild in Make + comparison memo |
| 5 | APIs, Webhooks and JSON | Daily weather workflow + webhook test |
| 6 | Business Automations for Small Businesses | 2 implemented business recipes |
| 7 | AI Inside Automations | Email triage workflow with human approval |
| 8 | Delivering Automation as a Service and Capstone | Capstone: 3 automations with runbooks + presentation |

**Assessment:** weekly assignments (Weeks 1 to 7) 40% · mid-course checkpoint at end of Week 4 (90-minute practical: build a 3-step workflow from a written brief, with a test log and runbook) 15% · capstone 30% · attendance and consistency 15%.

## 3.4 `_course.md` Frontmatter
```yaml
---
title: "Automation: No-Code Workflows for Business"
slug: automation
status: available
category: "AI & Automation"
level: "Beginner"
duration: "8 weeks"
format: "Weekly lessons + guided builds + 90-minute mentoring"
summary: "Automate repetitive business tasks with spreadsheets, no-code tools and simple integrations."
outcomes:
  - "Map a business process and choose what is worth automating"
  - "Automate forms, sheets and emails with Google tools"
  - "Build and test workflows in Zapier and Make"
  - "Connect apps with APIs and webhooks"
  - "Add AI steps safely and deliver automation as a documented service"
tools: ["Google Sheets", "Google Forms", "Apps Script", "Zapier", "Make", "n8n"]
icon: "workflow"
order: 6
featured: false
---
```

## 3.5 Setup Guide
Google account; Zapier and Make free accounts (**verify current free-tier limits and terms**; state them with a date); an n8n option (cloud trial or self-hosting overview; verify); a clean test Gmail address and test spreadsheet (never connect a real business's accounts while learning); a free API testing tool; naming rules for workflows (`Client-Trigger-Action-v1`); a **credentials hygiene** page (never share API keys, use least privilege, revoke access when finished); verification checklist.

## 3.6 Week-by-Week Content Specification

### Week 1: Automation Thinking and Process Mapping
**Lessons:** (1.1) What automation is; triggers, actions, data flow; examples from daily life. (1.2) **What not to automate** (unstable processes, high-judgement decisions, tasks that run once a year). (1.3) **Process mapping:** write steps, inputs, outputs, people, tools; draw a simple flowchart (give a text template and a drawing method using any free tool). (1.4) **FTES scoring** with 6 worked examples from Fresh Bites. (1.5) Time-saved formula and honest net benefit. (1.6) Human-in-the-loop design. (1.7) Reading the "automation map" of Fresh Bites: reservations, enquiries, order confirmation, daily sales summary, invoice reminder, social posts.
**Assignment:** map **3 processes** (Fresh Bites or one from your own work), score each with FTES, pick one to build in Week 2, and write the time-saved estimate. **Grading:** mapping clarity 40%, scoring logic 30%, estimate honesty 20%, presentation 10%.
**Downloads:** `process-map-template.md`, `ftes-scoring-sheet.csv`, `fresh-bites-process-descriptions.md`.

### Week 2: Spreadsheet and Forms Automation
**Lessons:** (2.1) Google Forms: question types, validation, sections, response notifications, linking to Sheets. (2.2) Sheets as a lightweight database: structured columns, data validation dropdowns, a **status column**, conditional formatting, protected ranges. (2.3) Useful functions: `ARRAYFORMULA`, `FILTER`, `QUERY`, `IMPORTRANGE`, `TEXT`, `TODAY`. (2.4) **Apps Script introduction:** what it is, the editor, authorising scripts and what permissions mean (**read each permission screen; only authorise your own test scripts**), triggers (on form submit, time-driven), quotas (verify current limits). (2.5) **Worked scripts** (write, comment and explain each line; mark them "not run by the author" unless you can run them): send a confirmation email on form submission; add a custom menu item to mark a reservation "Confirmed"; send a daily summary email. (2.6) Testing and logging (a Log sheet). (2.7) Common errors and fixes.
**Assignment:** **Reservation system v1:** a form (name, phone, date, time, guests, notes) feeding a sheet with status column, validation, and an Apps Script confirmation email to a test address; submit screenshots, the script, and a test log of 5 test entries (including 1 invalid). **Grading:** works end to end 40%, validation and error handling 25%, documentation 20%, security habits 15%.
**Downloads:** `reservation-form-fields.md`, `apps-script-snippets.md`, `test-log-template.csv`.

### Week 3: No-Code I: Zapier
**Lessons:** (3.1) How Zapier works (zaps, triggers, actions, tasks); **verify current free-tier limits and any plan changes; date-stamp**. (3.2) Connecting Google Sheets, Gmail and Google Calendar. (3.3) Building a zap step by step: new row in sheet, create calendar event, send email. (3.4) **Filters, paths, delays, formatter** (dates, text). (3.5) Testing: test mode, task history, reading errors, replay. (3.6) Task usage and cost awareness. (3.7) **Runbook** for each zap.
**Assignment:** build **2 zaps** (a) new reservation row to calendar event + confirmation email; (b) new enquiry row to notification email with a filter for "catering" requests; submit runbooks, screenshots and a test log. **Grading:** works 40%, testing 25%, runbook 20%, cost/limits awareness 15%.
**Downloads:** `zap-runbook-template.md`, `enquiry-form-fields.md`.

### Week 4: No-Code II: Make and n8n (Mid-Course Checkpoint)
**Lessons:** (4.1) Make concepts: scenarios, modules, mapping, routers, iterators and aggregators, schedules, error handlers; **verify free-tier limits**. (4.2) Rebuild the Week 3 zap in Make. (4.3) **Error handling and retries**; logging to a sheet; alerting yourself on failure. (4.4) **n8n overview:** nodes, self-hosted vs cloud, why teams choose it (verify current licensing and hosting options; no installation required in this course; optional demo). (4.5) **Comparison table** (cost model, learning curve, flexibility, hosting, best for) with date-stamp. (4.6) Choosing a platform for a client.
**Assignment:** rebuild zap (a) in Make; write a **1-page comparison memo** recommending a platform for Fresh Bites (with reasons and risks). **Mid-course checkpoint (end of week):** as in 3.3. **Grading:** rebuild 40%, memo reasoning 35%, error handling 25%.
**Downloads:** `platform-comparison-template.md`, `checkpoint-brief-fresh-bites.md`.

### Week 5: APIs, Webhooks and JSON
**Lessons:** (5.1) What an API is (restaurant waiter analogy); endpoints, methods (GET, POST), headers, status codes. (5.2) **JSON** reading and structure with 3 examples. (5.3) **Authentication:** API keys vs OAuth (concept), **key safety** rules. (5.4) Using an API-testing tool to call a **free, keyless public API** (e.g., Open-Meteo for Yenagoa weather; **verify the current request format from its docs**). (5.5) **Webhooks:** incoming and outgoing; "catch hook" triggers in Zapier or Make; testing with sample payloads. (5.6) HTTP request modules in a no-code tool. (5.7) Rate limits, pagination, timeouts (concept).
**Assignment:** (a) a scheduled workflow that fetches Yenagoa's weather each morning and writes or emails a one-line summary for the kitchen; (b) a webhook that receives a test payload and logs it to a sheet; submit runbooks and test evidence. **Grading:** works 40%, understanding shown in notes 30%, key safety 20%, documentation 10%.
**Downloads:** `json-practice.md`, `api-testing-checklist.md`, `webhook-test-payload.json`.

### Week 6: Business Automations for Small Businesses
**Lessons:** present **four recipes**, each with problem, trigger, steps, tools, risks, test plan and runbook: (A) **Lead/enquiry capture:** form to sheet to notification to follow-up reminder; (B) **Appointments and bookings:** form or booking link, calendar event, reminder message; (C) **Invoice and payment reminders:** sheet of invoices, due-date check, reminder email, status update (explain payment-gateway webhooks such as **Paystack and Flutterwave conceptually; verify current documentation before describing events**; do not require a live merchant account); (D) **Content scheduling:** content calendar sheet to scheduled posts (verify which social platforms allow scheduling through tools and any policy limits). **WhatsApp section:** what is feasible for small businesses: click-to-chat links, WhatsApp Business app features (quick replies, labels, away messages, catalogue), and the **WhatsApp Business Platform/API**, which involves approval, policies and costs (**verify current requirements and pricing before describing**); free alternatives for notifications (email, Telegram) and the warning that **unsolicited bulk messaging breaches platform policies and customer trust**.
**Assignment:** implement **any 2 of the 4 recipes** with test data; submit runbooks, test logs and screenshots. **Grading:** works 40%, risk and consent thinking 25%, documentation 25%, polish 10%.
**Downloads:** `recipe-a-leads.md`, `recipe-b-appointments.md`, `recipe-c-invoices.md`, `recipe-d-content-scheduling.md`, `sample-invoice-sheet.csv`, `sample-content-calendar.csv`.

### Week 7: AI Inside Automations
**Lessons:** (7.1) Where AI fits in a workflow: classify, extract fields, summarise, draft replies. (7.2) Prompt design for **structured outputs** (fixed categories, JSON-like fields). (7.3) **Human-in-the-loop approval:** never auto-send AI text to customers without review in early versions. (7.4) Cost, rate limits and quotas (verify current terms). (7.5) Privacy: do not send sensitive data to AI steps without a policy. (7.6) Monitoring: log inputs, outputs, decisions; spot drift. (7.7) Failure cases: wrong category, empty input, hostile text (prompt injection concept).
**Assignment:** **Email triage workflow** for Fresh Bites enquiries (use a test mailbox): new email, AI classifies (Reservation, Catering, Complaint, Other), AI drafts a reply, **a human approval step**, then send; test with the supplied **15 sample enquiries** and report accuracy and failures. **Grading:** works 30%, test rigour 30%, safety and approval design 25%, documentation 15%.
**Downloads:** `sample-enquiries-15.csv`, `triage-test-sheet.csv`, `classification-prompt-template.md`.

### Week 8: Delivering Automation as a Service and Capstone
**Lessons:** (8.1) **Discovery questions** (processes, tools, volume, pain, owners, data sensitivity). (8.2) **Process audit** report format. (8.3) **Scoping and quoting:** setup fee, monthly maintenance, change-request policy; teach the method, not figures. (8.4) **Account ownership:** the client owns the accounts; use least privilege; offboarding. (8.5) Documentation and handover (runbook, training video outline, support window). (8.6) Monitoring and error alerts; maintenance routine. (8.7) Ethics: no spam, consent, data protection, honest claims about savings. (8.8) Marketing yourself: portfolio, case-study template, gig listing outline (verify platform policies), local small-business outreach script. (8.9) Capstone brief.
**Capstone:** for Fresh Bites (or a consenting real small business), deliver **3 automations** (at least one using AI and one using a webhook or API), each with runbook, test log and time-saved estimate; plus a discovery summary, a quote, a handover pack and a 10-minute presentation. **Rubric:** works and tested 30, design and risk handling 25, documentation 20, business case 15, presentation 10.
**Downloads:** `discovery-questionnaire.md`, `automation-quote-template.md`, `handover-checklist.md`, `case-study-template.md`, `capstone-rubric.md`.

## 3.7 Course-Specific Rules
- **Do not create any real automation, spreadsheet, form, zap, scenario, email or calendar event in the owner's accounts** while writing the course. Provide instructions and templates only. Do not use the Zapier MCP or any connected tool.
- Use **fictional data** and test addresses; never include real keys, webhooks or credentials.
- **Apps Script and platform steps** you cannot run must be labelled "not run by the author; test before teaching", and listed in the handoff report.
- Verify platform limits, pricing tiers and features; date-stamp; prefer concepts over screenshots.
- Teach **consent and anti-spam** clearly.

## 3.8 Open Decisions
| # | Decision | Default |
|---|---|---|
| 1 | Zapier as the primary platform (the owner already has an account)? | Yes; Make as second |
| 2 | Include a hands-on n8n install? | No; overview only |
| 3 | Any paid tool allowed in assignments? | No; free tiers only |

---

# COURSE 4: Cybersecurity Foundations

## 4.1 Snapshot (Fixed)
| Item | Value |
|---|---|
| Title | Cybersecurity Foundations |
| Slug | `cybersecurity` |
| Duration | **12 weeks** |
| Format | Weekly written lessons + safe hands-on labs + weekly assignment + 90-min mentoring |
| Audience | Complete beginners (basic computer literacy only) who want to protect themselves and small organisations and explore entry-level security careers |
| Focus | **Defensive security, security awareness, risk and good practice.** Not offensive hacking |
| Outcome | A hardened personal security baseline, networking and OS fundamentals, security operations and incident-response basics, a risk register, SME security policies, a lab portfolio, and a capstone security assessment report |
| Summary | "Understand cyber threats and learn practical defences for people, devices, networks and small businesses." |
| Level / category / icon / order | `Beginner` / `Cybersecurity` / `shield-check` / `7` |
| Running case | **"Delta Print & Supplies"** (fictional): a Yenagoa printing and stationery shop with 8 staff, 6 computers, a Wi-Fi router, a shared Gmail account for orders, mobile-money payments, a USB drive used for backups, and no written policies. All data fictional |

## 4.2 NON-NEGOTIABLE Safety and Ethics Rules (Apply to Every Lesson, Lab, Template and Assignment)
1. **Defensive framing only.** Teach how attacks work **at a concept level** so learners can recognise and prevent them. **Do not write** malware, ransomware, exploit code, payloads, phishing kits, credential-stealing or evasion techniques, or step-by-step instructions for breaking into any system, account, Wi-Fi network or device.
2. **Authorised labs only.** Hands-on work happens only on **systems the learner owns or on purpose-built training platforms with explicit permission** (learner's own VM, local intentionally vulnerable practice apps, or recognised online learning platforms). Every lab begins with a **scope statement** ("This lab runs only on ... and nowhere else").
3. **No scanning, probing or testing of any third-party system.** State this in the setup guide and every lab. Any network tool shown (e.g., ping, traceroute, nslookup, packet capture) runs on the learner's own devices and network only.
4. **No password cracking against real accounts.** Teach hashing and password strength conceptually.
5. **Phishing training uses clearly fictional examples** you write (fake brands and domains that cannot be mistaken for real ones, e.g., "fresh-bites-demo.example"). Never reproduce real brand phishing kits or real scam texts.
6. **Legal awareness is part of the course** (Week 1 and Week 11): unauthorised access is a crime. Refer to Nigeria's cybercrime and data-protection laws **only after verifying their current names, amendments and obligations; do not give legal advice**; tell learners to consult a lawyer for specific questions.
7. **Ethics pledge** (learners sign it, Week 1): only authorised testing, protect privacy, report responsibly, never offer or request illegal services.
8. **Career honesty:** certifications and job roles change. Verify exam names, costs and prerequisites; do not promise employment.
9. If any section would require content that conflicts with rules 1 to 5, **replace it with a defensive alternative** and note it in the handoff report. Ask the owner if unsure.

## 4.3 Weekly Plan and Assessment
| Wk | Topic | Deliverable |
|---|---|---|
| 1 | The Cybersecurity Landscape, Ethics and Law | Personal Security Baseline + signed ethics pledge |
| 2 | Computers and Networking Fundamentals | Network diagram + command output explained |
| 3 | Operating Systems and the Command Line | Terminal lab log |
| 4 | Identity, Authentication and Human Factors | Account upgrade audit + phishing-awareness one-pager |
| 5 | Network Security and Securing a Small Office | SME network security checklist and diagram |
| 6 | Cryptography Essentials | Crypto lab write-up |
| 7 | Web and Application Security (Defensive) | Secure code review report |
| 8 | Security Operations and Log Analysis | Log analysis report |
| 9 | Incident Response and Business Continuity | IR playbook + tabletop write-up |
| 10 | Vulnerability and Risk Management | Risk register (10 risks) |
| 11 | Governance, Compliance, Cloud and Mobile Security | SME security policy pack |
| 12 | Capstone, Careers and Certifications | Security Assessment Report + presentation |

**Assessment:** weekly assignments (Weeks 1 to 11) 40% · mid-course checkpoint at end of Week 6 (90 minutes: a written and practical test on concepts, a simple command-line task in the learner's own VM, and a short phishing-triage exercise) 15% · capstone and presentation 30% · attendance and consistency (lab log and ethics adherence) 15%.

## 4.4 `_course.md` Frontmatter
```yaml
---
title: "Cybersecurity Foundations"
slug: cybersecurity
status: available
category: "Cybersecurity"
level: "Beginner"
duration: "12 weeks"
format: "Weekly lessons + safe labs + 90-minute mentoring"
summary: "Understand cyber threats and learn practical defences for people, devices, networks and small businesses."
outcomes:
  - "Explain core security concepts and recognise common threats"
  - "Secure accounts, devices and a small-office network"
  - "Read basic logs and follow an incident-response process"
  - "Assess risk and write practical security policies for a small business"
  - "Build a lab portfolio and understand entry-level security career paths"
tools: ["Linux / Windows command line", "VirtualBox or similar", "Wireshark (own network only)", "Spreadsheet or SQL for log analysis", "Free learning platforms"]
icon: "shield-check"
order: 7
featured: false
---
```
Include section 4.2 in the overview as **"Rules of the Lab"** (rewritten for learners).

## 4.5 Setup Guide
Hardware check (RAM and storage for a VM; **alternatives for weak laptops:** browser-based labs on free learning platforms, with a note to verify current free limits); installing **VirtualBox + a Linux VM (e.g., Ubuntu)** or WSL on Windows (verify current steps); snapshot habits; a **home-lab safety page** (isolate the VM network, never run lab tools on public Wi-Fi, keep the host updated); a lab notebook template (date, objective, scope statement, steps, results, lessons); Wireshark installation (own network only); account creation on **two beginner-friendly learning platforms** (verify which are available and their free tiers); a password manager and 2-step verification setup for the learner's own accounts; the **ethics pledge**; verification checklist.

## 4.6 Week-by-Week Content Specification

### Week 1: The Cybersecurity Landscape, Ethics and Law
**Lessons:** (1) **CIA triad** (confidentiality, integrity, availability) with everyday examples. (2) Assets, threats, vulnerabilities, risks, controls (plain-language definitions and a Delta Print example for each). (3) Who attacks and why (criminals, insiders, opportunists, state actors), at a high level. (4) **Common incidents affecting individuals and SMEs in Nigeria**, described generally and verified (phishing, account takeover, SIM-swap fraud, mobile-money and card fraud, ransomware, fake job and investment scams, insider mistakes). (5) The defender's world: roles (IT support with security duties, SOC analyst, GRC analyst, incident responder, security engineer, penetration tester, security awareness trainer). (6) **Law and ethics:** authorisation; a verified overview of relevant Nigerian laws (cybercrime and data protection) with a "check current text" note; responsible disclosure concept; the **ethics pledge**. (7) Lab rules (4.2).
**Assignment:** **Personal Security Baseline:** inventory your accounts and devices, rate each (high/medium/low importance), list current protections, list gaps, and write 5 improvement actions; sign the ethics pledge. **Grading:** completeness 35%, honest risk rating 30%, quality of actions 25%, pledge 10%.
**Downloads:** `personal-security-baseline.csv`, `ethics-pledge.md`, `delta-print-case-brief.md`, `lab-notebook-template.md`.

### Week 2: Computers and Networking Fundamentals
**Lessons:** (1) How computers work at a high level (CPU, memory, storage, OS). (2) Networks: devices, switches, routers, Wi-Fi. (3) **IP addressing** (IPv4 and IPv6 overview), private vs public addresses, subnet concept (no heavy maths), **DNS**, **DHCP**, **ports**, **TCP vs UDP**. (4) Common protocols: HTTP/HTTPS, DNS, SMTP/IMAP, SSH, and what they are used for. (5) **OSI and TCP/IP models** with a simple analogy. (6) Reading your own network: `ipconfig` or `ip a`, `ping`, `tracert` or `traceroute`, `nslookup`; **only on your own devices**. (7) **Packet capture on your own network** (Wireshark intro): capture your own browser traffic to a site you visit, find a DNS query and an HTTP vs HTTPS difference; never capture others' traffic. (8) Anatomy of a home or small-office router (admin page, SSID, default settings).
**Assignment:** draw a **network diagram** of your home or Delta Print's network, label devices and addresses (private), and submit command outputs with a paragraph explaining each. **Grading:** diagram 30%, outputs and explanations 40%, capture observations 20%, scope statements 10%.
**Downloads:** `network-diagram-template.md`, `command-cheat-sheet-networking.md`, `wireshark-first-capture-guide.md`.

### Week 3: Operating Systems and the Command Line
**Lessons:** (1) Windows and Linux file systems, users, groups, permissions, processes, services. (2) Linux essentials: `pwd, ls, cd, mkdir, cp, mv, rm, cat, less, grep, find, chmod, chown, ps, top, sudo, man` with safe practice in a VM; reading file permissions (`rwx`). (3) PowerShell basics (`Get-Process`, `Get-Service`, `Get-ChildItem`) on the learner's own PC. (4) Logs: where Linux and Windows keep them (concept). (5) Updating and patching, user accounts, least privilege. (6) **Hardening a personal VM:** create a standard user, disable unneeded services, enable the firewall. (7) Learning games for the command line on recognised practice platforms (verify availability; stay within their rules).
**Assignment:** **Terminal lab log:** complete 15 guided tasks (supplied) and a hardening checklist in your own VM with screenshots and explanations. **Grading:** task completion 40%, explanations 30%, hardening 20%, scope discipline 10%.
**Downloads:** `linux-command-practice-tasks.md`, `windows-powershell-tasks.md`, `vm-hardening-checklist.md`.

### Week 4: Identity, Authentication and Human Factors
**Lessons:** (1) Passwords vs passphrases; why reuse is dangerous; **password managers**. (2) **Hashing concept** (stores a fingerprint, not the password), salts (concept), credential stuffing and breach exposure; checking whether an email appears in public breach databases through a reputable service (verify the service). (3) **Multi-factor authentication:** SMS (weaker), authenticator apps, hardware keys and passkeys; recovery codes. (4) Account recovery weaknesses and **SIM-swap defences** (e.g., carrier PINs; verify what Nigerian operators offer). (5) **Phishing, smishing, vishing, business email compromise:** how to recognise (urgency, sender mismatch, link mismatch, unusual requests); how to report. (6) **Triage exercise** with **10 fictional messages** you write (mix of safe and malicious, using obviously fictional brands). (7) Building a security-awareness message for non-technical staff.
**Assignment:** upgrade your own accounts (password manager + MFA on 5 key accounts; show evidence with sensitive details hidden), triage the 10 samples with reasons, and create a **one-page awareness poster** for Delta Print staff. **Grading:** account upgrades 30%, triage reasoning 35%, poster clarity 25%, privacy handling 10%.
**Downloads:** `phishing-triage-samples-fictional.md`, `awareness-poster-template.md`, `account-upgrade-checklist.md`.

### Week 5: Network Security and Securing a Small Office
**Lessons:** (1) Firewalls and NAT (concept). (2) **VPNs:** what they do and do not do; risks of free VPNs. (3) **Wi-Fi security:** WPA2/WPA3, strong passphrases, changing router admin credentials, disabling WPS, firmware updates, guest network, hidden-SSID myths. (4) **Segmentation** (separating guest, staff and payment devices). (5) DNS filtering and safe browsing settings. (6) IDS/IPS concept (detect vs prevent). (7) Remote access basics (why exposed remote-desktop services are dangerous, and safer alternatives). (8) **Audit your own router** with a checklist (no cracking, no external testing). (9) Optional: use a network-simulation tool to design a segmented office (verify free availability).
**Assignment:** **SME Network Security Checklist** for Delta Print with a before-and-after diagram and prioritised actions (quick wins vs longer-term). **Grading:** accuracy 35%, prioritisation 30%, diagram 20%, clarity 15%.
**Downloads:** `router-audit-checklist.md`, `sme-network-security-checklist.md`.

### Week 6: Cryptography Essentials (Mid-Course Checkpoint)
**Lessons:** (1) Encryption vs hashing vs encoding. (2) Symmetric vs asymmetric encryption; keys; why key management matters. (3) **TLS/HTTPS** (high-level handshake), certificates and the padlock (what it does and does not guarantee). (4) Digital signatures. (5) Full-disk and file encryption (built-in options on current Windows/macOS/Android/iOS; verify features and editions). (6) Encrypted messaging concepts. (7) **Labs on your own files:** verify a file hash (`certutil` or `sha256sum`), inspect a website's certificate in the browser, encrypt and decrypt a folder with a built-in or well-known tool. (8) Common mistakes (rolling your own crypto, sharing keys by chat, ignoring certificate warnings).
**Assignment:** **Crypto lab write-up** with screenshots and explanations; a half-page "Explain HTTPS to a shopkeeper". **Mid-course checkpoint (end of week):** as in 4.3. **Grading:** lab accuracy 40%, explanation clarity 40%, safety habits 20%.
**Downloads:** `crypto-lab-guide.md`, `checkpoint-brief.md`.

### Week 7: Web and Application Security (Defensive)
**Lessons:** (1) How web apps work (browser, server, database, cookies, sessions). (2) **OWASP Top 10** explained **conceptually, with defensive controls** (verify the current edition and names): broken access control, cryptographic failures, injection, insecure design, security misconfiguration, vulnerable and outdated components, authentication failures, integrity failures, logging and monitoring failures, SSRF. (3) **Secure coding habits:** validate input, use **parameterised queries**, encode output, least privilege, secrets management, dependency updates, HTTPS everywhere, secure headers. (4) **Side-by-side examples** (fictional, tiny) of a vulnerable pattern and its fix (for example, building a SQL string by concatenation vs a parameterised query; displaying unescaped user text vs escaped output) **without attack payload lists**. (5) Reading a vulnerability report and CVE entry (concept). (6) Cross-link: Web Development Week 11 (Supabase Row Level Security), Data Analysis SQL weeks. (7) **Practice only in intentionally vulnerable training environments** run locally or on recognised platforms (verify; follow their rules), limited to **identifying and explaining** issues and applying fixes.
**Assignment:** **Secure code review:** review 6 short fictional code snippets, name the weakness, explain the risk, and write the fix; plus a one-page secure-development checklist for a small web project. **Grading:** identification 35%, fixes 35%, checklist 20%, clarity 10%.
**Downloads:** `secure-code-review-snippets.md`, `secure-development-checklist.md`.

### Week 8: Security Operations and Log Analysis
**Lessons:** (1) What a SOC does (monitor, triage, escalate). (2) Log types: authentication, system, network, web server. (3) **Windows event IDs worth knowing** (e.g., 4624 successful logon, 4625 failed logon; verify) and Linux authentication log basics. (4) SIEM concept (collect, normalise, correlate, alert) and EDR/antivirus concept. (5) **Indicators of compromise** and **MITRE ATT&CK** (overview only). (6) Alert triage workflow: validate, scope, prioritise, escalate, document. (7) **Hands-on with fictional logs** (you generate `delta-auth-log.csv`, about 2,000 rows) using Excel, SQL or Python (cross-link Data Analysis): count failed logins by user and IP, spot a burst of failures followed by a success, find logins at unusual hours, and list impossible-travel style anomalies. (8) Writing a clear incident ticket.
**Assignment:** **Log analysis report:** findings, evidence (queries or pivots), timeline, severity, recommended actions. **Grading:** findings accuracy 40%, evidence 25%, reasoning and prioritisation 20%, report clarity 15%.
**Downloads:** `delta-auth-log.csv` (**synthetic**, with planted patterns: a brute-force burst, an odd-hours login, a shared account), `incident-ticket-template.md`.

### Week 9: Incident Response and Business Continuity
**Lessons:** (1) **IR lifecycle:** preparation, detection and analysis, containment, eradication and recovery, post-incident review (verify against a current standard; credit the standard by name only if verified). (2) Roles, communication plan, decision log. (3) Evidence preservation basics (do not wipe; record; chain of custody concept). (4) **Ransomware readiness:** offline/immutable backups, **3-2-1 backup rule**, restore testing. (5) Business continuity vs disaster recovery; recovery time and recovery point objectives (concept). (6) Breach notification obligations (verify current Nigerian requirements and timelines; no legal advice). (7) **Tabletop exercise:** a scripted fictional scenario for Delta Print ("an employee opens a fake invoice; files become inaccessible") with injects and discussion prompts.
**Assignment:** **IR playbook (one page)** for the scenario + **tabletop write-up** (decisions, communications, lessons, improvements). **Grading:** playbook practicality 40%, reasoning in the tabletop 35%, communication plan 15%, clarity 10%.
**Downloads:** `ir-playbook-template.md`, `tabletop-scenario-delta-print.md`, `backup-plan-template.md`.

### Week 10: Vulnerability and Risk Management
**Lessons:** (1) Asset inventory. (2) Threat vs vulnerability vs risk. (3) **Patch management** and update routines. (4) **Vulnerability scoring (CVSS concept)** and prioritisation; **authorised scanning concept** (only in your own lab or with written permission; no scanning tutorials against real targets). (5) **Risk assessment:** likelihood x impact matrix; qualitative scoring. (6) **Risk register** (risk, asset, likelihood, impact, rating, owner, treatment, status). (7) Treatment options: mitigate, transfer (insurance), accept, avoid. (8) Communicating risk to non-technical owners.
**Assignment:** **Risk register with 10 risks** for Delta Print, ranked, with treatments and a 30-day action list. **Grading:** realism 30%, scoring logic 30%, treatments 25%, communication 15%.
**Downloads:** `risk-register-template.csv`, `asset-inventory-template.csv`.

### Week 11: Governance, Compliance, Cloud and Mobile Security
**Lessons:** (1) Policies, standards, procedures (differences). (2) **Core SME policies:** acceptable use, passwords and MFA, backup, device and BYOD, incident reporting. (3) **Frameworks at overview level:** NIST Cybersecurity Framework functions, ISO/IEC 27001 (what certification means, no need to certify) (verify current versions). (4) **Data protection for SMEs:** consent, purpose, minimisation, retention, security, rights, breach handling (Nigeria's data protection law at a high level after verification; no legal advice). (5) **Cloud security:** shared responsibility; securing Google Workspace and Microsoft 365 basics (cross-link Google Workspace Week 5 and Microsoft Office Week 6); (6) **Mobile security:** updates, app permissions, screen locks, remote wipe, avoiding sideloaded apps, mobile-money safety. (7) Vendor and supplier risk basics. (8) Security awareness programmes and measuring them.
**Assignment:** **SME Security Policy Pack** for Delta Print: 4 short policies (1 page each), a staff quick-guide and a 90-day rollout plan. **Grading:** practicality 35%, clarity for non-technical staff 30%, completeness 20%, fit to the case 15%.
**Downloads:** `policy-templates.md`, `staff-quick-guide-template.md`, `rollout-plan-template.md`.

### Week 12: Capstone, Careers and Certifications
**Lessons:** (1) Capstone brief. (2) **Career map:** entry points (IT support, helpdesk, junior SOC analyst, GRC analyst, security awareness, cloud support), what each does daily, skills and portfolio evidence (no salary claims). (3) **Certifications to consider** (verify names, costs, prerequisites and current status, for example CompTIA Security+, ISC2 Certified in Cybersecurity, Google Cybersecurity Certificate, Microsoft SC-900), with an honest comparison table and study approach. (4) **Lab portfolio:** write-ups of your own labs, a GitHub repo of notes and templates, **without sharing solutions that a platform prohibits publishing**; protect personal and platform data. (5) CV and LinkedIn for security beginners (cross-link Remote Ready). (6) **Scam awareness for job seekers** (fake recruiters, "hacker for hire" gigs, requests to do illegal tasks; never accept). (7) Interview preparation: explain CIA, phishing response, incident steps, risk register; scenario questions. (8) Next-step roadmap (networking, Linux, cloud, scripting, SOC practice).
**Capstone:** **Security Assessment Report for Delta Print & Supplies** (policy-based and **non-intrusive**; no testing of any live systems): executive summary; asset inventory; threat overview; risk register (reuse and refine); 10 prioritised findings with recommendations; policy pack summary; incident-response readiness; 90-day roadmap; appendices; plus a 10-minute presentation. **Rubric:** accuracy and realism 25, prioritisation 20, clarity for a non-technical owner 20, evidence from course labs 15, ethics and professionalism 10, presentation 10.
**Downloads:** `capstone-brief-delta-print.md`, `assessment-report-template.md`, `certification-comparison-template.md`, `capstone-rubric.md`.

## 4.7 Course-Specific Rules
- Follow section 4.2 above for **everything**. When in doubt, choose the safer, more defensive option and flag it.
- Do not include working exploit code, malware, payload lists, scanning tutorials for third parties, or password-cracking walkthroughs.
- All logs, messages, code snippets and company data are **synthetic and clearly fictional**.
- Verify and date-stamp laws, frameworks, certification details and platform availability.

## 4.8 Open Decisions
| # | Decision | Default |
|---|---|---|
| 1 | Which two learning platforms to recommend for labs? | Two recognised beginner-friendly platforms after verification |
| 2 | VM-based labs or browser-based only (weak laptops)? | Offer both paths |
| 3 | Add a later "Security+ Exam Prep" course? | Not in this build |

---

# COURSE 5: Typing Skills

## 5.1 Snapshot (Fixed)
| Item | Value |
|---|---|
| Title | Typing Skills |
| Slug | `typing-skills` |
| Duration | **4 weeks** |
| Format | **Daily practice (30 minutes x 5 days a week)** + one 60-minute weekly session (in person or live) for posture check, timed tests and feedback + weekly assignment |
| Audience | Beginners who type with one or two fingers (or slowly) and want a job-ready skill for office, data entry, transcription, VA and remote work |
| Outcome | **Touch typing** (no looking at the keys), improved speed and accuracy, confident use of numbers, punctuation and the numpad, and essential keyboard shortcuts |
| Summary | "Learn touch typing and keyboard shortcuts to work faster and more accurately." |
| Level / category / icon / order | `Beginner` / `Digital Basics` / `keyboard` / `8` |
| Targets (defaults, adjustable per learner) | End of Week 4: **at least 35 words per minute (WPM) at 95% or higher accuracy** for a complete beginner; **stretch: 45 WPM**. Explain that targets depend on the starting point and consistent practice |
| Measurement | **WPM = (correct characters ÷ 5) ÷ minutes.** Accuracy = correct characters ÷ total typed characters x 100 |

## 5.2 Weekly Plan and Assessment
| Wk | Topic | Deliverable |
|---|---|---|
| 1 | Posture, Home Row and First Letters | Baseline test + Week 1 practice log |
| 2 | Full Alphabet, Capitals and Accuracy | Accuracy test + practice log |
| 3 | Numbers, Punctuation, Numpad and Shortcuts | Data-entry task + shortcuts quiz |
| 4 | Speed Building and Real-World Typing | Final tests + work-typing portfolio |

**Assessment:** daily practice log (consistency) 30% · weekly timed tests (improvement, not just level) 25% · shortcuts quiz 10% · work-typing tasks 20% · final test (5 minutes) 15%. Certificate at 70%+ **and** a recorded final test at the learner's target or better (the owner may adjust; see Open Decision 2).

## 5.3 `_course.md` Frontmatter
```yaml
---
title: "Typing Skills"
slug: typing-skills
status: available
category: "Digital Basics"
level: "Beginner"
duration: "4 weeks"
format: "Daily practice + weekly 60-minute session"
summary: "Learn touch typing and keyboard shortcuts to work faster and more accurately."
outcomes:
  - "Type without looking at the keyboard using correct finger placement"
  - "Reach a steady speed with high accuracy"
  - "Type numbers, punctuation and use the numeric keypad confidently"
  - "Use essential keyboard shortcuts to work faster"
  - "Complete real work typing tasks such as emails, letters and data entry"
tools: ["Online typing practice", "Word processor", "Spreadsheet"]
icon: "keyboard"
order: 8
featured: false
---
```

## 5.4 Setup Guide
**Ergonomics:** chair height, screen at eye level, wrists neutral, elbows near 90 degrees, feet flat, lighting; **the 20-20-20 rule** and short stretch breaks (explain as general comfort guidance, not medical advice); **laptop vs desktop keyboard tips**; practice-time plan for unreliable power (short blocks, offline option); a **practice log template**; tool choices: a free online typing course (**verify** options such as TypingClub, Keybr, Monkeytype, 10FastFingers, Typing.com and their current free limits), plus the **in-site Typing Practice tool** if built (section 5.9). Provide printable keyboard maps with finger colours (as an SVG or Markdown table).

## 5.5 Week-by-Week Content Specification

### Week 1: Posture, Home Row and First Letters
**Lessons:** (1) Why touch typing matters for work (speed, accuracy, less fatigue). (2) **Posture and hand position;** the home row (A S D F, J K L ;); index-finger bumps on F and J; thumbs on the space bar. (3) **The rule:** do not look at the keys; accuracy before speed; slow, even rhythm. (4) Reaching: first new letters (G H), then E I R U T Y; Shift keys and capitals; space, full stop, comma. (5) How to use a typing course effectively (finish lessons in order, repeat weak ones). (6) **Baseline test:** a 2-minute test with a supplied neutral passage; record WPM and accuracy. (7) Common mistakes (hovering, looking down, using the wrong finger "because it's faster").
**Practice plan (give as a table):** Day 1 to 5, 30 minutes each: warm-up 5 min, lessons 15 min, accuracy drill 5 min, cool-down 5 min.
**Assignment:** baseline test results + practice log (5 days) + a short reflection on which keys are hardest. **Grading:** log completeness 50%, honest baseline 25%, reflection 25%.
**Downloads:** `typing-practice-log-template.csv`, `keyboard-finger-map.md`, `baseline-passage.md`.

### Week 2: Full Alphabet, Capitals and Accuracy
**Lessons:** (1) The top and bottom rows (Q W / O P / Z X C V B N M) with finger assignments. (2) Weak-key drills and letter-pair drills. (3) Common words and short sentences; **rhythm** and metronome-style practice. (4) **Accuracy first:** the "slow down to 95%" rule; correcting mistakes (backspace vs continue); understanding error types. (5) Capital letters and sentence typing; avoiding Caps Lock mistakes. (6) Typing with both thumbs on space (alternation habit). (7) Typing practice using supplied paragraphs about Nigerian everyday topics (Fresh Bites menu text, a short news-style item, a business notice), all written by you.
**Assignment:** a 3-minute accuracy test (target 95%+), a weak-key report (top 5 problem keys and a fix plan), practice log. **Grading:** accuracy progress 40%, weak-key analysis 30%, log 30%.
**Downloads:** `practice-passages-week-2.md` (5 passages of increasing difficulty), `weak-key-report-template.md`.

### Week 3: Numbers, Punctuation, Numpad and Shortcuts
**Lessons:** (1) **Number row** touch typing and common symbols used at work (@ # $ % & * ( ) - _ / : ; " ' ?). (2) Prices and amounts in Naira: typing figures with commas and decimals; the Naira sign (**verify the easiest input methods per device, for example the Windows emoji and symbol panel or copy and paste; do not promise one shortcut works everywhere**). (3) **The numeric keypad (numpad):** home position (4 5 6), Enter, Num Lock; data-entry rhythm. (4) **Essential shortcuts (table):** Ctrl+C/X/V/Z/Y/A/S/F/P/B/I/U, Ctrl+Backspace, Ctrl+Arrow, Shift+Arrow, Home/End, Alt+Tab, Windows key shortcuts, Ctrl+Shift+Arrow (select words); macOS equivalents. (5) **Data-entry practice:** entering supplied rows (names, phone numbers (fictional), amounts, dates) into a spreadsheet; double-checking techniques. (6) Typing emails and WhatsApp messages professionally (cross-link VA Launch).
**Assignment:** **Data-entry task:** type 100 supplied fictional rows into a spreadsheet with at least 98% accuracy (checked with a supplied answer file), plus a **shortcuts quiz** (20 questions). **Grading:** data-entry accuracy 45%, speed 15%, quiz 25%, log 15%.
**Downloads:** `data-entry-100-rows.csv` (fictional), `data-entry-answer-key.csv` (**facilitator-only; put in `_facilitator/typing-skills/`**), `shortcuts-cheat-sheet.md`, `shortcuts-quiz.md`.

### Week 4: Speed Building and Real-World Typing
**Lessons:** (1) Speed-building methods: short bursts at slightly above comfortable speed, then clean-up passes; endurance (1, 3 and 5-minute tests). (2) Typing from a **source document** (copy-typing) vs from your own thoughts; looking at the screen and the source without looking at the keys. (3) Real-world tasks: a formal letter, a business email, a product list, meeting minutes, a simple transcript. (4) **Transcription practice** (concept): typing as you listen; use the learner's **own recorded voice notes** (no copyrighted audio supplied). (5) Typing on a phone: tips for faster mobile typing (optional section). (6) Employer typing tests: what they measure, how to prepare, how to stay calm. (7) Maintaining skills: weekly 15-minute routine. (8) Listing typing speed honestly on a CV (with a recent test result).
**Assignment:** **Final tests:** three tests (1, 3 and 5 minutes) recorded as screenshots or tool reports; **work-typing portfolio:** a formal letter, an email, a 1-page product list and a transcribed voice note (all fictional or self-created). **Grading:** final test results and improvement 40%, work-typing quality 40%, log 20%.
**Downloads:** `letter-to-type.md`, `email-to-type.md`, `product-list-to-type.md`, `final-test-passages.md`.

## 5.6 Mentoring Session Plan (60 min, Weekly, Specific to Typing)
Write each week's plan as a table: 5 min posture and hand check; 10 min review of the practice log; 15 min live technique coaching on that week's keys; 15 min timed test with feedback; 10 min fix plan for problem keys; 5 min goals for the coming week.

## 5.7 Course-Specific Rules
- **Practice texts must be original** (written by you), fictional, and appropriate for all learners.
- Do not copy lessons from existing typing courses. Name tools only after verification.
- Health note: general comfort advice only; tell learners to see a professional if they have pain.
- Keep speed targets **realistic and flexible**; emphasise accuracy and consistency over comparison with others.

## 5.8 Open Decisions
| # | Decision | Default |
|---|---|---|
| 1 | Default target (35 WPM / 95%) acceptable? | Yes, adjustable per learner |
| 2 | Final-test pass mark for the certificate | Learner's personal target or 30 WPM at 95%, whichever is higher |
| 3 | Include the optional phone-typing section? | Yes |

## 5.9 Optional Site Feature: "Typing Practice" Tool (Build Only if the Owner Approves)
A single static page `/tools/typing-practice/` in the site's design (royal blue, white, Poppins): choose a passage from a JSON file (`src/data/typing-passages.json`, original texts written by you), timer options (1, 3, 5 minutes), live WPM and accuracy using the formulas in 5.1, error highlighting, results summary, and **results stored only in `localStorage`** (no accounts, no tracking). Keyboard accessible, works offline after first load, mobile-friendly (show a note that physical keyboards are recommended). No third-party scripts. Add unit tests for the WPM and accuracy functions. Link it from the course page and Week 1.

---

# COURSE 6: Microsoft Office Skills

## 6.1 Snapshot (Fixed)
| Item | Value |
|---|---|
| Title | Microsoft Office Skills |
| Slug | `microsoft-office` |
| Duration | **6 weeks** |
| Format | Weekly written lessons + guided exercises + weekly assignment + 90-min mentoring |
| Audience | Beginners and improvers: job seekers, students, office staff, VAs and small-business owners |
| Outcome | Confident, professional use of **Windows file management, Word, Excel (essentials), PowerPoint, Outlook, Teams and OneNote**, ending in an **Office Admin Pack** portfolio |
| Summary | "Master Word, Excel, PowerPoint, Outlook and Teams for professional office and remote work." |
| Level / category / icon / order | `Beginner` / `Office & Productivity` / `app-window` / `9` |
| Running case | Yenagoa Fresh Bites (0.1) |
| Versions | Teach with **Microsoft 365 (current)** and note differences for Office 2019/2021 and the **free web versions** (verify what is available with a free Microsoft account). Add a short "free alternative" box (e.g., LibreOffice; verify) for learners without Office |
| Exam note | Mention Microsoft's certification pathway for Office skills **only after verifying current exam names, availability and cost**; make no pass-rate or job claims |

## 6.2 Weekly Plan and Assessment
| Wk | Topic | Deliverable |
|---|---|---|
| 1 | Windows, Files and Microsoft 365 Essentials | Organised folder system + naming guide |
| 2 | Word I: Formatting and Business Documents | Letter + flyer + CV |
| 3 | Word II: Long Documents, Collaboration and Mail Merge | Proposal (8+ pages) + mail merge |
| 4 | Excel Essentials | Budget + inventory workbook |
| 5 | PowerPoint | 10-slide pitch + 1-minute talk |
| 6 | Outlook, Teams, OneNote and Capstone | Office Admin Pack |

**Assessment:** weekly assignments (Weeks 1 to 5) 40% · mid-course checkpoint at end of Week 3 (90 minutes: format a given messy document, create a short document with TOC and a table, and a simple mail merge) 15% · capstone (Office Admin Pack) 30% · attendance and consistency 15%.

## 6.3 `_course.md` Frontmatter
```yaml
---
title: "Microsoft Office Skills"
slug: microsoft-office
status: available
category: "Office & Productivity"
level: "Beginner"
duration: "6 weeks"
format: "Weekly lessons + guided practice + 90-minute mentoring"
summary: "Master Word, Excel, PowerPoint, Outlook and Teams for professional office and remote work."
outcomes:
  - "Manage files and folders professionally with OneDrive"
  - "Create polished letters, reports and long documents in Word"
  - "Build and format spreadsheets with essential formulas and charts in Excel"
  - "Design clear presentations in PowerPoint"
  - "Manage email, meetings and notes with Outlook, Teams and OneNote"
tools: ["Windows", "Word", "Excel", "PowerPoint", "Outlook", "Teams", "OneNote", "OneDrive"]
icon: "app-window"
order: 9
featured: false
---
```

## 6.4 Setup Guide
Microsoft account creation; how to access Microsoft 365 apps (desktop, web, mobile; verify the current free and paid options); OneDrive setup and sync; checking the Office version (File > Account); **offline and power-cut habits** (AutoSave and AutoRecover settings, saving locally, recovering unsaved files); a keyboard-shortcut cheat sheet (download); folder structure template; verification checklist.

## 6.5 Week-by-Week Content Specification

### Week 1: Windows, Files and Microsoft 365 Essentials
**Lessons:** (1) The Windows desktop, Start menu, taskbar, settings, search; (2) **File Explorer:** folders, copy/move/rename, file types and extensions, zip files, external drives; **safe handling of USB drives** (malware risk; cross-link Cybersecurity); (3) **Naming conventions** (`YYYY-MM-DD_Client_Document_v01`) and folder structure for work; (4) OneDrive: syncing, sharing links and permissions, version history, recovering deleted files; (5) Microsoft 365 apps tour; desktop vs web vs mobile; AutoSave and co-authoring; (6) Screenshots (Snipping Tool), printing, scanning, saving as PDF; (7) Safety: strong passwords and 2-step verification for the Microsoft account; recognising fake sign-in pages. (8) Time-saving shortcuts for Windows.
**Assignment:** build a **work folder system** (screenshots) for a fictional job, apply the naming convention to 15 supplied dummy files, share one folder from OneDrive with view-only permission to a test address, and write a one-page **file-naming guide**. **Grading:** structure 35%, naming consistency 30%, sharing and permissions 20%, guide clarity 15%.
**Downloads:** `dummy-files-list.md`, `folder-structure-template.md`, `windows-shortcuts-cheat-sheet.md`.

### Week 2: Word I: Formatting and Business Documents
**Lessons:** (1) The ribbon, Quick Access Toolbar, views; (2) **Text formatting** and paragraph formatting (alignment, line spacing, spacing before/after, indents); (3) **Styles** (Normal, Heading 1 to 3) and why to use them instead of manual formatting; (4) Lists, tabs and tab stops; (5) **Tables** (insert, resize, merge, borders, shading, align text); (6) Page setup: margins, orientation, size, columns; (7) Headers, footers, page numbers; (8) Images, shapes, text boxes and wrap text; (9) Proofing tools, Find and Replace, word count; (10) Print preview and PDF export.
**Exercises:** repair a deliberately messy document (supplied) using styles; format a table of prices.
**Assignment:** produce (a) a **formal business letter** for Fresh Bites to a supplier; (b) a **one-page flyer** advertising catering; (c) a **one-page CV** for the fictional character Amaka; all using Styles, consistent spacing and no manual spaces for alignment. **Grading:** formatting consistency 40%, professional appearance 30%, correct use of tools 20%, proofreading 10%.
**Downloads:** `messy-document.docx-source.md` (describe how to recreate; provide text content), `letter-content.md`, `flyer-content.md`, `cv-content-amaka.md`.

### Week 3: Word II: Long Documents, Collaboration and Mail Merge (Mid-Course Checkpoint)
**Lessons:** (1) Navigation pane and heading structure; (2) **Table of contents**, captions, cross-references, footnotes and endnotes, citations and bibliography (concept); (3) **Section breaks**, different first page, page numbering in sections; (4) **Templates** (create and reuse); (5) **Track Changes**, comments, compare, accept/reject; co-authoring in OneDrive; (6) **Mail merge:** letters and labels using an Excel list of 10 fictional customers; (7) **Fillable forms** with content controls (simple); (8) Accessibility checker and alt text; (9) Protecting and sharing documents safely (remove metadata concept).
**Assignment:** an **8+ page business proposal** for a catering contract with TOC, headings, captions, page numbers, a table of prices, and a section break; plus a **mail merge** of a promotional letter to 10 customers; plus one track-changes round with the mentor. **Mid-course checkpoint (end of week):** as in 6.2. **Grading:** structure and navigation 30%, mail merge 25%, collaboration use 20%, polish 25%.
**Downloads:** `proposal-content.md`, `customers-list-10.csv`, `mail-merge-letter-text.md`.

### Week 4: Excel Essentials
**Lessons:** (1) Workbook, worksheet, cells, ranges; entering and formatting data; (2) Number formats (Naira currency, dates, percentages); (3) **Formulas and functions:** `SUM`, `AVERAGE`, `MIN`, `MAX`, `COUNT`, `IF`, `SUMIF(S)`, `COUNTIF(S)`, `XLOOKUP` and `VLOOKUP` (verify availability by version), `TEXT`, `TODAY`; relative vs absolute references; (4) Sorting, filtering, **Tables**; (5) **Conditional formatting**; (6) **Charts** (column, line, pie; labelling); (7) **PivotTable introduction**; (8) **Data validation** dropdowns; (9) Protecting sheets, freezing panes, printing set-up; (10) Where to go next: link to the **Data Analysis course** for advanced work. (11) Common mistakes (merged cells, numbers stored as text, hard-coded totals).
**Assignment:** an Excel workbook with (a) a **monthly budget** for Fresh Bites with formulas; (b) an **inventory sheet** (20 items) with a low-stock highlight and dropdown categories; (c) a **sales tracker** with a chart and a simple PivotTable. **Grading:** correct formulas 35%, formatting and clarity 25%, charts and pivot 25%, data validation 15%.
**Downloads:** `budget-starter.csv`, `inventory-items-20.csv`, `sales-sample-100.csv`.

### Week 5: PowerPoint
**Lessons:** (1) **Presentation structure** (problem, solution, proof, ask); one idea per slide; (2) Slide Master, layouts and themes; consistent fonts and colours; (3) Text, images, icons, SmartArt, tables; (4) Charts from Excel; (5) **Design rules** (contrast, white space, font size, minimal text) with before and after examples; (6) Animations and transitions (restraint); (7) Speaker notes, presenter view, rehearsing, timing; (8) Handouts, exporting to PDF and video; (9) Presenting online in Teams (screen share); (10) Handling nerves and Q&A.
**Assignment:** a **10-slide pitch deck** for a Fresh Bites catering service (problem, offer, menu packages, pricing table, social proof (fictional), contact), plus speaker notes and a recorded or live **1-minute lightning talk** on one slide. **Grading:** structure and message 30%, design 30%, use of master and consistency 20%, delivery 20%.
**Downloads:** `pitch-deck-content.md`, `slide-design-checklist.md`.

### Week 6: Outlook, Teams, OneNote and Capstone
**Lessons:** (1) **Outlook email:** folders, rules, categories, flags, search, signatures, out-of-office, scheduled send, attachments vs links; **email etiquette** (subject lines, tone, reply-all rules, cc/bcc); (2) Outlook calendar: meetings, invitations, time zones, shared calendars, scheduling assistant; contacts and tasks; (3) **Teams:** chats, channels, meetings, files, notifications, status, etiquette; (4) **OneNote:** notebooks, sections, pages, tagging, meeting notes, linking; (5) Using the apps together (an email becomes a task, a meeting produces minutes in OneNote); (6) **Mailbox and security hygiene** (phishing, links, attachments; cross-link Cybersecurity Week 4); (7) Careers: office/admin assistant, data entry, VA, front-desk roles; how to describe Office skills on a CV; (8) Optional: Microsoft certification overview (verified, no claims).
**Capstone: Office Admin Pack** for Fresh Bites: (1) a business letter + mail merge to 10 customers; (2) a budget and sales workbook with a chart and pivot; (3) a 10-slide pitch deck; (4) a scheduled team meeting with an agenda in Outlook and **minutes in OneNote**; (5) a one-page "Office standards" guide (naming, folders, templates). **Rubric:** accuracy 25, professional design 25, consistency 20, use of the right tool 15, organisation 15.
**Downloads:** `capstone-brief.md`, `meeting-agenda-template.md`, `meeting-minutes-template.md`, `office-standards-guide-template.md`.

## 6.6 Course-Specific Rules
- Provide supplied content as **text/CSV that learners paste or import**, and describe how to recreate Office files rather than committing binary `.docx/.xlsx/.pptx` unless you can generate them reliably (if you do, use them as starters and test they open).
- **Menus change between versions:** teach by **task and name of the feature**, and add "if you cannot find it, search the ribbon (Alt+Q)" guidance (verify).
- Verify free-tier and licensing statements; no piracy tips; recommend legal copies and free alternatives.
- All business data and people are fictional.

## 6.7 Open Decisions
| # | Decision | Default |
|---|---|---|
| 1 | Include Access or Publisher? | No |
| 2 | Binary starter files or text-only? | Text and CSV; binaries only if reliably generated |
| 3 | Mention exam certification? | Yes, after verification, with no claims |

---

# COURSE 7: Google Workspace Skills

## 7.1 Snapshot (Fixed)
| Item | Value |
|---|---|
| Title | Google Workspace Skills |
| Slug | `google-workspace` |
| Duration | **5 weeks** |
| Format | Weekly written lessons + guided exercises + weekly assignment + 90-min mentoring |
| Audience | Beginners and improvers: VAs, remote workers, students, teachers, NGO and small-business staff |
| Outcome | Professional, collaborative use of **Gmail, Calendar, Drive, Docs, Sheets, Slides, Forms, Sites, Meet and Chat**, with security habits, ending in a **Remote Team Workspace** portfolio |
| Summary | "Use Gmail, Drive, Docs, Sheets, Slides, Forms and Meet to work and collaborate professionally." |
| Level / category / icon / order | `Beginner` / `Office & Productivity` / `cloud` / `10` |
| Running case | Yenagoa Fresh Bites (0.1) |
| Accounts | Free personal Google account for learning. **Verify** which features need a paid Workspace plan (e.g., shared drives, some Meet and Calendar features, admin console) and label each lesson's requirements clearly |
| Cross-links | VA Launch Week 2 (tool basics), Automation Weeks 2 to 3 (Apps Script, Zapier), Microsoft Office course (comparison), Cybersecurity Week 4 and 11 (account and cloud security) |

## 7.2 Weekly Plan and Assessment
| Wk | Topic | Deliverable |
|---|---|---|
| 1 | Gmail, Calendar, Drive and Productivity Basics | Organised mailbox + calendar + Drive structure |
| 2 | Google Docs | SOP document + proposal with comments round |
| 3 | Google Sheets | Inventory and sales tracker with dashboard |
| 4 | Slides, Forms and Sites | Registration form + results sheet + 6-slide report + 3-page site |
| 5 | Meet, Chat, Collaboration, Security and Capstone | Remote Team Workspace |

**Assessment:** weekly assignments (Weeks 1 to 4) 40% · mid-course checkpoint at end of Week 3 (90 minutes: organise a mock inbox with labels and filters, write a formatted Doc with headings and a TOC, and build a Sheet with 5 formulas, validation and a chart) 15% · capstone 30% · attendance and consistency 15%.

## 7.3 `_course.md` Frontmatter
```yaml
---
title: "Google Workspace Skills"
slug: google-workspace
status: available
category: "Office & Productivity"
level: "Beginner"
duration: "5 weeks"
format: "Weekly lessons + guided practice + 90-minute mentoring"
summary: "Use Gmail, Drive, Docs, Sheets, Slides, Forms and Meet to work and collaborate professionally."
outcomes:
  - "Manage email, calendar and files efficiently in Gmail, Calendar and Drive"
  - "Write and format professional documents in Docs"
  - "Track data and build simple dashboards in Sheets"
  - "Create presentations, forms and simple websites"
  - "Collaborate securely using Meet, Chat and sharing controls"
tools: ["Gmail", "Google Calendar", "Google Drive", "Docs", "Sheets", "Slides", "Forms", "Sites", "Meet", "Chat"]
icon: "cloud"
order: 10
featured: false
---
```

## 7.4 Setup Guide
Create or check the Google account; **2-Step Verification and a recovery option** (cross-link Cybersecurity); a professional display name and photo; Chrome/Edge profile habits; mobile apps; **offline mode** for Docs/Sheets/Slides (verify steps) for unreliable data and power; Drive storage awareness (free storage limits; verify); a folder template; keyboard-shortcut cheat sheet; verification checklist.

## 7.5 Week-by-Week Content Specification

### Week 1: Gmail, Calendar, Drive and Productivity Basics
**Lessons:** (1) **Gmail:** compose, formatting, attachments vs Drive links, **labels, filters, stars, categories, search operators** (`from:`, `to:`, `subject:`, `has:attachment`, `older_than:`, `is:unread`; verify and test each), **templates (canned responses)**, schedule send, undo send, signatures, vacation responder, delegation (concept; verify availability), unsubscribing and spam reporting. (2) **Inbox-zero routine** (a 15-minute triage method). (3) **Calendar:** events, invitations, time zones (add a second time zone), recurring events, reminders, **appointment schedules** (verify plan requirements), sharing calendars and permission levels, working hours. (4) **Drive:** folder structure, My Drive vs Shared with me, **sharing permissions (Viewer, Commenter, Editor)**, link sharing settings (restricted vs anyone with the link), version history, offline files, search, shared drives (paid; verify). (5) **Contacts, Tasks and Keep** for quick capture. (6) Safe habits: recognising phishing, reviewing "Sign-in & security" settings.
**Assignment:** a Gmail account with **5 labels, 3 filters and 3 templates** (screenshots), a calendar with a weekly routine and 1 shared event with a test address, and a **Drive folder system** with correct sharing (view-only link tested from a second account), plus a one-page "How I manage my inbox" guide. **Grading:** setup quality 40%, correct sharing 25%, routine and guide 25%, security habits 10%.
**Downloads:** `mock-inbox-emails.md` (30 fictional emails to sort), `drive-folder-structure-template.md`, `search-operators-cheat-sheet.md`.

### Week 2: Google Docs
**Lessons:** (1) Docs interface; formatting; **styles and headings**; document outline; (2) lists, tables, images, drawings, page setup, headers, footers, page numbers; (3) **Table of contents**, bookmarks and links; footnotes; (4) **Collaboration:** share settings, comments, @mentions, assigned action items, **Suggesting mode**, version history and named versions, compare documents; (5) **Templates** and building blocks (verify feature names); (6) Voice typing (verify language support), tools for word count and spelling; (7) Export and publish (PDF, Word, web link); (8) Writing clear SOPs and proposals (structure, headings, checklists); (9) Doc etiquette in teams.
**Assignment:** write (a) a **Standard Operating Procedure** for handling WhatsApp orders at Fresh Bites with headings, a checklist table and a TOC; (b) a **2-page proposal** shared with the mentor for a **comment and suggestion round**; submit both with version history evidence. **Grading:** structure and formatting 35%, clarity 30%, collaboration evidence 25%, polish 10%.
**Downloads:** `sop-content-whatsapp-orders.md`, `proposal-content-fresh-bites-catering.md`, `doc-collaboration-etiquette.md`.

### Week 3: Google Sheets (Mid-Course Checkpoint)
**Lessons:** (1) Sheets basics: entering data, formatting, number formats (Naira), freeze rows, sorting, **filters and filter views**; (2) formulas: `SUM`, `AVERAGE`, `IF`, `COUNTIF(S)`, `SUMIF(S)`, `VLOOKUP`, `XLOOKUP`; (3) **Google-specific functions:** `ARRAYFORMULA`, `FILTER`, `SORT`, `UNIQUE`, `QUERY` (with 5 worked examples), `IMPORTRANGE`, `SPARKLINE`; (4) **Data validation** (dropdowns, checkboxes), **conditional formatting**, protected ranges, named ranges; (5) **Pivot tables** and **charts**; (6) A simple **dashboard** sheet; (7) Collaboration and notifications (notification rules), sharing carefully; (8) Cross-link to Automation Week 2 (Forms to Sheets and Apps Script) and Data Analysis (advanced analysis).
**Assignment:** **Fresh Bites Inventory and Sales Tracker:** inventory sheet (20 items with dropdowns and low-stock highlight), sales sheet (100 supplied rows), a `QUERY`-based summary, a pivot table, 2 charts and a dashboard tab. **Mid-course checkpoint (end of week):** as in 7.2. **Grading:** correct formulas 35%, validation and formatting 20%, pivot and charts 25%, dashboard clarity 20%.
**Downloads:** `inventory-20-items.csv`, `sales-sample-100.csv`, `query-practice-examples.md`.

### Week 4: Slides, Forms and Sites
**Lessons:** (1) **Slides:** structure, master and layouts, themes, consistent fonts and colours, images, shapes, diagrams, tables, charts linked from Sheets, animations (restraint), speaker notes, present mode and presenter view, collaboration; design rules (contrast, white space, minimal text). (2) **Forms:** question types, required fields, sections and logic, validation, themes, **linking to Sheets**, response notifications, quiz mode and grading (concept), privacy (do not collect unnecessary personal data; add a short consent line). (3) **Sites:** pages, navigation, embedding Docs/Slides/Forms, publishing and sharing settings (verify), accessibility basics. (4) Choosing the right tool: Doc vs Slide vs Site vs Form. (5) Cross-link: Web Development course for full websites.
**Assignment:** (a) a **customer feedback or registration form** for Fresh Bites linked to a sheet with a summary tab; (b) a **6-slide results report** based on 20 supplied fictional responses; (c) a **3-page Google Site** (Home, Menu, Contact) with an embedded form. **Grading:** form design and data handling 30%, slide quality 30%, site usability 25%, privacy and accessibility 15%.
**Downloads:** `feedback-responses-20.csv`, `form-design-checklist.md`, `slides-design-checklist.md`.

### Week 5: Meet, Chat, Collaboration, Security and Capstone
**Lessons:** (1) **Meet:** scheduling from Calendar, joining, audio/video settings, screen share, chat and hand raising, captions, recording and breakout rooms (**verify plan requirements and availability**), low-bandwidth tips (audio-only fallback, camera off), meeting etiquette and agendas. (2) **Chat and Spaces:** channel-style collaboration, threads, notifications; when to use chat vs email. (3) **Sharing and permissions audit:** find and fix over-shared files (Drive "Shared with me" and "Anyone with the link"), ownership transfer, leaving shared files, least-privilege sharing. (4) **Security checkup:** 2-Step Verification, passkeys (verify), recovery options, connected apps review, phishing and OAuth-consent scams, suspicious sign-in alerts. (5) **Admin basics for small organisations** (concept; requires a Workspace plan): users, groups, sharing policies, 2-step enforcement (verify); (6) **Productivity systems:** weekly review routine, naming conventions, templates, shared calendars for a team. (7) **Workflow glimpse:** Forms to Sheets to email (cross-link Automation). (8) **Career links:** VA, admin, remote support roles; describing Workspace skills on a CV; any verified Google certification or career-certificate options (no pass or job claims).
**Capstone: Remote Team Workspace** for Fresh Bites (fictional 6-person team): (1) a **Drive folder structure** with correct sharing for roles (owner, cooks, counter, rider); (2) **templates** (SOP Doc, weekly report Doc, order Sheet); (3) a **Form to Sheet** pipeline for orders or reservations with a summary dashboard; (4) a **shared team calendar** and a recurring weekly meeting with an agenda Doc; (5) a **security and sharing audit checklist** completed on your own account; (6) a 10-minute walkthrough (live or recorded). **Rubric:** organisation and sharing 25, correct use of tools 25, collaboration design 20, security 15, documentation and walkthrough 15.
**Downloads:** `capstone-brief.md`, `sharing-audit-checklist.md`, `meeting-agenda-template.md`, `team-roles-matrix.csv`.

## 7.6 Course-Specific Rules
- Teach **task + feature name**; interfaces change often. Verify features and plan requirements; date-stamp.
- Do **not** create or modify anything in the owner's Google account while writing the course (no MCP use). Provide instructions and fictional content only.
- Starter data as CSV/Markdown; learners create the Google files themselves.
- Emphasise privacy: forms and shared files must not expose personal data.

## 7.7 Open Decisions
| # | Decision | Default |
|---|---|---|
| 1 | Include paid-plan-only features as optional notes? | Yes, clearly labelled |
| 2 | Mention a Google certificate pathway? | Only after verification, no claims |

---

# COURSE 8: Video Editing

## 8.1 Snapshot (Fixed)
| Item | Value |
|---|---|
| Title | Video Editing |
| Slug | `video-editing` |
| Duration | **8 weeks** |
| Format | Weekly written lessons + shooting and editing assignments + 90-min mentoring (in person; the mentor reviews videos on the screen) |
| Audience | Beginners who want to create social videos, event highlights and promo videos for themselves or clients |
| Outcome | Shooting good footage with a phone, editing cleanly, clean audio, captions and graphics, short-form and long-form videos, client workflow, delivery, and a **portfolio showreel** |
| Summary | "Shoot, edit and deliver professional videos for social media, events and businesses." |
| Level / category / icon / order | `Beginner` / `Creative Skills` / `clapperboard` / `11` |
| Running case | Yenagoa Fresh Bites (0.1); learners shoot their **own footage** of any safe, consented subject (food, a shop, a craft, their own product) if a real kitchen is not available |
| Tools (decided) | **CapCut** (phone and desktop) as the primary tool for Weeks 1 to 5; **DaVinci Resolve (free version)** for Weeks 6 to 8 long-form and colour/audio; **Shotcut** as a lightweight alternative for weak laptops. **Verify** current free features, export limits, watermarks, system requirements and licence terms for each, and date-stamp |
| Hardware reality | Provide a "low-spec laptop" guide: proxy/optimised media, lower preview resolution, closing other apps, storage management; verify settings names per tool |

## 8.2 Weekly Plan and Assessment
| Wk | Topic | Deliverable |
|---|---|---|
| 1 | Video Foundations, Setup and Shooting With a Phone | 10-clip shot set + organised project folder |
| 2 | Editing Basics | 30-second "A Day at Fresh Bites" video |
| 3 | Audio: Voice, Music and Sound | Re-edit with voice-over, music and ducking |
| 4 | Titles, Graphics, Captions and Colour | Branded 30-second ad with captions |
| 5 | Short-Form Content (Reels, TikTok, Shorts, WhatsApp Status) | 5-video content series |
| 6 | Storytelling and Long-Form Editing | 2 to 3 minute brand story or event highlight |
| 7 | Client Video Types and Workflow | Client-style project with 2 revision rounds |
| 8 | Export, Delivery, Business and Capstone | Showreel + capstone package + presentation |

**Assessment:** weekly assignments (Weeks 1 to 7) 40% · mid-course checkpoint at end of Week 4 (90 minutes: edit a supplied raw clip set into a 30-second captioned video with audio levels and a title) 15% · capstone and showreel 30% · attendance and consistency 15%.

## 8.3 `_course.md` Frontmatter
```yaml
---
title: "Video Editing"
slug: video-editing
status: available
category: "Creative Skills"
level: "Beginner"
duration: "8 weeks"
format: "Weekly lessons + shooting and editing projects + 90-minute mentoring"
summary: "Shoot, edit and deliver professional videos for social media, events and businesses."
outcomes:
  - "Shoot steady, well-lit, clear-audio footage with a phone"
  - "Edit with clean cuts, pacing, titles, captions and colour"
  - "Create short-form videos for social platforms"
  - "Tell stories in longer videos such as event highlights and brand films"
  - "Deliver client work, price projects and build a showreel"
tools: ["CapCut", "DaVinci Resolve", "Shotcut", "Phone camera"]
icon: "clapperboard"
order: 11
featured: false
---
```

## 8.4 Setup Guide
Hardware and storage check (**video needs lots of storage**); installing the three tools (verify download sources; **only official sites**; warn against cracked software, which carries malware risk; cross-link Cybersecurity); phone camera settings (resolution, frame rate, grid, exposure lock, stabilisation; verify per phone), accessories (tripod, clip-on or lavalier microphone, power bank, reflector) with **low-cost alternatives**; a **project folder template** (`01-Raw`, `02-Audio`, `03-Graphics`, `04-Projects`, `05-Exports`, `06-Archive`); **backup routine** (two copies); music and stock licensing rules (see 8.7); a **consent and permissions** one-pager; verification checklist.

## 8.5 Week-by-Week Content Specification

### Week 1: Video Foundations, Setup and Shooting With a Phone
**Lessons:** (1) How video works: frames and **frame rate** (24/25/30/60 fps, when to use each), **resolution** (720p, 1080p, 4K) vs file size, **aspect ratios** (16:9, 9:16, 1:1, 4:5) and where each is used, **bitrate and codecs** (concept: H.264/H.265, MP4/MOV), compression and quality. (2) The **editing workflow:** plan, shoot, import, assemble, refine, audio, graphics, colour, export, deliver, archive. (3) **Shooting with a phone:** horizontal vs vertical, steady shots (elbows in, tripod, gimbal alternatives), **lighting** (window light, avoid mixed light, backlight problems), **audio first** (get close, reduce noise, record room tone), clean lens, storage and battery. (4) **Shot types:** wide, medium, close-up, detail, over-the-shoulder, point-of-view, moving shot; **B-roll**. (5) The **10-clip shot list** (supplied) and the "5 seconds rule" (shoot at least 5 to 10 seconds per shot). (6) Consent and safety when filming people and places. (7) File naming and importing without losing footage.
**Assignment:** shoot the **10-clip shot set** (both vertical and horizontal versions of 3 clips), name and organise them in the project folder template, and write a 150-word shooting note (what worked, what to fix). **Grading:** variety and coverage 30%, stability and exposure 25%, audio clarity 20%, organisation 15%, note 10%.
**Downloads:** `shot-list-10.md`, `shooting-checklist.md`, `consent-and-permission-one-pager.md`, `fresh-bites-brand-brief.md`.

### Week 2: Editing Basics
**Lessons:** (1) The editing interface (media pool, preview, timeline, tracks, inspector); (2) importing, creating a project, matching settings to footage; (3) **Cutting:** split, trim, ripple delete, deleting gaps; selecting the best parts; (4) **Pacing and rhythm:** cut on action, shot length rules of thumb, avoiding jump cuts, **J-cuts and L-cuts** (concept); (5) Speed changes, freeze frames, reframing and crop/zoom, simple stabilisation (verify availability); (6) Transitions: why cuts are usually best, when to use dissolves; (7) Keyboard shortcuts for the chosen tool; (8) Saving and project backups; (9) Exporting a quick draft; reviewing your edit critically.
**Assignment:** edit a **30-second "A Day at Fresh Bites"** (or the learner's own subject) from the Week 1 clips; no music yet; at least 12 cuts, one speed change and one reframed shot; export at 1080p; write a 100-word edit note. **Grading:** cut quality 35%, pacing 30%, technical export 15%, story clarity 15%, note 5%.
**Downloads:** `editing-shortcuts-capcut.md`, `editing-shortcuts-resolve.md` (verify before publishing), `edit-review-checklist.md`.

### Week 3: Audio: Voice, Music and Sound
**Lessons:** (1) Why audio matters more than picture. (2) **Recording voice-over on a phone** (quiet room, soft surroundings, mic distance, pop control, reading naturally; write and tighten a script). (3) **Levels:** rule-of-thumb target ranges for dialogue and music (verify against current guidance and label as rules of thumb), avoiding clipping, using meters. (4) **Cleanup:** noise reduction, simple EQ, normalisation (verify tool features). (5) **Music:** choosing mood and tempo, cutting to the beat, **ducking** (lower music under voice). (6) **Sound effects** and ambience (natural sound under B-roll). (7) **Licensing:** only use music you have rights to (platform libraries, royalty-free sources **after verifying each source's current licence terms**); **never use commercial songs in client or monetised videos**; how copyright claims work (concept); keep licence records. (8) Syncing separately recorded audio.
**Assignment:** record a 20 to 30 second voice-over script, **re-edit the Week 2 video** with voice-over, music, one sound effect and ducking; submit the script and a **licence log** (source, licence terms, date, link or file name). **Grading:** audio clarity 30%, levels and ducking 25%, music choice and licence log 25%, script quality 20%.
**Downloads:** `voice-over-script-template.md`, `audio-checklist.md`, `licence-log-template.csv`.

### Week 4: Titles, Graphics, Captions and Colour (Mid-Course Checkpoint)
**Lessons:** (1) **Titles and text:** hierarchy, legibility (contrast, size, safe margins), animation restraint; **lower thirds**. (2) **Brand kit:** colours, fonts, logo placement, reusable templates (use the fictional Fresh Bites kit). (3) **Captions and subtitles:** why most social videos are watched muted; auto-caption features (verify), **proofreading and fixing auto-captions** (names, pidgin, local words), styling, timing, safe areas. (4) **Basic colour correction:** exposure, contrast, white balance, saturation, matching clips (verify tool controls), avoiding heavy filters; (5) **Keyframes** (position, scale, opacity) and simple motion; (6) Masks and overlays (intro); optional green screen. (7) Stickers, emojis and effects: use sparingly; (8) Accessibility: caption contrast, avoiding flashing effects.
**Assignment:** a **branded 30-second ad** for a Fresh Bites offer with a title, a lower third, captions, a logo end-card and consistent colour; submit the project file or export and a 1-page "design choices" note. **Mid-course checkpoint (end of week):** as in 8.2. **Grading:** text legibility and captions 30%, brand consistency 25%, colour and polish 25%, call to action clarity 20%.
**Downloads:** `fresh-bites-brand-kit.md` (colours, fonts available for free use after verification, logo as a simple SVG you create), `caption-style-guide.md`, `checkpoint-raw-clips-brief.md` (describe the raw-clip set; learners shoot or the mentor supplies footage).

### Week 5: Short-Form Content (Reels, TikTok, Shorts, WhatsApp Status)
**Lessons:** (1) What works in short-form: **the hook (first 3 seconds)**, one idea per video, fast pacing, clear call to action. (2) **Vertical framing and safe zones** (keep text away from interface areas; verify current platform layouts). (3) Length and specs per platform (**verify and date-stamp**: duration limits, resolution, file size, WhatsApp Status limits). (4) **Formats:** quick tips, before and after, behind the scenes, product showcase, testimonial, trend adaptation (copyright-safe), day-in-the-life. (5) **Repurposing** one shoot into 5 videos; batch workflow. (6) **Captions, hashtags and posting basics**; consistency over perfection. (7) Reading basic analytics: views, watch time/retention, shares, follows (concept) and iterating. (8) Platform policies and ethics (no misleading edits, no stolen content, labelling sponsored content; AI-generated content disclosure where required; cross-link AI course Week 6).
**Assignment:** produce a **5-video series** (15 to 30 seconds each) for Fresh Bites: menu highlight, behind the scenes, customer-style testimonial (fictional or consenting), a quick tip, and a promo; each with a hook, captions and a CTA; plus a **posting plan** (7 days) and a reflection on which hook worked best (or would, if not published). **Grading:** hooks 25%, editing and captions 30%, consistency across the series 20%, posting plan 15%, reflection 10%.
**Downloads:** `hook-ideas-list.md`, `short-form-planning-sheet.csv`, `posting-plan-template.csv`.

### Week 6: Storytelling and Long-Form Editing
**Lessons:** (1) **Story structure for video:** hook, context, build, payoff, call to action; **script and storyboard** basics (a simple two-column script, shot list). (2) **Interview shooting basics:** framing, eye-line, lighting, clean audio, asking good questions, getting natural answers; (3) **B-roll and cutaways** to cover edits; (4) **Assembling a long edit:** string-out, rough cut, fine cut, trimming, pacing and variety; (5) **Intro to DaVinci Resolve** (verify current version and layout): project setup, the Cut, Edit, Color, Fairlight and Deliver pages; organising media in bins; timeline management; (6) **Colour and audio** in Resolve at a basic level (primary corrections, audio levels and clean-up). (7) Working on a low-spec laptop (proxy media, timeline resolution). (8) Reviewing with feedback: how to ask for and use critique.
**Assignment:** a **2 to 3 minute brand story or event highlight** (e.g., "The story of Yenagoa Fresh Bites" or a small consented event) in Resolve (or Shotcut/CapCut if hardware cannot run Resolve), with an interview or voice-over, B-roll, music, titles and captions; submit a script and a short **editing log** (what you cut and why). **Grading:** story structure 30%, editing quality 25%, audio and colour 20%, script and log 15%, technical delivery 10%.
**Downloads:** `story-script-template.md`, `interview-question-bank.md`, `storyboard-template.md`, `editing-log-template.md`.

### Week 7: Client Video Types and Workflow
**Lessons:** (1) **Common client videos:** event highlights (church programmes, weddings, graduations, school events), promo and product ads, testimonials, tutorials/explainers, short recruitment or NGO videos. (2) **Consent and sensitivity:** filming people, **children (get guardian consent and follow venue rules)**, religious and cultural settings, drone and public-space rules (verify local regulations before mentioning drones). (3) **The client workflow:** discovery call questions, written brief, quote, deposit, shoot plan, edit, **review rounds (limit revisions)**, approval, final delivery, archive. (4) **Review rounds:** how to take feedback, using time-coded comments, version naming (`ClientName_Project_v1`), avoiding scope creep. (5) **Templates and speed:** intro/outro templates, reusable title packs, shortcuts. (6) **YouTube basics:** titles, thumbnails (design rules, text size), descriptions, chapters (concept). (7) **Event-day checklist** (batteries, storage, audio, shot list, backup).
**Assignment:** a **client-style project** from a supplied written brief (a fictional church choir concert promo or a Fresh Bites catering promo): plan, shoot or use own footage, edit **version 1**, then apply **two rounds of supplied revision notes** (v2 and v3); submit all versions, a change log, and a one-page project report. **Grading:** meeting the brief 25%, editing quality 25%, revision handling and change log 25%, professionalism of documents 15%, file naming and delivery 10%.
**Downloads:** `client-brief-template.md`, `client-brief-fictional-choir-promo.md`, `revision-notes-round-1.md`, `revision-notes-round-2.md`, `event-day-checklist.md`, `discovery-call-questions.md`.

### Week 8: Export, Delivery, Business and Capstone
**Lessons:** (1) **Export settings by purpose:** social (vertical, 1080x1920), YouTube, WhatsApp-friendly (smaller files for data-light delivery), archive/master; bitrates and file sizes (explain trade-offs, verify tool presets). (2) **Delivery:** cloud links with permissions, download expiry, naming and folder structure, handing over project files (when and why not). (3) **Backups and archiving.** (4) **Copyright and licensing recap:** music, stock, fonts, client-supplied assets; model and location releases; usage rights in contracts. (5) **Pricing and packaging methods:** per-video, packages, monthly content retainer, rush fees; costing your time (teach the method; no figures); **50% deposit**, revision limits, cancellation terms; a simple one-page agreement outline (not legal advice). (6) **Portfolio:** a **60 to 90 second showreel** (best work first, 3 to 5 pieces, music licensed, clear contact end-card), hosting (YouTube unlisted/public, Google Drive, a simple site), a profile page; (7) **Finding clients:** local businesses, churches, schools, events, NGOs, creators; outreach scripts; freelance platforms (verify access and policies); **scam awareness** (overpayment cheques, "send your raw files" requests, unpaid "tests"). (8) Capstone brief and presentation tips.
**Capstone:** a **portfolio package** for a real (consented) or fictional client: (1) a **showreel** (60 to 90 seconds); (2) one **2 to 3 minute long-form video**; (3) **three short-form videos**; (4) a **project folder** showing brief, quote, licence log and delivery notes; (5) a **10-minute presentation** explaining the work and process. **Rubric:** craft (editing, audio, graphics) 35, storytelling and brief fit 20, professional workflow and documents 20, licensing and ethics 10, presentation 15.
**Downloads:** `export-settings-guide.md` (verified, dated), `quote-template.md`, `simple-agreement-outline.md`, `showreel-checklist.md`, `capstone-brief.md`, `capstone-rubric.md`.

## 8.6 Course-Specific Rules
- **Do not commit video, audio or image binaries larger than a few hundred KB.** Provide briefs, scripts, shot lists and instructions; learners shoot their own footage. Use only assets you create (simple SVG logos, text files).
- **Never recommend piracy, cracked software, or copyrighted music.** Explain licensing carefully; verify each named source's current terms.
- **Verify** tool features, free-version limits, watermarks, system requirements and platform specs; date-stamp.
- Safety: working at events, power and heat for phones, protecting equipment, and filming consent.
- All people, businesses and testimonials in examples are **fictional**.

## 8.7 Open Decisions
| # | Decision | Default |
|---|---|---|
| 1 | CapCut primary and DaVinci Resolve secondary (as specified)? | Yes |
| 2 | Does the learner have a phone suitable for filming and enough laptop storage? | Assume mid-range phone; include storage guide |
| 3 | Include optional drone/gimbal notes? | Minimal safety note only |

---

# FINAL CHECKS (Apply After Each Course)

1. Re-read the course's section above and confirm that **every listed week, lesson, deliverable, grading guide, download and rule exists** in the output (use a checklist; list gaps in the handoff report).
2. Run all items in `COURSE-BUILD-STANDARDS.md` section 9 (Quality Checklist) and section 8 (Activation Checklist).
3. Confirm **no off-spec additions**: no extra weeks, renamed topics, or changed deliverables. If you believe a change would help, **propose it to the owner** in the handoff report; do not apply it.
4. Confirm the **Courses listing now shows the course as Available** with the correct summary, level, duration and icon.
5. Provide the handoff report (standards section 10), including: verified vs unverified facts, templates created, items needing the owner's input, and which files are in `_facilitator/`.
