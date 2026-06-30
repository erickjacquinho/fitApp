# Phase 2: Design Documentation

## Overview
A funcionalidade transforma a tela de Resumo de Programa em uma interface dupla. No modo normal, exibe uma lista vertical de blocos. No modo edição, alterna para uma visão de colunas horizontais (Kanban) permitindo a reordenação drag-and-drop de exercícios dentro do respectivo bloco (coluna).

## Architecture
O componente `ProgramSummaryScreen` passa a gerenciar o estado `isEditMode`. Quando ativo, renderiza o componente `ProgramKanbanEditor` no lugar da lista de blocos original.

## Components and Interfaces
- **`ProgramKanbanEditor`**: Utiliza `FlatList` horizontal com `pagingEnabled={true}` para navegação em tela inteira (swipe).
- **`WorkoutColumnEditor`**: Representa uma coluna. Conecta-se ao banco via hook `useBlockExercises(blockId)` e usa `DraggableFlatList` para renderizar os itens e gerenciar eventos de drag and drop.
- **`ExerciseDraggableItem`**: O card visual individual do exercício no modo de edição (ícone de arrastar na esquerda, textos de título e séries).

## Data Models
- A tabela `exercises` no WatermelonDB ganha uma coluna `order` (tipo `number`).
- A atualização da ordem em reordenamento ocorre via função em batch (`database.batch`) utilizando `prepareUpdate`.

## Error Handling
- Erros na atualização em lote disparam logs e revertem localmente o estado se necessário (otimista, porém com fallback na view model caso a escrita falhe).
- Casos sem exercícios numa coluna exibirão a mensagem padrão "Nenhum exercício neste treino".

## Testing Strategy
- Validação física/UI: Garantir funcionalidade do scroll horizontal vs vertical (para não conflitar o arrastar da lista horizontal com a reordenação vertical dos cards).
- Validar persistência ao fechar a sessão.
