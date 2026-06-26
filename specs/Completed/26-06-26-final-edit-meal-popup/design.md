# Technical Design: Final Edit Meal Popup

## 1. Component Actions & Communication

### 1.1 `MealCard.tsx`
- Add `onEdit: (meal: Meal) => void` prop to `MealCardContentProps`.
- Replace the legacy router navigation inside the dropdown edit menu item with a direct call to `onEdit(meal)`.
- Pass down `onEdit` from `MealCardComponent` and include it in the `React.memo` dependency equality check array.

### 1.2 `MenuScreen.tsx`
- Declare state variables:
  - `editingMeal: Meal | null`
  - `editName: string`
  - `editTime: string`
- Add a `useEffect` watching `editingMeal` changes to populate `editName` and `editTime` (defaulting to the meal's `preparationState` or `'00:00'`).
- Implement `handleSaveEdit`:
  - Call `MealService.updateBasicInfo(editingMeal.id, editName, editTime)`.
  - Reset `editingMeal` to `null`.
- Mount the `<Dialog>` primitive directly in the main screen JSX:
  - Connect its `open` prop to `!!editingMeal`.
  - Pass `overlayActive={!!editingMeal}` to the parent `<Screen>` component.
  - Sizing constraints: `className="w-4/5 max-w-[400px]"` on `DialogContent`.
  - Enforce explicit text styles on button children to prevent color/sizing layout bugs on mobile clients.

## 2. Shared Dialog Constraints
- Resolved dialog width issues in `src/components/ui/dialog.tsx` by applying `className="w-full items-center justify-center"` directly on the nested animation `NativeOnlyAnimatedView` layers inside `DialogOverlay` to stop flex-container width collapse on React Native.
