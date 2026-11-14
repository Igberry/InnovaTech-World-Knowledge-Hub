---
title: "SQL II - Joins, CTEs & Window Functions (Mid-Course Checkpoint)"
course: "data-analysis"
order: 6
week: 6
phase: "Databases"
summary: "Join tables, rank customers, and track growth month by month - the queries that separate a real analyst from a beginner - then prove it in the mid-course checkpoint."
estimatedHours: 10
tools: ["SQLite", "DB Browser for SQLite"]
downloads:
  - label: "Orders (clean) CSV"
    href: "/downloads/data-analysis/orders_clean.csv"
  - label: "Customers CSV"
    href: "/downloads/data-analysis/customers.csv"
  - label: "Products CSV"
    href: "/downloads/data-analysis/products.csv"
---
**Goal:** Combine tables and answer the harder questions a business really asks - top customers, revenue by category, month-on-month growth - then show what you can do in the mid-course checkpoint and put your first SQL project on GitHub.

## What you'll be able to do
- Combine tables with `INNER JOIN` and `LEFT JOIN`
- Write subqueries and CTEs (`WITH`)
- Use window functions: `ROW_NUMBER`, `RANK`, running totals, `LAG`
- Publish your work on GitHub

## Before you start (about 10 minutes)
- Open `naijamart.db` in DB Browser with your three tables.
- Make sure you have your `data-analysis-portfolio` repo from the [Setup Guide](/courses/data-analysis/00-setup-guide/).
- Warm-up: run one query from last week to confirm the data is still there.
- Optional: do **SQLBolt** JOIN lessons (6 to 12) or watch five minutes of *"Alex The Analyst SQL joins"*.

## Try it 1 - Join the tables

**Why it matters:** `orders` has a `customer_id`, not a name. A join brings the name in so your report reads like English.

**Do this now:**
```sql
SELECT o.order_id, c.customer_name, p.product_name, o.quantity
FROM orders o
INNER JOIN customers c ON o.customer_id = c.customer_id
INNER JOIN products  p ON o.product_id  = p.product_id;
```
Then find customers who never ordered, with a LEFT JOIN:
```sql
SELECT c.customer_id, c.customer_name, COUNT(o.order_id) AS orders
FROM customers c
LEFT JOIN orders o ON c.customer_id = o.customer_id
GROUP BY c.customer_id, c.customer_name
HAVING COUNT(o.order_id) = 0;
```

**You've got it when:** your orders show real names, and you can list customers with zero orders. Remember: INNER keeps only matches, LEFT keeps all left-table rows.

## Try it 2 - Answer a real question with a join

**Why it matters:** "which category earns most?" needs data from two tables at once.

**Do this now:**
```sql
SELECT p.category,
       ROUND(SUM(o.quantity * o.unit_price * (1 - o.discount_pct/100.0)), 0) AS net_revenue
FROM orders o
JOIN products p ON o.product_id = p.product_id
WHERE o.status = 'Completed'
GROUP BY p.category
ORDER BY net_revenue DESC;
```

**You've got it when:** you get one revenue figure per category, highest first.

## Try it 3 - Tidy complex queries with a CTE

**Why it matters:** a CTE (a named temporary result) makes a scary query readable. Analysts use them constantly.

**Do this now - top 10 customers by spend:**
```sql
WITH customer_totals AS (
    SELECT customer_id, COUNT(*) AS orders,
           SUM(quantity * unit_price) AS spend
    FROM orders
    WHERE status = 'Completed'
    GROUP BY customer_id
)
SELECT c.customer_name, c.city, ct.orders, ct.spend
FROM customer_totals ct
JOIN customers c ON c.customer_id = ct.customer_id
ORDER BY ct.spend DESC
LIMIT 10;
```

**You've got it when:** you get a clean top-10 table with names and cities.

## Try it 4 - Rank and compare with window functions

**Why it matters:** windows let you rank rows and compare each month to the last without losing detail. This impresses interviewers.

