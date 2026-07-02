# Requirements Spec - Diet History (Consistency Dashboard)

* **Feature Name:** Diet History Redesign
* **Slug:** `01/07/26-diet-history`
* **Target Directory:** `specs/01/07/26-diet-history/`
* **Author:** Jacques (Developer) / Antigravity (AI Assistant)

---

## 1. Executive Summary
The **Diet History** screen (`Dieta > Histórico`) in FitApp will transition from a simple, flat chronological list to an interactive nutritional consistency dashboard. It will enable users to monitor calorie adherence trends over weeks and months, view monthly metrics (average calories, compliance rate), and quickly jump to single-day details on the main diet tab.

---

## 2. Functional Requirements

### 2.1. Navigation & Redirection
* The History screen is a sub-route accessed from the Diet main tab.
* Tapping a daily summary card in the list must update the global state (`selectedDate` in store) and navigate back to the main Diet page (`(tabs)/diet?date=YYYY-MM-DD`), triggering the loading of that day's specific meal entries.
* Granular meal or food listings are **out of scope** for this screen to prevent UI duplication and preserve performance.

### 2.2. Monthly Consistency Heatmap (Signature Element)
* Located in a card container at the top of the history screen.
* Displays a grid representing the last 28 days of calorie logging.
* Each day is rendered as a circle or rounded box colored according to calorie compliance:
  * **Success (Green):** Daily calorie total is within $\pm 100\text{ kcal}$ of the daily target (2200 kcal).
  * **Warning (Yellow):** Daily calorie total is under/over target by $100\text{ to } 300\text{ kcal}$.
  * **Error (Red):** Daily calorie total deviates from target by $> 300\text{ kcal}$.
  * **Empty (Gray):** No meals logged on that date.
* Tapping/interacting with a grid element reveals a tooltip displaying the exact date, total calories, and status.

### 2.3. Grouped History Timeline
* Below the consistency heatmap, daily logs must be grouped by **Month and Year** (e.g., "JULHO DE 2026").
* Each month section must display a header with two consolidated indicators:
  * **Média Calórica:** Average daily calories logged during the month.
  * **Taxa de Adesão (%):** Percentage of logged days where the calorie total met the target range (Green state).
* Daily summary cards inside the timeline must display:
  * Date string (formatted e.g., "Ontem", "Terça-feira, 30 de Junho").
  * Total meals count and calorie breakdown (`2150 / 2200 kcal`).
  * A horizontal progress bar reflecting the calorie percentage (clamped at 100%).
  * A visual status badge/icon representing compliance (e.g., "Meta Batida", "Próximo", "Desvio").
  * Total protein, carbohydrates, and fat breakdown.

---

## 3. Non-Functional Requirements & Design Tokens
* **100% Design System Compliance:** Strictly use tailwind color tokens:
  * Primary: `bg-primary`, `text-primary`
  * Surfaces: `bg-surface`, `bg-surface-elevated`
  * Borders: `border-border-subtle`, `border-border-strong`
  * Status: `bg-success`/`text-success`, `bg-warning`/`text-warning`, `bg-error`/`text-error`
  * Macros: `bg-protein`, `bg-carbohydrate`, `bg-fat`
* **Zero Hardcoded Styles:** No inline styles, inline stylesheets, or raw hex codes.
* **Touch Target Size:** Tappable areas of daily cards must have a minimum height of 44px (`min-h-touch-target`).
* **Contrast & Color-only States:** The UI must not rely solely on color to represent daily status. Status text badges or glyphs (e.g. `[✓]`, `[!]`) must accompany color states.
* **Cumulative Layout Shift (CLS):** Loading states must render a skeleton placeholder matching the layout of the grouped timeline and cards instead of a generic loading spinner.

---

## 4. Open Decisions & Clarified Points
* **Is the Calorie Goal fixed?** Yes, default goal is set to 2200 kcal as currently implemented in the dashboard metrics, but compliance logic should dynamically read any goal returned by the DB or store.
* **Redirection Strategy:** It is verified that the main tab `app/(tabs)/diet.tsx` listens to search params `date` and sets it in the store. Hence, routing to `(tabs)/diet` with the `date` parameter is the optimal path.
