# Technical Design: Add Food To Meal Screen

## Architecture Mapping

### 1. Types
- Reuse `MealItem` and `Food` WatermelonDB Models.

### 2. Services
- **`MealService.addItemToMeal`**: Existing method to save `MealItem` into the DB.

### 3. Components

#### `app/diet/add-food-to-meal.tsx`
- **Role:** Expo Router entry point.
- **Responsibilities:**
  - Extracts `foodId` and `mealId` from `useLocalSearchParams`.
  - Provides a `<Header title="Adicionar à Refeição" showBackButton />`.
  - Renders `AddFoodToMealScreen`.

#### `src/features/diet/components/AddFoodToMealScreen.tsx`
- **Role:** Main UI for quantity input and nutritional preview.
- **Props:** `food: Food`, `mealId: string`
- **Observability:** Wrapped with `withObservables(['foodId'])` to fetch the `Food` record.
- **State:**
  - `quantity: string` (default `'100'`).
- **Behaviors:**
  - Parses `quantity` to a number.
  - Dynamically calculates macros based on `(quantity / 100) * baseMacro`.
  - Disables the add button if `quantity <= 0` or invalid.
  - Submits via `MealService.addItemToMeal(mealId, food.id, quantity)`.
  - Calls `router.dismiss(2)` or `router.push('/diet/menu')` to return to the MenuScreen. Since the stack is `Menu -> FoodBank -> AddFoodToMeal`, navigating back to Menu implies popping 2 screens or routing back explicitly.

## Core Pillars
- **Security:** N/A (local DB).
- **Maintainability:** Modular component isolated from the Food Bank. Reuses existing visual styles and tokens.
- **Scalability:** The dynamic calculation function `(q / 100) * base` is standard and predictable.
