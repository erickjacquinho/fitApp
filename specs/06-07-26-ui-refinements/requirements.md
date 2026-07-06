# Specification: UI Design System Refinements

## 1. Feature Description
This feature aligns the core UI component implementations (`Card` and `Input`) with the project's visual rules and tokens defined in the design guidelines. It harmonizes the border-radius of card boxes and fixes the missing blue accent focus state on inputs, ensuring a cohesive and accessible user experience.

---

## 2. Scope & Boundaries

### In-Scope
*   Aligning the `Card` component's default border-radius to the design guideline's requirement of `rounded-xl` (`16px`).
*   Configuring the `Input` component to use the blue `border-border-focus` token (`#0800FF` in Light mode, `#9A96FA` in Dark mode) on focus.
*   Updating the Native animated ring wrapper in the `Input` component to use the focus color instead of faint gray.
*   Ensuring all existing component tests build and pass successfully.

### Out-of-Scope
*   Changing general color themes of the application.
*   Adding new UI elements or refactoring unrelated components (e.g. Buttons, Headers).

---

## 3. Functional Requirements

### FR-01: Card Border Radius Alignment
*   The `Card` component's default styling variant must use the `rounded-xl` (`16px`) utility.
*   The layout, padding, and elevated shadow must remain intact without visual degradation.

### FR-02: Input Focus State Correction
*   When the text input receives focus, its border color must change to the blue focus token (`border-border-focus`).
*   On Native platforms, the animated focus ring overlay (`Animated.View`) must animate using the blue focus color.
*   When focus is lost, the input must gracefully return to its standard gray border (`border-border-strong`).

---

## 4. User Scenarios

### Scenario 1: Focus Highlight Visibility
*   **Given** a user is on a form screen (e.g., Edit Profile or Create Meal),
*   **When** they tap on a text input,
*   **Then** they see a clear, high-contrast, accessible blue focus ring highlighting the active input field.

### Scenario 2: Card Aesthetic Softness
*   **Given** a user is viewing widgets on the Dashboard or details on a statistics card,
*   **When** they look at the boxes,
*   **Then** they see soft, premium 16px rounded corners that match the lists and overall layout rhythm.

---

## 5. Success Criteria
*   The `Card` component's border-radius changes from `8px` (`rounded-md`) to `16px` (`rounded-xl`) and matches the design rules of `03-ui-foundations.md`.
*   The `Input` component displays a prominent blue focus outline instead of a gray border.
*   All unit tests in `src/components/ui/__tests__` run and pass.
