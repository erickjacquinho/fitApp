# Design - Etapa 1: Fundamentos e Infraestrutura

## 1. Arquitetura de Dados (WatermelonDB)

### 1.1 Schema Inicial
Localização: `src/db/schema.ts`

- **Tabela: Alimentos**
  - id, nome, peso_preparo (number), descricao (string), proteina (number), carboidrato (number), gordura (number), calorias (number), created_at, updated_at.
- **Tabela: Refeicoes**
  - id, nome, quantidade (number), estado_preparo (string), created_at, updated_at.
- **Tabela: ItemRefeicao**
  - id, refeicao_id (relation), alimento_id (relation), quantidade (number), created_at, updated_at.
- **Tabela: Programas**
  - id, nome, created_at, updated_at.
- **Tabela: Blocos**
  - id, programa_id (relation), nome, ordem (number), created_at, updated_at.
- **Tabela: Exercicios**
  - id, bloco_id (relation), nome, series (number), repeticoes_min (number), repeticoes_max (number), tecnica_avancada (string), reps_reserva (number), created_at, updated_at.
- **Tabela: SessaoTreino**
  - id, programa_id (relation), data_inicio (number), data_fim (number), status (string), created_at, updated_at.
- **Tabela: ExecucaoExercicio**
  - id, sessao_treino_id (relation), exercicio_id (relation), serie_numero (number), reps_feitas (number), quilagem (number), reps_reserva_feitas (number), created_at, updated_at.

### 1.2 Modelagem
- Classes de modelo em `src/db/models/`.
- Registro de modelos no `Database` em `src/db/index.ts`.

## 2. Estrutura de Navegação (Expo Router)
Localização: `app/`

- `app/_layout.tsx`: Root Provider (WatermelonDB, Safe Area, Theme).
- `app/(tabs)/_layout.tsx`: Configuração do Bottom Tab Navigator.
- `app/(tabs)/index.tsx`: Dashboard.
- `app/(tabs)/diet.tsx`: Módulo Dieta.
- `app/(tabs)/training.tsx`: Módulo Treino.
- `app/(tabs)/profile.tsx`: Perfil/Configurações.

## 3. Design System (Componentes Base)

### 3.1 Atoms (`src/components/atoms/`)
- **Button.tsx**: Props: `variant` (primary, secondary, destructive), `size`, `label`, `onPress`, `icon`.
- **Typography.tsx**: Centralização de estilos de texto (H1, H2, Body, Caption).
- **Input.tsx**: Suporte a texto/número, validação visual simples.
- **Card.tsx**: Container base com bordas arredondadas e sombra (Tailwind: `bg-white dark:bg-zinc-900 rounded-xl p-4 shadow-sm`).

### 3.2 Molecules (`src/components/molecules/`)
- **Header.tsx**: Título centralizado, botão "Back" à esquerda (condicional).
- **SwipeableCard.tsx**: Wrapper do `Card` usando `react-native-gesture-handler` e `Reanimated` para ações laterais.

### 3.3 Organisms (`src/components/organisms/`)
- **ConfirmModal.tsx**: Modal genérico para confirmação de exclusão ou ações críticas.

## 4. Mapeamento de Camadas
1. **Types**: `src/types/navigation.ts`, `src/db/types.ts`.
2. **Database**: `src/db/schema.ts`, `src/db/index.ts`.
3. **Hooks**: `src/hooks/use-database.ts` (atalho para `useDatabase`).
4. **Components**: Implementação visual usando NativeWind.
5. **Routes**: Integração no Expo Router.

## 5. Segurança e Performance
- **Segurança**: Validação de inputs numéricos para evitar NaN no DB.
- **Maintainability**: Uso rigoroso de componentes atômicos.
- **Scalability**: Schema expansível para cardio e suplementação (Fase 2 futuro).
- **Performance**: Indexação de chaves estrangeiras (`programa_id`, `bloco_id`, etc).