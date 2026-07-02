# Requirements: Screen Primitive

## 1. Overview
A primitive `Screen` component that serves as the standard frame and layout structure for all new pages/screens in the FitApp application. It standardizes safe area handling, content spacing, optional headers, scroll behaviors, and keyboard avoidance.

## 2. Acceptance Criteria (EARS Pattern)

### 2.1 Basic Layout & Safe Area
- **WHEN** the `Screen` component is rendered **THEN** the system SHALL automatically apply the application's standard background color (`bg-surface` or similar default).
- **WHEN** the `Screen` component is rendered **THEN** the system SHALL automatically handle top and bottom safe areas using `react-native-safe-area-context` by default, preventing content from overlapping with device notches or home indicators.
- **WHEN** the `safeAreaEdges` prop is provided **THEN** the system SHALL respect the specific edges requested (e.g., `['top']`, `['bottom']`, `['top', 'bottom']`, or `[]`).

### 2.2 Content Spacing
- **WHEN** the `Screen` component renders its children **THEN** the system SHALL apply a standard horizontal padding (e.g., `px-6`) to the content container.
- **WHEN** the `withPadding` prop is set to `false` **THEN** the system SHALL remove the horizontal padding, allowing children to render edge-to-edge.

### 2.3 Header Integration
- **WHEN** the `header` prop is explicitly provided (e.g., title, left/right actions) **THEN** the system SHALL render the standard `Header` component at the top of the screen.
- **WHEN** the `header` prop is omitted **THEN** the system SHALL NOT render any top header, adjusting the layout fluidly.

### 2.4 Scroll vs Fixed Behavior
- **WHEN** the `scrollable` prop is set to `true` (default behavior) **THEN** the system SHALL wrap the content inside a `ScrollView`, allowing vertical scrolling and hiding the scrollbar.
- **WHEN** the `scrollable` prop is set to `false` **THEN** the system SHALL render the content inside a fixed `View`, making it static and full height.

### 2.5 Keyboard Handling
- **WHEN** the screen contains text inputs and the software keyboard appears **THEN** the system SHALL automatically use `KeyboardAvoidingView` (with proper `behavior` based on iOS/Android) to ensure inputs remain visible.

## 3. Failure Scenarios & Edge Cases
- **Missing Children:** If children are omitted, the screen renders an empty background.
- **Conflicting Props:** If `scrollable={false}` is used alongside a long list of items, the system will clip the content (developer must use `FlatList` manually inside).

## 4. Out of Scope
- Global navigation transitions (handled by Expo Router).
- Bottom Tab Bar rendering (handled by the Router layout).
