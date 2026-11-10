---
title: "Statistics for Analysts"
course: "data-analysis"
order: 4
week: 4
phase: "Foundations"
summary: "Understand the numbers behind the data so you can describe it, spot problems, and avoid wrong conclusions."
estimatedHours: 10
tools: ["Excel"]
---
**Goal:** Understand the numbers behind the data so you can describe it, spot problems, and avoid wrong conclusions.

## Learning Objectives
- Calculate and interpret mean, median, mode, range, variance, and standard deviation
- Read percentiles and quartiles; detect outliers
- Understand distributions and correlation (and why correlation is not causation)
- Understand sampling and the idea behind A/B tests
- Calculate common business metrics

## Pre-Session Videos (about 2.5 hours)
- Search YouTube: **"StatQuest Statistics Fundamentals"** (watch: mean/variance/SD, histograms, normal distribution)
- Search Khan Academy: **"Statistics and probability: summarizing quantitative data"**
- Search YouTube: **"Excel descriptive statistics Data Analysis ToolPak"**

---

## Lesson 1: Describing Data

### Measures of centre
| Measure | Excel | When to use |
|---|---|---|
| **Mean** (average) | `=AVERAGE(range)` | Roughly symmetric data |
| **Median** (middle value) | `=MEDIAN(range)` | Skewed data or outliers (salaries, order values) |
| **Mode** (most frequent) | `=MODE.SNGL(range)` | Categories, most common size |

**Example:** Five salaries (₦k): 150, 160, 170, 180, 5,000. Mean = 1,132k, median = 170k. The median describes reality better. Always compare mean and median: a big gap means skew or outliers.

### Measures of spread
| Measure | Excel | Meaning |
|---|---|---|
| Range | `=MAX()-MIN()` | Distance from lowest to highest |
| Variance | `=VAR.S(range)` | Average squared distance from the mean |
| **Standard deviation** | `=STDEV.S(range)` | Typical distance from the mean (same units as the data) |
| Quartiles | `=QUARTILE.INC(range, 1)` | 25% / 50% / 75% points |
| Percentile | `=PERCENTILE.INC(range, 0.9)` | "90% of orders are below this value" |
| IQR | `Q3 − Q1` | Spread of the middle 50% |

**Rule of thumb (roughly bell-shaped data):** ~68% of values fall within 1 SD of the mean, ~95% within 2 SD.

### Outliers (the IQR rule)
```
Lower fence = Q1 − 1.5 × IQR
Upper fence = Q3 + 1.5 × IQR
```
Values outside the fences are *potential* outliers. **Investigate before removing:** an unusually big order could be a genuine bulk buyer or a typing error.

---

## Lesson 2: Distributions
A **histogram** shows how values are spread.
- **Normal (bell-shaped):** most values near the middle. (Heights)
- **Right-skewed:** a long tail on the high end. (Incomes, order values: most small, few huge)
- **Bimodal:** two peaks, suggesting two different groups mixed together.

**In Excel:** select the `net_revenue` column → **Insert → Charts → Histogram**. Experiment with bin width.

---

## Lesson 3: Relationships
### Correlation
```
=CORREL(Orders[quantity], Orders[net_revenue])
```
- Ranges from **−1 to +1**. Near +1: move together. Near −1: move opposite. Near 0: no linear relationship.
- Visualise with a **scatter plot**.

> **Correlation ≠ causation.** Ice cream sales and drowning both rise in summer, but ice cream doesn't cause drowning. Always ask: *Is there a third factor? Could the relationship be coincidence?*

### Simple trend (linear regression, intuition only)
In a scatter chart: right-click the points → **Add Trendline** → show equation and R². R² tells you how much of the variation the line explains (0 to 1).

---

## Lesson 4: Sampling & Testing Ideas (Intuition)
- **Population:** everyone you care about. **Sample:** the subset you actually measured.
- A good sample is **random** and **large enough**. A survey of only your WhatsApp contacts is *biased*.
- **A/B test idea:** show half of customers Offer A and half Offer B, then compare results. If the difference is bigger than chance would explain, it is "statistically significant".
- **p-value (plain language):** "If there were truly no difference, how likely is a result this extreme?" A small p-value (usually below 0.05) suggests the difference is probably real.
- Don't over-interpret small samples: 3 of 5 customers liking something proves nothing.

---

## Lesson 5: Business Metrics Every Analyst Knows
| Metric | Formula | Meaning |
|---|---|---|
| Revenue | Quantity × Price | Money in |
| **AOV** (average order value) | Revenue ÷ Orders | Typical basket size |
| Growth rate | (This period − Last period) ÷ Last period | % change |
| Return rate | Returned orders ÷ Total orders | Product/quality signal |
| Conversion rate | Buyers ÷ Visitors | Marketing effectiveness |
| **Customer retention** | Returning customers ÷ Total customers | Loyalty |
| Gross margin | (Revenue − Cost) ÷ Revenue | Profitability |

**Month-on-month growth in Excel:** `=(C3-C2)/C2`, formatted as %.

---

## Practice Exercises (Using `orders_clean.csv`)
1. For `net_revenue`: calculate mean, median, std dev, Q1, Q3, IQR, and the outlier fences.
2. How many orders are above the upper fence? Which products are they?
3. Create a histogram of `net_revenue`. Describe its shape in one sentence.
4. Calculate CORREL between `quantity` and `net_revenue`. Is it strong? Why?
5. Compute AOV by month and month-on-month growth.
6. A friend says "Cash buyers spend more than card buyers." Use AVERAGEIFS and MEDIAN (via a pivot or helper formulas) to check, then explain what additional information you would need before concluding.

---

## Weekly Assignment (Due Before Week 5)
**Submit `week4_statistics_report.xlsx` (or a Word/PDF if preferred) containing:**
1. A **Summary Statistics** sheet (count, mean, median, mode, std dev, min, max, quartiles) for `net_revenue` and `quantity`
2. A **histogram** and a **scatter plot**, each with a title and a one-sentence interpretation
3. An **Outlier analysis** (fences, count, and a note on whether you would remove them and why)
4. A **one-page written summary** ("What does the typical order look like? What is unusual? What should the business watch?")

**Grading guide:** formulas correct (35%), interpretations correct (35%), clarity of writing (20%), visuals (10%).

---

## Mentoring Session Plan (90 min)
| Time | Activity |
|---|---|
| 0–10 min | Review the dashboards: each student presents for 2 minutes |
| 10–40 min | Whiteboard session: mean vs median with salary examples; draw a skewed distribution |
| 40–70 min | Live: compute stats in Excel, then interpret aloud |
| 70–85 min | Discussion: spot misleading statistics in the news or social media |
| 85–90 min | Assignment brief |

## Self-Check Questions
1. When is the median better than the mean?
2. What does a standard deviation of ₦30,000 tell you?
3. Why isn't a strong correlation proof that one thing causes another?
