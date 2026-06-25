# Tasks: Diet Performance Optimizations

## Task List

### 1. Refactor MealCard Props & State
- **Target:** [MealCard.tsx](file:///C:/Programmer/fitApp/src/features/diet/components/MealCard.tsx)
- **Source:** Design Section 1 & 2
- **Trace:** AC 1 & AC 2
- **Skill:** `frontend-developer`
- **Subtasks:**
  - Update `MealCardContentProps` interface: change `onDelete` to `(id: string) => void`.
  - Remove `macros` state from `MealCardContent`.
  - Add `useMemo` for `macros` derived from `foodItems`.
  - Update the delete icon Pressable to trigger `onDelete(meal.id)`.
  - Update `MealCard` export signature to align prop types.

### 2. Optimize MenuScreen Callbacks
- **Target:** [MenuScreen.tsx](file:///C:/Programmer/fitApp/src/features/diet/components/MenuScreen.tsx)
- **Source:** Design Section 2
- **Trace:** AC 2
- **Skill:** `frontend-developer`
- **Subtasks:**
  - Wrap `confirmDelete` in `useCallback` to create `handleConfirmDelete`.
  - Update `<MealCard>` rendering inside `<DraggableFlatList>` to pass `onDelete={handleConfirmDelete}` directly without inline arrow functions.

### 3. Verification & Validation
- **Target:** System
- **Source:** System Checks
- **Trace:** General Verification
- **Skill:** `code-tester`
- **Subtasks:**
  - Run type checks: `npx tsc --noEmit`.
  - Run unit tests: `npx jest src/features/diet`.
