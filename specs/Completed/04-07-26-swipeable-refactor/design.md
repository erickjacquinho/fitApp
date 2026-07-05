# Design: SwipeableRow Refactor — Centralização & Tokens

## 1. Nova Tipagem

```typescript
// Features extensíveis — apenas adicionar ao union + FEATURE_REGISTRY
export type SwipeFeature = 'delete' | 'edit' | 'archive' | 'share' | 'duplicate' | 'pin';

interface FeatureRegistryEntry {
  icon: LucideIcon;
  label: string;
  /** Chave semântica de ThemeColors para o background */
  bgToken: keyof ThemeColors;
  /** Chave semântica de ThemeColors para o foreground (ícone) */
  fgToken: keyof ThemeColors;
  /** Se true, arrasto profundo (>threshold) dispara esta ação automaticamente */
  autoTrigger?: boolean;
}
```

## 2. Feature Registry

```typescript
const FEATURE_REGISTRY: Record<SwipeFeature, FeatureRegistryEntry> = {
  delete:    { icon: Trash2,    label: 'Excluir',    bgToken: 'error',   fgToken: 'textInverse', autoTrigger: true },
  edit:      { icon: Pencil,    label: 'Editar',     bgToken: 'primary', fgToken: 'textInverse' },
  archive:   { icon: Archive,   label: 'Arquivar',   bgToken: 'warning', fgToken: 'textInverse' },
  share:     { icon: Share2,    label: 'Compartilhar', bgToken: 'info', fgToken: 'textInverse' },
  duplicate: { icon: Copy,      label: 'Duplicar',   bgToken: 'success', fgToken: 'textInverse' },
  pin:       { icon: Pin,       label: 'Fixar',      bgToken: 'warning', fgToken: 'textInverse' },
};
```

**Princípio**: Cores usam `keyof ThemeColors` (tokens semânticos), nunca hex. Resolvidas em runtime via `useThemeColors()`.

## 3. Nova API Pública

```typescript
export interface SwipeableRowProps {
  /** Quais features mostrar, na ordem do array */
  features?: SwipeFeature[];
  /** Mapa feature → callback. Só features com handler são renderizadas. */
  handlers?: Partial<Record<SwipeFeature, () => void>>;
  /** Callback de tap no conteúdo */
  onPress?: () => void;
  children?: React.ReactNode;
  className?: string;
}
```

**Eliminados**: `onDelete`, `onEdit`, `getHandlerForFeature()`, switch/case.

**Filtro de ações ativas**:
```typescript
const colors = useThemeColors();
const activeFeatures = (features ?? []).filter(f => handlers?.[f]);
```

## 4. Resolução de Cores em Runtime

```typescript
// Dentro do componente, para cada feature:
const resolvedBg = colors[entry.bgToken]; // ex: colors.error → '#C44732' (light) / '#E6B2A8' (dark)
const resolvedFg = colors[entry.fgToken]; // ex: colors.textInverse → '#FFFFFF' (light) / '#18110E' (dark)
```

Usado em:
- `ActionButton` → `{ backgroundColor: resolvedBg }` (StyleSheet)
- `containerStyle` → `{ backgroundColor: colors[edgeEntry.bgToken] }`

## 5. Consumidores Atualizados

### FoodCardMeal.tsx (antes → depois)

```diff
- const activeFeatures: SwipeFeature[] = [];
- if (onEdit) activeFeatures.push('edit');
- if (onDelete) activeFeatures.push('delete');
- <SwipeableRow
-   features={activeFeatures.length > 0 ? activeFeatures : undefined}
-   onDelete={onDelete}
-   onEdit={onEdit}
+ const features: SwipeFeature[] = ['edit', 'delete'];
+ const handlers: Partial<Record<SwipeFeature, () => void>> = {};
+ if (onEdit) handlers.edit = onEdit;
+ if (onDelete) handlers.delete = onDelete;
+ <SwipeableRow
+   features={Object.keys(handlers).length > 0 ? features : undefined}
+   handlers={handlers}
```

### FoodCardList.tsx (antes → depois)

```diff
- <SwipeableRow
-   rightActions={onDelete ? [{
-     id: 'delete', icon: Trash2, label: 'Excluir',
-     onPress: onDelete, backgroundColorClass: 'bg-error',
-     iconColorClass: 'text-error-foreground', autoTrigger: true
-   }] : undefined}
+ <SwipeableRow
+   features={onDelete ? ['delete'] : undefined}
+   handlers={onDelete ? { delete: onDelete } : undefined}
```

## 6. O que NÃO muda

| Aspecto | Status |
|---|---|
| `ReanimatedSwipeable` como base | Mantido |
| `useAnimatedReaction` + `runOnJS` para auto-delete | Mantido |
| `containerStyle` para overscroll fill | Mantido |
| `expo-haptics` no threshold | Mantido |
| `ActionButton` com `useAnimatedStyle` + `interpolate` | Mantido |
| `RightActionsContent` como componente separado | Mantido |
| `hasAutoTriggered` ref guard | Mantido |
| `ACTION_WIDTH = 72` e `AUTO_TRIGGER_PX = 200` | Mantido |
