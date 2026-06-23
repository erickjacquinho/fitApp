# Mineral Warm Design System

**Version:** Phase 1 — Governance and Baseline (2026-06-23)
**Normative source:** `paleta-mineral-quente.md` (Codex 2026-06-23)
**Status:** Canonical. All design-system rules and later implementation phases must comply with this document.

This document is the single English source of truth for all visual rules in FitApp. Focused rule files in `.agents/rules/` link here rather than duplicate tables.

---

## 1. Chromatic Scales (Primitive)

Scale semantics: `500` is the base. `50–200` are light variations for backgrounds, soft states, borders, and focus. `600–900` are dark variations for hover, pressed, text, and icons.

### Primary Families

| Scale | Blue / protein | Amber / carbohydrate | Orange / fat | Moss / success | Tomato / error |
|---|---|---|---|---|---|
| `50` | `#E4E1F7` | `#F8F0DD` | `#F5EADF` | `#EBECE5` | `#F6E8E2` |
| `100` | `#C6C3F8` | `#F3E3C0` | `#EDD7C4` | `#D7DBD1` | `#F0D3CB` |
| `200` | `#9A96FA` | `#ECD194` | `#E1BA9C` | `#B9C1B2` | `#E6B2A8` |
| `500` | `#0800FF` | `#D49300` | `#B85A14` | `#556B4D` | `#C44732` |
| `600` | `#0C04DC` | `#BA8104` | `#A25115` | `#4E5F45` | `#AC412E` |
| `700` | `#1008BA` | `#9F6F07` | `#8C4715` | `#46533D` | `#943A2A` |
| `900` | `#160E8C` | `#7C580C` | `#6E3B16` | `#3D4433` | `#743225` |

### Auxiliary Families

Mustard is exclusively for warning. Teal and Plum extend charts; Plum also identifies visited links. These families do not substitute the primary families.

| Scale | Mustard / warning | Teal / data | Plum / data + visited link |
|---|---|---|---|
| `50` | `#F1ECDD` | `#E8ECE8` | `#EFE9E9` |
| `100` | `#E3DAC0` | `#CFDBD7` | `#DFD5D8` |
| `200` | `#CEC094` | `#AAC2BE` | `#C6B6C0` |
| `500` | `#8A6A00` | `#2F6F6A` | `#76506F` |
| `600` | `#7B5E04` | `#2D635E` | `#6A4862` |
| `700` | `#6B5307` | `#2C5651` | `#5D4055` |
| `900` | `#57430C` | `#2A4641` | `#4D3644` |

### Neutral Scale

Background, surface, border, and text belong to the same neutral family.

| Token | Hex | Recommended use |
|---|---|---|
| `neutral-0` | `#FFFFFF` | Elevated surface and modal |
| `neutral-50` | `#FCFAF6` | Cards and default surfaces |
| `neutral-100` | `#F3EFE7` | App background |
| `neutral-200` | `#DED8CF` | Divider and subtle card border |
| `neutral-300` | `#C5BAAE` | Prominent card border |
| `neutral-400` | `#A3988F` | Disabled state |
| `neutral-500` | `#7A7069` | Secondary text on `neutral-50`; control border |
| `neutral-600` | `#625851` | Secondary text on `neutral-100`; strong stroke |
| `neutral-700` | `#4B413B` | Icons and medium-emphasis text |
| `neutral-800` | `#352B26` | Headings and dark secondary button |
| `neutral-900` | `#241C18` | Primary text |
| `neutral-950` | `#18110E` | Maximum contrast |

---

## 2. Semantic Tokens

All aliases use the format `color.category.variant`. The name directly describes the visual function or the data represented.

### Blue-First Rule

- Every generic highlighted element uses blue as the first choice.
- Primary CTA, selection, active item, focus, link, progress indicator, and emphasized data use the blue family.
- Another family replaces blue only when the element has an explicit meaning: macronutrient, success, warning, error, or data series.
- Decorative color never replaces blue in a functional highlight.
- To avoid visual excess, limit to one dominant blue highlight per region; other elements use blue in stroke, text, or `50` background.

