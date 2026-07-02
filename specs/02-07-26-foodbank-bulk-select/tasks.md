# Tasks: Food Bank Bulk Selection

## Phase 1: Database & Services (Backend)

- [x] **Task 1.1:** Atualizar Schema do Banco (`backend-architect`)
  - **Description:** Modificar `src/db/schema.ts` para incrementar a `version` de 8 para 9 e adicionar o campo `is_favorite` (type: string/boolean, isOptional: true) à tabela `foods`.
- [x] **Task 1.2:** Atualizar Modelo Food (`backend-architect`)
  - **Description:** No arquivo `src/db/models/Food.ts`, adicionar a propriedade `@field('is_favorite') isFavorite!: boolean;`.
- [x] **Task 1.3:** Implementar Lógica de Serviço (`backend-architect`)
  - **Description:** No arquivo `src/features/diet/services/food-service.ts`, criar um método estático `toggleFavorites(ids: string[], isFavorite: boolean)` que atualiza em batch o campo `isFavorite` dos alimentos correspondentes.

## Phase 2: Hooks & State Management (Frontend)

- [x] **Task 2.1:** Expandir Hook useFoodBank (`frontend-developer`)
  - **Description:** Em `src/features/diet/hooks/useFoodBank.ts`, adicionar a função `favoriteSelectedFoods` que chama `FoodService.toggleFavorites` e em seguida limpa a seleção. Certificar de que `clearSelection` (ou similar) zera o Set `bulkSelections` e coloca `isSelectionMode` como false.

## Phase 3: UI Components (Frontend)

- [x] **Task 3.1:** Criar BulkSelectionMenu (`frontend-developer`)
  - **Description:** Criar `src/features/diet/components/BulkSelectionMenu.tsx`. Implementar a interface estilo "toggle group" flutuante (floating pill) com 3 botões (Star, Plus, Trash) lado a lado divididos por bordas (Separator). Aceitar os callbacks para cada ação.
- [x] **Task 3.2:** Modificar FoodCardListProps (`frontend-developer`)
  - **Description:** No `FoodCardList.tsx`, adicionar `onLongPress?: () => void;` à tipagem e passá-lo ao `BaseCardList`.
- [x] **Task 3.3:** Atualizar BaseCardList (`frontend-developer`)
  - **Description:** Verificar `BaseCardList.tsx`. Se o `onLongPress` já existir, garantir que o estilo `bg-primary-soft` se aplique adequadamente quando `isSelected` for true.
- [x] **Task 3.4:** Refatorar Header do FoodBankScreen (`react-ui-patterns`)
  - **Description:** Em `FoodBankScreen.tsx`, remover a renderização atual dos botões "Selecionar", "Cancelar" e "Excluir" localizados acima da FlatList.
- [x] **Task 3.5:** Integrar Long Press e Seleção no FoodBankScreen (`react-ui-patterns`)
  - **Description:** No `renderItem` da lista, aplicar `onLongPress` para ativar o modo de seleção. Se `isSelectionMode` for true, o `onPress` deve alternar a seleção do item em vez de navegar.
- [x] **Task 3.6:** Integrar BulkSelectionMenu (`react-ui-patterns`)
  - **Description:** Renderizar `BulkSelectionMenu` na parte inferior do `FoodBankScreen` (absoluto/fixo) condicionalmente quando `isSelectionMode` for true. Conectar os callbacks de Favoritar e Excluir.
- [x] **Task 3.7:** Implementar Adição de Refeição no Modo Bulk (`react-ui-patterns`)
  - **Description:** No callback `onAdd` do Menu, verificar se `mealId` existe na tela. Se sim, rotear/adicionar diretamente. Se não, disparar um modal/roteamento para escolha da refeição e concluir a ação em massa.
