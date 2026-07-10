# Tasks: Wheel Picker & Demo Page
**Slug:** `10-07-26-wheel-picker`

## 1. UI Components Phase
- `[ ]` **1.1. Refatorar Lógica de Estado do WheelPicker (`src/components/ui/wheel-picker.tsx`):**
  - Adicionar o SharedValue `isScrolling = useSharedValue(0)`.
  - Mapear os callbacks `onBeginDrag`, `onEndDrag` e `onMomentumEnd` no `useAnimatedScrollHandler` para alternar o `isScrolling`.
  - Haptics: isolar corretamente usando `runOnJS` para não disparar loucamente caso haja pulos grandes no Scroll.
  - *Skill ideal: react-native-architecture*
- `[ ]` **1.2. Refatorar Micro-Animações do WheelItem:**
  - Extrair a interpolação para usar transições ou animações otimizadas (evitar mola e bounce exagerado para UI) quando `isScrolling === 0`.
  - Fazer os itens fora do index central terem opacidade nula no repouso, e opacidade (0.4) apenas nos +1 e -1 imediatos quando rolando.
  - *Skill ideal: emil-design-eng*

## 2. Navigation & Screens Phase
- `[ ]` **2.1. Criar Rota de Demonstração (`app/wheel-picker-demo.tsx`):**
  - Criar estrutura básica usando `<Screen>` e `<Header>`.
  - Adicionar um estado numérico para "Carga" e renderizar uma roleta de 10 a 100 kg.
  - Adicionar um estado em texto para "Intensidade" e renderizar uma roleta de Strings (Leve, Moderado, Intenso, Falha).
  - *Skill ideal: dupla-design (frontend-design / ui-ux-pro-max)*
- `[ ]` **2.2. Injetar Link na Dashboard (`app/(tabs)/index.tsx`):**
  - Injetar prop `headerRight` no `<Header title="Dashboard" />`.
  - Adicionar `<Button variant="ghost" onPress={() => router.push('/wheel-picker-demo')}>` contendo texto "Roleta".
  - *Skill ideal: react-best-practices*

## 3. QA Phase
- `[ ]` **3.1. Validação Visual e Tátil:**
  - Conferir se os ghosts somem suavemente apenas quando o scroll efetivamente para (teste de transição).
  - Verificar se a fonte central não sofre desfoque pelo Native Driver.
  - *Skill ideal: ui-visual-validator*
- `[ ]` **3.2. Code Audit (Validation Gate):**
  - Checar a regra `07-validation-gate` executando `npx tsc --noEmit` e `npm run lint`.
  - *Skill ideal: code-reviewer*