### Function Colors

| Token | Value |
|---|---|
| `color.primary` | `blue-500` |
| `color.protein` | `blue-500` |
| `color.carbohydrate` | `amber-500` |
| `color.fat` | `orange-500` |
| `color.info` | `blue-500` |
| `color.warning` | `mustard-500` |
| `color.success` | `moss-500` |
| `color.error` | `tomato-500` |
| `color.link` | `blue-700` |
| `color.link.visited` | `plum-700` |
| `color.data.4` | `teal-500` |
| `color.data.5` | `plum-500` |

### Structure Tokens

| Token | Value |
|---|---|
| `color.background` | `neutral-100` |
| `color.surface` | `neutral-50` |
| `color.surface.elevated` | `neutral-0` |
| `color.border.subtle` | `neutral-200` |
| `color.border.strong` | `neutral-300` |
| `color.border.control` | `neutral-500` |
| `color.border.control.hover` | `neutral-600` |
| `color.border.focus` | `blue-500` |
| `color.text.primary` | `neutral-900` |
| `color.text.secondary.surface` | `neutral-500` |
| `color.text.secondary.background` | `neutral-600` |
| `color.text.disabled` | `neutral-400` |

---

## 3. Light and Dark Themes

Components use the same semantic tokens in both themes; only the values change.

| Semantic token | Light theme | Dark theme |
|---|---|---|
| `color.background` | `#F3EFE7` | `#15110F` |
| `color.surface` | `#FCFAF6` | `#211A17` |
| `color.surface.elevated` | `#FFFFFF` | `#2B221E` |
| `color.border.subtle` | `#DED8CF` | `#443832` |
| `color.border.strong` | `#C5BAAE` | `#5A4C45` |
| `color.border.control` | `#7A7069` | `#766860` |
| `color.text.primary` | `#241C18` | `#F8F3EB` |
| `color.text.secondary` | `#625851` | `#C9BFB5` |
| `color.text.disabled` | `#A3988F` | `#82776F` |
| `color.focus` | `blue-500` | `blue-200` |
| `color.link` | `blue-700` | `blue-200` |
| `color.link.visited` | `plum-700` | `plum-200` |
| `color.scrim` | `neutral-950` at `56%` | `#000000` at `68%` |

### Dark Theme Semantic Surfaces

| Function | Background | Border | Text / icon |
|---|---|---|---|
| Info / protein | `#211F3B` | `blue-500` | `blue-200` |
| Carbohydrate | `#2C2415` | `amber-500` | `amber-200` |
| Fat | `#2A1D15` | `orange-500` | `orange-200` |
| Warning | `#292413` | `mustard-500` | `mustard-200` |
| Success | `#1D251B` | `moss-500` | `moss-200` |
| Error | `#2C1B18` | `tomato-500` | `tomato-200` |
| Teal data | `#162725` | `teal-500` | `teal-200` |
| Plum data | `#281B24` | `plum-500` | `plum-200` |

**Theme rules:**
- Do not invert scales automatically.
- In dark theme, generic highlights use `blue-200`; text on them uses `neutral-950`.
- Hover and pressed in dark theme move to lighter tones: `200 → 100 → 50`.
- Dark semantic buttons use family `200` background with `neutral-950` text.
- Images, charts, and transparent colors must be validated separately in each theme.
- Theme follows system preference only after both themes are implemented and tested.

---

## 4. Typography

### Hierarchy and Scale

