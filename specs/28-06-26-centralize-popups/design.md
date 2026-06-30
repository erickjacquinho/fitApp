# Design: Centralize Popups to Dialog

## Clarifications
### Session 2026-06-28
- Q: Como lidar com o layout (KeyboardAvoidingView) dentro dos novos Dialogs? → A: Criar componente DialogBody centralizado

## 1. Components
- **`src/components/ui/dialog.tsx`**
  - Add `DialogBody` component exporting a standard `KeyboardAvoidingView` layout for Dialogs.
- **`src/features/training/components/ExerciseSelect.tsx`**
  - Replace `<PopupModal>` with `<Dialog>`.
  - Use `DialogBody` for internal layout.
- **`src/features/training/components/ExecuteExerciseModal.tsx`**
  - Replace `<PopupModal>` with `<Dialog>`.
  - Use `DialogBody`.
- **`src/features/diet/components/FoodSelectorModal.tsx`**
  - Replace `<PopupModal>` with `<Dialog>`.
  - Use `DialogBody`.
- **`src/features/training/components/TrainingHomeScreen.tsx`**
  - Replace `<PopupModal>` with `<Dialog>`.
  - Use `DialogBody`.

## 2. Deprecation
- Delete `src/components/organisms/PopupModal.tsx`.
- Remove references to `PopupModal` from `src/components/organisms/__tests__/organisms.test.tsx`.

## Core Pillars
- **Maintainability:** Removes an unnecessary abstraction (`PopupModal`) and centralizes popup logic around the standard `Dialog` component directly, as per project guidelines.
