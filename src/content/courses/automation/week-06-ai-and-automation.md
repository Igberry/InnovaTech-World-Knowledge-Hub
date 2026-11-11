---
title: "AI and Automation Together"
course: automation
order: 6
week: 6
phase: "Putting It Together"
summary: "Add AI steps to your automations for smarter workflows, drafting, sorting, and summarising automatically, while keeping accuracy and a human in charge."
estimatedHours: 8
tools: ["A no-code automation tool", "An AI chat assistant", "A spreadsheet"]
downloads:
  - label: "Automation blueprint"
    href: "/downloads/automation/automation-blueprint.md"
---

**Goal:** Combine AI with automation to build smarter workflows, where an AI step drafts, sorts, or
summarises automatically, while you keep accuracy, privacy, and judgement under control.

## Learning Objectives

By the end of this week you can:

- Explain how an AI step fits inside an automation
- Identify tasks where AI adds value to an automated workflow
- Build an automation that includes an AI step
- Keep accuracy and privacy safe when AI runs automatically
- Decide where a human must still check the AI's output

## Tools / Accounts Needed This Week

- Your no-code automation tool and an AI chat assistant (many tools offer an AI action)
- A spreadsheet, and the [automation blueprint](/downloads/automation/automation-blueprint.md)

## Pre-Session Resources (about 2 hours)

- Review: the [Artificial Intelligence](/courses/artificial-intelligence/) course, especially prompting
  (Week 2) and fact-checking (Week 5).
- Watch: *Search YouTube: "[your automation tool] AI step tutorial"* if your tool offers one.
- Reflect: which of your automations would be better if a step could "understand" text?

## Lesson 1: Where AI fits in automation

In earlier weeks, each action was a fixed step (add a row, send an email). AI adds a step that can **work
with language**: draft a reply, summarise a message, sort text into categories, or pull key details out of
a form. Many no-code tools now offer an "AI" action you can drop into a workflow.

The shape is the same, with an AI step in the middle:

> WHEN a new enquiry arrives, DO ask AI to summarise it in one line, DO add that summary to a spreadsheet,
> DO notify the team.

The AI does the "understanding" part; the rest of the automation moves the result around.

## Lesson 2: Good tasks for an AI step

AI steps shine when a workflow needs to handle **messy language**:

- **Summarise:** turn a long enquiry or review into one clear line
- **Categorise / tag:** sort incoming messages into "sales / support / spam"
- **Draft:** write a first-draft reply for a human to approve
- **Extract:** pull the name, date, or amount out of free text
- **Rewrite:** tidy or shorten text automatically

They are weak, and risky, where exact facts matter or a mistake goes out unseen. That is where you keep a
human check.

## Lesson 3: Build an AI-assisted automation

A safe, useful pattern:

> WHEN a new support email arrives:
> 1. Ask AI to categorise it (sales / support / other) and summarise it in one line
> 2. Add the category and summary to a spreadsheet
> 3. If it is "support", create a task for the team

Build it, and **test with sample emails** you write yourself. Check the AI categorised and summarised them
sensibly before trusting it on real mail. Prompting still matters: give the AI step a clear instruction,
just as you learned in the AI course.

> **Tip:** For an AI step, write the prompt as carefully as you would by hand: say exactly what to do and
> what format to return. A vague prompt gives messy, hard-to-use output inside your workflow.

## Lesson 4: Keep accuracy and privacy safe

Automated AI has the same risks as manual AI, now running without you watching each time. So build the
safeguards in:

- **Accuracy:** do not let an AI step send facts, numbers, or prices straight to a customer unchecked.
  Have it draft for a human to approve, or restrict it to low-risk tasks (sorting, summarising for internal
  use).
- **Privacy:** be careful what data flows into an AI step. Do not route sensitive personal, financial, or
  confidential information through it without good reason and the right permissions.
- **Honesty:** if AI drafts customer replies, a human should approve them, and you should be comfortable
  that customers are not being misled.

> **Warning:** An AI step that auto-sends unchecked messages can repeat a hallucination to every customer.
> For anything customer-facing or fact-sensitive, have AI draft and a human approve.

## Lesson 5: Where the human stays in charge

The best AI-automation keeps people responsible for judgement and final checks. Put the human checkpoint
where the risk is:

- AI **sorts and summarises** for internal use: usually safe to run automatically.
- AI **drafts** a customer reply: a human approves before it sends.
- AI touches **money, legal, or sensitive** matters: a human decides, every time.

Write these checkpoints into your blueprint so they always happen.

### Common mistakes

- Letting an AI step auto-send customer messages with no human approval
- Routing sensitive data through an AI step without need or permission
- A vague prompt in the AI step, giving messy output
- Trusting AI categorisation without testing it on samples
- Forgetting that an automated AI mistake repeats on every run

## Practice Exercises

1. List three of your workflows and where an AI step could help.
2. Write a clear prompt for an AI step that categorises incoming messages.
3. Build an automation with an AI summarise/categorise step; test with sample text.
4. Check the AI step's output on five samples; note any it got wrong.
5. Add a human-approval point before any customer-facing action.
6. Decide what data you will and will not allow into the AI step, and why.
7. Document the AI-assisted workflow in a blueprint, marking the human checkpoints.

## Weekly Assignment (Due Before Week 7)

Build and document **one AI-assisted automation**:

1. A **blueprint** showing the steps, the AI step's prompt, and the human checkpoints
2. The **built automation** with an AI step (summarise, categorise, or draft), tested on sample data
3. A **safety note**: what data you allow into the AI step, and where a human approves
4. A short check of the **AI step's accuracy** on several samples, with any errors noted

### Grading guide

| Criteria | Weight |
|---|---|
| A working automation with a sensible AI step | 35% |
| Clear AI prompt and useful output | 20% |
| Human checkpoints placed where risk is | 25% |
| Accuracy and privacy handled thoughtfully | 20% |

### Definition of done

- [ ] Blueprint with the AI prompt and human checkpoints
- [ ] Automation built and tested on samples
- [ ] A data/privacy and approval note
- [ ] An accuracy check with errors noted

## Mentoring Session Plan (90 minutes)

| Time | Activity |
|---|---|
| 0-10 min | Recap; AI as a "language" step inside automation |
| 10-40 min | Build an AI categorise/summarise automation live; test on samples |
| 40-60 min | Prompt-writing for AI steps; compare vague vs clear |
| 60-80 min | Place human checkpoints; discuss accuracy and privacy |
| 80-90 min | Brief for Week 7 (reliability and maintenance) |

## Facilitator Notes

Tie this week firmly back to the AI course: prompting and fact-checking now run automatically, so the
safeguards must be built in. Demonstrate an AI step on sample data and show it getting one wrong, to make
the human-checkpoint lesson real. Stress two rules: AI drafts, humans approve anything customer-facing or
fact-sensitive; and be careful what data enters an AI step. If a learner's tool lacks an AI action, they can
pair the AI manually within the workflow or describe the design. Keep data fictional.

## Self-Check Questions

1. What kind of step does AI add to an automation?
2. Name three good tasks for an AI step and one risky one.
3. Where should a human checkpoint go in an AI-assisted workflow?
4. Why is an automated AI mistake more dangerous than a one-off manual one?
