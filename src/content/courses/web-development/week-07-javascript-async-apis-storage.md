---
title: "JavaScript III: Async, APIs & Storage"
course: web-development
order: 7
week: 7
phase: "JavaScript"
summary: "Pull live Yenagoa weather from a real API and make your cart remember itself between visits, then ship your second portfolio project."
estimatedHours: 12
tools: ["VS Code", "Chrome DevTools"]
downloads:
  - label: "Fresh Bites content kit"
    href: "/downloads/web-development/fresh-bites-content.zip"
  - label: "Week 7 menu data (JSON)"
    href: "/downloads/web-development/week-07-menu-data.json"
---

**Goal:** Fetch live data from a real weather API with `async/await`, handle loading and error states, and
save data in the browser with `localStorage`, then ship **Portfolio Project 2**. Your app starts talking to
the outside world. You wire it all up yourself.

## What you'll be able to do

- Explain synchronous vs asynchronous code
- Use promises and `async/await` with `try/catch`
- Call a real public API with `fetch` and read JSON
- Handle loading, empty and error states gracefully
- Persist data with `localStorage` and split code into ES modules

## Before you start (about 10 minutes)

- Nothing new to install, but serve your page with **Live Server** (fetch and modules need a server, not
  `file://`).
- Download the [Week 7 menu data (JSON)](/downloads/web-development/week-07-menu-data.json) to practise
  reading JSON.
- Warm-up (2 minutes): in the Console, run `fetch("https://jsonplaceholder.typicode.com/users/1").then(r =>
  r.json()).then(console.log)`. You just pulled real data off the internet.

## Try it 1 - See async with your own eyes

**Why it matters:** some things (like fetching data) take time. Async code starts them without freezing the
page.

**Do this now:**

```js
console.log("1");
setTimeout(() => console.log("2 (later)"), 1000);
console.log("3");
// Prints: 1, 3, then 2 - the timer runs later, without blocking.
```

**You've got it when:** you can explain why "2" prints last even though it's written second.

## Try it 2 - Fetch data with async/await

**Why it matters:** `async/await` is how modern code reads data from the web in a clean, top-to-bottom way.

**Do this now:**

```js
async function getData() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users/1");
    if (!response.ok) throw new Error(`Request failed: ${response.status}`);
    const data = await response.json();
    console.log(data.name);
  } catch (error) {
    console.error("Something went wrong:", error.message);
  }
}
getData();
```

**You've got it when:** the person's name logs to the console. Always wrap network calls in `try/catch`, and
check `response.ok` (true for status 200 to 299) before reading the body.

## Try it 3 - Build a live Yenagoa weather widget

**Why it matters:** this is the headline feature, real, live data on your own page, and it teaches the three
UI states every app needs.

**Do this now:** (Open-Meteo is free and needs no key. Check the current parameter names on
`open-meteo.com/en/docs`, APIs change.)

```js
async function getYenagoaWeather() {
  const url =
    "https://api.open-meteo.com/v1/forecast?latitude=4.92&longitude=6.26&current=temperature_2m";
  const statusEl = document.querySelector("#weather");
  statusEl.textContent = "Loading weather...";        // 1. loading
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Weather request failed: ${res.status}`);
    const data = await res.json();
    statusEl.textContent = `Yenagoa right now: ${data.current.temperature_2m} degrees C`; // 2. success
  } catch (error) {
    statusEl.textContent = "Couldn't load the weather. Please try again later.";          // 3. error
    console.error(error);
  }
}
getYenagoaWeather();
```

1. Now force the error path: open DevTools, go to Network, set it to **Offline**, and reload.

**You've got it when:** your widget shows the live temperature, and shows a friendly message when you go
offline. Real apps always handle all three states: loading, success, error.

## Try it 4 - Make the cart remember itself

**Why it matters:** `localStorage` lets your app keep data between visits, so the cart survives a reload.

**Do this now:**

```js
function saveCart(cart) {
  try {
    localStorage.setItem("freshbites:cart", JSON.stringify(cart));
  } catch (e) { /* storage can be full or blocked, ignore safely */ }
}

function loadCart() {
  try {
    return JSON.parse(localStorage.getItem("freshbites:cart")) || [];
  } catch { return []; }
}
```

1. Add an item, reload the page, and confirm it's still there.

**You've got it when:** your cart survives a page refresh. `localStorage` stores strings only, so use
`JSON.stringify` to save and `JSON.parse` to read, and namespace your keys (`freshbites:cart`).

> **Note:** `localStorage` is per-browser and per-device, and isn't secure, never keep passwords there. For
> data that follows a user across devices, you need a database (Week 11).

## Try it 5 - Split code into modules

**Why it matters:** modules keep code organised and are the standard everywhere, including the React you
meet next.

**Do this now:**

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

**You've got it when:** your menu data lives in its own file and `app.js` imports it cleanly.

### Watch out for

- Forgetting `await`, so you log a pending Promise instead of the value
- Reading `response.json()` without checking `response.ok`
- Testing over `file://`, fetch and modules need Live Server
- Putting a secret API key in front-end code, never do this; this week use only keyless public APIs

## This week's build: Portfolio Project 2

Ship the **interactive Fresh Bites app**, your second portfolio piece:

1. Menu with filter and search (from Week 6).
2. Cart saved in `localStorage` (survives reload).
3. A validated order/reservation form with a success message.
4. A **live Yenagoa weather widget** (Open-Meteo) with loading and error states.
5. Code split into ES modules.
6. Live on GitHub Pages, with a README (screenshots, live link, what you learned).

*Tip: the weather widget is the thing people remember when they see your portfolio. Make it tidy.*

### Grading guide

| Criteria | % |
|---|---|
| `async/await` + `fetch` with `try/catch` and loading/error states | 25 |
| Working weather widget | 15 |
| Cart persisted in `localStorage` | 20 |
| Form validation; ES modules used | 20 |
| Deployed; README; good commits | 20 |

### Definition of done

- [ ] Live on GitHub Pages; link in README
- [ ] Weather widget shows loading, success and error states
- [ ] Cart survives a page reload
- [ ] Code is split into modules
- [ ] README has screenshots, live link, and notes

## Extra quick wins (optional)

- Show a friendly "nothing found" message when a filter returns no items.
- Persist the user's last selected category filter in `localStorage`.
- Fetch and display a second piece of weather data (such as wind speed) from Open-Meteo.

## Mentoring Session Plan (90 min)

| Time | Activity |
|---|---|
| 0-10 | Review the mid-course checkpoint results and Week 6 app |
| 10-35 | Live: `fetch` + `async/await` + `try/catch`; build the weather widget together |
| 35-55 | Live: save/restore the cart with `localStorage` |
| 55-80 | Pair work: student adds persistence and error states |
| 80-90 | Brief Portfolio Project 2 |

## Facilitator Notes

The reliable confusions: forgetting `await` (so they log a pending Promise), reading `response.json()`
without checking `response.ok`, and testing over `file://` (fetch/modules need Live Server). Make them
simulate a failure (turn off wifi, or use DevTools, Network, Offline) so they see the error path and build
the habit of handling it. The live weather widget is the motivating moment, get it working early in the
session. Verify the Open-Meteo parameter names against the live docs in session, since API shapes change.

## Can you do these now?

1. What does `await` do inside an `async` function?
2. Why wrap `fetch` calls in `try/catch`?
3. What are the three UI states every data fetch should handle?
4. Why must you never put a secret API key in front-end code?
5. What does `localStorage` store, and how do you save an array in it?
