import React from 'react';
import { View, FlatList, Modal, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import withObservables from '@nozbe/with-observables';
import { database } from '../../../db';
import Meal from '../../../db/models/Meal';
import { Q } from '@nozbe/watermelondb';

export interface MealSelectorModalProps {
  visible: boolean;
  onClose: () => void;
  onSelect: (mealId: string) => void;
  meals: Meal[];
}

function MealSelectorModalComponent({ visible, onClose, onSelect, meals }: MealSelectorModalProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View className="flex-1 bg-black/50 justify-end">
          <TouchableWithoutFeedback>
            <View className="bg-background rounded-t-3xl p-6 min-h-[50%]">
              <View className="flex-row justify-between items-center mb-6">
                <Text variant="title">Selecionar Refeição</Text>
                <TouchableOpacity onPress={onClose} className="p-2">
                  <Text className="text-text-secondary">Fechar</Text>
                </TouchableOpacity>
              </View>

          <FlatList
            data={meals}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity 
                className="py-4 border-b border-border-subtle"
                onPress={() => onSelect(item.id)}
              >
                <Text variant="subtitle">{item.name}</Text>
              </TouchableOpacity>
            )}
            ListEmptyComponent={
              <View className="py-8 items-center">
                <Text className="text-text-secondary">Nenhuma refeição encontrada para hoje.</Text>
              </View>
            }
          />
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const enhance = withObservables([], () => {
  const today = new Date().toISOString().split('T')[0];
  return {
    meals: database.get<Meal>('meals').query(
      Q.where('target_date', today),
      Q.sortBy('order_index', Q.asc)
    )
  };
});

export const MealSelectorModal = enhance(MealSelectorModalComponent);
