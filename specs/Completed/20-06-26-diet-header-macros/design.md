# Technical Design: Diet Header and Macros Redesign

## Architecture Mapping

### 1. Types
- No changes required.

### 2. Components

#### `src/components/molecules/Header.tsx`
- **Role:** Generic Screen Header.
- **Change:** Add optional `leftIcon`, `onLeftPress`, `rightIcon`, and `onRightPress` props to allow custom header actions while preserving existing `showBackButton` logic.

#### `src/features/diet/components/MenuScreen.tsx`
- **Role:** Main diet content.
- **Change:** 
  - Remove the inline "Reordenar Refeições" button from the `FlatList` header.
  - The `reorderModalVisible` state remains, but its setter will be passed or triggered from the tab header. Wait, `MenuScreen` does not control the `Header` if the `Header` is rendered by `MainTabScreen` or `diet.tsx`. 
  - **Decision:** Since `MenuScreen` has the `meals` data required by `ReorderMealsModal`, it's best to include the `Header` directly inside `MenuScreen` instead of `MainTabScreen` or `diet.tsx`, OR pass the header icons directly to `MainTabScreen`.
  - Let's update `MainTabScreen` to accept `headerRight` and `headerLeft` nodes.

#### `src/components/organisms/main-tab-screen.tsx`
- **Role:** Screen wrapper.
- **Change:** 
  - Remove the rendering of `eyebrow`, `title`, and `description` from the body.
  - Pass down `headerLeft` and `headerRight` to `<Header />`.

#### `src/features/diet/components/DailyBalance.tsx`
- **Role:** Displays daily summary.
- **Change:** Change the container layout from `flex-row` to `flex-row flex-wrap`. Set each of the 4 items to `w-1/2 p-2` to create a 2x2 grid. Add explicit borders/dividers if needed for equal quadrants.

## Core Pillars
- **Security:** N/A.
- **Maintainability:** Refactoring `Header` and `MainTabScreen` increases their reusability across the app.
- **Scalability:** 2x2 macro grid ensures consistent UI scaling on all devices.
