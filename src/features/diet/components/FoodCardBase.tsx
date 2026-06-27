import { Text } from '@/components/ui/text';
import React from 'react';
import { View, Pressable } from 'react-native';
import { SwipeableRow } from '../../../components/molecules/SwipeableRow';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

import { ColoredMacros } from '../../../components/molecules/ColoredMacros';
import { CaloriesText } from '../../../components/molecules/CaloriesText';

export interface FoodCardBaseProps {
  title: string;
  subtitle: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  onDelete?: () => void;
  onPress?: () => void;
  isSelected?: boolean;
  className?: string;
  showDivider?: boolean;
  actionSlot?: React.ReactNode;
}

export function FoodCardBase({
  title,
  subtitle,
  calories,
  protein,
  carbs,
  fat,
  onDelete,
  onPress,
  isSelected,
  className,
  showDivider = false,
  actionSlot,
}: FoodCardBaseProps) {
  return (
    <SwipeableRow onDelete={onDelete}>
      <View>
        <Pressable 
          onPress={onPress}
          className={cn(
            'flex-row justify-between items-center active:bg-surface-elevated',
            isSelected && 'bg-primary/10',
            className
          )}
        >
          <View className="flex-1 mr-3 justify-center gap-1">
            <Text variant="subtitle" className="text-text-primary" numberOfLines={1}>{title}</Text>
            <Text variant="caption" className="text-text-secondary" numberOfLines={1}>
              {subtitle}
            </Text>
          </View>
          <View className="items-end justify-center gap-1">
            <CaloriesText calories={calories} />
            <ColoredMacros protein={protein} carbs={carbs} fat={fat} />
          </View>
          {actionSlot && (
            <View className="ml-3">
              {actionSlot}
            </View>
          )}
        </Pressable>
        {showDivider && <Separator />}
      </View>
    </SwipeableRow>
  );
}
