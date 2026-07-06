# Requirements: Componente de Swipe Modular

## 1. Visão Geral
Refatorar o componente `SwipeableRow` (primitiva canônica) para ser verdadeiramente modular e de fácil manutenção, implementando uma arquitetura baseada em features ativáveis (inicialmente `delete` e `edit`), disparadas exclusivamente a partir da borda direita.

## 2. Escopo
- **Componente**: `src/components/molecules/SwipeableRow.tsx`
- **Consumidores**: `FoodCardMeal.tsx` e `FoodCardList.tsx`

## 3. Requisitos Funcionais
- [x] O `SwipeableRow` deve aceitar um array de features (ex: `features={['delete', 'edit']}`).
- [x] O componente só deve permitir swipes a partir do lado direito.
- [x] Cada feature deve ter callbacks correspondentes (ex: `onDelete`, `onEdit`).
- [x] O componente deve centralizar as definições de ícone, rótulo (acessibilidade) e cor (background/foreground) de acordo com o Design System.
- [x] O recurso de *auto-trigger* (disparo automático ao arrastar além de um limite, ex: -200px) deve continuar funcionando dinamicamente com base nas configurações da feature ativa (ex: útil para a feature `delete`).

## 4. Requisitos de UI/UX (Pro Max / Frontend Design)
- **Claridade do Swipe (`swipe-clarity`)**: O componente revelará botões com ícones legíveis e cores semânticas fortes (`bg-error` para delete, `bg-primary` para edit) baseadas em tokens do Tailwind (`tailwind.config.js`).
- **Prevenção de Conflitos**: O arraste exigirá um threshold intencional para evitar toques acidentais e manter a animação fluida (150-300ms de feedback).
- **Sem emojis e consistência visual**: Os ícones devem vir estritamente de `lucide-react-native` (Trash2, Pencil).
- **Elegância / Design Intentional**: Em vez de expor uma API de props super complexa na página, o componente abstrai toda complexidade, provendo uma superfície de contato simples (`features={['delete']}`). O visual já é garantido de fábrica sem duplicação de CSS.
