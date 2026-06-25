# Design: Novo Resumo Diário de Macros e Calorias

## Estratégia de Implementação
Criaremos um componente visual `RadialProgress` genérico em `src/components/ui/radial-progress.tsx` (ou similar) usando `react-native-svg` (Circle) que já está instalado. E atualizaremos o `DailyBalance.tsx`.

## Componentes Criados/Afetados

1. **`src/components/ui/radial-progress.tsx`** (Novo):
   - Propriedades: `value` (porcentagem 0-100), `size` (tamanho do componente), `strokeWidth`, `color`, `children` (para colocar o texto no centro).
   - Deve usar `Svg` e `Circle` para desenhar o arco e o fundo do círculo.

2. **`src/features/diet/components/DailyBalance.tsx`**:
   - Mudar layout para `flex-row items-center justify-between`.
   - Lado Esquerdo: Renderizar `<RadialProgress value={100}>` (já que não temos meta, ou podemos passar um percentual fixo/calculado) e no `children` colocar um `<View>` centralizado com "1600" e "Cal" (usando os valores passados nas props).
   - Lado Direito: Um wrapper `flex-row` com 3 blocos. Cada bloco mostra no topo a porcentagem (se não houver meta, calculamos `(macro / totalMacros) * 100`) em azul (`text-primary`), e embaixo os gramas com o título "Prot", "Carb", "Fat".

## Cálculo de Porcentagem Temporário
Como não temos a tabela `UserSettings` com a meta do dia ainda no hook, vamos calcular a proporção entre eles para a %:
`totalMacros = protein + carbs + fat`
`protein% = (protein / totalMacros) * 100`
Se `totalMacros === 0`, as porcentagens serão 0.

## Tipagem e Manutenibilidade
- A tipagem do `DailyBalanceProps` (protein, carbs, fat, calories) permanece a mesma. Apenas a UI muda.
- Cores vindas estritamente do `tailwind.config.js` via `colors` token (ex: `colors.primary.DEFAULT`).

## Segurança e Escalabilidade
- Seguro e puramente visual.
