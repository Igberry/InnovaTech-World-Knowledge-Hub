---
title: "JavaScript II: The DOM & Events"
course: web-development
order: 6
week: 6
phase: "JavaScript"
summary: "Make pages interactive: select and change elements, handle events, and build a menu filter and cart."
estimatedHours: 12
tools: ["VS Code", "Chrome DevTools"]
downloads:
  - label: "Fresh Bites content kit"
    href: "/downloads/web-development/fresh-bites-content.zip"
---

**Goal:** Connect JavaScript to the page - select and change elements, respond to clicks and form input,
and build an interactive menu filter and cart. This week also includes the **mid-course checkpoint**.

Last week was the language; this week it comes alive on the page through the **DOM**.

## Learning Objectives

By the end of this week you can:

- Select elements and change their text, attributes, classes and styles
- Handle events (click, input, submit) and use `event.preventDefault()`
- Render a list of elements from an array of data
- Validate a form and show clear messages
- Build a working menu filter + add-to-cart with a running total

## Tools to Install This Week

Nothing new.

## Pre-Session Resources (about 2 hours)

- Read: **developer.mozilla.org** → "MDN DOM introduction", "MDN Events".
- Learn: **javascript.info** → the "Document" and "Events" sections.
- Watch (search YouTube): *"The Net Ninja DOM tutorial"* and *"Web Dev Simplified DOM events"*.

## Lesson 1: What is the DOM?

When the browser loads your HTML, it builds a live, in-memory model of the page called the **DOM**
(Document Object Model) - a tree of objects you can read and change with JavaScript. Change the DOM, and
the page updates instantly.

```js
// Select elements
const title = document.querySelector("h1");            // the first match
const items = document.querySelectorAll(".menu-item");  // all matches (a list)

// Read and change
console.log(title.textContent);
title.textContent = "Today's Menu";
```

- `querySelector(selector)` returns the **first** element matching a CSS selector.
- `querySelectorAll(selector)` returns a list of **all** matches (loop it with `forEach`).

## Lesson 2: Changing elements

```js
const el = document.querySelector("#status");

el.textContent = "Added to cart";          // change text
el.setAttribute("data-count", "3");        // change an attribute
el.classList.add("is-active");             // add a class
el.classList.remove("is-active");          // remove a class
el.classList.toggle("open");               // on/off
el.style.color = "#c8372d";                // change a style (prefer classes)
```

> **Tip:** Prefer changing **classes** over inline styles. Keep the look in your CSS and just toggle
> classes in JavaScript - cleaner and easier to maintain.

## Lesson 3: Events

An **event** is something that happens - a click, typing, submitting a form. You respond with an
**event listener**:

```js
const button = document.querySelector("#order-btn");

button.addEventListener("click", () => {
  console.log("Order button clicked");
});

const search = document.querySelector("#search");
search.addEventListener("input", (event) => {
  console.log("You typed:", event.target.value);
});
```

- `addEventListener("click", handler)` runs `handler` whenever the event happens.
- The handler receives an **event object**; `event.target` is the element that fired it, and
  `event.target.value` is an input's current text.

### preventDefault and event delegation

```js
const form = document.querySelector("#reserve-form");
form.addEventListener("submit", (event) => {
  event.preventDefault();   // stop the browser reloading the page
  // ... handle the data with JS instead
});

// Event delegation: one listener on a parent handles many children
const menu = document.querySelector("#menu");
menu.addEventListener("click", (event) => {
  if (event.target.matches(".add-btn")) {
    const id = event.target.dataset.id;
    addToCart(id);
  }
});
```

**Event delegation** means putting one listener on a parent instead of many on each child - essential
when items are added dynamically (your cart buttons).

## Lesson 4: Rendering a list from data

The real power: turn an array of data into HTML on the page.

```js
const menu = [
  { id: "jollof-chicken", name: "Jollof Rice & Chicken", category: "Mains", price: 3500 },
  { id: "suya-platter", name: "Suya Platter", category: "Grills", price: 2500 },
  { id: "zobo", name: "Zobo", category: "Drinks", price: 800 },
];

const naira = (n) =>
  new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN" }).format(n);

function renderMenu(list) {
  const container = document.querySelector("#menu");
  container.innerHTML = list
    .map(
      (item) => `
      <article class="menu-item">
        <h3>${item.name}</h3>
        <p>${naira(item.price)}</p>
        <button class="add-btn" data-id="${item.id}">Add to cart</button>
      </article>`
    )
    .join("");
}

renderMenu(menu);
```

- Build an HTML string with `map`, join it, and set `container.innerHTML`.
- `data-id="${item.id}"` stores the id on the button so the click handler knows which item.

> **Warning:** Only use `innerHTML` with data **you** control (like your own menu). Never inject text a
> user typed with `innerHTML` - it's a security risk (XSS). For user text, use `textContent`.

