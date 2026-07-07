# Checklist de Tarefas: Fluxo de Início de Treino por Botão

- [ ] 1. **Refatorar `WorkoutListItem.tsx`**
  - **Skill**: frontend-developer
  - Remover `ReanimatedSwipeable` e `LeftAction`.
  - Remover a propriedade `onStartSession` e a chamada no swipe.
  - Retornar o card direto na raiz de renderização.

- [ ] 2. **Remover fluxo antigo do ProgramSummaryRoute (`app/training/program/[id].tsx`)**
  - **Skill**: frontend-developer
  - Remover a propriedade `onStartSession` passada para `ProgramSummaryScreen` e `WorkoutListItem`.
  - Remover o `ConfirmModal` e estados de `activeSession` desta tela.

- [ ] 3. **Implementar botão Iniciar em `BlockDetailsScreen.tsx`**
  - **Skill**: frontend-developer
  - Portar a lógica de iniciar sessão e verificar treinos ativos para este componente.
  - Integrar o `ConfirmModal` na base da tela.
  - Atualizar o layout adicionando a `View` do rodapé com o `Button` "Iniciar Treino".

- [ ] 4. **Limpeza e Testes de Qualidade**
  - **Skill**: codebase-cleanup
  - Executar os testes locais (`npm test`) e verificação do compilador (`npx tsc --noEmit`).
  - Executar linter (`npm run lint`).
