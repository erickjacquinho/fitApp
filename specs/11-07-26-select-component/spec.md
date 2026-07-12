# Componente Select (Refatoração de Design System)

## Visão Geral
Adequação do componente de fundação `src/components/ui/select.tsx` para seguir estritamente o Design System do FitApp. O objetivo é remover as classes baseadas em Tailwind arbitrário (e.g., `text-primary`, `bg-surface` mal aplicados, caso não correspondam aos tokens atuais), ajustar a tipografia, estados interativos, espaçamentos e a paleta "Mineral Warm (Blue-First)", garantindo alinhamento total com as diretrizes `03-ui-foundations.md` e `04-ui-components.md`.

## Objetivos
- Adequar tokens de cor para "Mineral Warm (Blue-First)", abolindo padrões antigos ou não padronizados.
- Assegurar que estados interativos (hover/focus/active) da lista de seleção e do trigger existam e tenham feedback adequado.
- Garantir a usabilidade do Select no mobile (Native) e Web, visto que FitApp foca principalmente no mobile (Android primeiramente), utilizando áreas de toque (`min-h-[44px]`).
- Remover qualquer "slop" decorativo ou desnecessário, aplicando o minimalismo utilitário e tipografia estabelecida.

## Requisitos Funcionais e UX
- **Áreas de toque**: Trigger e Itens de Seleção devem ter no mínimo 44px de altura (`min-h-touch-target`).
- **Estados**:
  - `Default`: Estilo neutro alinhado ao input comum.
  - `Active/Pressed`: Feedback visual imediato (cores semânticas, leve escurecimento via tokens).
  - `Disabled`: Opacidade reduzida e completamente não interativo.
  - `Open`: A lista flutuante (Bottom Sheet ou Popover) precisa se destacar do fundo com contraste/shadow adequados, respeitando a `shadow-floating` (se aplicável).
- **Semântica Visual**: O componente ativo não pode usar cores "olive". Se o trigger for focado ou um item estiver selecionado, deve usar o acento padrão (blue-500).

## Critérios de Sucesso
1. 100% das classes utilitárias no `select.tsx` são tokens semânticos do `tailwind.config.js` (`bg-surface`, `border-control`, etc.).
2. Zero ocorrências de classes não semânticas arbitrárias de cores, a não ser mapeadas estritamente pelo design system.
3. As áreas de toque respeitam o tamanho mínimo WCAG 2.1 AA (44x44px).
4. Feedback visual correto ao abrir o seletor, com estilo "Mineral Warm".
