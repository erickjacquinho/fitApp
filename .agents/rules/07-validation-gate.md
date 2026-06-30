# 07. Validation Gate

This rule is a mandatory guard rail for every implementation. Missing validation tooling is not a passing result.

## 1. Pre-Commit Validation
Before finishing ANY task, run these commands if relevant. Do NOT add `--force`, weaken compiler settings, or skip tests.
```bash
npx tsc --noEmit
npx expo-doctor
npm audit --audit-level=moderate
npm run lint
npm test
```
**Dependencies**: All dependency declarations must use EXACT versions. `^`, `~`, or wildcards are strictly forbidden.

## 2. Runtime Android Validation
Every behavior-changing implementation requires a real Android runtime smoke test using the development client or generated APK. Mock-only or static-analysis-only validation cannot replace this.

## 3. Development APK Rebuild
Rebuild the Android dev client automatically (`fitApp-dev.apk`) when touching native dependencies, `android/`, Expo plugins, or dev-client compatibility. 
1. Replace the root `fitApp-dev.apk` with the generated `android/app/build/outputs/apk/debug/app-debug.apk`.
2. Verify SHA-256 hashes match.

## 4. WatermelonDB Validation
Schema, model, or migration changes require testing:
- Fresh database installation.
- Upgrade from previous schema version.
- Existing data preservation.
- Offline writes and transaction success/rollback.
