# Tasks: Edit Meal Popup

## - [ ] Task 1: Add updateBasicInfo method to MealService
- **Target:** `src/features/diet/services/meal-service.ts`
- **Source:** `design.md` -> Section 2.2
- **Trace:** Requirements 2.4
- **Skill:** `backend-architect`
- **Description:** Implement `updateBasicInfo` in the `MealService` class to update only the meal's `name` and `preparationState`.

## - [ ] Task 2: Update MealCard component to trigger onEdit
- **Target:** `src/features/diet/components/MealCard.tsx`
- **Source:** `design.md` -> Section 2.1
- **Trace:** Requirements 2.1
- **Skill:** `frontend-developer`
- **Description:** Add `onEdit` callback prop to `MealCardContentProps`, pass it down to `MealCardContent`, update the memo comparison logic, and trigger `onEdit(meal)` on the "Editar" dropdown option.
- **Note:** Also change the hardcoded `"00:00"` rendering to display `meal.preparationState || '00:00'`.

## - [ ] Task 3: Integrate Dialog and Parent Background styling in MenuScreen
- **Target:** `src/features/diet/components/MenuScreen.tsx`
- **Source:** `design.md` -> Section 2.3, 2.4
- **Trace:** Requirements 2.1, 2.2, 2.3, 2.4
- **Skill:** `frontend-developer`
- **Description:**
  - Add states `editingMeal`, `editName`, and `editTime`.
  - Pass `onEdit={setEditingMeal}` to `MealCard`.
  - Add the `Dialog` popup rendering structure at the bottom of the screen.
  - Bind save button to `MealService.updateBasicInfo` and close dialog.
  - Dynamically apply `bg-black-main/20` class to the main `View` when `editingMeal` is open.

## - [ ] Task 4: Verify and Validate
- **Target:** Validation
- **Source:** N/A
- **Trace:** General validation gate
- **Skill:** `frontend-developer`
- **Description:** Run TypeScript checks and Jest tests. Ensure no regressions and clean compilation.

**Final Validation Command:**
`npx.cmd tsc --noEmit && npm.cmd test src/features/diet`

