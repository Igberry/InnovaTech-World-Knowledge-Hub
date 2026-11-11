---
title: "Excel - Analysis, Pivot Tables & Dashboards"
course: "data-analysis"
order: 3
week: 3
phase: "Foundations"
summary: "Answer business questions quickly and present them in a clean Excel dashboard."
estimatedHours: 10
tools: ["Excel"]
downloads:
  - label: "Orders (clean) CSV"
    href: "/downloads/data-analysis/orders_clean.csv"
  - label: "Customers CSV"
    href: "/downloads/data-analysis/customers.csv"
  - label: "Products CSV"
    href: "/downloads/data-analysis/products.csv"
---
**Goal:** Answer business questions quickly and present them in a clean Excel dashboard.

## Learning Objectives
- Use `SUMIFS`, `COUNTIFS`, `AVERAGEIFS`
- Look up data with `XLOOKUP` / `VLOOKUP`
- Build PivotTables, PivotCharts and Slicers
- Use conditional formatting
- Design a one-page dashboard

## Pre-Session Videos (about 2.5 hours)
- Search YouTube: **"Leila Gharani Excel PivotTable tutorial beginners"**
- Search YouTube: **"Kevin Stratvert Excel XLOOKUP"**
- Search YouTube: **"Excel dashboard tutorial step by step"** (Leila Gharani or Kevin Stratvert)

> Use `orders_clean.csv`, `customers.csv`, and `products.csv` this week.

---

## Lesson 1: Conditional Aggregation
Assume the data is a Table named `Orders` with a `net_revenue` column from Week 1.

```
=SUMIFS(Orders[net_revenue], Orders[city], "Yenagoa")
=SUMIFS(Orders[net_revenue], Orders[city], "Lagos", Orders[status], "Completed")
=COUNTIFS(Orders[status], "Returned")
=AVERAGEIFS(Orders[net_revenue], Orders[payment_method], "Card")
```
Put city names in cells and reference them so the formula copies down:
```
=SUMIFS(Orders[net_revenue], Orders[city], $A2)
```
**Date criteria:**
```
=SUMIFS(Orders[net_revenue], Orders[order_date], ">="&DATE(2025,3,1), Orders[order_date], "<"&DATE(2025,4,1))
```

---

## Lesson 2: Lookups
Orders store `product_id`, not the name. A lookup brings in details from another table.

**XLOOKUP** (Microsoft 365 / Excel 2021+):
```
=XLOOKUP([@product_id], Products[product_id], Products[product_name], "Not found")
```
**VLOOKUP** (works in all versions):
```
=VLOOKUP(D2, Products!A:D, 2, FALSE)
```
`FALSE` means exact match. Always use it.

**INDEX/MATCH** (flexible, older but common in interviews):
```
=INDEX(Products[category], MATCH([@product_id], Products[product_id], 0))
```
Add `product_name` and `category` to Orders using one of these methods.

---

## Lesson 3: PivotTables (The Analyst's Superpower)
**Insert → PivotTable → From Table/Range → New Worksheet.**

| Area | Purpose | Example |
|---|---|---|
| **Rows** | Groups down the side | `city` |
| **Columns** | Groups across the top | `status` |
| **Values** | What to calculate | Sum of `net_revenue` |
| **Filters** | Narrow the data | `category` |

### Questions to answer with pivots
1. Total net revenue by city
2. Net revenue by month (right-click a date → **Group → Months**; in newer Excel it groups automatically)
3. Top 5 products by revenue (Value Filters → Top 10 → set to 5)
4. Orders by payment method (Count of `order_id`, shown as **% of Grand Total**)
5. Revenue by category × city

### Pivot skills
- **Value Field Settings:** change Sum to Count/Average, and number format to ₦
- **Show Values As:** % of column total, running total
- **Slicers:** Insert → Slicer → pick `city` or `status` (click buttons to filter)
- **Timeline:** Insert → Timeline for dates
- **PivotChart:** select the pivot, then Insert → PivotChart
- **Refresh:** after changing source data, right-click → Refresh

---

## Lesson 4: Charts
| Question | Chart |
|---|---|
| Trend over time | Line |
| Compare categories | Bar / column (sorted) |
| Share of total (few parts only) | Pie / doughnut (≤5 slices) |
| Relationship between two numbers | Scatter |

**Rules:** one message per chart · clear title that states the insight ("Sales peak in December") · remove clutter (gridlines, 3D) · sort bars · label axes with units (₦).

---

## Lesson 5: Conditional Formatting
**Home → Conditional Formatting:** data bars, colour scales, icon sets, "Top 10 items", and custom rules (e.g., highlight returned orders).

---

## Lesson 6: Building the Dashboard
Create a new sheet called **Dashboard**. Layout plan:

```
┌────────────────────────────────────────────────┐
│  NAIJAMART SALES DASHBOARD 2025   [Slicers]    │
├──────────┬──────────┬──────────┬───────────────┤
│ Total    │ Orders   │ Avg      │ Return        │
│ Revenue  │          │ Order    │ Rate          │
├──────────┴──────────┼──────────┴───────────────┤
│ Monthly revenue     │ Revenue by city          │
│ (line)              │ (bar)                    │
├─────────────────────┼──────────────────────────┤
│ Top 5 products      │ Payment method share     │
└─────────────────────┴──────────────────────────┘
```
**Steps:**
1. Build each pivot table on a separate **Calc** sheet.
2. Create the charts and **cut/paste** them onto the Dashboard sheet.
3. Make KPI cards: cells with large bold numbers linked to formulas (`=SUMIFS(...)`).
4. Connect **one set of slicers to all pivots**: right-click slicer → **Report Connections**.
5. Hide gridlines (View), set a consistent colour scheme (navy/gold = InnovaTech), and add a title.
6. Test every slicer and make sure nothing breaks.

---

## Practice Exercises
1. Which month had the highest net revenue? Which had the lowest?
2. Which city has the highest **average** order value, and which has the highest **total** revenue? Are they the same? Why?
3. What is the return rate (Returned ÷ all orders) per category?
4. Which payment method is most used in each city?
5. What share of revenue comes from the top 3 products?

---

## Weekly Assignment (Due Before Week 4)
**Submit `week3_dashboard.xlsx` containing:**
1. A **Dashboard** sheet with at least 4 KPI cards, 4 charts, and 2 slicers
2. A **Calc** sheet holding the pivots
3. A **Insights** box on the dashboard: **three business findings in plain English** (e.g., "December revenue is 2× January. Stock up before Q4.")
4. A screenshot of the dashboard saved as an image (for the portfolio)

**Grading guide:** correctness of numbers (35%), dashboard design and readability (30%), insights quality (25%), slicers working (10%).

---

## Mentoring Session Plan (90 min)
| Time | Activity |
|---|---|
| 0–10 min | Review Week 2 cleaning logs, highlight one good decision |
| 10–35 min | Live: build a pivot from scratch (facilitator), then each student builds a different one |
| 35–70 min | Dashboard build-along (layout, KPI cards, slicer connections) |
| 70–85 min | Student presentations: "walk me through your dashboard in 2 minutes" |
| 85–90 min | Explain the assignment |

## Self-Check Questions
1. When would you use `SUMIFS` instead of a PivotTable?
2. Why must you use `FALSE` in `VLOOKUP`?
3. What does a slicer do, and how do you connect it to multiple pivots?
