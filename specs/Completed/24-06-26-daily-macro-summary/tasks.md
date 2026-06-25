# Tasks: Novo Resumo Diário de Macros e Calorias

1. **Criar UI Component: RadialProgress (Skill: frontend-developer)**
   - Target: `src/components/ui/radial-progress.tsx`
   - Source: `design.md` -> Componentes Criados/Afetados (1)
   - Trace: `requirements.md` -> Exibição do Gráfico Radial
   - Ação: Criar componente SVG reutilizável com um círculo de fundo (stroke fraco) e um arco por cima (stroke de cor primária). Aceitar props `value` (0-100), `size` (numero), `strokeWidth` e `children` para elementos no centro (texto).

2. **Refatorar DailyBalance (Skill: frontend-developer)**
   - Target: `src/features/diet/components/DailyBalance.tsx`
   - Source: `design.md` -> Componentes Criados/Afetados (2) e Cálculo
   - Trace: `requirements.md` -> Exibição dos Macronutrientes e Layout
   - Ação: Alterar layout para ter um row principal com justify-between (ou justify-evenly).
   - Ação: No lado esquerdo, inserir o `RadialProgress` com 100% de preenchimento temporário (ou baseado numa proporção fixa para efeitos visuais, já que ainda não há meta). Dentro dele exibir "X Cal".
   - Ação: No lado direito, listar os 3 macros calculando a % de cada em relação à soma total dos macros. Mostrar os textos formatados (ex: `Math.round(percent)}%`, `Math.round(protein)} g\nProt`).

3. **Validação Final**
   - Executar: `npx tsc --noEmit && npx expo-doctor`

- [x] All tasks completed and verified.

