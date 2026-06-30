# 02. Architecture & Data Guidelines

## 1. Feature-First Organization
Code MUST be grouped by domain in `src/features/<feature-name>/`, containing:
- `components/`: Domain UI.
- `hooks/`: Business logic.
- `services/`: API/heavy logic.
- `store/`: Local/Zustand state.
Shared UI belongs in `src/components/`. Routes in `app/` are slim orchestrators.

## 2. State Hierarchy
1. **Local State**: UI-only states.
2. **Context API**: Component communication. NEVER use for global data caching.
3. **Zustand**: Cross-feature or persistent UI state.
4. **WatermelonDB**: Persistent domain data. **The Ground Truth**.

## 3. WatermelonDB Rules
- **Models**: Must include `createdAt` and `updatedAt`. Use `@children` for 1:N parents, `@relation` for children.
- **Reactivity**: UI components MUST use `@nozbe/with-observables` or reactive hooks. NEVER use `.fetch()` in render.
- **Mutations**: Write operations (`create`, `update`, `destroy`) MUST be wrapped in `database.write(...)` inside Services or `@writer` methods. NEVER write directly from UI callbacks.
- **Indexing**: Frequently filtered columns MUST be indexed. Use native query operators (`Q.where`), not JS filtering.

## 4. Analytics & Metrics
- **Raw SQL (Solution 1)**: For historical analysis and heavy aggregations (> 500 records). Store in `services/raw-queries.service.ts` using `database.adapter.query`.
- **In-Memory (Solution 2)**: For daily/weekly reactive metrics. Use RxJS observables and Lodash inside feature hooks.
- **AI-Ready Structure**: Analytics outputs must be flat JSON with semantic context (e.g., `{ value: 5000, status: 'increasing' }`). Never expose PII.
