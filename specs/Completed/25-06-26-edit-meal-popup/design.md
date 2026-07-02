# Technical Design: Edit Meal Popup (Revision 4)

## 1. Architecture Overview
Instead of navigating away to `/diet/edit-meal`, we will use the existing `Dialog` primitive in `src/components/ui/dialog.tsx` to display a popup directly on `MenuScreen.tsx`. 
We will leverage `preparationState` inside the `Meal` database model to store the meal's time.

## 2. Interface Changes & Callbacks

### 2.1 MealCard Props & Callbacks
Modify `MealCard.tsx` to define and trigger an `onEdit` callback instead of performing a router push.

### 2.2 MealService persistence method
Implement `MealService.updateBasicInfo` to perform atomic updates to `name` and `preparationState`.

### 2.3 MenuScreen.tsx Popup Integration
Add states and render the `Dialog` when `editingMeal` is set. The popup's width is configured using the tailwind utility class `w-4/5` (representing 80% width) and a maximum width constraint of `max-w-[400px]`.
The buttons contain the Brazilian Portuguese labels "Cancelar" and "Salvar".
```typescript
  const [editingMeal, setEditingMeal] = useState<Meal | null>(null);
  const [editName, setEditName] = useState('');
  const [editTime, setEditTime] = useState('00:00');
```

### 2.4 Parent Screen Darkening
In `MenuScreen.tsx`, render an absolute overlay wrapper when `editingMeal` is open. This overlay uses the semantic token `bg-black-main/20` and covers the parent layout screen area below the Dialog:
```tsx
{!!editingMeal && (
  <View className="absolute inset-0 bg-black-main/20 z-40" pointerEvents="none" />
)}
```

## 3. Component Hierarchy
- `MenuScreen` (State manager, renders `Dialog`)
  - `Screen`
    - `View` (Parent screen layout)
      - `MealCard`
      - `Dialog` (Conditional rendering on `editingMeal` with class `w-4/5 max-w-[400px]`)
      - `Absolute Overlay` (Conditional rendering on `editingMeal` with class `bg-black-main/20`)

## 4. Security, Maintainability & Scalability
- **Scalability and Maintenance:** Strictly uses semantic design tokens (`bg-black-main/20`, standard width class `w-4/5`) at the component class level. Bypasses layout issues natively by rendering a clean overlay layer, ensuring robust cross-platform layouts without using hardcoded style overrides.
