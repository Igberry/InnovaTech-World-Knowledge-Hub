---
title: "SQL II — Joins, CTEs & Window Functions (Mid-Course Checkpoint)"
course: "data-analysis"
order: 6
week: 6
phase: "Databases"
summary: "Combine tables and answer harder business questions, then prove your skills in the mid-course checkpoint."
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
**Goal:** Combine tables and answer harder business questions, then prove your skills in the mid-course checkpoint.

## Learning Objectives
- Combine tables with `INNER JOIN` and `LEFT JOIN`
- Write subqueries and CTEs (`WITH`)
- Use window functions: `ROW_NUMBER`, `RANK`, running totals, `LAG`
- Publish work on GitHub

## Pre-Session Videos (about 2.5 hours)
- Search YouTube: **"Alex The Analyst SQL joins"**
- Search YouTube: **"SQL window functions explained for beginners"** (Alex The Analyst or freeCodeCamp)
- Search YouTube: **"SQL CTE explained"**
- Interactive: **SQLBolt** lessons on JOINs (6 to 12); **Mode SQL Tutorial** (intermediate and advanced sections)

---

## Lesson 1: Why Joins?
Data is split across tables to avoid repetition. `orders` has `customer_id` but not the customer's name. A **join** connects tables through a shared key.

```
orders.customer_id  ───►  customers.customer_id
orders.product_id   ───►  products.product_id
```

## Lesson 2: Joins
```sql
-- INNER JOIN: only rows with a match in both tables
SELECT o.order_id, c.customer_name, p.product_name, o.quantity
FROM orders o
INNER JOIN customers c ON o.customer_id = c.customer_id
INNER JOIN products  p ON o.product_id  = p.product_id;

-- LEFT JOIN: keep ALL rows from the left table, even without a match
-- (find customers who never ordered)
SELECT c.customer_id, c.customer_name, COUNT(o.order_id) AS orders
FROM customers c
LEFT JOIN orders o ON c.customer_id = o.customer_id
GROUP BY c.customer_id, c.customer_name
HAVING COUNT(o.order_id) = 0;
```
| Join | Returns |
|---|---|
| `INNER JOIN` | Only matching rows |
| `LEFT JOIN` | All left rows + matches (NULL if none) |
| `RIGHT / FULL JOIN` | Not supported in older SQLite; use LEFT and swap the tables |

**Aliases (`o`, `c`, `p`)** keep queries readable. Always prefix columns when two tables share a name.

**Revenue by category:**
```sql
SELECT p.category,
       ROUND(SUM(o.quantity * o.unit_price * (1 - o.discount_pct/100.0)), 0) AS net_revenue
FROM orders o
JOIN products p ON o.product_id = p.product_id
WHERE o.status = 'Completed'
GROUP BY p.category
ORDER BY net_revenue DESC;
```

---

## Lesson 3: Subqueries
A query inside a query:
```sql
-- Orders above the overall average price
SELECT * FROM orders
WHERE unit_price > (SELECT AVG(unit_price) FROM orders);
```

## Lesson 4: CTEs (Common Table Expressions)
A CTE is a named temporary result that makes complex queries readable:
```sql
WITH customer_totals AS (
    SELECT customer_id,
           COUNT(*) AS orders,
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
Chain multiple CTEs with commas: `WITH a AS (...), b AS (...) SELECT ...`

---

## Lesson 5: Window Functions
Windows calculate across related rows **without collapsing them**.

```sql
-- Rank customers by spend within each city
WITH spend AS (
    SELECT o.customer_id, c.city, SUM(o.quantity * o.unit_price) AS spend
    FROM orders o JOIN customers c ON o.customer_id = c.customer_id
    GROUP BY o.customer_id, c.city
)
SELECT city, customer_id, spend,
       RANK() OVER (PARTITION BY city ORDER BY spend DESC) AS rank_in_city
FROM spend;
```
Pattern: `FUNCTION() OVER (PARTITION BY group ORDER BY column)`

| Function | Use |
|---|---|
| `ROW_NUMBER()` | Unique sequence (1, 2, 3…) |
| `RANK()` / `DENSE_RANK()` | Ranking with ties |
| `SUM() OVER (ORDER BY …)` | Running total |
| `LAG(col)` / `LEAD(col)` | Previous / next row value |

**Month-on-month growth:**
```sql
WITH monthly AS (
    SELECT strftime('%Y-%m', order_date) AS month,
           SUM(quantity * unit_price * (1 - discount_pct/100.0)) AS revenue
    FROM orders WHERE status = 'Completed'
    GROUP BY month
)
SELECT month, ROUND(revenue,0) AS revenue,
       ROUND(LAG(revenue) OVER (ORDER BY month),0) AS prev_month,
       ROUND(100.0 * (revenue - LAG(revenue) OVER (ORDER BY month))
             / LAG(revenue) OVER (ORDER BY month), 1) AS growth_pct
FROM monthly;
```
**Running total:** `SUM(revenue) OVER (ORDER BY month)`.
**Top product per city:** `ROW_NUMBER() OVER (PARTITION BY city ORDER BY revenue DESC)` then filter `= 1` in an outer query.

> Window functions require SQLite 3.25 or newer. DB Browser's current versions support this.

---

## Lesson 6: GitHub for Portfolios
1. Open your `data-analysis-portfolio` repository.
2. **Add file → Upload files** and upload `week5_queries.sql` and `week6_business_questions.sql`.
3. Create `README.md` describing the project: dataset, the questions asked, and two or three key findings.
4. Make the repo **public**. Copy the link and add it to your LinkedIn.

---

## Practice Exercises
1. List each order with customer name, product name, and category.
2. Which 5 customers spent the most? Which city are they in?
3. Which customer **segment** (Individual, Small Business, Institution) has the highest average order value?
4. Which products were never returned? Which have the highest return rate?
5. Show month-on-month revenue growth.
6. What is the top-selling product in each city?
7. How many customers have placed more than one order?

---

## Weekly Assignment (Due Before Week 7)
Create **`week6_business_questions.sql`** answering **12 business questions** (mix of joins, CTEs, and windows). Each query needs a comment with the question and one sentence of interpretation. Upload to GitHub with a README.

---

## Mid-Course Checkpoint (Excel + SQL Practical)
**Format:** During the mentoring session (or an agreed time), 90 minutes, open-book (notes allowed, no copying).
- **Part A, Excel (30 min):** clean a small messy extract (about 100 rows) and build a pivot answering two questions.
- **Part B, SQL (45 min):** answer 6 questions on a new small database (2 joins, 2 aggregations, 1 CTE, 1 window).
- **Part C, Explain (15 min):** the facilitator picks two answers; the student explains the logic aloud.

**Scoring (15% of the course grade):** Excel 30% · SQL 50% · Explanation 20%.

---

## Mentoring Session Plan (90 min, Week 6)
| Time | Activity |
|---|---|
| 0–10 min | Review Week 5 queries; show the best one |
| 10–40 min | Draw joins using two small paper tables, then write the SQL live |
| 40–65 min | CTE and window function walkthrough using a business scenario |
| 65–80 min | GitHub setup and upload |
| 80–90 min | Checkpoint instructions and schedule (the checkpoint can run in a separate sitting) |

## Self-Check Questions
1. When would a `LEFT JOIN` give a different result from an `INNER JOIN`?
2. What is the difference between `GROUP BY` and `PARTITION BY`?
3. Why use a CTE instead of a nested subquery?
