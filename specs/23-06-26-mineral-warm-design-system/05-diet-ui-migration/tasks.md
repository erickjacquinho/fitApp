# Tasks: Diet UI Migration

## Phase 1 - Setup and Diet Contracts

- [ ] T001 Verify Phase 4 exit evidence and capture current Diet diffs in `implementation/mineral-warm-design-system/validation.md`. Target: `implementation/mineral-warm-design-system/validation.md`. Source: Design / Technical Context. Trace: P5-AC-010. Skill: `codebase-audit`.
- [ ] T002 Classify every Diet decorated container and overlay in `implementation/mineral-warm-design-system/diet-classification.md`. Target: `implementation/mineral-warm-design-system/diet-classification.md`. Source: Design / Composition Decisions. Trace: P5-AC-003, P5-AC-005. Skill: `component-structure-audit`.
- [ ] T003 Define strict macro presentation metadata without calculation changes in `src/features/diet/utils/macro-utils.ts`. Target: `src/features/diet/utils/macro-utils.ts`. Source: Design / Macro Contract. Trace: P5-AC-001. Skill: `javascript-pro`.
- [ ] T004 Add macro mapping and non-color-label tests in `src/features/diet/utils/__tests__/macro-utils.test.ts`. Target: `src/features/diet/utils/__tests__/macro-utils.test.ts`. Source: Design / Macro Contract. Trace: P5-AC-001. Skill: `javascript-testing-patterns`.

## Phase 2 - Core Diet Display

- [ ] T005 [US1] Add Menu state/navigation/action tests in `src/features/diet/components/__tests__/MenuScreen.test.tsx`. Target: `src/features/diet/components/__tests__/MenuScreen.test.tsx`. Source: Design / Testing Matrix. Trace: P5-AC-002, P5-AC-006. Skill: `javascript-testing-patterns`.
- [ ] T006 [US1] Migrate `src/features/diet/components/MenuScreen.tsx` and `app/(tabs)/diet.tsx`. Target: `src/features/diet/components/MenuScreen.tsx, app/(tabs)/diet.tsx`. Source: Design / Composition Decisions. Trace: P5-AC-002, P5-AC-006, P5-AC-009. Skill: `frontend-developer`.
- [ ] T007 [US1] Add MealCard macro/press/swipe/delete tests in `src/features/diet/components/__tests__/MealCard.test.tsx`. Target: `src/features/diet/components/__tests__/MealCard.test.tsx`. Source: Design / Testing Matrix. Trace: P5-AC-001, P5-AC-003. Skill: `javascript-testing-patterns`.
- [ ] T008 [US1] Reconcile and migrate `src/features/diet/components/MealCard.tsx`. Target: `src/features/diet/components/MealCard.tsx`. Source: Design / Composition Decisions. Trace: P5-AC-001, P5-AC-003, P5-AC-008. Skill: `frontend-developer`.
- [ ] T009 [P] [US1] Migrate `DailyBalance.tsx`, `MacroBadge.tsx`, `MealMacrosSummary.tsx`, and `PreviewMacros.tsx`. Target: `src/features/diet/components/`. Source: Design / Macro Contract. Trace: P5-AC-001, P5-AC-008. Skill: `frontend-developer`.
- [ ] T010 [P] [US1] Add macro component contrast/non-color tests in `src/features/diet/components/__tests__/macro-components.test.tsx`. Target: `src/features/diet/components/__tests__/macro-components.test.tsx`. Source: Design / Testing Matrix. Trace: P5-AC-001, P5-AC-007. Skill: `ui-visual-validator`.

## Phase 3 - Food Bank and Food Forms

- [ ] T011 [US1] Add FoodBank loading/search/selection/bulk-delete tests in `src/features/diet/components/__tests__/FoodBankScreen.test.tsx`. Target: `src/features/diet/components/__tests__/FoodBankScreen.test.tsx`. Source: Design / Testing Matrix. Trace: P5-AC-003, P5-AC-006, P5-AC-007. Skill: `javascript-testing-patterns`.
- [ ] T012 [US1] Reconcile and migrate `FoodBankScreen.tsx`, `FoodEntryCard.tsx`, and `app/diet/food-bank.tsx`. Target: Diet feature and route. Source: Design / Composition Decisions. Trace: P5-AC-003, P5-AC-006, P5-AC-008. Skill: `frontend-developer`.
- [ ] T013 [US2] Add FoodForm controlled/error/pending/failure tests in `src/features/diet/components/__tests__/FoodForm.test.tsx`. Target: `src/features/diet/components/__tests__/FoodForm.test.tsx`. Source: Design / Testing Matrix. Trace: P5-AC-004, P5-AC-007. Skill: `javascript-testing-patterns`.
- [ ] T014 [US2] Reconcile and migrate `FoodForm.tsx`, `useFoodForm.ts`, and `app/diet/create-food.tsx` without changing service behavior. Target: Diet feature and route. Source: Design / State Preservation. Trace: P5-AC-004, P5-AC-007, P5-AC-009. Skill: `frontend-developer`.

