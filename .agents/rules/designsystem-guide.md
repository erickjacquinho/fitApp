# Design System Guide - FitApp

This guide defines the atomic components of FitApp. Adhering to these structural patterns ensures a consistent UI and prevents redundant component creation.

## 1. Atomic Design Strategy
Components MUST be categorized by complexity and reuse scope:

### 1.1. Atoms (`src/components/atoms/`)
Indivisible base units. They define global UI style.
- **`Button`**: Variants (`primary`, `secondary`, `outline`, `ghost`, `danger`). Sizes (`sm`, `md`, `lg`).
- **`Typography`**: Hierarchy (`h1`, `h2`, `h3`, `body`, `caption`, `label`). Colors (`default`, `muted`, `success`, `error`).
- **`Input`**: Text/Number/Multiline. Focused/Error/Disabled states.
- **`Icon`**: Wrapper for Lucide or Expo Icons.
- **`Badge`**: For status or macro categories (Carbs, Protein, Fats).

### 1.2. Molecules (`src/components/molecules/`)
Functional units combining 2+ atoms.
- **`LabeledInput`**: Typography (Label) + Input + Typography (Error).
- **`IconButton`**: Button focused on an Icon without visible text.
- **`ListItem`**: Base structure for lists (Title, Subtitle, optional right accessory).
- **`SearchBar`**: Search Icon + Input + Clear button.
- **`SegmentedControl`**: Tabs for switching contexts (e.g., Weekly/Monthly view).

### 1.3. Organisms (`src/components/organisms/`)
Complex, feature-linked, or layout-defining sections.
- **`WorkoutCard`**: Exercises list, duration, and status.
- **`FoodCard`**: Macro summary, quantity, and meal registration.
- **`ChartHub`**: Evolutionary charts with filters.
- **`EmptyState`**: UI for empty lists with a mandatory Call-to-Action (CTA).
- **`BottomSheet`**: Advanced modal for quick forms (e.g., logging food or reps).

## 2. Reusability Protocol (MANDATORY)
Before creating any new UI component:
1. **Search**: Look in `src/components/` for existing atoms/molecules.
2. **Extend**: Add a prop to an existing component instead of duplicating it.
3. **Refactor**: If a component is specific to a feature, keep it in `src/features/<name>/components/`. If it becomes needed elsewhere, move it to `src/components/`.

## 3. Interaction Patterns
- **Feedback**: Every interactive element MUST have a visual state for `pressed` (Opacity or Scale down).
- **Loading**: Use the `Skeleton` atom for initial data fetching states.
- **Accessibility**: Use appropriate `accessibilityRole` and `accessibilityLabel` for all interactive elements.

## 4. Constraint Checklist
- **No Inline Styles**: Use NativeWind classes.
- **No Hardcoded Values**: Use Tailwind config tokens.
- **Composition over Inheritance**: Use the `children` prop for flexible layout components.
