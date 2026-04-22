import { Pressable, PressableProps } from 'react-native';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Icon, IconName } from '../atoms/Icon';

export interface IconButtonProps extends PressableProps {
  icon: IconName;
  size?: number;
  iconColor?: string;
  className?: string;
}

export function IconButton({ icon, size = 24, iconColor, disabled, className, ...props }: IconButtonProps) {
  return (
    <Pressable
      disabled={disabled}
      className={twMerge(
        clsx(
          'p-2 rounded-full active:bg-gray-300',
          disabled && 'opacity-50',
          className
        )
      )}
      {...props}
    >
      <Icon name={icon} size={size} color={iconColor} />
    </Pressable>
  );
}
