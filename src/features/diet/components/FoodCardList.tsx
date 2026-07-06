import { Text } from '@/components/ui/text';
import { Icon } from '@/components/ui/icon';
import { Star } from 'lucide-react-native';
import React from 'react';
import { View } from 'react-native';
import { SwipeableRow } from '../../../components/molecules/SwipeableRow';
import { BaseCardList } from '../../../components/molecules/BaseCardList';
import { ColoredMacros } from '../../../components/molecules/ColoredMacros';
import { CaloriesText } from '../../../components/molecules/CaloriesText';
import Food from '../../../db/models/Food';
import withObservables from '@nozbe/with-observables';

import { cn } from '@/lib/utils';

export interface FoodCardListProps {
  food: Food;
  onDelete?: () => void;
  onPress?: () => void;
  onLongPress?: () => void;
  isSelected?: boolean;
  isFirst?: boolean;
  isLast?: boolean;
  actionSlot?: React.ReactNode;
  className?: string;
}

function FoodCardListComponent({
  food,
  onDelete,
  onPress,
  onLongPress,
  isSelected,
  isFirst = false,
  isLast = false,
  actionSlot,
  className,
}: FoodCardListProps) {
  const calories = Math.round(food.calories);
  const protein = Math.round(food.protein);
  const carbs = Math.round(food.carbohydrates);
  const fat = Math.round(food.fat);

  return (
    <SwipeableRow 
      features={onDelete ? ['delete'] : undefined}
      handlers={onDelete ? { delete: onDelete } : undefined}
      isFirst={isFirst}
      isLast={isLast}
    >
      {({ isSwiped }) => (
        <BaseCardList
          onPress={onPress}
          onLongPress={onLongPress}
          isFirst={isFirst}
          isLast={isLast}
          isSelected={isSelected}
          isSwiped={isSwiped}
          className={className}
        >
          <View className="flex-1 mr-3 justify-center gap-1">
            <View className="flex-row items-center gap-1">
              <Text variant="subtitle" className={cn("text-text-primary flex-shrink", isSelected && "text-primary")} numberOfLines={1}>{food.name}</Text>
              {food.isFavorite && <Icon as={Star} size={14} className="text-[var(--color-amber-600)]" fill="currentColor" />}
            </View>
            <Text variant="caption" className="text-text-secondary" numberOfLines={1}>
              {food.preparationWeight} g
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
        </BaseCardList>
      )}
    </SwipeableRow>
  );
}

const enhance = withObservables(['food'], ({ food }: { food: Food }) => ({
  food: food.observe()
}));

export const FoodCardList = enhance(FoodCardListComponent);
