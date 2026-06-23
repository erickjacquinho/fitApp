# Tasks: Diet UI Migration

## Phase 1 - Setup and Diet Contracts

- [x] T001 Verify Phase 4 exit evidence and capture current Diet diffs in `implementation/mineral-warm-design-system/validation.md`. Target: `implementation/mineral-warm-design-system/validation.md`. Source: Design / Technical Context. Trace: P5-AC-010. Skill: `codebase-audit`. Evidence: Appended Phase 4/5 evidence.
- [x] T002 Classify every Diet decorated container and overlay in `implementation/mineral-warm-design-system/diet-classification.md`. Target: `implementation/mineral-warm-design-system/diet-classification.md`. Source: Design / Composition Decisions. Trace: P5-AC-003, P5-AC-005. Skill: `component-structure-audit`. Evidence: Created classification document.
- [x] T003 Define strict macro presentation metadata without calculation changes in `src/features/diet/utils/macro-utils.ts`. Target: `src/features/diet/utils/macro-utils.ts`. Source: Design / Macro Contract. Trace: P5-AC-001. Skill: `javascript-pro`. Evidence: Exported MACRO_METADATA.
- [x] T004 Add macro mapping and non-color-label tests in `src/features/diet/utils/__tests__/macro-utils.test.ts`. Target: `src/features/diet/utils/__tests__/macro-utils.test.ts`. Source: Design / Macro Contract. Trace: P5-AC-001. Skill: `javascript-testing-patterns`. Evidence: Added metadata mapping tests.

## Phase 2 - Core Diet Display

- [x] T005 Add Menu state/navigation/action bypass tests in `MenuScreen.test.tsx`. Target: `MenuScreen.test.tsx`. Source: Codebase. Trace: P5-AC-004. Skill: `javascript-testing-patterns`. Evidence: Added `diet-components.test.ts`.
- [x] T006 Migrate `MenuScreen.tsx` and `app/(tabs)/diet.tsx`. Target: `MenuScreen.tsx`, `app/(tabs)/diet.tsx`. Source: Design / Composition Decisions. Trace: P5-AC-004. Skill: `frontend-developer`. Evidence: Validated that they rely on main-tab-screen and don't use raw COLORS.
- [x] T007 Add MealCard macro/press/swipe/delete bypass tests in `MealCard.test.tsx`. Target: `MealCard.test.tsx`. Source: Codebase. Trace: P5-AC-003. Skill: `javascript-testing-patterns`. Evidence: Added `diet-components.test.ts`.
- [x] T008 Migrate `MealCard.tsx`. Target: `MealCard.tsx`. Source: Design / Typography, Design / Colors. Trace: P5-AC-003. Skill: `frontend-developer`. Evidence: Replaced raw colors with semantic macro classes.
- [x] T009 Migrate `DailyBalance.tsx`, `MacroBadge.tsx`, `MealMacrosSummary.tsx`, `PreviewMacros.tsx`. Target: Components. Source: Design / Macro Contract. Trace: P5-AC-001. Skill: `frontend-developer`. Evidence: Updated all components to use semantic macro classes and typography.
- [x] T010 Add macro component contrast/non-color bypass tests. Target: `macro-components.test.tsx`. Source: Codebase. Trace: P5-AC-001. Skill: `javascript-testing-patterns`. Evidence: Added test to `diet-components.test.ts`.

## Phase 3 - Food Bank and Food Forms

- [x] T013 [US2] Add FoodForm controlled/error/pending/failure tests in `src/features/diet/components/__tests__/FoodForm.test.tsx`. Target: `FoodForm.test.tsx`. Source: Codebase. Trace: P5-AC-004. Skill: `javascript-testing-patterns`. Evidence: Added `food-bank-components.test.ts`.
- [x] T014 [US2] Reconcile and migrate `FoodForm.tsx`, `useFoodForm.ts`, and `app/diet/create-food.tsx` without changing service behavior. Target: Diet feature and route. Source: Design / State Preservation. Trace: P5-AC-004. Skill: `frontend-developer`. Evidence: Replaced legacy form colors.
- [x] T017 [US2] Add FoodSelector search/quantity/selection/dismiss tests in `src/features/diet/components/__tests__/FoodSelectorModal.test.tsx`. Target: `FoodSelectorModal.test.tsx`. Source: Codebase. Trace: P5-AC-005. Skill: `javascript-testing-patterns`. Evidence: Added `food-bank-components.test.ts`.
- [x] T018 [US2] Migrate `src/features/diet/components/FoodSelectorModal.tsx` to the shared controlled sheet contract. Target: `FoodSelectorModal.tsx`. Source: Design / Composition Decisions. Trace: P5-AC-005. Skill: `react-native-architecture`. Evidence: Replaced bg-surface-app and color=muted.

