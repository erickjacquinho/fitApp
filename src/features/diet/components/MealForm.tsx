import React, { useState } from 'react';
import { View, ScrollView, Pressable } from 'react-native';
import { Typography } from '../../../components/atoms/Typography';
import { Input } from '../../../components/atoms/Input';
import { Button } from '../../../components/atoms/Button';
import { Card } from '../../../components/atoms/Card';
import { MealService } from '../services/meal-service';
import { FoodSelectorModal } from './FoodSelectorModal';
import { PreviewMacros } from './PreviewMacros';
import { useRouter } from 'expo-router';
import { Food } from '../../../db';
import { Icon } from '../../../components/atoms/Icon';

export function MealForm() {
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);
  
  const [form, setForm] = useState({
    name: '',
    quantity: '1',
    preparationState: 'Raw',
  });

  const [selectedItems, setSelectedItems] = useState<Array<{ food: Food; quantity: number }>>([]);

  const handleSave = async () => {
    const mealData = {
      name: form.name,
      quantity: parseFloat(form.quantity) || 1,
      preparationState: form.preparationState,
    };

    const items = selectedItems.map(item => ({
      foodId: item.food.id,
      quantity: item.quantity,
    }));

    await MealService.createWithItems(mealData, items);
    router.back();
  };

  const removeFood = (foodId: string) => {
    setSelectedItems(prev => prev.filter(item => item.food.id !== foodId));
  };

  return (
    <ScrollView className="flex-1 bg-surface-app" contentContainerClassName="p-screen-x gap-6">
      <Card className="gap-4">
        <Typography variant="subtitle">Meal Details</Typography>
        <View className="gap-3">
          <Typography variant="caption">Meal Name (e.g. Breakfast)</Typography>
          <Input 
            value={form.name} 
            onChangeText={(name) => setForm(p => ({ ...p, name }))} 
            placeholder="Name your meal" 
          />
          
          <Typography variant="caption">Preparation State</Typography>
          <Input 
            value={form.preparationState} 
            onChangeText={(preparationState) => setForm(p => ({ ...p, preparationState }))} 
            placeholder="e.g. Raw, Cooked"
          />
        </View>
      </Card>

      <View className="gap-4">
        <View className="flex-row items-center justify-between">
          <Typography variant="subtitle">Foods</Typography>
          <Button title="Add Food" size="sm" variant="secondary" onPress={() => setModalVisible(true)} />
        </View>

        {selectedItems.length > 0 ? (
          <View className="gap-3">
            {selectedItems.map((item) => (
              <Card key={item.food.id} className="flex-row items-center justify-between py-3">
                <View className="flex-1">
                  <Typography variant="subtitle">{item.food.name}</Typography>
                  <Typography variant="caption" color="muted">{item.quantity}g</Typography>
                </View>
                <Pressable onPress={() => removeFood(item.food.id)}>
                  <Icon name="X" size={20} color="var(--color-tomato-main)" />
                </Pressable>
              </Card>
            ))}
            
            <View className="mt-2 p-4 bg-surface-raised rounded-md border border-soft">
              <Typography variant="caption" className="mb-2">Total Macros</Typography>
              <PreviewMacros items={selectedItems} />
            </View>
          </View>
        ) : (
          <Card className="items-center py-10 border-dashed">
            <Typography color="muted">No foods added yet</Typography>
          </Card>
        )}
      </View>

      <View className="gap-3 pb-10">
        <Button title="Save Meal" onPress={handleSave} disabled={selectedItems.length === 0} />
        <Button title="Cancel" variant="outline" onPress={() => router.back()} />
      </View>

      <FoodSelectorModal 
        visible={modalVisible} 
        onClose={() => setModalVisible(false)} 
        onConfirm={(selections) => setSelectedItems(selections)} 
      />
    </ScrollView>
  );
}
