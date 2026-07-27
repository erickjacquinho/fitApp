import { Easing, type WithSpringConfig, type WithTimingConfig } from 'react-native-reanimated';

/**
 * FitApp Animation Tokens
 * Standardized spring physics, timing durations, and motion recipes across the codebase.
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
    // Smooth cubic easing for fluid transitions
    cubicOut: Easing.out(Easing.cubic),
  },

  // Physics & Deformation
  physics: {
    // Standardized Spring Presets
    spring: {
      snappy: { damping: 15, stiffness: 150 } as WithSpringConfig,
      bouncy: { damping: 10, stiffness: 100 } as WithSpringConfig,
      overshoot: { damping: 12, stiffness: 120, mass: 1, overshootClamping: false } as WithSpringConfig,
      elastic: { damping: 26, stiffness: 220, overshootClamping: true } as WithSpringConfig,
      stiff: { damping: 30, stiffness: 300, overshootClamping: true } as WithSpringConfig,
      gentle: { damping: 20, stiffness: 100 } as WithSpringConfig,
    },

    // Horizontal & Gesture Inertia Parameters
    inertia: {
      deceleration: 0.998,
      velocityMultiplier: 1.35,
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

  // Gesture, Fling & Swipeable Rows/Calendars
  gesture: {
    elasticReturn: animationTokens.physics.spring.elastic,
    boundaryStiff: animationTokens.physics.spring.stiff,
    decayDeceleration: animationTokens.physics.inertia.deceleration,
    velocityMultiplier: animationTokens.physics.inertia.velocityMultiplier,
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
