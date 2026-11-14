---
title: "Statistics for Analysts"
course: "data-analysis"
order: 4
week: 4
phase: "Foundations"
summary: "Use statistics the way analysts really do - to describe data, catch outliers, and avoid embarrassing wrong conclusions. All hands-on in Excel, no heavy maths."
estimatedHours: 10
tools: ["Excel"]
---
**Goal:** Learn just enough statistics to describe any dataset honestly, spot the odd values, and avoid the classic traps that make analysts look foolish. You do it all in Excel on the NaijaMart orders, not on a whiteboard.

## What you'll be able to do
- Calculate and read mean, median, mode, spread, and standard deviation
- Find outliers with the IQR rule
- Read distributions and correlation (and why correlation is not causation)
- Grasp sampling and A/B tests in plain language
- Work out the business metrics every analyst is expected to know

## Before you start (about 10 minutes)
- Open `orders_clean.csv` in Excel as a Table with a `net_revenue` column.
- Warm-up: in two cells compute `=AVERAGE(Orders[net_revenue])` and `=MEDIAN(Orders[net_revenue])`. Are they far apart? Keep that question in mind.
- Optional: search YouTube for *"StatQuest Statistics Fundamentals"* and watch the mean/median clip.

## Try it 1 - Describe the typical order

**Why it matters:** "what does a normal order look like?" is the first question of any analysis. Mean and median answer it, and the gap between them is a clue.

**Do this now:**
1. `=AVERAGE(range)` - the mean.
2. `=MEDIAN(range)` - the middle value, better when a few huge orders pull the average up.
3. `=MODE.SNGL(range)` - the most common value.
4. Compare mean and median. A big gap means the data is skewed by large orders.

**You've got it when:** you can say which of mean or median better describes a typical NaijaMart order, and why.

*Try it: five salaries (₦k) of 150, 160, 170, 180, 5000 give a mean of 1,132 but a median of 170. The median tells the truth.*

## Try it 2 - Measure the spread

**Why it matters:** two cities can have the same average order but wildly different consistency. Spread tells you that.

**Do this now:**
1. Range: `=MAX(range)-MIN(range)`.
2. Standard deviation: `=STDEV.S(range)` - the typical distance from the mean, in naira.
3. Quartiles: `=QUARTILE.INC(range,1)` and `=QUARTILE.INC(range,3)`, then IQR = Q3 - Q1.
4. A 90th percentile: `=PERCENTILE.INC(range,0.9)` ("90% of orders are below this").

**You've got it when:** you can read your standard deviation as "most orders fall within about this much of the average".

## Try it 3 - Hunt the outliers

**Why it matters:** one giant order could be a loyal bulk buyer or a typing error. You investigate before you delete.

**Do this now:**
1. Lower fence: `Q1 - 1.5*IQR`. Upper fence: `Q3 + 1.5*IQR`.
2. Count orders above the upper fence with `COUNTIFS`.
3. Filter to those orders. Which products are they? Do they look real or wrong?

**You've got it when:** you have a list of potential outliers and an opinion on whether to keep each one.

## Try it 4 - See the shape and the links

**Why it matters:** a histogram shows the shape of your data; a scatter shows whether two things move together.

**Do this now:**
1. Select `net_revenue` -> **Insert -> Charts -> Histogram**. Is it bell-shaped or right-skewed (a long tail of big orders)?
2. Correlation between quantity and revenue: `=CORREL(Orders[quantity],Orders[net_revenue])`. Near +1 means they rise together.
3. Plot a scatter of the two and add a trendline (right-click points -> Add Trendline -> show R squared).

**You've got it when:** you can describe the shape of order values in one sentence and read the correlation number.

> Correlation is not causation. Ice cream sales and drowning both rise in summer, but one does not cause the other. Always ask: is there a hidden third factor?

## Try it 5 - The metrics every analyst knows

**Why it matters:** these turn up in every interview and every report.

**Do this now, compute each on the data:**
1. AOV (average order value) = revenue / orders.
2. Return rate = returned orders / total orders.
3. Month-on-month growth: `=(C3-C2)/C2`, formatted as %.
4. Retention = returning customers / total customers.

**You've got it when:** you can define AOV, return rate, and growth rate without looking them up.

## This week's build: a one-page stats read-out

Submit `week4_statistics_report.xlsx` (or a Word/PDF) that reads like a real analyst briefing:
1. A **Summary Statistics** sheet (count, mean, median, mode, std dev, min, max, quartiles) for `net_revenue` and `quantity`.
2. A **histogram** and a **scatter plot**, each with a title and a one-line interpretation.
3. An **Outlier analysis**: the fences, the count, and your decision on whether to remove them and why.
4. A **one-page summary**: what does a typical order look like, what is unusual, and what should the business watch?

*Settle a real debate: does a friend's claim that "cash buyers spend more than card buyers" hold up? Check it with `AVERAGEIFS` and say what else you would need to know before concluding.*

### Grading guide

| Criteria | Weight |
|---|---|
| Formulas correct | 35% |
| Interpretations correct | 35% |
| Clarity of writing | 20% |
| Visuals (titled, readable) | 10% |

### Definition of done

- [ ] Summary statistics computed for both columns
- [ ] Histogram and scatter, each with a one-line reading
- [ ] Outlier fences, count, and a justified keep/remove decision
- [ ] One-page plain-English summary written

## Extra quick wins (optional)
- Compute AOV by month and the month-on-month growth beside it.
- Spot one misleading statistic in a news headline or advert and explain the trick.

## Mentoring Session Plan (90 min)
| Time | Activity |
|---|---|
| 0-10 min | Dashboard show-and-tell: each student presents for 2 minutes |
| 10-40 min | Whiteboard: mean vs median with the salary example; sketch a skewed shape |
| 40-70 min | Live: compute stats in Excel, then interpret each number aloud |
| 70-85 min | Discussion: spot misleading statistics in the news or social media |
| 85-90 min | Build brief |

## Facilitator Notes

Keep this week concrete and fear-free: every idea is demonstrated on the orders file, never derived. The mean vs median salary example is the fastest way to make skew click. The two ideas worth labouring are "investigate outliers before deleting" and "correlation is not causation" - both are judgement habits, not formulas. The ~68% within 1 SD and ~95% within 2 SD rule of thumb is useful colour for roughly bell-shaped data; do not let it turn into a probability lecture. For the A/B test and p-value ideas, plain language is enough: a small p-value means the result is unlikely to be pure chance, and small samples prove little.

## Self-Check Questions
1. When is the median a better summary than the mean?
2. What does a standard deviation of ₦30,000 tell you?
3. Why isn't a strong correlation proof that one thing causes another?