| Element | Color | Weight | Size | Line height |
|---|---|---|---|---|
| Page title | `neutral-900` | `700` | `32–40px` | `115%` |
| Section title | `neutral-900` | `700` | `24–28px` | `120%` |
| Card title | `neutral-900` | `600` | `16–18px` | `130%` |
| Subtitle | `neutral-700` | `600` | `14–16px` | `140%` |
| Body | `neutral-700` | `400` | `16px` | `150%` |
| Card description | `neutral-500` | `400` | `14px` | `145%` |
| App background description | `neutral-600` | `400` | `14px` | `145%` |
| Label and metadata | `neutral-700` | `600` | `12–14px` | `130%` |
| Button text | Per button | `600` | `14–16px` | `100%` |
| Negative text | `neutral-0` | `400–700` | Per function | `130–150%` |

**Typography rules:**
- Use only weights `400`, `600`, and `700`.
- Do not use weight to compensate for insufficient contrast.
- Titles use `neutral-900`; blue in titles is reserved for links or selected states.
- Descriptions never use `neutral-400` except for disabled content.
- Negative text uses full white over blue, orange, moss, tomato, and chocolate.
- Do not use white text over amber; use `neutral-900`.
- Font family: Helvetica Now (files copied in Phase 2), fallback Helvetica → Arial → sans-serif.

---

## 5. Surfaces, Cards, and Backgrounds

### Backgrounds and Surfaces

| Context | Background | Rule |
|---|---|---|
| App | `neutral-100` | Global background |
| Standard card | `neutral-50` | Primary surface |
| Modal, dropdown, popup | `neutral-0` | Elevated surface |
| Grouped area | `neutral-50` | Use border to separate from parent card |
| Selected area | `blue-50` | Always pair with `blue-500` border |
| Disabled area | `neutral-100` | Reduce content contrast |

- Do not stack surfaces of the same color without border, spacing, or elevation.
- Shadows do not replace borders in interactive controls.
- Colored cards use only `50` tones as background.
- `500–900` tones as background are restricted to CTA, strong status, and blocks with negative text.

### Card Types

| Type | Background | Border | Content |
|---|---|---|---|
| Standard | `neutral-50` | `1px neutral-200` | `neutral-900` |
| Elevated / modal | `neutral-0` | `1px neutral-200` | `neutral-900` |
| Highlighted | `neutral-50` | `1px neutral-300` | `neutral-900` |
| Selected | `blue-50` | `2px blue-500` | `neutral-900` |
| Protein | `blue-50` | `blue-200` | `blue-900` |
| Carbohydrate | `amber-50` | `amber-200` | `amber-900` |
| Fat | `orange-50` | `orange-200` | `orange-900` |
| Success | `moss-50` | `moss-200` | `moss-900` |
| Error | `tomato-50` | `tomato-200` | `tomato-900` |

**Card rules:**
- Standard card: `neutral-50` background, `1px neutral-200` border.
- Elevated card: `neutral-0` background, `1px neutral-200` border, and discrete shadow.
- Highlighted card: `neutral-50` background, `1px neutral-300` border.
- Selected card: `blue-50` background, `2px blue-500` border.
- Macro card: family `50` background, `200` border, `900` title/icon, `500` primary data.
- Recommended radius: `12–16px`; use the same radius in equivalent cards.
- Clickable card hover: border rises from `neutral-200` to `neutral-300`.
- Non-clickable cards do not receive a hover effect.

---

## 6. Borders and Dividers

### Borders

| Purpose | Color | Thickness |
|---|---|---|
| Card and grouping | `neutral-200` | `1px` |
| Highlighted card | `neutral-300` | `1px` |
| Input and control | `neutral-500` | `1px` |
| Control hover | `neutral-600` | `1px` |
| Selection | `blue-500` | `2px` |
| Focus | `blue-500` + halo `blue-100` | `2px + 3px` |
| Error | `tomato-500` | `1–2px` |
| Disabled | `neutral-300` | `1px` |

**Border rules:**
- Decorative borders may have low contrast; borders required to recognize controls must maintain minimum contrast of `3:1`.
- Do not apply additional opacity to border tokens.
- Do not use macro-nutrient borders on components unrelated to nutrition.

### Dividers

