# 04. UI Components, Forms & Data Display

## 1. Component Rules
- **Canonical Primitives**: Must live in `src/components/ui/` and originate from `@react-native-reusables`.
- **States**: Every interactive component must define default, hover, focus, active, disabled, loading, and error states. Don't ship with half of these.
- **Card vs View**: Use `Card` (nested cards are forbidden) to group independent content. Use `View` for structural layout, padding, and background coloration without elevation.
- **Popups**: NEVER use native `Modal` directly. Use `AlertDialog` (blocking decisions), `Dialog` (supplementary content), or `BottomSheetModal` (non-blocking).
- **Icons (Lucide & Icon Discipline)**:
  - **Primitive & Tokens**: Always render Lucide icons via `Icon` primitive (`src/components/ui/icon.tsx`) with `as` prop. Sizes strictly mapped to tokens: `icon-sm` (16px), `icon-md` (20px), `icon-lg` (24px). Primary action icons use `blue-500`.
  - **Touch Target Minimum**: Icon-only interactive controls MUST guarantee an area of at least 44x44pt (`min-h-[44px] min-w-[44px]` or `hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}`).
  - **Press States & Visual Stability**: Ghost/outline icon buttons **NUNCA** devem ter background color em press/hover. Devem usar exclusivamente variação de opacidade (`active:opacity-80`). Animações de toque devem alterar opacidade/cor sem deslocar a área ocupada (zero layout shift).
  - **Haptics**: Gestos destrutivos ou de reordenação envolvendo ícones devem acionar `expo-haptics`.
  - **Stroke & Style Discipline**: Manter `strokeWidth` consistente e nunca usar emojis nativos como ícones de sistema ou navegação.

## 2. Forms
- **Structure**: Single-column only. Order: 1. Label, 2. Input, 3. Helper/Error.
- **Labels**: Required unless context is unmistakable. Do not rely solely on placeholders. Filtros e Dropdowns (Selects) **DEVEM** sempre ter uma label alinhada acima do componente.
- **Errors**: Validate on submit by default. Use `text-error` tokens next to the field.
- **Actions**: Async actions must disable duplicate submissions.

## 3. Data Display & Lists
- **Grouped List Box Pattern**: All lists (history, workouts, foods) MUST use the grouped box pattern. The component calculates `isFirst` and `isLast` and passes to the item to apply dynamic borders/radius (`rounded-t-lg`, `border-b`, etc).
- **Progress**: Include readable numeric values. Do not rely only on color.
- **Empty States**: Must teach the interface, not just say "nothing here." Have a short title, context, and one clear CTA. Do not use illustration-heavy states.
- **Feedback**: Use skeletons (mirroring final layout) for content-heavy loading, not spinners in the middle of content. Use Toast for non-blocking confirmation.

## 4. Swipeable & Gesture-Based Rows
- **Componente canônico**: `SwipeableRow` (`src/components/molecules/SwipeableRow.tsx`). API baseada em features: `features={['edit', 'delete']}`.
- **Auto-delete (full swipe)**: Disparado via `useAnimatedReaction` + `runOnJS` quando `drag.value < -threshold`. NUNCA depender de `onSwipeableOpen` — ele dispara após release + snap na abertura normal (ao atingir `rightThreshold`), NÃO durante overshoot.
- **Guard contra double-fire**: Usar `React.useRef(false)` para impedir que `useAnimatedReaction` dispare callbacks múltiplas vezes quando o drag oscila ao redor do threshold. Resetar o guard em `onSwipeableClose`.
- **Ordem visual vs array**: A animação de `translateX` inverte a ordem visual dos botões. O primeiro item do array fica na borda direita visual (junto ao overscroll). Considerar isso ao escolher a cor do `containerStyle`.

## 5. Regras do Componente Canônico Badge
- **Componente Canônico**: `Badge` (`src/components/ui/badge.tsx`).
- **Proibição de Translucidez**: É estritamente proibido usar opacidade ou transparências (ex: `bg-black/20`, `bg-white/15`, `opacity-*`) em badges. Todas as badges DEVEM usar cores 100% sólidas da paleta Mineral Warm.
- **Relação Borda x Fundo (Baixo Contraste entre Si)**: A borda de uma badge DEVE ter baixo contraste em relação ao seu próprio fundo (ex: `bg-surface-elevated border-border-subtle`, `bg-primary border-primary` ou `bg-white border-white`), evitando contornos escuros dividindo a pílula.
- **Alto Contraste de Leitura**: O alto contraste fica concentrado exclusivamente no conteúdo interno (texto e ícone) em relação ao fundo da badge (ex: texto `text-text-primary` ou `text-text-inverse`).
- **Geometria**: Pílulas de status/cronômetro DEVEM usar `shape="pill"` (`rounded-full px-2.5 py-0.5 gap-1.5`). Badges de contadores isolados DEVEM usar `shape="default"` (`rounded-md px-2 py-0.5`).