**Do this now - rank customers within each city:**
```sql
WITH spend AS (
    SELECT o.customer_id, c.city, SUM(o.quantity * o.unit_price) AS spend
    FROM orders o JOIN customers c ON o.customer_id = c.customer_id
    GROUP BY o.customer_id, c.city
)
SELECT city, customer_id, spend,
       RANK() OVER (PARTITION BY city ORDER BY spend DESC) AS rank_in_city
FROM spend;
```
Then month-on-month growth with `LAG`:
```sql
WITH monthly AS (
    SELECT strftime('%Y-%m', order_date) AS month,
           SUM(quantity * unit_price * (1 - discount_pct/100.0)) AS revenue
    FROM orders WHERE status = 'Completed'
    GROUP BY month
)
SELECT month, ROUND(revenue,0) AS revenue,
       ROUND(100.0 * (revenue - LAG(revenue) OVER (ORDER BY month))
             / LAG(revenue) OVER (ORDER BY month), 1) AS growth_pct
FROM monthly;
```

**You've got it when:** you can rank customers per city and read each month's growth percentage. The pattern is `FUNCTION() OVER (PARTITION BY group ORDER BY column)`.

## Try it 5 - Publish to GitHub

**Why it matters:** code that is not on GitHub does not count to an employer.

**Do this now:**
1. Open your `data-analysis-portfolio` repo. Use **Add file -> Upload files**.
2. Upload `week5_queries.sql` and `week6_business_questions.sql`.
3. Add a `README.md`: the dataset, the questions you asked, and two or three key findings.
4. Make the repo public and copy the link into your LinkedIn.

**You've got it when:** anyone with the link can read your queries and your README.

## This week's build: twelve business questions, answered

Create `week6_business_questions.sql` answering **12 business questions** using a mix of joins, CTEs, and windows. Each query gets a comment with the question and one sentence of interpretation. Upload it to GitHub with your README.

*Shareable win: your first public SQL project. Pin the repo on LinkedIn.*

### Grading guide

| Criteria | Weight |
|---|---|
| Correctness | 50% |
| Variety (joins, CTEs, windows) | 25% |
| Clear comments and interpretation | 15% |
| GitHub presentation | 10% |

### Definition of done

- [ ] 12 queries mixing joins, CTEs, and windows
- [ ] Each has a question and a one-line interpretation
- [ ] Uploaded to GitHub with a README
- [ ] Repo is public and linked on LinkedIn

## Mid-Course Checkpoint (Excel + SQL Practical)

**Format:** during the mentoring session (or an agreed time), 90 minutes, open-book (notes allowed, no copying).
- **Part A, Excel (30 min):** clean a small messy extract (about 100 rows) and build a pivot answering two questions.
- **Part B, SQL (45 min):** answer 6 questions on a new small database (2 joins, 2 aggregations, 1 CTE, 1 window).
- **Part C, Explain (15 min):** the facilitator picks two answers; you explain the logic aloud.

**Scoring (15% of the course grade):** Excel 30%, SQL 50%, Explanation 20%.

## Extra quick wins (optional)
- A running total of revenue by month: `SUM(revenue) OVER (ORDER BY month)`.
- The top product in each city: `ROW_NUMBER() OVER (PARTITION BY city ORDER BY revenue DESC)`, then keep the rows where it equals 1.

## Mentoring Session Plan (90 min, Week 6)
| Time | Activity |
|---|---|
| 0-10 min | Review Week 5 queries; show the best one |
| 10-40 min | Draw joins with two small paper tables, then write the SQL live |
| 40-65 min | CTE and window walkthrough on a business scenario |
| 65-80 min | GitHub setup and upload together |
| 80-90 min | Checkpoint instructions and schedule |

## Facilitator Notes

Teach joins physically first: two small paper tables with a shared key, slid together, before any SQL. The LEFT JOIN "customers who never ordered" example makes the difference from INNER tangible. CTEs land best framed as "name the hard part, then use the name". For window functions, stress that they keep every row rather than collapsing like GROUP BY - that is the mental shift. Note that window functions need SQLite 3.25+ (current DB Browser is fine). The checkpoint can run in a separate sitting if time is tight; keep it open-book but insist the explanation is in the student's own words.

## Self-Check Questions
1. When would a `LEFT JOIN` give a different result from an `INNER JOIN`?
2. What is the difference between `GROUP BY` and `PARTITION BY`?
3. Why use a CTE instead of a nested subquery?
