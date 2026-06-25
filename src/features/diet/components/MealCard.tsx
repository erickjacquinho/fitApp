import React, { useState } from 'react';
import { View, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import withObservables from '@nozbe/with-observables';
import Meal from '../../../db/models/Meal';
import MealItem from '../../../db/models/MealItem';
import Food from '../../../db/models/Food';
import { FoodEntryCard } from './FoodEntryCard';
import { MealMacrosSummary } from './MealMacrosSummary';
import { aggregateMacros } from '../utils/macro-utils';
import { MealService } from '../services/meal-service';
import { Trash2, GripVertical } from 'lucide-react-native';
import { Text } from "@/components/ui/text";
import { Icon } from '@/components/ui/icon';
import { LongPressable } from '@/components/ui/long-pressable';

function MacroProportionBar({ macros }: { macros: { protein: number; carbs: number; fat: number } }) {
  const p = macros?.protein || 0;
  const c = macros?.carbs || 0;
  const f = macros?.fat || 0;
  const total = p + c + f;

  if (!total || total <= 0 || isNaN(total)) {
    return <View className="h-1 w-full bg-border-subtle" />;
  }

  const cPct = Math.round((c / total) * 100);
  const pPct = Math.round((p / total) * 100);
  const fPct = 100 - cPct - pPct;

  return (
    <View className="h-1 w-full flex-row overflow-hidden bg-border-subtle">
      {cPct > 0 && <View style={{ width: `${cPct}%` }} className="bg-carbohydrate h-full" />}
      {pPct > 0 && <View style={{ width: `${pPct}%` }} className="bg-protein h-full" />}
      {fPct > 0 && <View style={{ width: `${fPct}%` }} className="bg-fat h-full" />}
    </View>
  );
}

interface MealCardContentProps {
  meal: Meal;
  items: MealItem[];
  onDelete: (id: string) => void;
  isReordering?: boolean;
  drag?: () => void;
}

function MealCardContent({ meal, items, onDelete, isReordering, drag }: MealCardContentProps) {
  const router = useRouter();
  const [foodItems, setFoodItems] = useState<{ id: string; foodId: string; food: Food; quantity: number }[]>([]);

  const macros = React.useMemo(() => aggregateMacros(foodItems), [foodItems]);

  React.useEffect(() => {
    const loadFoods = async () => {
      const data = await Promise.all(items.map(async (item) => ({
        id: item.id,
        foodId: item.food.id,
        food: await item.food.fetch(),
        quantity: item.quantity
      })));
      const validData = data.filter((d): d is { id: string; foodId: string; food: Food; quantity: number } => d.food !== null);
      setFoodItems(validData);
    };
    loadFoods();
  }, [items]);

  const handleDeleteItem = async (mealItemId: string) => {
    await MealService.removeItemFromMeal(mealItemId);
  };

  const handleEditItem = (mealItemId: string, foodId: string) => {
    router.push({ pathname: '/diet/edit-meal-item', params: { mealItemId, foodId } });
  };

  if (isReordering) {
    return (
      <View className="overflow-hidden border border-border-subtle rounded-lg flex-col bg-surface">
        <LongPressable
          onLongPress={() => {
            if (drag) drag();
          }}
          className="px-4 h-control-md flex-row justify-between items-center"
        >
          <Text variant="subtitle" className="text-text-primary">{meal.name}</Text>
          <Icon as={GripVertical} className="text-text-secondary" />
        </LongPressable>
      </View>
    );
  }

  return (
    <View 
      className="overflow-hidden border border-border-subtle rounded-lg flex-col bg-surface"
    >
      <LongPressable 
        onLongPress={() => {
          // No action on normal mode longpress
        }}
        className="px-4 h-control-md flex-row justify-between items-center"
      >
        <Text variant="subtitle" className="text-text-primary">{meal.name}</Text>
        <View className="flex-row items-center gap-3">
          <Text variant="label" className="text-text-primary">00:00</Text>
          <Pressable accessibilityLabel={`Excluir ${meal.name}`} onPress={() => onDelete(meal.id)} className="p-1">
            <Icon as={Trash2} className="text-destructive" size={16} />
          </Pressable>
        </View>
      </LongPressable>
      
      <View className="flex-col">
        <MacroProportionBar macros={macros} />
        
        <View className="flex-col">
          {foodItems.length > 0 && (
            <View className="gap-0">
              {foodItems.map((item) => (
                <FoodEntryCard 
                  key={item.id} 
                  food={item.food} 
                  quantity={item.quantity} 
                  onDelete={() => handleDeleteItem(item.id)}
                  onEdit={() => handleEditItem(item.id, item.foodId)}
                />
              ))}
            </View>
          )}
          
          <MealMacrosSummary macros={macros} />
   
          <Pressable 
            className="h-control-md flex-row items-center justify-center w-full"
            onPress={() => router.push({ pathname: '/diet/food-bank', params: { mealId: meal.id } })}
          >
            <Text variant="label" className="text-text-primary font-medium">+ Adicionar Alimentos</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const enhanceMeal = withObservables(['meal'], ({ meal }: { meal: Meal }) => ({
  meal,
  items: meal.items.observeWithColumns(['quantity']),
}));

const MealCardComponent = enhanceMeal(({ meal, items, onDelete, isReordering, drag }: MealCardContentProps) => {
  return <MealCardContent meal={meal} items={items} onDelete={onDelete} isReordering={isReordering} drag={drag} />;
});

export const MealCard = React.memo(
  MealCardComponent,
  (prevProps, nextProps) => {
    return (
      prevProps.meal.id === nextProps.meal.id &&
      prevProps.isReordering === nextProps.isReordering
    );
  }
);
