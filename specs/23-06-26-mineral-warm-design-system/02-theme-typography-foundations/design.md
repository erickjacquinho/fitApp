# Design: Theme and Typography Foundations

## Technical Context

This phase changes configuration, theme runtime, font assets, and native integration. It is blocked by Phase 1 and triggers a development-client rebuild.

## Layer Mapping

```text
Primitive token types and values
  -> semantic light/dark maps
    -> useThemeColors hook and NativeWind utilities
      -> root theme/font integration
        -> compatibility boundary for unmigrated components
```

No service or domain-data layer changes are permitted.

## Target Structure

- `global.css`: primitive CSS variables and semantic light/dark aliases.
- `tailwind.config.js`: utility exposure only; no competing color source.
- `src/tokens/colors.ts`: strict primitive/native values for non-className boundaries.
- `src/tokens/theme.ts`: typed light/dark semantic maps and exported theme types.
- `src/hooks/use-theme-colors.ts`: system-scheme resolution and stable semantic map selection.
- `assets/fonts/`: four approved OTF files.
- `app.json`: automatic interface style and `expo-font` plugin configuration.
- `app/_layout.tsx`: startup/font readiness, themed root/status behavior, bounded failure path.

## Color Contract

Primitive families exactly mirror the normative values. Semantic keys include:

```ts
type ThemeName = 'light' | 'dark';

interface ThemeColors {
  background: string;
  surface: string;
  surfaceElevated: string;
  surfaceDisabled: string;
  borderSubtle: string;
  borderStrong: string;
  borderControl: string;
  borderFocus: string;
  textPrimary: string;
  textSecondarySurface: string;
  textSecondaryBackground: string;
  textDisabled: string;
  textInverse: string;
  primary: string;
  protein: string;
  carbohydrate: string;
  fat: string;
  info: string;
  warning: string;
  success: string;
  error: string;
  link: string;
  linkVisited: string;
  scrim: string;
  chartSeries: readonly [string, string, string, string, string, string];
}
```

CSS aliases and TypeScript maps must have parity tests. Components never select theme hex values directly.

## Theme Resolution

- Configure `userInterfaceStyle: "automatic"`.
- Use system preference only; no persisted preference or store.
- NativeWind semantic utilities resolve through root variables for the active scheme.
- `useThemeColors()` returns a stable map for navigation options, ActivityIndicator, RefreshControl, SVG, and charts.
- System changes update values without resetting route or feature state.

## Font Contract

Copy and rename deterministically:

| Source | Project asset | Semantic use |
|---|---|---|
| `HelveticaNowDisplay-Bold.otf` | `assets/fonts/helvetica-now-display-bold.otf` | display/title |
| `HelveticaNowText-Regular.otf` | `assets/fonts/helvetica-now-text-regular.otf` | body/description/caption |
| `HelveticaNowText-Medium.otf` | `assets/fonts/helvetica-now-text-medium.otf` | subtitle/label/highlight/button |
| `HelveticaNowText-Bold.otf` | `assets/fonts/helvetica-now-text-bold.otf` | strong emphasis |

Install `expo-font@14.0.12` exactly and configure native embedding. Typography utilities use explicit family names, not a custom-family plus numeric weight combination. The root must not render the routed app before font readiness, and it must surface a bounded recoverable failure instead of holding splash indefinitely.

## Typography Mapping

| Role | Size/line | Family |
|---|---|---|
| display | 32/37 | Display Bold |
| title | 24/29 | Display Bold |
| subtitle | 18/23 | Text Medium |
| body | 16/24 | Text Regular |
| description | 14/20 | Text Regular |
| label | 14/18 | Text Medium |
| caption | 12/16 | Text Regular |

No automatic uppercase is built into the label role. Uppercase is explicit content presentation and must remain rare.

## Compatibility and Rollback

- Legacy aliases remain temporarily mapped and marked deprecated only for unmigrated consumers.
- A static scan prevents new legacy usage after Phase 2.
- If font embedding fails, roll back the plugin/assets/config as one unit; never ship silent system fallback as completed work.
- If system-theme handling causes state loss, stop and fix root propagation before Phase 3.

## Verification

- Unit-test theme-map shape, CSS/native parity, system switching, and typography mappings.
- Calculate contrast for all normative combinations.
- Compile/export and validate Android Text/TextInput font-family behavior.
- Rebuild the debug development client, copy to `fitApp-dev.apk`, compare SHA-256, install/launch, and record identity.

