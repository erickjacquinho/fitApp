# 03. UI Foundations & Styling

## 1. Mineral Warm Palette (Blue-First)
FitApp uses the Mineral Warm palette with a strict **blue-first** rule. Olive tokens are legacy and forbidden.
- **Primary / Active / Focus**: `primary` (Never olive).
- **Background / Surface**: `background`, `surface`, `surface-elevated`.
- **Text**: `text-primary`, `text-secondary`, `text-inverse`, `text-disabled`.
- **Border**: `border-subtle`, `border-strong`, `border-control`, `border-focus`.
- **Status**: `error`, `warning`, `success`, `info`.
- **Macros**: `protein`, `carbohydrate`, `fat`.

## 2. Typography & Styling Rules
- **NativeWind v4**: Use utility composition (`className`). No `StyleSheet.create` or inline styles. Use `clsx` or `tailwind-merge` for conditional classes.
- **Typography**: Use canonical `Text` (`src/components/ui/text.tsx`). Do not override sizes unless adding a token.
- **Spacing**: Based on a 4px grid. Prefer `gap-*` over margins. No arbitrary spacing (e.g., `m-[13px]`).
- **Radius**: Cards use `rounded-lg` or `rounded-xl`. Avoid `rounded-full` unless inherently circular.
- **Shadows**: Disabled by default. Use `shadow-floating` only for bottom sheets or temporary overlays.
- **Class Order**: 1. Layout, 2. Box Model, 3. Display, 4. Typography, 5. Visuals, 6. States.

## 3. Governance
- **Prioridade Semântica Absoluta**: Use SEMPRE tokens semânticos contextualizados (`bg-surface`, `text-error`). É expressamente proibido usar utilitários puros do Tailwind (como `bg-blue-500` ou `text-red-400`).
- **Criação sobre Improviso**: Se um token semântico não existir para o seu caso de uso, você DEVE criá-lo no `theme.ts` e `tailwind.config.js` em vez de improvisar com Tailwind puro.
- Legacy tokens (`accent-*`, `primary-*` olive, `secondary-*` olive) are **deprecated**. Do not use them in new or migrated code.
- If repeated utilities are used 3+ times, create a shared Atom instead of copying classes.
