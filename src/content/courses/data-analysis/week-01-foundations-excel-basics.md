---
title: "Foundations, Setup & Excel Basics"
course: "data-analysis"
order: 1
week: 1
phase: "Foundations"
summary: "Understand what a data analyst does, get all tools ready, and complete a first analysis in Excel."
estimatedHours: 10
tools: ["Excel"]
downloads:
  - label: "Orders (clean) CSV"
    href: "/downloads/data-analysis/orders_clean.csv"
---
**Goal:** Understand what a data analyst does, get all tools ready, and complete a first analysis in Excel.

## Learning Objectives
By the end of this week the student can:
- Explain the data analysis process in their own words
- Describe rows, columns, records, fields, and data types
- Navigate Excel, enter and format data, and sort and filter it
- Use basic formulas and cell references (relative vs absolute)
- Open a CSV file correctly and save it as `.xlsx`

## Tools to Install This Week
Excel (desktop or web), GitHub account, Google account (for Colab later). See [Setup Guide](/courses/data-analysis/00-setup-guide/).

## Pre-Session Videos (about 2 hours)
- Search YouTube: **"Alex The Analyst What is a Data Analyst"** (career overview)
- Search YouTube: **"Kevin Stratvert Excel tutorial for beginners"** (watch the first 60 to 90 minutes)
- Optional: **"Google Data Analytics process Ask Prepare Process Analyze Share Act"**

---

## Lesson 1: What Does a Data Analyst Do?

A data analyst turns **raw data** into **answers that help people make decisions**. Example: *"Which products make us the most money, and in which city?"*

### The 6-step analysis process
| Step | Question | Example |
|---|---|---|
| 1. **Ask** | What problem are we solving? | "Why did sales drop in August?" |
| 2. **Prepare** | Where is the data? Is it reliable? | Export from the sales system |
| 3. **Process** | Clean it | Remove duplicates, fix dates |
| 4. **Analyze** | Find patterns | Compare months, products, cities |
| 5. **Share** | Present clearly | Charts, a dashboard, a short report |
| 6. **Act** | What should we do? | "Run a promotion in Port Harcourt" |

> Beginners spend all their time on step 4. Real analysts spend most of their time on steps 2 and 3, and get hired for step 5.

### Where analysts work
Banks, telecoms, oil and gas, NGOs, e-commerce, schools, hospitals, and remote companies worldwide. Common job titles: *Data Analyst, Business Analyst, Reporting Analyst, BI Analyst, Operations Analyst, Marketing Analyst.*

---

## Lesson 2: Understanding Data

| Term | Meaning | Example |
|---|---|---|
| **Table / Dataset** | A grid of data | The orders sheet |
| **Row (record)** | One item or event | One order |
| **Column (field)** | One attribute | `order_date` |
| **Header** | The column names (first row) | `order_id, city, ...` |

### Data types
| Type | Examples | Notes |
|---|---|---|
| Number | 5, 18000, 3.5 | Can be calculated |
| Text | "Yenagoa", "Transfer" | Cannot be added |
| Date | 2025-03-31 | Excel stores dates as numbers |
| Boolean | TRUE / FALSE | Yes/no |

### Good spreadsheet structure ("tidy data")
1. One header row, no blank rows, no merged cells
2. One column = one kind of information
3. One row = one record
4. No totals mixed into the data rows
5. Consistent values ("Port Harcourt", not "PH", "port harcourt", "P.Harcourt")

---

## Lesson 3: Excel Fundamentals

### Opening a CSV
**Data → From Text/CSV → choose file → File Origin: UTF-8 → Load.** Then **File → Save As → Excel Workbook (.xlsx)**.

### Essential skills
| Skill | How |
|---|---|
| Select a column | Click the column letter |
| Freeze header row | **View → Freeze Panes → Freeze Top Row** |
| Convert to a Table | Click in data, **Ctrl+T**. Gives filters, banding, and auto-expanding formulas |
| Sort | **Data → Sort** (or filter dropdown) |
| Filter | Filter arrows on the header |
| AutoFit column width | Double-click the column border |
| Format as currency | **Home → Number Format → Currency**, or custom format `₦#,##0` |

### Shortcuts to learn this week
`Ctrl+C / V / Z` · `Ctrl+Arrow` (jump to the edge of data) · `Ctrl+Shift+Arrow` (select to the edge) · `Ctrl+T` (table) · `F4` (lock a reference) · `Alt+=` (AutoSum)

### Basic formulas
Every formula starts with `=`.

```
=A2+B2                 add two cells
=SUM(E2:E2001)         add a range
=AVERAGE(E2:E2001)     average
=COUNT(E2:E2001)       count numbers
=COUNTA(H2:H2001)      count non-empty cells (text too)
=MIN(F2:F2001)  =MAX(F2:F2001)
```

### Creating a new column
In a Table, type in the first empty cell of a new column:
```
=[@quantity]*[@unit_price]
```
Name the column `revenue`. Excel fills the whole column.

### Relative vs absolute references (key concept)
| Reference | Behaviour when copied | Example |
|---|---|---|
| `A2` | Changes (relative) | Row 2 becomes row 3 |
| `$A$2` | Never changes (absolute) | Lock a tax rate cell |
| `$A2` / `A$2` | Mixed | Used in grids |

**Example:** put a discount rate in `K1` (e.g., 0.05). Use `=E2*$K$1` so every row uses the same cell.

---

## Practice Exercises (Using `orders_clean.csv`)
1. Open the CSV with the correct encoding, freeze the header row, and convert to a Table named `Orders`.
2. Add a `revenue` column = `quantity × unit_price`.
3. Add a `net_revenue` column = `revenue × (1 − discount_pct/100)`.
4. How many orders are in the dataset? (`COUNTA`)
5. What is the total net revenue? What is the average order net revenue?
6. Filter to `status = Completed` and `city = Yenagoa`. How many rows remain?
7. Sort by `net_revenue` largest to smallest. Which order is on top?

---

## Weekly Assignment (Due Before Week 2)
**Submit:**
1. **Setup checklist** (screenshot or tick-list): Excel working, GitHub account created, Google account ready.
2. **`week1_orders.xlsx`**: the Table with `revenue` and `net_revenue` columns, plus a second sheet called `Summary` showing: total orders, total net revenue, average net revenue, highest order, lowest order (each using a formula).
3. **Short written note (5 sentences):** "In my own words, what does a data analyst do, and which type of company would I like to work for?"

**Grading guide:** formulas work (40%), tidy structure and formatting (30%), written note (20%), setup done (10%).

---

## Mentoring Session Plan (90 min, In-Person)
| Time | Activity |
|---|---|
| 0–15 min | Welcome, program rules, sign the training agreement, set the weekly schedule |
| 15–35 min | Discussion: what do you want from this course? Which jobs interest you? |
| 35–70 min | **Install together:** Excel check, GitHub account, Google account. Open the CSV together. |
| 70–85 min | Live practice: create the `revenue` column, then each student explains what the formula does |
| 85–90 min | Explain the assignment, agree on the due date |

## Self-Check Questions
1. What is the difference between a row and a column?
2. Why do we convert data into a Table?
3. When would you use `$A$1` instead of `A1`?
4. Name the six steps of the analysis process.