- Standard divider: `1px neutral-200`.
- Strong divider between sections: `1px neutral-300`.
- Divider inside a light colored surface: use the `200` tone of the same family.
- Dividers never use `neutral-500` or base `500` colors; they must remain visually secondary.
- Prefer spacing over a divider when the separation is already clear.

---

## 7. Buttons

| Height | Radius | Label weight |
|---|---|---|
| min `44px` | `10–12px` | `600` |

### Filled Buttons

| Variant | Default | Hover | Pressed | Text |
|---|---|---|---|---|
| Primary | `blue-500` | `blue-600` | `blue-700` | `#FFFFFF` |
| Secondary | `neutral-900` | `neutral-800` | `neutral-950` | `#FFFFFF` |
| Destructive | `tomato-500` | `tomato-600` | `tomato-700` | `#FFFFFF` |
| Success | `moss-500` | `moss-600` | `moss-700` | `#FFFFFF` |
| Carbohydrate contextual | `amber-500` | `amber-600` | `amber-700` | `neutral-900` |
| Fat contextual | `orange-500` | `orange-600` | `orange-700` | `#FFFFFF` |

### Stroke-only Buttons

| Variant | Text | Stroke | Hover | Pressed |
|---|---|---|---|---|
| Neutral | `neutral-900` | `neutral-500` | `neutral-100` | `neutral-200` |
| Primary | `blue-700` | `blue-500` | `blue-50` | `blue-100` |
| Destructive | `tomato-700` | `tomato-500` | `tomato-50` | `tomato-100` |
| Success | `moss-700` | `moss-500` | `moss-50` | `moss-100` |
| Carbohydrate | `amber-900` | `amber-700` | `amber-50` | `amber-100` |
| Fat | `orange-700` | `orange-500` | `orange-50` | `orange-100` |

Disabled state: text `neutral-400`, stroke `neutral-300`, transparent background.

**Button rules:**
- Only one filled primary action per visual region.
- Amber and orange may only color buttons directly related to carbohydrate or fat.
- General CTA remains blue.

---

## 8. Controls and Inputs

| State | Background | Border | Text / icon |
|---|---|---|---|
| Default | `neutral-50` | `neutral-500` | `neutral-900` |
| Hover | `neutral-50` | `neutral-600` | `neutral-900` |
| Focus | `neutral-50` | `blue-500` | `neutral-900` |
| Error | `tomato-50` | `tomato-500` | `tomato-900` |
| Disabled | `neutral-100` | `neutral-300` | `neutral-400` |

On focus: use `2px blue-500` stroke and `3px blue-100` external halo.

---

## 9. Macronutrients and Charts

### Macro Colors

| Macro | Primary data | Soft background | Border | Text / icon |
|---|---|---|---|---|
| Protein | `blue-500` | `blue-50` | `blue-200` | `blue-900` |
| Carbohydrate | `amber-500` | `amber-50` | `amber-200` | `amber-900` |
| Fat | `orange-500` | `orange-50` | `orange-200` | `orange-900` |

In charts, pair color with label, icon, or pattern. Do not rely only on the difference between amber and orange.

### Multi-Series Charts

| Series | Light theme | Dark theme |
|---|---|---|
| `1` | `blue-500` | `blue-200` |
| `2` | `orange-500` | `orange-200` |
| `3` | `amber-700` | `amber-200` |
| `4` | `teal-500` | `teal-200` |
| `5` | `plum-500` | `plum-200` |
| `6` | `neutral-600` | `neutral-300` |

**Chart rules:**
- Macro-specific charts preserve protein blue, carbohydrate amber, fat orange.
- Do not use moss, tomato, or mustard in neutral series; these colors remain reserved for status.
- Lines and outlines need minimum contrast `3:1`; carbohydrate uses `amber-700` in light theme.
- Filled areas use the series color at `18%`, keeping solid line.
- Gridlines: `neutral-200` in light, `#443832` in dark.
- Axes and labels: `neutral-600` in light, `#C9BFB5` in dark.
- Above six series, use patterns, markers, direct labels, or separate the chart.
- Tooltips use elevated surface, strong border, and primary theme text.

