import { useState, useEffect } from 'react';
import { useRouter } from 'expo-router';
import { Alert } from 'react-native';
import { FoodService } from '../services/food-service';

interface FoodFormState {
  name: string;
  preparationWeight: string;
  description: string;
  protein: string;
  carbohydrates: string;
  fat: string;
  calories: string;
}

export function useFoodForm(id?: string) {
  const router = useRouter();

  const [form, setForm] = useState({
    name: '',
    preparationWeight: '100',
    description: '',
    protein: '0',
    carbohydrates: '0',
    fat: '0',
    calories: '0',
  });

  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (id) {
      const loadFood = async () => {
        try {
          const food = await FoodService.getById(id);
          setForm({
            name: food.name,
            preparationWeight: food.preparationWeight.toString(),
            description: food.description || '',
            protein: food.protein.toString(),
            carbohydrates: food.carbohydrates.toString(),
            fat: food.fat.toString(),
            calories: food.calories.toString(),
          });
        } catch (error) {
          console.error('Error loading food:', error);
        }
      };
      loadFood();
    }
  }, [id]);

  const setFormValue = (field: keyof FoodFormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const calculateCalories = () => {
    const p = parseFloat(form.protein) || 0;
    const c = parseFloat(form.carbohydrates) || 0;
    const f = parseFloat(form.fat) || 0;
    const kcal = p * 4 + c * 4 + f * 9;
    setForm((prev) => ({ ...prev, calories: kcal.toFixed(0) }));
  };

  const handleSave = async () => {
    if (isSaving) return;

    setIsSaving(true);
    try {
      const data = {
        name: form.name,
        preparationWeight: parseFloat(form.preparationWeight) || 0,
        description: form.description,
        protein: parseFloat(form.protein) || 0,
        carbohydrates: parseFloat(form.carbohydrates) || 0,
        fat: parseFloat(form.fat) || 0,
        calories: parseFloat(form.calories) || 0,
      };

      if (id) {
        await FoodService.update(id, data);
      } else {
        await FoodService.create(data);
      }
      router.back();
    } catch (err) {
      console.error('Error saving food:', err);
      Alert.alert('Error', 'Unable to save food. Review the fields and try again.');
    } finally {
      setIsSaving(false);
    }
  };

  return {
    form,
    setFormValue,
    calculateCalories,
    handleSave,
    isSaving,
    goBack: () => router.back(),
  };
}
