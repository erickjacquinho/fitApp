# Tasks: Diet Meals Refactoring

## 1. Types & Services
- [x] 1.1 Create Macro Calculation Utilities
  - **Target:** `src/features/diet/utils/macro-utils.ts`
  - **Source:** Design (3.1 Types, 3.2 Services)
  - **Trace:** AC 2.1 (Daily Balance), AC 2.4 (Meal Macros Summary), Edge Case 1
  - **Skill:** `frontend-developer`

## 2. Hooks
- [x] 2.1 Update `useMenu` hook
  - **Target:** `src/features/diet/hooks/useMenu.ts`
  - **Source:** Design (3.3 Hooks)
  - **Trace:** AC 2.1 (Daily Balance)
  - **Skill:** `frontend-developer`

## 3. Components
- [x] 3.1 Create `DailyBalance` component
  - **Target:** `src/features/diet/components/DailyBalance.tsx`
  - **Source:** Design (3.4 Components)
  - **Trace:** AC 2.1 (Daily Balance)
  - **Skill:** `frontend-developer`

- [x] 3.2 Create `FoodEntryCard` component
  - **Target:** `src/features/diet/components/FoodEntryCard.tsx`
  - **Source:** Design (3.4 Components)
  - **Trace:** AC 2.3 (Food Card)
  - **Skill:** `frontend-developer`

- [x] 3.3 Create `MealMacrosSummary` component
  - **Target:** `src/features/diet/components/MealMacrosSummary.tsx`
  - **Source:** Design (3.4 Components)
  - **Trace:** AC 2.4 (Meal Macros Summary)
  - **Skill:** `frontend-developer`

## 4. Integration
- [x] 4.1 Refactor `MenuScreen` and `MealCard`
  - **Target:** `src/features/diet/components/MenuScreen.tsx`
  - **Source:** Design (3.4 Components, 4. Technical Decisions)
  - **Trace:** AC 2.2 (Meal Menu Structure)
  - **Skill:** `frontend-developer`

## 5. Validation
- [x] 5.1 Type check and lint
  - **Target:** Terminal
  - **Command:** `npx tsc --noEmit && npm run lint` (or equivalent)
  - **Source:** Design (2. Maintainability)
  - **Trace:** Quality Gate
  - **Skill:** `frontend-developer`
