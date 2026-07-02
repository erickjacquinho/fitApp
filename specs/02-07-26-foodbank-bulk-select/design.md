# Technical Design: Food Bank Bulk Selection

## Technical Context
- **Frontend Framework**: React Native (Expo Router)
- **Styling**: NativeWind v4 + TailwindCSS (Mineral Warm palette)
- **Component Library**: Primitivos modulares baseados no `@react-native-reusables`.
- **State Management**: Zustand para estado efêmero (modo seleção, itens selecionados) via hook customizado.
- **Database**: WatermelonDB (Offline-first, SQLite).

## Phase 1: Design & Data Model

### 1. Data Model (WatermelonDB)

A tabela `foods` receberá uma nova coluna para rastrear se o alimento é favorito ou não.

**Updates to `src/db/schema.ts`**:
- Increment version to 9.
- Table `foods`: Add `{ name: 'is_favorite', type: 'boolean', isOptional: true }`.

**Updates to `src/db/models/Food.ts`**:
- Add field: `@field('is_favorite') isFavorite!: boolean;`.

### 2. Services & Hooks

**`FoodService.ts`**:
- Add `toggleFavorites(ids: string[], isFavorite: boolean)`: Atualiza o status `is_favorite` de todos os IDs passados utilizando `database.write` e `batch`.

**`useFoodBank.ts`**:
- Adicionar ação `favoriteSelectedFoods()`: chama o `FoodService` com os `bulkSelections`.
- A ação `deleteSelectedFoods()` já existe e deleta em lote.
- A ação `clearSelection()` para resetar `isSelectionMode` e `bulkSelections`.

### 3. UI Components

**`BulkSelectionMenu.tsx`** (New):
- Local: `src/features/diet/components/BulkSelectionMenu.tsx`
- Propriedades: `onFavorite`, `onAdd`, `onDelete`, `selectedCount`, `onClose`.
- Estética: "Floating pill" na parte inferior absoluta da tela. Usará ícones `LucideIcons` (Star, Plus, Trash) e separadores verticais. Cores adaptadas aos tokens `bg-surface-elevated` e `text-primary`.

**`FoodCardList.tsx`** (Modify):
- Atualizar props para receber `onLongPress`.
- Repassar `onLongPress` para o componente wrapper `BaseCardList`.
- Garantir que o estado `isSelected` altera o estilo (fundo `bg-primary-soft`).

**`FoodBankScreen.tsx`** (Modify):
- **Remoção**: Retirar botões "Selecionar", "Cancelar" e "Excluir" do cabeçalho.
- **Lista**: Adicionar `onLongPress={() => { setIsSelectionMode(true); toggleBulkSelection(item.id); }}` no `FoodCardList`.
- **Condicional onPress**: Se `isSelectionMode === true`, `onPress` do card apenas faz `toggleBulkSelection(item.id)`. Caso contrário, comportamento padrão de navegação ou adição.
- **Modal de Refeição**: Se não houver `mealId` na navegação (ou seja, acessado globalmente), o botão `onAdd` do bulk abrirá o `FoodSelectorModal` ou navegará para seleção de refeição passando os IDs selecionados. Se `mealId` existir, adiciona diretamente.
- **Menu**: Renderizar `<BulkSelectionMenu />` de forma fixa na base caso `isSelectionMode` seja verdadeiro, passando os callbacks apropriados.
