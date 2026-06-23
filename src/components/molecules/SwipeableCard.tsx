import React from 'react';
import { View , Animated, Pressable } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import { Button } from '@/components/ui/button';
import { Card, CardProps } from "@/components/ui/card";
import { Icon } from '@/components/ui/icon';
import { Pencil, Trash2 } from 'lucide-react-native';


export interface SwipeableCardProps extends CardProps {
  onDelete?: () => void;
  onPress?: () => void;
  children?: React.ReactNode;
}

export function SwipeableCard({ onDelete, onPress, children, ...props }: SwipeableCardProps) {
  const deleteTriggered = React.useRef(false);
  const listenerId = React.useRef<string | null>(null);

  const renderRightActions = (progress: Animated.AnimatedInterpolation<number>, dragX: Animated.AnimatedInterpolation<number>) => {
    // Escuta o arraste para "swipe to delete" longo
    if (onDelete && !listenerId.current) {
      listenerId.current = dragX.addListener(({ value }) => {
        if (value < -200 && !deleteTriggered.current) {
          deleteTriggered.current = true;
          onDelete();
        }
      });
    }
    // We use styling to match the card layout.
    // The inner buttons fill the height. If the Card has mb-2, we need to handle the bottom margin
    // so the buttons don't stretch into the margin. The easiest way is to apply a padding or margin to match.
    // We'll wrap the buttons in a view that has pb-2 if the parent uses mb-2, but we can't easily detect it.
    // However, it's generally cleaner to just let the buttons align with the card's rounded-md.
    return (
      <View className="flex-row items-stretch pl-2">
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
            className="h-full w-16 bg-error"
          >
            <Icon as={Trash2} className="text-error-foreground" />
          </Button>
        )}
      </View>
    );
  };

  // Extract standard margin classes so they can be applied outside the Swipeable
  const classNameStr = props.className || '';
  const marginClasses: string[] = classNameStr.match(/m[b|t|l|r|x|y]?-\d+/g) || [];
  const otherClasses = classNameStr.split(' ').filter((c: string) => !marginClasses.includes(c)).join(' ');

  const content = (
    <Card {...props} className={otherClasses}>
      {children}
    </Card>
  );

  return (
    <View className={marginClasses.join(' ')}>
      <Swipeable renderRightActions={renderRightActions}>
        {onPress ? (
          <Pressable onPress={onPress}>
            {content}
          </Pressable>
        ) : (
          content
        )}
      </Swipeable>
    </View>
  );
}