---

## 10. Feedback: Error, Warning, Info

### Recoverable Error

| Element | Value |
|---|---|
| Background | `tomato-50` |
| Border | `1px tomato-200` |
| Icon | `tomato-700` |
| Title | `tomato-900`, weight `600` |
| Description | `neutral-700`, weight `400` |
| Action | Stroke button `tomato-500`, text `tomato-700` |

### Critical Error

| Element | Value |
|---|---|
| Background | `tomato-500` |
| Title and description | `neutral-0` |
| Title weight | `700` |
| Description weight | `400` |
| Primary action | White background, text `tomato-700` |
| Secondary action | White stroke, white text |

Always include icon and text message. Never communicate error by color alone.

### Info and Warning

| Function | Light background | Border | Icon | Title | Description |
|---|---|---|---|---|---|
| Info | `blue-50` | `blue-200` | `blue-700` | `blue-900` | `neutral-700` |
| Warning | `mustard-50` | `mustard-200` | `mustard-700` | `mustard-900` | `neutral-700` |

- Info reuses blue because it is the system's default highlight.
- Warning uses dark mustard and never amber, avoiding conflict with carbohydrate.
- Both require icon and text title; color does not communicate state alone.
- Warning indicates recoverable risk. Error indicates a failure that has already occurred.

---

## 11. Links

| State | Light theme | Dark theme |
|---|---|---|
| Default | `blue-700` | `blue-200` |
| Hover | `blue-900` | `blue-100` |
| Pressed | `blue-900` | `blue-50` |
| Visited | `plum-700` | `plum-200` |
| Disabled | `neutral-400` | `#82776F` |

**Link rules:**
- Links inside text are always underlined.
- Hover does not depend only on color change; increase underline thickness.
- Navigation links may omit underline when position and active state are evident.
- Active navigation link follows the blue-first rule.
- Focus uses the same indicator defined for controls.

---

## 12. Badges and Status

| Type | Background | Border | Text / icon |
|---|---|---|---|
| Neutral / inactive | `neutral-100` | `neutral-200` | `neutral-700` |
| Info / active | `blue-50` | `blue-200` | `blue-900` |
| Warning / pending | `mustard-50` | `mustard-200` | `mustard-900` |
| Success / completed | `moss-50` | `moss-200` | `moss-900` |
| Error / blocked | `tomato-50` | `tomato-200` | `tomato-900` |
| Protein | `blue-50` | `blue-200` | `blue-900` |
| Carbohydrate | `amber-50` | `amber-200` | `amber-900` |
| Fat | `orange-50` | `orange-200` | `orange-900` |

**Badge rules:**
- Generic highlighted badge uses blue.
- Status badge requires explicit text; do not use colored dot alone.
- Filled badges use `500` tone with white text; amber uses `neutral-900`.
- Use strong fill only for urgency or current selection.
- In dark theme, use the backgrounds and texts defined in the semantic surface table.

---

## 13. Loading, Progress, and Skeleton

| Element | Light theme | Dark theme |
|---|---|---|
| Active spinner | `blue-500` | `blue-200` |
| Spinner track | `neutral-200` | `#443832` |
| Progress bar | `blue-500` | `blue-200` |
| Progress track | `neutral-200` | `#443832` |
| Skeleton base | `neutral-200` | `#3A302B` |
| Skeleton highlight | `neutral-50` | `#514640` |

**Loading rules:**
- Generic loading follows the blue-first rule.
- Macro nutrient progress uses the respective family color.
- Skeleton uses gradient between base and highlight, without changing the container opacity.
- With `prefers-reduced-motion`, remove shimmer and keep skeleton static.
- Never represent success by turning the bar green alone; include message or icon.

---

## 14. Colors Over Images

