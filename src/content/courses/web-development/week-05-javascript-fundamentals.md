---
title: "JavaScript I: Fundamentals"
course: web-development
order: 5
week: 5
phase: "JavaScript"
summary: "Start programming for real: write JavaScript that works with live menu data and formats prices in Naira, all by running code yourself."
estimatedHours: 11
tools: ["VS Code", "Chrome DevTools", "Node.js"]
downloads:
  - label: "Fresh Bites content kit"
    href: "/downloads/web-development/fresh-bites-content.zip"
---

**Goal:** Learn the core of JavaScript (variables, functions, arrays and objects) by writing code that
works with real Fresh Bites menu data and prints proper Naira prices. You run everything yourself in the
console, this is a type-it-and-see week.

## What you'll be able to do

- Declare variables with `let`/`const` and use the main data types
- Write conditionals, loops and functions (including arrow functions)
- Use the four array methods: `map`, `filter`, `find`, `reduce`
- Format Naira prices with `Intl.NumberFormat`
- Read errors and debug with `console.log` and DevTools

## Before you start (about 10 minutes)

- Confirm Node works: run `node -v` in the terminal (you installed it in Week 0).
- Open the Fresh Bites content kit and find `menu.json`, you'll turn it into a data array.
- Warm-up (2 minutes): open DevTools (`F12`), click the **Console** tab, type `2 + 2`, press Enter. Then
  type `"Yenagoa".length`. You're already running JavaScript.

## Try it 1 - Run JavaScript three ways

**Why it matters:** you'll use the console constantly, and `console.log` is how you see what your code is
doing.

**Do this now:**
1. In the browser **Console**, type `console.log("Hello, Yenagoa!")` and press Enter.
2. Make a `script.js` file, add `console.log(3500)`, and run it with `node script.js` in the terminal.
3. Link it into a page at the end of `<body>`: `<script src="script.js"></script>`.

**You've got it when:** you've printed a message from the console, from Node, and from a page.

## Try it 2 - Store data in variables

**Why it matters:** variables hold the data your program works with. Picking `const` vs `let` well keeps
code safe.

**Do this now, type each and log it:**

```js
const restaurantName = "Yenagoa Fresh Bites"; // can't be reassigned
let total = 0;                                 // can be reassigned
total = total + 3500;

const price = 3500;          // number
const name = "Jollof Rice";  // string
const isSpicy = true;        // boolean

const item = "Suya";
const qty = 2;
console.log(`You ordered ${qty} ${item} platters.`); // template literal
```

**You've got it when:** your template literal prints "You ordered 2 Suya platters." Use `const` by default,
`let` only when the value must change, and never the old `var`.

## Try it 3 - Make decisions and loops

**Why it matters:** conditionals and loops are how programs choose and repeat, the backbone of logic.

**Do this now:**

```js
const guests = 6;
if (guests > 8) {
  console.log("You need to book ahead.");
} else if (guests > 4) {
  console.log("Large table, we'll arrange it.");
} else {
  console.log("Walk right in.");
}

for (let i = 1; i <= 3; i++) {
  console.log(`Table ${i}`);
}
```

1. Change `guests` to different numbers and predict the message before you run it.

**You've got it when:** you can predict which branch runs for a given number of guests, and your loop prints
Table 1, 2, 3.

## Try it 4 - Write functions

**Why it matters:** functions are reusable code. One of them, `formatNaira`, you'll use all course.

**Do this now:**

```js
// Function declaration
function formatNaira(amount) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
  }).format(amount);
}

// Arrow function (shorter syntax, everywhere in React later)
const addVat = (price) => price * 1.075;

console.log(formatNaira(3500));  // the proper Naira format
console.log(addVat(3500));
```

**You've got it when:** `formatNaira(3500)` prints a correctly formatted Naira price. Always use
`Intl.NumberFormat` for currency instead of typing the symbol by hand.

## Try it 5 - Master the four array methods

**Why it matters:** these four are the single highest-value skill of the week and show up in every later
week, including React.

**Do this now, run each line and read the result:**

```js
const prices = [3500, 2500, 800, 1500];

prices.forEach((p) => console.log(formatNaira(p)));     // do something per item
const withVat = prices.map((p) => p * 1.075);           // NEW transformed array
const cheap = prices.filter((p) => p < 2000);           // NEW array of matches
const total = prices.reduce((sum, p) => sum + p, 0);    // combine into one value
```

