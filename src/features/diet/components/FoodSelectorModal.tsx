import React, { useState, useEffect } from 'react';
import { View, Platform , KeyboardAvoidingView, FlatList } from 'react-native';

import { BottomSheetModal } from '../../../components/organisms/BottomSheetModal';
import { SearchBar } from '../../../components/molecules/SearchBar';
import { FoodService } from '../services/food-service';
import { Food } from '../../../db';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { Input } from "@/components/ui/input";
import { SIZES } from '@/tokens/sizes';

interface FoodSelectorModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: (selections: { food: Food; quantity: number }[]) => void;
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

  const selectedCount = Object.keys(selections).length;

  return (
    <BottomSheetModal 
      visible={visible} 
      onClose={onClose} 
      title="Selecionar alimentos"
    >
      <View className="flex-1 bg-surface-app">
        <View className="py-compact">
          <SearchBar value={search} onChangeText={setSearch} placeholder="Buscar alimentos..." />
        </View>

        <KeyboardAvoidingView
          className="flex-1"
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          keyboardVerticalOffset={Platform.OS === 'ios' ? SIZES.keyboardOffsetSheetIos : SIZES.keyboardOffsetSheetAndroid}
        >
          <FlatList
            data={foods}
            keyExtractor={(item) => item.id}
            contentContainerClassName="pb-overlay-action"
            keyboardShouldPersistTaps="handled"
            keyboardDismissMode="on-drag"
          renderItem={({ item }) => (
            <View className="flex-row items-center py-3 border-b border-soft">
              <View className="flex-1 mr-3">
                <Text variant="subtitle">{item.name}</Text>
                <Text variant="caption" color="muted">
                  {item.calories} kcal / 100g
                </Text>
              </View>

              {selections[item.id] !== undefined ? (
                <View className="w-24">
                  <Input 
                    placeholder="Qtd. (g)"
                    keyboardType="numeric" 
                    value={selections[item.id].toString()}
                    onChangeText={(val) => updateQuantity(item.id, val)}
                  />
                </View>
              ) : (
                <Button variant="secondary" size="sm" onPress={() => toggleSelection(item.id)}><Text>Adicionar</Text></Button>
              )}
            </View>
          )}
          />
        </KeyboardAvoidingView>

        <View className="absolute bottom-0 left-0 right-0 bg-surface-app border-t border-soft pt-4 mt-auto">
          <Button disabled={selectedCount === 0} onPress={handleConfirm}><Text>{`Confirmar ${selectedCount > 0 ? `(${selectedCount})` : ''}`}</Text></Button>
        </View>
      </View>
    </BottomSheetModal>
  );
}
