import { Easing, type WithSpringConfig, type WithTimingConfig } from 'react-native-reanimated';

/**
 * FitApp Animation Tokens
 * Based on Disney's 12 Principles of Animation for UI Interfaces
 */
export const animationTokens = {
  // [timing-under-300ms]: All user-initiated animations must complete within 300ms.
  duration: {
    fast: 150,
    base: 200,
    slow: 250,
  },
  
  // Easing principles
  easing: {
    // [easing-entrance-ease-out]: Arrive fast, settle gently
    entrance: Easing.out(Easing.ease),
    // [easing-exit-ease-in]: Build momentum before departure
    exit: Easing.in(Easing.ease),
    // Standard easing for in-between states
    standard: Easing.inOut(Easing.ease),
  },

  // Physics & Deformation
  physics: {
    // [physics-spring-for-overshoot]: Use springs for natural overshoot-and-settle
    spring: {
      snappy: { damping: 15, stiffness: 150 } as WithSpringConfig,
      bouncy: { damping: 10, stiffness: 100 } as WithSpringConfig,
      overshoot: { damping: 12, stiffness: 120, mass: 1, overshootClamping: false } as WithSpringConfig,
    },
    
    // [physics-subtle-deformation]: Subtle squash/stretch on active states (0.95-1.05 range)
    activeScale: 0.98,
    
    // [physics-no-excessive-stagger]: Stagger delays must not exceed 50ms per item
    staggerDelay: 30, // 30ms for standard list staggers
  }
};

/**
 * Motion Patterns Registry
 * Ensures cohesive and predictable animations across identical component types.
 * Use these recipes when building or refactoring components.
 */
export const motionPatterns = {
  // Pressables, Buttons, Interactive Cards
  interactive: {
    pressIn: {
      duration: animationTokens.duration.fast,
      easing: animationTokens.easing.entrance,
      targetScale: animationTokens.physics.activeScale,
    } as WithTimingConfig & { targetScale: number },
    pressOut: animationTokens.physics.spring.overshoot,
  },
  
  // Modals, BottomSheets, Dialogs
  overlay: {
    enter: animationTokens.physics.spring.snappy,
    exit: {
      duration: animationTokens.duration.fast,
      easing: animationTokens.easing.exit,
    } as WithTimingConfig,
    backdrop: {
      duration: animationTokens.duration.base,
      easing: animationTokens.easing.standard,
    } as WithTimingConfig,
  },

  // Accordions, Dropdowns, Expandable Containers
  expandable: {
    expand: {
      duration: animationTokens.duration.base,
      easing: animationTokens.easing.entrance,
    } as WithTimingConfig,
    collapse: {
      duration: animationTokens.duration.base,
      easing: animationTokens.easing.exit,
    } as WithTimingConfig,
  },

  // Form elements (Inputs, Checkboxes, Switches)
  formControl: {
    focus: {
      duration: animationTokens.duration.fast,
      easing: animationTokens.easing.entrance,
    } as WithTimingConfig,
    blur: {
      duration: animationTokens.duration.fast,
      easing: animationTokens.easing.exit,
    } as WithTimingConfig,
  },
  
  // Lists and Grids (Staggered Entrance)
  list: {
    staggerDelay: animationTokens.physics.staggerDelay,
    itemEnter: animationTokens.physics.spring.snappy,
  }
};
