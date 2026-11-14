---
title: "JavaScript II: The DOM & Events"
course: web-development
order: 6
week: 6
phase: "JavaScript"
summary: "Make your page actually do things: a live menu filter, a search box, and an add-to-cart with a running total you build yourself."
estimatedHours: 12
tools: ["VS Code", "Chrome DevTools"]
downloads:
  - label: "Fresh Bites content kit"
    href: "/downloads/web-development/fresh-bites-content.zip"
---

**Goal:** Connect JavaScript to the page so it comes alive: select and change elements, respond to clicks
and typing, and build a working menu filter and cart with a running total. This week also includes the
**mid-course checkpoint**. You build real interactivity, step by step.

## What you'll be able to do

- Select elements and change their text, attributes, classes and styles
- Handle events (click, input, submit) and use `event.preventDefault()`
- Render a list of elements from an array of data
- Validate a form and show clear messages
- Build a working menu filter and add-to-cart with a running total

## Before you start (about 10 minutes)

- Nothing new to install. Keep your Week 5 `menu` data handy, you'll put it on the page now.
- Warm-up (2 minutes): open any site, go to the Console, and type
  `document.querySelector("h1").textContent = "Changed!"`. You just changed a live page with code. That's
  the whole week.

## Try it 1 - Grab elements from the page

**Why it matters:** before you can change anything, you have to select it. These two methods do 90% of the
job.

**Do this now:**

```js
const title = document.querySelector("h1");             // the first match
const items = document.querySelectorAll(".menu-item");  // all matches (a list)

console.log(title.textContent);
title.textContent = "Today's Menu";
```

**You've got it when:** you've changed your page's `<h1>` text from JavaScript. `querySelector` returns the
first match; `querySelectorAll` returns all of them (loop with `forEach`).

## Try it 2 - Change text, classes and styles

**Why it matters:** this is how buttons, toggles and live updates work under the hood.

**Do this now:**

```js
const el = document.querySelector("#status");

el.textContent = "Added to cart";    // change text
el.classList.add("is-active");       // add a class
el.classList.toggle("open");         // on/off
```

1. Add a button that toggles a `.dark` class on the `<body>`.

**You've got it when:** clicking a button toggles something visible on the page. Prefer toggling classes
(keep the look in CSS) over setting inline styles.

## Try it 3 - Respond to clicks and typing

**Why it matters:** events are how your code reacts to the user. This is the heart of interactivity.

**Do this now:**

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

**You've got it when:** your console logs a message on click, and shows what you type as you type it.
`event.target` is the element that fired; `event.target.value` is an input's current text.

## Try it 4 - Render the whole menu from data

**Why it matters:** this is the real power, turning an array of data into HTML on the page. It's how every
modern app works.

**Do this now:**

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

**You've got it when:** your menu appears on the page, built entirely from the data array.

> **Warning:** only use `innerHTML` with data *you* control (your own menu). For text a user typed, use
> `textContent`, injecting user text with `innerHTML` is a security risk (XSS).

## Try it 5 - Build the filter, search and cart

**Why it matters:** this is the feature that makes it feel like a real app, and it's your build this week.

**Do this now:**
1. Add a running cart with a total:

```js
let cart = [];

function addToCart(id) {
  const item = menu.find((m) => m.id === id);
  if (item) { cart.push(item); renderCart(); }
}

function renderCart() {
  const list = document.querySelector("#cart");
  const totalEl = document.querySelector("#cart-total");
  list.innerHTML = cart.map((i) => `<li>${i.name} - ${naira(i.price)}</li>`).join("");
  totalEl.textContent = naira(cart.reduce((sum, i) => sum + i.price, 0));
}
```

2. Wire up filter buttons and a search box, using **event delegation** (one listener on the parent):

```js
document.querySelector("#menu").addEventListener("click", (event) => {
  if (event.target.matches(".add-btn")) addToCart(event.target.dataset.id);
});

document.querySelector("#search").addEventListener("input", (event) => {
  const q = event.target.value.toLowerCase();
  renderMenu(menu.filter((m) => m.name.toLowerCase().includes(q)));
});
```

