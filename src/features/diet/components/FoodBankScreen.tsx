import React, { useState } from 'react';
import { View, FlatList } from 'react-native';
import { SearchBar } from '../../../components/molecules/SearchBar';
import { FoodCardList } from './FoodCardList';
import { BulkSelectionMenu } from './BulkSelectionMenu';
import { MealSelectorModal } from './MealSelectorModal';
import { useFoodBank } from '../hooks/useFoodBank';
import { useRouter } from 'expo-router';
import withObservables from '@nozbe/with-observables';
import { database } from '../../../db';
import Food from '../../../db/models/Food';
import { Q } from '@nozbe/watermelondb';
import { ConfirmModal } from '../../../components/organisms/ConfirmModal';
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";

interface FoodBankScreenProps {
  foods: Food[];
  mealId?: string;
}

function FoodBankScreenComponent({ foods, mealId }: FoodBankScreenProps) {
  const router = useRouter();
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [bulkDeleteModalVisible, setBulkDeleteModalVisible] = useState(false);
  const [mealSelectorVisible, setMealSelectorVisible] = useState(false);
  const [selectedFoodId, setSelectedFoodId] = useState<string | null>(null);

  const {
    search,
    setSearch,
    isSelectionMode,
    setIsSelectionMode,
    bulkSelections,
    toggleBulkSelection,
    clearSelection,
    filteredFoods,
    deleteFood,
    deleteSelectedFoods,
    favoriteSelectedFoods,
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
    setBulkDeleteModalVisible(false);
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
            <Button variant="default" onPress={() => router.push('/diet/create-food')}>
              <Text>Criar alimento</Text>
            </Button>
          </View>
        </View>
      </View>

      <FlatList keyboardShouldPersistTaps="handled"
        data={filteredFoods}
        keyExtractor={(item) => item.id}
        contentContainerClassName="pb-content-bottom"
        renderItem={({ item, index }) => {
          const isSelected = bulkSelections.has(item.id);
          const isFirst = index === 0;
          const isLast = index === filteredFoods.length - 1;

          return (
            <FoodCardList
              food={item}
              isSelected={isSelected}
              isFirst={isFirst}
              isLast={isLast}
              onDelete={isSelectionMode ? undefined : () => confirmDelete(item.id)}
              onLongPress={() => {
                setIsSelectionMode(true);
                toggleBulkSelection(item.id);
              }}
              onPress={() => {
                if (isSelectionMode) toggleBulkSelection(item.id);
                else if (mealId) handleAddFoodToMeal(item.id);
                else router.push({ pathname: '/diet/create-food', params: { id: item.id } });
              }}
              className="h-food-card"
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

      <ConfirmModal 
        visible={bulkDeleteModalVisible}
        title="Excluir alimentos?"
        description={`Tem certeza que deseja excluir ${bulkSelections.size} alimentos do seu banco?`}
        onConfirm={handleBulkDelete}
        onCancel={() => setBulkDeleteModalVisible(false)}
        isDestructive
      />

      {isSelectionMode && (
        <BulkSelectionMenu
          selectedCount={bulkSelections.size}
          onFavorite={favoriteSelectedFoods}
          onAdd={() => {
            if (mealId) {
              const foodIds = Array.from(bulkSelections).join(',');
              router.push({ pathname: '/diet/bulk-add-food-to-meal', params: { mealId, foodIds } });
              clearSelection();
            } else {
              setMealSelectorVisible(true);
            }
          }}
          onDelete={() => setBulkDeleteModalVisible(true)}
        />
      )}

      <MealSelectorModal
        visible={mealSelectorVisible}
        onClose={() => setMealSelectorVisible(false)}
        onSelect={(selectedMealId) => {
          setMealSelectorVisible(false);
          const foodIds = Array.from(bulkSelections).join(',');
          router.push({ pathname: '/diet/bulk-add-food-to-meal', params: { mealId: selectedMealId, foodIds } });
          clearSelection();
        }}
      />
    </View>
  );
}

const enhance = withObservables([], () => ({
  foods: database.get<Food>('foods').query(Q.sortBy('name', Q.asc))
}));

export const FoodBankScreen = enhance(FoodBankScreenComponent);
