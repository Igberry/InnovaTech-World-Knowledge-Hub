---
title: "Layout, Flexbox, Grid & Responsive Design"
course: web-development
order: 4
week: 4
phase: "Foundations"
summary: "Lay out pages with Flexbox and Grid, and make them work on every screen size."
estimatedHours: 12
tools: ["VS Code", "Chrome DevTools"]
downloads:
  - label: "Fresh Bites content kit"
    href: "/downloads/web-development/fresh-bites-content.zip"
---

**Goal:** Lay out your Fresh Bites site with Flexbox and CSS Grid, make it fully responsive from phone
to desktop, and ship it as **Portfolio Project 1** — your first real, deployed project.

Most of the web is viewed on phones, often on slow data. This week you learn to build **mobile-first**
layouts that adapt to any screen.

## Learning Objectives

By the end of this week you can:

- Use Flexbox to lay out rows of items (navbars, card rows) and centre things
- Use CSS Grid for two-dimensional layouts (a menu grid, page sections)
- Build mobile-first with media queries and sensible breakpoints
- Make images and typography responsive (`max-width`, `clamp()`)
- Ship a documented, responsive project live with a README

## Tools to Install This Week

Nothing new. Play the two free practice games in Lesson 5.

## Pre-Session Resources (about 2 hours)

- Read: **developer.mozilla.org** → "MDN Flexbox", "MDN CSS Grid", "MDN Responsive design".
- Reference: **css-tricks.com** → search "CSS Tricks A Complete Guide to Flexbox" and "…to Grid".
- Watch (search YouTube): *"Kevin Powell flexbox"*, *"Kevin Powell CSS grid"*, *"Kevin Powell responsive design"*.
- Play: **Flexbox Froggy** (flexboxfroggy.com) and **Grid Garden** (cssgridgarden.com).

## Lesson 1: Display and normal flow

Every element has a `display` value that controls how it lays out:

- `block` — stacks vertically, takes full width (`div`, `p`, `section`, `h1`).
- `inline` — sits in a line, only as wide as its content (`span`, `a`).
- `inline-block` — in a line, but you can set width/height.
- `flex` and `grid` — powerful layout modes (this week).

"Normal flow" is how the page stacks by default. `position` (relative, absolute, fixed, sticky) and
`z-index` let you take elements out of flow — use them sparingly.

## Lesson 2: Flexbox (one dimension)

Flexbox lays items out in a **row or column**. Put `display: flex` on the **container**; the direct
children become flex items.

```css
.nav {
  display: flex;
  gap: 1.5rem;              /* space between items */
  align-items: center;      /* vertical alignment (cross axis) */
  justify-content: space-between; /* horizontal spacing (main axis) */
}
```

Key container properties:

| Property | Does |
|---|---|
| `flex-direction` | `row` (default) or `column` |
| `justify-content` | spacing along the main axis (`center`, `space-between`, `flex-start`) |
| `align-items` | alignment on the cross axis (`center`, `stretch`) |
| `gap` | space between items |
| `flex-wrap` | `wrap` lets items drop to the next line |

Flexbox makes two common tasks easy — a **navbar** (space-between) and **centring** anything:

```css
.center {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 50vh;
}
```

## Lesson 3: CSS Grid (two dimensions)

Grid lays items out in **rows and columns** at once — perfect for a menu of cards.

```css
.menu-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 1.5rem;
}
```

- `grid-template-columns` defines the columns.
- `repeat(auto-fill, minmax(260px, 1fr))` is the responsive magic: "as many columns as fit, each at
  least 260px wide, sharing space equally." The grid reflows from 1 column on a phone to several on a
  desktop — **without a single media query**.

> **Rule of thumb:** Flexbox for a single row or column of items; Grid for a true two-dimensional
> layout. They work together — a Grid page with Flexbox inside each card.

## Lesson 4: Mobile-first responsive design

**Mobile-first** means you write the phone styles first (no media query), then *add* styles for larger
screens with **media queries**:

```css
/* Phone first: single column */
.menu-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}

/* Tablet and up */
@media (min-width: 640px) {
  .menu-grid { grid-template-columns: repeat(2, 1fr); }
}

/* Desktop and up */
@media (min-width: 1024px) {
  .menu-grid { grid-template-columns: repeat(3, 1fr); gap: 1.5rem; }
}
```

Common breakpoints: ~`640px` (tablet), ~`1024px` (desktop). Don't chase specific devices — add a
breakpoint whenever the layout starts to look cramped.

### Responsive images and type

