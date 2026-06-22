import React, { useState, useEffect } from 'react';
import { View, Modal, TouchableOpacity, StyleSheet } from 'react-native';
import DraggableFlatList, { RenderItemParams, ScaleDecorator } from 'react-native-draggable-flatlist';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Icon } from '@/components/ui/icon';
import Meal from '../../../db/models/Meal';
import { MealService } from '../services/meal-service';
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { GripVertical } from 'lucide-react-native';

interface ReorderMealsModalProps {
  visible: boolean;
  meals: Meal[];
  onClose: () => void;
}

export function ReorderMealsModal({ visible, meals, onClose }: ReorderMealsModalProps) {
  const [data, setData] = useState<Meal[]>([]);

  useEffect(() => {
    if (visible) {
      setData(meals);
    }
  }, [visible, meals]);

  const handleSave = async () => {
    const orderedIds = data.map(m => m.id);
    await MealService.updateMealOrder(orderedIds);
    onClose();
  };

  const renderItem = ({ item, drag, isActive }: RenderItemParams<Meal>) => {
    return (
      <ScaleDecorator>
        <TouchableOpacity
          accessibilityRole="button"
          accessibilityLabel={`Reordenar ${item.name}`}
          activeOpacity={1}
          onLongPress={drag}
          disabled={isActive}
          className={`mb-2 flex-row items-center justify-between rounded-md border border-soft p-4 ${
            isActive ? 'bg-surface-app' : 'bg-surface-raised'
          }`}
        >
          <View>
            <Text variant="subtitle">{item.name}</Text>
            {item.preparationState ? <Text variant="caption" color="muted">{item.preparationState}</Text> : null}
          </View>
          <Icon as={GripVertical} className="text-text-muted" />
        </TouchableOpacity>
      </ScaleDecorator>
    );
  };

  return (
    <Modal visible={visible} animationType="slide" presentationStyle="pageSheet" onRequestClose={onClose}>
      <GestureHandlerRootView style={styles.container}>
        <View className="flex-1 bg-surface-app pt-6 px-screen-x pb-8">
          <View className="flex-row justify-between items-center mb-6">
            <Text variant="title">Reordenar refeições</Text>
            <Button variant="ghost" onPress={onClose}>
              <Text color="accent">Cancelar</Text>
            </Button>
          </View>
          
          <Text variant="caption" color="muted" className="mb-4">
            Segure e arraste para alterar a ordem.
          </Text>

          <DraggableFlatList keyboardShouldPersistTaps="handled"
            data={data}
            onDragEnd={({ data }) => setData(data)}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            containerStyle={styles.listContainer}
          />

          <View className="pt-4">
            <Button onPress={handleSave}><Text>Salvar ordem</Text></Button>
          </View>
        </View>
      </GestureHandlerRootView>
    </Modal>
  );
}

// DraggableFlatList and GestureHandlerRootView require React Native style objects.
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    flex: 1,
  }
});
