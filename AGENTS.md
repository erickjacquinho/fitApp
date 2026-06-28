# FitApp Agent Instructions

## Language
- Reply to the user in Brazilian Portuguese.
- Write code comments, documentation, commit messages, branch names, and technical artifacts in English.
- 100% of the files written (code, docs, specs, etc.) must be in English.

## Project Stack
- React Native with Expo Managed Workflow.
- Expo Router for navigation.
- NativeWind v4 with Tailwind CSS v3.
- Zustand for global state.
- WatermelonDB for offline-first persistence.
- Atomic Design for shared UI components.
- IMPORTANT: Use exact versions for dependencies. No `^` or `~` in `package.json`.
- IMPORTANT: Never change or update stack versions unless explicitly requested.

## Project Structure
- App routes live in `app/`.
- Shared UI lives in `src/components/`.
- Feature code lives in `src/features/`.
- Database code lives in `src/db/`.
- Product and architecture docs live in `docs/`.
- Implementation artifacts live in `implementation/<feature-name>/`.
- Long-term project knowledge lives in `knowledge/`.

## Working Rules
- Read relevant docs before implementing: `docs/`, `.agents/rules/`, and `.agents/workflows/`.
- **Task Comprehension Rule:** Antes de fazer QUALQUER task, entenda exatamente o que deve ser feito na tarefa e siga arrisca TUDO o que foi pedido. Para entender o que está na tarefa, leia todos os arquivos que precisar, entenda tudo de ponta a ponta pesquisando no projeto e sempre siga as rules do projeto em `/.agents/rules/` e onde mais precisar para ter referências do que foi pedido.
- **Universal Validation Rule:** Every future implementation MUST follow `.agents/rules/full-validation-gate.md`. Its per-task validation, regression policy, Android runtime proof, and final Full Gate are blocking completion requirements.
- **Component Source Rule:** `@react-native-reusables` (Shadcn UI for React Native) is the primary source for components. Before creating any custom component, ALWAYS analyze if there is an existing component in this library that fulfills the requirement. Use `npx @react-native-reusables/cli@latest add <component>` to add it.
- **Component Styling Rule:** Whenever a new component is added (especially via `@react-native-reusables` CLI) or modified, you MUST review its Tailwind classes. Ensure all generic colors and sizes (`bg-primary`, `bg-destructive`, `bg-background`, etc.) are explicitly replaced with our exact semantic tokens from `tailwind.config.js` (e.g., `bg-primary-main`, `bg-tomato-main`, `bg-surface-app`, `h-control-md`).
- Before creating a new UI component, check existing components in `src/components/` and feature folders.
- Prefer extending existing atoms/molecules over creating duplicates.
- Keep changes focused. Do not refactor unrelated code.
- Use strict TypeScript. Do not use `any`.
- Use `PascalCase` for components, types, and interfaces.
- Use `camelCase` for functions and variables.
- Use `kebab-case` for files and directories.
- Use design tokens from `tailwind.config.js` and `global.css`; avoid hardcoded visual values when a token exists.
- **Skill Usage Rule:** In 100% of tasks, you must use the best possible skill for the respective task.
- **Continuous Validation Loop Rule:** At the end of all tasks, execute a validation process of the completed task to ensure it cannot be improved. If it can, enter a loop until it is fully implemented in the cleanest, most modular, and most reliable way possible.
- **Screen Primitive Rule:** Whenever creating or modifying a full-screen page or route, you MUST use the `Screen` component (`src/components/ui/screen.tsx`) as the root wrapper at the **route level** (in `app/`). **Never** render `<Screen>` or `<Header>` inside feature components (`src/features/`). Pass headers via the `header` prop. Do not duplicate screen titles as Text inside the page content. Use `scrollable={false}` when using `FlatList`.

## Component Creation and Modification Flow
Follow this sequence for every new or modified UI component:
1. Open `.agents/rules/designsystem-guide.md`, `.agents/rules/component-workflow.md`, and only the focused rule files relevant to the task.
2. Search `src/components/` and the target feature for an existing component or composition before adding anything.
3. Check the current React Native Reusables registry for behavioral equivalence, including interaction, state, accessibility, and platform behavior. Visual similarity alone is insufficient.
4. Prefer an existing local component from `src/components/ui/`. If the equivalent is not local, add it with `npx @react-native-reusables/cli@latest add <component>`.
5. Review every generated file and dependency change. Preserve exact dependency versions and never overwrite an already customized local primitive without reviewing its diff.
6. Replace all generic registry classes with FitApp semantic tokens from `tailwind.config.js`. Remove hardcoded colors, arbitrary static sizes, unsupported radii, and default shadows.
7. Choose one integration form: direct primitive use; a thin shared adapter that preserves a stable app contract; a domain composition; or a documented custom component when no behavioral equivalent exists.
8. Migrate all consumers, remove obsolete duplicate components and imports, and keep feature-specific behavior inside its feature.
9. Validate TypeScript, dependency compatibility, Expo diagnostics, dependency audit, web export, accessibility requirements, and native-client impact according to the Validation section.

## Rule Lookup
- Use `.agents/rules/designsystem-guide.md` as the design system index.
- Use `.agents/rules/component-workflow.md` for registry adoption, adapter, and custom-component decisions.
- When a task touches UI, styling, layout, accessibility, icons, content, components, forms, feedback, navigation, or data display, open only the focused rule file that matches the task.
- Prefer focused rule files over broad docs when there is overlap.
- Do not load every rule file by default; read only what is needed for the current change.
- If rules conflict, follow the most specific `.agents/rules/*.md` file first, then `designsystem-guide.md`, then broader docs in `docs/`.

## SDD SKILL
- Execute tudo exatamente como a skill `sdd` descreve. 

## Validation
- Follow `.agents/rules/full-validation-gate.md` for every implementation. Task-specific validation may add checks but MUST NOT weaken or replace the Full Gate.
- Validate changes before finishing.
- **Development APK Rule:** Automatically rebuild the Android development client whenever changes affect native dependencies, Expo plugins or configuration, `android/`, native build settings, or dev-client compatibility. Do not wait for the user to request it. Replace the root `fitApp-dev.apk` with the generated `android/app/build/outputs/apk/debug/app-debug.apk` and verify that both SHA-256 hashes match. JavaScript/TypeScript-only changes do not require a new APK unless runtime validation proves the installed client is incompatible.
- Prefer these checks when relevant:
  - `npx tsc --noEmit`
  - `npx expo install --check`
  - `npx expo-doctor`
  - `npm audit --audit-level=moderate`
  - `npx expo export --platform web --output-dir dist-check`
- Remove temporary validation output such as `dist-check/` after use.

## Git
- Use feature branches for new work.
- Do not merge to `main` until the implementation is complete and validated.
- Do not revert user changes unless explicitly requested.
