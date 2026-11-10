---
title: "Power BI II — DAX & Dashboards (Portfolio Project 2)"
course: "data-analysis"
order: 11
week: 11
phase: "Business Intelligence"
summary: "Write DAX measures and build a professional, interactive executive dashboard."
estimatedHours: 10
tools: ["Power BI", "DAX"]
---
**Goal:** Write DAX measures and build a professional, interactive executive dashboard.

## Learning Objectives
- Explain the difference between measures and calculated columns
- Write core DAX: `SUM`, `CALCULATE`, `DIVIDE`, `DISTINCTCOUNT`, time intelligence
- Choose the right visuals and design a clean dashboard
- Add slicers, tooltips, drill-through and bookmarks
- Export and share the report

## Pre-Session Videos (about 3 hours)
- Search YouTube: **"Alex The Analyst Power BI dashboard project"**
- Search YouTube: **"DAX tutorial for beginners CALCULATE explained"** (Guy in a Cube, Curbal, or SQLBI)
- Search YouTube: **"Power BI dashboard design best practices"**
- Reference: **learn.microsoft.com → DAX overview**; **dax.guide** (function reference)

---

## Lesson 1: Measures vs Calculated Columns
| | Calculated column | **Measure** |
|---|---|---|
| Calculated | Row by row, stored in the data | On the fly, based on the current filters |
| Best for | Labels/categories | Totals, ratios, KPIs |
| Reacts to slicers | No | **Yes** |

**Create:** Right-click a table → **New measure**. Put measures in a dedicated table (a "_Measures" table) for tidiness.

## Lesson 2: Core DAX
```DAX
Total Revenue =
SUMX(orders, orders[quantity] * orders[unit_price] * (1 - orders[discount_pct] / 100))

Total Orders = COUNTROWS(orders)

Unique Customers = DISTINCTCOUNT(orders[customer_id])

Avg Order Value = DIVIDE([Total Revenue], [Total Orders])      -- safe division, no #DIV/0!
```
> `SUMX` evaluates row by row, then adds. Use it when the value needs a calculation per row. If you created a `Net Revenue` column in Week 10, you can instead write `SUM(orders[Net Revenue])`.

### CALCULATE: the most important DAX function
`CALCULATE(<measure>, <filter>)` changes the filters under which a measure is evaluated.
```DAX
Completed Revenue =
CALCULATE([Total Revenue], orders[status] = "Completed")

Returned Orders =
CALCULATE([Total Orders], orders[status] = "Returned")

Return Rate = DIVIDE([Returned Orders], [Total Orders])

Lagos Revenue =
CALCULATE([Total Revenue], orders[city] = "Lagos")
```
**Revenue share of all cities (ignoring the city filter):**
```DAX
Revenue % of Total =
DIVIDE([Total Revenue], CALCULATE([Total Revenue], ALL(orders[city])))
```

### Time intelligence (needs the Calendar table from Week 10)
```DAX
Revenue YTD = TOTALYTD([Total Revenue], 'Calendar'[Date])

Revenue Last Month =
CALCULATE([Total Revenue], DATEADD('Calendar'[Date], -1, MONTH))

MoM Growth % =
DIVIDE([Total Revenue] - [Revenue Last Month], [Revenue Last Month])
```
> The data covers only 2025, so `SAMEPERIODLASTYEAR` returns blanks. Use `DATEADD(..., -1, MONTH)` for month-on-month instead, and mention in your notes that year-on-year needs a second year of data.

---

## Lesson 3: Choosing Visuals
| Question | Visual |
|---|---|
| One headline number | **Card** / KPI |
| Trend over time | Line / area chart |
| Compare categories | Clustered bar/column |
| Parts of a whole (≤5) | Donut / treemap |
| Detail | Table / matrix |
| Geography | Map (not needed here) |
| Filtering | **Slicer** |

## Lesson 4: Dashboard Design Principles
1. **Start with the audience and questions.** What does the manager need to decide?
2. **Top-left is most important.** Place KPI cards in a top row.
3. **Less is more.** Aim for 5 to 8 visuals per page. Remove everything that doesn't answer a question.
4. **Consistent colours.** One main colour, one highlight colour (the navy/gold brand works).
5. **Clear titles** and number formats (₦ with thousands separators, consistent decimals).
6. **Align and space** visuals on a grid (View → Gridlines and Snap to grid).
7. **Slicers** (city, category, month) should be easy to find.
8. **Check for errors:** click through every slicer combination.

### Suggested pages
| Page | Content |
|---|---|
| **1. Executive Summary** | KPI cards (Revenue, Orders, AOV, Return Rate); monthly trend; revenue by city; top 5 products; slicers |
| **2. Products & Customers** | Revenue by category; top customers table; segment breakdown |
| **3. Operations** (optional) | Payment method mix, returns/cancellations by city |

## Lesson 5: Interactivity
- **Cross-filtering:** click a bar to filter other visuals (**Format → Edit interactions** to control it)
- **Drill-down:** hierarchy (Category → Product) on a bar chart
- **Tooltips:** Hover details; custom tooltip pages are optional
- **Drill-through:** right-click → jump to a detail page for one city
- **Bookmarks and buttons:** reset all filters; toggle views
- **Conditional formatting:** red/green on return rate

## Lesson 6: Sharing (Know the Limits)
| Option | Notes |
|---|---|
| **Export to PDF** | File → Export → PDF. Best for portfolio attachments |
| **Screenshots** | Add to your GitHub README and LinkedIn |
| **Share the `.pbix`** | Upload to GitHub or Google Drive; the viewer needs Power BI Desktop |
| **Power BI Service** | Publishing may require a work/school account. Check what your account allows before relying on it |
| **Short screen recording** | A 2-minute walkthrough video is a strong portfolio asset |

---

## Practice Exercises
1. Create these measures: Total Revenue, Completed Revenue, Total Orders, Avg Order Value, Return Rate, Unique Customers.
2. Add a Month-on-Month Growth % measure and show it in a card or table.
3. Build the Executive Summary page with 4 cards, 3 charts, and 2 slicers.
4. Add a drill-through page for a single city.
5. Verify that Total Revenue matches your Excel, SQL, and pandas totals.

---

## Weekly Assignment: Portfolio Project 2 (Due Before Week 12)
Submit:
1. **`naijamart_dashboard.pbix`** with at least 2 pages and 8 measures
2. A **PDF export** and **2 screenshots**
3. A **one-page "How to read this dashboard"** note: the business questions, what each page shows, and 3 insights with recommendations
4. Upload to GitHub with a README

**Grading guide:** measure correctness (30%), design and clarity (30%), interactivity (15%), insights note (15%), reconciliation with other tools (10%).

---

## Mentoring Session Plan (90 min)
| Time | Activity |
|---|---|
| 0–10 min | Review Week 10 models and relationships |
| 10–35 | DAX walkthrough: build measures live, then explain `CALCULATE` with a paper example |
| 35–60 | Dashboard build-along: layout, cards, slicers |
| 60–80 | **Design critique:** each student reviews the other student's dashboard using the 8 principles |
| 80–90 | Assignment brief; introduce the Week 12 capstone |

## Self-Check Questions
1. Why is `DIVIDE` preferred over `/`?
2. What does `CALCULATE` do?
3. When should you use a measure and when a calculated column?
