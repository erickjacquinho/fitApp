# Requirements: Screen Header and StatusBar Bug Fix

## Status
- **Date**: 2026-06-25
- **Slug**: `25-06-26-fix-screen-header-visual`

## Context
Following the migration to the unified `Screen` component primitive, pages exhibit double top padding (making headers look duplicated or too tall) and the StatusBar does not harmonize/follow the header background color.

## Acceptance Criteria
- **REQ-001 (Dynamic Top Safe Area):**
  - **WHEN** the `Screen` component receives a `header` prop, **THEN** the system **SHALL** exclude the `'top'` edge from the root `SafeAreaView` padding to prevent duplicate top spacing.
- **REQ-002 (Default Top Safe Area):**
  - **WHEN** the `Screen` component does not receive a `header` prop, **THEN** the system **SHALL** include the `'top'` edge in the root `SafeAreaView` padding by default to prevent content overlap with status/notch elements.
- **REQ-003 (Status Bar Integration):**
  - **WHEN** a `Screen` with a `header` is active, **THEN** the system **SHALL** ensure the StatusBar background matches the header background (`bg-surface`), avoiding contrasting gaps.
- **REQ-004 (Full Customization Preservation):**
  - **WHEN** `safeAreaEdges` is explicitly passed to `Screen`, **THEN** the system **SHALL** respect that custom override.
- **REQ-005 (Zero Vertical Margins/Paddings for Content):**
  - **WHEN** rendering the page content, **THEN** the system **SHALL** ensure no vertical margins or extra paddings exist between the content wrapper and the header (at the top) and the navbar (at the bottom) to keep the content flush.
- **REQ-006 (Dynamic Bottom Safe Area):**
  - **WHEN** `safeAreaEdges` is not explicitly provided, **THEN** the system **SHALL** exclude the `'bottom'` edge from the root container safe area by default to allow content to align flush with the bottom navigation/tab bar.

## Out of Scope
- Modifying Stack navigators or tab navigator positioning.
- Redesigning the visual look of individual page headers.
- Re-styling components unrelated to `Screen` and `Header`.
