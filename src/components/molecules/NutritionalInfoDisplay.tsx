import { Text } from '@/components/ui/text';
import React from 'react';
import { View } from 'react-native';
import { Macros } from '../../features/diet/utils/macro-utils';

interface NutritionalInfoDisplayProps {
  macros: Macros;
}

export const NutritionalInfoDisplay = ({ macros }: NutritionalInfoDisplayProps) => {
  return (
    <View className="gap-2">
      <Text variant="subtitle" className="mb-1">Valores nutricionais</Text>
      <View className="flex-row justify-between">
        <Text variant="text" color="muted">Proteínas</Text>
        <Text variant="text" className="font-semibold text-text-main">{Math.round(macros.protein)}g</Text>
      </View>
      <View className="flex-row justify-between">
        <Text variant="text" color="muted">Carboidratos</Text>
        <Text variant="text" className="font-semibold text-text-main">{Math.round(macros.carbs)}g</Text>
      </View>
      <View className="flex-row justify-between">
        <Text variant="text" color="muted">Gorduras</Text>
        <Text variant="text" className="font-semibold text-text-main">{Math.round(macros.fat)}g</Text>
      </View>
      <View className="flex-row justify-between pt-2 mt-2 border-t border-soft">
        <Text variant="text" className="font-bold text-text-main">Calorias</Text>
        <Text variant="text" className="font-bold text-accent-main">{Math.round(macros.calories)} kcal</Text>
      </View>
    </View>
  );
};
