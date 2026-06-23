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
        <Text variant="text" className="text-text-secondary">Proteínas</Text>
        <Text variant="text" className="font-semibold text-text-primary">{Math.round(macros.protein)}g</Text>
      </View>
      <View className="flex-row justify-between">
        <Text variant="text" className="text-text-secondary">Carboidratos</Text>
        <Text variant="text" className="font-semibold text-text-primary">{Math.round(macros.carbs)}g</Text>
      </View>
      <View className="flex-row justify-between">
        <Text variant="text" className="text-text-secondary">Gorduras</Text>
        <Text variant="text" className="font-semibold text-text-primary">{Math.round(macros.fat)}g</Text>
      </View>
      <View className="mt-2 flex-row justify-between border-t border-border-subtle pt-2">
        <Text variant="text" className="font-bold text-text-primary">Calorias</Text>
        <Text variant="text" className="font-bold text-primary">{Math.round(macros.calories)} kcal</Text>
      </View>
    </View>
  );
};