```css
img {
  max-width: 100%;   /* never overflow the container */
  height: auto;      /* keep the aspect ratio */
  display: block;
}

h1 {
  font-size: clamp(1.8rem, 1.2rem + 3vw, 3rem); /* min, preferred, max — fluid */
}
```

- `max-width: 100%` on images stops them breaking the layout on small screens.
- `clamp(min, preferred, max)` makes a value scale smoothly with the screen and is great for headings.
- `srcset` (intro only) lets you offer different image sizes for different screens — look it up when
  you need it.

## Lesson 5: Common components + practice games

You now have the tools to build the pieces every site needs: a **navbar**, a **hero**, a **card grid**,
and a **footer**. For the mobile menu, a no-JavaScript pattern is a details/summary disclosure or a
simple wrapped nav — you'll add a JavaScript toggle later.

**Play these now** (they teach the properties fast):

- **Flexbox Froggy** — flexboxfroggy.com
- **Grid Garden** — cssgridgarden.com

> **Tip:** Use DevTools device toolbar (the phone icon, `Ctrl+Shift+M`) to preview your site at 360px,
> 768px and 1280px without resizing your window.

## Common mistakes

- Putting `display: flex` on the items instead of the **container**.
- Fixed widths (`width: 1000px`) that overflow phones — use `max-width` and `%`/`fr` instead.
- Forgetting the `viewport` meta tag (then media queries seem not to work on phones).
- Designing desktop-first and cramming it onto mobile — start mobile-first.

## Practice Exercises

1. **Easy:** Turn your nav into a Flexbox row with `space-between` and a visible focus state.
2. **Easy:** Centre your hero content with Flexbox.
3. **Medium:** Lay out the menu as a responsive Grid that goes 1 → 2 → 3 columns.
4. **Medium:** Make all images responsive and fix any horizontal scrolling on mobile.
5. **Medium:** Use `clamp()` for your main headings.
6. **Stretch:** Build a footer with three columns on desktop that stack on mobile.
7. **Stretch:** Finish Flexbox Froggy and Grid Garden (all levels).

## Weekly Assignment — Portfolio Project 1 (Due Before Week 5)

Ship a **fully responsive Fresh Bites website** — your first portfolio piece.

Requirements:

1. All pages (Home, Menu, About, Contact) styled and **responsive**, tested at **360px, 768px and
   1280px** — no horizontal scrolling on mobile.
2. A Flexbox navbar and footer; a Grid menu layout.
3. Responsive images; fluid headings with `clamp()`.
4. A **README.md** in the repo: what the project is, a screenshot or two, the live link, and what you
   learned.
5. Published on GitHub Pages; **Lighthouse mobile** scores reported in the README (aim: Performance ≥ 90,
   Accessibility ≥ 95).

**Grading guide (100%):**

| Criteria | % |
|---|---|
| Correct, clean Flexbox and Grid layouts | 25 |
| Fully responsive at 360/768/1280; no mobile overflow | 25 |
| Responsive images and fluid type | 15 |
| README with screenshots, live link and Lighthouse scores | 15 |
| Published live; good commit history; cohesive brand | 20 |

**Definition of done:**

- [ ] Live on GitHub Pages; link in the README
- [ ] No horizontal scroll at 360px on any page
- [ ] Menu uses Grid; nav/footer use Flexbox
- [ ] README has screenshots, the live link, and Lighthouse mobile scores
- [ ] Lighthouse: Performance ≥ 90 and Accessibility ≥ 95 on mobile

## Mentoring Session Plan (90 min)

| Time | Activity |
|---|---|
| 0–10 | Review Week 3 styling and commits |
| 10–35 | Live: build a responsive navbar (Flexbox) and menu grid (Grid) together |
| 35–55 | Live: add media queries mobile-first; test in the device toolbar |
| 55–80 | Pair work: student makes their menu page responsive |
| 80–90 | Brief Portfolio Project 1; explain the README + Lighthouse requirement |

## Facilitator Notes

This is the first "portfolio" week — set the bar for READMEs and screenshots now, because every later
project repeats it. The classic confusion is flex properties on the wrong element; have students point
to "the container" out loud. Push mobile-first hard: make them resize to 360px *first*. If a learner is
struggling with Grid, `repeat(auto-fill, minmax(…, 1fr))` alone covers most of their needs — teach that
pattern well before the fancier Grid features.

## Self-Check Questions

1. When would you reach for Flexbox, and when for Grid?
2. What does `repeat(auto-fill, minmax(260px, 1fr))` do?
3. What does "mobile-first" mean in terms of media queries?
4. How do you stop an image from breaking a mobile layout?
5. What does `clamp()` give you that a fixed font size doesn't?
