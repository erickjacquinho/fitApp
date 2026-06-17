import React, { useState } from 'react';
import { View, FlatList, Pressable } from 'react-native';
import { Typography } from '../../../components/atoms/Typography';
import { Button } from '../../../components/atoms/Button';
import { SearchBar } from '../../../components/molecules/SearchBar';
import { SwipeableCard } from '../../../components/molecules/SwipeableCard';
import { FoodService } from '../services/food-service';
import { useRouter } from 'expo-router';
import withObservables from '@nozbe/with-observables';
import { database } from '../../../db';
import Food from '../../../db/models/Food';
import { Q } from '@nozbe/watermelondb';
import { ConfirmModal } from '../../../components/organisms/ConfirmModal';

interface FoodBankScreenProps {
  foods: Food[];
}

function FoodBankScreenComponent({ foods }: FoodBankScreenProps) {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [selectedFoodId, setSelectedFoodId] = useState<string | null>(null);
  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const [bulkSelections, setBulkSelections] = useState<Set<string>>(new Set());

  const filteredFoods = foods.filter(f => 
    f.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = async () => {
    if (selectedFoodId) {
      await FoodService.delete(selectedFoodId);
      setDeleteModalVisible(false);
      setSelectedFoodId(null);
    }
  };

  const handleBulkDelete = async () => {
    await Promise.all(Array.from(bulkSelections).map(id => FoodService.delete(id)));
    setBulkSelections(new Set());
    setIsSelectionMode(false);
  };

  const confirmDelete = (id: string) => {
    setSelectedFoodId(id);
    setDeleteModalVisible(true);
  };

  const toggleBulkSelection = (id: string) => {
    setBulkSelections(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <View className="flex-1 bg-surface-app">
      <View className="px-screen-x py-compact gap-4">
        <SearchBar value={search} onChangeText={setSearch} placeholder="Search in your food bank..." />
        
        <View className="flex-row gap-3">
          <View className="flex-1">
            <Button 
              title={isSelectionMode ? "Cancel" : "+ Create New Food"} 
              variant={isSelectionMode ? "outline" : "primary"}
              onPress={() => isSelectionMode ? setIsSelectionMode(false) : router.push('/diet/create-food')} 
            />
          </View>
          {isSelectionMode ? (
            <View className="flex-1">
              <Button 
                title={`Delete (${bulkSelections.size})`} 
                variant="danger" 
                disabled={bulkSelections.size === 0}
                onPress={handleBulkDelete}
              />
            </View>
          ) : (
            <View className="flex-1">
              <Button title="Select" variant="secondary" onPress={() => setIsSelectionMode(true)} />
            </View>
          )}
        </View>
      </View>

      <FlatList
        data={filteredFoods}
        keyExtractor={(item) => item.id}
        contentContainerClassName="px-screen-x pb-20"
        renderItem={({ item }) => {
          const isSelected = bulkSelections.has(item.id);
          return (
            <Pressable onPress={() => isSelectionMode ? toggleBulkSelection(item.id) : null}>
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
