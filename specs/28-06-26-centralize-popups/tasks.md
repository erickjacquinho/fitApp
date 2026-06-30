# Tasks: Centralize Popups to Dialog

**Final Validation Command:**
`npx tsc --noEmit && npx expo-doctor`

## 1. Mapeamento de Popups (Skill: codebase-audit)
- **Target:** Todo o repositório (`app/`, `src/`)
- **Source:** Design Step 1
- **Trace:** AC "All usages of PopupModal in the codebase SHALL be refactored"
- **Action:** Realizar varredura no código procurando por `PopupModal` ou `Modal` do `react-native`.
- [ ] Listar todos os arquivos que necessitam de refatoração.

## 2. Criar DialogBody (Skill: frontend-developer)
- **Target:** `src/components/ui/dialog.tsx`
- **Source:** Design Step 1 (Clarification)
- **Trace:** AC "All usages of PopupModal in the codebase SHALL be refactored"
- **Action:** Criar e exportar o componente `DialogBody` que engloba um `KeyboardAvoidingView`.
- [ ] Criar `DialogBody` em `dialog.tsx`

## 3. Refatoração de Componentes (Skill: frontend-developer)
- **Target:** Arquivos mapeados no Passo 1 (ex: `ExerciseSelect.tsx`, `ExecuteExerciseModal.tsx`, `FoodSelectorModal.tsx`, `TrainingHomeScreen.tsx`).
- **Source:** Design Step 1
- **Trace:** AC "All usages of PopupModal in the codebase SHALL be refactored"
- **Action:** Substituir `PopupModal` por `Dialog`, `DialogContent`, `DialogHeader`, `DialogTitle` (from `@/components/ui/dialog`). Adicionar `KeyboardAvoidingView` se necessário.
- [ ] Refatorar `ExerciseSelect.tsx`
- [ ] Refatorar `ExecuteExerciseModal.tsx`
- [ ] Refatorar `FoodSelectorModal.tsx`
- [ ] Refatorar `TrainingHomeScreen.tsx`
- [ ] Refatorar quaisquer outros arquivos encontrados na varredura.

## 4. Remoção do PopupModal (Skill: frontend-developer)
- **Target:** `src/components/organisms/PopupModal.tsx` e `src/components/organisms/__tests__/organisms.test.tsx`
- **Source:** Design Step 2
- **Trace:** AC "The PopupModal component SHALL be deleted"
- **Action:** Deletar `PopupModal.tsx` e remover seus testes.
- [ ] Deletar `src/components/organisms/PopupModal.tsx`
- [ ] Remover bloco de teste do `PopupModal` em `organisms.test.tsx`

