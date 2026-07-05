# Tasks: SwipeableRow Refactor — Centralização & Tokens

Refs: [requirements.md](file:///c:/Programmer/fitApp/specs/04-07-26-swipeable-refactor/requirements.md) | [design.md](file:///c:/Programmer/fitApp/specs/04-07-26-swipeable-refactor/design.md)

---

## Fase 1: Tipos & Registry

### 1.1 Expandir `SwipeFeature` e criar `FEATURE_REGISTRY`
**Skill**: `react-native-architecture`
**Arquivo**: `SwipeableRow.tsx`
**Ação**:
- [ ] Expandir union type: `'delete' | 'edit' | 'archive' | 'share' | 'duplicate' | 'pin'`
- [ ] Criar interface `FeatureRegistryEntry` com `bgToken: keyof ThemeColors` e `fgToken: keyof ThemeColors`
- [ ] Criar `FEATURE_REGISTRY: Record<SwipeFeature, FeatureRegistryEntry>` com tokens semânticos
- [ ] Importar ícones necessários (`Archive`, `Share2`, `Copy`, `Pin`) do `lucide-react-native`
- [ ] Remover antigo `FEATURE_CONFIG` com hex hardcoded

### 1.2 Atualizar `SwipeableRowProps`
**Skill**: `react-native-architecture`
**Arquivo**: `SwipeableRow.tsx`
**Ação**:
- [ ] Substituir `onDelete?: () => void` e `onEdit?: () => void` por `handlers?: Partial<Record<SwipeFeature, () => void>>`
- [ ] Exportar tipo `SwipeableRowProps` e `SwipeFeature` para consumidores

---

## Fase 2: Componente Principal

### 2.1 Integrar `useThemeColors()` no `SwipeableRow`
**Skill**: `react-native-architecture`
**Arquivo**: `SwipeableRow.tsx`
**Ação**:
- [ ] Importar e chamar `useThemeColors()` no corpo do componente
- [ ] Computar `activeFeatures` usando `(features ?? []).filter(f => handlers?.[f])`
- [ ] Remover `getHandlerForFeature()` (switch/case) — substituir por acesso direto `handlers[feature]`
- [ ] Resolver `edgeConfig.bgToken` via `colors[bgToken]` para `containerStyle`

### 2.2 Atualizar `RightActionsContent` 
**Skill**: `react-native-architecture`
**Arquivo**: `SwipeableRow.tsx`
**Ação**:
- [ ] Receber `colors: ThemeColors` como prop (de `useThemeColors`)
- [ ] Trocar `getHandlerForFeature` por `handlers` record nas props
- [ ] Passar cores resolvidas para `ActionButton`

### 2.3 Atualizar `ActionButton`
**Skill**: `react-native-architecture`
**Arquivo**: `SwipeableRow.tsx`
**Ação**:
- [ ] Receber `bgColor: string` e `fgColor: string` já resolvidos (não mais `config.bgColor`)
- [ ] Receber `handler` direto de `handlers[feature]`
- [ ] Manter `useAnimatedStyle` + `interpolate` intactos

### 2.4 Limpar autoTrigger refs
**Skill**: `react-native-architecture`
**Arquivo**: `SwipeableRow.tsx`
**Ação**:
- [ ] `autoTriggerHandlerRef.current` agora lê de `handlers[autoTriggerFeature]`
- [ ] `fireAutoDelete` continua idêntico (já usa ref)
- [ ] Verificar que `onSwipeableClose` reseta `hasAutoTriggered`

---

## Fase 3: Consumidores

### 3.1 Migrar `FoodCardMeal.tsx`
**Skill**: `frontend-developer`
**Arquivo**: `src/features/diet/components/FoodCardMeal.tsx`
**Ação**:
- [ ] Substituir construção manual de `activeFeatures[]` + props `onDelete`/`onEdit`
- [ ] Usar nova API: `features={['edit', 'delete']}` + `handlers={{ edit: onEdit, delete: onDelete }}`
- [ ] Filtrar handlers undefined: só incluir features com handler

### 3.2 Migrar `FoodCardList.tsx`
**Skill**: `frontend-developer`
**Arquivo**: `src/features/diet/components/FoodCardList.tsx`
**Ação**:
- [ ] Remover prop inexistente `rightActions={[...]}`
- [ ] Usar nova API: `features={['delete']}` + `handlers={{ delete: onDelete }}`
- [ ] Remover import de `Trash2` (agora vive no registry)

---

## Validação

- [ ] `npx tsc --noEmit` — zero erros de tipo
- [ ] Verificar swipe + auto-delete + haptic no Android
- [ ] Verificar cores em light mode E dark mode
- [ ] Verificar que `FoodCardList` e `FoodCardMeal` funcionam corretamente
