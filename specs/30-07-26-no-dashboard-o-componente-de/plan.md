# Implementation Plan: Unified Dashboard Calendar Component

**Branch**: `30-07-26-no-dashboard-o-componente-de` | **Date**: 2026-07-30 | **Spec**: [spec.md](file:///c:/Programmer/fit-app/specs/30-07-26-no-dashboard-o-componente-de/spec.md)

**Input**: Feature specification from `/specs/30-07-26-no-dashboard-o-componente-de/spec.md`

## Summary

Redesign `src/components/ui/weekly-calendar.tsx` and `src/features/dashboard/components/DashboardCalendar.tsx` to encapsulate the horizontal day strip inside a single unified surface card container (`bg-surface-elevated` / `border-border-subtle` with `rounded-2xl` / `rounded-3xl` radii). Day items inside the unified card strip highlight the selected day pill using Mineral Warm blue primary tokens (`bg-primary` / `text-text-inverse`) while preserving existing fluid pan gesture scrolling, Reanimated spring physics, and haptic feedback.

## Technical Context

**Language/Version**: TypeScript 5.3+, React Native (Expo SDK 51)
**Primary Dependencies**: NativeWind v4, react-native-reanimated v3, react-native-gesture-handler, expo-haptics, date-fns (ptBR)
**Storage**: N/A (UI state & selection callback)
**Testing**: Jest + React Native Testing Library
**Target Platform**: Android & iOS (Phone target, Android prioritized)
**Project Type**: Mobile application component (React Native UI primitive & feature widget)
**Performance Goals**: 60 fps smooth pan gesture & instant selection response (<16ms frame budget)
**Constraints**: Zero hardcoded hex colors or inline styles; 100% adherence to Mineral Warm semantic tokens (`bg-surface`, `bg-surface-elevated`, `bg-primary`, `border-border-subtle`, `text-text-primary`, `text-text-secondary`, `text-text-inverse`)

## Constitution Check

- [x] **Mineral Warm Palette**: Strict blue-first rules enforced. No legacy olive tokens.
- [x] **Zero Hardcoded Styles**: Uses NativeWind class utility composition (`cn(...)`) with semantic theme tokens.
- [x] **Accessibility**: Minimum 44px touch targets (`min-h-touch-target`), `accessibilityRole="button"`, and `accessibilityState={{ selected }}`.
- [x] **Reanimated Guidelines**: Uses `react-native-gesture-handler` pan gesture and Reanimated spring physics.

## Project Structure

### Documentation (this feature)

```text
specs/30-07-26-no-dashboard-o-componente-de/
├── spec.md              # Feature specification
├── plan.md              # Implementation plan
├── checklists/
│   ├── requirements.md  # Requirements quality checklist
│   └── ux.md            # UX quality checklist
└── tasks.md             # Implementation tasks
```

### Source Code

```text
src/
├── components/
│   └── ui/
│       └── weekly-calendar.tsx           # Canonical weekly calendar UI primitive with unified card layout
├── features/
│   └── dashboard/
│       └── components/
│           └── DashboardCalendar.tsx     # Feature widget wrapping WeeklyCalendar for Dashboard
```

**Structure Decision**: Component refactoring within existing `src/components/ui/weekly-calendar.tsx` and `src/features/dashboard/components/DashboardCalendar.tsx`.

## Research & Design Notes

### Unified Card Layout Architecture
- Wrap the entire horizontal day list within a single outer container card element:
  - Container classes: `bg-surface-elevated border border-border-subtle rounded-2xl p-2 shadow-sm flex-row items-center justify-between`
- Inside the outer container card, days are laid out in a flex row (or scrollable gesture view).
- Day item inside the container card:
  - Selected day: pill shape with `bg-primary text-text-inverse shadow-xs`
  - Unselected day: clean text inside container card with `text-text-secondary` (day label) and `text-text-primary` (date number)
- Maintain header month controls (`Hoje`, `ChevronLeft`, `ChevronRight`, `formattedMonth`) above or cleanly integrated into the component card header.
