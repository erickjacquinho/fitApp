# 04. UI Components, Forms & Data Display

## 1. Component Rules
- **Canonical Primitives**: Must live in `src/components/ui/` and originate from `@react-native-reusables`.
- **Card vs View**: Use `Card` (nested cards are forbidden) to group independent content. Use `View` for structural layout, padding, and background coloration without elevation.
- **Popups**: NEVER use native `Modal` directly. Use `AlertDialog` (blocking decisions), `Dialog` (supplementary content), or `BottomSheetModal` (non-blocking).
- **Icons (Lucide)**: Use `as` prop. Sizes: `icon-sm` (16px), `icon-md` (20px), `icon-lg` (24px). Primary action icons use `blue-500`.

## 2. Forms
- **Structure**: Single-column only. Order: 1. Label, 2. Input, 3. Helper/Error.
- **Labels**: Required unless context is unmistakable. Do not rely solely on placeholders.
- **Errors**: Validate on submit by default. Use `text-error` tokens next to the field.
- **Actions**: Async actions must disable duplicate submissions.

## 3. Data Display & Lists
- **Grouped List Box Pattern**: All lists (history, workouts, foods) MUST use the grouped box pattern. The component calculates `isFirst` and `isLast` and passes to the item to apply dynamic borders/radius (`rounded-t-lg`, `border-b`, etc).
- **Progress**: Include readable numeric values. Do not rely only on color.
- **Empty States**: Must have a short title, context, and one clear CTA. Do not use illustration-heavy states.
- **Feedback**: Use skeletons (mirroring final layout) for content-heavy loading. Use Toast for non-blocking confirmation.
