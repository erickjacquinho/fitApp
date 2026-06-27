import React, { useState } from 'react';
import { View, FlatList } from 'react-native';
import { SearchBar } from '../../../components/molecules/SearchBar';
import { FoodBankCard } from './FoodBankCard';
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
    <View className="flex-1">
      <View className="py-compact gap-4">
        <SearchBar value={search} onChangeText={setSearch} placeholder="Buscar alimentos..." />
        
        <View className="flex-row gap-3">
          <View className="flex-1">
            <Button variant={isSelectionMode ? "outline" : "default"} onPress={() => isSelectionMode ? setIsSelectionMode(false) : router.push('/diet/create-food')}><Text>{isSelectionMode ? 'Cancelar' : 'Criar alimento'}</Text></Button>
          </View>
          {isSelectionMode ? (
            <View className="flex-1">
              <Button variant="destructive" disabled={bulkSelections.size === 0} onPress={handleBulkDelete}><Text>{`Excluir (${bulkSelections.size})`}</Text></Button>
            </View>
          ) : (
            <View className="flex-1">
              <Button variant="secondary" onPress={() => setIsSelectionMode(true)}><Text>Selecionar</Text></Button>
            </View>
          )}
        </View>
      </View>

      <FlatList keyboardShouldPersistTaps="handled"
        data={filteredFoods}
        keyExtractor={(item) => item.id}
        contentContainerClassName="pb-content-bottom"
        renderItem={({ item }) => {
          const isSelected = bulkSelections.has(item.id);
          return (
            <FoodBankCard
              food={item}
              isSelected={isSelected}
              onDelete={isSelectionMode ? undefined : () => confirmDelete(item.id)}
              onPress={() => {
                if (isSelectionMode) toggleBulkSelection(item.id);
                else if (mealId) handleAddFoodToMeal(item.id);
                else router.push({ pathname: '/diet/create-food', params: { id: item.id } });
              }}
            />
          );
        }}
        ListEmptyComponent={
          <View className="items-center py-20">
            <Text className="text-text-secondary">Nenhum alimento encontrado.</Text>
          </View>
        }
      />

      <ConfirmModal 
        visible={deleteModalVisible}
        title="Excluir alimento?"
        description="O alimento será removido do seu banco."
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
