---
title: "SQL I - Querying Data"
course: "data-analysis"
order: 5
week: 5
phase: "Databases"
summary: "Write your first SQL and pull exactly the answers you need straight from a database - the single most-requested skill on analyst job adverts."
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
**Goal:** Load the NaijaMart data into a real database and ask it questions in SQL. By the end of the week you can pull the exact rows and totals you need, which is on nearly every data analyst job advert.

## What you'll be able to do
- Explain what a database, table, and query are
- Write `SELECT ... FROM ... WHERE ... ORDER BY ... LIMIT`
- Summarise with aggregates, `GROUP BY`, and `HAVING`
- Use `CASE WHEN`, `LIKE`, `IN`, `BETWEEN`, and handle `NULL`

## Before you start (about 10 minutes)
- Install **DB Browser for SQLite** and build `naijamart.db` from the three CSVs (see the [Setup Guide](/courses/data-analysis/00-setup-guide/)). Import `orders_clean.csv` as **orders**, `customers.csv` as **customers**, `products.csv` as **products**.
- Warm-up: in the **Execute SQL** tab, run `SELECT * FROM orders LIMIT 5;` and press Ctrl+Enter.
- Optional: do **SQLBolt** lessons 1 to 3 at sqlbolt.com - free, interactive, in the browser.

Our tables:
```
orders     (order_id, order_date, customer_id, product_id, quantity, unit_price,
            discount_pct, city, payment_method, status)
customers  (customer_id, customer_name, city, segment, signup_date)
products   (product_id, product_name, category, list_price)
```

## Try it 1 - Ask for exactly what you want

**Why it matters:** `SELECT` is how you stop scrolling and start asking. Pick columns, not everything.

**Do this now, running each with Ctrl+Enter:**
1. Specific columns: `SELECT order_id, order_date, city, status FROM orders;`
2. Just a peek: `SELECT * FROM orders LIMIT 10;`
3. Unique values: `SELECT DISTINCT city FROM orders;`
4. A calculated column: `SELECT order_id, quantity*unit_price AS revenue FROM orders;`

**You've got it when:** you can return any columns you choose, with a calculated revenue column.

## Try it 2 - Filter with WHERE

**Why it matters:** real questions are always "show me the ones where...".

**Do this now:**
1. `SELECT * FROM orders WHERE city = 'Yenagoa';`
2. `SELECT * FROM orders WHERE status = 'Completed' AND quantity >= 3;`
3. `SELECT * FROM orders WHERE city IN ('Lagos','Abuja','Warri');`
4. `SELECT * FROM orders WHERE unit_price BETWEEN 10000 AND 30000;`
5. `SELECT * FROM customers WHERE customer_name LIKE '%Okoro%';`
6. Missing values: `SELECT * FROM orders WHERE payment_method IS NULL;`

**You've got it when:** you can combine conditions, and you use `IS NULL` (never `= NULL`). Text always goes in single quotes.

## Try it 3 - Sort and take the top

**Why it matters:** "top 5 orders" is a question you will answer a hundred times.

**Do this now:**
1. `SELECT * FROM orders ORDER BY unit_price DESC;`
2. `SELECT * FROM orders ORDER BY unit_price DESC LIMIT 5;`
3. Dates work as text here: `SELECT * FROM orders WHERE order_date >= '2025-11-01' AND order_date < '2025-12-01';`

**You've got it when:** you can return the 5 most expensive orders and all orders in one month.

## Try it 4 - Summarise with GROUP BY

**Why it matters:** this is SQL's superpower - revenue per city, orders per method, all in one query.

**Do this now:**
1. `SELECT COUNT(*) AS total_orders FROM orders;`
2. Revenue by city:
```sql
SELECT city,
       COUNT(*) AS orders,
       SUM(quantity * unit_price * (1 - discount_pct/100.0)) AS net_revenue
FROM orders
WHERE status = 'Completed'
GROUP BY city
ORDER BY net_revenue DESC;
```
3. Filter after grouping with `HAVING`: `... GROUP BY city HAVING COUNT(*) > 300;`

**You've got it when:** you get one row per city with its order count and revenue. Remember: every non-aggregated column in `SELECT` must be in `GROUP BY`.

## Try it 5 - Label and count with CASE WHEN

**Why it matters:** bucketing orders into Large/Medium/Small is everyday analyst work.

**Do this now:**
```sql
SELECT order_id, quantity * unit_price AS revenue,
       CASE
         WHEN quantity * unit_price >= 100000 THEN 'Large'
         WHEN quantity * unit_price >= 30000  THEN 'Medium'
         ELSE 'Small'
       END AS order_size
FROM orders;
```
Then count returns in one query:
```sql
SELECT COUNT(*) AS total,
       SUM(CASE WHEN status = 'Returned' THEN 1 ELSE 0 END) AS returned
FROM orders;
```

**You've got it when:** you can label each order by size and count how many were returned.

## This week's build: a file of real business queries

Save `week5_queries.sql` with **15 queries**, each starting with a comment that states the business question it answers. Include:
- At least 3 using `GROUP BY`
- At least 2 using `HAVING`
- At least 2 using `CASE WHEN`
- At least 1 using date functions, 1 using `LIKE`, and 1 using `IN`

Paste the first 3 result rows under each query as a comment or screenshot.

*This file goes to GitHub next week. Write the comments as if a manager will read them.*

### Grading guide

| Criteria | Weight |
|---|---|
| Correctness | 50% |
| Variety of techniques | 25% |
| Clear business comments | 15% |
| Formatting and readability | 10% |

### Definition of done

- [ ] 15 queries, each with a business-question comment
- [ ] Covers GROUP BY, HAVING, CASE WHEN, dates, LIKE, IN
- [ ] First result rows shown for each
- [ ] File saved as `week5_queries.sql`

## Extra quick wins (optional)
- What percentage of orders were returned? `100.0 * SUM(CASE WHEN status='Returned' THEN 1 ELSE 0 END) / COUNT(*)`.
- Replace missing payment methods on the fly: `SELECT COALESCE(payment_method,'Unknown') FROM orders;`.

## Mentoring Session Plan (90 min)
| Time | Activity |
|---|---|
| 0-10 min | Review stats read-outs, resolve questions |
| 10-25 min | Draw the database (3 boxes with columns); explain tables and keys |
| 25-35 min | Install DB Browser and import the CSVs together |
| 35-75 min | "Translate the question" drill: facilitator says a question in English, students write the SQL |
| 75-85 min | Fix three deliberately broken queries |
| 85-90 min | Build brief |

## Facilitator Notes

The "translate the question" drill is the heart of the week: say a business question aloud, let students write the SQL, then run it together. Draw the three tables on the board first so keys feel real. Watch for the classic beginner errors: `= NULL` instead of `IS NULL`, forgetting single quotes on text, and integer division (`100/3` vs `100.0/3` in SQLite). Keep three buggy queries ready for the debugging slot - fixing broken SQL teaches faster than writing fresh. Reassure students that MySQL, PostgreSQL, and SQL Server use nearly identical SQL, so this transfers directly to jobs.

## Self-Check Questions
1. What is the difference between `WHERE` and `HAVING`?
2. Why does `100/3` differ from `100.0/3` in SQLite?
3. Why must you write `IS NULL` instead of `= NULL`?
