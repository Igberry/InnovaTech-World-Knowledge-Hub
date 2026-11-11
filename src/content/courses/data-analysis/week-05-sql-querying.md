---
title: "SQL I - Querying Data"
course: "data-analysis"
order: 5
week: 5
phase: "Databases"
summary: "Pull exactly the data you need from a database using SQL."
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
**Goal:** Pull exactly the data you need from a database using SQL.

## Learning Objectives
- Explain what a database, table, and query are
- Write `SELECT … FROM … WHERE … ORDER BY … LIMIT`
- Use aggregate functions with `GROUP BY` and `HAVING`
- Use `CASE WHEN`, `LIKE`, `IN`, `BETWEEN`, and `NULL` handling

## Tools
**DB Browser for SQLite** with `naijamart.db` (see [Setup Guide](/courses/data-analysis/00-setup-guide/)). Import `orders_clean.csv` as table **orders**, `customers.csv` as **customers**, `products.csv` as **products**.

## Pre-Session Videos (about 2.5 hours)
- Search YouTube: **"Alex The Analyst SQL tutorial for beginners"** (watch the first section)
- Search YouTube: **"freeCodeCamp SQL tutorial full course"** (first 1 to 2 hours)
- Interactive practice: **SQLBolt** lessons 1 to 6 (sqlbolt.com), free and in the browser

---

## Lesson 1: What Is SQL?
- A **database** stores many related tables.
- **SQL** (Structured Query Language) lets you ask questions of those tables.
- Used by almost every analyst job. It appears in most job descriptions.
- We use **SQLite** because it's free and simple. Other systems (MySQL, PostgreSQL, SQL Server) use nearly identical SQL.

### Our database
```
orders     (order_id, order_date, customer_id, product_id, quantity, unit_price,
            discount_pct, city, payment_method, status)
customers  (customer_id, customer_name, city, segment, signup_date)
products   (product_id, product_name, category, list_price)
```

---

## Lesson 2: SELECT Basics
```sql
-- Everything (use sparingly)
SELECT * FROM orders;

-- Specific columns
SELECT order_id, order_date, city, status FROM orders;

-- Limit the rows returned
SELECT * FROM orders LIMIT 10;

-- Unique values
SELECT DISTINCT city FROM orders;

-- Calculated columns and aliases
SELECT order_id,
       quantity * unit_price AS revenue,
       quantity * unit_price * (1 - discount_pct/100.0) AS net_revenue
FROM orders;
```
**Order of writing:** `SELECT → FROM → WHERE → GROUP BY → HAVING → ORDER BY → LIMIT`.
Comments start with `--`. Each statement ends with `;`.

---

## Lesson 3: Filtering with WHERE
```sql
SELECT * FROM orders WHERE city = 'Yenagoa';
SELECT * FROM orders WHERE status = 'Completed' AND quantity >= 3;
SELECT * FROM orders WHERE city = 'Lagos' OR city = 'Abuja';
SELECT * FROM orders WHERE city IN ('Lagos','Abuja','Warri');
SELECT * FROM orders WHERE unit_price BETWEEN 10000 AND 30000;
SELECT * FROM customers WHERE customer_name LIKE 'A%';       -- starts with A
SELECT * FROM customers WHERE customer_name LIKE '%Okoro%';  -- contains Okoro
SELECT * FROM orders WHERE payment_method IS NULL;           -- missing values
SELECT * FROM orders WHERE status <> 'Cancelled';            -- not equal
SELECT * FROM orders WHERE NOT city = 'Lagos';
```
> Text goes in **single quotes**. Use `IS NULL` / `IS NOT NULL`, never `= NULL`.

**Dates in SQLite** are stored as text `YYYY-MM-DD`, so comparisons work:
```sql
SELECT * FROM orders WHERE order_date >= '2025-11-01' AND order_date < '2025-12-01';
SELECT strftime('%m', order_date) AS month FROM orders;   -- month number
SELECT strftime('%Y-%m', order_date) AS year_month FROM orders;
```

---

## Lesson 4: Sorting
```sql
SELECT * FROM orders ORDER BY unit_price DESC;                 -- high to low
SELECT * FROM orders ORDER BY city ASC, order_date DESC;       -- two levels
SELECT * FROM orders ORDER BY unit_price DESC LIMIT 5;         -- top 5
```

---

## Lesson 5: Aggregates and GROUP BY
```sql
SELECT COUNT(*) AS total_orders FROM orders;
SELECT SUM(quantity * unit_price) AS total_revenue FROM orders;
SELECT AVG(unit_price), MIN(unit_price), MAX(unit_price) FROM orders;
SELECT COUNT(DISTINCT customer_id) AS unique_customers FROM orders;
```
**GROUP BY** splits rows into groups and calculates per group:
```sql
SELECT city,
       COUNT(*) AS orders,
       SUM(quantity * unit_price * (1 - discount_pct/100.0)) AS net_revenue
FROM orders
WHERE status = 'Completed'
GROUP BY city
ORDER BY net_revenue DESC;
```
**HAVING** filters *after* grouping (`WHERE` filters rows *before*):
```sql
SELECT city, COUNT(*) AS orders
FROM orders
GROUP BY city
HAVING COUNT(*) > 300;
```
> **Rule:** every column in `SELECT` that isn't inside an aggregate function must appear in `GROUP BY`.

---

## Lesson 6: CASE WHEN and NULLs
```sql
SELECT order_id, quantity * unit_price AS revenue,
       CASE
         WHEN quantity * unit_price >= 100000 THEN 'Large'
         WHEN quantity * unit_price >= 30000  THEN 'Medium'
         ELSE 'Small'
       END AS order_size
FROM orders;

-- Replace NULL with a default
SELECT COALESCE(payment_method, 'Unknown') FROM orders;

-- Conditional counting
SELECT COUNT(*) AS total,
       SUM(CASE WHEN status = 'Returned' THEN 1 ELSE 0 END) AS returned
FROM orders;
```

---

## Practice Exercises
1. List the 10 most expensive `unit_price` orders.
2. How many orders were completed in Port Harcourt?
3. Which payment methods exist, and how many orders for each?
4. What is the total net revenue per month? (Use `strftime`.)
5. Which cities have more than 250 completed orders?
6. Label each order as Large / Medium / Small and count how many fall in each bucket.
7. What percentage of orders were returned? (Hint: `100.0 * SUM(CASE…) / COUNT(*)`.)

---

## Weekly Assignment (Due Before Week 6)
Save a file **`week5_queries.sql`** containing **15 queries**, each with a comment explaining the business question. Include:
- At least 3 using `GROUP BY`
- At least 2 using `HAVING`
- At least 2 using `CASE WHEN`
- At least 1 using date functions
- At least 1 using `LIKE` and 1 using `IN`

For each, add the first 3 rows of the result as a comment or screenshot.

**Grading guide:** correctness (50%), variety of techniques (25%), clear comments (15%), formatting/readability (10%).

---

## Mentoring Session Plan (90 min)
| Time | Activity |
|---|---|
| 0–10 min | Review stats reports, resolve questions |
| 10–25 min | Draw the database (3 boxes with columns) and explain tables and keys |
| 25–35 min | Install DB Browser, import the CSVs together |
| 35–75 min | Live querying: facilitator says a business question in English, students write the SQL (**"translate the question"** drill) |
| 75–85 min | Debug broken queries (provide 3 buggy queries to fix) |
| 85–90 min | Assignment brief |

## Self-Check Questions
1. What is the difference between `WHERE` and `HAVING`?
2. Why does `100/3` differ from `100.0/3` in SQLite?
3. Why must you write `IS NULL` instead of `= NULL`?
