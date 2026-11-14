---
title: "React I: Components, Props & State"
course: web-development
order: 9
week: 9
phase: "Tooling & React"
summary: "Learn React, the biggest employability skill of the course, by rebuilding your menu and cart as reusable components you can see update live."
estimatedHours: 12
tools: ["Node.js", "Vite", "React"]
---

**Goal:** Learn React, the most popular way to build web interfaces, by rebuilding the Fresh Bites menu and
cart as reusable **components** with **props** and **state**. You build small pieces and watch them snap
together. This is the single biggest skill for getting hired.

## What you'll be able to do

- Explain why React exists and what a component is
- Write components with JSX, and pass data with props
- Hold changing data with the `useState` hook
- Render lists with keys and show things conditionally
- Lift state up so components share data (menu to cart)

## Before you start (about 10 minutes)

- You'll scaffold a React project with Vite (Node + Vite from earlier weeks).
- Warm-up (2 minutes): open **react.dev**, find the live editor on the Quick Start page, and change the
  text in the example. Seeing React re-render instantly is the whole idea.

## Try it 1 - Create a React project and your first component

**Why it matters:** a component is a function that returns UI. Everything in React is made of these.

**Do this now:**

```bash
npm create vite@latest fresh-bites-react
# choose: React, then JavaScript
cd fresh-bites-react
npm install
npm run dev
```

Then write your first component:

```jsx
function Welcome() {
  return <h1>Welcome to Fresh Bites</h1>;
}

export default Welcome;
```

**You've got it when:** your `Welcome` component renders on the page. A component is a function whose name
**starts with a capital letter** and returns markup; you use it like a tag: `<Welcome />`.

## Try it 2 - Write JSX

**Why it matters:** JSX is HTML-like markup inside JavaScript, with a few rules of its own.

**Do this now:**

```jsx
function Card() {
  const name = "Jollof Rice";
  return (
    <article className="menu-item">
      <h3>{name}</h3>          {/* {} drops into JavaScript */}
      <p>Fresh and smoky.</p>
    </article>
  );
}
```

**You've got it when:** your card shows the value from the `name` variable. Remember the JSX rules: use
`className` (not `class`), wrap siblings in one parent (or `<>...</>`), close every tag, and `{ }` inserts
JavaScript.

## Try it 3 - Pass data in with props

**Why it matters:** props are how a parent sends data to a child, like function arguments. They make
components reusable.

**Do this now:**

```jsx
function MenuItem({ name, price }) {
  const naira = new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN" }).format(price);
  return (
    <article className="menu-item">
      <h3>{name}</h3>
      <p>{naira}</p>
    </article>
  );
}

// Use it:
<MenuItem name="Suya Platter" price={2500} />
```

**You've got it when:** the same `MenuItem` renders different dishes depending on the props you pass. Pass
strings in quotes and other values in braces (`price={2500}`). Props are read-only, a component never
changes its own props.

## Try it 4 - Render the whole menu with keys

**Why it matters:** mapping data to components is the React version of what you did in Week 6, cleaner and
automatic.

**Do this now:**

```jsx
import { menu } from "./menu-data.js";

function MenuList() {
  return (
    <div className="menu-grid">
      {menu.map((item) => (
        <MenuItem key={item.id} name={item.name} price={item.price} />
      ))}
    </div>
  );
}
```

Conditional rendering, show things only when they apply:

```jsx
{cart.length === 0 ? <p>Your cart is empty.</p> : <Cart items={cart} />}
{item.spicy && <span className="tag">Spicy</span>}
```

**You've got it when:** your whole menu renders from the array, and each item has a unique `key={item.id}`
(keys are required and must be stable and unique).

## Try it 5 - Add state with useState

**Why it matters:** state is data that changes and re-renders the UI. `useState` gives a component its own.

**Do this now:**

```jsx
import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);   // [value, setter]
  return (
    <button onClick={() => setCount(count + 1)}>
      Added {count} item(s)
    </button>
  );
}
```

**You've got it when:** clicking the button increases the number on screen. Call the setter (`setCount(...)`)
to change state, **never** assign directly, and handle events with camelCase props (`onClick`, `onChange`).

## Try it 6 - Lift state up to share the cart

**Why it matters:** when two components need the same data, the state lives in their common parent. This
"state up, data down" pattern is the heart of React.

**Do this now:**

```jsx
function App() {
  const [cart, setCart] = useState([]);
  const addToCart = (item) => setCart([...cart, item]);
  const removeFromCart = (index) => setCart(cart.filter((_, i) => i !== index));

  return (
    <>
      <MenuList onAdd={addToCart} />
      <Cart items={cart} onRemove={removeFromCart} />
    </>
  );
}
```

**You've got it when:** adding from the menu updates the cart, because both share state owned by `App`.
Notice `addToCart` creates a **new** array (`[...cart, item]`) rather than mutating the old one.

### Watch out for

- Mutating state directly (`cart.push(...)` won't re-render; use `setCart([...cart, item])`)
- Forgetting `key` on mapped list items
- Lowercase component names (they must be capitalised)
- Trying to change props (they're read-only)

## This week's build: menu and cart as React components

**Rebuild the Fresh Bites menu and cart as React components:**

1. Components: `MenuItem`, `MenuList`, `Cart`, `CategoryFilter`.
2. `cart` state lifted to `App`; add/remove works; total shown.
3. Category filter with state.
4. A short reflection in the README: how did React compare to the Week 7 vanilla JS version?
5. Committed; (optional) deployed.

### Grading guide

| Criteria | % |
|---|---|
| Well-structured components with props | 25 |
| Correct `useState` (no direct mutation) | 25 |
| List rendering with keys; conditional rendering | 20 |
| Lifted cart state; add/remove/total work | 20 |
| Reflection + clean commits | 10 |

### Definition of done

- [ ] Menu and cart work as React components
- [ ] State is updated only via setters (no mutation)
- [ ] Lists use stable `key`s
- [ ] Cart add/remove and total work
- [ ] README includes the vanilla-vs-React reflection

## Extra quick wins (optional)

- Build a `CategoryFilter` that sets a `category` state and filters the menu.
- Show the cart total and an "empty cart" message conditionally.
- Add a "Spicy" tag that only shows for spicy items.

## Mentoring Session Plan (90 min)

| Time | Activity |
|---|---|
| 0-10 | Review the Vite + Tailwind app |
| 10-30 | Live: scaffold React with Vite; build `MenuItem` + props |
| 30-55 | Live: `useState` counter, then render the menu list with keys |
| 55-80 | Live: lift cart state; add/remove together |
| 80-90 | Brief the build |

## Facilitator Notes

The two things that trip beginners: direct state mutation (drill "new array/object, then set") and "where
should this state live?" (teach: in the lowest common parent). Keep components tiny at first. Don't
introduce `useEffect`, context or TypeScript yet, resist scope creep; props + `useState` + lifting state is
plenty for one week. Have them say out loud "props flow down, state lives up".

## Can you do these now?

1. What is a component, and what must its name start with?
2. How do props differ from state?
3. Why must each item in a mapped list have a `key`?
4. Why can't you change state with a direct assignment like `cart.push(item)`?
5. What does "lifting state up" mean, and when do you do it?
