---
title: "Excel - Analysis, Pivot Tables & Dashboards"
course: "data-analysis"
order: 3
week: 3
phase: "Foundations"
summary: "Build a real one-page sales dashboard with pivot tables, charts and slicers - the kind you can screenshot and put straight in your portfolio."
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
**Goal:** By the end of the week you have a clickable, one-page NaijaMart dashboard: KPI cards, charts, and slicers that answer a manager's questions the moment they click. This is the first showpiece for your portfolio.

## What you'll be able to do
- Answer questions instantly with `SUMIFS`, `COUNTIFS`, `AVERAGEIFS`
- Pull in product names with `XLOOKUP` or `VLOOKUP`
- Build PivotTables, PivotCharts, and Slicers
- Design and build a clean one-page dashboard

## Before you start (about 10 minutes)
- Download the three CSVs from the panel: orders, customers, products.
- Make sure your `Orders` Table has a `net_revenue` column (from Week 1). If not, add it.
- Warm-up: search YouTube for *"Leila Gharani Excel PivotTable tutorial beginners"* and watch five minutes to see where a pivot lives.

## Try it 1 - Answer with one formula

**Why it matters:** before pivots, see how one `SUMIFS` answers a question that would take ages by hand.

**Do this now, each in a blank cell:**
1. Revenue in Yenagoa: `=SUMIFS(Orders[net_revenue],Orders[city],"Yenagoa")`.
2. Completed revenue in Lagos: `=SUMIFS(Orders[net_revenue],Orders[city],"Lagos",Orders[status],"Completed")`.
3. Returned orders: `=COUNTIFS(Orders[status],"Returned")`.
4. Put a city name in a cell and reference it so the formula copies: `=SUMIFS(Orders[net_revenue],Orders[city],$A2)`.

**You've got it when:** changing the city in `A2` instantly changes the revenue number.

## Try it 2 - Bring in the product names

**Why it matters:** orders store a `product_id`, not a name. A lookup joins the two so your report reads in plain English.

**Do this now, in a new column in `Orders`:**
1. Modern Excel: `=XLOOKUP([@product_id],Products[product_id],Products[product_name],"Not found")`.
2. Older Excel: `=VLOOKUP([@product_id],Products!A:D,2,FALSE)` (the `FALSE` forces an exact match - always use it).
3. Add `category` the same way.

**You've got it when:** every order shows a product name and category.

## Try it 3 - Unlock the pivot table

**Why it matters:** the PivotTable is the single biggest time-saver in Excel. One is worth fifty formulas.

**Do this now:**
1. Click in `Orders`, then **Insert -> PivotTable -> New Worksheet**.
2. Drag `city` to **Rows** and `net_revenue` to **Values**. Set it to Sum and format as ₦.
3. Answer these by rearranging fields: revenue by month (group the date), top 5 products (Value Filters -> Top 10 -> 5), payment method share (Count, shown as % of Grand Total), revenue by category and city.

**You've got it when:** you can answer a new question just by dragging fields, no typing.

## Try it 4 - Make charts that say something

**Why it matters:** a chart with a vague title is wallpaper. A chart with an insight title is analysis.

**Do this now:**
1. From a pivot, **Insert -> PivotChart**. Use a line for trend over time, a bar for comparing cities, a pie only for a few slices.
2. Give each chart a title that states the finding, for example "Sales peak in December".
3. Remove clutter: drop gridlines and 3D, sort the bars, label axes with ₦.

**You've got it when:** someone could read only your chart titles and understand the story.

## Try it 5 - Build the dashboard

**Why it matters:** this is the deliverable that gets you interviews.

**Do this now:**
1. Build each pivot on a **Calc** sheet, then cut and paste the charts onto a new **Dashboard** sheet.
2. Add KPI cards: big bold cells linked to formulas (Total Revenue, Orders, Avg Order, Return Rate).
3. **Insert -> Slicer** for `city` and `status`. Right-click a slicer -> **Report Connections** to control every pivot at once.
4. Hide gridlines (View), use the brand navy, add a title, then click every slicer to be sure nothing breaks.

Layout to aim for:
```
NAIJAMART SALES DASHBOARD 2025        [Slicers]
Total Revenue | Orders | Avg Order | Return Rate
Monthly revenue (line)  | Revenue by city (bar)
Top 5 products (bar)    | Payment method share (pie)
```

**You've got it when:** clicking one slicer updates every chart and card together.

## This week's build: the NaijaMart sales dashboard

Submit `week3_dashboard.xlsx` a manager could actually use:
1. A **Dashboard** sheet: at least 4 KPI cards, 4 charts, 2 connected slicers.
2. A **Calc** sheet holding the pivots.
3. An **Insights** box with three findings in plain English, for example "December revenue is twice January - stock up before Q4."
4. A screenshot of the dashboard saved as an image for your portfolio.

*This screenshot is portfolio piece number one. Put it in your GitHub repo.*

### Grading guide

| Criteria | Weight |
|---|---|
| Numbers are correct | 35% |
| Dashboard design and readability | 30% |
| Quality of the three insights | 25% |
| Slicers work and are connected | 10% |

### Definition of done

- [ ] Product name and category added by lookup
- [ ] Pivots built on a Calc sheet
- [ ] Dashboard has 4+ KPI cards, 4+ charts, 2 slicers
- [ ] Slicers connected to all pivots and tested
- [ ] Three plain-English insights written, dashboard screenshotted

## Extra quick wins (optional)
- Add conditional formatting: data bars on revenue, or a red highlight on returned orders (**Home -> Conditional Formatting**).
- Which city has the highest average order but not the highest total? A great insight line.

## Mentoring Session Plan (90 min)
| Time | Activity |
|---|---|
| 0-10 min | Review Week 2 cleaning logs, highlight one good decision |
| 10-35 min | Live: build a pivot from scratch, then each student builds a different one |
| 35-70 min | Dashboard build-along: layout, KPI cards, slicer connections |
| 70-85 min | Student presentations: "walk me through your dashboard in 2 minutes" |
| 85-90 min | Explain the build |

## Facilitator Notes

The dashboard is the motivator; let students feel the moment a single slicer drives the whole page. Build one pivot live from zero so they see fields dragged into place, then set them loose on a different question. The common stumbles are forgetting `FALSE` in `VLOOKUP`, and slicers that only filter one pivot (fix with Report Connections). Push insight titles over decorative ones - "Sales peak in December" teaches more than any lecture on chart types. Keep the 2-minute walkthrough at the end; presenting their own dashboard builds the exact skill interviews test.

## Self-Check Questions
1. When would you use `SUMIFS` instead of a PivotTable?
2. Why must you use `FALSE` in `VLOOKUP`?
3. What does a slicer do, and how do you connect it to several pivots?
