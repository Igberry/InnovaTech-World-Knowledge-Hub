---
title: "Power BI II - DAX & Dashboards (Portfolio Project 2)"
course: "data-analysis"
order: 11
week: 11
phase: "Business Intelligence"
summary: "Write DAX measures and build a polished, interactive executive dashboard - the portfolio piece that makes recruiters stop scrolling."
estimatedHours: 10
tools: ["Power BI", "DAX"]
---
**Goal:** Write DAX measures that react to filters, then build a clean, interactive executive dashboard on the NaijaMart data. This is Portfolio Project 2, the showpiece you put at the top of your GitHub and LinkedIn.

## What you'll be able to do
- Tell a measure from a calculated column, and know when to use each
- Write core DAX: `SUM`, `CALCULATE`, `DIVIDE`, `DISTINCTCOUNT`, and time intelligence
- Choose the right visuals and design a clean dashboard
- Add slicers, tooltips, drill-through, and bookmarks
- Export and share the report

## Before you start (about 10 minutes)
- Open your `week10_model.pbix` (clean data, relationships, Calendar table).
- Warm-up: right-click a table -> **New measure** and type `Total Orders = COUNTROWS(orders)`. Drop it on a Card visual.
- Optional: watch five minutes of *"DAX tutorial for beginners CALCULATE explained"* (Guy in a Cube or Curbal).

## Try it 1 - Build the core measures

**Why it matters:** measures recalculate live as the user clicks slicers. This is what makes a dashboard feel alive.

**Do this now, each as a New measure:**
```DAX
Total Revenue = SUMX(orders, orders[quantity] * orders[unit_price] * (1 - orders[discount_pct] / 100))
Total Orders  = COUNTROWS(orders)
Unique Customers = DISTINCTCOUNT(orders[customer_id])
Avg Order Value = DIVIDE([Total Revenue], [Total Orders])
```

**You've got it when:** four cards show revenue, orders, unique customers, and average order value. (`DIVIDE` avoids divide-by-zero errors.)

## Try it 2 - Master CALCULATE

**Why it matters:** `CALCULATE` is the most important function in DAX. It changes the filters a measure runs under.

**Do this now:**
```DAX
Completed Revenue = CALCULATE([Total Revenue], orders[status] = "Completed")
Returned Orders   = CALCULATE([Total Orders], orders[status] = "Returned")
Return Rate       = DIVIDE([Returned Orders], [Total Orders])
Revenue % of Total = DIVIDE([Total Revenue], CALCULATE([Total Revenue], ALL(orders[city])))
```

**You've got it when:** you can show a return rate and each city's share of total revenue.

## Try it 3 - Add time intelligence

**Why it matters:** "how did this month compare to last?" is the question managers ask most.

**Do this now (needs the Calendar table from Week 10):**
```DAX
Revenue YTD = TOTALYTD([Total Revenue], 'Calendar'[Date])
Revenue Last Month = CALCULATE([Total Revenue], DATEADD('Calendar'[Date], -1, MONTH))
MoM Growth % = DIVIDE([Total Revenue] - [Revenue Last Month], [Revenue Last Month])
```

**You've got it when:** a card or table shows month-on-month growth. (The data is only 2025, so use `DATEADD(..., -1, MONTH)`; year-on-year needs a second year of data.)

## Try it 4 - Design the dashboard

**Why it matters:** a tidy, focused page is the difference between "nice chart" and "I would hire this person".

**Do this now:**
1. Build an **Executive Summary** page. Put KPI cards (Revenue, Orders, AOV, Return Rate) across the top-left - the most important spot.
2. Add a monthly trend line, revenue by city (bar), and top 5 products.
3. Add slicers for city, category, and month.
4. Keep it to 5 to 8 visuals, one main colour plus the brand navy highlight, clear titles, ₦ number formats, aligned on the grid.
5. Click through every slicer combination to be sure nothing breaks.

**You've got it when:** one clean page answers a manager's main questions and every slicer works.

## Try it 5 - Add interactivity and share

**Why it matters:** interactivity is what makes a Power BI report better than a static Excel chart, and you need to get it out of the app.

**Do this now:**
1. Click a bar and watch other visuals cross-filter. Control this with **Format -> Edit interactions**.
2. Add a drill-through page for a single city (right-click a city -> Drill through).
3. Export: **File -> Export -> PDF** for your portfolio, and take two screenshots for GitHub and LinkedIn.

**You've got it when:** you have a PDF export and screenshots, and drill-through jumps to one city's detail.

## This week's build: Portfolio Project 2 - executive dashboard

Submit:
1. `naijamart_dashboard.pbix` with at least 2 pages and 8 measures.
2. A PDF export and 2 screenshots.
3. A one-page "How to read this dashboard" note: the business questions, what each page shows, and 3 insights with recommendations.
4. Uploaded to GitHub with a README.

*A 2-minute screen-recording walkthrough is an optional but very strong addition - it is the next best thing to being in the interview room.*

### Grading guide

| Criteria | Weight |
|---|---|
| Measure correctness | 30% |
| Design and clarity | 30% |
| Interactivity | 15% |
| Insights note | 15% |
| Reconciliation with other tools | 10% |

### Definition of done

- [ ] 8+ measures including CALCULATE and a time-intelligence measure
- [ ] Executive Summary page with cards, charts, and working slicers
- [ ] A drill-through page for one city
- [ ] PDF, 2 screenshots, and a "How to read this" note
- [ ] Total Revenue matches your Excel, SQL, and pandas totals

## Extra quick wins (optional)
- Add conditional formatting (red/green) on the return rate.
- Put all measures in a dedicated "_Measures" table to keep the model tidy.

## Mentoring Session Plan (90 min)
| Time | Activity |
|---|---|
| 0-10 min | Review Week 10 models and relationships |
| 10-35 min | DAX walkthrough: build measures live, explain `CALCULATE` with a paper example |
| 35-60 min | Dashboard build-along: layout, cards, slicers |
| 60-80 min | Design critique: each student reviews another's dashboard against the design points |
| 80-90 min | Build brief; introduce the Week 12 capstone |

## Facilitator Notes

`CALCULATE` is the conceptual peak of the course; explain it with a paper example (a measure under different filter contexts) before writing any DAX. Stress measures vs calculated columns: measures react to slicers and belong on KPIs; columns are for labels. Warn early that `SAMEPERIODLASTYEAR` returns blank here because the data is one year, so month-on-month via `DATEADD` is the right tool. The peer design critique is valuable - give them the design points as a checklist so feedback is concrete. Keep reconciliation alive: the dashboard total must equal the Excel, SQL, and pandas totals, or something is wrong in the model.

## Self-Check Questions
1. Why is `DIVIDE` preferred over `/`?
2. What does `CALCULATE` do?
3. When should you use a measure, and when a calculated column?
