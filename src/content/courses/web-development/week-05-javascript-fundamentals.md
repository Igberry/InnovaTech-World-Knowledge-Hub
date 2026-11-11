---
title: "JavaScript I: Fundamentals"
course: web-development
order: 5
week: 5
phase: "JavaScript"
summary: "Learn the core of JavaScript: variables, types, functions, arrays and objects."
estimatedHours: 11
tools: ["VS Code", "Chrome DevTools", "Node.js"]
downloads:
  - label: "Fresh Bites content kit"
    href: "/downloads/web-development/fresh-bites-content.zip"
---

**Goal:** Learn the core of JavaScript - variables, data types, functions, arrays and objects - and use
them to work with the Fresh Bites menu data.

HTML is structure, CSS is style, and **JavaScript** is behaviour. It's the programming language of the
web. This week is about the language itself; next week you connect it to the page.

## Learning Objectives

By the end of this week you can:

- Declare variables with `let`/`const` and use the main data types
- Write conditionals, loops and functions (including arrow functions)
- Work with arrays and objects, and use array methods (`map`, `filter`, `find`, `reduce`)
- Format Naira prices with `Intl.NumberFormat`
- Read error messages and debug with `console.log` and DevTools

## Tools to Install This Week

You can run JavaScript in the browser console and in **Node.js** (installed in Week 0). Try
`node -v` to confirm.

## Pre-Session Resources (about 2 hours)

- Learn: **javascript.info** → "An Introduction" through "Objects" and "Array methods".
- Read: **developer.mozilla.org** → "MDN JavaScript first steps".
- Watch (search YouTube): *"Programming with Mosh JavaScript tutorial for beginners"* and
  *"freeCodeCamp JavaScript basics"*.

## Lesson 1: Running JavaScript

Three ways to run JS:

1. **Browser console:** open DevTools (`F12`) → Console tab. Type `2 + 2` and press Enter.
2. **In a page:** add a script at the end of the `<body>`:
   ```html
   <script src="script.js"></script>
   ```
3. **Node.js:** save a `.js` file and run `node script.js` in the terminal.

Your main tool for seeing values is `console.log()`:

```js
console.log("Hello, Yenagoa!");
console.log(3500);
```

## Lesson 2: Variables and data types

```js
const restaurantName = "Yenagoa Fresh Bites"; // can't be reassigned
let total = 0;                                 // can be reassigned
total = total + 3500;

// Data types
const price = 3500;          // number
const name = "Jollof Rice";   // string
const isSpicy = true;         // boolean
const topping = null;         // intentionally empty
let notSet;                   // undefined
```

- Use **`const` by default**; use `let` only when the value must change. Avoid the old `var`.
- **Template literals** (backticks) let you insert values with `${...}`:

```js
const item = "Suya";
const qty = 2;
console.log(`You ordered ${qty} ${item} platters.`);
```

## Lesson 3: Conditionals, loops, functions

```js
// Conditional
const guests = 6;
if (guests > 8) {
  console.log("You need to book ahead.");
} else if (guests > 4) {
  console.log("Large table - we'll arrange it.");
} else {
  console.log("Walk right in.");
}

// Loop
for (let i = 1; i <= 3; i++) {
  console.log(`Table ${i}`);
}

// Function (declaration)
function formatNaira(amount) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
  }).format(amount);
}

// Function (arrow function - shorter syntax)
const addVat = (price) => price * 1.075;

console.log(formatNaira(3500));  // ₦3,500.00
console.log(addVat(3500));       // 3762.5
```

- A **function** is reusable code that takes **arguments** and usually `return`s a value.
- **Arrow functions** are a shorter way to write functions - you'll see them everywhere in React.
- `Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN" })` is the correct, built-in way to
  format Naira. Use it instead of writing "₦" by hand.

> **Note:** `scope` means where a variable is usable. Variables declared with `let`/`const` inside `{ }`
> only exist inside those braces. Keep variables as local as possible.

## Lesson 4: Arrays

An **array** is an ordered list:

```js
const categories = ["Mains", "Grills", "Sides", "Drinks", "Desserts"];

console.log(categories.length);   // 5
console.log(categories[0]);       // "Mains" (counting starts at 0)
categories.push("Specials");      // add to the end
```

**Array methods** are the heart of real JavaScript. Learn these four well:

```js
const prices = [3500, 2500, 800, 1500];

// forEach: do something for each item
prices.forEach((p) => console.log(formatNaira(p)));

// map: make a NEW array by transforming each item
const withVat = prices.map((p) => p * 1.075);

// filter: make a NEW array of items that pass a test
const cheap = prices.filter((p) => p < 2000);   // [800, 1500]

// reduce: combine all items into one value (e.g. a total)
const total = prices.reduce((sum, p) => sum + p, 0);  // 8300
```

