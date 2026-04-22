import { LucideIcon, icons } from 'lucide-react-native';

export type IconName = keyof typeof icons;

export interface IconProps {
  name: IconName;
  color?: string;
  size?: number;
  className?: string;
}

export function Icon({ name, color = '#0F0F0F', size = 24, className }: IconProps) {
  const LucideComponent = icons[name] as LucideIcon;

  if (!LucideComponent) {
    return null;
  }

  return <LucideComponent color={color} size={size} className={className} />;
}
