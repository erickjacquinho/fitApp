# Tasks: Workout Summary Refactor

**Input**: Design documents from `/specs/002-workout-summary-refactor/`

**Prerequisites**: plan.md (required), spec.md (required for user stories)

## Phase 1: Foundational (Refactoring Base)

**Purpose**: Clear the old screen and setup the new structure.

- [x] T001 Wrap `app/(workout)/summary.tsx` content in the canonical `<Screen>` component.
- [x] T002 Ensure `app/(workout)/summary.tsx` fetches the workout session via `@nozbe/with-observables` (if not already doing so correctly).

---

## Phase 2: User Story 1 - View and Edit Workout Details (Priority: P1) 🎯 MVP

**Goal**: Users need to see the general details of the workout they just completed, and be able to adjust the start and end times if they forgot to start or end the workout exactly on time. They also need to add or edit notes for this session.

### Implementation for User Story 1

- [x] T003 [P] [US1] Create `WorkoutSummaryCard` component in `src/features/workout/components/WorkoutSummaryCard.tsx` using `BaseCard`.
- [x] T004 [US1] Implement Time Editor Bottom Sheet (`BottomSheetModal`) within `WorkoutSummaryCard` or the main screen to edit start/end times.
- [x] T005 [US1] Implement Notes text input in `WorkoutSummaryCard` with max 500 characters and placeholder.
- [x] T006 [US1] Integrate `WorkoutSummaryCard` into `app/(workout)/summary.tsx` and wire up WatermelonDB update logic for time/notes.

---

## Phase 3: User Story 2 - View Workout Metrics (Priority: P1)

**Goal**: Users need a quick glance at their workout's key performance indicators to understand the total effort exerted.

### Implementation for User Story 2

- [x] T007 [P] [US2] Create `WorkoutMetricsCard` component in `src/features/workout/components/WorkoutMetricsCard.tsx` using `BaseCard` with horizontal layout.
- [x] T008 [US2] Add Total Duration calculation logic (dynamically listening to start/end time updates).
- [x] T009 [US2] Add Valid Completed Sets calculation (excluding skipped/failed).
- [x] T010 [US2] Add Tonnage calculation (weight * reps for valid sets, excluding bodyweight).
- [x] T011 [US2] Integrate `WorkoutMetricsCard` into `app/(workout)/summary.tsx` below the Summary Card.

---

## Phase 4: User Story 3 - View Executed Exercises and Sets (Priority: P2)

**Goal**: Users need to review exactly what exercises and sets they performed during the session in a clear, structured list.

### Implementation for User Story 3

- [x] T012 [P] [US3] Create `ExerciseSummaryItem` component in `src/features/workout/components/ExerciseSummaryItem.tsx` using `BaseCard` to display a single exercise.
- [x] T013 [US3] Implement the sets list within `ExerciseSummaryItem`, rendering sets in the format `[index] kg x reps` with a circular badge for the index.
- [x] T014 [US3] Create `ExerciseSummaryList` component in `src/features/workout/components/ExerciseSummaryList.tsx` to map over the workout's exercises and render `ExerciseSummaryItem`s.
- [x] T015 [US3] Integrate `ExerciseSummaryList` into `app/(workout)/summary.tsx` under the "Resumo do Treino" section.

---

## Phase N: Polish & Cross-Cutting Concerns

- [x] T016 Validate UI against `trinca-design` rules (e.g., 4px grid spacing, standard `gap-*` utilities, no raw hex colors).
- [x] T017 Verify instant duration updates when time is modified in the Bottom Sheet.
- [x] T018 Test accessibility (touch targets >= 44px on editable fields).

---

## Dependencies & Execution Order

- **Phase 1** must be completed first.
- **Phase 2** (US1) and **Phase 3** (US2) can be developed in parallel as long as the mock or actual observable data is passed correctly.
- **Phase 4** (US3) depends on the layout of the screen being established, but the components can be built in parallel.
