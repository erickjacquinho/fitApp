import React, { useState } from 'react';
import { View, FlatList, Pressable } from 'react-native';
import { Typography } from '../../../components/atoms/Typography';
import { SearchBar } from '../../../components/molecules/SearchBar';
import { SwipeableCard } from '../../../components/molecules/SwipeableCard';
import { useFoodBank } from '../hooks/useFoodBank';
import { useRouter } from 'expo-router';
import withObservables from '@nozbe/with-observables';
import { database } from '../../../db';
import Food from '../../../db/models/Food';
import { Q } from '@nozbe/watermelondb';
import { ConfirmModal } from '../../../components/organisms/ConfirmModal';
import { MealService } from '../services/meal-service';
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";

interface FoodBankScreenProps {
  foods: Food[];
  mealId?: string;
}

function FoodBankScreenComponent({ foods, mealId }: FoodBankScreenProps) {
  const router = useRouter();
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [selectedFoodId, setSelectedFoodId] = useState<string | null>(null);

  const {
    search,
    setSearch,
    isSelectionMode,
    setIsSelectionMode,
    bulkSelections,
    toggleBulkSelection,
    filteredFoods,
    deleteFood,
    deleteSelectedFoods,
  } = useFoodBank(foods);

  const handleAddFoodToMeal = (foodId: string) => {
    if (!mealId) return;
    router.push({ pathname: '/diet/add-food-to-meal', params: { mealId, foodId } });
  };

  const handleDelete = async () => {
    if (selectedFoodId) {
      await deleteFood(selectedFoodId);
      setDeleteModalVisible(false);
      setSelectedFoodId(null);
    }
  };

  const handleBulkDelete = async () => {
    await deleteSelectedFoods();
  };

  const confirmDelete = (id: string) => {
    setSelectedFoodId(id);
    setDeleteModalVisible(true);
  };

  return (
    <View className="flex-1 bg-surface-app">
      <View className="px-screen-x py-compact gap-4">
        <SearchBar value={search} onChangeText={setSearch} placeholder="Search in your food bank..." />
        
        <View className="flex-row gap-3">
          <View className="flex-1">
            <Button variant={isSelectionMode ? "outline" : "default"} onPress={() => isSelectionMode ? setIsSelectionMode(false) : router.push('/diet/create-food')}><Text>{isSelectionMode ? "Cancel" : "+ Create New Food"}</Text></Button>
          </View>
          {isSelectionMode ? (
            <View className="flex-1">
              <Button variant="destructive" disabled={bulkSelections.size === 0} onPress={handleBulkDelete}><Text>{`Delete (${bulkSelections.size})`}</Text></Button>
            </View>
          ) : (
            <View className="flex-1">
              <Button variant="secondary" onPress={() => setIsSelectionMode(true)}><Text>Select</Text></Button>
            </View>
          )}
        </View>
      </View>

      <FlatList keyboardShouldPersistTaps="handled"
        data={filteredFoods}
        keyExtractor={(item) => item.id}
        contentContainerClassName="px-screen-x pb-20"
        renderItem={({ item }) => {
          const isSelected = bulkSelections.has(item.id);
          return (
            <Pressable 
              onPress={() => {
                if (isSelectionMode) toggleBulkSelection(item.id);
                else if (mealId) handleAddFoodToMeal(item.id);
              }}
            >
              <SwipeableCard 
                className={`mb-3 ${isSelected ? 'border-primary-main bg-primary-soft/10' : ''}`}
                onEdit={isSelectionMode ? undefined : () => router.push({ pathname: '/diet/create-food', params: { id: item.id } })}
                onDelete={isSelectionMode ? undefined : () => confirmDelete(item.id)}
              >
                <View className="flex-row items-center justify-between">
                  <View className="flex-1">
                    <Typography variant="subtitle">{item.name}</Typography>
                    <Typography variant="caption" color="muted">
                      {item.protein}P • {item.carbohydrates}C • {item.fat}G
                    </Typography>
                  </View>
                  <Typography variant="highlight">{item.calories} kcal</Typography>
                </View>
              </SwipeableCard>
            </Pressable>
          );
        }}
        ListEmptyComponent={
          <View className="items-center py-20">
            <Typography color="muted">No foods found</Typography>
          </View>
        }
      />

      <ConfirmModal 
        visible={deleteModalVisible}
        title="Delete Food?"
        description="This action cannot be undone. This food will be removed from your bank."
        onConfirm={handleDelete}
        onCancel={() => setDeleteModalVisible(false)}
        isDestructive
      />
    </View>
  );
}

const enhance = withObservables([], () => ({
  foods: database.get<Food>('foods').query(Q.sortBy('name', Q.asc))
}));

export const FoodBankScreen = enhance(FoodBankScreenComponent);