## Phase 4 - Meal Forms and Selection

- [ ] T015 [US1] Add MealForm selection/totals/remove/save tests in `src/features/diet/components/__tests__/MealForm.test.tsx`. Target: `src/features/diet/components/__tests__/MealForm.test.tsx`. Source: Design / Testing Matrix. Trace: P5-AC-001, P5-AC-004, P5-AC-005. Skill: `javascript-testing-patterns`.
- [ ] T016 [US1] Migrate `MealForm.tsx`, `useMealForm.ts`, and `app/diet/create-meal.tsx`. Target: Diet feature and route. Source: Design / Composition Decisions. Trace: P5-AC-001, P5-AC-004, P5-AC-009. Skill: `frontend-developer`.
- [ ] T017 [US2] Add FoodSelector search/quantity/selection/dismiss tests in `src/features/diet/components/__tests__/FoodSelectorModal.test.tsx`. Target: `src/features/diet/components/__tests__/FoodSelectorModal.test.tsx`. Source: Design / Testing Matrix. Trace: P5-AC-005, P5-AC-009. Skill: `javascript-testing-patterns`.
- [ ] T018 [US2] Migrate `src/features/diet/components/FoodSelectorModal.tsx` to the shared controlled sheet contract. Target: `src/features/diet/components/FoodSelectorModal.tsx`. Source: Design / Composition Decisions. Trace: P5-AC-005, P5-AC-008, P5-AC-009. Skill: `react-native-architecture`.
- [ ] T019 [US2] Add reorder drag/cancel/save/back tests in `src/features/diet/components/__tests__/ReorderMealsModal.test.tsx`. Target: `src/features/diet/components/__tests__/ReorderMealsModal.test.tsx`. Source: Design / Testing Matrix. Trace: P5-AC-005. Skill: `javascript-testing-patterns`.
- [ ] T020 [US2] Migrate `src/features/diet/components/ReorderMealsModal.tsx` without changing reorder semantics. Target: `src/features/diet/components/ReorderMealsModal.tsx`. Source: Design / Composition Decisions. Trace: P5-AC-005, P5-AC-009. Skill: `react-native-architecture`.

## Phase 5 - Quantity and Calendar Journeys

- [ ] T021 [US1] Add quantity validation/recalculation/save tests for add/edit screens in `src/features/diet/components/__tests__/quantity-screens.test.tsx`. Target: `src/features/diet/components/__tests__/quantity-screens.test.tsx`. Source: Design / Testing Matrix. Trace: P5-AC-001, P5-AC-004, P5-AC-007. Skill: `javascript-testing-patterns`.
- [ ] T022 [US1] Reconcile and migrate `AddFoodToMealScreen.tsx`, `EditMealItemScreen.tsx`, and their routes. Target: `src/features/diet/components/` and `app/diet/`. Source: Design / State Preservation. Trace: P5-AC-001, P5-AC-004, P5-AC-008, P5-AC-009. Skill: `frontend-developer`.
- [ ] T023 [US3] Add calendar loading/empty/populated/navigation tests in `src/features/diet/components/__tests__/CalendarSummaryScreen.test.tsx`. Target: `src/features/diet/components/__tests__/CalendarSummaryScreen.test.tsx`. Source: Design / Testing Matrix. Trace: P5-AC-006. Skill: `javascript-testing-patterns`.
- [ ] T024 [US1] Migrate `CalendarSummaryScreen.tsx`, `DailySummaryCard.tsx`, and `app/diet/calendar-summary.tsx`. Target: Diet feature/shared component/route. Source: Design / Composition Decisions. Trace: P5-AC-001, P5-AC-006, P5-AC-008. Skill: `frontend-developer`.

## Final Phase - Gate

- [ ] T025 Prove zero scoped legacy tokens, raw visual values, obsolete props, nested Cards, native Modals, and undocumented exceptions. Target: `app/diet/`, `app/(tabs)/diet.tsx`, and `src/features/diet/`. Source: Design / Exit Gate. Trace: P5-AC-003, P5-AC-005, P5-AC-010. Skill: `codebase-audit`.
- [ ] T026 Run `npx.cmd tsc --noEmit && npm.cmd run lint`, tests, Expo checks, audit, web export, and every Diet Android journey in both themes. Target: `implementation/mineral-warm-design-system/validation.md`. Source: Design / Testing Matrix. Trace: P5-AC-001 through P5-AC-010. Skill: `code-tester`.

## Dependencies and Exit Gate

- Macro contract/tests precede all macro UI.
- Core display precedes forms/overlays; tests precede each behavior migration.
- Phase 5 exits only after every Diet route passes automated, static, and Android gates with unchanged data behavior.





