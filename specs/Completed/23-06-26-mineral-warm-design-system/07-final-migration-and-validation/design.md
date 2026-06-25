# Design: Final Migration and Validation

## Technical Context

Phase 7 owns residual routes, compatibility removal, final documentation alignment, complete validation, and release evidence. It cannot compensate for incomplete prior phases.

## Layer Mapping

```text
Completed foundation and primitive contracts
  -> residual route migration
    -> zero-consumer compatibility removal
      -> automated/static/contrast validation
        -> Android journey matrix
          -> APK/native proof and completion audit
```

## Residual Scope

- `app/(tabs)/profile.tsx`
- `app/(tabs)/statistics.tsx`
- `app/style-guide.tsx` residuals
- any route/component missed by Phases 4-6
- `global.css`, `tailwind.config.js`, and `src/tokens/*` compatibility cleanup
- all affected design-system rules and implementation evidence

The implementation begins with a generated residual report. It cannot delete an alias or API until exact consumer searches prove zero use.

## Cleanup Contract

Remove:

- olive/accent semantics and obsolete primary/secondary/white/black/gray compatibility families;
- obsolete primitive props and variant names;
- raw component hex values and duplicate static theme constants;
- consumer typography weights/families/sizes that bypass Text roles;
- generic registry tokens and unsupported arbitrary visual values;
- native `Modal` imports and `Alert.alert` application calls;
- unused imports, adapters, and duplicate components proven obsolete.

Retain only documented third-party/native-property exceptions backed by centralized tokens.

## Contrast and Visual Evidence

Automated contrast records use:

```ts
interface ContrastEvidence {
  foreground: string;
  background: string;
  composedColor?: string;
  ratio: number;
  minimum: 3 | 4.5;
  theme: 'light' | 'dark';
  role: string;
  passed: boolean;
}
```

Evidence covers text, icons, control borders, focus indicators, links, buttons, status surfaces, macro surfaces, charts, scrims, and opacity composition. Chart screenshots/transforms cover protanopia, deuteranopia, and grayscale with stable labels/markers.

## Android Journey Matrix

Visit every current route in light and dark. Where applicable, capture initial/loading, empty, populated, error/retry, disabled, focus, keyboard, overlay dismissal, swipe/drag, destructive confirmation, pending, and recovery. Record device/emulator, Android version, development-client identity, steps, expected/observed result, and sanitized logs.

Visual screenshots are comparable by using equivalent data/state. Runtime checks also verify no red screen, uncaught rejection, render warning, key warning, console error, or state loss.

## Automated Full Gate

Run after all fixes:

```powershell
git status --short
git diff --check
git diff --stat
git diff --name-only
npx.cmd tsc --noEmit
npm.cmd run lint
npm.cmd test
npx.cmd expo install --check
npx.cmd expo-doctor
npm.cmd audit --audit-level=moderate
npx.cmd expo export --platform web --output-dir dist-check
```

Remove `dist-check/` after evidence. Any post-gate change requires the affected narrow tests and entire gate again.

## Native and APK Decision

Phase 2 necessarily changes font/plugin/config and produces a rebuilt development client. Phase 7 verifies that artifact is current. Rebuild again if native inputs changed afterward, the artifact is absent/stale, or runtime shows incompatibility. Copy `android/app/build/outputs/apk/debug/app-debug.apk` to `fitApp-dev.apk`, compare SHA-256, install/launch, and rerun the full journey smoke.

## Blocking and Rollback

- No high/critical audit finding may be accepted.
- An unchanged moderate finding requires baseline proof, dev-only boundary analysis, and follow-up ownership.
- No failing route, contrast pair, test, export, or runtime journey is waivable.
- Alias deletion is reverted if any consumer appears; the consumer is migrated before retrying cleanup.
- Completion is forbidden with open tasks or incomplete evidence.

## Final Handoff

Report changed scope, automated commands and exit codes, tests, Android journeys, native/APK decision, accepted moderate baseline issues, evidence paths, and requirement/task coverage. The implementation is complete only when all seven SDDs and the parent Definition of Done agree.

