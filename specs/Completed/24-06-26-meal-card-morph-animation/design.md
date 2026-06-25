# Design: Meal Card Morph Animation

## 1. Architectural Approach
We will utilize `react-native-reanimated` to orchestrate layout and opacity transitions within the same component. `MealCard` will now encapsulate both the "detailed" and "minimized" (reordering) states. This unification allows Reanimated to seamlessly interpolate the layout boundaries (`LinearTransition`) while entering/exiting individual content blocks (`FadeIn`/`FadeOut`).

## 2. Component Design: `MealCard`

### Props Updates
The `MealCard` (and its inner `MealCardContent`) must accept the following new properties:
- `isReordering: boolean` (to determine which state to render)
- `drag?: () => void` (provided by `DraggableFlatList` to initiate dragging)
- `isActive?: boolean` (provided by `DraggableFlatList` to style the dragged item)

### Reanimated Integration
1. **Root Container:** 
   The outermost `<View>` will be changed to `<Animated.View>`.
   It will receive `layout={LinearTransition.springify().damping(16).stiffness(150)}` to ensure smooth container resizing.
   Its background color or opacity will react to the `isActive` prop (using standard styling or Reanimated styles).
2. **Header Area:** 
   The header contains the persistent `Text` for the meal name.
   - The right accessory (time and trash icon) will be wrapped in `{!isReordering && <Animated.View exiting={FadeOut} entering={FadeIn}>...`
   - The `GripVertical` icon will be wrapped in `{isReordering && <Animated.View exiting={FadeOut} entering={FadeIn}>...`
   - To prevent layout jumps during the crossfade, the header layout should be flexible (`justify-between`), or the icons should be absolutely positioned if necessary (flex layout usually handles this well with `LinearTransition`).
3. **Body Area:**
   The `MacroProportionBar` and the foods list will be enclosed in an `Animated.View` rendered conditionally:
   `{!isReordering && <Animated.View exiting={FadeOut.duration(200)} entering={FadeIn.duration(200)}> ... </Animated.View>}`

### Touch & Drag Logic
- In normal mode, the header can still be a `LongPressable` that triggers `startReorder`.
- In reorder mode, the header (or the whole card) should respond to the `drag` function passed from `DraggableFlatList`. We will attach `onLongPress={drag}` to the `LongPressable` when `isReordering` is true.

## 3. Integration with `MenuScreen`

`MenuScreen` currently uses `ReorderMealRow` for the reordering state and `MealCard` for the normal state.
- `MenuScreen` will be updated to always render `<MealCard>` inside the `DraggableFlatList`.
- We will pass `isReordering={isReordering}`, `drag={drag}`, and `isActive={isActive}` directly to `MealCard`.
- `ReorderMealRow.tsx` will be completely deleted as its purpose is now fulfilled by the morphing `MealCard`.

## 4. Edge Cases
- **Simultaneous Animations:** When the user toggles `isReordering`, `LayoutAnimation` (which was previously added to `MenuScreen`) might conflict with Reanimated's `LinearTransition`. We MUST remove `LayoutAnimation.configureNext` calls in `MenuScreen` to allow Reanimated to take full control of the list item animations.
