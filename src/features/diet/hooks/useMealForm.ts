import { useState, useEffect } from 'react';
import { useRouter } from 'expo-router';
import { MealService } from '../services/meal-service';
import Food from '../../../db/models/Food';
import { database } from '../../../db';
import Meal from '../../../db/models/Meal';
import { capitalizeWords } from '../../../lib/utils';
export function useMealForm(mealId?: string) {
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(!!mealId);
  
  const [form, setForm] = useState({
    name: '',
    quantity: '1',
    preparationState: 'Raw',
  });

  const [selectedItems, setSelectedItems] = useState<{ food: Food; quantity: number }[]>([]);

  useEffect(() => {
    if (!mealId) return;

    const loadMealData = async () => {
      try {
        const meal = await database.get<Meal>('meals').find(mealId);
        setForm({
          name: meal.name,
          quantity: String(meal.quantity || 1),
          preparationState: meal.preparationState || 'Raw',
        });

        const items = await meal.items.fetch();
        const loadedItems = await Promise.all(
          items.map(async (item) => {
            const food = await item.food.fetch();
            return {
              food,
              quantity: item.quantity,
            };
          })
        );
        setSelectedItems(loadedItems.filter((i): i is { food: Food; quantity: number } => i.food !== null));
      } catch (error) {
        console.error('Failed to load meal for editing:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadMealData();
  }, [mealId]);

  const setFormValue = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    const formattedName = capitalizeWords(form.name);
    const mealData = {
      name: formattedName,
      quantity: parseFloat(form.quantity) || 1,
      preparationState: form.preparationState,
    };

    const items = selectedItems.map((item) => ({
      foodId: item.food.id,
      quantity: item.quantity,
    }));

    if (mealId) {
      await MealService.updateWithItems(mealId, mealData, items);
    } else {
      await MealService.createWithItems(mealData, items);
    }
    router.back();
  };

  const removeFood = (foodId: string) => {
    setSelectedItems((prev) => prev.filter((item) => item.food.id !== foodId));
  };

  return {
    form,
    setFormValue,
    selectedItems,
    setSelectedItems,
    modalVisible,
    setModalVisible,
    handleSave,
    removeFood,
    isLoading,
    goBack: () => router.back(),
  };
}
