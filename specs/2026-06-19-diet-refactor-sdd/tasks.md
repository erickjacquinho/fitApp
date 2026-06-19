# Tasks - Diet Refactoring

## Phase 1: Custom Hooks Setup (Logic Isolation)
- [ ] T001 [US1] Create directory `src/features/diet/hooks/`
- [ ] T002 [US1] Implement `src/features/diet/hooks/useFoodBank.ts` (resolves RF-01, Trace: requirements.md#RF-01, design.md#2.1)
- [ ] T003 [US1] Implement `src/features/diet/hooks/useMenu.ts` (resolves RF-03, Trace: requirements.md#RF-03, design.md#2.2)
- [ ] T004 [US1] Implement `src/features/diet/hooks/useMealForm.ts` (resolves RF-02, Trace: requirements.md#RF-02, design.md#2.3)
- [ ] T005 [US1] Implement `src/features/diet/hooks/useFoodForm.ts` (resolves RF-02, Trace: requirements.md#RF-02, design.md#2.4)

## Phase 2: Component Refactoring (Clean UI)
- [ ] T006 [US1] Refactor `src/features/diet/components/FoodBankScreen.tsx` to consume `useFoodBank` hook
- [ ] T007 [US1] Refactor `src/features/diet/components/MenuScreen.tsx` to consume `useMenu` hook and replace `any` types
- [ ] T008 [US1] Refactor `src/features/diet/components/MealForm.tsx` to consume `useMealForm` hook
- [ ] T009 [US1] Refactor `src/features/diet/components/FoodForm.tsx` to consume `useFoodForm` hook

## Phase 3: Validation
- [ ] T010 Run `npx tsc --noEmit` to validate typescript compatibility
- [ ] T011 Run `npx expo-doctor` to ensure overall project health
