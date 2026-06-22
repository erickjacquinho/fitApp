import { Text } from '@/components/ui/text';
import { View, Pressable, PressableProps } from 'react-native';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface ListItemProps extends PressableProps {
  title: string;
  subtitle?: string;
  rightAccessory?: React.ReactNode;
  leftAccessory?: React.ReactNode;
  className?: string;
}

export function ListItem({ title, subtitle, rightAccessory, leftAccessory, disabled, className, ...props }: ListItemProps) {
  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      className={twMerge(
        clsx(
          'flex-row items-center px-4 py-3 bg-surface-raised border-b border-soft active:bg-surface-muted',
          disabled && 'opacity-50',
          className
        )
      )}
      {...props}
    >
      {leftAccessory && <View className="mr-3">{leftAccessory}</View>}
      <View className="flex-1 flex-col">
        <Text variant="subtitle">{title}</Text>
        {subtitle ? (
          <Text variant="text" color="muted">
            {subtitle}
          </Text>
        ) : null}
      </View>
      {rightAccessory && <View className="ml-3">{rightAccessory}</View>}
    </Pressable>
  );
}
