# Implementation Plan: Aggressive File Splitting

## Overview
This document outlines the technical design for splitting files exceeding 100 lines by at least 40% per file. The splitting strategy ensures code portability, reuse, and single-responsibility principles without changing the existing features or layout.

## Target Files and New Modules

### 1. `SwipeableRow.tsx` (Target: reduce from 331 to <190)
- **New Files**:
  - `src/components/molecules/SwipeableRow/useSwipeableRow.ts`: Handle animated reactions, thresholds, and drag callbacks.
  - `src/components/molecules/SwipeableRow/SwipeableRowActions.tsx`: Sub-component for rendering the action buttons.
  - Keep `SwipeableRow.tsx` as the main wrapper.

### 2. `dropdown-menu.tsx` (Target: reduce from 318 to <190)
- **New Files**:
  - Create `src/components/ui/dropdown-menu/`
  - Move primitives like `DropdownMenuContent`, `DropdownMenuItem`, `DropdownMenuTrigger` to separate files.
  - `index.ts` to export all modules.

### 3. `useProgramForm.ts` (Target: reduce from 277 to <160)
- **New Files**:
  - `src/features/training/hooks/useProgramFormState.ts`: Handles initial state, validation, basic field mutators.
  - `src/features/training/hooks/useProgramFormBlocks.ts`: Handles complex logic for reordering and mutating blocks.
  - `useProgramForm.ts` remains as a composer hook that unites State, Blocks, and API.

### 4. Diet Screens (`MenuScreen.tsx`, `FoodBankScreen.tsx`, `CalendarSummaryScreen.tsx`)
- **New Files**:
  - Extract complex lists and cards into `src/features/diet/components/` (e.g., `DailyMacrosSummaryCard.tsx`, `MealListSection.tsx`, `FoodListHeader.tsx`).

### 5. `ProgramForm.tsx` & `WorkoutSessionScreen.tsx`
- **New Files**:
  - Move previously extracted inline components (e.g., `ProgramFormHeader`, `ProgramFormBlockCard`) into their own files (`src/features/training/components/ProgramForm/ProgramFormHeader.tsx`, etc.).

### 6. `workout-service.ts`
- **New Files**:
  - `src/features/training/services/program-service.ts`
  - `src/features/training/services/training-block-service.ts`
  - `src/features/training/services/exercise-service.ts`

## Constraints & Considerations
- Type safety: All shared types (like `BlockInput`, `ExerciseInput`) must be correctly imported across the split files.
- Reanimated: Ensure `runOnJS` and shared values are handled properly when passed as props to extracted hooks.
- Refactoring will rely on `export * from ...` to avoid breaking downstream imports.
