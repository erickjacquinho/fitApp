import React, { useState, useEffect } from 'react';
import { View, Platform , KeyboardAvoidingView, FlatList } from 'react-native';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogBody, DialogFooter } from '@/components/ui/dialog';
import { SearchBar } from '../../../components/molecules/SearchBar';
import { FoodService } from '../services/food-service';
import { Food } from '../../../db';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { Input } from "@/components/ui/input";
import { SIZES } from '@/tokens/sizes';

import { FoodCardBase } from './FoodCardBase';

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
    <Dialog open={visible} onOpenChange={(open) => !open && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Selecionar alimentos</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <View className="flex-1 bg-surface">
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
              renderItem={({ item, index }) => (
                <FoodCardBase
                  title={item.name}
                  subtitle={`${item.preparationWeight} g`}
                  calories={item.calories}
                  protein={item.protein}
                  carbs={item.carbohydrates}
                  fat={item.fat}
                  isFirst={index === 0}
                  isLast={index === foods.length - 1}
                  actionSlot={
                    selections[item.id] !== undefined ? (
                      <View className="w-24">
                        <Input 
                          placeholder="Qtd. (g)"
                          keyboardType="numeric" 
                          value={selections[item.id].toString()}
                          onChangeText={(val) => updateQuantity(item.id, val)}
                        />
                      </View>
                    ) : (
                      <Button variant="secondary" size="sm" onPress={() => toggleSelection(item.id)}>
                        <Text>Adicionar</Text>
                      </Button>
                    )
                  }
                />
              )}
              />
            </KeyboardAvoidingView>

            <DialogFooter>
              <Button className="flex-1" disabled={selectedCount === 0} onPress={handleConfirm}><Text>{`Confirmar ${selectedCount > 0 ? `(${selectedCount})` : ''}`}</Text></Button>
            </DialogFooter>
          </View>
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
}
