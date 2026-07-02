# Phase 3: Task Planning

Checklist of actionable steps to refactor the program form and remove the Kanban editor.

## 1. Cleanup Kanban Files & Summary Screen
- [x] 1.1 Delete Kanban editor files
  - Delete `src/features/training/components/ProgramKanbanEditor.tsx`.
  - Delete `src/features/training/components/WorkoutColumnEditor.tsx`.
  - _Skill: backend-architect_
  - _Requirements: AC1_

- [x] 1.2 Remove Kanban toggles in `ProgramSummaryScreen`
  - In `src/features/training/components/ProgramSummaryScreen.tsx`, remove `isEditMode` state, the "Visualizar Kanban" button, and the conditional rendering of `ProgramKanbanEditor`.
  - Simplfy layouts so it displays only the standard list of workout blocks.
  - _Skill: ui-ux-pro-max_
  - _Requirements: AC1_

## 2. Route Configuration
- [x] 2.1 Update parent screen routes to non-scrollable
  - In `app/training/create-program.tsx`, change `<Screen>` prop to `scrollable={false}`.
  - In `app/training/edit-program/[id].tsx`, change `<Screen>` prop to `scrollable={false}`.
  - _Skill: frontend-developer_
  - _Requirements: AC2, AC3_

## 3. Program Form Refactoring
- [x] 3.1 Implement Zustand store and hook integration
  - Create `src/features/training/store/program-form-store.ts`.
  - Refactor `useProgramForm.ts` to sync with `useProgramFormStore`.
  - Define `expandedBlocks` and `scrollEnabled` states in `ProgramForm.tsx`.
  - _Skill: react-state-management_
  - _Requirements: AC2, AC4_

- [x] 3.2 Refactor blocks into collapsible cards
  - Render each block with a clickable header to expand/collapse.
  - Render chevron up/down icon, block name input, and delete block button.
  - _Skill: ui-ux-pro-max_
  - _Requirements: AC2_

- [x] 3.3 Implement draggable exercise cards
  - Integrate `react-native-draggable-flatlist` (or mapped view with reordering arrows) for exercises inside expanded blocks.
  - The exercise card should show: Grip handle, Name, Config summary subtitle, and Delete button.
  - When dragging starts, set `scrollEnabled` to false. When dragging ends, set `scrollEnabled` to true.
  - _Skill: ui-ux-pro-max_
  - _Requirements: AC3_

- [x] 3.4 Create Exercise Configuration Screen
  - Create the route at `app/training/exercise-config/[blockId]/[exerciseId].tsx`.
  - Display ExerciseSelect, Sets, Reps Min/Max, RIR, and Advanced Technique.
  - Save to the Zustand store on confirm, and run `router.back()`.
  - When a new exercise is added in the form, automatically navigate to the config screen.
  - _Skill: frontend-developer_
  - _Requirements: AC4_

## 4. Verification & Testing
- [x] 4.1 Run project validation checks
  - Run `npx tsc --noEmit`, `npm run lint`, and `npm test` to ensure everything works properly and no warnings remain.
  - _Skill: code-tester_
  - _Requirements: AC1-AC4_
