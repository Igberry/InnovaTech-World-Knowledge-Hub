---
title: "Foundations, Setup & Excel Basics"
course: "data-analysis"
order: 1
week: 1
phase: "Foundations"
summary: "Open real sales data and, by the end of the week, turn it into money numbers a business owner would actually use."
estimatedHours: 10
tools: ["Excel"]
downloads:
  - label: "Orders (clean) CSV"
    href: "/downloads/data-analysis/orders_clean.csv"
---
**Goal:** Open a real NaijaMart orders file and, in your first week, turn raw rows into answers: total revenue, the biggest order, the busiest city. You learn by doing it, not by reading about it.

## What you'll be able to do
- Open a CSV correctly and turn it into an Excel Table
- Build a `revenue` column and a `net_revenue` column with formulas
- Sort, filter, and answer real business questions in seconds
- Lock a cell reference so a formula copies down correctly
- Say, in your own words, what a data analyst actually does

## New to spreadsheets? Read this once

If you have never really used Excel, read this before the steps below. It explains everything the rest of the course assumes, so you can work on your own.

- **Cells, columns, and rows.** The grid is made of boxes called **cells**. Columns are the letters across the top (A, B, C...). Rows are the numbers down the side (1, 2, 3...). So **B2** means the box where column B meets row 2. When a step says "in cell `K1`", click the box where column K meets row 1 and start typing.
- **Typing a formula.** A formula always starts with an equals sign `=`. Click a cell, type the formula, then press **Enter**. Excel shows the answer, not the formula you typed.
- **A "helper column".** This just means a spare empty column next to your data where you build a calculation or a fix. Later you often copy the result and paste it back as plain values.
- **A menu path like "Data -> From Text/CSV".** The words along the very top of Excel (File, Home, Insert, Data...) are **tabs**. "Data -> From Text/CSV" means: click the **Data** tab, then click the **From Text/CSV** button on it.
- **Table references like `[@quantity]`.** Once your data is an Excel Table (you make one in Try it 1), you can point at a column by its name instead of a letter. `[@quantity]` means "the quantity on this same row". It is easier to read than `E2`, and it fills the whole column for you.

Do not try to memorise this. Keep it open for a week or two and it will become second nature.

## Before you start (about 10 minutes)
- Make sure Excel opens and you have your GitHub and Google accounts from the [Setup Guide](/courses/data-analysis/00-setup-guide/).
- Download the **Orders (clean) CSV** from the panel on this page.
- Warm-up: open it with **Data -> From Text/CSV**, *File Origin* **UTF-8**, then **Load**. Glance at the columns. What does one row seem to represent?
- Optional, 5 minutes: search YouTube for *"Alex The Analyst What is a Data Analyst"* and watch the intro.

## Try it 1 - Make the data yours

**Why it matters:** a plain CSV is awkward. An Excel Table gives you filters, auto-fill, and names you can use in formulas.

**Do this now:**
1. With the CSV open, **File -> Save As -> Excel Workbook (.xlsx)**.
2. Click anywhere in the data and press **Ctrl+T** to make a Table. Tick "My table has headers".
3. With the Table selected, type `Orders` in the Table Name box (top-left).
4. **View -> Freeze Panes -> Freeze Top Row** so headers stay put as you scroll.

**You've got it when:** your data has filter arrows on every header and is named `Orders`.

## Try it 2 - Turn rows into money

**Why it matters:** raw orders do not tell you revenue. One formula does, for all 2,000 rows at once.

**Do this now:**
1. In the first empty column, type the header `revenue`.
2. In the first data cell type `=[@quantity]*[@unit_price]` and press Enter. Excel fills the whole column.
3. Add another column `net_revenue` with `=[@revenue]*(1-[@discount_pct]/100)`.
4. Highlight both columns and set the number format to currency, or custom `₦#,##0`.

**You've got it when:** every order shows a revenue and a net revenue in naira.

*Quick win: your spreadsheet just calculated 2,000 orders in under a second. That is the whole appeal of this job.*

## Try it 3 - Answer questions fast

**Why it matters:** managers ask questions like "how big was our best order?" You should be able to answer in seconds.

