# Data Display Guidelines

Data UI must be scannable, compact, and honest about missing data.

## Lists
- Use `ListItem` patterns for repeated rows.
- Prefer subtle separators over heavy containers.
- Keep row labels short.
- Put the most important value on the right or in the strongest visual position.

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
- Positive progress uses success or accent depending on context.

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
