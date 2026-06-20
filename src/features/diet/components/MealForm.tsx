import React from 'react';
import { View, Pressable, Platform } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Typography } from '../../../components/atoms/Typography';
import { Input } from '../../../components/atoms/Input';
import { Button } from '../../../components/atoms/Button';
import { Card } from '../../../components/atoms/Card';
import { useMealForm } from '../hooks/useMealForm';
import { FoodSelectorModal } from './FoodSelectorModal';
import { PreviewMacros } from './PreviewMacros';
import { Food } from '../../../db';
import { Icon } from '../../../components/atoms/Icon';
import { COLORS } from '../../../components/atoms/colors';

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
    <KeyboardAwareScrollView
      className="flex-1 bg-surface-app"
      contentContainerClassName="p-screen-x gap-6 pb-40"
      keyboardShouldPersistTaps="handled"
      keyboardDismissMode="on-drag"
      enableOnAndroid={true}
      extraScrollHeight={Platform.OS === 'ios' ? 88 : 20}
    >
        <Card className="gap-4">
          <Typography variant="subtitle">Meal Details</Typography>
          <View className="gap-3">
            <Typography variant="caption">Meal Name (e.g. Breakfast)</Typography>
            <Input 
              value={form.name} 
              onChangeText={(val) => setFormValue('name', val)} 
              placeholder="Name your meal" 
            />
            
            <Typography variant="caption">Preparation State</Typography>
            <Input 
              value={form.preparationState} 
              onChangeText={(val) => setFormValue('preparationState', val)} 
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
                    <Icon name="X" size={20} color={COLORS.error} />
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
          <Button title="Cancel" variant="outline" onPress={goBack} />
        </View>

        <FoodSelectorModal 
          visible={modalVisible} 
          onClose={() => setModalVisible(false)} 
          onConfirm={(selections) => setSelectedItems(selections)} 
        />
    </KeyboardAwareScrollView>
  );
}
