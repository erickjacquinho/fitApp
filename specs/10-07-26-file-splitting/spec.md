# Specification: Aggressive File Splitting

## 1. Description
The project codebase currently contains several files exceeding 100 lines (e.g., `SwipeableRow.tsx`, `dropdown-menu.tsx`, `useProgramForm.ts`, `MenuScreen.tsx`, etc.). While some were refactored for readability, their physical file sizes remain large. This feature aims to aggressively split these large files into multiple smaller, highly focused modules to reduce the line count of each original file by at least 40%.

## 2. Goals & Success Criteria
- **File Size Reduction**: Every file targeted must have its line count reduced by at least 40%.
- **Separation of Concerns**: Extracted components and hooks must reside in their own appropriately named files.
- **Maintainability**: The codebase should remain standard "padrão ouro" (gold standard) without loss of functionality.
- **Stability**: The application must not crash, and all existing logic must work identically after splitting.

## 3. Targeted Files & Proposed Split Strategies
1. **SwipeableRow.tsx (331 lines)**
   - Extract gesture logic into `useSwipeableRow.ts`.
   - Extract internal buttons/views into `SwipeableRowActions.tsx`.
2. **dropdown-menu.tsx (318 lines)**
   - Split primitives (e.g., `DropdownMenuContent`, `DropdownMenuItem`) into a `dropdown/` subfolder.
3. **useProgramForm.ts (277 lines)**
   - Extract state management and action handlers into smaller domain-specific hooks (e.g., `useProgramFormState.ts`, `useProgramFormActions.ts`).
4. **MenuScreen.tsx (265 lines)**
   - Extract `MacroSummaryCard`, `MealSection`, etc., into `features/diet/components/`.
5. **FoodBankScreen.tsx (260 lines)**
   - Extract `FoodListItem`, `FoodListHeader` into `features/diet/components/`.
6. **ProgramForm.tsx (236 lines)**
   - Move `ProgramFormHeader`, `ProgramFormBlockCard`, `ProgramFormActions` to individual files.
7. **workout-service.ts (230 lines)**
   - Split by domain entity: `program-service.ts`, `exercise-service.ts`, `block-service.ts`.
8. **WorkoutSessionScreen.tsx (213 lines)**
   - Move `EmptySessionCard` and `WorkoutSessionListHeader` to separate files.

## 4. User Scenarios
- **Developer Experience**: A developer opens the project and navigates through smaller, single-responsibility files rather than scrolling through 300+ line components.
- **Code Reviews**: PRs are easier to review because files are strictly modularized.

## 5. Functional Requirements
- Identify components, hooks, or interfaces inside large files that can exist independently.
- Create new files for extracted logic and update all corresponding imports.
- Maintain strict TypeScript typings and preserve all existing NativeWind/Reanimated logic.

## 6. Assumptions
- It is acceptable to create multiple sub-directories inside `components/ui/` or `features/training/components/` to organize the split files.
- The 40% reduction target is calculated based on the file's original line count vs its line count after extraction.
