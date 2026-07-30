# Implementation Tasks: Unified Dashboard Calendar Component

**Feature**: Unified Dashboard Calendar Component
**Branch**: `30-07-26-no-dashboard-o-componente-de`
**Spec**: [spec.md](file:///c:/Programmer/fit-app/specs/30-07-26-no-dashboard-o-componente-de/spec.md)
**Plan**: [plan.md](file:///c:/Programmer/fit-app/specs/30-07-26-no-dashboard-o-componente-de/plan.md)

## Phase 1: Setup

- [x] T001 [skill: frontend-design] Inspect current calendar component styling and token bindings in `src/components/ui/weekly-calendar.tsx`

## Phase 2: Foundational

- [x] T002 [skill: anti-ai-slop-design] Verify Mineral Warm theme tokens (`bg-surface`, `bg-surface-elevated`, `bg-primary`, `border-border-subtle`) in `tailwind.config.js` and `src/tokens/theme.ts`

## Phase 3: User Story 1 - Unified Card Calendar Layout (Priority: P1)

**Story Goal**: Enclose all week day cells inside a single, continuous outer surface card container to achieve a unified visual block following our design system.
**Independent Test Criteria**: Render `WeeklyCalendar` and verify that all day cells are rendered within a single outer container card (`bg-surface-elevated border border-border-subtle rounded-3xl p-2`).

- [x] T003 [skill: frontend-design] [US1] Update `WeeklyCalendar` container structure in `src/components/ui/weekly-calendar.tsx` to wrap the horizontal day list in a single unified surface card component with `rounded-3xl` styling
- [x] T004 [skill: frontend-design] [P] [US1] Refactor `DayPill` component styling in `src/components/ui/weekly-calendar.tsx` so individual day items render cleanly inside the unified card container with inner pill selection styling (`bg-primary shadow-xs text-text-inverse` for selected, transparent background with `text-text-primary` for unselected)
- [x] T005 [skill: frontend-design] [US1] Align month header navigation and "Hoje" button with the unified card layout in `src/components/ui/weekly-calendar.tsx`

## Phase 4: User Story 2 - Interactive Selection & Feedback (Priority: P2)

**Story Goal**: Ensure date selection, gestures, and haptic feedback work seamlessly within the unified calendar card layout.
**Independent Test Criteria**: Tap day cells within the unified card and confirm animated spring selection transition and haptic triggers.

- [x] T006 [skill: ui-animations-motion] [P] [US2] Update Reanimated spring animations and `GestureDetector` pan calculation in `src/components/ui/weekly-calendar.tsx` to align item width and horizontal offset with the new unified container padding
- [x] T007 [skill: frontend-design] [US2] Update `DashboardCalendar` feature component in `src/features/dashboard/components/DashboardCalendar.tsx` to pass date selection props and maintain proper spacing within the Dashboard view

## Phase 5: Polish & Validation

- [x] T008 [skill: general] Run TypeScript compiler check (`npx tsc --noEmit`) to verify zero type errors in `src/components/ui/weekly-calendar.tsx` and `src/features/dashboard/components/DashboardCalendar.tsx`
- [x] T009 [skill: code-reviewer-expert] Run linter check (`npm run lint`) to ensure zero code style or accessibility role warnings

## Implementation Strategy & MVP Scope

- **MVP Scope**: Phases 1 through 3 deliver the complete unified card layout for the weekly calendar on the Dashboard.
- **Dependencies**: T003 blocks T004 and T005; T006 and T007 can be executed concurrently after T003.
