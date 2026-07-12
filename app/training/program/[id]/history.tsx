import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import { Screen } from '@/components/ui/screen';
import { Header } from '@/components/molecules/Header';
import { HistoryScreen } from '@/features/training/components/HistoryScreen';
import { Text } from '@/components/ui/text';
import { View } from 'react-native';

export default function ProgramHistoryRoute() {
  const { id } = useLocalSearchParams<{ id: string }>();

  if (!id) {
    return (
      <Screen header={<Header title="Erro" showBackButton />} scrollable={false}>
        <View className="flex-1 items-center justify-center p-4">
          <Text className="text-text-primary text-center">
            ID do programa não fornecido
          </Text>
        </View>
      </Screen>
    );
  }

  return (
    <Screen
      header={<Header title="Histórico do plano" showBackButton />}
      scrollable={true}
      withPadding={true}
    >
      <HistoryScreen programId={id} />
    </Screen>
  );
}
