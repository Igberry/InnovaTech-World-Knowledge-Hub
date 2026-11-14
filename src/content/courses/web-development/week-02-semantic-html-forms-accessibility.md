---
title: "Semantic HTML, Forms & Accessibility"
course: web-development
order: 2
week: 2
phase: "Foundations"
summary: "Build a full multi-page Fresh Bites site with meaningful HTML, a working reservation form, and an accessibility score you'll be proud of."
estimatedHours: 11
tools: ["VS Code", "Chrome / Edge", "Git & GitHub"]
downloads:
  - label: "Fresh Bites content kit"
    href: "/downloads/web-development/fresh-bites-content.zip"
---

**Goal:** Build a complete 4-page Fresh Bites site using *meaningful* HTML, a real working form, and
accessibility good practice, all before adding any CSS. You'll finish with a Lighthouse score you can
screenshot. Hands-on throughout.

## What you'll be able to do

- Structure a page with semantic landmarks (`header`, `nav`, `main`, `footer`)
- Build an accessible form with labels, inputs and validation
- Apply accessibility basics: alt text, labels, keyboard use, contrast
- Add correct page metadata (`title`, description, viewport, favicon)
- Run a Lighthouse report and read the accessibility section

## Before you start (about 10 minutes)

- Keep using VS Code, Live Server, and Git from Week 1. Nothing new to install.
- Open your Week 1 site, you'll upgrade it this week.
- Warm-up (3 minutes): open any big site, press `F12`, and in Elements look for `<header>`, `<nav>`,
  `<main>` and `<footer>`. Spot the real structure, you're about to build the same.

## Try it 1 - Turn div-soup into real structure

**Why it matters:** semantic tags tell browsers, search engines and screen readers what each part *is*. It
makes styling easier later and your site usable by everyone.

**Do this now:**
1. Rebuild your Week 1 home page using this skeleton:

```html
<body>
  <header>
    <nav>
      <a href="index.html">Home</a>
      <a href="menu.html">Menu</a>
      <a href="contact.html">Contact</a>
    </nav>
  </header>

  <main>
    <section>
      <h1>Welcome to Fresh Bites</h1>
      <p>Fresh, local, made to order.</p>
    </section>
  </main>

  <footer>
    <p>&copy; Fresh Bites, Yenagoa.</p>
  </footer>
</body>
```

2. Pick the right landmark for each part using this cheat table:

| Element | Use it for |
|---|---|
| `<header>` | Top of the page or a section (logo, nav) |
| `<nav>` | A set of navigation links |
| `<main>` | The main content, **one per page** |
| `<section>` | A thematic group with its own heading |
| `<article>` | A self-contained piece (a review, a card) |
| `<aside>` | Related but secondary content (hours, sidebar) |
| `<footer>` | Bottom of the page (copyright, links) |

**You've got it when:** your page has no "div soup", every main region uses a semantic tag, and there's
exactly one `<main>` and one `<h1>`.

## Try it 2 - Add a figure and a real data table

**Why it matters:** the right element for the job keeps your content meaningful and accessible.

**Do this now:**
1. Add an image with a caption:

```html
<figure>
  <img src="images/jollof.svg" alt="A plate of jollof rice and chicken" />
  <figcaption>Our signature jollof rice.</figcaption>
</figure>
```

2. Add an opening-hours table (real tabular data, never for layout):

```html
<table>
  <caption>Opening hours</caption>
  <thead>
    <tr><th>Day</th><th>Hours</th></tr>
  </thead>
  <tbody>
    <tr><td>Monday</td><td>9:00 to 21:00</td></tr>
    <tr><td>Saturday</td><td>10:00 to 22:00</td></tr>
  </tbody>
</table>
```

**You've got it when:** your figure shows an image with a caption, and your table has proper `<th>` header
cells and `<td>` data cells.

## Try it 3 - Build an accessible reservation form

**Why it matters:** forms are how a site collects real input: bookings, messages, orders. Done right, they
work for everyone and validate themselves.

**Do this now:**
1. Create a `contact.html` and build this form:

```html
<form action="#" method="post">
  <fieldset>
    <legend>Reserve a table</legend>

    <label for="name">Full name</label>
    <input type="text" id="name" name="name" required />

    <label for="email">Email</label>
    <input type="email" id="email" name="email" required />

    <label for="guests">Number of guests</label>
    <input type="number" id="guests" name="guests" min="1" max="20" value="2" />

    <label for="date">Date</label>
    <input type="date" id="date" name="date" required />

    <label for="notes">Special requests</label>
    <textarea id="notes" name="notes" rows="3"></textarea>

    <button type="submit">Request reservation</button>
  </fieldset>
</form>
```

2. Check that every input's `<label for="...">` matches the input's `id`. Click a label and watch the
   input focus.
