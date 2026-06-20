# Design: Diet Meals Refactoring

## 1. Overview
The diet tab will be refactored to support a structured meal layout. The daily balance will be aggregated into a single line, and foods will be grouped inside specific Meal cards rather than floating freely.

## 2. Core Pillars Alignment
1. **Security:** No new attack vectors. Using established Expo Router for navigation and existing WatermelonDB queries.
2. **Maintainability:** Utilizing strict unidirectional layer mapping (Types -> Services -> Hooks -> Components). Component extraction (`DailyBalance`, `FoodEntryCard`, `MealMacrosSummary`) ensures single-responsibility.
3. **Scalability:** Relying on `@nozbe/with-observables` to reactively compute macros locally inside each `MealCard` to prevent full-list re-renders.

## 3. Strict Unidirectional Layer Mapping

### 3.1 Types
- **Contracts:**
  ```typescript
  export interface Macros {
    protein: number;
    carbs: number;
    fat: number;
    calories: number;
  }
  ```

### 3.2 Services (Utilities)
- **Macro Aggregation:**
  Create a utility function to calculate a `Food`'s macros based on its `quantity` and `preparationWeight`, and another utility to aggregate multiple items into a single `Macros` object.

### 3.3 Hooks
- `useMenu`: Refactored to fetch all meals and compute the overall daily aggregated `Macros` instead of just total calories.

### 3.4 Components
- `DailyBalance`: Renders the formatted line `P: X; C: Y; G: Z; Kcal: W`.
- `MenuScreen`: Main container. Replaces standalone buttons. Renders a `FlatList` of `MealCard`s.
- `MealCard`: Container for a single meal. Displays its name, a list of `FoodEntryCard`s, the `[+ Adicionar Alimento]` button, and a `MealMacrosSummary`.
- `FoodEntryCard`: Renders individual food items added to a meal.
- `MealMacrosSummary`: Renders the aggregated macros at the bottom of the `MealCard`.

## 4. Technical Decisions
- **Data Models:** Do not reinvent domain entities. We will reuse `Meal`, `MealItem`, and `Food` from the existing WatermelonDB schema.
- **Reactivity:** Use WatermelonDB observability (`withObservables`) inside `MealCard` to observe its `items` and calculate local macros without triggering parent re-renders.
