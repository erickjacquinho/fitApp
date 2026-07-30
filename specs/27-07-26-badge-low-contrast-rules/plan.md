# Implementation Plan: Low Contrast Border Badge System

**Feature Path**: `specs/27-07-26-badge-low-contrast-rules`
**Spec File**: `spec.md`

## Summary of Technical Approach
1. Refactor `src/components/ui/badge.tsx` variants so every badge variant uses low-contrast border-to-background styling.
2. Audit and refactor `ProgramCard.tsx` "Em andamento" badge to use canonical `Badge` component with low-contrast border (e.g. `bg-primary/10 border-primary/20 text-primary` or `variant="outline"` / `variant="secondary"`).
3. Audit and update all other screens rendering badges (`ActiveSessionHeroCard.tsx`, `WorkoutTimer.tsx`, `WorkoutExerciseKanbanScreen.tsx`, `style-guide.tsx`) to guarantee zero high-contrast border pop-out (like white background with black border).
4. Verify TypeScript compilation (`npx tsc --noEmit`).

## Proposed File Changes

### [MODIFY] [badge.tsx](file:///c:/Programmer/fit-app/src/components/ui/badge.tsx)
- Ensure all badge variants (`default`, `secondary`, `destructive`, `outline`, `success`, `warning`, `info`, `neutral`, `inverse`) enforce low-contrast border-to-background pairing.

### [MODIFY] [ProgramCard.tsx](file:///c:/Programmer/fit-app/src/features/training/components/ProgramCard.tsx)
- Replace inline badge `<View className="rounded-full bg-primary/10 px-2 py-0.5 border border-primary/20">` with canonical `<Badge>` primitive following solid/low-contrast border rules.

### [MODIFY] [ActiveSessionHeroCard.tsx](file:///c:/Programmer/fit-app/src/features/training/components/ActiveSessionHeroCard.tsx)
- Ensure WorkoutTimer badge uses solid white background with solid white border (`bg-white border-white`) for zero border contrast and high text contrast.

## Verification Plan
- Run `npx tsc --noEmit` to confirm zero compilation errors.