3. Try submitting with the email field empty, the browser blocks it for free thanks to `required`.

**You've got it when:** every field has a working label, and the browser's built-in validation stops a bad
submit. (The form has nowhere to send data yet, `action="#"`, you add that with JavaScript in Week 6.)

## Try it 4 - Prove your site works for everyone

**Why it matters:** about 15% of people live with some disability, and accessible sites are clearer and
faster for everyone.

**Do this now:**
1. **Unplug your mouse** (or just don't touch it). Navigate your whole site with `Tab`, `Enter` and
   `Space`. Fix anything you can't reach.
2. Check every image has descriptive `alt` text (use `alt=""` only for purely decorative images).
3. Make sure link text makes sense alone: "See our menu", never "click here".

**You've got it when:** you can use your entire site with the keyboard only.

## Try it 5 - Add metadata and run Lighthouse

**Why it matters:** metadata tells browsers and search engines about your page, and Lighthouse gives you a
real score to chase.

**Do this now:**
1. Add a proper `<head>` to every page:

```html
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Menu - Fresh Bites, Yenagoa</title>
  <meta name="description" content="Fresh Nigerian home-style food in Yenagoa. See our menu and reserve a table." />
  <link rel="icon" href="images/logo.svg" />
</head>
```

2. In Chrome/Edge, open DevTools (`F12`), go to the **Lighthouse** tab, tick **Accessibility**, and click
   **Analyze page load**.
3. Fix whatever it flags (missing labels, low contrast, missing alt text) and run it again.

**You've got it when:** your Lighthouse Accessibility score is 95 or higher. Screenshot it, that's a real
win worth keeping.

### Watch out for

- Over-using `<div>` and `<section>` when a specific landmark fits
- A form input with no label, or a `for`/`id` mismatch (the most common a11y bug)
- Using a `<table>` for page layout (that's CSS's job, next week)
- Forgetting a unique `<title>` and description per page

## This week's build: the 4-page Fresh Bites site

Build and publish the full HTML site (no CSS yet) that you'll style in the coming weeks:

1. **Home** (`index.html`): welcome, tagline, intro, a few highlights.
2. **Menu** (`menu.html`): all items grouped by category (use the kit's `menu.json`), prices in Naira.
3. **About** (`about.html`): the business story (fictional, say so), with the opening-hours table.
4. **Contact** (`contact.html`): address and the reservation form with labels and validation.

All pages share a `<header>`/`<nav>`, use semantic HTML, have correct metadata, and are live on GitHub
Pages.

### Grading guide

| Criteria | % |
|---|---|
| Semantic structure used correctly (landmarks, heading order) | 25 |
| All four pages complete with correct content | 20 |
| Accessible form (labels, types, validation) | 20 |
| Metadata on every page; working nav between all pages | 15 |
| Lighthouse Accessibility >= 95 on each page; published live | 20 |

### Definition of done

- [ ] Four linked pages, live on GitHub Pages
- [ ] Each uses `header`/`nav`/`main`/`footer` and one `<h1>`
- [ ] The form has a label for every field and sensible validation
- [ ] Each page has a unique `<title>` and a meta description
- [ ] Lighthouse Accessibility >= 95 on each page
- [ ] You can navigate the whole site with the keyboard only

## Extra quick wins (optional)

- Get every Lighthouse Accessibility score to a perfect 100 (structure only, no CSS yet).
- Add a `<figure>` with a dish image and caption on the menu page.
- Add a phone input with a pattern: `<input type="tel" pattern="[0-9+ ]{7,15}" />`.

## Mentoring Session Plan (90 min)

| Time | Activity |
|---|---|
| 0-10 | Review last week's live sites and commit history |
| 10-30 | Live: refactor a div-soup page into semantic landmarks; explain each |
| 30-55 | Live: build the reservation form together; test keyboard + Lighthouse |
| 55-80 | Pair work: student starts the 4-page site |
| 80-90 | Brief the build and Definition of done |

## Facilitator Notes

Students over-use `<div>` and `<section>`; push them to justify each element's meaning. The form is the
hard part, watch for missing `for`/`id` pairing (the single most common a11y bug) and inputs without
labels. Make them do the "keyboard only" and Lighthouse checks in session so the habit sticks, and treat
the Lighthouse score as a game they can win. Resist the urge to style anything yet; separating structure
(now) from style (next week) is a deliberate teaching choice.

## Can you do these now?

1. Why use `<nav>` and `<main>` instead of `<div>` everywhere?
2. What connects a `<label>` to its input, and why does it matter?
3. Name three things that make a form accessible.
4. When is a `<table>` the right element, and when is it wrong?
5. What does the Lighthouse Accessibility report check for?
