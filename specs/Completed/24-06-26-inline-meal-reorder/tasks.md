# Tasks: Inline Meal Reordering

## 1. Types & Props
- [x] **Task 1.1: Update `MealCard` Props**
- **Target**: `src/features/diet/components/MealCard.tsx`
- **Source**: `design.md` -> Architecture & Layers
- **Trace**: "WHEN the user long-presses on the header..."
- **Skill**: `frontend-developer`
- **Description**: Add `onLongPressHeader?: () => void` to the component props type definition.

## 2. Components
- [x] **Task 2.1: Integrate `LongPressable` into `MealCard`**
- **Target**: `src/features/diet/components/MealCard.tsx`
- **Source**: `design.md` -> Components
- **Trace**: "WHEN the user long-presses on the header..."
- **Skill**: `frontend-developer`
- **Description**: Import `LongPressable` from `@/components/ui/long-pressable`. Replace the header `View` (`<View className="px-4 h-control-md...`) with `<LongPressable onLongPress={onLongPressHeader}>` while preserving its styling.

- [x] **Task 2.2: Create `ReorderMealRow` Component**
- **Target**: `src/features/diet/components/ReorderMealRow.tsx`
- **Source**: `design.md` -> Components
- **Trace**: "minimized drag-enabled view, displaying only a drag handle..."
- **Skill**: `frontend-developer`
- **Description**: Create a new file for `ReorderMealRow`. It should receive a `Meal`, a `drag` function, and an `isActive` boolean. Render a sleek surface container with the meal name and the `GripVertical` icon. Use `ScaleDecorator` to wrap the row. Export it.

## 3. Integration & State
- [x] **Task 3.1: Setup Reorder State in `MenuScreen`**
- **Target**: `src/features/diet/components/MenuScreen.tsx`
- **Source**: `design.md` -> State Management
- **Trace**: State needed to hold volatile reorder list.
- **Skill**: `frontend-developer`
- **Description**: Add `isReordering` (boolean, default false) and `tempMeals` (`Meal[]`, default `[]`) to the state. Add `startReorder()` which sets `tempMeals` to `meals`, calls `LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)`, and sets `isReordering(true)`.

- [x] **Task 3.2: Render Action Buttons in `MenuScreen`**
- **Target**: `src/features/diet/components/MenuScreen.tsx`
- **Source**: `design.md` -> MenuScreen Layout
- **Trace**: "display two action buttons above the meal list"
- **Skill**: `frontend-developer`
- **Description**: In the `MenuScreen` render block, if `isReordering` is true, render a row at the top (above the list) containing two Buttons: "Cancelar" (variant=outline) and "Confirmar".

- [x] **Task 3.3: Conditional List Rendering in `MenuScreen`**
- **Target**: `src/features/diet/components/MenuScreen.tsx`
- **Source**: `design.md` -> MenuScreen Layout
- **Trace**: "smoothly transition the meal list into a minimized drag-enabled view"
- **Skill**: `frontend-developer`
- **Description**: Modify `MainTabScreen` props. Pass `isFlatList={!isReordering}`. When `isReordering` is true, render a `GestureHandlerRootView` wrapping a `DraggableFlatList` inside the screen's children. Connect `DraggableFlatList` to `tempMeals`, use `ReorderMealRow` for `renderItem`, and update `tempMeals` on `onDragEnd`. Pass `onLongPressHeader={startReorder}` to standard `MealCard` instances when rendering the normal `FlatList`.

- [x] **Task 3.4: Reorder Action Logic**
- **Target**: `src/features/diet/components/MenuScreen.tsx`
- **Source**: `design.md` -> State Management
- **Trace**: "system SHALL persist the new order... or discard any order changes"
- **Skill**: `frontend-developer`
- **Description**: Implement `confirmReorder()`: Call `MealService.updateMealOrder` mapping `tempMeals` to IDs, trigger `LayoutAnimation`, and set `isReordering(false)`. Implement `cancelReorder()`: trigger `LayoutAnimation` and set `isReordering(false)`.

## 4. Cleanup & Validation
- [x] **Task 4.1: Remove `ReorderMealsModal`**
- **Target**: `src/features/diet/components/ReorderMealsModal.tsx` & `src/features/diet/components/MenuScreen.tsx`
- **Source**: `requirements.md` -> Acceptance Criteria
- **Trace**: "ReorderMealsModal SHALL be completely removed"
- **Skill**: `frontend-developer`
- **Description**: Delete `ReorderMealsModal.tsx`. Remove all related imports and state (`reorderModalVisible`, `setReorderModalVisible`) from `MenuScreen.tsx`, including the `ArrowUpDown` button from `MainTabScreen`'s `headerLeft`.

- [x] **Task 4.2: Technical Validation**
- **Target**: Entire Workspace
- **Source**: `sdd` skill requirements
- **Trace**: Quality Assurance
- **Skill**: `frontend-developer`
- **Description**: Run `npx tsc --noEmit` and run related jest tests `npx jest --no-coverage --testPathPattern="diet"`.
