import { useState } from 'react';
import { useRouter } from 'expo-router';
import { MealService } from '../services/meal-service';
import Food from '../../../db/models/Food';

export function useMealForm() {
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);
  
  const [form, setForm] = useState({
    name: '',
    quantity: '1',
    preparationState: 'Raw',
  });

  const [selectedItems, setSelectedItems] = useState<Array<{ food: Food; quantity: number }>>([]);

  const setFormValue = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    const mealData = {
      name: form.name,
      quantity: parseFloat(form.quantity) || 1,
      preparationState: form.preparationState,
    };

    const items = selectedItems.map((item) => ({
      foodId: item.food.id,
      quantity: item.quantity,
    }));

    await MealService.createWithItems(mealData, items);
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
    goBack: () => router.back(),
  };
}
