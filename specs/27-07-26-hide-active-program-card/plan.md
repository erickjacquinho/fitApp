# Implementation Plan: Dynamic Active Program Card Filtering

**Feature Path**: `specs/27-07-26-hide-active-program-card`
**Spec File**: `spec.md`

## Summary of Technical Approach
1. In `TrainingHomeScreen.tsx`, compute filtered arrays `visiblePinnedPrograms` and `visibleOtherPrograms` by excluding items where `item.program.id === activeSession?.programId`.
2. Render `visiblePinnedPrograms` and `visibleOtherPrograms` in place of `pinnedPrograms` and `otherPrograms`.
3. Verify that empty state triggers appropriately when no programs remain visible and no session is active.
4. Verify TypeScript compilation (`npx tsc --noEmit`).

## Proposed File Changes

### [MODIFY] [TrainingHomeScreen.tsx](file:///c:/Programmer/fit-app/src/features/training/components/TrainingHomeScreen.tsx)
- Compute `visiblePinnedPrograms` and `visibleOtherPrograms` filtering out `activeSession?.programId`.
- Update section condition rendering.

## Verification Plan
- Run `npx tsc --noEmit` to confirm zero compilation errors.
