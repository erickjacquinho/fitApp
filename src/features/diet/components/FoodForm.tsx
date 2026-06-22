import React from 'react';
import { View, Platform } from 'react-native';
import { KeyboardAvoidingView, ScrollView } from 'react-native';
import { useFoodForm } from '../hooks/useFoodForm';
import { useLocalSearchParams } from 'expo-router';
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { SIZES } from '@/tokens/sizes';

export function FoodForm() {
  const { id } = useLocalSearchParams<{ id: string }>();

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
      className="flex-1"
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? SIZES.keyboardOffsetScreenIos : SIZES.keyboardOffsetScreenAndroid}
    >
      <ScrollView
        className="flex-1 bg-surface-app"
        contentContainerClassName="p-screen-x gap-6 pb-form-bottom"
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
      >
        <Card className="gap-4">
          <Text variant="subtitle">Informações básicas</Text>
          <View className="gap-3">
            <Text variant="caption">Nome</Text>
            <Input 
              value={form.name} 
              onChangeText={(val) => setFormValue('name', val)} 
              placeholder="Ex.: Peito de frango"
            />
            
            <Text variant="caption">Peso de preparo (g)</Text>
            <Input 
              value={String(form.preparationWeight ?? '')} 
              onChangeText={(val) => setFormValue('preparationWeight', val)} 
              keyboardType="numeric" 
            />

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
                value={String(form.protein ?? '')} 
                onChangeText={(val) => setFormValue('protein', val)} 
                onBlur={calculateCalories}
                keyboardType="numeric" 
              />
            </View>
            <View className="flex-1 gap-1">
              <Text variant="caption">Carboidratos</Text>
              <Input 
                value={String(form.carbohydrates ?? '')} 
                onChangeText={(val) => setFormValue('carbohydrates', val)} 
                onBlur={calculateCalories}
                keyboardType="numeric" 
              />
            </View>
            <View className="flex-1 gap-1">
              <Text variant="caption">Gorduras</Text>
              <Input 
                value={String(form.fat ?? '')} 
                onChangeText={(val) => setFormValue('fat', val)} 
                onBlur={calculateCalories}
                keyboardType="numeric" 
              />
            </View>
          </View>

          <View className="pt-3 border-t border-soft flex-row items-center justify-between">
            <Text variant="subtitle">Calorias estimadas</Text>
            <Text variant="title" className="text-accent-main">
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
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
