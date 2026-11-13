# Google Sheets QUERY practice

Use the fictional `sales-sample-100.csv`. Import the CSV into a sheet named `Sales`, keeping the header row in row 1. Its columns are:

| Column | Field |
|---|---|
| A | `sale_id` |
| B | `date` |
| C | `item` |
| D | `category` |
| E | `quantity` |
| F | `unit_price_ngn` |
| G | `total_ngn` |
| H | `payment_method` |
| I | `channel` |

If dates import as text, convert them to actual dates before running the date example. Google Sheets' `QUERY` function uses a query language; it is not SQL, although some words look familiar. The examples below assume one header row. The range ends at row 101 because the file contains 100 practice records.

## Five examples

### 1. Sales total by category

```text
=QUERY(Sales!A1:I101,"select D, sum(G) group by D order by sum(G) desc label sum(G) 'Sales (NGN)'",1)
```

### 2. Units sold by item

```text
=QUERY(Sales!A1:I101,"select C, sum(E) group by C order by sum(E) desc label sum(E) 'Units sold'",1)
```

### 3. Order count by channel

```text
=QUERY(Sales!A1:I101,"select I, count(A) group by I label count(A) 'Orders'",1)
```

### 4. Average order total by payment method

```text
=QUERY(Sales!A1:I101,"select H, avg(G) group by H label avg(G) 'Average order (NGN)'",1)
```

### 5. Daily sales from 15 October 2026

```text
=QUERY(Sales!A1:I101,"select B, sum(G) where B >= date '2026-10-15' group by B order by B label sum(G) 'Sales (NGN)'",1)
```

## Check each result

- Compare the total across categories with `=SUM(Sales!G2:G101)`.
- Compare the units across items with `=SUM(Sales!E2:E101)`.
- Compare the number of orders across channels with `=COUNTA(Sales!A2:A101)`.
- Select a few rows and calculate `quantity × unit_price_ngn` to check the supplied `total_ngn`.
- Confirm the date condition includes only dates on or after 15 October 2026.

If the formula returns an error, check the sheet name, range, quotes, header count and date type. Formula argument separators can vary with spreadsheet locale; consult the app's current help rather than changing data to hide an error.
