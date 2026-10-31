# Medical Supply Catalog

A responsive React + Vite catalog of 30 medical supply items with live search, category filtering, a product detail modal, and a persistent wishlist backed by `localStorage`.

- **Repository:** https://github.com/jawadiftikhar-dev/medical-supply-catalog
- **Live Demo:** https://medical-supply-catalog.netlify.app/

---

## Project Overview

The Medical Supply Catalog is a front-end demo application built with React 19 and Vite. It loads a JSON dataset of medical supplies and renders them in a responsive CSS Grid. Users can search products by name, filter by category, open a product's detail modal, and add or remove items from a wishlist that persists across page reloads.

### Features

- Responsive CSS Grid (1 → 2 → 3 → 4 columns across mobile, tablet, and desktop)
- Case-insensitive search by product name, combined with the category filter
- Category dropdown auto-populated from unique categories in the data
- Accessible product modal (`role="dialog"`, `aria-modal`, focus trap, ESC to close, focus restored on close)
- Wishlist toggle from both the modal button and the heart icon on each card
- Wishlist persists via `localStorage` under the key `citycare-wishlist`
- Fully deployed on Netlify with automatic rebuilds on every push to `main`

---

## Tech Stack

- React 19
- Vite
- Plain CSS (Grid + custom properties)
- `localStorage` for wishlist persistence
- Netlify for hosting

---

## Setup (Local Development)

Clone the repository and run it locally:

```bash
git clone https://github.com/jawadiftikhar-dev/medical-supply-catalog.git
cd medical-supply-catalog
npm install
npm run dev