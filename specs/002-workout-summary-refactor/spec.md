# Feature Specification: Workout Summary Refactor

**Feature Branch**: `[002-workout-summary-refactor]`

**Created**: 2026-07-12

**Status**: Draft

**Input**: User description: "ao clicar em conlcuir treino, essa tela de resumo de treino vai ser dividida em 2 etapas, vamos reformular a atual para ser a tela de resumo. precisamos fazer o seguinte:
card 1:
nome do treino
inicio e final do treino (opçao de editar a data de inicio e fim)
notas sobre o treino
-
card 2: disposiçao horizontal (todos com icones)
duraçao total (atualizada se atualizado o card acima)
séries válidas completas
tonelagem do treino
-
Texto: Resumo do Treino
exercicios e séries executados em lista: 
1- exercicio
2- série (kg x reps) (deve ser discriminado (série 1, série 2 etc por numeros [1, 2, 3, etc] dentro de um circulo)
use basecards para esse componente de exercicios e series. separe os exercicios, nao bote junto. crie um /sdd dessa implementaçao"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - View and Edit Workout Details (Priority: P1)

Users need to see the general details of the workout they just completed, and be able to adjust the start and end times if they forgot to start or end the workout exactly on time. They also need to add or edit notes for this session.

**Why this priority**: Correcting the time is essential for accurate duration and analytics. Notes allow logging qualitative data.

**Independent Test**: Complete a workout and interact with the first card on the summary screen to edit the times and notes.

**Acceptance Scenarios**:

1. **Given** the user is on the workout summary screen, **When** they view the first card, **Then** they should see the workout name, start time, end time, and notes field.
2. **Given** the user views the first card, **When** they tap to edit start/end time, **Then** a time picker/editor opens allowing changes, and the changes are saved.
3. **Given** the user views the first card, **When** they add or edit notes, **Then** the notes are saved to the workout session.

---

### User Story 2 - View Workout Metrics (Priority: P1)

Users need a quick glance at their workout's key performance indicators to understand the total effort exerted.

**Why this priority**: Immediate feedback on the session's overall volume and duration is a core feature for gym goers.

**Independent Test**: Complete a workout and verify the metrics match the performed sets and time.

**Acceptance Scenarios**:

1. **Given** the user is on the workout summary screen, **When** they view the second card, **Then** they should see a horizontal layout containing total duration, valid completed sets, and workout tonnage, each accompanied by an icon.
2. **Given** the user updates the start or end time in the first card, **When** the time is saved, **Then** the total duration metric in the second card must update instantly to reflect the new time.

---

### User Story 3 - View Executed Exercises and Sets (Priority: P2)

Users need to review exactly what exercises and sets they performed during the session in a clear, structured list.

**Why this priority**: Provides a detailed breakdown of the workout effort, ensuring the user knows exactly what was logged.

**Independent Test**: Complete a workout with multiple exercises and sets, and verify the summary list matches the data.

**Acceptance Scenarios**:

1. **Given** the user is on the workout summary screen, **When** they scroll to the "Resumo do Treino" section, **Then** they should see a list of executed exercises.
2. **Given** the user views the exercise list, **When** they look at a specific exercise, **Then** it should be contained within a dedicated BaseCard, separate from other exercises.
3. **Given** the user views the sets for an exercise, **When** they read the list, **Then** each set should show its index (e.g., 1, 2, 3) inside a circle, followed by the logged data (e.g., 100kg x 10).

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST divide the workout completion flow into two steps, making this screen the first step (Summary).
- **FR-002**: System MUST display a card (Card 1) containing Workout Name, Start/End time (editable), and Notes (with a placeholder when empty, max 500 characters).
- **FR-003**: System MUST provide a Bottom Sheet UI (`BottomSheetModal`) to edit the Start and End times of the workout session. It MUST prevent saving if End Time is before Start Time.
- **FR-004**: System MUST display a card (Card 2) with a horizontal layout containing standard Lucide icons and values for: Total Duration, Valid Completed Sets (only sets marked as completed, excluding skipped/failed), and Tonnage (Sum of weight * reps for all valid sets, excluding bodyweight-only exercises).
- **FR-005**: System MUST dynamically recalculate and update the Total Duration in Card 2 if the Start/End time is modified in Card 1. If the workout spans midnight, duration must calculate correctly using full ISO timestamps.
- **FR-006**: System MUST display a "Resumo do Treino" section containing a vertically scrollable list of executed exercises.
- **FR-007**: System MUST use separate `BaseCard` components for each executed exercise in the list.
- **FR-008**: System MUST display sets within the exercise card, prefixing each set with its index (1, 2, 3...) enclosed in a small circular badge (e.g., `rounded-full` with `bg-surface-elevated`), formatted as `[index] kg x reps`.

### Key Entities 

- **Workout Session**: Represents the active/completed workout. Holds start/end time, total duration, tonnage, notes, and references to sets.
- **Exercise Set**: Represents a performed set with weight, reps, and index/order.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Users can successfully view their workout metrics and edit the start/end time immediately after finishing a workout.
- **SC-002**: Modifying the start or end time instantly reflects an accurate new total duration on the screen without requiring a page reload.
- **SC-003**: The UI visually separates exercises into distinct cards and clearly indicates set numbers with circular badges, matching the design spec.

## Assumptions

- Assumes the second step of the completion flow will be handled in a separate or subsequent feature specification, or is already defined.
- Assumes the `BaseCard` component already exists and supports the required layout.
- Assumes tonnage calculation is already implemented in the data layer or can be easily queried.
