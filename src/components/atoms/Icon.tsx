import React from 'react';
import * as LucideIcons from 'lucide-react-native';

export type IconName = keyof typeof LucideIcons;

export interface IconProps {
  name: IconName;
  color?: string;
  size?: number;
  className?: string;
}

export function Icon({ name, color = 'currentColor', size = 24, className }: IconProps) {
  const LucideComponent = LucideIcons[name] as React.ComponentType<{ color?: string; size?: number; className?: string }>;

  if (!LucideComponent) {
    return null;
  }

  return <LucideComponent color={color} size={size} className={className} />;
}
