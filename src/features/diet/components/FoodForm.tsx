import React from 'react';
import { View } from 'react-native';

import { useFoodForm } from '../hooks/useFoodForm';
import { useLocalSearchParams } from 'expo-router';
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { FeedbackDialog } from "@/components/organisms/FeedbackDialog";

export function FoodForm() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const {
    form,
    setFormValue,
    calculateCalories,
    handleSave,
    isSaving,
    errors,
    feedback,
    clearFeedback,
    goBack,
  } = useFoodForm(id);

  return (
    <View className="flex-1 gap-6 py-6 pb-form-bottom">
      <Card className="gap-4">
        <Text variant="subtitle">Informações básicas</Text>
        <View className="gap-3">
          <Text variant="caption">Nome</Text>
          <Input 
            value={form.name} 
            onChangeText={(val) => setFormValue('name', val)} 
            placeholder="Ex.: Peito de frango"
            hasError={!!errors.name}
          />
          {errors.name && <Text variant="caption" className="text-error">{errors.name}</Text>}
          
          <Text variant="caption">Peso de preparo (g)</Text>
          <Input 
            value={String(form.preparationWeight ?? '')} 
            onChangeText={(val) => setFormValue('preparationWeight', val)} 
            keyboardType="numeric" 
            hasError={!!errors.preparationWeight}
          />
          {errors.preparationWeight && <Text variant="caption" className="text-error">{errors.preparationWeight}</Text>}

          <Text variant="caption">Descrição (opcional)</Text>
          <Input 
            value={form.description} 
            onChangeText={(val) => setFormValue('description', val)} 
            multiline 
            numberOfLines={3} 
          />
        </View>
      </Card>

      <Card className="gap-4">
        <Text variant="subtitle">Informações nutricionais (por 100 g)</Text>
        <View className="flex-row gap-3">
          <View className="flex-1 gap-1">
            <Text variant="caption">Proteínas</Text>
            <Input 
              value={form.protein} 
              onChangeText={(val) => setFormValue('protein', val)} 
              onBlur={calculateCalories}
              keyboardType="numeric" 
              placeholder="0"
            />
          </View>
          <View className="flex-1 gap-1">
            <Text variant="caption">Carboidratos</Text>
            <Input 
              value={form.carbohydrates} 
              onChangeText={(val) => setFormValue('carbohydrates', val)} 
              onBlur={calculateCalories}
              keyboardType="numeric" 
              placeholder="0"
            />
          </View>
          <View className="flex-1 gap-1">
            <Text variant="caption">Gorduras</Text>
            <Input 
              value={form.fat} 
              onChangeText={(val) => setFormValue('fat', val)} 
              onBlur={calculateCalories}
              keyboardType="numeric" 
              placeholder="0"
            />
          </View>
        </View>

        <View className="pt-3 border-t border-border-subtle flex-row items-center justify-between">
          <Text variant="subtitle">Calorias estimadas</Text>
          <Text variant="title" className="text-primary">
            {form.calories} kcal
          </Text>
        </View>
      </Card>

      <View className="gap-3 pb-page">
        <Button onPress={handleSave} disabled={isSaving}>
          <Text>{isSaving ? 'Salvando...' : 'Salvar alimento'}</Text>
        </Button>
        <Button variant="outline" onPress={goBack} disabled={isSaving}>
          <Text>Cancelar</Text>
        </Button>
      </View>

      <FeedbackDialog
        visible={!!feedback}
        onClose={() => {
          if (feedback?.type === 'success') {
            goBack();
          }
          clearFeedback();
        }}
        state={{
          visible: !!feedback,
          title: feedback?.title || '',
          description: feedback?.message || '',
          isError: feedback?.type === 'error'
        }}
      />
    </View>
  );
}
