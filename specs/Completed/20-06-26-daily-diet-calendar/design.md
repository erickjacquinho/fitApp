# Technical Design: Daily Diet Log & Reusable Calendar

## Architecture Mapping

### 1. Types & Database
- **Schema (`src/db/schema.ts`):** 
  - Add `target_date` (type: `string`) to the `meals` table.
  - Increment schema version to 4.
- **Model (`src/db/models/Meal.ts`):** 
  - Add `@field('target_date') targetDate!: string;`
- **Migrations (`src/db/migrations.ts`):**
  - Add migration to version 4 adding `target_date`. Since we can't easily run complex data updates inside schema migrations for SQLite, existing records will have `target_date` as `null` initially. We must handle `null` by coalescing to today's date in the app or run a one-time migration script. Actually, we can just make it `isOptional: false`? No, if we add a column to existing rows, it must be optional or have a default value. We will make it `isOptional: true` in schema, but treat it as required in UI. A fallback to `createdAt` can be used for old records.

### 2. Services
- **`MealService.createWithItems`:**
  - Update signature or payload to accept `targetDate: string`.
  - Save `targetDate` during creation.

### 3. Hooks
- **No new specific hooks required.** The selected date state will live in the UI or in a simple local state in `diet.tsx`.

### 4. Components

#### `src/components/molecules/CalendarStrip.tsx`
- **Role:** Reusable horizontal calendar component.
- **Props:** 
  - `selectedDate: string` (YYYY-MM-DD format)
  - `onSelectDate: (date: string) => void`
- **Implementation:**
  - Use `date-fns` to generate an array of dates (e.g. 7 days before, 7 days after the current date, or an infinite scrolling FlatList with `react-native-calendars` `ExpandableCalendar` or a custom `FlatList`).
  - Given we have `react-native-calendars` installed, we can use `<Agenda>` or `<ExpandableCalendar>` or `<WeekCalendar>`, but an `ExpandableCalendar` inside a tab might be heavy. Let's use `react-native-calendars`'s `ExpandableCalendar` with `WeekCalendar` wrapped in a `CalendarProvider`.

#### `src/features/diet/components/MenuScreen.tsx`
- **Role:** Main Diet UI.
- **Change:**
  - Introduce local state `const [selectedDate, setSelectedDate] = useState(format(new Date(), 'yyyy-MM-dd'))`.
  - Pass `selectedDate` to the query via `withObservables` (meaning `MenuScreen` must receive `selectedDate` as a prop from its parent to make `withObservables` reactive, so we must lift `selectedDate` state to a wrapper).
  - Wrapper `MenuScreenWrapper` will hold `selectedDate` and render `CalendarStrip` and `MenuScreen` (which receives `selectedDate`).
  - Update the `Q.where('target_date', selectedDate)` inside the query.

## Core Pillars
- **Security:** Ensure dates are sanitized and formatted purely as strings to avoid SQL injection patterns.
- **Maintainability:** Creating a generic `CalendarStrip` allows immediate reuse for Training without code duplication.
- **Scalability:** Querying by indexed `target_date` prevents the list from growing infinitely slow as the user logs meals for years. (We should add `isIndexed: true` to the `target_date` column in the schema).
