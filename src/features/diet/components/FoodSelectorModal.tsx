import React, { useState, useEffect } from 'react';
import { View, Modal, FlatList, Pressable } from 'react-native';
import { Typography } from '../../../components/atoms/Typography';
import { Button } from '../../../components/atoms/Button';
import { Card } from '../../../components/atoms/Card';
import { SearchBar } from '../../../components/molecules/SearchBar';
import { Input } from '../../../components/atoms/Input';
import { FoodService } from '../services/food-service';
import { Food } from '../../../db';
import { COLORS } from '../../../components/atoms/colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface FoodSelectorModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: (selections: Array<{ food: Food; quantity: number }>) => void;
}

export function FoodSelectorModal({ visible, onClose, onConfirm }: FoodSelectorModalProps) {
  const [foods, setFoods] = useState<Food[]>([]);
  const [search, setSearch] = useState('');
  const [selections, setSelections] = useState<Record<string, number>>({});
  const insets = useSafeAreaInsets();

  useEffect(() => {
    if (visible) {
      loadFoods();
    }
  }, [visible, search]);

  const loadFoods = async () => {
    const results = search ? await FoodService.search(search) : await FoodService.getAll();
    setFoods(results);
  };

  const toggleSelection = (foodId: string) => {
    setSelections(prev => {
      const next = { ...prev };
      if (next[foodId] !== undefined) {
        delete next[foodId];
      } else {
        next[foodId] = 100; // Default 100g
      }
      return next;
    });
  };

  const updateQuantity = (foodId: string, qty: string) => {
    const val = parseFloat(qty) || 0;
    setSelections(prev => ({ ...prev, [foodId]: val }));
  };

  const handleConfirm = () => {
    const selectedFoods = foods
      .filter(f => selections[f.id] !== undefined)
      .map(f => ({ food: f, quantity: selections[f.id] }));
    onConfirm(selectedFoods);
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" presentationStyle="pageSheet" onRequestClose={onClose}>
      <View className="flex-1 bg-surface-app" style={{ paddingTop: insets.top }}>
        <View className="px-screen-x py-compact border-b border-soft flex-row items-center justify-between">
          <Typography variant="title">Select Foods</Typography>
          <Pressable onPress={onClose}>
            <Typography color="muted">Cancel</Typography>
          </Pressable>
        </View>

        <View className="px-screen-x py-compact">
          <SearchBar value={search} onChangeText={setSearch} placeholder="Search foods..." />
        </View>

        <FlatList
          data={foods}
          keyExtractor={(item) => item.id}
          contentContainerClassName="px-screen-x pb-40"
          renderItem={({ item }) => {
            const isSelected = selections[item.id] !== undefined;
            return (
              <Card 
                className={`mb-3 flex-row items-center justify-between ${isSelected ? 'border-primary-main' : ''}`}
                onTouchEnd={() => toggleSelection(item.id)}
              >
                <View className="flex-1 mr-3">
                  <Typography variant="subtitle">{item.name}</Typography>
                  <Typography variant="caption" color="muted">
                    {item.calories} kcal / 100g
                  </Typography>
                </View>
                
                {isSelected && (
                  <Pressable className="w-24" onPress={(e) => e.stopPropagation()}>
                    <Input 
                      placeholder="Qty (g)" 
                      keyboardType="numeric" 
                      value={selections[item.id].toString()}
                      onChangeText={(val) => updateQuantity(item.id, val)}
                    />
                  </Pressable>
                )}
              </Card>
            );
          }}
        />

        <View className="absolute bottom-0 left-0 right-0 p-screen-x bg-surface-raised border-t border-soft shadow-floating" style={{ paddingBottom: Math.max(insets.bottom, 16) }}>
          <Button 
            title={`Confirm (${Object.keys(selections).length})`} 
            onPress={handleConfirm} 
            disabled={Object.keys(selections).length === 0}
          />
        </View>
      </View>
    </Modal>
  );
}
