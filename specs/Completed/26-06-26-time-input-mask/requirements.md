# Requirements: Time Input Mask

## 1. Objective
Add strict time input formatting and validation to the meal editing popup on the main diet tab (`MenuScreen.tsx`). The hour/minute input field must only accept digits, automatically insert a colon `:` separator between hours and minutes, prevent inputs outside the valid range of a 24-hour clock (00:00 to 23:59), and support natural backspace behavior when deleting the colon character.

## 2. Scope
- **In-Scope:**
  - Implementing an automated formatting mask in the "Horário" text input of `MenuScreen.tsx`.
  - Restricting the keyboard type of the time input to `numeric` (or `number-pad` on native devices).
  - Validating hours in the range [00-23] and minutes in the range [00-59] dynamically as the user types.
  - Ensuring the colon `:` is automatically inserted when the length of numeric input exceeds two characters.
  - Handling backspace deletion of the colon character gracefully by deleting the preceding digit.
  - Updating unit tests in `diet-components.test.ts` to assert mask behaviors.
- **Out-of-Scope:**
  - Modifying backend schemas or database migration fields.
  - Changing visual styling of the modal dialog popups.

## 3. Acceptance Criteria (EARS Pattern)

### 3.1 Input Restriction
- **WHEN** the user types inside the time input field.
- **THEN** the system SHALL discard any non-digit character and display only formatted numeric values.

### 3.2 Automated Mask and Limits
- **WHEN** the user types digits.
- **THEN** the system SHALL:
  1. Prefix or limit hours to a maximum value of `23`.
  2. Automatically append a colon `:` separator after the second digit.
  3. Prefix or limit minutes to a maximum value of `59`.
  4. Constraint total text length to a maximum of 5 characters (`HH:MM`).

### 3.3 Deletion Behavior
- **WHEN** the input ends with a colon `:` and the user triggers a backspace.
- **THEN** the system SHALL remove the colon and the second hour digit simultaneously.

## 4. Failure Scenarios & Edge Cases
- **Stuck Backspace:** Ensure that pressing backspace on a colon character does not lock the cursor in an infinite loop due to formatting updates.
- **Pasted Invalid Data:** If the user pastes text containing letters or invalid numbers, the mask SHALL sanitize and clamp the values immediately.
