# 📄 Invoice Management App

A full‑stack responsive invoice application built with **React + TypeScript + Vite**.  
It allows users to create, read, update, delete, and filter invoices, save drafts, mark invoices as paid, and toggle between light/dark themes. All data is persisted via localStorage.

**Live Demo:**  
https://invoice-management-app-flax.vercel.app/

**Repository:**  
[https://github.com/Bensonisaiah/Invoice-Management-App](https://github.com/Bensonisaiah/Invoice-Management-App)

---

## 🛠️ Setup Instructions

1. **Clone the repository**

   ```bash
   git clone https://github.com/Bensonisaiah/Invoice-Management-App.git
   cd Invoice-Management-App
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Run the development server**

   ```bash
   npm run dev
   ```

   The app will open at `http://localhost:5173` (or the URL shown in your terminal).

4. **Build for production**
   ```bash
   npm run build
   npm run preview   # preview the production build locally
   ```

> **Note:** No backend or API keys are required. The app uses **localStorage** for data persistence.

---

## 🧱 Architecture Explanation

### Tech Stack

- **React** (with hooks and context)
- **TypeScript** for type safety
- **Vite** as the build tool
- **CSS Modules / Tailwind** (replace with your actual styling method)
- **React Router** for client‑side routing
- **localStorage** for persisting invoices and theme preference

### Folder Structure (simplified)

```
src/
├── components/
│   ├── InvoiceList/
│   ├── InvoiceDetail/
│   ├── InvoiceForm/
│   ├── StatusBadge/
│   ├── Filter/
│   ├── ThemeToggle/
│   ├── Modal/
│   └── ...
├── context/
│   └── ThemeContext.tsx         # light/dark theme provider
├── hooks/
│   └── useInvoices.ts          # custom hook for CRUD + filtering + persistence
├── data/
│   └── storage.ts              # localStorage helpers (get/set invoices, theme)
├── App.tsx
└── main.tsx
```

### Data Flow

- **Invoices state:** `useInvoices` is the single source of truth. It handles:
  - Loading invoices from localStorage on mount
  - Adding, updating, deleting invoices
  - Filtering by status (draft, pending, paid)
  - Persisting to localStorage after every mutation
- **Theme state:** `ThemeContext` provides `light`/`dark` and a toggle function. The choice is saved to localStorage and applied globally.
- **Navigation:** React Router defines:
  - `/` – Invoice list page
  - `/invoice/:id` – Invoice detail page
  - `/new` → Create new invoice
  - `/edit/:id` → Edit an existing invoice
- **Forms:** `InvoiceForm` handles both creation and editing, with custom validation (required fields, email format, at least one item, positive numbers). Errors are displayed inline and prevent submission.
- **Persistence layer:** All storage operations go through a `storage.ts` module, making it easy to swap localStorage for IndexedDB or a backend API later.

---

## ⚖️ Trade-offs & Decisions

| Decision                           | Why                                                     | Trade‑off                                                                      |
| ---------------------------------- | ------------------------------------------------------- | ------------------------------------------------------------------------------ |
| **localStorage**                   | Zero setup, perfect for a demo, no server needed.       | Data is lost if the browser storage is cleared; no multi‑user support.         |
| **React Context for theme**        | Simple and sufficient for theme toggling.               | Not ideal for high‑frequency global state (but it isn't needed here).          |
| **Custom validation (no library)** | Keeps bundle small, full control over error states.     | For very complex forms, React Hook Form + Yup would reduce boilerplate.        |
| **No state management library**    | A custom hook (`useInvoices`) keeps things lightweight. | Scaling to many more interconnected features might call for Zustand/Redux.     |
| **CSS Modules / Tailwind**         | Chosen for maintainable, scoped styles.                 | (Replace with your actual styling choice – e.g. styled‑components, plain CSS.) |

---

## ♿ Accessibility Notes

- **Semantic HTML:** `<header>`, `<main>`, `<nav>`, `<section>`, `<form>`, and appropriate list elements are used.
- **Form labels:** Every input has a visible `<label>` linked with `htmlFor`/`id`.
- **Buttons:** All interactive elements are real `<button>` elements, not `<div>` or `<span>`.
- **Modal:**
  - Focus is trapped inside while open.
  - `Escape` key closes the modal.
  - Includes `role="dialog"`, `aria-modal="true"`, and background is hidden from screen readers (`aria-hidden`).
- **Keyboard navigation:** Full tab order, Enter/Space activation, visible focus indicators.
- **Color contrast:** Both themes meet WCAG AA standards (verified with WebAIM's contrast checker).
- **Focus styling:** Outlines are not removed; keyboard users can easily see where they are.

---

## ✨ Improvements Beyond Core Requirements

1. **Smooth transitions** – Theme changes and modal open/close are animated for a better feel.
2. **Responsive refinements** – On mobile the invoice list becomes a card layout; forms stack vertically for easier input.
3. **Delete confirmation modal** – Prevents accidental removal, with keyboard support.
4. **Empty state handling** – Dedicated illustrations/messages when no invoices match a filter.
5. **TypeScript** – Entire codebase is typed, reducing runtime errors and improving developer experience.
6. **PWA ready (if applicable)** – Basic manifest and service worker included, so the app can work offline in read‑only mode (if implemented).

---

## 👨‍💻 Author

Built by **Isaiah**  
[GitHub](https://github.com/Bensonisaiah)
