# Feature Specification: Select Component Redesign

## 1. Overview
The goal of this feature is to redesign and standardize the foundational `Select` component (`src/components/ui/select.tsx`) to strictly align with FitApp's Design System. This involves removing arbitrary Tailwind classes, standardizing the typography, ensuring consistent interactive states, and applying the correct "Mineral Warm (Blue-First)" palette.

## 2. Problem Statement
The current `Select` component contains utility classes that are redundant or not strictly mapped to the semantic tokens of the design system. This can lead to visual inconsistencies across the application, especially concerning touch targets and color feedback during user interactions.

## 3. Scope
- **In Scope**:
  - Audit and replacement of hardcoded or non-semantic Tailwind utility classes in `select.tsx`.
  - Alignment of touch targets to WCAG 2.1 AA standards (minimum 44x44px).
  - Implementation of correct interactive states (Default, Active/Hover, Disabled) using semantic tokens.
  - Ensuring the component adheres to the "Mineral Warm" aesthetic.
- **Out of Scope**:
  - Changes to the underlying `@rn-primitives/select` library logic.
  - Redesign of other form elements outside of the `Select` component.

## 4. User Scenarios
- **Scenario 1: Opening the Select Dropdown**
  - **Given** a user is interacting with a form containing a `Select` component,
  - **When** they tap the trigger,
  - **Then** the dropdown opens with a clear visual hierarchy, distinguishing the selected item and offering accessible touch targets for all options.
- **Scenario 2: Selecting an Option**
  - **Given** the Select dropdown is open,
  - **When** the user taps an item,
  - **Then** the item displays an active visual state (background color change) and a checkmark indicator using the primary accent color.

## 5. Functional Requirements
- **FR-1**: All interactive areas (trigger and items) must have a minimum touch target area of 44x44px.
- **FR-2**: The component must visually indicate its state (Default, Active/Hover, Disabled).
- **FR-3**: The selected option must be clearly identifiable within the dropdown list.
- **FR-4**: The component must use the designated semantic color tokens for text, background, borders, and interactive states.

## 6. Success Criteria
- **SC-1**: 100% of the utility classes in `select.tsx` correspond to defined semantic tokens in the design system.
- **SC-2**: The component maintains a minimum 44px height for all interactive elements.
- **SC-3**: The visual presentation strictly adheres to the "Mineral Warm (Blue-First)" palette.
- **SC-4**: The component functions correctly on both Web and mobile (Native) platforms without visual regressions.

## 7. Assumptions
- The design system tokens (`bg-surface`, `border-control`, `text-primary`, etc.) are already defined and available in the project's configuration.
- The base `Select` primitive functionality is stable and meets basic accessibility requirements.
