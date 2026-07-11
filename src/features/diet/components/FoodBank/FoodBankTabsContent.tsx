import React from 'react';
import { View, FlatList } from 'react-native';
import { Text } from "@/components/ui/text";
import { TabsContent } from '@/components/ui/tabs';
import { MealCard } from '../MealCard';
import { MealService } from '../../services/meal-service';
import Food from '../../../../db/models/Food';
import Meal from '../../../../db/models/Meal';

interface FoodTabProps {
  foods: Food[];
  renderFoodItem: ({ item, index }: { item: Food, index: number }) => React.JSX.Element;
  emptyMessage: string;
  value: string;
}

export function FoodBankFoodTab({ foods, renderFoodItem, emptyMessage, value }: FoodTabProps) {
  return (
    <TabsContent value={value} className="flex-1">
      <FlatList keyboardShouldPersistTaps="handled"
        data={foods}
        keyExtractor={(item) => item.id}
        contentContainerClassName="pb-content-bottom"
        renderItem={renderFoodItem}
        ListEmptyComponent={
          <View className="items-center py-20">
            <Text className="text-text-secondary">{emptyMessage}</Text>
          </View>
        }
      />
    </TabsContent>
  );
}

interface MealTabProps {
  meals: Meal[];
}

export function FoodBankMealTab({ meals }: MealTabProps) {
  return (
    <TabsContent value="refeicoes" className="flex-1">
      <FlatList keyboardShouldPersistTaps="handled"
        data={meals}
        keyExtractor={(item) => item.id}
        contentContainerClassName="pb-content-bottom gap-content-gap px-screen-x"
        renderItem={({ item }) => (
          <MealCard 
            meal={item} 
            onDelete={async (id: string) => await MealService.delete(id)}
            onEdit={() => {}} 
          />
        )}
        ListEmptyComponent={
          <View className="items-center py-20">
            <Text className="text-text-secondary">Nenhuma refeição encontrada.</Text>
          </View>
        }
      />
    </TabsContent>
  );
}