**You've got it when:** you can search the menu as you type, filter by category, and add items to a cart
whose total updates live. Event delegation is essential here because cart buttons are created dynamically.

## Try it 6 - Validate the reservation form

**Why it matters:** real forms check input before accepting it and tell the user clearly what's wrong.

**Do this now:**

```js
const form = document.querySelector("#reserve-form");
const message = document.querySelector("#form-message");

form.addEventListener("submit", (event) => {
  event.preventDefault();                 // stop the page reloading
  const name = form.name.value.trim();
  const guests = Number(form.guests.value);

  if (name === "") return (message.textContent = "Please enter your name.");
  if (guests < 1 || guests > 20) return (message.textContent = "Guests must be between 1 and 20.");

  message.textContent = `Thank you, ${name}. Reservation request received.`;
  form.reset();
});
```

**You've got it when:** submitting with bad input shows a clear message and doesn't reload, and a good
submit shows a thank-you. (In Week 11 this data goes to a real database.)

### Watch out for

- Running JS before the element exists, put `<script>` at the end of `<body>`, or use `defer`
- Attaching listeners to elements created later, use event delegation
- Using `innerHTML` for text a user typed
- Forgetting `event.preventDefault()` on form submit

## This week's build: the interactive Fresh Bites menu

Build a menu page that actually works:

1. Menu rendered from a data array.
2. Category filter **and** search box.
3. Add-to-cart with a running total (formatted Naira).
4. A reservation form with JavaScript validation and a success message.
5. Committed and (optionally) published.

*Tip: this is the most "app-like" thing you've built so far. Record a 20-second screen clip of it working,
it's great for your portfolio.*

### Grading guide

| Criteria | % |
|---|---|
| Menu rendered from data (map + innerHTML) | 20 |
| Working category filter and search | 25 |
| Add-to-cart with correct running total | 25 |
| Form validation with clear messages | 20 |
| Clean code; event delegation used; good commits | 10 |

### Definition of done

- [ ] Menu renders from the data array
- [ ] Filter and search both work
- [ ] Cart total updates correctly and shows Naira
- [ ] The form validates and shows messages
- [ ] Code committed with clear messages

## Mid-Course Checkpoint (end of Week 6)

A **90-minute, open-notes practical** covering Weeks 1 to 6. The student builds a small page from a brief,
with:

- **HTML (30%):** correct semantic structure and a valid form.
- **CSS (35%):** a responsive layout (Flexbox/Grid), brand palette, readable type.
- **JavaScript (35%):** render a provided data array, add one interactive feature (filter or add-to-cart),
  and validate one input.

**Scoring rubric:** each area is marked out of its weight; 70%+ overall is "on track". Below 70%, the
facilitator plans targeted revision before Week 7. (Model answers are kept privately in `_facilitator/`, not
in this repo.)

## Extra quick wins (optional)

- Add a "remove from cart" button for each cart item.
- Show a friendly "nothing found" message when a search returns no items.
- Toggle a `.dark` theme class on the body with a button.

## Mentoring Session Plan (90 min)

| Time | Activity |
|---|---|
| 0-10 | Review Week 5 functions; quick console warm-up |
| 10-35 | Live: select/change elements, add click + input listeners |
| 35-60 | Live: render the menu from data; add filter + add-to-cart together |
| 60-85 | The **mid-course checkpoint** practical (or schedule it separately) |
| 85-90 | Feedback, and brief the Week 6 build / revision plan |

## Facilitator Notes

The DOM is where it clicks that "code can change the page", do lots of live, visible changes. The two
common bugs: running JS before the element exists (put the `<script>` at the end of `<body>`, or use
`defer`), and attaching listeners to elements created later (teach event delegation for the cart). Use the
checkpoint honestly to catch gaps now, Weeks 7 to 11 build directly on this. Keep all model answers in
`_facilitator/`.

## Can you do these now?

1. What is the DOM?
2. What is the difference between `querySelector` and `querySelectorAll`?
3. Why do we call `event.preventDefault()` on a form submit?
4. What is event delegation and when do you need it?
5. Why should you avoid `innerHTML` for text a user typed?
