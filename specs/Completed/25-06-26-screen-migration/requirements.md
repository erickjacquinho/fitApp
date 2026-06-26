# Requirements: Screen Migration

## 1. Overview
The project has introduced a new `Screen` primitive (`src/components/ui/screen.tsx`) that acts as the standard frame and layout structure for all pages. Currently, screens across the application use disparate wrappers (`<View className="flex-1">`, `<SafeAreaView>`, explicit `<Header>` components, and scattered `<ScrollView>` components). This feature covers the 100% migration of all screens in `app/` and `src/features/` to use the `Screen` primitive, as well as the creation of a global rule to enforce its usage.

## 2. Acceptance Criteria (EARS Pattern)

### 2.1 Refactor of `app/` Routes
- **WHEN** an `app/` route file (e.g., `app/diet/add-food-to-meal.tsx`) renders its content **THEN** the system SHALL use the `Screen` component as its root wrapper, passing the `header` prop instead of manually rendering `<Header>`.
- **WHEN** an `app/` route relies on safe areas **THEN** the system SHALL remove duplicate `<SafeAreaView>` components and rely on the `Screen` component's built-in safe area handling.

### 2.2 Refactor of Feature Screens (`src/features/`)
- **WHEN** a feature screen (e.g., `DashboardScreen.tsx`) handles its own scrolling **THEN** the system SHALL remove internal `<ScrollView>` wrappers and rely on the `Screen` component's `scrollable={true}` prop (or set it to `false` if the feature uses a `FlatList` internally).
- **WHEN** a feature screen requires padding **THEN** the system SHALL remove explicit `px-X` classes from its root element and rely on the `Screen` component's `withPadding={true}` prop.

### 2.3 Standardization Rule
- **WHEN** the migration is complete **THEN** the system SHALL have an updated `AGENTS.md` file (or equivalent rules file) containing an explicit, strict rule mandating the use of the `Screen` primitive for all new pages and screens.

## 3. Failure Scenarios & Edge Cases
- **FlatList Scenarios:** If a screen heavily relies on `FlatList`, `SectionList`, or RecyclerListView, using `Screen` with `scrollable={true}` will cause nested scroll errors. In such cases, `scrollable={false}` MUST be used.
- **Modals/Sheets:** Modal sheets or non-full-screen overlays should not use the `Screen` primitive unless they are full-screen modals.

## 4. Out of Scope
- Creating new features.
- Changing business logic inside the screens.