## Lesson 5: Build the menu filter + cart

Combine everything: filter by category, search by name, and add items to a cart with a running total.

```js
let cart = [];

function addToCart(id) {
  const item = menu.find((m) => m.id === id);
  if (item) {
    cart.push(item);
    renderCart();
  }
}

function renderCart() {
  const list = document.querySelector("#cart");
  const totalEl = document.querySelector("#cart-total");
  list.innerHTML = cart.map((i) => `<li>${i.name} - ${naira(i.price)}</li>`).join("");
  const total = cart.reduce((sum, i) => sum + i.price, 0);
  totalEl.textContent = naira(total);
}

// Filter buttons
document.querySelector("#filters").addEventListener("click", (event) => {
  if (event.target.matches(".filter-btn")) {
    const cat = event.target.dataset.category;
    renderMenu(cat === "all" ? menu : menu.filter((m) => m.category === cat));
  }
});

// Search
document.querySelector("#search").addEventListener("input", (event) => {
  const q = event.target.value.toLowerCase();
  renderMenu(menu.filter((m) => m.name.toLowerCase().includes(q)));
});
```

## Lesson 6: Form handling and validation

```js
const form = document.querySelector("#reserve-form");
const message = document.querySelector("#form-message");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const name = form.name.value.trim();
  const guests = Number(form.guests.value);

  if (name === "") {
    message.textContent = "Please enter your name.";
    return;
  }
  if (guests < 1 || guests > 20) {
    message.textContent = "Guests must be between 1 and 20.";
    return;
  }

  message.textContent = `Thank you, ${name}. Reservation request received.`;
  form.reset();
});
```

Validate on submit, show a clear message for each problem, and only proceed when the input is valid.
(In Week 11 this data will be saved to a real database.)

## Practice Exercises

1. **Easy:** Change the page `<h1>` text with JavaScript.
2. **Easy:** Toggle a `.dark` class on the body with a button.
3. **Medium:** Render the full menu from the data array.
4. **Medium:** Add category filter buttons that re-render the menu.
5. **Medium:** Add a search box that filters as you type.
6. **Medium:** Add "Add to cart" buttons (event delegation) and a running total.
7. **Stretch:** Add a "remove from cart" button for each cart item.
8. **Stretch:** Validate the reservation form with clear per-field messages.

## Weekly Assignment (Due Before Week 7)

Build the **interactive Fresh Bites menu** page:

1. Menu rendered from a data array.
2. Category filter **and** search box.
3. Add-to-cart with a running total (formatted Naira).
4. A reservation form with JavaScript validation and a success message.
5. Committed and (optionally) published.

**Grading guide (100%):**

| Criteria | % |
|---|---|
| Menu rendered from data (map + innerHTML) | 20 |
| Working category filter and search | 25 |
| Add-to-cart with correct running total | 25 |
| Form validation with clear messages | 20 |
| Clean code; event delegation used; good commits | 10 |

**Definition of done:**

- [ ] Menu renders from the data array
- [ ] Filter and search both work
- [ ] Cart total updates correctly and shows Naira
- [ ] The form validates and shows messages
- [ ] Code committed with clear messages

## Mid-Course Checkpoint (end of Week 6)

A **90-minute, open-notes practical** covering Weeks 1–6. The student builds a small page from a brief,
with:

- **HTML (30%):** correct semantic structure and a valid form.
- **CSS (35%):** a responsive layout (Flexbox/Grid), brand palette, readable type.
- **JavaScript (35%):** render a provided data array, add one interactive feature (filter or add-to-cart),
  and validate one input.

**Scoring rubric:** each area is marked out of its weight; 70%+ overall is "on track". Below 70%, the
facilitator plans targeted revision before Week 7. (Model answers are kept privately in `_facilitator/`,
not in this repo.)

## Mentoring Session Plan (90 min)

| Time | Activity |
|---|---|
| 0–10 | Review Week 5 functions; quick console warm-up |
| 10–35 | Live: select/change elements, add click + input listeners |
| 35–60 | Live: render the menu from data; add filter + add-to-cart together |
| 60–85 | The **mid-course checkpoint** practical (or schedule it separately) |
| 85–90 | Feedback, and brief the Week 6 assignment / revision plan |

## Facilitator Notes

The DOM is where it clicks that "code can change the page" - do lots of live, visible changes. The two
common bugs: running JS before the element exists (put the `<script>` at the end of `<body>`, or use
`defer`), and attaching listeners to elements created later (teach event delegation for the cart). Use
the checkpoint honestly to catch gaps now - Weeks 7–11 build directly on this. Keep all model answers in
`_facilitator/`.

## Self-Check Questions

1. What is the DOM?
2. What is the difference between `querySelector` and `querySelectorAll`?
3. Why do we call `event.preventDefault()` on a form submit?
4. What is event delegation and when do you need it?
5. Why should you avoid `innerHTML` for text a user typed?
