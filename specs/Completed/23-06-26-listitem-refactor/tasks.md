# Task Breakdown: ListItem Refactor and Integration

## 1. Components: Refactor ListItem
- **Target**: `src/components/molecules/ListItem.tsx`
- **Source**: `design.md` Components
- **Trace**: AC3, AC4
- **Skill**: `frontend-developer`
- **Description**: Refactor `ListItem` to ensure it has no "viagem" code. Use standard generic primitives, strictly adhering to `tailwind.config.js` tokens and NativeWind conventions. Add `Separator` from `src/components/ui/separator` at the bottom instead of using CSS borders, or ensure the class names are perfectly aligned with `@react-native-reusables`.

## 2. Components: Refactor FoodBankScreen
- **Target**: `src/features/diet/components/FoodBankScreen.tsx`
- **Source**: `design.md` Components
- **Trace**: AC1
- **Skill**: `frontend-developer`
- **Description**: Replace the inner content of `SwipeableCard` with `ListItem`. Map `title` to `item.name`, `subtitle` to macros, and `rightAccessory` to calories. Ensure the list looks like a standard separated list instead of a list of floating cards. Remove margin-bottom from cards if they are now separated list items.

## 3. Components: Refactor CalendarSummaryScreen
- **Target**: `src/features/diet/components/CalendarSummaryScreen.tsx`, `src/components/molecules/DailySummaryCard.tsx`
- **Source**: `design.md` Components
- **Trace**: AC2
- **Skill**: `frontend-developer`
- **Description**: Refactor `DailySummaryCard` to be composed of `ListItem` (or directly use `ListItem` in `CalendarSummaryScreen` and delete `DailySummaryCard`). Map the date to `title` and macros to `subtitle`. Ensure it displays as a continuous list with dividers.

## 4. Integration: Final Audit & Validation
- **Target**: Entire project
- **Source**: `design.md` Unidirectional Layer Mapping
- **Trace**: AC1, AC2, AC3, AC4
- **Skill**: `sdd`
- **Description**: Run `npx tsc --noEmit` to ensure typescript is happy. Ensure the UI compiles without errors.

- [x] All tasks completed and verified.

