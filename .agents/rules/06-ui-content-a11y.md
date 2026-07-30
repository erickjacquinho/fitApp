# 06. Content & Accessibility

## 1. Content Voice (PT-BR)
FitApp UI copy must be short, direct, and written in **Brazilian Portuguese**.
- **CTAs**: Start with a verb (e.g., `Adicionar treino`, `Salvar refeição`). Do not use generic text like `Confirmar` for destructive actions.
- **Errors**: Explain the cause and provide a next action. Avoid vague messages like `Erro` or `Algo deu errado`.
- **Explanatory text**: Do not explain the interface when the control label is enough.

## 2. Accessibility
- **Touch Targets**: Interactive elements must use at least `min-h-touch-target` (44px) or `hitSlop`. Icon-only controls must preserve the 44px touch target even if the rendered icon size is 16px or 20px.
- **Contrast**: Primary text and icon glyphs must have strong contrast (>= 4.5:1 for body/small glyphs, >= 3:1 for large UI glyphs). Do not rely solely on color for error, success, selection, or disabled states.
- **Roles & Labels for Icons**: Every icon-only interactive element MUST define `accessibilityRole="button"` and a localized Brazilian Portuguese `accessibilityLabel` (e.g., `accessibilityLabel="Voltar à tela anterior"`). Decorative icons next to text labels must set `accessibilityElementsHidden={true}` or `importantForAccessibility="no"` to prevent redundant screen reader chatter.
- **Disabled States**: Must be visually muted and completely non-interactive.
