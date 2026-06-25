# Technical Design - Dropdown Animation and Dismissal

## 1. Directory Structure Changes
The following files are affected:
- `src/components/ui/dropdown-menu.tsx` (Modified - Update animation, positioning layout props, and overlay dismissal)

## 2. Animation Engineering
We will leverage `react-native-reanimated` entry transitions:
- Presets: `ZoomIn` preset handles both scale and fade together.
- Adjustments:
  - Duration: set to `150` ms.
  - Curve: set to `Easing.ease`.
- Layout Anchoring: 
  - To scale from the geometric center of the dropdown menu container, the `Animated.View` wrapping must receive the positioned layout styles.
  - By using `asChild` on `DropdownMenuPrimitive.Content` (and `SubContent`), layout styles calculated dynamically by the engine are forwarded to `NativeOnlyAnimatedView`.
  - The children elements must be rendered nested inside the animated container to prevent structural breakdown (bug fix).

## 3. Dismissal Implementation
- Wrap the positioned dropdown content in `DropdownMenuPrimitive.Overlay`.
- Set `closeOnPress={true}` on the overlay component to handle tap-outside actions native events to dismiss the dropdown.

## 4. Spacing Rules
- Apply `insets={{ top: 16, bottom: 16, left: 16, right: 16 }}` on `DropdownMenuPrimitive.Content` to enforce a 16px safety distance from all screen boundaries.
