# Feature Specification: Workout Summary Screen Redesign

**Feature Branch**: `[11-07-26-resumo-treino]`

**Created**: 2026-07-11

**Status**: Draft

**Input**: User description: "refatore completamente a tela "resumo do treino" com padrao premium relacionado a nosso design system. crie um /sdd"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - View Completed Workout Summary (Priority: P1)

As an athlete, I want to see a premium, highly polished summary of my completed workout so that I can feel rewarded and clearly understand my performance metrics.

**Why this priority**: The workout summary is the final touchpoint of the core user journey. A premium experience here drives retention and satisfaction.

**Independent Test**: Can be tested by finishing a dummy workout and viewing the summary screen to ensure all metrics, charts, and premium design tokens (Mineral Warm palette, typography) are correctly applied.

**Acceptance Scenarios**:

1. **Given** a user has just completed a workout, **When** they navigate to the summary screen, **Then** they see a visually stunning layout featuring key stats (duration, volume, personal records).
2. **Given** the summary screen is displayed, **When** the user scrolls through the data, **Then** the interface responds smoothly with subtle micro-animations and maintains strict adherence to the design system (e.g., proper use of `bg-surface`, `text-primary`, `border-subtle`).

---

### User Story 2 - Share Workout Achievements (Priority: P2)

As an athlete, I want to easily capture or share my workout summary so that I can celebrate my progress with others.

**Why this priority**: Social sharing or personal archiving is a secondary but highly engaging feature that benefits from a premium visual design.

**Independent Test**: Can be tested by taking a screenshot of the summary screen and verifying that the layout is optimized for sharing (dense data, clear hierarchy, no cut-off elements).

**Acceptance Scenarios**:

1. **Given** the workout summary screen, **When** viewed on standard mobile dimensions, **Then** the most critical metrics fit perfectly within the viewport without requiring excessive scrolling.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST display the total duration, total volume (load), and number of exercises performed.
- **FR-002**: System MUST highlight any Personal Records (PRs) achieved during the session.
- **FR-003**: System MUST render a breakdown of exercises with sets, reps, and weights.
- **FR-004**: System MUST strictly use the Mineral Warm palette and NativeWind v4 tokens (`tailwind.config.js`).
- **FR-005**: System MUST NOT use arbitrary tailwind values or inline styles.

### Key Entities 

- **WorkoutSession**: Represents the completed training session, containing start/end times and total volume.
- **WorkoutSet**: Represents the individual sets performed, used to calculate PRs and volume.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: The screen must achieve 100% compliance with the FitApp UI Foundations (no hardcoded styles, strict blue-first palette).
- **SC-002**: Visual rendering and animations (if any) must maintain 60fps on average mobile devices.
- **SC-003**: Users can understand their primary workout metrics at a glance (under 3 seconds of scanning).

## Assumptions

- We are redesigning an existing screen, so the underlying data fetching and models (WatermelonDB) already exist and provide the necessary data.
- The target platform is strictly phone screens (Android validated first).
- No new complex backend logic is required, only frontend layout, components, and animations.
