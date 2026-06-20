# Tasks: Add Food To Meal Screen

## 1. Components & Routes
- [x] 1.1 Create `AddFoodToMealScreen` Component
  - **Skill:** `frontend-developer`
  - **Target:** `src/features/diet/components/AddFoodToMealScreen.tsx`
  - **Source:** `design.md` -> Components -> AddFoodToMealScreen
  - **Trace:** AC2, AC3, AC4, AC5, AC6
  - **Details:** 
    - Wrap with `withObservables(['foodId'])` to fetch `Food`.
    - Render input field for `quantity` (default 100).
    - Render scaled nutritional preview (`quantity / 100 * base`).
    - Handle `MealService.addItemToMeal` and `router.push('/(tabs)')` or `router.back()` multiple times on save.

- [x] 1.2 Create the Expo Router Page
  - **Skill:** `frontend-developer`
  - **Target:** `app/diet/add-food-to-meal.tsx`
  - **Source:** `design.md` -> Components -> app/diet/add-food-to-meal.tsx
  - **Trace:** AC1
  - **Details:** Read `foodId` and `mealId` from `useLocalSearchParams` and pass to `<AddFoodToMealScreen />`.

## 2. Integration
- [x] 2.1 Update `FoodBankScreen` Navigation
  - **Skill:** `frontend-developer`
  - **Target:** `src/features/diet/components/FoodBankScreen.tsx`
  - **Source:** `design.md` -> Integration
  - **Trace:** AC1
  - **Details:** Instead of immediately saving and calling `router.back()`, `handleAddFoodToMeal` should navigate to `/diet/add-food-to-meal?mealId=${mealId}&foodId=${foodId}`.

## 3. Validation
- [x] 3.1 Run TypeScript Validation
  - **Skill:** `code-reviewer`
  - **Target:** Terminal
  - **Details:** `npx tsc --noEmit`
