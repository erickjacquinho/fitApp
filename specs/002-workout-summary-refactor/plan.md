# Implementation Plan: Workout Summary Refactor

**Branch**: `[002-workout-summary-refactor]` | **Date**: 2026-07-12 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `spec.md` and `trinca-design` aesthetics.

## Summary

The workout completion flow is being divided into two steps. This feature focuses on the first step: refactoring the existing Workout Summary Screen to display an editable time/notes card, a metrics card, and a detailed list of executed exercises with their sets. The design enforces the Mineral Warm (Blue-First) palette, strict component registry usage, and flat layout structures.

## Technical Context

**Language/Version**: React Native (Expo), TypeScript
**Primary Dependencies**: NativeWind v4, WatermelonDB, Zustand, `@nozbe/with-observables`, `lucide-react-native`, `react-native-reanimated`, `@gorhom/bottom-sheet`
**Storage**: WatermelonDB (Local-first)
**Project Type**: Mobile Application
**Performance Goals**: Instant total duration recalculation on time change, 60fps list scrolling.
**Constraints**: Strict 4px grid, semantic tokens ONLY (e.g. `bg-surface-elevated`), no inline styles except for Reanimated components.

## UI/UX & Creative Direction (trinca-design synthesis)

### Creative Direction & Aesthetics
- **Design Variance**: Low (Highly systematic, utility-driven product UI).
- **Motion Intensity**: Fast, functional transitions (150ms). Use Bottom Sheet for time editing.
- **Visual Density**: High (Data density with dignity).
- **Palette**: Mineral Warm (Blue-First). Backgrounds use `bg-background` and `bg-surface-elevated`. Icons/active states use `text-primary`.
- **Typography**: Strictly use canonical `Text` component (`src/components/ui/text.tsx`).
- **Layout Constraints**: No cards-inside-cards for the main view. Card 1 and Card 2 use `BaseCard`. The exercise list items also use `BaseCard` with standard gaps.

### System Tokens & Spacing
- **Container Layout**: The screen must be wrapped in `<Screen>` (`src/components/ui/screen.tsx`).
- **Spacing**: `gap-content-gap` between major sections. Elements within cards use 4px grid intervals (`gap-2`, `gap-4`).
- **Borders/Shadows**: Flat UI. Use `border-subtle` for dividers if needed.

### Interaction & Accessibility
- **Touch Targets**: All interactive elements (like the time editor trigger) must be `min-h-touch-target` (44px).
- **State Changes**: The Start/End time editor will trigger a Bottom Sheet. When saved, the summary duration state (managed via component state or WatermelonDB observable if persisted immediately) updates instantaneously.

## Project Structure

### Documentation
```text
specs/002-workout-summary-refactor/
├── spec.md
├── checklists/
│   ├── requirements.md
│   └── ui-ux.md
├── plan.md              # This file
└── tasks.md             # To be generated
```

### Source Code
```text
src/
├── features/
│   └── workout/
│       ├── components/
│       │   ├── WorkoutSummaryCard.tsx       # Card 1 (Time & Notes)
│       │   ├── WorkoutMetricsCard.tsx       # Card 2 (Duration, Sets, Tonnage)
│       │   ├── ExerciseSummaryList.tsx      # The scrollable list of exercises
│       │   └── ExerciseSummaryItem.tsx      # Individual exercise BaseCard
│       └── store/
│           └── [relevant active workout state if applicable]
├── components/
│   ├── ui/
│   │   ├── BaseCard.tsx                     # Existing registry primitive
│   │   ├── BottomSheet.tsx                  # Existing registry primitive
│   │   └── text.tsx                         # Existing registry primitive
app/
└── (workout)/
    └── summary.tsx                          # The main route orchestrator
```

**Structure Decision**: Code is encapsulated within `src/features/workout/components` following the Feature-First organization rule. The route `app/(workout)/summary.tsx` will serve as the orchestrator.

## Data Model (WatermelonDB)

No schema migrations are expected for this specific UI refactor, as `WorkoutSession`, `Exercise`, and `Set` models already exist to capture times, notes, and set metrics. The data will be sourced via `@nozbe/with-observables` feeding the orchestrator screen.

## Execution Strategy

1. Refactor `app/(workout)/summary.tsx` to clear old layout and apply `<Screen>`.
2. Implement `WorkoutSummaryCard` with the BottomSheet time editor integration.
3. Implement `WorkoutMetricsCard` subscribing to the updated times.
4. Implement `ExerciseSummaryList` and `ExerciseSummaryItem` using `BaseCard` and circular set indices.
