import React, { useState, useEffect } from 'react';
import { View, ScrollView } from 'react-native';
import { Typography } from '../../../components/atoms/Typography';
import { Input } from '../../../components/atoms/Input';
import { Button } from '../../../components/atoms/Button';
import { Card } from '../../../components/atoms/Card';
import { FoodService } from '../services/food-service';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export function FoodForm() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const insets = useSafeAreaInsets();

  const [form, setForm] = useState({
    name: '',
    preparationWeight: '100',
    description: '',
    protein: '0',
    carbohydrates: '0',
    fat: '0',
    calories: '0',
  });

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

  const handleSave = async () => {
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
  };

  const calculateCalories = () => {
    const p = parseFloat(form.protein) || 0;
    const c = parseFloat(form.carbohydrates) || 0;
    const f = parseFloat(form.fat) || 0;
    const kcal = (p * 4) + (c * 4) + (f * 9);
    setForm(prev => ({ ...prev, calories: kcal.toFixed(0) }));
  };

  return (
    <ScrollView className="flex-1 bg-surface-app" contentContainerClassName="p-screen-x gap-6">
      <Card className="gap-4">
        <Typography variant="subtitle">Basic Info</Typography>
        <View className="gap-3">
          <Typography variant="caption">Name</Typography>
          <Input 
            value={form.name} 
            onChangeText={(name) => setForm(p => ({ ...p, name }))} 
            placeholder="e.g. Chicken Breast" 
          />
          
          <Typography variant="caption">Preparation Weight (g)</Typography>
          <Input 
            value={form.preparationWeight} 
            onChangeText={(preparationWeight) => setForm(p => ({ ...p, preparationWeight }))} 
            keyboardType="numeric" 
          />

          <Typography variant="caption">Description (Optional)</Typography>
          <Input 
            value={form.description} 
            onChangeText={(description) => setForm(p => ({ ...p, description }))} 
            multiline 
            numberOfLines={3} 
          />
        </View>
      </Card>

      <Card className="gap-4">
        <Typography variant="subtitle">Nutritional Info (per 100g)</Typography>
        <View className="flex-row gap-3">
          <View className="flex-1 gap-1">
            <Typography variant="caption">Protein</Typography>
            <Input 
              value={form.protein} 
              onChangeText={(protein) => setForm(p => ({ ...p, protein }))} 
              onBlur={calculateCalories}
              keyboardType="numeric" 
            />
          </View>
          <View className="flex-1 gap-1">
            <Typography variant="caption">Carbs</Typography>
            <Input 
              value={form.carbohydrates} 
              onChangeText={(carbohydrates) => setForm(p => ({ ...p, carbohydrates }))} 
              onBlur={calculateCalories}
              keyboardType="numeric" 
            />
          </View>
          <View className="flex-1 gap-1">
            <Typography variant="caption">Fat</Typography>
            <Input 
              value={form.fat} 
              onChangeText={(fat) => setForm(p => ({ ...p, fat }))} 
              onBlur={calculateCalories}
              keyboardType="numeric" 
            />
          </View>
        </View>

        <View className="pt-3 border-t border-soft flex-row items-center justify-between">
          <Typography variant="subtitle">Estimated Calories</Typography>
          <Typography variant="title" className="text-primary-main">
            {form.calories} kcal
          </Typography>
        </View>
      </Card>

      <View className="gap-3 pb-10">
        <Button title="Save Food" onPress={handleSave} />
        <Button title="Cancel" variant="outline" onPress={() => router.back()} />
      </View>
    </ScrollView>
  );
}
