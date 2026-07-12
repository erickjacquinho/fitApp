# Implementation Tasks: Histórico de Treino Redesign

## Phase 1: Core Components (UI)
- [x] **Task 1.1: Locate and Audit Existing Component**
  - Locate the current list item used in the workout history (e.g., `WorkoutHistoryItem` or similar).
  - Identify the data model it consumes to ensure all required fields (Program Name, Sets) are available in the GraphQL/WatermelonDB fetch.
  - *Skill:* `grep_search` / Codebase audit.

- [x] **Task 1.2: Refactor List Container to Grouped Box Pattern**
  - Update the parent `FlatList` / `FlashList` wrapper to pass `index` and `data.length` into the list item.
  - Ensure the screen uses `<Screen scrollable={false}>` if it's wrapping a full-page list.
  - *Skill:* `ui-ux-designer` / React Native implementation.

- [x] **Task 1.3: Build `WorkoutHistoryItem` Layout & Styling**
  - Apply conditional border radii and bottom borders based on `isFirst` and `isLast`.
  - Implement a `Pressable` / `TouchableHighlight` with `active:opacity-80` state.
  - Construct the layout rows:
    - **Row 1:** Workout Name (`text-base font-medium text-primary`).
    - **Row 2:** Program Name (`text-sm text-secondary`).
    - **Row 3:** Date on the left, Duration and Sets on the right (`text-sm text-secondary`).
  - Keep the existing chevron/action icon in the rightmost position (`aria-hidden={true}`).
  - *Skill:* `ui-ux-designer` / Tailwind.

## Phase 2: Data Formatting & Accessibility
- [x] **Task 2.1: Implement Date & Duration Formatters**
  - Update or create a helper to format the date correctly ("quinta, 02 de julho" vs "02 de julho, 2026").
  - Update or create a helper to format duration (`d:hh:mm`).
  - *Skill:* TypeScript / Data logic.

- [x] **Task 2.2: Apply A11y Strings**
  - Create an aggregated `accessibilityLabel` for the item container combining all data points so it reads as a single sentence for screen readers.
  - *Skill:* `ui-ux-designer` / A11y.

## Phase 3: Validation
- [x] **Task 3.1: Visual and Functional Smoke Test**
  - Validate the `isFirst` and `isLast` border radius visually.
  - Ensure touch targets are at least 44px.
  - Run TypeScript compiler and ESLint (`npm run lint`, `npx tsc --noEmit`).
  - *Skill:* `ui-visual-validator` / Terminal.
