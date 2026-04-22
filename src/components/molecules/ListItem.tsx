import { View, Pressable, PressableProps } from 'react-native';
import { Typography } from '../atoms/Typography';
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
      disabled={disabled}
      className={twMerge(
        clsx(
          'flex-row items-center px-4 py-3 bg-white-base border-b border-gray-400 active:bg-white-soft',
          disabled && 'opacity-50',
          className
        )
      )}
      {...props}
    >
      {leftAccessory && <View className="mr-3">{leftAccessory}</View>}
      <View className="flex-1 flex-col">
        <Typography variant="subtitle">{title}</Typography>
        {subtitle ? (
          <Typography variant="text" color="muted">
            {subtitle}
          </Typography>
        ) : null}
      </View>
      {rightAccessory && <View className="ml-3">{rightAccessory}</View>}
    </Pressable>
  );
}
