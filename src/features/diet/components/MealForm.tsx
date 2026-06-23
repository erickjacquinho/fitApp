import React from 'react';
import { View, Pressable, Platform } from 'react-native';
import { KeyboardAvoidingView, ScrollView } from 'react-native';
import { useMealForm } from '../hooks/useMealForm';
import { FoodSelectorModal } from './FoodSelectorModal';
import { PreviewMacros } from './PreviewMacros';
import { Icon } from '@/components/ui/icon';
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { X } from 'lucide-react-native';
import { SIZES } from '@/tokens/sizes';

export function MealForm() {
  const {
    form,
    setFormValue,
    selectedItems,
    setSelectedItems,
    modalVisible,
    setModalVisible,
    handleSave,
    removeFood,
    goBack,
  } = useMealForm();

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
          <Text variant="subtitle">Detalhes da refeição</Text>
          <View className="gap-3">
            <Text variant="caption">Nome da refeição</Text>
            <Input 
              value={form.name} 
              onChangeText={(val) => setFormValue('name', val)} 
              placeholder="Ex.: Café da manhã"
            />
            
            <Text variant="caption">Estado de preparo</Text>
            <Input 
              value={form.preparationState} 
              onChangeText={(val) => setFormValue('preparationState', val)} 
              placeholder="Ex.: Cru, cozido"
            />
          </View>
        </Card>

        <View className="gap-4">
          <View className="flex-row items-center justify-between">
            <Text variant="subtitle">Alimentos</Text>
            <Button size="sm" variant="secondary" onPress={() => setModalVisible(true)}><Text>Adicionar alimento</Text></Button>
          </View>

          {selectedItems.length > 0 ? (
            <View className="gap-3">
              {selectedItems.map((item) => (
                <Card key={item.food.id} className="flex-row items-center justify-between py-3">
                  <View className="flex-1">
                    <Text variant="subtitle">{item.food.name}</Text>
                    <Text variant="caption" color="muted">{item.quantity}g</Text>
                  </View>
                  <Button
                    accessibilityLabel={`Remover ${item.food.name}`}
                    variant="ghost"
                    size="icon"
                    onPress={() => removeFood(item.food.id)}
                  >
                    <Icon as={X} className="text-tomato-main" />
                  </Button>
                </Card>
              ))}
              
              <Card className="mt-2">
                <Text variant="caption" className="mb-2">Macros totais</Text>
                <PreviewMacros items={selectedItems} />
              </Card>
            </View>
          ) : (
            <Card className="items-center py-10 border-dashed">
              <Text color="muted">Nenhum alimento adicionado.</Text>
            </Card>
          )}
        </View>

        <View className="gap-3 pb-page">
          <Button onPress={handleSave} disabled={selectedItems.length === 0}><Text>Salvar refeição</Text></Button>
          <Button variant="outline" onPress={goBack}><Text>Cancelar</Text></Button>
        </View>

        <FoodSelectorModal 
          visible={modalVisible} 
          onClose={() => setModalVisible(false)} 
          onConfirm={(selections) => setSelectedItems(selections)} 
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
