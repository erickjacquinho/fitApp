import { useState, useEffect } from 'react';
import { useRouter } from 'expo-router';

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
    protein: '',
    carbohydrates: '',
    fat: '',
    calories: '',
  });

  const [isSaving, setIsSaving] = useState(false);
  const [errors, setErrors] = useState<{ name?: string, preparationWeight?: string }>({});
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error', title: string, message?: string } | null>(null);

  const clearFeedback = () => setFeedback(null);

  useEffect(() => {
    if (id) {
      const loadFood = async () => {
        try {
          const food = await FoodService.getById(id);
          setForm({
            name: food.name,
            preparationWeight: food.preparationWeight.toString(),
            description: food.description || '',
            protein: food.protein ? food.protein.toString() : '',
            carbohydrates: food.carbohydrates ? food.carbohydrates.toString() : '',
            fat: food.fat ? food.fat.toString() : '',
            calories: food.calories ? food.calories.toString() : '',
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

    let isValid = true;
    const newErrors: typeof errors = {};

    if (!form.name.trim()) {
      newErrors.name = 'Nome é obrigatório';
      isValid = false;
    }
    if (!form.preparationWeight || parseFloat(form.preparationWeight) <= 0) {
      newErrors.preparationWeight = 'Peso de preparo inválido';
      isValid = false;
    }

    setErrors(newErrors);
    if (!isValid) return;

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
      setFeedback({ type: 'error', title: 'Erro', message: 'Não foi possível salvar o alimento. Verifique os campos e tente novamente.' });
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
    errors,
    feedback,
    clearFeedback,
    goBack: () => router.back(),
  };
}
