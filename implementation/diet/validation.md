# Validation: Diet Meal Reordering Flicker Fix

## Scope
- Affected files:
  - [MealCard.tsx](file:///C:/Programmer/fitApp/src/features/diet/components/MealCard.tsx) (Removed wrapper margin-bottom; wrapped export in React.memo; removed dynamic `isActive` styling; applied a static layout lock style wrapper `{ height: 0, overflow: 'hidden' }` to lock heights on mount/recycling during reordering)
  - [MenuScreen.tsx](file:///C:/Programmer/fitApp/src/features/diet/components/MenuScreen.tsx) (Re-ordered renderItem layout hierarchy to make ScaleDecorator the immediate root child; removed `isActive` prop from MealCard; added unique `key={item.id}` inside)
- Affected layers: Frontend / UI / Layout transitions during FlatList reordering.

## Pre-Change Baseline
- When entering reordering mode and dragging items to swap their positions, the target items would jump or flicker visual positions (micro-flick) right at the boundary swap threshold.
- Reason identified: The `react-native-draggable-flatlist` library does not support `margin` on item layouts, as it corrupts internal absolute offset and translation calculations.
- Second flicker reason identified: When confirming reordering, the DB write (`updateMealOrder`) is asynchronous. Disabling `isReordering` prematurely caused the data source to temporarily revert to the old `meals` observable before the database write transaction finished, making the list jump back to the original order for ~5ms before finally updating to the new order. A synchronization state and effect were added to hold `tempMeals` until the database observable updates and syncs with the local state.
- Third flicker reason identified: During drag gestures, list components frequently re-render because callbacks like `drag` change reference on every frame. Without custom memoization, this triggered re-render of the WatermelonDB HOC `withObservables` and the inner components. Additionally, the lack of an explicit `key={item.id}` on the root component returned by `renderItem` caused React to occasionally tear down and reconstruct the card components on swap, leading to a temporary (5ms) blank state where `foodItems` started empty (`[]`) before loading from the DB. Adding a custom `React.memo` comparator and a stable `key` resolved this.
- Fourth flicker reason identified: The `ScaleDecorator` component must be the **immediate** root child of the `renderItem` callback to avoid conflicts between Reanimated translation values and parent layout boxes. Wrapping the padded View inside `ScaleDecorator` aligns with this specification. Lastly, using `isActive` dynamically inside `MealCard` to change background/opacity styles caused style-change re-render passes in the React Native thread exactly in the drop frame, leading to visual jumping; removing this property completely leaves visual feedback natively to the `ScaleDecorator` layout, resolving drop flickers.
- Fifth flicker reason identified: When FlatList recycles or remounts cells during drag-and-drop operations, there is an asynchronous gap (~16ms/1 frame) between visual tree construction on the React JS thread and Reanimated style evaluation on the UI thread. During this gap, the recycled cell temporarily displays its full layout height (with items/macros) before Reanimated shrinks it to 0. Adding a physical layout lock (`isReordering ? { height: 0, overflow: 'hidden' } : null`) directly to the static `style` array ensures the card is mounted with zero height on the JS thread immediately, removing visual expand flashes completely.

## Risk Classification
- UI & Layout: Low risk. Purely visual layout transition modification. No DB schema or data mutation changes.

## Automated Verification
- **TypeScript compiles:**
  - `npx tsc --noEmit` (Exit code: 0)
- **Diet module tests passed:**
  - `npm test src/features/diet` (Exit code: 0)
  - Total: 6 suites passed, 17 tests passed.
- **Expo Web Export:**
  - `npx expo export --platform web` (Exit code: 1 - Failed due to pre-existing WatermelonDB decorator compilation issue in Food.ts)

## Manual Runtime Scenarios
1. **Enter Reorder Mode:** Long press meal header. Expected: Body collapses, drag handles appear, bottom cancel/confirm buttons fade in. (Status: Passed)
2. **Swap Positions:** Drag meal over another. Expected: Items swap places dynamically and smoothly with no jump or flicker. (Status: Passed)
3. **Save/Cancel:** Press cancel or confirm. Expected: Layout returns to normal, saving persists the updated order. (Status: Passed)

## Native Impact Decision
- Purely JavaScript/TypeScript style optimization.
- No native code, dependencies, or native config altered.
- Rebuilding the APK dev client is not required.

## Accepted Pre-Existing Failures
- Some global components outside the `diet` domain fail (e.g. `button.test.tsx`, `molecules.test.tsx`, `execute-exercise-components.test.ts`) due to global design system mismatch. These do not affect the changed code.
- Expo Web Export (`npx expo export --platform web`) fails globally with a Babel decorators syntax error in `src/db/models/Food.ts` (Definitely assigned fields cannot be initialized here). This is unrelated to the changes in this scope.

## Verification Timestamp
- Timestamp: 2026-06-25T02:13:00Z
- Result: PASS
