import { Text } from '@/components/ui/text';
import React from 'react';
import { View } from 'react-native';
import { SwipeableRow } from '../../../components/molecules/SwipeableRow';
import { BaseCardList } from '../../../components/molecules/BaseCardList';
import { ColoredMacros } from '../../../components/molecules/ColoredMacros';
import { CaloriesText } from '../../../components/molecules/CaloriesText';
import Food from '../../../db/models/Food';
import withObservables from '@nozbe/with-observables';

export interface FoodCardListProps {
  food: Food;
  onDelete?: () => void;
  onPress?: () => void;
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
    <SwipeableRow onDelete={onDelete}>
      <BaseCardList
        onPress={onPress}
        isFirst={isFirst}
        isLast={isLast}
        isSelected={isSelected}
        className={className}
      >
        <View className="flex-1 mr-3 justify-center gap-1">
          <Text variant="subtitle" className="text-text-primary" numberOfLines={1}>{food.name}</Text>
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
    </SwipeableRow>
  );
}

const enhance = withObservables(['food'], ({ food }: { food: Food }) => ({
  food: food.observe()
}));

export const FoodCardList = enhance(FoodCardListComponent);
