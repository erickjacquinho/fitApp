import React from 'react';
import { MotiView } from 'moti';
import type { ComponentProps } from 'react';
import { useReducedMotion, Easing } from 'react-native-reanimated';

export interface PopoverAnimationProps extends ComponentProps<typeof MotiView> {
  children: React.ReactNode;
  className?: string;
}

export function PopoverAnimation({ children, style, className, ...props }: PopoverAnimationProps) {
  const reducedMotion = useReducedMotion();

  return (
    <MotiView
      from={{ opacity: 0, scale: reducedMotion ? 1 : 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: reducedMotion ? 1 : 0.96 }}
      transition={{ 
        type: 'timing', 
        duration: 150, 
        easing: Easing.out(Easing.quad) 
      }}
      style={style}
      className={className}
      {...props}
    >
      {children}
    </MotiView>
  );
}
