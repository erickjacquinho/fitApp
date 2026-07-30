---
target: src/features/training/components/ProgramCard.tsx
total_score: 31
max_score: 36
na_heuristics: 10
p0_count: 0
p1_count: 1
timestamp: 2026-07-27T19-50-47Z
slug: src-features-training-components-programcard-tsx
---
⚠️ DEGRADED: single-context (running in main context)

#### Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3/4 | Active state is indicated only by border color, lacking prominent visual hierarchy. |
| 2 | Match System / Real World | 4/4 | Clear terminology (Programas Ativos, Outros Planos, blocos). |
| 3 | User Control and Freedom | 4/4 | Pinning/unpinning and deletion are directly accessible. |
| 4 | Consistency and Standards | 3/4 | Inactive cards share identical vertical padding and multi-line layout with active cards. |
| 5 | Error Prevention | 4/4 | Confirmation dialogs present for destructive actions like deletion. |
| 6 | Recognition Rather Than Recall | 3/4 | Inactive plans take up as much mental working memory space as active plans. |
| 7 | Flexibility and Efficiency | 3/4 | Quick activation is available, but secondary plans clutter the primary scroll view. |
| 8 | Aesthetic and Minimalist Design | 2/4 | Excessive visual footprint for inactive plans; high vertical density without functional necessity. |
| 9 | Error Recovery | 4/4 | Delete confirmations allow cancelling. |
| 10 | Help and Documentation | n/a | Standard operational interface. |
| **Total** | | **31/36** | **Good** |

#### Design Specificity Verdict

**LLM assessment**: The Training screen provides solid functionality, but the visual distinction between the active workout program and inactive programs is weak. Inactive plans currently render with full card height, multi-line details, and prominent action buttons. Compacting inactive plans into a single-line horizontal row (or grouped list format) with reduced vertical height will dramatically lower cognitive load and elevate the active plan to clear visual dominance.

**Deterministic scan**: Automated detector scan (`detect.mjs`) returned 0 violations. Token usage and component primitives are compliant with FitApp design system rules.

**Visual overlays**: No browser overlay requested for native React Native components.

#### Overall Impression
The request to compress inactive plan cards into single-line, compact list rows is a spot-on UX improvement. Currently, every plan card claims ~80px of vertical height regardless of status. By shrinking inactive plans to a single line (~44px touch target) with combined inline text (`[Plan Name] • 3 blocos (A, B, C)`), the active plan immediately becomes the focal hero of the Training tab.

#### What's Working
1. **Clear Semantic Actions**: Quick toggling via Zap/ZapOff icons and deletion confirmation modal protect against accidental loss.
2. **Active Session Hero Integration**: When a session is running, the top hero card cleanly takes focus.

#### Priority Issues

- **[P1] Visual Parity Between Active and Inactive Plans**: Inactive plan cards use identical padding (`p-4`) and multi-line layout as active plans, causing visual bloat and diluting the active plan's dominance.
  - *Why it matters*: Users scan the Training screen to quickly start or check their current active plan. Equal visual weight forces useless re-scanning of inactive items.
  - *Fix*: Refactor `ProgramCard` to support a compact variant (`variant="compact"` or conditional compact rendering for non-pinned items) with single-line text (`font-medium text-sm text-text-secondary`, combined block summary) and `py-2.5 px-3` layout.
  - *Suggested command*: `$impeccable layout`

- **[P2] Grouped Box Container for Secondary Plans**: Inactive plans are rendered as isolated floating cards separated by full screen width rather than a unified grouped list.
  - *Why it matters*: Violates FitApp's canonical Grouped List Box Pattern (`04-ui-components.md` §3) and adds unnecessary vertical margins (`mb-3` per item).
  - *Fix*: Wrap "Outros Planos" in a single grouped surface container with subtle inner dividers (`border-b border-border-subtle`).
  - *Suggested command*: `$impeccable layout`

#### Persona Red Flags

- **Alex (Power User)**: Scanning the screen to initiate today's workout requires navigating past tall inactive plan cards. Compacting inactive plans will let Alex get to the active workout instantly.
- **Casey (Distracted Mobile User)**: On a smaller screen, 3 inactive plans push the quick action buttons and screen content below the fold. Compact single-line rows save ~100px+ of vertical space.

#### Minor Observations
- Active plan cards could feature a subtle elevated background (`bg-surface` with `border-primary`) or a distinct active indicator badge to reinforce their primary status.

#### Questions to Consider
- Should inactive plans support a 1-tap activate button directly on the compact row, or should tapping anywhere on the compact row open the plan details?
- Should inactive plans be grouped inside a single collapsible section if the user accumulates 5+ plans?
