# Tasks: Meal Card Morph Animation

## 1. Component Props & Types
- [x] **Task 1.1: Update `MealCard` Props**
  - **Target:** `src/features/diet/components/MealCard.tsx`
  - **Skill:** `frontend-developer`
  - **Description:** Add `isReordering?: boolean`, `drag?: () => void`, and `isActive?: boolean` to the props definition of both `MealCard` and `MealCardContent`.

## 2. Refactor MealCard
- [x] **Task 2.1: Apply Reanimated Root & Layout Transition**
  - **Target:** `src/features/diet/components/MealCard.tsx`
  - **Skill:** `frontend-developer`
  - **Description:** Import `Animated, { FadeIn, FadeOut, LinearTransition }` from `react-native-reanimated`. Change the outermost root `View` of `MealCardContent` to an `Animated.View` and add `layout={LinearTransition.springify().damping(16).stiffness(150)}`. Add styling logic for `isActive` (e.g. changing opacity or background when being dragged).
- [x] **Task 2.2: Refactor Header for Morphing**
  - **Target:** `src/features/diet/components/MealCard.tsx`
  - **Skill:** `frontend-developer`
  - **Description:** Update the `LongPressable` to use `onLongPress={isReordering ? drag : onLongPressHeader}`. Make sure it ignores `onLongPressHeader` if it's undefined. Conditionally render the trash/time icons inside an `Animated.View` with `exiting={FadeOut}` and `entering={FadeIn}` only when `!isReordering`. Render the `GripVertical` icon inside a similar `Animated.View` when `isReordering` is true.
- [x] **Task 2.3: Refactor Body Content for Morphing**
  - **Target:** `src/features/diet/components/MealCard.tsx`
  - **Skill:** `frontend-developer`
  - **Description:** Wrap the `MacroProportionBar`, the food list, and the add button in a single conditional block `{!isReordering && (<Animated.View exiting={FadeOut} entering={FadeIn}> ... </Animated.View>)}`.

## 3. MenuScreen Integration
- [x] **Task 3.1: Use MealCard for Reordering**
  - **Target:** `src/features/diet/components/MenuScreen.tsx`
  - **Skill:** `frontend-developer`
  - **Description:** In `DraggableFlatList` `renderItem`, remove the `if (isReordering)` branch that returns `ReorderMealRow`. Instead, always return `<MealCard meal={item} isReordering={isReordering} drag={drag} isActive={isActive} onDelete={() => confirmDelete(item.id)} onLongPressHeader={startReorder} />`.
- [x] **Task 3.2: Remove LayoutAnimation**
  - **Target:** `src/features/diet/components/MenuScreen.tsx`
  - **Skill:** `frontend-developer`
  - **Description:** Remove the `LayoutAnimation.configureNext` calls inside `startReorder`, `confirmReorder`, and `cancelReorder` to avoid conflicting with Reanimated's layout transitions.

## 4. Cleanup & Validation
- [x] **Task 4.1: Delete `ReorderMealRow`**
  - **Target:** `src/features/diet/components/ReorderMealRow.tsx`
  - **Skill:** `frontend-developer`
  - **Description:** Delete the file `ReorderMealRow.tsx` and remove its import from `MenuScreen.tsx`. Update `diet-components.test.ts` or `meal-form-components.test.ts` if they reference it.
- [x] **Task 4.2: Technical Validation**
  - **Target:** Entire Workspace
  - **Skill:** `frontend-developer`
  - **Description:** Run `npx tsc --noEmit` and `npx jest --no-coverage --testPathPattern="diet"` to ensure no typing or test failures.
