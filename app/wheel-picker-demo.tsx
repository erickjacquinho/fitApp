import React, { useState, useMemo } from 'react';
import { View, FlatList } from 'react-native';
import { Screen } from '@/components/ui/screen';
import { Header } from '@/components/molecules/Header';
import WheelPicker from '@quidone/react-native-wheel-picker';
import { Text } from '@/components/ui/text';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useColorScheme } from 'nativewind';
import { lightTheme, darkTheme } from '@/tokens/theme';

export default function WheelPickerDemoPage() {
  const [weight, setWeight] = useState(20);
  const [intensity, setIntensity] = useState('Moderado');
  const insets = useSafeAreaInsets();
  
  const { colorScheme } = useColorScheme();
  const colors = colorScheme === 'dark' ? darkTheme : lightTheme;

  const numberData = useMemo(() => 
    Array.from({ length: 91 }, (_, i) => ({ value: i + 10, label: `${i + 10} kg` })),
  []);

  const stringData = useMemo(() => 
    ['Leve', 'Moderado', 'Intenso', 'Falha'].map((s) => ({ value: s, label: s })),
  []);

  const renderItem = ({ item }: { item: string }) => {
    if (item === 'numbers') {
      return (
        <View className="gap-6 mb-12 w-full bg-surface-elevated p-6 rounded-2xl border border-border-subtle shadow-floating">
          <View className="items-center mb-2">
            <Text variant="h3" className="font-bold text-primary mb-1">Carga do Exercício</Text>
            <Text variant="p" className="text-secondary text-center">Deslize para selecionar o peso utilizado na última série.</Text>
          </View>
          
          <View className="py-2 w-full h-48 justify-center items-center">
            <WheelPicker
              data={numberData}
              value={weight}
              onValueChanged={({ item: { value } }) => setWeight(value)}
              width="100%"
              itemHeight={48}
              itemTextStyle={{
                fontSize: 22,
                color: colors.textPrimary,
                fontWeight: '600',
              }}
              overlayItemStyle={{
                backgroundColor: colorScheme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)',
                borderRadius: 12,
              }}
            />
          </View>

          <View className="items-center bg-surface p-4 rounded-xl border border-border-subtle mt-2">
            <Text variant="caption" className="text-secondary uppercase tracking-widest mb-1 font-semibold">Valor Registrado</Text>
            <Text variant="h2" className="font-bold text-primary">{weight} kg</Text>
          </View>
        </View>
      );
    }

    if (item === 'strings') {
      return (
        <View className="gap-6 w-full bg-surface-elevated p-6 rounded-2xl border border-border-subtle shadow-floating">
          <View className="items-center mb-2">
            <Text variant="h3" className="font-bold text-primary mb-1">Intensidade (RPE)</Text>
            <Text variant="p" className="text-secondary text-center">Como foi o esforço percebido?</Text>
          </View>
          
          <View className="py-2 w-full h-48 justify-center items-center">
            <WheelPicker
              data={stringData}
              value={intensity}
              onValueChanged={({ item: { value } }) => setIntensity(value)}
              width="100%"
              itemHeight={48}
              itemTextStyle={{
                fontSize: 22,
                color: colors.textPrimary,
                fontWeight: '600',
              }}
              overlayItemStyle={{
                backgroundColor: colorScheme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)',
                borderRadius: 12,
              }}
            />
          </View>

          <View className="items-center bg-surface p-4 rounded-xl border border-border-subtle mt-2">
            <Text variant="caption" className="text-secondary uppercase tracking-widest mb-1 font-semibold">Esforço Registrado</Text>
            <Text variant="h2" className="font-bold text-primary">{intensity}</Text>
          </View>
        </View>
      );
    }

    return null;
  };

  return (
    <Screen
      header={<Header title="Configuração" showBackButton={true} />}
      scrollable={false}
      withPadding={false}
    >
      <FlatList
        data={['numbers', 'strings']}
        keyExtractor={(item) => item}
        renderItem={renderItem}
        className="flex-1 w-full bg-background"
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingTop: 32,
          paddingBottom: 32 + insets.bottom,
        }}
        showsVerticalScrollIndicator={false}
      />
    </Screen>
  );
}

