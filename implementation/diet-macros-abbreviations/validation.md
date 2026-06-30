# Validation Record - Diet Daily Summary Macro Abbreviations (Revision 1)

## 1. Scope
Revert the daily macro summary styles in `DailyBalance.tsx` back to the neutral secondary color and set the labels to:
- Protein: "Prot", color `text-text-secondary`
- Carbohydrate: "Carb", color `text-text-secondary`
- Fat: "Gord", color `text-text-secondary` (representing "Gordura" in PT-BR, replacing "Fat")

## 2. Risk Classification
- **UI:** Low. Revert to standard styling with corrected PT-BR abbreviations.
- **State/Service/Data/Security/Native:** No impact.

## 3. Post-Change Test Execution

### 3.1 TypeScript Compiler
Command:
```powershell
npx.cmd tsc --noEmit
```
Result: **Passed** (Exit Code: 0)

### 3.2 Jest Test Suites
Command:
```powershell
npm.cmd test src/features/diet
```
Result: **Passed** for the modified suite `src/features/diet/__tests__/diet-components.test.ts` (Exit Code: 0 for this specific suite).

## 4. Tests Added and Changed
We updated the existing test suite `src/features/diet/__tests__/diet-components.test.ts` in the `DailyBalance uses semantic tokens` block to assert that `DailyBalance.tsx` uses the updated abbreviation character and color configuration:
```typescript
expect(file).toContain('className="text-text-secondary font-medium">Prot</Text>');
expect(file).toContain('className="text-text-secondary font-medium">Carb</Text>');
expect(file).toContain('className="text-text-secondary font-medium">Gord</Text>');
```
This test ran and successfully passed.

## 5. Accepted Pre-Existing Failures (Regression Policy)
The following test suites failed in the pre-change baseline and continue to fail in the post-change verification. They are caused by layout changes that shifted visual background tokens like `bg-surface` to parent wrappers, unrelated to the macro text changes:
- `quantity-screens.test.ts`
- `calendar-components.test.ts`
- `meal-form-components.test.ts`

## 6. Android/Native Impact
- **Decision:** No native rebuild required. The changes are entirely in TypeScript/JavaScript layout code and styling (Tailwind CSS).

## 7. Completion Result
- **Status:** APPROVED
- **Timestamp:** 2026-06-25T19:16:30-03:00
