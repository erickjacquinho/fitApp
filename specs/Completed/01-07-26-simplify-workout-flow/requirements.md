# Phase 1: Requirements Gathering

Simplify the workout plan user flow by consolidating actions into the Program Summary Screen (`/training/program/[id]`), providing a clear bifurcation between starting a workout session and editing the program.

## User Stories
- **US1:** As a user, I want tapping a program card on the home screen to navigate to the program summary screen, without confusing nested action buttons that cause accidental clicks.
- **US2:** As a user on the program summary screen, I want a clear, premium header layout that displays the program name and provides two main tactile options: "Iniciar Treino" (Start Workout) and "Editar Plano" (Edit Plan).
- **US3:** As a user, when I click "Iniciar Treino" on the program summary screen, I want to be prompted to select one of the workout blocks to start my training session.
- **US4:** As a user, when I click "Editar Plano" on the program summary screen, I want to be taken to a form where I can edit the program name, manage blocks (add/delete/rename), and edit exercises (add/delete, modify names, sets, reps, technique, and reps in reserve).

## Acceptance Criteria
- **AC1:** WHEN the user taps a program card on the `TrainingHomeScreen` THEN the system SHALL navigate to `/training/program/[id]`.
- **AC2:** The system SHALL NOT render a nested "Iniciar treino" button on the program card in the `TrainingHomeScreen` to ensure touch target clearance and prevent navigation conflicts.
- **AC3:** IF the user is on the `ProgramSummaryScreen` THEN the system SHALL render a header card with the program details and two main actions side-by-side or stacked:
  - **Iniciar Treino**: A primary CTA button styled with the Mineral Warm blue primary color.
  - **Editar Plano**: A secondary CTA button styled as an outline/transparent button.
- **AC4:** WHEN the user clicks "Iniciar Treino" on the `ProgramSummaryScreen` THEN the system SHALL open a dialog to select which training block to start.
- **AC5:** WHEN the user clicks "Editar Plano" on the `ProgramSummaryScreen` THEN the system SHALL navigate to `/training/edit-program/[id]`.
- **AC6:** IF the user is on `/training/edit-program/[id]` THEN the system SHALL load the `ProgramForm` pre-populated with the existing program, block, and exercise details from the database.
- **AC7:** WHEN the user saves changes on `/training/edit-program/[id]` THEN the system SHALL update the program, blocks, and exercises in the database and navigate back to the previous screen.
