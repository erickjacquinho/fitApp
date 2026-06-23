# Mineral Warm Design System Refresh

## Purpose

This package defines the complete, phased implementation plan for replacing the current olive-led FitApp visual system with the Mineral Warm design system. It is planning-only: creating or reviewing this package must not change application code, dependencies, configuration, font assets, generated output, or runtime behavior.

The normative input is `C:/Users/Jacques/Documents/Codex/2026-06-23/copn/outputs/paleta-mineral-quente.md`. During Phase 1 it will be translated into an English in-repository design-system document without changing its semantic intent.

## Locked Decisions

- The Mineral Warm palette governs all new design-system rules and implementation plans.
- The complete current application is in scope; routes, business rules, persistence, and visible Portuguese copy remain behaviorally unchanged.
- Light and dark themes follow the operating-system preference. No manual theme selector is planned.
- Helvetica Now files are copied into the project only during Phase 2 implementation.
- The final migration removes legacy olive/accent aliases after every consumer has moved.
- Existing uncommitted work is preserved and incorporated; it is never reset or overwritten blindly.
- Implementation is strictly sequential. A phase cannot start until the prior phase passes its exit gate.
- Existing active SDDs remain intact and serve as historical inputs, not completion evidence.
- The repository-native `requirements.md` / `design.md` / `tasks.md` format is authoritative; `.specify` is not introduced.

## Package Map

| Order | SDD | Outcome | Native impact |
|---:|---|---|---|
| 1 | `01-governance-and-baseline` | Canonical governance, inventory, baseline, lint/test strategy | None expected |
| 2 | `02-theme-typography-foundations` | Palette, semantic themes, Helvetica Now, native color access | Required |
| 3 | `03-canonical-primitives` | Stable primitive APIs and complete style guide | Conditional |
| 4 | `04-shared-ui-and-dashboard` | Shared compositions, application shell, navigation, Dashboard | JavaScript/TypeScript only expected |
| 5 | `05-diet-ui-migration` | Complete Diet journey migration | JavaScript/TypeScript only expected |
| 6 | `06-training-ui-migration` | Complete Training journey migration | JavaScript/TypeScript only expected |
| 7 | `07-final-migration-and-validation` | Residual routes, legacy removal, full proof and release artifact | Rebuild if Phase 2 artifact is stale or native inputs changed |

## Dependency DAG

```text
01 Governance and Baseline
  -> 02 Theme and Typography Foundations
    -> 03 Canonical Primitives
      -> 04 Shared UI and Dashboard
        -> 05 Diet UI Migration
          -> 06 Training UI Migration
            -> 07 Final Migration and Validation
```

No child SDD may be executed in parallel with another child SDD. `[P]` markers inside a child only permit parallel work after all listed local prerequisites are complete and when files do not overlap.

## Global Architecture Contract

Implementation follows one-way dependencies:

```text
Primitive values and strict types
  -> semantic light/dark theme maps
    -> theme access hook and NativeWind utilities
      -> canonical UI primitives
        -> shared compositions
          -> feature compositions
            -> routes
```

- Feature code must not import registry internals or primitive color values.
- Native-prop consumers use the centralized theme contract; components use semantic NativeWind utilities.
- Services and WatermelonDB remain outside the visual migration unless a UI contract currently violates layer boundaries. Any necessary change must preserve its public behavior and receive explicit traceability.
- A legacy alias may exist only as a documented temporary bridge between Phases 2 and 7. New or migrated code cannot use it.

## Cross-Phase Gates

Every child SDD must:

1. preserve unrelated and uncommitted user work;
2. satisfy every EARS acceptance criterion assigned to that phase;
3. maintain `implementation/mineral-warm-design-system/validation.md` during future execution;
4. add or update automated coverage for changed behavior;
5. run its narrow gate before marking tasks complete;
6. run the mandatory repository Full Gate before phase handoff;
7. record Android runtime evidence for behavior changes;
8. make and record a native-impact decision;
9. leave no unresolved clarification, placeholder, debug output, temporary bypass, or undocumented exception.

## Existing SDD Relationship

| Existing package | Relationship |
|---|---|
| `specs/22-06-26-shadcn-design-system` | Registry-adoption history; Phase 3 revalidates current behavioral equivalence and token compliance. |
| `specs/23-06-26-complete-component-migration` | Card/popup migration history; Phases 3-6 verify live code because checked tasks are not runtime proof. |
| `specs/23-06-26-universal-validation-guardrail` | Source for the mandatory Full Gate used by all phases. |
| Completed token/refactor SDDs | Historical structure only; their generic scales do not override Mineral Warm semantics. |

## Global Definition of Done

The package is complete only when all seven child `tasks.md` files have no open implementation tasks, all requirements have task coverage, the final cross-artifact audit reports zero critical/high findings, all Full Gate checks pass, all current routes have light/dark Android evidence, and the required APK hashes match. Planning completion alone does not claim implementation completion.

