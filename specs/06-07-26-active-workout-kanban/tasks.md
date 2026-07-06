# Tarefas: Refatoração do Treino Ativo Kanban

- [ ] 1. **Criar `SetCard.tsx`**
  - **Skill**: frontend-developer
  - Implementar o componente animado (Reanimated) de Acordeão para a série.
  - Deve receber propriedades da série (setNumber, reps, weight, isSaved).
  - Incluir ícone de Chevron.
  - Estado local `isExpanded` (se pendente, pode iniciar expandido).

- [ ] 2. **Criar `ExerciseColumn.tsx`**
  - **Skill**: frontend-developer
  - Implementar o contêiner vertical de um exercício.
  - O cabeçalho deve exibir o Nome do exercício e Meta (reps).
  - Renderizar a lista de `SetCard` passando as callbacks de Save/Delete.
  - Incluir o botão de `Adicionar Série` no final da lista.

- [ ] 3. **Refatorar `WorkoutSessionScreen.tsx`**
  - **Skill**: frontend-developer
  - Remover referências ao Modal (`ExecuteExerciseModal`) e `ExerciseListItem`.
  - Substituir a lista vertical por um `FlatList` horizontal (`pagingEnabled`).
  - Cada item do `FlatList` será um `ExerciseColumn`.
  - Adicionar um Indicador de Paginação (bolinhas estilo Instagram) usando o estado derivado de `onViewableItemsChanged` para guiar a posição do usuário entre as colunas.
  - Configurar `windowSize`, `initialNumToRender` para evitar vazamento de memória se houver muitos exercícios.
  - Fixar o botão "Segure para finalizar treino" fora do FlatList, na base da tela, garantindo que seja acessível independentemente da coluna em que o usuário está.

- [ ] 4. **Limpeza e Testes Manuais**
  - **Skill**: codebase-cleanup
  - Deletar arquivos obsoletos: `ExecuteExerciseModal.tsx` e `ExerciseListItem.tsx` (caso não seja usado em nenhum outro lugar).
  - Testar a consistência do Swipe Kanban, animações do chevron, salvar série e finalizar treino.
