# Design - Etapa 5: Módulo Treino - UI

## 1. Estrutura de Telas
Localização: `src/features/training/components/`

- **ListaProgramasScreen**: Lista de `Programa`. Cards com resumo de blocos.
- **SessaoTreinoScreen**: View principal de execução. Utiliza `FlatList` para exercícios do bloco atual.
- **HistoricoScreen**: Lista de `SessaoTreino` ordenadas por data descrescente.
- **DetalhesSessaoScreen**: Resumo consolidado com cálculos de volume total.

## 2. Componentes de UI de Treino
- **BlocoExpandivel**: Header fixo + `Animated.View` para conteúdo. Uso de `lucide-react-native` para o chevron.
- **ExecutarExercicioModal**: Lista vertical de séries. Cada linha contém inputs para Kg e Reps, e um botão de confirmação.
- **TrainingProgressBar**: Barra de progresso baseada no número de exercícios concluídos vs total.

## 3. Navegação Interna
- `training/index` -> Lista Programas.
- `training/active` -> Sessão em curso.
- `training/history` -> Histórico.
- `training/details/[id]` -> Detalhes da sessão.

## 4. Gerenciamento de Estado
- Uso do `SessaoService` para persistência reativa.
- Local state para controlar qual bloco está sendo visualizado ou qual exercício está em edição.
- Zustand (opcional) para manter o timer da sessão ativo em background.