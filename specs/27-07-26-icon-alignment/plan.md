# Implementation Plan: Icon UI/UX Alignment & Accessibility Standard

## Technical Context
- **Stack**: React Native (Expo Router), NativeWind v4, Lucide Icons (`lucide-react-native`).
- **Core Primitives**: `Icon` wrapper in `src/components/ui/icon.tsx`.
- **Target Touch Area**: Minimum 44x44pt (`min-h-[44px] min-w-[44px]` or `hitSlop`).
- **Target Press Feedback**: `active:opacity-80` without background fills on ghost icon buttons.
- **Target Sizing Tokens**: `icon-sm` (16px), `icon-md` (20px), `icon-lg` (24px).

---

## Proposed Changes

### Rule Formalization & Governance
- Modify `.agents/rules/04-ui-components.md` to add a dedicated Icon Discipline section covering touch target (44px), sizing tokens (`icon-sm`, `icon-md`, `icon-lg`), ghost opacity feedback (`active:opacity-80`), stroke width consistency, and accessibility requirements.
- Modify `.agents/rules/06-ui-content-a11y.md` to reinforce icon accessibility roles and labels.

### Shared UI Molecule Refactoring
- **`Header.tsx`**: Ensure back button and right action icons have `min-h-[44px] min-w-[44px]` touch target, `active:opacity-80`, `accessibilityRole="button"`, and `accessibilityLabel`.
- **`DateSelector.tsx`**: Ensure previous/next chevron buttons have `min-h-[44px] min-w-[44px]` touch targets and localized accessibility labels ("Dia anterior", "Próximo dia").
- **`SearchBar.tsx`**: Ensure search and clear action icons preserve minimum 44px hit areas and non-shifting opacity press feedback.

### Feature Component Refactoring
- **`MealCard.tsx` / `BulkSelectionMenu.tsx`**: Ensure macro and option action icons fulfill 44px tap targets and accessibility labels.
- **`ExerciseDraggableItem.tsx`**: Enforce 44px drag touch target area and haptic feedback on drag initiation.
- **`WorkoutSessionListHeader.tsx` / `WorkoutListItem.tsx`**: Standardize header action icons and options menus with accessibility roles and non-background press states.

---

## Verification Plan

### Automated Verification
- Run `npx tsc --noEmit` to verify strict TypeScript compilation.
- Run `npm run lint` to ensure code formatting compliance.

### Manual & Runtime Verification
- Verify on Android development client or emulator:
  1. Inspect icon hit areas (ensure 44x44pt touch area for all icon-only buttons).
  2. Tap ghost icon controls to verify visual stability (zero layout shift, pure `active:opacity-80` feedback).
  3. Turn on screen reader (TalkBack/VoiceOver) to confirm icon-only controls emit clear localized labels.
