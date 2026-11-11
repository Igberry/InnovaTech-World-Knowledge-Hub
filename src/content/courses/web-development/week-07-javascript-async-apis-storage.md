---
title: "JavaScript III: Async, APIs & Storage"
course: web-development
order: 7
week: 7
phase: "JavaScript"
summary: "Fetch data from real APIs with async/await, handle loading and errors, and persist data with localStorage."
estimatedHours: 12
tools: ["VS Code", "Chrome DevTools"]
downloads:
  - label: "Fresh Bites content kit"
    href: "/downloads/web-development/fresh-bites-content.zip"
  - label: "Week 7 menu data (JSON)"
    href: "/downloads/web-development/week-07-menu-data.json"
---

**Goal:** Fetch live data from real web APIs using `async/await`, handle loading and error states, and
save data in the browser with `localStorage` — then ship **Portfolio Project 2**.

This week your app talks to the outside world (a live weather service) and remembers things between
visits (the cart). These are the skills that turn a static page into a real app.

## Learning Objectives

By the end of this week you can:

- Explain synchronous vs asynchronous code
- Use promises and `async/await` with `try/catch`
- Call a real public API with `fetch` and read JSON
- Handle loading, empty and error states gracefully
- Persist data with `localStorage` and split code into ES modules

## Tools to Install This Week

Nothing new. Serve your page with **Live Server** (fetch and modules need a server, not `file://`).

## Pre-Session Resources (about 2 hours)

- Read: **developer.mozilla.org** → "MDN Promises", "MDN Using fetch", "MDN async/await", "MDN Web Storage".
- Learn: **javascript.info** → "Promises, async/await" and "Fetch".
- Watch (search YouTube): *"Web Dev Simplified async await"* and *"The Net Ninja fetch API"*.

## Lesson 1: Synchronous vs asynchronous

Most code runs **synchronously** — one line after another. But some things take time (fetching data over
the internet). We don't want the page to freeze while waiting, so those run **asynchronously**: we start
them, and get the result later.

```js
console.log("1");
setTimeout(() => console.log("2 (later)"), 1000);
console.log("3");
// Prints: 1, 3, then 2 — the timer runs later, without blocking.
```

## Lesson 2: Promises → async/await

A **promise** represents a value that will arrive later (or fail). Modern code uses `async/await` to
work with promises in a readable, top-to-bottom style:

```js
// A function marked `async` can use `await`
async function getData() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users/1");
    if (!response.ok) {
      throw new Error(`Request failed: ${response.status}`);
    }
    const data = await response.json();
    console.log(data.name);
  } catch (error) {
    console.error("Something went wrong:", error.message);
  }
}

getData();
```

- `await` pauses inside the `async` function until the promise resolves, then gives you the value.
- Always wrap network calls in **`try/catch`** so failures don't crash your app.
- `response.ok` is `true` for success (status 200–299); check it before reading the body.

## Lesson 3: fetch, JSON, HTTP

- **`fetch(url)`** makes an HTTP request and returns a promise for a `Response`.
- **JSON** (JavaScript Object Notation) is the common data format — `response.json()` parses it into
  JavaScript objects/arrays.
- **HTTP methods:** `GET` (read, the default), `POST` (create), `PUT`/`PATCH` (update), `DELETE`.
- **Status codes:** `200` OK, `201` Created, `400` Bad Request, `401` Unauthorized, `404` Not Found,
  `500` Server Error.

> **Important:** This week use only **free, keyless** public APIs. Never put a secret API key in
> front-end code — anyone can read it. Keys come later (Week 11) and live in environment variables.

## Lesson 4: A real API — Yenagoa weather

**Open-Meteo** is a free weather API that needs no key. Yenagoa is about latitude `4.92`, longitude
`6.26`. **Check the current parameter names on `open-meteo.com/en/docs` before you rely on them** — APIs
change.

