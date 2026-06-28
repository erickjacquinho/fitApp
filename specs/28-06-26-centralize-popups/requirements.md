# Requirements: Centralize Popups to Dialog

## Overview
The user requested to centralize all popups to use the `Dialog` component from `@/components/ui/dialog` (from React Native Reusables) directly, bypassing or removing the intermediate abstraction `PopupModal`.

## Acceptance Criteria
- WHEN a component requires a popup modal, THEN it SHALL use `Dialog` from `@/components/ui/dialog`.
- The `PopupModal` component SHALL be deleted.
- All usages of `PopupModal` in the codebase SHALL be refactored to use `Dialog` directly while preserving the same visual output and behavior (including KeyboardAvoidingView wrappers if necessary).

## Failure Scenarios (Edge/Errors)
- Layout regressions if `KeyboardAvoidingView` or `DialogHeader` are misconfigured during refactor.

## Out of Scope
- Modifying `AlertDialog` usages (they are already standard).
