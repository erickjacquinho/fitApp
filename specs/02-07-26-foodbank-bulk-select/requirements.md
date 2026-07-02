# Feature Specification: Food Bank Bulk Selection

## Purpose
Allow users to select multiple foods in the Food Bank list to perform bulk actions such as favoriting, adding to a meal, or deleting. This reduces friction and speeds up the user experience when managing their food library.

## User Scenarios

1. **Entering Selection Mode**: A user browsing their foods long-presses on a food item. The UI enters "selection mode", highlighting the selected item and revealing a floating group menu at the bottom of the screen.
2. **Selecting Multiple Items**: While in selection mode, tapping other food items toggles their selection status rather than navigating to their details.
3. **Favoriting Items**: The user selects several foods and taps the "Star" icon on the group menu. All selected foods are marked as favorites.
4. **Adding to a Meal**: The user selects several foods and taps the "Plus" icon on the group menu. All selected foods are added to their active meal.
5. **Deleting Items**: The user selects several foods and taps the "Trash" icon on the group menu. The system prompts for confirmation, and upon acceptance, deletes all selected foods.

## Functional Requirements

- **Selection Trigger**: The system must allow users to initiate a bulk selection by long-pressing any food item in the Food Bank.
- **Selection Mode Behavior**: Once selection mode is active, normal taps on food items must toggle their selection state instead of navigating.
- **Visual Feedback**: Selected items must clearly indicate their selected state (e.g., background color change).
- **Group Menu UI**: A floating menu must be displayed at the bottom of the screen when selection mode is active.
- **Icon-Only Actions**: The group menu must contain exactly three icon-only actions: Favorite, Add, and Delete.
- **Bulk Favorite**: The system must allow marking or unmarking all selected items as favorites.
- **Bulk Delete**: The system must allow deleting all selected items simultaneously after a single confirmation prompt.
- **Bulk Add to Meal**: The system must allow adding all selected items to a specified meal simultaneously. If there is no active meal context (e.g., accessed globally), the system must open a modal for the user to select the target meal.

## Clarifications
### Session 2026-07-02
- Q: O que deve acontecer quando o usuário tocar em "Adicionar à Refeição" (Add) no modo Bulk, mas não houver uma refeição ativa? → A: Abrir um modal para selecionar a refeição alvo para os alimentos selecionados.
- Q: Como devemos implementar a funcionalidade de "Favoritar", já que o campo `is_favorite` ainda não existe no banco de dados atual? → A: Adicionar o campo `is_favorite` (boolean) ao schema `foods` e atualizar os models do WatermelonDB (exige migration ou reset).

## Success Criteria

- Users can successfully select and add at least 3 foods to a meal in a single action.
- Bulk actions complete successfully, and the UI immediately reflects the new state.
- Selection mode can be activated smoothly via long-press on any list item.
