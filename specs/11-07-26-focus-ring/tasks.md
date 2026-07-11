# Tasks: FocusRing Component

**Input**: Design documents from `/specs/11-07-26-focus-ring/`

**Prerequisites**: plan.md (required), spec.md (required for user stories)

## Phase 1: Setup

**Purpose**: Core UI component creation

- [x] T001 [P] [US1] Create `src/components/ui/focus-ring.tsx`

## Phase 2: User Story 1 - Centralized Focus Ring Component (Priority: P1) 🎯 MVP

**Goal**: Create the centralized focus ring component and refactor existing inputs to use it.

**Independent Test**: The form inputs (Input and SelectTrigger) should display the exact same animated focus ring on interaction.

### Implementation for User Story 1

- [x] T002 [US1] Implement `<FocusRing>` component in `src/components/ui/focus-ring.tsx` using `react-native-reanimated` and `motionPatterns`. It should accept `isFocused` and `layoutFrame` props.
- [x] T003 [US1] Refactor `src/components/ui/input.tsx` to remove its duplicated Reanimated logic and use `<FocusRing>` instead.
- [x] T004 [US1] Refactor `src/components/ui/select.tsx` to remove its duplicated Reanimated logic from `SelectTrigger` and use `<FocusRing>` instead.

## Phase 3: Polish & Cross-Cutting Concerns

- [x] T005 Run TypeScript compilation check (`npx tsc --noEmit`) to verify types.
- [x] T006 Run local linting to ensure no regressions.
