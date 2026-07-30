# Feature Specification: Unified Dashboard Calendar Component

**Feature Branch**: `30-07-26-no-dashboard-o-componente-de`

**Created**: 2026-07-30

**Status**: Specified

**Input**: User description: "no dashboard o componente de calendario, quero que ele seja com uma visao unificada assim, mas seguindo nosso design."

## Overview & Goal

Redesign the `DashboardCalendar` / `WeeklyCalendar` component on the Dashboard screen to present a single, unified container card layout (enclosing all visible day pills within a continuous surface card background) that strictly adheres to FitApp's Mineral Warm design system tokens and blue-first interaction rules.

## User Scenarios & Testing

### User Story 1 - Unified Card Calendar Layout (Priority: P1)

As a gym trainee checking my daily dashboard, I want to see the weekly calendar days grouped inside a single, cohesive surface card so that the calendar looks clean, integrated, and visually distinct from surrounding widgets.

**Why this priority**: Core visual request from user feedback to replace separate detached day cards with a unified strip card component.

**Independent Test**: Can be verified by rendering the dashboard and inspecting the calendar component to ensure all day pills sit inside a single surface card container (`bg-surface` or `bg-surface-elevated`) with consistent internal padding and rounded borders.

**Acceptance Scenarios**:

1. **Given** the user views the Dashboard screen, **When** the calendar component renders, **Then** all day pills are contained inside a single, continuous outer container card using Mineral Warm surface tokens.
2. **Given** the calendar container is displayed, **When** a day pill is selected, **Then** the selected pill displays a soft rounded highlight box using primary blue token (`bg-primary` / `text-text-inverse`) while non-selected days retain clean secondary text hierarchy without detached borders.

---

### User Story 2 - Interactive Date Selection & Month Navigation (Priority: P2)

As a trainee, I want to tap any day in the unified calendar or scroll horizontally to select different dates so that I can inspect my workout and nutrition records for specific days.

**Why this priority**: Essential functionality to interact with past and present logs while maintaining smooth gesture feedback.

**Independent Test**: Tapping a day pill highlights it with spring motion and haptic feedback, updating the selected date context across the dashboard screen.

**Acceptance Scenarios**:

1. **Given** a user taps an unselected day pill in the unified card, **When** the selection changes, **Then** tactile haptic feedback triggers, the selection indicator smoothly animates to the new day, and `onDateChange` callback fires.
2. **Given** a user navigates between months or jumps to today, **When** the action is triggered, **Then** the unified day strip smoothly updates to reflect the active month range.

---

### Edge Cases

- **Small Screen Dimensions**: Ensure all 7 days fit inside the unified container or scroll gracefully with proper container padding (`px-screen-x`).
- **Future Dates Boundary**: Disable future month selection beyond current month/today boundary per domain rules.
- **Rapid Tap Switching**: Rapid consecutive date selections preserve state stability without animated layout glitches.

## Requirements

### Functional Requirements

- **FR-001**: System MUST encapsulate the weekly day strip inside a single unified card container using `bg-surface` or `bg-surface-elevated` and `rounded-2xl` / `rounded-3xl` corners.
- **FR-002**: System MUST render each day item within the unified container showing abbreviated day label on top and numeric day below with proper vertical alignment and typography (`Text` primitive).
- **FR-003**: System MUST highlight the selected day pill using a distinct rounded background highlight box following Mineral Warm blue-first tokens (`bg-primary` and `text-text-inverse`).
- **FR-004**: System MUST present a subtle dot indicator or subtle marker for the current day ("today") within its respective day cell.
- **FR-005**: System MUST maintain month navigation header (month/year display with previous/next arrows and "Hoje" quick button) visually integrated above or within the unified card structure.
- **FR-006**: System MUST use fluid Reanimated spring animations and Haptic feedback upon date selection.

### Key Entities

- **CalendarDay**: Represents a specific date item in the week strip containing `date` (Date object), `dayName` (string, e.g., "Seg"), `dayNumber` (number), `isToday` (boolean), and `isSelected` (boolean).

## Success Criteria

### Measurable Outcomes

- **SC-001**: Calendar component renders within 16ms frame target on phone devices without dropped frames during swipe/pan gestures.
- **SC-002**: 100% adherence to Mineral Warm palette semantic tokens without any hardcoded HEX colors, raw Tailwind colors, or inline styles.
- **SC-003**: User can change active date in under 1 second with immediate visual and haptic feedback.

## Assumptions

- Target screen size is phone screens (Android validated first).
- Existing date utility functions (`date-fns` with `ptBR` locale) remain the standard date formatting source.
- Standard spacing grid (4px base) and touch targets (minimum 44px) are strictly enforced.

## Clarifications

### Session 2026-07-30

- Q: Should all 7 visible days be contained inside a single unified card background instead of separate day pill cards? → A: Yes, a single continuous card background (`bg-surface-elevated` or `bg-surface`) containing all days, with selected day highlighted internally using primary blue theme tokens.
- Q: What theme tokens should be used for selected vs unselected day states inside the unified card? → A: Selected day uses `bg-primary` pill with `text-text-inverse` text; unselected days use `text-text-primary` date number and `text-text-secondary` day header inside the card container.

