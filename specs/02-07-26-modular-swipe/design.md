# Technical Design: Componente de Swipe Modular

## 1. Arquitetura da API do Componente
Adotaremos o padrão de "Feature Flags Declarativas" para as ações de swipe, garantindo manutenção simplificada (Single Source of Truth para o visual).

```typescript
export type SwipeFeature = 'delete' | 'edit';

const FEATURE_CONFIG: Record<SwipeFeature, { icon: LucideIcon; label: string; bg: string; fg: string; autoTrigger?: boolean }> = {
  delete: { icon: Trash2, label: 'Excluir', bg: 'bg-error', fg: 'text-error-foreground', autoTrigger: true },
  edit: { icon: Pencil, label: 'Editar', bg: 'bg-primary', fg: 'text-primary-foreground' }
};
```

## 2. Fluxo de Interação (UX)
1. **Swipe Progressivo**: Conforme o usuário arrasta da direita para a esquerda, a `View` com os botões fantasma (`variant="ghost"`) contendo fundos customizados aparece fluidamente.
2. **Auto-Trigger**: Se a feature configurada possuir `autoTrigger: true` (como `delete`) e o gesto ultrapassar `-200px`, um ouvinte do `Animated.AnimatedInterpolation` será acionado. Um controle via `useRef` garantirá que o evento correspondente não dispare repetidas vezes durante um único gesto.
3. **Múltiplas Features**: Os botões serão mapeados e renderizados na mesma ordem em que os IDs de feature forem declarados no array da prop `features`.

## 3. Impacto de Refatoração
A migração da API (`onDelete` puro para a união de `features + onDelete/onEdit`) forçará atualizações nos cartões de alimento `FoodCardMeal` e `FoodCardList`. Eles deixarão de importar dependências de ícones, delegando a total responsabilidade da camada visual e da semântica interativa para o `SwipeableRow`.
