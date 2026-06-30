import { Text } from '@/components/ui/text';
import { View, Pressable, PressableProps } from 'react-native';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';

export interface ListItemProps extends PressableProps {
  title: string;
  subtitle?: string;
  rightAccessory?: React.ReactNode;
  leftAccessory?: React.ReactNode;
  className?: string;
  showDivider?: boolean;
}

export function ListItem({ title, subtitle, rightAccessory, leftAccessory, disabled, className, showDivider = true, ...props }: ListItemProps) {
  return (
    <View>
      <Pressable
        accessibilityRole="button"
        disabled={disabled}
        className={cn(
          'flex-row items-center bg-surface px-4 py-3 active:bg-surface-elevated',
          disabled && 'opacity-50',
          className
        )}
        {...props}
      >
        {leftAccessory && <View className="mr-3">{leftAccessory}</View>}
        <View className="flex-1 flex-col">
          <Text variant="subtitle">{title}</Text>
          {subtitle ? (
            <Text variant="text" className="text-text-secondary mt-0.5">
              {subtitle}
            </Text>
          ) : null}
        </View>
        {rightAccessory && <View className="ml-3">{rightAccessory}</View>}
      </Pressable>
      {showDivider && <Separator />}
    </View>
  );
}
