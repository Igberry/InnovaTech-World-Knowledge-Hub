---
title: "React II: Routing, Forms & Data Fetching"
course: web-development
order: 10
week: 10
phase: "Tooling & React"
summary: "Add multiple pages with React Router, build controlled forms, fetch data, and ship a React app."
estimatedHours: 12
tools: ["Node.js", "Vite", "React", "React Router"]
---

**Goal:** Turn your single React page into a real multi-page app with **React Router**, **controlled
forms**, and **data fetching** — then ship **Portfolio Project 3**.

## Learning Objectives

By the end of this week you can:

- Add client-side routing with React Router (pages, links, layouts, 404)
- Build controlled forms with validation
- Fetch data in a component with `useEffect`, handling loading and errors
- Share state across pages with Context (introductory)
- Deploy a single-page app so refresh/deep links work

## Tools to Install This Week

React Router (installed per-project with npm).

## Pre-Session Resources (about 2 hours)

- Read: **reactrouter.com** → "Installation" and the tutorial; **react.dev** → "useEffect", "Reacting to input with state".
- Watch (search YouTube): *"Net Ninja React Router"* and *"Web Dev Simplified React forms"*.

## Lesson 1: React Router

A single-page app swaps content without a full reload. **React Router** maps URLs to components.
**Check `reactrouter.com` for the current install command and version** — the API below is the stable
declarative style that has worked across recent major versions.

```bash
npm install react-router-dom
```

```jsx
// main.jsx
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
```

```jsx
// App.jsx
import { Routes, Route, NavLink } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Menu from "./pages/Menu.jsx";
import Reservations from "./pages/Reservations.jsx";
import NotFound from "./pages/NotFound.jsx";

function App() {
  return (
    <>
      <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/menu">Menu</NavLink>
        <NavLink to="/reservations">Reservations</NavLink>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/reservations" element={<Reservations />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
```

- `<Routes>` holds `<Route>`s; each maps a `path` to an `element`.
- `<NavLink>`/`<Link>` navigate **without** reloading the page. `NavLink` can style the active link.
- `path="*"` is the catch-all 404 route.

## Lesson 2: Controlled forms

In React, a form input's value is driven by state — a **controlled component**:

```jsx
import { useState } from "react";

function Reservations() {
  const [form, setForm] = useState({ name: "", guests: 2 });
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.name.trim() === "") return setError("Please enter your name.");
    setError("");
    setDone(true);
    // (Week 11: save this to Supabase)
  };

  if (done) return <p>Thank you, {form.name}. Reservation received.</p>;

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name</label>
      <input id="name" name="name" value={form.name} onChange={handleChange} />

      <label htmlFor="guests">Guests</label>
      <input id="guests" name="guests" type="number" value={form.guests} onChange={handleChange} />

      {error && <p className="error">{error}</p>}
      <button type="submit">Reserve</button>
    </form>
  );
}
```

- Each input has `value` (from state) and `onChange` (updates state). One `handleChange` can update any
  field using `[e.target.name]`.
- Use `htmlFor` instead of `for` on labels (JSX, like `className`).

## Lesson 3: Fetching data with useEffect

`useEffect` runs code **after** render — perfect for fetching data when a component mounts:

```jsx
import { useState, useEffect } from "react";

function Weather() {
  const [temp, setTemp] = useState(null);
  const [status, setStatus] = useState("loading"); // loading | ready | error

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(
          "https://api.open-meteo.com/v1/forecast?latitude=4.92&longitude=6.26&current=temperature_2m"
        );
        if (!res.ok) throw new Error("Request failed");
        const data = await res.json();
        setTemp(data.current.temperature_2m);
        setStatus("ready");
      } catch {
        setStatus("error");
      }
    }
    load();
  }, []); // [] = run once, after the first render

  if (status === "loading") return <p>Loading weather…</p>;
  if (status === "error") return <p>Couldn't load the weather.</p>;
  return <p>Yenagoa: {temp}°C</p>;
}
```

- The **dependency array** `[]` means "run once". Values inside it, if any, re-run the effect when they
  change.
- Always track loading/error with state and show the right UI — just like Week 7.

