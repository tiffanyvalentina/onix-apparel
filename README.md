# ONIX APPAREL - Dummy Clothing Retail Website

A modern, responsive dummy clothing retail website built with **React**, **TypeScript**, **Vite**, and **Tailwind CSS**, powered by the **Fake Store API** (`https://fakestoreapi.com`).

---

## ✨ Features

- **Fake Store API Integration**:
  - Live data fetching for clothing & apparel (`men's clothing`, `women's clothing`, and fine jewelry accessories).
  - High-res images, real rating statistics, and product descriptions.
  - Built-in resilient fallback dataset in case of network outages or API rate limits.
- **Modern E-Commerce Aesthetic**:
  - Clean editorial fashion layout with subtle typography, badges (*New Season*, *Popular*), and responsive grid.
  - Interactive hero banner with CTA quick links, trust badges, and top promotional banner.
- **Product Filtering, Search & Sorting**:
  - Instant category filtering (*All Items*, *Women's Collection*, *Men's Collection*, *Fine Jewelry*).
  - Real-time instant search across titles, descriptions, and categories.
  - Dynamic price range slider (filter up to custom maximum price).
  - Multi-criteria sorting (*Featured/Popular*, *Price: Low to High*, *Price: High to Low*, *Highest Rated*, *New Arrivals*).
- **Interactive Product Detail Modal**:
  - High-res image showcase.
  - Apparel size selector (`XS`, `S`, `M`, `L`, `XL`, `XXL`).
  - Color swatch selector with realistic swatches.
  - Stock indicator and quantity picker.
- **Slide-Over Shopping Bag (Cart)**:
  - Dynamic slide-out drawer from the right.
  - Free shipping progress bar (e.g. *Add $X more for Free Express Shipping!*).
  - Quantity increment/decrement and item removal.
  - Promo code discounts (supports `SAVE20` for 20% off, `WELCOME10` for 10% off, and `FREESHIP`).
  - Automatic calculation of subtotal, discounts, shipping, and sales tax.
  - LocalStorage persistence.
- **Wishlist & Favorites Drawer**:
  - Heart toggle on every product card.
  - Persistent saved items list with quick *Move to Bag* action.
- **Full Mock Checkout Flow**:
  - Step 1: Shipping and delivery address form.
  - Step 2: Dummy secure payment options.
  - Step 3: Order Confirmation with celebration confetti (`canvas-confetti`), generated Order ID (`ONX-XXXXXX`), and itemized receipt breakdown.
- **Toast Notifications**:
  - Instant floating feedback for bag and wishlist updates.

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn

### Installation & Running Locally

1. Navigate to the project directory:
   ```bash
   cd clothing-store
   ```

2. Install dependencies (if not already installed):
   ```bash
   npm install
   ```

3. Start the Vite development server:
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser.

4. Build for production:
   ```bash
   npm run build
   ```

5. Preview the production build:
   ```bash
   npm run preview
   ```

---

## 🏷️ Demo Promo Codes

Try entering these codes in your shopping bag:
- `SAVE20` — 20% off total order
- `WELCOME10` — 10% off new customer discount
- `FREESHIP` — Free express shipping on any order value
