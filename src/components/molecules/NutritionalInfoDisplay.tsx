import React from 'react';
import { View } from 'react-native';
import { Typography } from '../atoms/Typography';
import { Macros } from '../../features/diet/utils/macro-utils';

interface NutritionalInfoDisplayProps {
  macros: Macros;
}

export const NutritionalInfoDisplay = ({ macros }: NutritionalInfoDisplayProps) => {
  return (
    <View className="gap-2">
      <Typography variant="subtitle" className="mb-1">Valores Nutricionais</Typography>
      <View className="flex-row justify-between">
        <Typography variant="text" color="muted">Proteínas</Typography>
        <Typography variant="text" className="font-semibold text-text-primary">{Math.round(macros.protein)}g</Typography>
      </View>
      <View className="flex-row justify-between">
        <Typography variant="text" color="muted">Carboidratos</Typography>
        <Typography variant="text" className="font-semibold text-text-primary">{Math.round(macros.carbs)}g</Typography>
      </View>
      <View className="flex-row justify-between">
        <Typography variant="text" color="muted">Gorduras</Typography>
        <Typography variant="text" className="font-semibold text-text-primary">{Math.round(macros.fat)}g</Typography>
      </View>
      <View className="flex-row justify-between pt-2 mt-2 border-t border-soft">
        <Typography variant="text" className="font-bold text-text-primary">Calorias</Typography>
        <Typography variant="text" className="font-bold text-primary-main">{Math.round(macros.calories)} kcal</Typography>
      </View>
    </View>
  );
};