```js
async function getYenagoaWeather() {
  const url =
    "https://api.open-meteo.com/v1/forecast?latitude=4.92&longitude=6.26&current=temperature_2m";
  const statusEl = document.querySelector("#weather");
  statusEl.textContent = "Loading weather…";
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Weather request failed: ${res.status}`);
    const data = await res.json();
    const temp = data.current.temperature_2m;
    statusEl.textContent = `Yenagoa right now: ${temp}°C`;
  } catch (error) {
    statusEl.textContent = "Couldn't load the weather. Please try again later.";
    console.error(error);
  }
}
getYenagoaWeather();
```

Notice the **three states**: loading ("Loading weather…"), success (the temperature), and error (a
friendly message). Real apps always handle all three. **JSONPlaceholder**
(`jsonplaceholder.typicode.com`) is a good keyless API for pure practice.

## Lesson 5: localStorage — remember things

`localStorage` saves small amounts of data in the browser that survive a page reload or closing the tab.
It stores **strings only**, so use `JSON.stringify` to save and `JSON.parse` to read.

```js
// Save the cart
function saveCart(cart) {
  try {
    localStorage.setItem("freshbites:cart", JSON.stringify(cart));
  } catch (e) {
    /* storage can be full or blocked — ignore safely */
  }
}

// Load the cart (or an empty array)
function loadCart() {
  try {
    return JSON.parse(localStorage.getItem("freshbites:cart")) || [];
  } catch {
    return [];
  }
}
```

- Namespace your keys (`freshbites:cart`) so they don't clash.
- Always wrap reads/writes in `try/catch` — storage can be disabled or full.

> **Note:** `localStorage` is per-browser and per-device, and it isn't secure storage — never keep
> passwords or secrets there. For data that must follow a user across devices, you need a database
> (Week 11).

## Lesson 6: ES modules

Split your code into files with `import`/`export`:

```js
// menu-data.js
export const menu = [ /* ... */ ];
export const naira = (n) =>
  new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN" }).format(n);
```

```js
// app.js
import { menu, naira } from "./menu-data.js";
```

Load the entry file as a module:

```html
<script type="module" src="app.js"></script>
```

Modules keep code organised and are the standard everywhere, including the tooling and React you'll meet
next.

## Practice Exercises

1. **Easy:** Fetch one user from JSONPlaceholder and log their name.
2. **Easy:** Add loading and error text around a fetch.
3. **Medium:** Fetch and display Yenagoa's current temperature.
4. **Medium:** Save and restore the cart with `localStorage`.
5. **Medium:** Split your menu data and helpers into a module and import them.
6. **Stretch:** Show a friendly "nothing found" message when a filter returns no items.
7. **Stretch:** Persist the user's last selected category filter in `localStorage`.

## Weekly Assignment — Portfolio Project 2 (Due Before Week 8)

Ship the **interactive Fresh Bites app** — your second portfolio piece.

Requirements:

1. Menu with filter + search (from Week 6).
2. Cart saved in `localStorage` (survives reload).
3. A validated order/reservation form with a success message.
4. A **live Yenagoa weather widget** (Open-Meteo) with loading and error states.
5. Code split into ES modules.
6. Live on GitHub Pages, with a README (screenshots, live link, what you learned).

**Grading guide (100%):**

| Criteria | % |
|---|---|
| `async/await` + `fetch` with `try/catch` and loading/error states | 25 |
| Working weather widget | 15 |
| Cart persisted in `localStorage` | 20 |
| Form validation; ES modules used | 20 |
| Deployed; README; good commits | 20 |

**Definition of done:**

- [ ] Live on GitHub Pages; link in README
- [ ] Weather widget shows loading, success and error states
- [ ] Cart survives a page reload
- [ ] Code is split into modules
- [ ] README has screenshots, live link, and notes

## Mentoring Session Plan (90 min)

| Time | Activity |
|---|---|
| 0–10 | Review the mid-course checkpoint results and Week 6 app |
| 10–35 | Live: `fetch` + `async/await` + `try/catch`; build the weather widget together |
| 35–55 | Live: save/restore the cart with `localStorage` |
| 55–80 | Pair work: student adds persistence and error states |
| 80–90 | Brief Portfolio Project 2 |

## Facilitator Notes

The reliable confusions: forgetting `await` (so they log a pending Promise), reading `response.json()`
without checking `response.ok`, and testing over `file://` (fetch/modules need Live Server). Make them
simulate a failure (turn off wifi, or use DevTools → Network → Offline) so they *see* the error path and
build the habit of handling it. Verify the Open-Meteo parameter names against the live docs in session,
since API shapes change.

## Self-Check Questions

1. What does `await` do inside an `async` function?
2. Why wrap `fetch` calls in `try/catch`?
3. What are the three UI states every data fetch should handle?
4. Why must you never put a secret API key in front-end code?
5. What does `localStorage` store, and how do you save an array in it?
