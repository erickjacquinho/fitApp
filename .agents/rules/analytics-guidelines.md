# Analytics & Metrics Guidelines - FitApp

This document defines the architecture and standards for data processing, crossing, and metrics generation in FitApp, balancing performance (SQLite) and reactivity (JavaScript).

## 1. Decision Matrix: Choosing the Right Method

| Criteria | Raw SQL (Solution 1) | In-Memory (Solution 2) |
| :--- | :--- | :--- |
| **Data Volume** | High (> 500 records / All-time) | Low-Medium (< 500 records / Weekly) |
| **Reactivity** | Manual (Explicit refresh/re-fetch) | Automatic (RxJS Observables) |
| **Logic Complexity** | Aggregations (SUM, AVG, GROUP) | Complex Conditional Logic/UI Mapping |
| **Performance** | High (C-level SQLite engine) | Medium (Main thread JS) |
| **UI Updates** | Periodic (Dashboard, Reports) | Real-time (Counters, Today's macros) |

---

## 2. Solution 1: Raw SQL (WatermelonDB Adapter)

### When to use:
- Historical analysis (last 30 days, last 12 months, all-time).
- Heavy aggregations where performance is critical.
- Cross-feature data crossing (e.g., Calories vs. Workout Volume).

### Specifications:
- **Location**: Store in `src/features/analytics/services/raw-queries.service.ts`.
- **Implementation**: Use `database.adapter.query(new RawQuery(table, sql))`.
- **Performance**: 
    - Always use `WHERE` clauses with indexed columns (e.g., `date`).
    - Minimize the number of columns returned (avoid `SELECT *` if only one value is needed).
- **Naming**: Functions must be prefixed with `calculateRaw...`.

### Example:
```typescript
const totalVolume = await database.adapter.query(
  new RawQuery('exercises', 'SELECT SUM(sets * weight) as total FROM exercises WHERE created_at > ?', [startDate])
);
```

---

## 3. Solution 2: In-Memory Processing (JS + Observables)

### When to use:
- Daily trackers (today's water, remaining calories).
- Weekly progress where data is relatively small.
- Highly interactive UI elements that must update immediately as the user saves data.

### Specifications:
- **Location**: Feature hooks (e.g., `src/features/diet/hooks/use-daily-macros.ts`) or `src/features/analytics/hooks/`.
- **Implementation**: Leverage WatermelonDB `@withObservables` to ensure the component re-renders when data changes.
- **Optimization**:
    - Use **lodash** for complex grouping or summarization.
    - Wrap heavy transformations in `useMemo`.
    - Limit the number of records fetched from the database to only what is needed for the calculation.
- **Naming**: Hooks must be prefixed with `useMetrics...`.

### Example:
```typescript
const dailyTotal = useMemo(() => _.sumBy(mealFoods, 'calories'), [mealFoods]);
```

---

## 4. Integration with UI (Charts)

- Data passed to charting libraries (like `react-native-gifted-charts`) should be formatted in the service layer or hook to match the library's expected structure.
- Prefer calculating the chart data points once and memoizing them.

## 5. Global Metrics & Zustand

- Use **Zustand** only for derived global metrics that need to be accessed by multiple unrelated features (e.g., a "Level/XP" system based on overall activity).
- Do not duplicate WatermelonDB data in Zustand. Only store the *results* of calculations.

---

## 6. AI-Ready Data Structures (LLM-First)

To enable future AI Coaching and Natural Language Insights, all analytics outputs must be "AI-Ready":

### 6.1. Semantic Context Wrapping
Every analytical service output should be easily convertible to a human-readable string. 
- **Guideline**: Include a `summary` or `intent` field in complex analytical objects.

### 6.2. JSON for Prompts
Metrics should be structured in a flat, clean JSON format that can be directly injected into an LLM context window without heavy post-processing.

### 6.3. Thresholds & Interpretations
Define "What is good?" or "What is bad?" in the code or metadata, not just in the UI. 
- **Example**: Instead of just returning `volume: 5000`, the service could return `{ value: 5000, status: 'increasing', percentile_vs_user_avg: 1.2 }`. This "Semantic Layer" is what the LLM needs to coach the user.

### 6.4. Privacy-First AI
- **Rule**: Never send raw, PII (Personally Identifiable Information) to external LLM APIs.
- **Rule**: Only send aggregated, anonymized metrics for insight generation.
