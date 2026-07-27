# Product

<!-- impeccable:product-schema 1 -->

## Platform

android

## Users

Heavy gym trainees who need fast, offline-first workout logging, exercise management, and diet/nutrition tracking without friction during gym sessions.

## Product Purpose

FitApp allows committed gym trainees to log workouts, sets, reps, and nutrition metrics with maximum speed and complete offline availability. Success means the tool disappears into the task so users can record metrics effortlessly.

## Positioning

Offline-first, high data density workout and nutrition manager built around speed, autonomy, and local-first ground truth persistence (WatermelonDB).

## Operating Context

Gym environment during workouts (quick single-hand set/rep logging) and daily nutrition tracking.

## Capabilities and Constraints

- Offline-first persistence using WatermelonDB as Ground Truth.
- React Native (Expo), Expo Router, NativeWind v4, Zustand.
- Single-column form structures with minimum 44px touch targets.
- Grouped list box pattern for history, workout, and nutrition tracking.

## Brand Commitments

- Name: FitApp
- Core Directives: Speed over Splop, Data Density with Dignity, Uncompromising Autonomy.
- Visual System: Mineral Warm palette (strict blue-first rule).
- Typography: Canonical sans font scale.

## Evidence on Hand

- Project guidelines and agent directives in `AGENTS.md` and `.agents/rules/`.
- Domain design primitives in `src/components/ui/`.

## Product Principles

1. Speed over Splop: Interface disappears into the task; no decorative motion or unnecessary steps.
2. Data Density with Dignity: Scanable, rich data layouts without clutter or visual noise.
3. Uncompromising Autonomy: 100% offline-first reliability; local data ground truth.

## Accessibility & Inclusion

- Minimum 44px touch targets (`min-h-touch-target`).
- Explicit `accessibilityRole` and `accessibilityLabel` on interactive components.
- High-contrast text adhering to semantic color tokens.