| Method | Returns | Use for |
|---|---|---|
| `forEach` | nothing | doing something per item |
| `map` | a new array | transforming every item |
| `filter` | a new array | keeping items that match |
| `find` | one item | finding the first match |
| `reduce` | one value | totals, combining |

## Lesson 5: Objects

An **object** groups related data with named keys:

```js
const dish = {
  id: "jollof-chicken",
  name: "Jollof Rice & Chicken",
  category: "Mains",
  price: 3500,
  spicy: true,
};

console.log(dish.name);       // "Jollof Rice & Chicken"
console.log(dish["price"]);   // 3500
dish.price = 3800;            // update a value
```

Arrays of objects are how real data is modelled - exactly like the kit's `menu.json`:

```js
const menu = [
  { name: "Jollof Rice & Chicken", category: "Mains", price: 3500 },
  { name: "Suya Platter", category: "Grills", price: 2500 },
  { name: "Zobo", category: "Drinks", price: 800 },
];

// Combine methods: get the names of all Mains, cheapest first
const mains = menu
  .filter((d) => d.category === "Mains")
  .map((d) => d.name);

const grandTotal = menu.reduce((sum, d) => sum + d.price, 0);
console.log(formatNaira(grandTotal));
```

**Destructuring and spread** (introductory) - you'll use these a lot later:

```js
const { name, price } = dish;        // pull fields into variables
const updated = { ...dish, price: 4000 }; // copy, overriding price
```

## Lesson 6: Reading errors and debugging

When something breaks, read the error in the Console - it names the file, the line, and the problem
(e.g. `Uncaught TypeError: ... is not a function`). Then:

- `console.log()` the values around the problem to see what they actually are.
- Use the **debugger**: in DevTools → Sources, click a line number to set a breakpoint; the code pauses
  there so you can inspect variables.

> **Common mistakes:** using `=` (assignment) where you meant `===` (comparison); forgetting that `map`
> and `filter` return a **new** array (they don't change the original); off-by-one errors with array
> indexes (they start at 0).

## Practice Exercises

Use the kit's `menu.json` data (copy it into a `menu` array).

1. **Easy:** Log every item's name with `forEach`.
2. **Easy:** Use `map` to make an array of just the prices.
3. **Medium:** Use `filter` to get all items under ₦2,000.
4. **Medium:** Use `find` to get the item with id `"suya-platter"`.
5. **Medium:** Use `reduce` to total the price of all Drinks.
6. **Medium:** Write `formatNaira(amount)` and print every item as `"Name - ₦price"`.
7. **Stretch:** Write `itemsByCategory(category)` that returns the items in a given category.
8. **Stretch:** Write `cartTotal(ids)` that takes an array of item ids and returns the formatted total.

## Weekly Assignment (Due Before Week 6)

Build a **menu data module** and a set of small programs (in `.js` files, run with Node or in the
console):

1. A `menu` array of objects (from the kit data).
2. Functions: `formatNaira`, `itemsByCategory`, `findItem(id)`, `cartTotal(ids)`, and
   `applyDiscount(total, percent)`.
3. A short script that uses them to print a sample order summary.
4. Everything committed with clear messages.

**Grading guide (100%):**

| Criteria | % |
|---|---|
| Correct use of `let`/`const`, types, template literals | 15 |
| Working functions (incl. arrow functions) | 20 |
| Correct use of `map`, `filter`, `find`, `reduce` | 30 |
| Naira formatting with `Intl.NumberFormat` | 15 |
| Clean, readable code; good commits | 20 |

**Definition of done:**

- [ ] A reusable `menu` array of objects
- [ ] All five functions work and are tested with `console.log`
- [ ] At least one use each of `map`, `filter`, `find`, `reduce`
- [ ] Prices print as proper Naira currency
- [ ] Committed with clear messages

## Mentoring Session Plan (90 min)

| Time | Activity |
|---|---|
| 0–10 | Review Portfolio Project 1; celebrate the first live project |
| 10–35 | Live: variables, functions, and the four array methods in the console |
| 35–55 | Live: build `formatNaira` and `cartTotal` together using the menu data |
| 55–80 | Pair work: student writes `itemsByCategory` and `applyDiscount` |
| 80–90 | Brief the assignment; show how to read a console error |

## Facilitator Notes

Many beginners find the jump to programming logic the hardest in the course - go slow, run everything
live, and let them predict outputs before you run. The four array methods (`map`/`filter`/`find`/`reduce`)
are the single highest-value skill this week and recur in every later week, so over-invest here. Insist
they run code themselves rather than watch. If a learner is overwhelmed, drop `reduce` to a stretch goal
and make sure `map`/`filter`/`find` are solid.

## Self-Check Questions

1. When do you use `const` vs `let`?
2. What is the difference between `map` and `forEach`?
3. What does `filter` return, and does it change the original array?
4. How do you get a value out of an object?
5. What is the correct built-in way to format a Naira price?
