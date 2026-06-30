import React from 'react';
import { View , Animated, Pressable } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Trash2 } from 'lucide-react-native';

export interface SwipeableRowProps {
  onDelete?: () => void;
  onPress?: () => void;
  children?: React.ReactNode;
  className?: string;
}

export function SwipeableRow({ onDelete, onPress, children, className }: SwipeableRowProps) {
  const deleteTriggered = React.useRef(false);
  const listenerId = React.useRef<string | null>(null);

  const renderRightActions = (progress: Animated.AnimatedInterpolation<number>, dragX: Animated.AnimatedInterpolation<number>) => {
    if (onDelete && !listenerId.current) {
      listenerId.current = dragX.addListener(({ value }) => {
        if (value < -200 && !deleteTriggered.current) {
          deleteTriggered.current = true;
          onDelete();
        }
      });
    }
    return (
      <View className="flex-row items-stretch">
        {onDelete && (
          <Button
            accessibilityLabel="Excluir"
            variant="destructive"
            size="icon"
            onPress={() => {
              if (!deleteTriggered.current) {
                deleteTriggered.current = true;
                onDelete();
              }
            }}
            className="h-full w-16 bg-error rounded-none"
          >
            <Icon as={Trash2} className="text-error-foreground" />
          </Button>
        )}
      </View>
    );
  };

  const content = <View className={className}>{children}</View>;

  return (
    <Swipeable renderRightActions={renderRightActions}>
      {onPress ? (
        <Pressable onPress={onPress}>
          {content}
        </Pressable>
      ) : (
        content
      )}
    </Swipeable>
  );
}
