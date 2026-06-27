import { Text } from '@/components/ui/text';
import React from 'react';
import { View, Pressable } from 'react-native';
import { SwipeableRow } from '../../../components/molecules/SwipeableRow';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

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
            <Text variant="label" className="font-semibold text-text-primary" numberOfLines={1}>
              {calories} Kcal
            </Text>
            <Text variant="caption" numberOfLines={1}>
              <Text variant="caption" className="text-protein">P: {protein}</Text>
              {'   '}
              <Text variant="caption" className="text-carbohydrate">C: {carbs}</Text>
              {'   '}
              <Text variant="caption" className="text-fat">G: {fat}</Text>
            </Text>
          </View>
        </Pressable>
        {showDivider && <Separator />}
      </View>
    </SwipeableRow>
  );
}
