# Form Guidelines

Forms must be single-column and optimized for phone input.

## Field Anatomy
Use this order:
1. Label.
2. Input/control.
3. Helper text or error text.

Use `gap-2` between label and input. Use `gap-3` between fields in compact forms and `gap-4` for longer forms.

## Labels
- Labels are required unless the field is self-explanatory from surrounding context.
- Keep labels short.
- Do not rely only on placeholder text as a label.

## Helper Text
- Use helper text for constraints, examples, or format guidance.
- Keep it short.
- Do not show helper and error text at the same time unless both are necessary.

## Errors
- Validate on submit by default.
- Validate on blur for fields with strict format or numeric constraints.
- Error text must be next to the field.
- Error styling must use tomato tokens.

## Disabled Fields
- Disabled fields must be visibly muted.
- Do not allow disabled fields to receive focus or submit values unexpectedly.

## Submit Actions
- Primary submit should be near the end of the form.
- Async submit must disable duplicate submission.
- Destructive form actions must be visually separate.

## Keyboard
- Use appropriate keyboard type for numbers, decimals, dates, and text.
- Keep submit action reachable when keyboard is open.
