---
title: "React I: Components, Props & State"
course: web-development
order: 9
week: 9
phase: "Tooling & React"
summary: "Build user interfaces with React: components, JSX, props, state and the useState hook."
estimatedHours: 12
tools: ["Node.js", "Vite", "React"]
---

**Goal:** Learn React - the most popular way to build web interfaces - by rebuilding the Fresh Bites
menu and cart as reusable **components** with **props** and **state**.

React lets you build complex UIs out of small, reusable pieces and keeps the screen in sync with your
data automatically. It's the biggest skill of the course for employability.

## Learning Objectives

By the end of this week you can:

- Explain why React exists and what a component is
- Write components with JSX, and pass data with props
- Hold changing data with the `useState` hook
- Render lists with keys and show things conditionally
- Lift state up so components share data (menu → cart)

## Tools to Install This Week

Node.js and Vite (you'll scaffold a React project with Vite).

## Pre-Session Resources (about 2 hours)

- Learn: **react.dev** → "Quick Start" and "Describing the UI" / "Adding Interactivity".
- Watch (search YouTube): *"Web Dev Simplified learn React in X"* and *"Net Ninja React tutorial"*.

## Lesson 1: Why React, and components

As pages grow, hand-writing DOM updates (Week 6) gets messy. **React** flips it around: you describe
what the UI should look like for the current data, and React updates the page for you.

The building block is a **component** - a function that returns UI. Create a React project with Vite:

```bash
npm create vite@latest fresh-bites-react
# choose: React, then JavaScript
cd fresh-bites-react
npm install
npm run dev
```

Your first component:

```jsx
function Welcome() {
  return <h1>Welcome to Fresh Bites</h1>;
}

export default Welcome;
```

- A component is a **function whose name starts with a capital letter** and returns markup.
- You use it like a tag: `<Welcome />`.

## Lesson 2: JSX

The markup in React is **JSX** - HTML-like syntax inside JavaScript. A few rules differ from HTML:

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

- Use **`className`** instead of `class` (because `class` is a JavaScript keyword).
- `{ }` lets you insert JavaScript values/expressions.
- A component must return **one** top-level element (wrap siblings in a `<div>` or an empty `<>…</>`).
- Close every tag, including `<img />` and `<br />`.

## Lesson 3: Props - passing data in

**Props** pass data from a parent component to a child, like function arguments:

```jsx
function MenuItem({ name, price }) {
  const naira = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
  }).format(price);

  return (
    <article className="menu-item">
      <h3>{name}</h3>
      <p>{naira}</p>
    </article>
  );
}

// Use it with props:
<MenuItem name="Suya Platter" price={2500} />
```

- Destructure props in the parameter list: `function MenuItem({ name, price })`.
- Pass strings in quotes and other values in braces: `price={2500}`.
- Props are **read-only** - a component never changes its own props.

## Lesson 4: Rendering lists with keys

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

- Use `.map()` to turn a data array into components.
- Give each a unique **`key`** (`key={item.id}`) so React can track them efficiently. Keys are
  required and must be stable and unique.

### Conditional rendering

```jsx
{cart.length === 0 ? <p>Your cart is empty.</p> : <Cart items={cart} />}
{item.spicy && <span className="tag">Spicy</span>}
```

## Lesson 5: State with useState

**State** is data that changes over time and should re-render the UI when it does. The `useState` hook
gives a component its own state:

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

- `useState(initial)` returns the current value and a **setter** function.
- Call the setter (`setCount(...)`) to change state - **never** assign directly. React then re-renders.
- Handle events with camelCase props: `onClick`, `onChange`, `onSubmit`.

> **Common mistakes:** mutating state directly (`cart.push(...)` then expecting a re-render - instead
> create a new array: `setCart([...cart, item])`); forgetting `key` on list items; lowercase component
> names (must be capitalised).

## Lesson 6: Lifting state up - the cart

When two components need the same data (the menu adds to the cart; the cart displays it), put the state
in their **common parent** and pass it down:

```jsx
function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (item) => setCart([...cart, item]);
  const removeFromCart = (index) =>
    setCart(cart.filter((_, i) => i !== index));

  return (
    <>
      <MenuList onAdd={addToCart} />
      <Cart items={cart} onRemove={removeFromCart} />
    </>
  );
}
```

The parent owns `cart`; children receive functions as props to update it. This "state lives up, data and
callbacks flow down" pattern is the heart of React.

> **Note:** `useEffect` (introduced next week) runs side effects - like fetching data or saving to
> `localStorage` - after render. For now, focus on components, props and `useState`.

## Practice Exercises

1. **Easy:** Make a `Welcome` component and render it in `App`.
2. **Easy:** Make a `MenuItem` component that takes `name` and `price` props.
3. **Medium:** Render the whole menu with `.map()` and keys.
4. **Medium:** Add a `useState` counter button.
5. **Medium:** Build a `CategoryFilter` that sets a `category` state and filters the menu.
6. **Medium:** Lift `cart` state to `App`; add and remove items.
7. **Stretch:** Show the cart total and an "empty cart" message conditionally.
8. **Stretch:** Add a "Spicy" tag that only shows for spicy items.

## Weekly Assignment (Due Before Week 10)

**Rebuild the Fresh Bites menu and cart as React components.**

1. Components: `MenuItem`, `MenuList`, `Cart`, `CategoryFilter`.
2. `cart` state lifted to `App`; add/remove works; total shown.
3. Category filter with state.
4. A short written reflection (in the README): how did React compare to the Week 7 vanilla JS version?
5. Committed; (optional) deployed.

**Grading guide (100%):**

| Criteria | % |
|---|---|
| Well-structured components with props | 25 |
| Correct `useState` (no direct mutation) | 25 |
| List rendering with keys; conditional rendering | 20 |
| Lifted cart state; add/remove/total work | 20 |
| Reflection + clean commits | 10 |

**Definition of done:**

- [ ] Menu and cart work as React components
- [ ] State is updated only via setters (no mutation)
- [ ] Lists use stable `key`s
- [ ] Cart add/remove and total work
- [ ] README includes the vanilla-vs-React reflection

## Mentoring Session Plan (90 min)

| Time | Activity |
|---|---|
| 0–10 | Review the Vite + Tailwind app |
| 10–30 | Live: scaffold React with Vite; build `MenuItem` + props |
| 30–55 | Live: `useState` counter, then render the menu list with keys |
| 55–80 | Live: lift cart state; add/remove together |
| 80–90 | Brief the assignment |

## Facilitator Notes

The two things that trip beginners: direct state mutation (drill "new array/object, then set") and
"where should this state live?" (teach: in the lowest common parent). Keep components tiny at first.
Don't introduce `useEffect`, context or TypeScript yet - resist scope creep; props + `useState` +
lifting state is plenty for one week. Have them say out loud "props flow down, state lives up".

## Self-Check Questions

1. What is a component, and what must its name start with?
2. How do props differ from state?
3. Why must each item in a mapped list have a `key`?
4. Why can't you change state with a direct assignment like `cart.push(item)`?
5. What does "lifting state up" mean, and when do you do it?
