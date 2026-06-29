# 06. Content & Accessibility

## 1. Content Voice (PT-BR)
FitApp UI copy must be short, direct, and written in **Brazilian Portuguese**.
- **CTAs**: Start with a verb (e.g., `Adicionar treino`, `Salvar refeição`). Do not use generic text like `Confirmar` for destructive actions.
- **Errors**: Explain the cause and provide a next action. Avoid vague messages like `Erro` or `Algo deu errado`.
- **Explanatory text**: Do not explain the interface when the control label is enough.

## 2. Accessibility
- **Touch Targets**: Interactive elements must use at least `min-h-touch-target` (44px). Icon-only controls must preserve the touch target even if the icon is smaller.
- **Contrast**: Primary text must have strong contrast. Do not rely solely on color for error, success, selection, or disabled states.
- **Roles & Labels**: Every interactive element needs an appropriate `accessibilityRole`. Icon-only actions need an `accessibilityLabel`.
- **Disabled States**: Must be visually muted and completely non-interactive.
