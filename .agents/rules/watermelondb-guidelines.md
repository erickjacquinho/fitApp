# WatermelonDB Guidelines - FitApp

This document defines the mandatory patterns for using WatermelonDB. As an offline-first app, adherence to these rules ensures data integrity and UI responsiveness.

## 1. Schema & Models
- **Timestamps**: Every table in `schema.ts` MUST include `created_at` and `updated_at` columns (type: `number`).
- **Model Standard Properties**: All models MUST declare:
  ```typescript
  @readonly @date('created_at') createdAt!: Date;
  @readonly @date('updated_at') updatedAt!: Date;
  ```
- **Relations (1:N)**:
  - **Parent Table**: MUST use the `@children` decorator. 
    - *Example*: `@children('exercises') exercises!: Query<Exercise>;`
  - **Child Table**: MUST use the `@relation` decorator.
    - *Example*: `@relation('workouts', 'workout_id') workout!: Relation<Workout>;`
- **Associations**: MUST be defined in the static `associations` property. **DO NOT** pass as functions (like `.as('name')`).

## 2. Reading Data (UI Reactivity)
- **Golden Rule**: React UI components MUST NEVER perform synchronous or static fetches (`.fetch()`) unless outside the render cycle.
- **Reactivity Implementation**: ALWAYS use `@nozbe/with-observables` (HOC) or reactive hooks to connect components to queries. This ensures the UI updates automatically when data changes.

## 3. Writing Data (Actions & Writers)
- **Golden Rule**: NEVER call mutable methods like `.create()`, `.update()`, or `.destroy()` directly inside a React component (e.g., in a Button `onPress`).
- **Service Layer**: All mutations MUST be encapsulated within a `database.write(...)` block inside a Service class or a Model method annotated with `@writer`.

## 4. Query Performance
- **Indexing**: Frequently filtered columns (like `workout_id` or `date`) MUST be indexed in the schema.
- **Filtering**: Use WatermelonDB's native query operators (`Q.where`, `Q.and`, `Q.or`) instead of filtering in JavaScript memory.

## 5. Constraint Checklist
- **Offline Integrity**: Ensure all models have valid defaults for local-only creation.
- **Batching**: Use `database.batch(...)` when creating or updating multiple records at once to maximize performance.
- **Validation**: Perform data validation in the Service layer before calling DB writers.
