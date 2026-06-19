import React from 'react';
import { View, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { Typography } from '../../../components/atoms/Typography';
import { Input } from '../../../components/atoms/Input';
import { Button } from '../../../components/atoms/Button';
import { Card } from '../../../components/atoms/Card';
import { useFoodForm } from '../hooks/useFoodForm';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export function FoodForm() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const insets = useSafeAreaInsets();

  const {
    form,
    setFormValue,
    calculateCalories,
    handleSave,
    isSaving,
    goBack,
  } = useFoodForm(id);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      className="flex-1"
      keyboardVerticalOffset={Platform.OS === 'ios' ? 88 : 0}
    >
      <ScrollView 
        className="flex-1 bg-surface-app" 
        contentContainerClassName="p-screen-x gap-6"
        keyboardShouldPersistTaps="handled"
      >
        <Card className="gap-4">
          <Typography variant="subtitle">Basic Info</Typography>
          <View className="gap-3">
            <Typography variant="caption">Name</Typography>
            <Input 
              value={form.name} 
              onChangeText={(val) => setFormValue('name', val)} 
              placeholder="e.g. Chicken Breast" 
            />
            
            <Typography variant="caption">Preparation Weight (g)</Typography>
            <Input 
              value={form.preparationWeight} 
              onChangeText={(val) => setFormValue('preparationWeight', val)} 
              keyboardType="numeric" 
            />

            <Typography variant="caption">Description (Optional)</Typography>
            <Input 
              value={form.description} 
              onChangeText={(val) => setFormValue('description', val)} 
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
                onChangeText={(val) => setFormValue('protein', val)} 
                onBlur={calculateCalories}
                keyboardType="numeric" 
              />
            </View>
            <View className="flex-1 gap-1">
              <Typography variant="caption">Carbs</Typography>
              <Input 
                value={form.carbohydrates} 
                onChangeText={(val) => setFormValue('carbohydrates', val)} 
                onBlur={calculateCalories}
                keyboardType="numeric" 
              />
            </View>
            <View className="flex-1 gap-1">
              <Typography variant="caption">Fat</Typography>
              <Input 
                value={form.fat} 
                onChangeText={(val) => setFormValue('fat', val)} 
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
          <Button title="Cancel" variant="outline" onPress={goBack} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
