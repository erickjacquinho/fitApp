# Technical Design: Inline Meal Reordering

## Architecture & Layers
The feature bridges the UI and Services layers inside `MenuScreen` without introducing new domain concepts.

### 1. Types & Interfaces
- No new database schemas.
- `MealCardProps` needs a new optional `onLongPressHeader?: () => void` prop.

### 2. Services
- `MealService.updateMealOrder(ids: string[])` will be reused.

### 3. State Management (`MenuScreen.tsx`)
- Add `isReordering` (boolean) state.
- Add `tempMeals` (Meal[]) state to hold the volatile order during drag-and-drop.
- **Actions**: 
  - `startReorder()`: Updates `tempMeals` with the current `meals`, toggles `isReordering` = true, and triggers `LayoutAnimation`.
  - `confirmReorder()`: Extracts IDs from `tempMeals`, calls `MealService.updateMealOrder(ids)`, toggles `isReordering` = false, triggers `LayoutAnimation`.
  - `cancelReorder()`: Toggles `isReordering` = false, triggers `LayoutAnimation`.

### 4. Components
**`MealCard.tsx`**
- Import `LongPressable` from `@/components/ui/long-pressable`.
- Wrap the header `<View className="px-4 h-control-md...">` with `<LongPressable onLongPress={onLongPressHeader}>`.

**`ReorderMealRow.tsx` (New Component inside `features/diet/components/`)**
- A simple stateless component for the minimized view.
- Contains: Background surface, Border, Meal Name (`Text`), and Grip icon (`lucide-react-native`).
- Receives `drag` and `isActive` from `DraggableFlatList` context to handle style feedback.

**`MenuScreen.tsx` Layout**
- Conditionally render based on `isReordering`.
- When `!isReordering`: Use `MainTabScreen` with `isFlatList={true}`.
- When `isReordering`: Use `MainTabScreen` with `isFlatList={false}` and `scrollable={false}`. Inside `children`:
  1. A `View` containing the "Confirmar" and "Cancelar" buttons at the top.
  2. A `GestureHandlerRootView` wrapping a `DraggableFlatList`.
  3. `DraggableFlatList` receives `data={tempMeals}`, `onDragEnd={({ data }) => setTempMeals(data)}`, and renders `ReorderMealRow`.

### 5. Animation Strategy
- Use React Native's `LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)` before toggling `isReordering` state to provide the smooth transition between the expanded standard flatlist and the minimized draggable flatlist.
- `ScaleDecorator` from `react-native-draggable-flatlist` provides the active lift feedback during drag.

## Core Pillars Audit
- **Security**: Database mutations happen only on explicit 'Confirmar' action. Unsaved changes are safely discarded on cancel.
- **Maintainability**: Eliminates the complex Modal workaround previously required for gestures. Keeps UI components decoupled.
- **Scalability**: Leveraging `LayoutAnimation` natively drives the transition without massive re-renders or custom complex Reanimated hooks.
