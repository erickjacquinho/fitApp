import React, { useState, useEffect } from 'react';
import { View, Modal, TouchableOpacity, StyleSheet } from 'react-native';
import DraggableFlatList, { RenderItemParams, ScaleDecorator } from 'react-native-draggable-flatlist';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Typography } from '../../../components/atoms/Typography';
import { Icon } from '../../../components/atoms/Icon';
import Meal from '../../../db/models/Meal';
import { MealService } from '../services/meal-service';
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";

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
          activeOpacity={1}
          onLongPress={drag}
          disabled={isActive}
          className={`flex-row items-center justify-between p-4 mb-2 rounded-xl border border-soft ${
            isActive ? 'bg-surface-app shadow-md' : 'bg-surface-raised'
          }`}
        >
          <View>
            <Typography variant="subtitle">{item.name}</Typography>
            {item.preparationState ? <Typography variant="caption" color="muted">{item.preparationState}</Typography> : null}
          </View>
          <Icon name="GripVertical" size={20} color="#9ca3af" />
        </TouchableOpacity>
      </ScaleDecorator>
    );
  };

  return (
    <Modal visible={visible} animationType="slide" presentationStyle="pageSheet" onRequestClose={onClose}>
      <GestureHandlerRootView style={styles.container}>
        <View className="flex-1 bg-surface-app pt-6 px-screen-x pb-8">
          <View className="flex-row justify-between items-center mb-6">
            <Typography variant="title">Reordenar Refeições</Typography>
            <TouchableOpacity onPress={onClose}>
              <Typography variant="text" className="text-primary-main font-semibold">Cancelar</Typography>
            </TouchableOpacity>
          </View>
          
          <Typography variant="caption" color="muted" className="mb-4">
            Segure e arraste para alterar a ordem.
          </Typography>

          <DraggableFlatList keyboardShouldPersistTaps="handled"
            data={data}
            onDragEnd={({ data }) => setData(data)}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            containerStyle={styles.listContainer}
          />

          <View className="pt-4">
            <Button onPress={handleSave}><Text>Salvar Nova Ordem</Text></Button>
          </View>
        </View>
      </GestureHandlerRootView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    flex: 1,
  }
});
