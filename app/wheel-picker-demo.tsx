import React, { useState, useMemo } from 'react';
import { View, FlatList } from 'react-native';
import { Screen } from '@/components/ui/screen';
import { Header } from '@/components/molecules/Header';
import { Text } from '@/components/ui/text';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { DragToAdjust } from '@/components/ui/drag-to-adjust';

export default function WheelPickerDemoPage() {
  const [weightIndex, setWeightIndex] = useState(10); // 10 + 10 = 20kg
  const [intensityIndex, setIntensityIndex] = useState(1); // 'Moderado'
  const insets = useSafeAreaInsets();

  const numberData = useMemo(() => 
    Array.from({ length: 91 }, (_, i) => ({ value: i + 10, label: `${i + 10} kg` })),
  []);

  const stringData = useMemo(() => 
    ['Leve', 'Moderado', 'Intenso', 'Falha'].map((s) => ({ value: s, label: s })),
  []);

  const renderItem = ({ item }: { item: string }) => {
    if (item === 'numbers') {
      return (
        <View className="gap-6 mb-12 w-full bg-surface p-6 rounded-2xl border border-border-subtle shadow-floating">
          <View className="items-center mb-2">
            <Text variant="h3" className="font-bold text-primary mb-1">Carga do Exercício</Text>
            <Text variant="p" className="text-secondary text-center">Deslize para cima ou baixo para alterar.</Text>
          </View>
          
          <DragToAdjust
            data={numberData}
            selectedIndex={weightIndex}
            onIndexChanged={setWeightIndex}
            sensitivity={25}
          />
        </View>
      );
    }

    if (item === 'strings') {
      return (
        <View className="gap-6 w-full bg-surface p-6 rounded-2xl border border-border-subtle shadow-floating">
          <View className="items-center mb-2">
            <Text variant="h3" className="font-bold text-primary mb-1">Intensidade (RPE)</Text>
            <Text variant="p" className="text-secondary text-center">Deslize para cima ou baixo para alterar.</Text>
          </View>
          
          <DragToAdjust
            data={stringData}
            selectedIndex={intensityIndex}
            onIndexChanged={setIntensityIndex}
            sensitivity={40}
          />
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

