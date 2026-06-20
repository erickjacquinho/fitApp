# Tasks: Diet Header and Macros Redesign

## 1. Components
- [x] 1.1 Update `Header` component
  - **Skill:** `frontend-developer`
  - **Target:** `src/components/molecules/Header.tsx`
  - **Source:** `design.md` -> Header.tsx
  - **Trace:** AC1, AC2, AC3
  - **Details:** Add `headerLeft` and `headerRight` ReactNode props to render in place of empty views.

- [x] 1.2 Update `MainTabScreen` component
  - **Skill:** `frontend-developer`
  - **Target:** `src/components/organisms/main-tab-screen.tsx`
  - **Source:** `design.md` -> MainTabScreen
  - **Trace:** AC1, AC4
  - **Details:** Remove the eyebrow/title/description text block. Pass `headerLeft` and `headerRight` down to `<Header />`.

- [x] 1.3 Refactor `DailyBalance` layout
  - **Skill:** `frontend-developer`
  - **Target:** `src/features/diet/components/DailyBalance.tsx`
  - **Source:** `design.md` -> DailyBalance.tsx
  - **Trace:** AC5
  - **Details:** Adjust styling to render a 2x2 grid (4 equal quadrants) for Protein, Carbs, Fat, and Calories.

## 2. Integration
- [x] 2.1 Integrate Header Actions in Diet Tab
  - **Skill:** `frontend-developer`
  - **Target:** `app/(tabs)/diet.tsx` and `src/features/diet/components/MenuScreen.tsx`
  - **Source:** `design.md` -> Integration
  - **Trace:** AC1, AC2, AC3
  - **Details:** Move the `reorderModalVisible` state into `diet.tsx` OR move `MainTabScreen` inside `MenuScreen` so `MenuScreen` can control the header actions directly. Since `MenuScreen` needs the `meals` for reordering, it's simpler to move `MainTabScreen` wrapping into `MenuScreen.tsx` and remove it from `app/(tabs)/diet.tsx`. Render the left icon (e.g., `GripVertical` or `Menu`) and right icon (`Apple` or `Plus`).
  
## 3. Validation
- [x] 3.1 Type check and lint
  - **Skill:** `code-reviewer`
  - **Target:** Terminal
  - **Command:** `npx tsc --noEmit`
