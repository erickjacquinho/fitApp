# 🎨 Color System & Aesthetic Guidelines

## 1. Aesthetic Direction: "Retro-Future Cybernetic"
The FitApp design system is built on a "Retro-Future Cybernetic" aesthetic. It merges high-tech precision with nostalgic sci-fi undertones. We avoid generic, flat corporate UI trends. Instead, we use a stark foundation of warm whites and deep off-blacks, punctuated by intense, neon-like accents (Electric Blue and Neon Lime) reminiscent of early terminal displays and 80s/90s technological optimism.
- **Vibe:** Technological, precise, retro-futuristic, high-contrast, glowing accents.
- **Execution:** Sharp edges, structured grid layouts, deliberate use of negative space, and absolute strictness with neon color application to create a "glowing" effect against structural backgrounds.

---

## 2. The Palette & Semantic Mapping

### 🔵 PRIMARY: The Mainframe (Action & Identity)
**Family:** Electric Blue (`#0800FF` base). 
**Purpose:** The core conduit for user interaction. It represents system commands, active processes, and primary brand identity. It evokes the glow of high-voltage data streams.

*   `primary-main` (`#0800FF`): **The Command.** Use for primary CTA buttons, main navigation links, and critical interactive states (e.g., a selected tab). 
    *   *Law:* Maximum ONE solid `bg-primary-main` element per viewport. It must be the undisputed focal point of the interface.
*   `primary-light` (`#4D47FF`): **The Pulse.** Use strictly for hover states or to indicate a transient active/loading state.
*   `primary-dark` (`#0500B3`): **The Deep Core.** Use for pressed states (tactile feedback) or to create depth in primary-colored components.
*   `primary-soft` (`#C7C5FF`): **The Afterglow.** Use for subtle backgrounds on informational badges or list item highlights. Never use for text.

### 🟢 SECONDARY: The Override (Attention & Success)
**Family:** Neon Lime (`#C9E227` base).
**Purpose:** High-frequency alerts, positive system feedback, and critical data highlights. It mimics monochrome phosphor monitors.

*   `secondary-main` (`#C9E227`): **The Override Signal.** Use for badges, success indicators, or strategic visual accents (like a sparkline chart). 
    *   *Law:* Never use as a button background if a Primary button is on screen. It is a critical accent, not a competitor for navigation.
*   `secondary-light` (`#E4F57A`): **The Flicker.** Hover states for secondary elements or extremely subtle positive highlights.
*   `secondary-dark` (`#9DB312`): **The Readout.** Use for text or icons that must sit on a light background where `secondary-main` would fail contrast accessibility.
*   `secondary-soft` (`#F4FBD2`): **The Ambient Success.** Backgrounds for success modals or completed workout cards.

### ⚪ SURFACES: The Chassis (Structure & Space)
**Family:** Warm Whites.
**Purpose:** Represents the physical, retro-hardware casing. It creates depth without relying on heavy drop shadows, opting instead for solid, structured layering.

*   `white-base` (`#F5F4F0`): **The Hardware Base.** The default `bg` for the entire application. It reduces eye strain compared to pure white and gives the app a slightly vintage, tactile feel (like early computer casing).
*   `white-pure` (`#FFFFFF`): **The Display Layer.** Use for floating elements: Cards, Modals, Bottom Sheets, and Dropdowns. Always sits *above* `white-base` to create a stark elevation.
*   `white-soft` (`#EFEDE7`): **The Indentation.** Use for alternating list rows, input backgrounds, or depressed structural blocks.

### ⚫ TYPOGRAPHY & DEPTH: The Terminal (Communicator)
**Family:** Deep Off-Blacks.
**Purpose:** Uncompromising readability, mimicking the heavy contrast of printed manuals and deep screen blacks.

*   `black-main` (`#0F0F0F`): **Standard Output.** All primary headings and body text. 
*   `black-soft` (`#181710`): **The Console.** Use for dark mode surfaces, tooltips, or heavy footer containers. Provides a rich, immersive depth compared to flat `#000000`.
*   `black-light` (`#2A2A2A`): **Sub-routine Text.** Muted text (timestamps, subtitles) that still requires strong legibility.

### ⚙️ CHROME: The Grid (Grays)
**Family:** Neutral Grays.
**Purpose:** The structural grid lines and inactive hardware components.

*   `gray-700` (`#6B6B6B`): Tertiary text (rarely used), heavy icons.
*   `gray-500` (`#A0A0A0`): **Offline State.** Placeholders, disabled button text, inactive navigation icons.
*   `gray-400` (`#D6D6D6`): **The Circuit Lines.** Standard borders, line separators. Must be 1px (`border-width: 1`).
*   `gray-300` (`#EAEAEA`): **The Ghost Shell.** Disabled button backgrounds, skeleton loading states, default avatar backgrounds.

---

## 3. Interaction State Engine
Every interactive component MUST implement these states predictably to mimic responsive hardware:

| State | Background Application | Text/Icon Application |
| :--- | :--- | :--- |
| **Default** | `*-main` | `white-pure` (on primary/dark) or `black-main` (on light) |
| **Hover (Web)**| `*-light` | Same as Default |
| **Pressed** | `*-dark` | Same as Default |
| **Disabled** | `gray-300` | `gray-500` (Crucial for indicating hardware offline state) |
| **Focus** | `ring-2 ring-primary-main ring-offset-2 ring-offset-white-base` | N/A |

---

## 4. The 5 Laws of Retro-Future UI (Anti-Slop Guidelines)

1. **The 80/15/5 Distribution:** 
   Your viewport should be 80% negative space and hardware neutrals (Whites/Blacks/Grays), 15% Primary (system commands), and exactly 5% Secondary (neon phosphor accents). Do not over-color the interface.
2. **Absolute Contrast (Accessibility):**
   Never place `gray-500` text on a `white-soft` background. If it's meant to be read, use `black-main` or `black-light`. If it's on `primary-main`, the text MUST be `white-pure`.
3. **No Muddy Opacities:**
   Do not use `opacity-50` on black text to make gray. Use the specific `gray-*` or `black-light` token. Opacity is reserved ONLY for modal overlays (`bg-black-main/50`).
4. **Depth by Structure, Not Shadow:**
   Rely on the interplay between `white-base` (chassis) and `white-pure` (display) to create depth. Avoid generic, heavy drop-shadows. If a shadow is needed for a floating element, it should feel sharp and intentional, almost like a hard light source.
5. **Semantic Integrity:**
   Color meaning is strictly locked to system functions. Blue (`primary`) is System Action/Command. Lime (`secondary`) is Override/Success. Never use Blue to mean "Success" or Lime to mean "Click here to Submit".