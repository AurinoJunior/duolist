# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A grocery list web app built with Next.js 14 (App Router), TypeScript, Tailwind CSS, and Framer Motion. All UI text is in Brazilian Portuguese. Data persists in localStorage. Design inspired by Headspace's minimalist aesthetic.

## Commands

```bash
yarn dev        # Start dev server at localhost:3000
yarn build      # Production build
yarn start      # Run production build
yarn lint       # Biome.js
yarn typecheck  # TypeScript type checking
```

No test framework is configured.

## Architecture

### State Management (Hierarchical Hook Composition)

State is split across four hooks with clear separation of concerns:

- **`hooks/useLists.ts`** — Facade hook. Composes all hooks, manages `lists[]` and `activeListId`, exposes public API with only non-archived lists to components.
- **`hooks/useListsStorage.ts`** — Side effects only. Loads from localStorage on mount, saves on every `lists` change. Returns `isLoaded` boolean for hydration safety.
- **`hooks/useListActions.ts`** — List CRUD: `selectList`, `createList`, `archiveList`, `deleteList`. Calls `storage.setActiveListId()` synchronously to avoid race conditions.
- **`hooks/useItemActions.ts`** — Item CRUD: `addItem`, `updateItem`, `removeItem`, `reorderItems`. All operations call `listHelpers.touchList()` to update timestamps.

All hook functions use `useCallback`. All state updates are immutable (spread operators).

### Storage Layer (`lib/storage.ts`)

Two exported objects:

- **`storage`** — localStorage abstraction: `getLists`, `saveLists`, `getActiveListId`, `setActiveListId`, `clear`. All methods guard against SSR with `typeof window === "undefined"` checks.
- **`listHelpers`** — Data factories: `createList(name)` returns a new `TList` with UUID/defaults; `touchList(list)` updates `updatedAt`.

Storage keys defined in `lib/constants.ts` as `STORAGE_KEYS` (`as const`): `LISTS = "grocery_lists"`, `ACTIVE_LIST = "active_list_id"`.

This layer is designed to be swapped for API calls in a future backend migration.

### Components

All components are client-side (`'use client'`). Structure:

```
app/page.tsx          # Orchestrator — composes all components, consumes useLists
app/arquivados/page.tsx  # Archived lists page (stub, under development)

components/
  Header.tsx          # Logo, archive link, tagline — stateless, animated
  ListSelector.tsx    # Dropdown for list switching, creation, archive/delete
  ItensList.tsx       # Drag-drop container (Reorder.Group), completion counter
  AddItemForm.tsx     # Toggle form with item input + 3×3 category grid
  Item.tsx            # Draggable item: checkbox, name, category, delete
  Footer.tsx          # Attribution — stateless
  Loading.tsx         # Full-screen spinner (shown while isLoaded is false)
```

**Drag & drop**: Framer Motion's `Reorder.Group`/`Reorder.Item` on the Y-axis. Items sorted by `order` field. `reorderItems` updates all `order` values on drop.

### Types (`types/index.ts`)

```typescript
TCategory   // Union of 9 fixed strings
TItem       // { id, name, category, completed, order, createdAt }
TList       // { id, name, items, createdAt, updatedAt, isArchived }
CategoryConfig  // { value, label, color, emoji }
```

### Categories (`lib/constants.ts`)

9 fixed categories exported as `CATEGORIES: CategoryConfig[]`:
`frutas, verduras, carnes, laticínios, grãos, bebidas, limpeza, higiene, outros`
Each has a Portuguese label, hex color, and emoji.

## Conventions

### Naming
- **Types**: `T` prefix — `TList`, `TItem`, `TCategory`
- **Components**: PascalCase, filename matches export exactly
- **Hooks**: `use` prefix, named by responsibility (`useListActions`, `useItemActions`)
- **Props interfaces**: `{ComponentName}Props`
- **Constants**: `UPPER_SNAKE_CASE`, use `as const` for key maps
- **State booleans**: `is` prefix — `isLoaded`, `isOpen`, `isCreating`
- **Action functions**: verb-first — `createList`, `addItem`, `removeItem`

### Code Style
- Path alias `@/*` maps to project root
- Code quality: **Biome** (linter + formatter), tab indentation
- Immutable state updates via spread operators (`prev.map(...)`, `[...prev, newItem]`)
- `useCallback` for all hook functions with explicit dependency arrays
- React strict mode enabled
- No direct localStorage access outside `lib/storage.ts`

### Styling
- Tailwind CSS with custom palettes: **orange**, **peach**, **cream** (9 shades each)
- DM Sans font via Google Fonts (`--font-dm-sans` CSS variable)
- CSS variables in `globals.css`: `--color-orange`, `--color-peach`, `--color-mint`, `--color-cream`
- Common patterns: `rounded-xl`/`rounded-2xl`, `shadow-md`/`shadow-xl`, `transition-all duration-200`
- Custom scrollbar (webkit) and autofill override in `globals.css`

### Animations (Framer Motion)
- Entrance: `initial={{ opacity: 0, y: ±20 }}` → `animate={{ opacity: 1, y: 0 }}` with staggered delays
- Exit: `exit={{ opacity: 0, x: -100 }}`
- Interactive: checkbox scale, chevron rotate, button `hover:scale-[1.02]`
- `AnimatePresence` wraps conditional renders (form toggle, item list)
- `layout` prop on `Reorder.Item` for smooth drag reordering

## Data Flow

```
Mount → useListsStorage loads localStorage → sets lists + activeListId → isLoaded = true
User action → useListActions/useItemActions mutates lists state
lists state change → useListsStorage effect → storage.saveLists() → localStorage
```

## Key Files at a Glance

| File | Purpose |
|------|---------|
| `hooks/useLists.ts` | Public API facade for components |
| `hooks/useListsStorage.ts` | localStorage sync (load + persist) |
| `hooks/useListActions.ts` | List CRUD (select, create, archive, delete) |
| `hooks/useItemActions.ts` | Item CRUD (add, update, remove, reorder) |
| `lib/storage.ts` | localStorage abstraction + list data factories |
| `lib/constants.ts` | CATEGORIES array + STORAGE_KEYS |
| `types/index.ts` | All domain types |
| `app/page.tsx` | Home page orchestrator |
| `components/ListSelector.tsx` | Dropdown with click-outside, keyboard support |
| `components/ItensList.tsx` | Reorder.Group container + empty state |
| `components/AddItemForm.tsx` | Toggle form + 3×3 category grid |
| `components/Item.tsx` | Draggable item with animated checkbox |

## Known Gaps / In Progress

- `app/arquivados/page.tsx` is a stub — archived lists display not implemented
- No test framework configured
- No backend/API integration (storage layer ready to be swapped)