> **Tip:** A **custom hook** (introductory) extracts reusable logic, e.g. `useWeather()` that returns
> `{ temp, status }`. You'll meet these more later; for now, know they exist.

## Lesson 4: Context for the cart (introductory)

Passing the cart through many layers of props gets tedious. **Context** shares state without "prop
drilling":

```jsx
import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const addToCart = (item) => setCart((c) => [...c, item]);
  return (
    <CartContext.Provider value={{ cart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
```

Wrap your app in `<CartProvider>` and any component can call `useCart()`. Keep state simple; reach for
Context only when prop-passing genuinely hurts.

## Lesson 5: Folder structure, accessibility, deployment

- **Structure:** `src/pages/` for route components, `src/components/` for reusable pieces,
  `src/hooks/` for custom hooks, `src/context/` for providers.
- **Accessibility in React:** still use labels, semantic elements, and visible focus — JSX doesn't
  change a11y rules.
- **Deploying a single-page app:** because routing is client-side, a host must send **all** paths to
  `index.html`, or a refresh on `/menu` gives a 404. Netlify/Vercel handle this automatically (or with a
  small redirect rule). On GitHub Pages, a common fix is a `404.html` that loads the app. Check your
  host's SPA docs.

## Common mistakes

- Forgetting to wrap the app in `<BrowserRouter>`.
- An uncontrolled input (value not tied to state) that "won't update".
- A `useEffect` fetch with the wrong dependency array causing infinite loops.
- Deploying an SPA without SPA routing, so deep links 404.

## Practice Exercises

1. **Easy:** Add React Router with Home and Menu pages and a nav.
2. **Easy:** Add a 404 route.
3. **Medium:** Build a controlled reservation form with validation.
4. **Medium:** Fetch the weather with `useEffect` and show loading/error states.
5. **Medium:** Style the active nav link with `NavLink`.
6. **Stretch:** Move the cart into Context and use it from two pages.
7. **Stretch:** Deploy the SPA so refreshing `/menu` works.

## Weekly Assignment — Portfolio Project 3 (Due Before Week 11)

Ship a **multi-page React Fresh Bites app** — your third portfolio piece.

1. Pages: Home, Menu, Cart, Reservations, About (React Router), plus a 404.
2. Controlled, validated reservation form.
3. Weather widget fetched with `useEffect` (loading/error states).
4. Cart shared via Context or lifted state; total shown.
5. Responsive (Tailwind). Deployed as an SPA (deep links work). README with screenshots + live link.

**Grading guide (100%):**

| Criteria | % |
|---|---|
| Routing with multiple pages + 404 | 20 |
| Controlled form with validation | 20 |
| Data fetching with `useEffect` + states | 20 |
| Shared cart (Context/lifted); total correct | 20 |
| Deployed SPA (deep links work); README | 20 |

**Definition of done:**

- [ ] Multiple routes work, including a 404
- [ ] Reservation form is controlled and validates
- [ ] Weather fetch shows loading, success, error
- [ ] Cart works across pages; total correct
- [ ] Deployed; refreshing a sub-page doesn't 404; README has live link

## Mentoring Session Plan (90 min)

| Time | Activity |
|---|---|
| 0–10 | Review the React components assignment |
| 10–35 | Live: add React Router, pages, nav and 404 |
| 35–55 | Live: build a controlled form; fetch with `useEffect` |
| 55–80 | Live: move the cart into Context |
| 80–90 | Brief Portfolio Project 3; cover SPA deployment |

## Facilitator Notes

Routing is usually smooth; controlled forms and `useEffect` dependency arrays are the sticking points.
Demo an infinite-loop `useEffect` (missing `[]`) so they recognise it. For SPA deployment, pre-check the
student's host and have the redirect/404 fix ready — a "works locally, 404 on refresh when deployed" bug
is demoralising if unexplained. Keep Context minimal; some learners are better served by lifted state for
one more week. Confirm the current React Router install command against reactrouter.com in session.

## Self-Check Questions

1. What does `<BrowserRouter>` provide, and what do `<Routes>`/`<Route>` do?
2. What makes a form input "controlled"?
3. What does the dependency array in `useEffect` control?
4. What problem does Context solve?
5. Why can a deployed single-page app 404 on refresh, and how do you fix it?
