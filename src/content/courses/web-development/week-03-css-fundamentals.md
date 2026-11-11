---
title: "CSS Fundamentals"
course: web-development
order: 3
week: 3
phase: "Foundations"
summary: "Style your site with CSS: selectors, the box model, colour, typography and variables."
estimatedHours: 11
tools: ["VS Code", "Chrome DevTools"]
downloads:
  - label: "Fresh Bites content kit"
    href: "/downloads/web-development/fresh-bites-content.zip"
---

**Goal:** Turn your plain HTML Fresh Bites site into a styled, branded site using CSS — colours,
typography, spacing and reusable classes.

HTML is the structure; **CSS** is the style. This week you make the site *look* like a real brand,
using the warm food palette in the content kit.

## Learning Objectives

By the end of this week you can:

- Link CSS to HTML and write rules with selectors
- Explain the cascade and specificity, and why they decide which style wins
- Use the box model (margin, border, padding, `box-sizing`) deliberately
- Build a colour palette and a type scale with good contrast
- Use CSS custom properties (variables) to keep styles consistent

## Tools to Install This Week

Nothing new. You'll lean heavily on **Chrome DevTools** to inspect and live-edit styles.

## Pre-Session Resources (about 2 hours)

- Read: **developer.mozilla.org** → "MDN CSS first steps", "MDN The box model", "MDN CSS specificity".
- Learn: **web.dev/learn** → "web.dev Learn CSS".
- Watch (search YouTube): *"Kevin Powell CSS for beginners"* and *"Kevin Powell box model"*.

## Lesson 1: Linking CSS and writing rules

Make a file `styles.css` next to your HTML and link it in the `<head>`:

```html
<link rel="stylesheet" href="styles.css" />
```

A CSS **rule** has a selector and declarations:

```css
h1 {
  color: #c8372d;        /* property: value; */
  font-size: 2rem;
}
```

- The **selector** (`h1`) chooses what to style.
- Each **declaration** (`color: #c8372d;`) sets one property. End every declaration with a semicolon.

> **Tip:** Keep all your CSS in one linked file, not sprinkled in `style=""` attributes. Separating
> structure (HTML) from style (CSS) is what keeps big sites maintainable.

## Lesson 2: Selectors

```css
p            { }   /* every <p> (element selector) */
.card        { }   /* every element with class="card" (class selector) */
#hero        { }   /* the element with id="hero" (id selector) */
nav a        { }   /* <a> inside <nav> (descendant) */
a:hover      { }   /* an <a> while hovered (pseudo-class) */
.btn:focus   { }   /* a .btn while focused */
```

- Use **classes** for almost everything — they're reusable (`class="btn"` on many buttons).
- Use **ids** rarely (they must be unique per page).
- **Pseudo-classes** like `:hover` and `:focus` style interaction states. Always style `:focus` so
  keyboard users can see where they are.

## Lesson 3: The cascade and specificity

When two rules target the same element, which wins? CSS decides by **specificity** and **order**:

1. More specific selectors win: id (`#hero`) beats class (`.card`) beats element (`p`).
2. If specificity ties, the **last** rule in the file wins.

```css
p        { color: black; }   /* specificity: low */
.intro   { color: gray;  }   /* beats the element rule */
#lead    { color: red;   }   /* beats the class rule */
```

> **Rule of thumb:** Keep specificity low and even — style with classes, avoid ids and `!important`.
> When styles "don't apply", open DevTools → Styles: it shows which rule won and which were overridden
> (struck through).

## Lesson 4: The box model

Every element is a box with four layers, from inside out: **content → padding → border → margin**.

```css
.card {
  box-sizing: border-box;   /* width includes padding + border — much easier to reason about */
  width: 300px;
  padding: 1rem;            /* space inside the border */
  border: 1px solid #eadfd3;
  margin: 1rem;            /* space outside the border, between elements */
}
```

- **Padding** is space *inside* the box (between content and border).
- **Margin** is space *outside* the box (between this box and others).
- Set `box-sizing: border-box` on everything so widths behave predictably:

```css
*,
*::before,
*::after {
  box-sizing: border-box;
}
```

Use DevTools → the **box model diagram** (bottom of the Styles panel) to see padding/border/margin on
any element.

## Lesson 5: Colour, typography and units

```css
:root {
  /* Fresh Bites palette (from the content kit) */
  --tomato: #c8372d;
  --tomato-dark: #9e2a22;
  --cream: #fff7ed;
  --charcoal: #2b2320;
  --leaf: #2e7d4f;
  --border: #eadfd3;
}

body {
  background: var(--cream);
  color: var(--charcoal);
  font-family: "Inter", system-ui, sans-serif;
  line-height: 1.6;
}

h1, h2, h3 {
  font-family: "Poppins", sans-serif;
  line-height: 1.2;
}
```

