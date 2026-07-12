# Implementation Plan: Weekly Calendar

## 1. Technical Context
- **Stack:** React Native (Expo), NativeWind v4, Reanimated v3, React Native Gesture Handler.
- **Apple Design & Motion:** The horizontal swipe must be driven by `Gesture.Pan()` from `react-native-gesture-handler` and `useSharedValue` + `withSpring` from `react-native-reanimated`.
- **Styling Rules:** Strict `tailwind.config.js` tokens. No inline styles except for `Animated.View` inside the gesture wrapper. The selected day uses the `primary` semantic color.

## 2. Proposed Architecture

### Components
1. `src/components/ui/weekly-calendar.tsx` (Canonical Primitive)
   - A highly reusable, dumb UI component.
   - Handles the 7-day layout, month selector, and "Hoje" button.
   - Props: `selectedDate`, `onDateSelect`, `currentMonth`, `onMonthChange`, `onJumpToToday`.
   - Utilizes `react-native-reanimated` and `react-native-gesture-handler` for the physical swipe interaction.
   
2. `src/features/dashboard/components/dashboard-calendar.tsx` (Domain Orchestrator)
   - Manages state for the selected date within the context of the dashboard.
   - Connects the dumb `WeeklyCalendar` to the dashboard's data fetching or state layer (Zustand/WatermelonDB).

3. `app/(tabs)/index.tsx` (Route)
   - Integrates `DashboardCalendar` at the top of the dashboard layout.

### Motion & Interactions (Apple Design Guidelines)
- **Interruptibility:** The pan gesture immediately updates the `translateX` shared value. If a programmatic animation (like Jump to Today) is running, grabbing the calendar will interrupt it seamlessly.
- **Momentum & Springs:** When the gesture ends, the release velocity is passed to `withDecay` or a calculated snap point using `withSpring` (with `damping: 1.0` or slightly bouncy `0.8` if there's high velocity).
- **Rubber-banding:** If the user drags beyond the boundaries (e.g., trying to scroll before the 1st of the month or past the 31st), a friction function applies logarithmic resistance.

## 3. Visual Design (Mineral Warm)
- **Backgrounds:** The calendar container uses `bg-surface` or transparent, while the individual day cards use `bg-surface-elevated`.
- **Selected State:** The active day card switches to `bg-primary` with `text-inverse`.
- **Typography:** Uses the canonical `Text` component. Month and day abbreviations use a slightly smaller, secondary text style (`text-secondary`), while the numeric day is prominent and bold.
- **Layout:** The "Hoje" button is positioned top-right, aligned with the month selector on the left, maintaining a balanced header above the grid.

## 4. Constitution Check
- **Zero Hardcoded Styles:** All styles will use NativeWind classes mapped to the `tailwind.config.js` tokens, with the exception of the Reanimated dynamic `transform` style.
- **Blue-First Palette:** The primary selection color strictly adheres to the blue-first rule.
