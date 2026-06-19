import React from 'react';
import { View, Pressable } from 'react-native';
import { GestureHandlerRootView, Swipeable } from 'react-native-gesture-handler';
import { Card, CardProps } from '../atoms/Card';
import { Icon } from '../atoms/Icon';
import { COLORS } from '../atoms/colors';
import Animated, { useAnimatedStyle, withSpring } from 'react-native-reanimated';

export interface SwipeableCardProps extends CardProps {
  onDelete?: () => void;
  onEdit?: () => void;
}

export function SwipeableCard({ onDelete, onEdit, children, ...props }: SwipeableCardProps) {
  const renderRightActions = () => {
    return (
      <View className="flex-row items-center pl-4 pr-screen-x gap-2">
        {onEdit && (
          <Pressable 
            onPress={onEdit}
            className="w-12 h-12 bg-secondary-soft rounded-full items-center justify-center"
          >
            <Icon name="Pencil" color={COLORS.secondary || '#000'} size={20} />
          </Pressable>
        )}
        {onDelete && (
          <Pressable 
            onPress={onDelete}
            className="w-12 h-12 bg-tomato-soft rounded-full items-center justify-center"
          >
            <Icon name="Trash2" color={COLORS.error || '#f00'} size={20} />
          </Pressable>
        )}
      </View>
    );
  };

  return (
    <Swipeable renderRightActions={renderRightActions}>
      <Card {...props}>
        {children}
      </Card>
    </Swipeable>
  );
}
