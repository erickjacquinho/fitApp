import React from 'react';
import { View, Pressable } from 'react-native';
import { GestureHandlerRootView, Swipeable } from 'react-native-gesture-handler';
import { Icon } from '../atoms/Icon';
import { COLORS } from '../../tokens/colors';
import Animated, { useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { Card, CardProps } from "@/components/ui/card";

export interface SwipeableCardProps extends CardProps {
  onDelete?: () => void;
  onEdit?: () => void;
  children?: React.ReactNode;
}

export function SwipeableCard({ onDelete, onEdit, children, ...props }: SwipeableCardProps) {
  const renderRightActions = () => {
    // We use styling to match the card layout.
    // The inner buttons fill the height. If the Card has mb-2, we need to handle the bottom margin
    // so the buttons don't stretch into the margin. The easiest way is to apply a padding or margin to match.
    // We'll wrap the buttons in a view that has pb-2 if the parent uses mb-2, but we can't easily detect it.
    // However, it's generally cleaner to just let the buttons align with the card's rounded-md.
    return (
      <View className="flex-row items-stretch pl-2">
        {onEdit && (
          <Pressable 
            onPress={onEdit}
            className="w-16 items-center justify-center bg-orange-100 rounded-md mr-2"
          >
            <Icon name="Pencil" color="#f97316" size={20} />
          </Pressable>
        )}
        {onDelete && (
          <Pressable 
            onPress={onDelete}
            className="w-16 items-center justify-center bg-tomato-soft rounded-md"
          >
            <Icon name="Trash2" color={COLORS.error || '#f00'} size={20} />
          </Pressable>
        )}
      </View>
    );
  };

  // Extract standard margin classes so they can be applied outside the Swipeable
  const classNameStr = props.className || '';
  const marginClasses: string[] = classNameStr.match(/m[b|t|l|r|x|y]?-\d+/g) || [];
  const otherClasses = classNameStr.split(' ').filter((c: string) => !marginClasses.includes(c)).join(' ');

  return (
    <View className={marginClasses.join(' ')}>
      <Swipeable renderRightActions={renderRightActions}>
        <Card {...props} className={otherClasses}>
          {children}
        </Card>
      </Swipeable>
    </View>
  );
}
