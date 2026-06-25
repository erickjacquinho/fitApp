# Design: Diet Performance Optimizations

## Proposed Architecture

### 1. MealCard Optimization
- Remove the `macros` state.
- Create a `useMemo` block that calculates macros based on the `foodItems` state:
  ```typescript
  const macros = React.useMemo(() => aggregateMacros(foodItems), [foodItems]);
  ```
- This avoids double-rendering when `foodItems` and `macros` update.

### 2. MenuScreen Component Optimization
- Wrap the `confirmDelete` call inside a `useCallback` hook in `MenuScreenComponent` to establish a stable reference:
  ```typescript
  const handleConfirmDelete = useCallback((id: string) => {
    setSelectedMealId(id);
    setDeleteModalVisible(true);
  }, []);
  ```
- Adjust `MealCardContentProps` to accept `onDelete: (id: string) => void`.
- In `MealCardContent`, call `onDelete(meal.id)` instead of a parameterless `onDelete()`.
- Wrap the render callback of `DraggableFlatList` items to pass this stable callback to prevent re-creation of arrow functions on every render:
  ```typescript
  onDelete={handleConfirmDelete}
  ```

### Unidirectional Layer Mapping
- **Types:** Update component prop contracts.
- **Components:** Apply optimizations inside `MealCard` and `MenuScreenComponent`.
