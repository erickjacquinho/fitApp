# Tasks - Step 1: Foundations and Infrastructure

## Phase 1: Setup
- [X] T001 Create directory structure in `src/db/models/`, `src/features/`, and `src/components/atoms/`
- [X] T002 Configure WatermelonDB dependencies in `package.json` (if not present)

## Phase 2: Foundation (WatermelonDB)
- [X] T003 [P] Create initial schema in `src/db/schema.ts` as per design
- [X] T004 [P] Configure database instance in `src/db/index.ts`
- [X] T005 Implement base Model classes in `src/db/models/` (Food, Meal, etc.)
- [X] T006 [P] Create `src/hooks/use-database.ts` hook for simplified DB access

## Phase 3: [US1] Navigation (Expo Router)
- [X] T007 [US1] Configure `app/_layout.tsx` with `DatabaseProvider` and `SafeAreaProvider`
- [X] T008 [US1] Implement `app/(tabs)/_layout.tsx` with Bottom Tab Navigator
- [X] T009 [US1] [P] Create placeholder screens: `app/(tabs)/index.tsx`, `app/(tabs)/diet.tsx`, `app/(tabs)/training.tsx`

## Phase 4: [US2] Base Components & Header
- [X] T010 [US2] [P] Implement `src/components/atoms/Typography.tsx` using NativeWind
- [X] T011 [US2] [P] Implement `src/components/atoms/Button.tsx` with style variants
- [X] T012 [US2] [P] Implement base `src/components/atoms/Card.tsx`
- [X] T013 [US2] [P] Implement `src/components/atoms/Input.tsx` with type support
- [X] T014 [US2] Implement `src/components/molecules/Header.tsx` with navigation support
- [X] T015 [US2] Implement `src/components/molecules/SwipeableCard.tsx` using Gesture Handler
- [X] T016 [US2] Implement `src/components/organisms/ConfirmModal.tsx`

## Phase 5: Polish & Validation
- [X] T017 Integrate global Header in `app/(tabs)/_layout.tsx` or individual screens
- [X] T018 Run `npx tsc` and `npm run lint` to validate integrity
- [X] T019 Validate navigation between tabs and rendering of base components on Dashboard screen

## Dependency Graph
T003, T004 -> T005 -> T007
T007 -> T008 -> T009
T010, T011, T012, T013 -> T014, T015, T016
T014 -> T017
T009, T017 -> T019