| Method | Returns | Use for |
|---|---|---|
| `forEach` | nothing | doing something per item |
| `map` | a new array | transforming every item |
| `filter` | a new array | keeping items that match |
| `find` | one item | finding the first match |
| `reduce` | one value | totals, combining |

**You've got it when:** you can say what each method returns and whether it changes the original (it
doesn't, `map`/`filter` make new arrays).

## Try it 6 - Model real data with objects

**Why it matters:** arrays of objects are how real menu, user and product data is stored, exactly like
`menu.json`.

**Do this now:**

```js
const menu = [
  { name: "Jollof Rice & Chicken", category: "Mains", price: 3500 },
  { name: "Suya Platter", category: "Grills", price: 2500 },
  { name: "Zobo", category: "Drinks", price: 800 },
];

// Combine methods: names of all Mains
const mains = menu
  .filter((d) => d.category === "Mains")
  .map((d) => d.name);

const grandTotal = menu.reduce((sum, d) => sum + d.price, 0);
console.log(formatNaira(grandTotal));
```

**You've got it when:** you can pull a value out of an object (`dish.name`), and chain `filter` then `map`
on the menu. Bonus: try destructuring, `const { name, price } = menu[0];`.

## Try it 7 - Read an error and fix it

**Why it matters:** every developer reads errors all day. The error tells you the file, line and problem.

**Do this now:**
1. Deliberately break something: call a function that doesn't exist, like `formatNiara(3500)` (typo).
2. Read the red error in the Console, it names the problem and line.
3. Add `console.log` around the problem to see the real values, then fix it.

**You've got it when:** you can read an error message, find the line it points to, and fix the mistake.

### Watch out for

- Using `=` (assignment) where you meant `===` (comparison)
- Expecting `map`/`filter` to change the original array (they return a new one)
- Off-by-one errors, array indexes start at 0
- Writing the Naira symbol by hand instead of `Intl.NumberFormat`

## This week's build: a menu data module

Build a small, reusable set of programs (in `.js` files, run with Node or the console):

1. A `menu` array of objects (from the kit data).
2. Functions: `formatNaira`, `itemsByCategory`, `findItem(id)`, `cartTotal(ids)`, and
   `applyDiscount(total, percent)`.
3. A short script that uses them to print a sample order summary.
4. Everything committed with clear messages.

*This is the brain of the interactive app you'll build next week, so make it solid.*

### Grading guide

| Criteria | % |
|---|---|
| Correct use of `let`/`const`, types, template literals | 15 |
| Working functions (incl. arrow functions) | 20 |
| Correct use of `map`, `filter`, `find`, `reduce` | 30 |
| Naira formatting with `Intl.NumberFormat` | 15 |
| Clean, readable code; good commits | 20 |

### Definition of done

- [ ] A reusable `menu` array of objects
- [ ] All five functions work and are tested with `console.log`
- [ ] At least one use each of `map`, `filter`, `find`, `reduce`
- [ ] Prices print as proper Naira currency
- [ ] Committed with clear messages

## Extra quick wins (optional)

- Write `itemsByCategory(category)` returning the items in a given category.
- Write `cartTotal(ids)` that takes item ids and returns the formatted total.
- Use `find` to get the item with id `"suya-platter"`.

## Mentoring Session Plan (90 min)

| Time | Activity |
|---|---|
| 0-10 | Review Portfolio Project 1; celebrate the first live project |
| 10-35 | Live: variables, functions, and the four array methods in the console |
| 35-55 | Live: build `formatNaira` and `cartTotal` together using the menu data |
| 55-80 | Pair work: student writes `itemsByCategory` and `applyDiscount` |
| 80-90 | Brief the build; show how to read a console error |

## Facilitator Notes

Many beginners find the jump to programming logic the hardest in the course, go slow, run everything live,
and let them predict outputs before you run. The four array methods (`map`/`filter`/`find`/`reduce`) are the
single highest-value skill this week and recur in every later week, so over-invest here. Insist they run
code themselves rather than watch. If a learner is overwhelmed, drop `reduce` to a stretch goal and make
sure `map`/`filter`/`find` are solid.

## Can you do these now?

1. When do you use `const` vs `let`?
2. What is the difference between `map` and `forEach`?
3. What does `filter` return, and does it change the original array?
4. How do you get a value out of an object?
5. What is the correct built-in way to format a Naira price?
