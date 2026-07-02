# Requirements: Training Home Redesign

## 1. Feature Description
Redesign the main Training tab screen (`app/(tabs)/training.tsx`) to incorporate the programs list functionality (previously in `app/training/programs.tsx`) and match the new UI flow shown in `fluxo 1.png`.

## 2. Acceptance Criteria (EARS)
- WHEN the user navigates to the Training tab, THEN the system SHALL display the "Planos de Treino" header.
- WHEN the user views the header, THEN the system SHALL display a history button on the left and a new program button on the right.
- WHEN the user presses the history button, THEN the system SHALL navigate to the training history screen.
- WHEN the user presses the new program button, THEN the system SHALL navigate to the create program screen.
- WHEN the user views the main content, THEN the system SHALL display a section for "programas fixados" (pinned programs).
- WHEN the user views the main content, THEN the system SHALL display a "Treino Rápido" button.
- WHEN the user presses the "Treino Rápido" button, THEN the system SHALL initiate an isolated, real-time training session without a pre-defined plan.
- WHEN the user views the main content, THEN the system SHALL display a section for "outros planos de treino" (other training plans).

## 3. Out of Scope
- Full implementation of the "Treino Rápido" active session screen (only the entry point/button is in scope).
- Changes to the create program or history screens.

## 4. Failure Scenarios
- If there are no pinned programs, the system SHALL display an empty state or hide the section according to design system guidelines.
