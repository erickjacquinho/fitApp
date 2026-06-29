# Data Display Guidelines

Data UI must be scannable, compact, and honest about missing data.

## Lists
- Use `ListItem` patterns for repeated rows.
- Prefer subtle separators over heavy containers.
- Keep row labels short.
- Put the most important value on the right or in the strongest visual position.

### Grouped Lists Pattern
- **Standardized Box Pattern:** ALL list components (e.g. historical data, workouts, food items) MUST use the grouped box pattern.
- This pattern joins all items into a single visual block by applying:
  - `isFirst`: `rounded-t-lg border-t`
  - `isLast`: `rounded-b-lg`
  - Middle items: `rounded-none`
  - All items: `border-x border-b border-border-subtle bg-surface`
- Components rendering the list must calculate `isFirst` (`index === 0`) and `isLast` (`index === items.length - 1`) and pass them to the list item component.
- The item container should use `cn` to concatenate these dynamic classes.

## Workout Cards
- Show date, workout name/type, key volume/progression metric, and status.
- Avoid overloading cards with full exercise details.
- Use detail screens for long set lists.

## Meal Cards
- Show meal name, calories, macro summary, and status.
- Use tomato only for limits or errors.
- Use warning for near-limit states.

## Macro Summaries
- Use compact stat groups.
- Two columns by default; three columns only for short labels.
- Keep units visible.

## Progress
- Progress indicators must include readable numeric values.
- Do not rely only on color.
- Positive progress uses `blue-500` for generic progress (blue-first rule); use the macro family color (`blue-500` protein, `amber-500` carb, `orange-500` fat) for macro-specific progress bars.

## Charts
- Charts must have clear labels, units, and time range.
- Avoid too many series at once on phone screens.
- Use semantic colors consistently.

## History and Comparisons
- Show newest data first unless the chart/time pattern requires chronological order.
- Make comparison periods explicit.
- Partial data must be labeled clearly.

## Empty Data
- Empty charts and histories must explain what data is needed.
- Include one CTA when user action can create the missing data.
