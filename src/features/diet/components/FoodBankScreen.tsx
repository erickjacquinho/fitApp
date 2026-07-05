import React, { useState, useMemo } from 'react';
import { View, FlatList, Pressable } from 'react-native';
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
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { MealService } from '../services/meal-service';
import Animated, { useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { cn } from '@/lib/utils';

import { Text } from "@/components/ui/text";

interface FoodBankScreenProps {
  foods: Food[];
  meals: Meal[];
  mealId?: string;
}

const TABS = [
  { id: 'todos', label: 'Todos' },
  { id: 'refeicoes', label: 'Refeições' },
  { id: 'favoritos', label: 'Favoritos' },
];

function FoodBankScreenComponent({ foods, meals = [], mealId }: FoodBankScreenProps) {
  const router = useRouter();
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [bulkDeleteModalVisible, setBulkDeleteModalVisible] = useState(false);
  const [bulkUnfavoriteModalVisible, setBulkUnfavoriteModalVisible] = useState(false);
  const [mealSelectorVisible, setMealSelectorVisible] = useState(false);
  const [selectedFoodId, setSelectedFoodId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('todos');
  const [containerWidth, setContainerWidth] = useState(0);

  const activeIndex = TABS.findIndex(t => t.id === activeTab);
  const tabWidth = containerWidth > 0 ? (containerWidth - 8) / 3 : 0;

  const animatedIndicatorStyle = useAnimatedStyle(() => {
    return {
      transform: [{
        translateX: withSpring(activeIndex * tabWidth, {
          mass: 1,
          damping: 25,
          stiffness: 250,
        })
      }],
      width: tabWidth,
    };
  }, [activeIndex, tabWidth]);

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
    unfavoriteSelectedFoods,
    selectionVersion,
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

  const handleBulkUnfavorite = async () => {
    await unfavoriteSelectedFoods();
    setBulkUnfavoriteModalVisible(false);
  };

  const confirmDelete = (id: string) => {
    setSelectedFoodId(id);
    setDeleteModalVisible(true);
  };

  const favoriteFoods = useMemo(() => filteredFoods.filter(f => f.isFavorite), [filteredFoods]);
  const filteredMeals = useMemo(() => meals.filter(m => m.name.toLowerCase().includes(search.toLowerCase())), [meals, search]);

  const isAllFavorites = useMemo(() => {
    if (bulkSelections.size === 0) return false;
    return Array.from(bulkSelections).every(id => {
      const food = foods.find(f => f.id === id);
      return food?.isFavorite;
    });
  }, [bulkSelections, foods, selectionVersion]);

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
      <View className="pt-compact pb-content-gap">
        <SearchBar value={search} onChangeText={setSearch} placeholder="Buscar alimentos..." />
      </View>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1">
        <View 
          className="mb-content-gap flex-row items-center rounded-xl bg-surface-elevated p-1"
          onLayout={(e) => setContainerWidth(e.nativeEvent.layout.width)}
        >
          {containerWidth > 0 && (
            <Animated.View 
              className="absolute top-1 bottom-1 rounded-lg bg-surface border border-border-subtle"
              style={[{ left: 4 }, animatedIndicatorStyle]}
            />
          )}
          {TABS.map((tab) => (
            <Pressable
              key={tab.id}
              className="flex-1 items-center justify-center py-2 min-h-touch-target"
              onPress={() => {
                if (activeTab !== tab.id) {
                  clearSelection();
                  setActiveTab(tab.id);
                }
              }}
            >
              <Text className={cn("font-bold text-label", activeTab === tab.id ? "text-text-primary" : "text-text-secondary")}>
                {tab.label}
              </Text>
            </Pressable>
          ))}
        </View>

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

      <ConfirmModal 
        visible={bulkUnfavoriteModalVisible}
        title="Remover dos favoritos?"
        description={`Tem certeza que deseja desfavoritar ${bulkSelections.size} alimentos?`}
        onConfirm={handleBulkUnfavorite}
        onCancel={() => setBulkUnfavoriteModalVisible(false)}
        isDestructive
      />

      {isSelectionMode && (
        <BulkSelectionMenu
          selectedCount={bulkSelections.size}
          isAllFavorites={isAllFavorites}
          onFavorite={favoriteSelectedFoods}
          onUnfavorite={() => setBulkUnfavoriteModalVisible(true)}
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
        onSelect={(selectedMealId: string) => {
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
