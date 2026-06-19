# Tasks - Diet Refactoring

## Phase 1: Custom Hooks Setup (Logic Isolation)
- [x] T001 [US1] Create directory `src/features/diet/hooks/`
- [x] T002 [US1] Implement `src/features/diet/hooks/useFoodBank.ts` (resolves RF-01, Trace: requirements.md#RF-01, design.md#2.1)
- [x] T003 [US1] Implement `src/features/diet/hooks/useMenu.ts` (resolves RF-03, Trace: requirements.md#RF-03, design.md#2.2)
- [x] T004 [US1] Implement `src/features/diet/hooks/useMealForm.ts` (resolves RF-02, Trace: requirements.md#RF-02, design.md#2.3)
- [x] T005 [US1] Implement `src/features/diet/hooks/useFoodForm.ts` (resolves RF-02, Trace: requirements.md#RF-02, design.md#2.4)

## Phase 2: Component Refactoring (Clean UI)
- [x] T006 [US1] Refactor `src/features/diet/components/FoodBankScreen.tsx` to consume `useFoodBank` hook
- [x] T007 [US1] Refactor `src/features/diet/components/MenuScreen.tsx` to consume `useMenu` hook and replace `any` types
- [x] T008 [US1] Refactor `src/features/diet/components/MealForm.tsx` to consume `useMealForm` hook
- [x] T009 [US1] Refactor `src/features/diet/components/FoodForm.tsx` to consume `useFoodForm` hook

## Phase 3: Validation
- [x] T010 Run `npx tsc --noEmit` to validate typescript compatibility
- [x] T011 Run `npx expo-doctor` to ensure overall project health
