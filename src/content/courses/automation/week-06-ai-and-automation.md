---
title: "AI and Automation Together"
course: automation
order: 6
week: 6
phase: "Putting It Together"
summary: "Drop an AI step into your automation so it reads, sorts, and summarises messages on its own - then build the human checkpoints that keep it accurate and honest. The clever week."
estimatedHours: 8
tools: ["A no-code automation tool", "An AI chat assistant", "A spreadsheet"]
downloads:
  - label: "Automation blueprint"
    href: "/downloads/automation/automation-blueprint.md"
---

**Goal:** Combine AI with automation to build a smarter workflow - an AI step that drafts, sorts, or
summarises automatically - while you keep accuracy, privacy, and judgement firmly in charge. You build it,
test it on samples, and place the human checkpoints yourself.

## What you'll be able to do

- Explain how an AI step fits inside an automation
- Spot tasks where AI adds value to an automated workflow
- Build an automation that includes an AI step
- Keep accuracy and privacy safe when AI runs on its own
- Decide where a human must still check the AI's output

## Before you start (about 10 minutes)

- Open your no-code tool and an AI chat assistant (many tools offer a built-in "AI" action), plus the
  [automation blueprint](/downloads/automation/automation-blueprint.md).
- Warm-up: paste a long enquiry into your AI assistant and ask it to "summarise this in one line and tag it
  as sales, support, or other." That one move is exactly what you will automate this week.

## Try it 1 - See where AI fits

**Why it matters:** earlier actions were fixed (add a row, send an email). An AI step can work with
language - draft, summarise, sort, or extract - right inside the flow.

**Do this now:**
1. In your tool, find the **AI action** (it may be called "AI", "ChatGPT", "run a prompt", or similar).
2. Picture the shape: WHEN a new enquiry arrives, DO ask AI to summarise it, DO add the summary to a sheet, DO notify the team.
3. Note which part the AI does: the "understanding", while the rest just moves the result around.

**You've got it when:** you can point to the one step in a flow where AI does the thinking.

## Try it 2 - Pick good jobs for the AI step

**Why it matters:** AI shines on messy language and is risky where exact facts matter or output goes out unseen.

**Do this now - try each of these in your AI assistant on a sample message, and rate how well it did:**
1. **Summarise:** turn a long enquiry into one clear line.
2. **Categorise:** sort a message into "sales / support / spam".
3. **Draft:** write a first-draft reply for a human to approve.
4. **Extract:** pull the name, date, or amount out of free text.

**You've got it when:** you can name three jobs AI handles well and one where you would keep a human.

## Try it 3 - Build an AI-assisted automation

**Why it matters:** this is the real build - an AI step working automatically inside a tested flow.

**Do this now:**
1. Build: WHEN a new support email arrives, DO ask AI to categorise it and summarise it in one line.
2. DO add the category and summary to a spreadsheet.
3. DO, if it is "support", create a task for the team.
4. Write the AI prompt carefully: say exactly what to do and what format to return. A vague prompt gives messy output.
5. Test with five sample emails you write yourself and check each result.

**You've got it when:** your flow categorises and summarises test emails sensibly, from a clear prompt.

## Try it 4 - Put the human checkpoint where the risk is

**Why it matters:** automated AI has the same risks as manual AI, now running without you watching each time.
An unchecked AI step can repeat a hallucination to every customer.

**Do this now:**
1. Mark which steps are safe to run automatically (sorting, summarising for internal use).
2. Add a **human-approval point** before anything customer-facing sends.
3. Decide what data you will and will not allow into the AI step (no sensitive personal or financial data without good reason).
4. Write these checkpoints into your blueprint so they always happen.

**You've got it when:** a human approves anything customer-facing or fact-sensitive, and you know exactly what data flows into the AI step.

### Watch out for

- Letting an AI step auto-send customer messages with no human approval
- Routing sensitive data through an AI step without need or permission
- A vague prompt in the AI step, giving messy output
- Trusting AI categorisation without testing it on samples
- Forgetting that an automated AI mistake repeats on every run

## This week's build: one AI-assisted automation

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

## Extra quick wins (optional)

- Compare a vague prompt and a clear prompt on the same message - see the difference in the output.
- Add an AI step that extracts just the phone number from an enquiry into its own column.
- Ask your AI to draft three reply templates, then fact-check and save the best.

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

## Can you do these now?

1. What kind of step does AI add to an automation?
2. Name three good tasks for an AI step and one risky one.
3. Where should a human checkpoint go in an AI-assisted workflow?
4. Why is an automated AI mistake more dangerous than a one-off manual one?