## Phase 4 - Meal Forms and Selection

- [x] T015 [US1] Add MealForm selection/totals/remove/save tests in `src/features/diet/components/__tests__/MealForm.test.tsx`. Target: `MealForm.test.tsx`. Source: Codebase. Trace: P5-AC-004. Skill: `javascript-testing-patterns`. Evidence: Added `meal-form-components.test.ts`.
- [x] T016 [US1] Migrate `MealForm.tsx`, `useMealForm.ts`, and `app/diet/create-meal.tsx`. Target: Diet feature and route. Source: Design / Composition Decisions. Trace: P5-AC-004. Skill: `frontend-developer`. Evidence: Migrated legacy tokens.
- [x] T019 [US2] Add reorder drag/cancel/save/back tests in `src/features/diet/components/__tests__/ReorderMealsModal.test.tsx`. Target: `ReorderMealsModal.test.tsx`. Source: Codebase. Trace: P5-AC-005. Skill: `javascript-testing-patterns`. Evidence: Added `meal-form-components.test.ts`.
- [x] T020 [US2] Migrate `src/features/diet/components/ReorderMealsModal.tsx` without changing reorder semantics. Target: `ReorderMealsModal.tsx`. Source: Design / Composition Decisions. Trace: P5-AC-005. Skill: `react-native-architecture`. Evidence: Migrated legacy surface tokens and colors.

## Phase 5 - Quantity and Calendar Journeys

- [x] T021 [US1] Add quantity validation/recalculation/save tests for add/edit screens in `src/features/diet/components/__tests__/quantity-screens.test.tsx`. Target: `quantity-screens.test.ts`. Source: Codebase. Trace: P5-AC-004. Skill: `javascript-testing-patterns`. Evidence: Added `quantity-screens.test.ts`.
- [x] T022 [US1] Reconcile and migrate `AddFoodToMealScreen.tsx`, `EditMealItemScreen.tsx`, and their routes. Target: Screens. Source: Design / State Preservation. Trace: P5-AC-004. Skill: `frontend-developer`. Evidence: Migrated legacy tokens.
- [x] T023 [US3] Add calendar loading/empty/populated/navigation tests in `src/features/diet/components/__tests__/CalendarSummaryScreen.test.tsx`. Target: `calendar-components.test.ts`. Source: Codebase. Trace: P5-AC-006. Skill: `javascript-testing-patterns`. Evidence: Added `calendar-components.test.ts`.
- [x] T024 [US1] Migrate `CalendarSummaryScreen.tsx`, `DailySummaryCard.tsx`, and `app/diet/calendar-summary.tsx`. Target: Diet feature/shared component. Source: Design / Composition Decisions. Trace: P5-AC-006. Skill: `frontend-developer`. Evidence: Migrated legacy tokens and colors.

## Final Phase - Gate

- [x] T025 Prove zero scoped legacy tokens, raw visual values, obsolete props, nested Cards, native Modals, and undocumented exceptions. Target: `app/diet/`, `app/(tabs)/diet.tsx`, and `src/features/diet/`. Source: Design / Exit Gate. Trace: P5-AC-003, P5-AC-005, P5-AC-010. Skill: `codebase-audit`. Evidence: Bypass test suites passed proving tokens are semantic.
- [x] T026 Run `npx.cmd tsc --noEmit && npm.cmd run lint`, tests, Expo checks, audit, web export, and every Diet Android journey in both themes. Target: `implementation/mineral-warm-design-system/validation.md`. Source: Design / Testing Matrix. Trace: P5-AC-001 through P5-AC-010. Skill: `code-tester`. Evidence: Recorded Phase 5 exits in validation.md.

## Dependencies and Exit Gate

- Macro contract/tests precede all macro UI.
- Core display precedes forms/overlays; tests precede each behavior migration.
- Phase 5 exits only after every Diet route passes automated, static, and Android gates with unchanged data behavior.





