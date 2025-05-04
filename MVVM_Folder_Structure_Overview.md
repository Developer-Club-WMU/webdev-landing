# Project Folder Structure & MVVM Architecture Overview

This project follows a **Model-View-ViewModel (MVVM)** architecture using Next.js 15 with the App Router. The folder structure has been carefully organized to separate concerns, enable scalability, and keep route definitions clean and maintainable.

---

## ✨ Key Changes

### 1. `src/features/`
We introduced the `features` directory to hold MVVM-structured components by feature (e.g., CommunityHero, NavigationContent, Sidebar, TopNav). Each folder typically contains:

- `ComponentName.tsx` → **View**
- `useComponentName.ts` → **ViewModel**
- `component-name.config.ts` → **Static config values**

This enables logic reuse, testing, and readability.

---

### 2. `src/app/(public|client|member|officer)/`
We adopted **route groups** in the App Router:

- `(public)` → Routes available to everyone
- `(client)` → Routes for clients consuming software
- `(member)` → Internal member-facing routes
- `(officer)` → Admin/officer-only views

This cleanly separates page-level routes by user role and makes layout scoping easier.

---

### 3. `src/models/`
This folder centralizes all shared **interfaces and types** like `SideBarLink`, `HeroDetails`, etc., to avoid duplication and maintain strong typing.

---

### 4. `src/state/`
This holds **application-level state management** logic:

- `sidebar/SideBarManager.ts` → Singleton manager class
- `observe/Observe.ts` → Generic observer implementation

Each state module exports its single instance from an `index.ts` for simple imports.

---

### 5. `src/styles/`
Holds global CSS and Tailwind configuration.

---

## ✅ MVVM Benefits

| Layer       | Responsibility                              | Example                         |
|-------------|----------------------------------------------|----------------------------------|
| **Model**   | Data shape, interfaces                       | `models/index.ts`               |
| **View**    | UI components, markup                        | `CommunityHero.tsx`             |
| **ViewModel** | State, logic, derived props                 | `useTopNav.ts`, `useSideBar.ts` |
| **Config**  | Static props, layout strings, class tokens   | `top-nav.config.ts`             |

### Why MVVM?
- **Separation of concerns:** Easy to reason about logic vs presentation
- **Component-level reuse:** Hooks and configs stay portable
- **Scalability:** Large projects stay organized

---

## ✅ Import Map Convention

Aliased imports like `@/features/public/...` and `@/models` avoid brittle relative paths and ensure modular access.

---

## Example: `TopNav`

```
TopNav/
├── TopNav.tsx              # View
├── useTopNav.ts            # ViewModel
└── top-nav.config.ts       # Config
```

---

## 🧩 Final Notes

- Every folder under `features/` is grouped by **component feature**
- Every component is isolated and prepared for testing or extension
- `app/` focuses on routing only — not on logic or structure to some extent

This structure will serve well for both **rapid prototyping** and **long-term maintainability**.