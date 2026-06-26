# Tasks: Refactor Edit Meal Header Popup

- [x] **Task 1: Add/Verify Service Layer**
  - **Description:** Implement `MealService.updateBasicInfo` in the meal service if it's missing or needs optimization.
  - **Target:** `src/features/diet/services/meal-service.ts`
  - **Source:** `design.md` -> Section 3
  - **Trace:** AC 3.4
  - **Skill:** `react-native-architecture`

- [x] **Task 2: Refactor MealForm Fields Visibility**
  - **Description:** Modify `MealForm.tsx` to conditionally hide the meal name and preparation state (time) input fields when a `mealId` prop is provided.
  - **Target:** `src/features/diet/components/MealForm.tsx`
  - **Source:** `design.md` -> Section 2.3
  - **Trace:** AC 3.5
  - **Skill:** `frontend-developer`

- [x] **Task 3: Create EditMealScreenComponent**
  - **Description:** Create the `EditMealScreenComponent` featuring the `Screen` wrapper, the dynamically updating Header, an edit trigger icon, and the modal `Dialog` popup with the correct sizing (`w-4/5 max-w-[400px]`), overlay backdrop, and form inputs.
  - **Target:** `src/features/diet/components/EditMealScreenComponent.tsx`
  - **Source:** `design.md` -> Section 2.1
  - **Trace:** AC 3.1, AC 3.2, AC 3.3, AC 3.4
  - **Skill:** `frontend-developer`

- [x] **Task 4: Refactor EditMeal Route Wrapper**
  - **Description:** Refactor the route file `app/diet/edit-meal.tsx` to wrap `EditMealScreenComponent` using `withObservables` and observe the meal.
  - **Target:** `app/diet/edit-meal.tsx`
  - **Source:** `design.md` -> Section 2.2
  - **Trace:** AC 3.1
  - **Skill:** `react-native-architecture`

- [x] **Task 5: Implement and Update Unit Tests**
  - **Description:** Update or write tests for the updated route, the conditional inputs in `MealForm`, and the new edit button triggers in the screen header.
  - **Target:** `src/features/diet/__tests__/diet-components.test.ts`
  - **Source:** `design.md` -> Section 2.1
  - **Trace:** AC 3.1, AC 3.2
  - **Skill:** `code-tester`

- [x] **Task 6: Code Validation and Build Verification**
  - **Description:** Validate code compilation, static analyses, and execute tests.
  - **Target:** System Command (`npx tsc --noEmit && npm test`)
  - **Source:** Core Quality Gate
  - **Trace:** Full Gate Compliance
  - **Skill:** `code-tester`