- Text over image requires scrim or solid area; never rely only on perceived luminance.
- Negative text uses `neutral-0` over `neutral-950` scrim between `56–72%`.
- Dark text uses `neutral-950` over white scrim between `78–90%`.
- The scrim gradient must reach its highest opacity behind the text.
- Titles and descriptions remain subject to `4.5:1`; large text, `3:1`.
- CTA over image uses solid blue button. Stroke-only button is not allowed over a variable image.
- Badges over image use solid background, not translucent.
- Test the lightest, darkest, and most detailed image expected for the component.

---

## 15. Contrast Rules

| Element | Minimum contrast |
|---|---|
| Regular text below `24px` | `4.5:1` |
| Large text from `24px`, or `18.66px` at weight `700` | `3:1` |
| Functional icon | `3:1` |
| Border required to recognize control | `3:1` |
| Focus indicator | `3:1` against adjacent colors |
| Disabled text | No minimum, but must remain legible |

### Approved Text Combinations

| Text | Background | Contrast |
|---|---|---|
| `neutral-0` | `blue-500` | `8.56:1` |
| `neutral-900` | `amber-500` | `6.36:1` |
| `neutral-0` | `orange-500` | `4.66:1` |
| `neutral-0` | `moss-500` | `5.84:1` |
| `neutral-0` | `tomato-500` | `4.89:1` |
| `neutral-0` | `mustard-500` | `5.07:1` |
| `neutral-0` | `teal-500` | `5.83:1` |
| `neutral-0` | `plum-500` | `6.67:1` |
| `mustard-900` | `mustard-50` | `8.03:1` |
| `teal-900` | `teal-50` | `8.58:1` |
| `plum-700` | `neutral-50` | `8.65:1` |
| `neutral-900` | `neutral-50` | `16.06:1` |
| `neutral-500` | `neutral-50` | `4.63:1` |
| `neutral-600` | `neutral-100` | `6.04:1` |
| `#F8F3EB` | `#15110F` | `16.99:1` |
| `#C9BFB5` | `#15110F` | `10.37:1` |
| `neutral-950` | `blue-200` | `7.21:1` |
| `plum-200` | `#15110F` | `9.70:1` |

### Prohibited Text Combinations

- `neutral-0` over `amber-500`: `2.63:1`.
- `neutral-500` over `neutral-100`: `4.21:1`.
- `amber-700` over `neutral-50`: `4.24:1`; use `amber-900`.
- `50–200` tones as text over light surfaces.

---

## 16. Opacity

| Use | Permitted value |
|---|---|
| Scrim behind modal | `neutral-950` at `56%` |
| Card shadow | `neutral-900` between `6–10%` |
| Modal shadow | `neutral-950` between `12–18%` |
| Decorative element | Family color between `8–12%` |
| Chart area fill | Series color at `18%` |
| Dark scrim over image | `56–72%` |
| Light scrim over image | `78–90%` |
| Focus halo | `blue-100` at `100%` |

**Opacity rules:**
- Text, functional icons, borders, and dividers use solid colors; do not reduce opacity.
- Disabled states use the neutral scale, not `opacity` on the whole component.
- Hover and pressed use `600` and `700` tones, not black or white overlay.
- Opacity must never be used to correct a color outside the palette.
- Contrast must be calculated after compositing transparency over the real background.
- Do not accumulate transparency in nested elements.

---

## 17. Contrast Test Requirements

Every new or changed component must validate:

1. Regular text with minimum `4.5:1`.
2. Large text, functional icons, control borders, and focus with minimum `3:1`.
3. Default, hover, pressed, focus, disabled, and error states.
4. Component over all permitted surfaces in light and dark themes.
5. Final result of colors with opacity, considering the real background.
6. Macronutrients with label or icon, without depending on color alone.
7. Protanopia, deuteranopia, and grayscale simulation for charts.
8. Links default, hover, pressed, visited, and focus in both themes.
9. Warning, info, badges, loading, skeleton, and popups in both themes.
10. Text and controls over the extreme luminance values expected for images.