- **Colour** can be hex (`#c8372d`), `rgb(200 55 45)`, or `hsl(...)`. Keep strong contrast between text
  and background (check with Lighthouse / DevTools contrast tool).
- **Custom properties (variables)** live under `:root` and are reused with `var(--name)`. Change a
  colour once and it updates everywhere — exactly how this course's own site works.
- **Web fonts:** add Google Fonts with a `<link>` in your HTML `<head>` (search "Google Fonts Poppins"
  for the embed code), then use the font name in CSS.

### Units

| Unit | Meaning | Use for |
|---|---|---|
| `px` | fixed pixels | borders, small fixed sizes |
| `rem` | relative to the root font size | **font sizes, spacing** (scales well) |
| `em` | relative to the element's font size | spacing tied to text size |
| `%` | percent of the parent | fluid widths |
| `vw` / `vh` | percent of viewport width/height | full-screen sections |

> **Tip:** Prefer `rem` for font sizes and spacing. It respects the user's browser settings — better
> for accessibility than fixed pixels.

## Lesson 6: Backgrounds, borders, radius, shadows, transitions

```css
.btn {
  background: var(--tomato);
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 0.6rem 1.2rem;
  cursor: pointer;
  transition: background-color 0.15s ease;
}
.btn:hover {
  background: var(--tomato-dark);
}

.card {
  background: #fff;
  border: 1px solid var(--border);
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}
```

- `border-radius` rounds corners; `box-shadow` adds depth (keep it subtle).
- `transition` smoothly animates a change (here, the hover colour).
- `:hover` and `:focus` states make a site feel responsive to the user.

> **Common mistakes:** forgetting the semicolon, misspelling a property, or expecting margin to add
> space *inside* a box (that's padding). When a rule seems ignored, check DevTools — it's usually a
> typo or a more specific rule winning.

## Practice Exercises

1. **Easy:** Link a stylesheet and set the page background and text colour from the palette.
2. **Easy:** Define the palette as CSS variables under `:root` and use them.
3. **Medium:** Style the navigation: spacing, hover colour, and a visible `:focus` state.
4. **Medium:** Build a reusable `.btn` class and a `.card` class; apply them on the menu page.
5. **Medium:** Create a type scale: set sizes for `h1`, `h2`, `h3`, body and small text using `rem`.
6. **Stretch:** Use DevTools to live-tweak the menu cards until the spacing feels right, then copy the
   values into your CSS.
7. **Stretch:** Check text contrast with DevTools and adjust any pair that fails.

## Weekly Assignment (Due Before Week 4)

Style the **4-page Fresh Bites site** from Week 2 with a consistent brand:

1. A palette and type scale defined with CSS variables (use the kit's warm colours).
2. Reusable classes (`.btn`, `.card`, `.nav`) applied across all pages.
3. A styled header/nav, menu cards, a styled form, and a footer.
4. Visible focus states and good contrast throughout.
5. Still published on GitHub Pages.

**Grading guide (100%):**

| Criteria | % |
|---|---|
| CSS variables for palette; consistent colours across pages | 20 |
| Box model used well (readable spacing, `border-box`) | 20 |
| A clear type scale and readable typography | 20 |
| Reusable classes (not repeated inline styles); hover + focus states | 20 |
| Good contrast; cohesive brand; published live | 20 |

**Definition of done:**

- [ ] One linked `styles.css`; no inline `style=""` attributes
- [ ] Palette and type scale defined as `:root` variables
- [ ] `.btn` and `.card` reused across pages
- [ ] Every interactive element has a visible `:focus` style
- [ ] Contrast passes; site looks like one coherent brand; live on GitHub Pages

## Mentoring Session Plan (90 min)

| Time | Activity |
|---|---|
| 0–10 | Review Week 2 sites; look at commit history |
| 10–30 | Live: cascade & specificity demo in DevTools; fix a "why won't this apply?" bug |
| 30–50 | Live: build the box model + a `.card` together; set `border-box` globally |
| 50–75 | Pair work: student styles the nav and menu cards |
| 75–90 | Brief the assignment; show the DevTools contrast checker |

## Facilitator Notes

The two conceptual humps are specificity (demo it live in DevTools — seeing the struck-through rules
clicks for most students) and the margin-vs-padding distinction (use the DevTools box diagram). Steer
students away from `!important` and ids; insist on reusable classes now, because Week 4's layout work
assumes a clean class-based stylesheet. Watch for pixel-everything — nudge them toward `rem`.

## Self-Check Questions

1. When two rules target the same element, how does CSS decide which wins?
2. What is the difference between margin and padding?
3. What does `box-sizing: border-box` change, and why is it helpful?
4. Why use CSS variables instead of repeating colour values?
5. Why prefer `rem` over `px` for font sizes?
