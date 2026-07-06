# Technical Design: UI Design System Refinements

This design document outlines the technical changes required to implement the UI improvements for the `Card` and `Input` components, aligning them with the defined tokens and guidelines.

---

## 1. System Architecture & Components

### Card Component
*   **Target File**: `src/components/ui/card.tsx`
*   **Purpose**: Update the border-radius from `8px` (`rounded-md`) to `16px` (`rounded-xl`) to achieve the premium aesthetic defined in the guidelines.

### Input Component
*   **Target File**: `src/components/ui/input.tsx`
*   **Purpose**: Update focus colors to use the blue accent focus token (`border-border-focus`) for both the input borders and the native animated focus rings.

---

## 2. Implementation Details

### A. Card Refinement
In `src/components/ui/card.tsx`, we will update the base classes in `cardVariants`:
```diff
const cardVariants = cva(
-  'flex flex-col gap-4 rounded-md p-card shadow-none',
+  'flex flex-col gap-4 rounded-xl p-card shadow-none',
   {
...
```

### B. Input Focus State Refinement
In `src/components/ui/input.tsx`, we will modify the border focus classes for the text input and focus ring.

#### Input border focus transition class (lines 81-83):
```diff
           className={cn(
             'flex h-input-md w-full min-w-0 flex-row items-center rounded-md border border-border-strong bg-surface px-4 py-2 font-sans text-text leading-body text-text-primary shadow-none transition-colors duration-base',
-            'focus:border-thin focus:border-border-control',
+            'focus:border-thin focus:border-border-focus',
```

#### Native animated ring overlay (lines 66-72):
```diff
         {Platform.OS !== 'web' && frame.width > 0 && (
           <Animated.View 
             style={ringStyle}
-            className="absolute border-border-subtle bg-transparent"
+            className="absolute border-border-focus bg-transparent"
             pointerEvents="none"
           />
         )}
```

#### Web focus outline styles (lines 91-94):
```diff
             Platform.select({
               web: cn(
                 'placeholder:text-text-secondary selection:bg-primary selection:text-text-inverse outline-none',
-                'focus-visible:border-border-control focus-visible:ring-2 focus-visible:ring-border-subtle',
+                'focus-visible:border-border-focus focus-visible:ring-2 focus-visible:ring-border-focus/20',
                 'aria-invalid:ring-error/20 aria-invalid:border-error'
               ),
```

---

## 3. Verification Plan

### Automated Tests
Run the component test suite to verify no regressions:
```bash
npm run test src/components/ui/__tests__/card.test.tsx
npm run test src/components/ui/__tests__/input.test.tsx
```

### Manual Verification
*   Focus on text input fields on iOS/Android emulators and web browsers to check that the blue border and focus ring highlight correctly.
*   Verify that Cards on dashboard widgets display the softer `16px` rounded corners.
