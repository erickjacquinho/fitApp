import React, { useState } from 'react';
import { View, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import withObservables from '@nozbe/with-observables';
import Meal from '../../../db/models/Meal';
import MealItem from '../../../db/models/MealItem';
import Food from '../../../db/models/Food';
import { MealHeader } from './MealHeader';
import { FoodEntryCard } from './FoodEntryCard';
import { MealMacrosSummary } from './MealMacrosSummary';
import { aggregateMacros } from '../utils/macro-utils';
import { MealService } from '../services/meal-service';
import { Edit, EllipsisVertical, GripVertical, Trash2 } from 'lucide-react-native';
import { Text } from "@/components/ui/text";
import { Icon } from '@/components/ui/icon';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

function MacroProportionBar({ macros }: { macros: { protein: number; carbs: number; fat: number } }) {
  const p = macros?.protein || 0;
  const c = macros?.carbs || 0;
  const f = macros?.fat || 0;
  const total = p + c + f;

  if (!total || total <= 0 || isNaN(total)) {
    return <View className="h-[1px] w-full bg-border-subtle" />;
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
  onEdit: (meal: Meal) => void;
  isReordering?: boolean;
  drag?: () => void;
}

function MealCardContent({ meal, items, onDelete, onEdit, isReordering, drag }: MealCardContentProps) {
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
        <MealHeader
          name={meal.name}
          onLongPress={() => {
            if (drag) drag();
          }}
        >
          <Icon as={GripVertical} className="text-text-secondary" />
        </MealHeader>
      </View>
    );
  }

  return (
    <View 
      className="overflow-hidden border border-border-subtle rounded-lg flex-col bg-surface"
    >
      <MealHeader
        name={meal.name}
        time={meal.preparationState || '00:00'}
        onLongPress={() => {
          // No action on normal mode longpress
        }}
      >
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Pressable accessibilityLabel={`Opções de ${meal.name}`} className="p-1">
              <Icon as={EllipsisVertical} className="text-text-primary" size={16} />
            </Pressable>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-32">
            <DropdownMenuItem 
              onPress={() => onEdit(meal)}
              className="flex-row items-center gap-2"
            >
              <Icon as={Edit} size={14} className="text-text-primary" />
              <Text>Editar</Text>
            </DropdownMenuItem>
            <DropdownMenuItem 
              onPress={() => onDelete(meal.id)}
              variant="destructive"
              className="flex-row items-center gap-2"
            >
              <Icon as={Trash2} size={14} className="text-error" />
              <Text className="text-error">Excluir</Text>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </MealHeader>
      
      <View className="flex-col">
        <MacroProportionBar macros={macros} />
        
        <View className="flex-col">
          {foodItems.length > 0 && (
            <View className="gap-0">
              {foodItems.map((item, index) => (
                <FoodEntryCard 
                  key={item.id} 
                  food={item.food} 
                  quantity={item.quantity} 
                  isFirst={index === 0}
                  isLast={index === foodItems.length - 1}
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

const MealCardComponent = enhanceMeal(({ meal, items, onDelete, onEdit, isReordering, drag }: MealCardContentProps) => {
  return <MealCardContent meal={meal} items={items} onDelete={onDelete} onEdit={onEdit} isReordering={isReordering} drag={drag} />;
});

export const MealCard = React.memo(
  MealCardComponent,
  (prevProps, nextProps) => {
    return (
      prevProps.meal.id === nextProps.meal.id &&
      prevProps.isReordering === nextProps.isReordering &&
      prevProps.onEdit === nextProps.onEdit
    );
  }
);
