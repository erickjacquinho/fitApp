# Design: Meal Card Skeleton (Revised)

## 1. Context
The user identified that rendering `DailyBalance` immediately while `MealCard`s resolve their individual `foods` caused a progressive render (flicker). We need a synchronous reveal of all content once all async sub-queries (`items` and `foods` for all `meals`) are complete.

## 2. Architecture Updates
- **Hooks:**
  - Update `useMenu` to receive `selectedDate`. It will reset an `isReady` state to `false` whenever `selectedDate` changes.
  - `useMenu` will perform the async fetch of all `items` and `foods` to calculate `dailyMacros`. Once this deep fetch finishes, it will set `isReady` to `true`.
- **Components:**
  - `MenuScreenComponent` will read `isReady` from `useMenu`.
  - While `!isReady` or `meals.length === 0`, it will render a comprehensive skeleton layout (including a placeholder for `DailyBalance` and 2-3 `MealCard`s).
  - Once `isReady` is true, the entire layout (`DailyBalance` + `FlatList`) reveals synchronously. Since the WatermelonDB cache is warm from `useMenu`'s fetch, `MealCardContent` will render its foods instantly.

## 3. Pillar Validation
- **Security:** N/A.
- **Maintainability:** Using `useMenu` as the central coordinator for data readiness keeps the UI components clean and declaratively reactive.
- **Scalability:** Prevents double-fetching overhead since WatermelonDB's local cache resolves identical fetches synchronously.
