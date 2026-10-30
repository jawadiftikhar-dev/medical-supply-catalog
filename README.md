# Medical Supply Catalog

A responsive React + Vite catalog of 30 medical supply items with live search, category filtering, a detail modal, and a persistent wishlist backed by `localStorage`.

## Live Demo

**https://YOUR-SITE-NAME.netlify.app**

> Replace the URL above with your actual Netlify deployment link after the first deploy.

## Features

- Responsive CSS Grid (1 → 2 → 3 → 4 columns across mobile/tablet/desktop)
- Case-insensitive search by product name
- Category dropdown filter (combined with search)
- Product detail modal with focus trap, ESC/close-button dismissal, and ARIA roles
- Wishlist toggle from both the modal and the grid card heart icon
- Wishlist persists across reloads via `localStorage` under the key `citycare-wishlist`

## Setup

```bash
git clone https://github.com/YOUR_USERNAME/medical-supply-catalog.git
cd medical-supply-catalog
npm install
npm run dev