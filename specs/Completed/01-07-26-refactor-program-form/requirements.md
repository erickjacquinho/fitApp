# Phase 1: Requirements Gathering

Centralize the workout program editing experience, remove the horizontal Kanban view, and refactor the creation/editing form (`ProgramForm`) to use collapsible blocks, draggable exercise cards, and a progressive disclosure configuration modal.

## User Stories
- **US1:** As a user, I want the Kanban horizontal editor removed, so that my workout editing experience is centralized in a single, standard form page.
- **US2:** As a user editing or creating a program, I want the training blocks (workouts) in the form to be collapsible cards, so that I can collapse completed workouts and focus on the current one without screen clutter.
- **US3:** As a user in the program form, I want the exercises inside each block to be represented by clean, draggable cards, showing only the exercise name, sets/reps summary, and a drag handler to reorder them.
- **US4:** As a user in the program form, I want tapping an exercise card to open a modal where I can edit its detailed configurations (sets, reps, RIR, advanced technique), instead of seeing all inputs inline for every exercise.

## Acceptance Criteria
- **AC1:** The horizontal Kanban view (`ProgramKanbanEditor.tsx`, `WorkoutColumnEditor.tsx`, and the Kanban toggles in `ProgramSummaryScreen.tsx`) SHALL be removed.
- **AC2:** In `ProgramForm.tsx`, each training block (workout) SHALL be rendered as a collapsible card:
  - The card header SHALL display the block name input and a chevron indicating expanded/collapsed state.
  - Tapping the header (outside the input) SHALL toggle the block's expanded state.
  - Only expanded blocks SHALL display their exercise list and "Adicionar exercício" button.
- **AC3:** Exercises inside an expanded block SHALL be rendered as draggable cards using `react-native-draggable-flatlist`:
  - Each card SHALL include a vertical drag handle icon on the left, the exercise name in the center, a subtitle with the sets/reps/RIR summary, and a delete button on the right.
  - Dragging the card by the handle SHALL allow reordering the exercise within the block.
- **AC4:** Tapping the exercise card (outside the drag handle and delete button) SHALL navigate to a new screen `/training/exercise-config/[blockId]/[exerciseId]` containing:
  - The exercise selection dropdown (`ExerciseSelect`).
  - Inputs for Sets, Min Reps, Max Reps, RIR, and Advanced Technique.
  - A "Confirmar" (Confirm) button to save configurations and return to the form screen, and a back button to discard changes.
