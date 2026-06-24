import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, useWindowDimensions } from 'react-native';
import DraggableFlatList, { RenderItemParams, ScaleDecorator } from 'react-native-draggable-flatlist';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Icon } from '@/components/ui/icon';
import Meal from '../../../db/models/Meal';
import { MealService } from '../services/meal-service';
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { GripVertical } from 'lucide-react-native';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface ReorderMealsModalProps {
  visible: boolean;
  meals: Meal[];
  onClose: () => void;
}

// Each drag row has fixed height so the list height can be computed deterministically.
const ITEM_HEIGHT = 64;
const MAX_LIST_HEIGHT = 360;

export function ReorderMealsModal({ visible, meals, onClose }: ReorderMealsModalProps) {
  const [data, setData] = useState<Meal[]>([]);
  const { height: screenHeight } = useWindowDimensions();

  useEffect(() => {
    if (visible) {
      setData([...meals]);
    }
  }, [visible, meals]);

  const handleSave = async () => {
    const orderedIds = data.map(m => m.id);
    await MealService.updateMealOrder(orderedIds);
    onClose();
  };

  // Compute a bounded list height so DraggableFlatList always has explicit space.
  const listHeight = Math.min(data.length * ITEM_HEIGHT, MAX_LIST_HEIGHT, screenHeight * 0.45);

  const renderItem = ({ item, drag, isActive }: RenderItemParams<Meal>) => {
    return (
      <ScaleDecorator>
        <TouchableOpacity
          accessibilityRole="button"
          accessibilityLabel={`Reordenar ${item.name}`}
          activeOpacity={1}
          onLongPress={drag}
          disabled={isActive}
          className={`mb-2 flex-row items-center justify-between rounded-md border border-border-subtle p-4 ${
            isActive ? 'bg-surface-elevated' : 'bg-surface'
          }`}
          style={[
            { height: ITEM_HEIGHT },
            isActive ? styles.rowActive : styles.rowIdle,
          ]}
        >
          <View style={styles.rowContent}>
            <Text variant="subtitle">{item.name}</Text>
            {item.preparationState ? (
              <Text variant="caption" className="text-text-secondary">
                {item.preparationState}
              </Text>
            ) : null}
          </View>
          <Icon as={GripVertical} className="text-text-secondary" />
        </TouchableOpacity>
      </ScaleDecorator>
    );
  };

  return (
    <Dialog open={visible} onOpenChange={(open) => !open && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Reordenar refeições</DialogTitle>
        </DialogHeader>

        {/* GestureHandlerRootView isolates gesture context so drag doesn't leak to the modal. */}
        <GestureHandlerRootView style={styles.gestureRoot}>
          <Text variant="caption" className="text-text-secondary mb-3">
            Segure e arraste para alterar a ordem.
          </Text>

          <DraggableFlatList
            data={data}
            onDragEnd={({ data: reordered }) => setData(reordered)}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            keyboardShouldPersistTaps="handled"
            activationDistance={8}
            // Explicit height is required for DraggableFlatList inside a Modal/Dialog.
            containerStyle={{ height: listHeight }}
          />

          <View className="pt-4">
            <Button onPress={handleSave}>
              <Text>Salvar ordem</Text>
            </Button>
          </View>
        </GestureHandlerRootView>
      </DialogContent>
    </Dialog>
  );
}

const styles = StyleSheet.create({
  gestureRoot: {
    width: '100%',
  },
  rowIdle: {
    // semantic token bg-surface applied via StyleSheet doesn't work with NativeWind tokens;
    // we keep it transparent and rely on the elevated state for visual feedback only.
    opacity: 1,
  },
  rowActive: {
    opacity: 0.85,
  },
  rowContent: {
    flex: 1,
  },
});
