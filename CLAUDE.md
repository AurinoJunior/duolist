# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A grocery list web app built with Next.js 14 (App Router), TypeScript, Tailwind CSS, and Framer Motion. All UI text is in Brazilian Portuguese. Data persists in localStorage.

## Commands

```bash
yarn dev      # Start dev server at localhost:3000
yarn build    # Production build
yarn start    # Run production build
yarn lint     # ESLint via Next.js
```

No test framework is configured.

## Architecture

**State management**: A single custom hook (`hooks/useGroceryLists.ts`) owns all application state and exposes CRUD operations for lists and items. It syncs to localStorage via a storage abstraction layer (`lib/storage.ts`).

**Storage layer**: `lib/storage.ts` provides a `storage` object abstracting localStorage access and a `listHelpers` object for creating/updating list data structures. This layer is designed to be swapped for API calls in a future backend migration.

**Components**: All components are client-side (`'use client'`). The main page (`app/page.tsx`) composes three components:
- `ListSelector` — list switching, creation, sharing, archive/delete
- `AddItemForm` — item name input with 9-category grid selector
- `GroceryItemComponent` — draggable item with toggle, category display, delete

**Drag & drop**: Framer Motion's `Reorder.Group`/`Reorder.Item` handles item reordering on the main page.

**Types**: Domain types live in `types/index.ts` — `GroceryItem`, `GroceryList`, `Category`, `CategoryConfig`.

**Categories**: 9 fixed categories defined in `lib/constants.ts`, each with a value, label, color, and emoji.

## Conventions

- Path alias `@/*` maps to the project root
- Tailwind with custom color palette (orange, peach, cream) and DM Sans font
- Immutable state updates via spread operators
- `useCallback` for memoized hook functions
- React strict mode enabled