**Do this now, on a blank cell for each:**
1. Total orders: `=COUNTA(Orders[order_id])`
2. Total net revenue: `=SUM(Orders[net_revenue])`
3. Average order: `=AVERAGE(Orders[net_revenue])`
4. Biggest and smallest: `=MAX(Orders[net_revenue])` and `=MIN(Orders[net_revenue])`
5. Use the filter arrows: show only `status = Completed` and `city = Yenagoa`. How many rows remain?
6. Sort by `net_revenue`, largest first. Which order is on top?

**You've got it when:** you can read out total revenue and the single biggest order without scrolling.

## Try it 4 - Lock a reference

**Why it matters:** this one idea trips up every beginner. Get it now and formulas stop "breaking" when you copy them.

**Do this now:**
1. Put a discount rate in cell `K1`, for example `0.05`.
2. In a helper column type `=Orders[@revenue]*K1`, copy it down, and watch it go wrong.
3. Now use `$K$1` instead: `=Orders[@revenue]*$K$1`. Copy it down again.

**You've got it when:** you can explain why `$K$1` stays fixed while `K1` slides. That is the difference between absolute and relative references.

## Know your words (quick reference)

You will hear these all course. Learn them by using them, not memorising them.

| Term | Means | Example |
|---|---|---|
| Row (record) | one item or event | one order |
| Column (field) | one attribute | `order_date` |
| Header | the column names | the first row |
| Data type | number, text, date, or true/false | ₦18,000 is a number; "Yenagoa" is text |

**Tidy data rule:** one header row, one record per row, one kind of value per column, no merged cells, no totals mixed into the data, and consistent spelling (`Port Harcourt`, never `PH` or `port harcourt`).

## This week's build: your first mini sales summary

Make `week1_orders.xlsx` a business owner could glance at and understand:
1. The `Orders` Table with working `revenue` and `net_revenue` columns.
2. A second sheet called **Summary** showing, each with a formula: total orders, total net revenue, average order, biggest order, smallest order.
3. A one-line insight in plain English, for example: "Our average order is ₦X, and our biggest single order was ₦Y in [city]."

*Make it shareable: this is the first thing that goes in your portfolio folder.*

### Grading guide

| Criteria | Weight |
|---|---|
| Formulas work and numbers are correct | 40% |
| Tidy Table and clean formatting | 30% |
| Clear one-line insight in plain words | 20% |
| Setup done (Excel, GitHub, Google ready) | 10% |

### Definition of done

- [ ] CSV opened with UTF-8 and saved as `.xlsx`
- [ ] Data is a named Table with `revenue` and `net_revenue`
- [ ] Summary sheet has five numbers, each from a formula
- [ ] One plain-English insight written
- [ ] Setup checklist complete

## Extra quick wins (optional)
- Which city has the most orders? Filter and count.
- Add a `big_order` column that shows "Yes" when net revenue is over ₦100,000: `=IF([@net_revenue]>100000,"Yes","No")`.
- Learn these shortcuts by using them: `Ctrl+Arrow` (jump to the edge), `Ctrl+Shift+Arrow` (select to the edge), `F4` (lock a reference), `Alt+=` (AutoSum).

## Mentoring Session Plan (90 min, In-Person) {advanced}
| Time | Activity |
|---|---|
| 0-15 min | Welcome, program rules, sign the training agreement, set the weekly schedule |
| 15-30 min | Quick round: which analyst jobs interest you, and why |
| 30-55 min | Install check and open the CSV together; everyone builds the `revenue` column |
| 55-80 min | Live practice: each student answers one business question aloud with a formula |
| 80-90 min | Explain the build, agree the due date |

## Facilitator Notes

The win this week is momentum: a beginner who sees 2,000 rows calculate instantly is hooked. Spend the least time on theory and the most on hands-on. The six-step analysis process (Ask, Prepare, Process, Analyze, Share, Act) is worth one minute of framing, no more; students absorb it as they work. Expect the absolute vs relative reference idea (Try it 4) to be the real hurdle; have the deliberately-broken `K1` example ready so they see it fail before they see it fixed. Where analysts work (banks, telecoms, oil and gas, NGOs, e-commerce, remote) is a good motivator to mention while installs run.

## Self-Check Questions
1. What is the difference between a row and a column?
2. Why do we convert data into a Table before working on it?
3. When would you use `$A$1` instead of `A1`?
4. In one sentence, what does a data analyst do?
