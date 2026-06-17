# Design - Etapa 3: Módulo Dieta - UI

## 1. Estrutura de Telas
Localização: `src/features/diet/components/` (ou `app/diet/` se usar Expo Router profundamente)

- **CardapioScreen**: Lista reativa de `Refeicao`. Uso de `@withObservables` para atualizar totais.
- **BancoAlimentosScreen**: FlatList com `SearchBar` no topo. Suporte a `selectable` mode.
- **AlimentoForm**: Componente reutilizável para Criar/Editar Alimento.
- **RefeicaoForm**: Composição de campos de texto + Lista de itens selecionados.

## 2. Componentes de UI de Dieta
- **MacroBadge**: Pequeno componente para exibir P/C/G (Proteína, Carbo, Gordura).
- **PreviewMacros**: Hook `useMemo` para somar `alimento.proteina * (quantidade/100)`.
- **SeletorAlimentosModal**: Lista filtrável com input numérico para cada item.

## 3. Navegação Interna
- `diet/index` -> Cardápio.
- `diet/food-bank` -> Banco de Alimentos.
- `diet/create-food` -> Formulário Alimento.
- `diet/create-meal` -> Formulário Refeição.

## 4. Gerenciamento de Estado
- Uso do WatermelonDB para dados persistentes.
- Local state (`useState`) para formulários em andamento.
- Zustand (opcional) se houver necessidade de compartilhar a seleção temporária de alimentos entre telas.