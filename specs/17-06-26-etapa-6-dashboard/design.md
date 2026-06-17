# Design - Etapa 6: Dashboard

## 1. Estrutura de Telas
Localização: `src/features/dashboard/components/`

- **DashboardScreen**: Layout vertical usando `ScrollView`. Seções para Dieta, Treino e Insights.
- **WidgetDieta**: Card informativo com `ProgressBar`.
- **WidgetTreino**: Resumo do programa ativo e botão de atalho.

## 2. Camada de Dados (Hooks de Agregação)
Localização: `src/features/dashboard/hooks/`

- **useDashboardMetrics**: Hook que consulta WatermelonDB para:
  - Soma de calorias do dia atual.
  - Programa de treino marcado como 'ativo'.
  - Últimas 3 sessões de treino para o gráfico de progresso (opcional).

## 3. UI/UX
- Uso de cores semânticas para macros (ex: Azul para Proteína, Amarelo para Carbo, Vermelho para Gordura).
- Cards com feedback visual de conclusão (ex: checkmark se o treino do dia foi feito).

## 4. Gerenciamento de Estado
- Dashboard reage automaticamente a mudanças no WatermelonDB via `@withObservables`.
- Configurações de meta calórica podem ser lidas de uma tabela de `User` ou do `Zustand`.