**Approval criteria:**
- No combination below its corresponding minimum.
- No control identified by color alone.
- Focus visible on all permitted surfaces.
- Input and stroke-button border remains recognizable without shadow.
- Chart series remain identifiable without depending exclusively on color.
- No theme change alters the semantic meaning of a color.
- Test results must record foreground, background, and calculated ratio.

---

## 18. Mandatory Token Usage Rules

1. Every generic highlight uses blue first.
2. Components use semantic tokens; hex values do not enter components directly.
3. Scales `50–900` are primitives; the visual function defines which level to use.
4. Hover and pressed follow the progression defined for the active theme.
5. App background, surfaces, cards, and elevated elements must remain visually distinguishable.
6. Macro-nutrient colors are restricted to data and contextual actions.
7. Mustard, moss, and tomato are restricted to warning, success, and error.
8. Teal and plum are restricted to additional series; plum also represents visited links.
9. New colors enter the palette only when no existing family meets the function without semantic collision.

---

## 19. Popups and Error Messages

### Recoverable Error (full spec)

- Background: `tomato-50`.
- Border: `1px tomato-200`.
- Icon: `tomato-700`.
- Title: `tomato-900`, weight `600`.
- Description: `neutral-700`, weight `400`.
- Action: stroke button `tomato-500`, text `tomato-700`.

### Critical Error (full spec)

- Background: `tomato-500`.
- Title and description: `neutral-0`.
- Title: weight `700`; description: weight `400`.
- Primary action: white background with text `tomato-700`.
- Secondary action: white stroke with white text.
- Always include icon and text message; never communicate error by color alone.

---

## 20. Section Parity Checklist (T011)

Verified against `paleta-mineral-quente.md` (Codex 2026-06-23):

| Section | Source section | Status |
|---|---|---|
| Chromatic scales | "Escalas cromáticas" | ✅ Complete |
| Auxiliary families | "Escalas auxiliares" | ✅ Complete |
| Neutral scale | "Escala neutra" | ✅ Complete |
| Blue-first rule | "Regra azul primeiro" | ✅ Complete |
| Function colors | "Cores de função" | ✅ Complete |
| Structure tokens | "Estrutura" | ✅ Complete |
| Cards (semantic) | "Cards" | ✅ Complete |
| Filled buttons | "Botões preenchidos" | ✅ Complete |
| Stroke buttons | "Botões apenas com stroke" | ✅ Complete |
| Inputs and controls | "Inputs e controles" | ✅ Complete |
| Macronutrients | "Macronutrientes e gráficos" | ✅ Complete |
| Contrast rules | "Contraste e restrições" | ✅ Complete |
| Typography hierarchy | "Hierarquia de texto" | ✅ Complete |
| Backgrounds and surfaces | "Fundos e superfícies" | ✅ Complete |
| Cards (normative) | "Cards" (normative section) | ✅ Complete |
| Borders | "Bordas" | ✅ Complete |
| Dividers | "Dividers" | ✅ Complete |
| Buttons (normative) | "Botões" (normative section) | ✅ Complete |
| Popups and error messages | "Popups e mensagens de erro" | ✅ Complete |
| Theme (light / dark) | "Tema" | ✅ Complete |
| Info and warning | "Informação e warning" | ✅ Complete |
| Links | "Links" | ✅ Complete |
| Badges and status | "Badges e status" | ✅ Complete |
| Loading, progress, skeleton | "Loading, progresso e skeleton" | ✅ Complete |
| Multi-series charts | "Gráficos com múltiplas séries" | ✅ Complete |
| Colors over images | "Cores sobre imagens" | ✅ Complete |
| Contrast table | "Contraste" | ✅ Complete |
| Opacity | "Opacidade" | ✅ Complete |
| Contrast test requirements | "Testes de contraste" | ✅ Complete |
| Mandatory token usage | "Uso obrigatório dos tokens" | ✅ Complete |
