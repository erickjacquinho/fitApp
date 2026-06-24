import { Text } from '@/components/ui/text';
import React from 'react';
import { View } from 'react-native';
import { MacroRadialChart } from '@/components/ui/macro-radial-chart';
import { useColorScheme } from 'nativewind';
import { lightTheme, darkTheme } from '@/tokens/theme';

interface DailyBalanceProps {
  protein: number;
  carbs: number;
  fat: number;
  calories: number;
}

export function DailyBalance({ protein, carbs, fat, calories }: DailyBalanceProps) {
  const { colorScheme } = useColorScheme();
  const colors = colorScheme === 'dark' ? darkTheme : lightTheme;

  const totalMacros = protein + carbs + fat;
  const pPct = totalMacros > 0 ? Math.round((protein / totalMacros) * 100) : 0;
  const cPct = totalMacros > 0 ? Math.round((carbs / totalMacros) * 100) : 0;
  const fPct = totalMacros > 0 ? Math.round((fat / totalMacros) * 100) : 0;

  return (
    <View className="py-4 px-4 flex-row items-center justify-between">
      {/* Gráfico Radial */}
      <View className="items-center justify-center">
        <MacroRadialChart 
          protein={protein}
          carbs={carbs}
          fat={fat}
          size={90} 
          strokeWidth={8} 
          backgroundColor={colors.borderSubtle}
          proteinColor={colors.protein}
          carbsColor={colors.carbohydrate}
          fatColor={colors.fat}
        >
          <View className="items-center justify-center">
            <Text variant="subtitle" className="text-text-primary text-xl leading-none font-bold">{Math.round(calories)}</Text>
            <Text variant="caption" className="text-text-secondary font-medium">Cal</Text>
          </View>
        </MacroRadialChart>
      </View>

      {/* Proteína */}
      <View className="items-center justify-center">
        <Text variant="caption" className={`${protein > 0 ? 'text-protein' : 'text-text-disabled'} font-bold`}>{pPct}%</Text>
        <Text variant="text" className="text-text-primary font-bold">{Math.round(protein)} g</Text>
        <Text variant="caption" className="text-text-secondary font-medium">Prot</Text>
      </View>

      {/* Carboidrato */}
      <View className="items-center justify-center">
        <Text variant="caption" className={`${carbs > 0 ? 'text-carbohydrate' : 'text-text-disabled'} font-bold`}>{cPct}%</Text>
        <Text variant="text" className="text-text-primary font-bold">{Math.round(carbs)} g</Text>
        <Text variant="caption" className="text-text-secondary font-medium">Carb</Text>
      </View>

      {/* Gordura */}
      <View className="items-center justify-center">
        <Text variant="caption" className={`${fat > 0 ? 'text-fat' : 'text-text-disabled'} font-bold`}>{fPct}%</Text>
        <Text variant="text" className="text-text-primary font-bold">{Math.round(fat)} g</Text>
        <Text variant="caption" className="text-text-secondary font-medium">Fat</Text>
      </View>
    </View>
  );
}
