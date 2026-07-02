import React, { useState, useMemo } from 'react';
import { View, FlatList } from 'react-native';
import { SearchBar } from '../../../components/molecules/SearchBar';
import { FoodCardList } from './FoodCardList';
import { MealCard } from './MealCard';
import { BulkSelectionMenu } from './BulkSelectionMenu';
import { MealSelectorModal } from './MealSelectorModal';
import { useFoodBank } from '../hooks/useFoodBank';
import { useRouter } from 'expo-router';
import withObservables from '@nozbe/with-observables';
import { database } from '../../../db';
import Food from '../../../db/models/Food';
import Meal from '../../../db/models/Meal';
import { Q } from '@nozbe/watermelondb';
import { ConfirmModal } from '../../../components/organisms/ConfirmModal';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { MealService } from '../services/meal-service';

import { Text } from "@/components/ui/text";

interface FoodBankScreenProps {
  foods: Food[];
  meals: Meal[];
  mealId?: string;
}

function FoodBankScreenComponent({ foods, meals = [], mealId }: FoodBankScreenProps) {
  const router = useRouter();
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [bulkDeleteModalVisible, setBulkDeleteModalVisible] = useState(false);
  const [mealSelectorVisible, setMealSelectorVisible] = useState(false);
  const [selectedFoodId, setSelectedFoodId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('todos');

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

  const favoriteFoods = useMemo(() => filteredFoods.filter(f => f.isFavorite), [filteredFoods]);
  const filteredMeals = useMemo(() => meals.filter(m => m.name.toLowerCase().includes(search.toLowerCase())), [meals, search]);

  const renderFoodItem = ({ item, index }: { item: Food, index: number }) => {
    const isSelected = bulkSelections.has(item.id);
    const isFirst = index === 0;
    const isLast = index === (activeTab === 'todos' ? filteredFoods.length : favoriteFoods.length) - 1;

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
  };

  return (
    <View className="flex-1">
      <View className="py-compact gap-4">
        <SearchBar value={search} onChangeText={setSearch} placeholder="Buscar alimentos..." />
      </View>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1">
        <TabsList className="mb-4 rounded-xl">
          <TabsTrigger value="todos" className="rounded-lg"><Text>Todos</Text></TabsTrigger>
          <TabsTrigger value="refeicoes" className="rounded-lg"><Text>Refeições</Text></TabsTrigger>
          <TabsTrigger value="favoritos" className="rounded-lg"><Text>Favoritos</Text></TabsTrigger>
        </TabsList>

        <TabsContent value="todos" className="flex-1">
          <FlatList keyboardShouldPersistTaps="handled"
            data={filteredFoods}
            keyExtractor={(item) => item.id}
            contentContainerClassName="pb-content-bottom"
            renderItem={renderFoodItem}
            ListEmptyComponent={
              <View className="items-center py-20">
                <Text className="text-text-secondary">Nenhum alimento encontrado.</Text>
              </View>
            }
          />
        </TabsContent>

        <TabsContent value="refeicoes" className="flex-1">
          <FlatList keyboardShouldPersistTaps="handled"
            data={filteredMeals}
            keyExtractor={(item) => item.id}
            contentContainerClassName="pb-content-bottom gap-3 px-screen-x"
            renderItem={({ item }) => (
              <MealCard 
                meal={item} 
                onDelete={async (id) => await MealService.delete(id)}
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

        <TabsContent value="favoritos" className="flex-1">
          <FlatList keyboardShouldPersistTaps="handled"
            data={favoriteFoods}
            keyExtractor={(item) => item.id}
            contentContainerClassName="pb-content-bottom"
            renderItem={renderFoodItem}
            ListEmptyComponent={
              <View className="items-center py-20">
                <Text className="text-text-secondary">Nenhum favorito encontrado.</Text>
              </View>
            }
          />
        </TabsContent>
      </Tabs>

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
  foods: database.get<Food>('foods').query(Q.sortBy('name', Q.asc)),
  meals: database.get<Meal>('meals').query(Q.where('target_date', null), Q.sortBy('name', Q.asc))
}));

export const FoodBankScreen = enhance(FoodBankScreenComponent);
