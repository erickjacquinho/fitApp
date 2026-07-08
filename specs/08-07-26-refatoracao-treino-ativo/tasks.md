# Tasks: Visão Macro do Treino em Execução

## Fase 1: Fundação & Novos Componentes
- [ ] **1.1** Criar componente `MacroExerciseListItem.tsx` em `src/features/training/components/`. Implementar o layout flexbox com número à esquerda, textos no meio e ícone (MoreVertical) à direita. *Skill sugerida: frontend-developer*
- [ ] **1.2** Adicionar lógica no componente para exibir "X/Y séries concluídas". X virá da prop `completedSets` e Y da prop `totalSets`. *Skill sugerida: frontend-developer*

## Fase 2: Refatoração da Tela Principal (`WorkoutSessionScreen.tsx`)
- [ ] **2.1** Modificar o `<Header />` removendo o `title` e o `headerRight`. *Skill sugerida: frontend-developer*
- [ ] **2.2** Adicionar no topo do `ScrollView` um container contendo o Título do Treino (`block?.name`) e o botão "Finalizar / Concluir". *Skill sugerida: frontend-developer*
- [ ] **2.3** Remover a importação e uso do componente `ExerciseColumn`. *Skill sugerida: frontend-developer*
- [ ] **2.4** Substituir a listagem para usar o novo `MacroExerciseListItem`, calculando corretamente `completedSets` e `totalSets` iterando sobre as execuções de cada exercício. *Skill sugerida: frontend-developer*

## Fase 3: Limpeza e Otimização
- [ ] **3.1** Excluir o arquivo `ExerciseColumn.tsx` e dependências não utilizadas na tela. *Skill sugerida: codebase-cleanup*
- [ ] **3.2** Revisar espaçamentos, tipografia (Helvetica Now) e paleta Mineral Warm para garantir alinhamento com o `design.md`. *Skill sugerida: ui-visual-validator*
