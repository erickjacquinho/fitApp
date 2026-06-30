# Requirements - Dropdown Animation and Dismissal

## 1. Objective
Add a scale and fade opening animation to the custom Dropdown Menu component, and implement dismissal when clicking/tapping anywhere outside the dropdown menu.

## 2. Scope
- **In-Scope:**
  - Defining entering animation values (ZoomIn) combining scale and fade with a customized speed.
  - Ensuring the animation's transform origin/anchor point is centered on the dropdown menu container.
  - Configuring overlay tap handler to dismiss the dropdown menu.
  - Testing container animations and dismissal logic.
- **Out-of-Scope:**
  - Redesigning dropdown options or text style.
  - Modifying dropdown menu logic in unrelated screens.

## 3. Acceptance Criteria
- **AC 1 (Scale & Fade Animation):**
  - **WHEN** the dropdown menu is opened.
  - **THEN** it SHALL animate its entry using both scale (from 0 to 1) and fade (from opacity 0 to 1) transitions simultaneously.
- **AC 2 (Opening Speed & Curve):**
  - **WHEN** the opening animation runs.
  - **THEN** the transition duration SHALL be 150ms with a standard ease curve.
- **AC 3 (Scale Anchor Point):**
  - **WHEN** the scale animation runs.
  - **THEN** the scale origin (transform anchor point) SHALL be centered on the dropdown menu container.
- **AC 4 (Outside Tap Dismissal):**
  - **WHEN** the dropdown is open and the user taps anywhere outside the dropdown menu boundaries.
  - **THEN** the dropdown menu SHALL immediately close.
