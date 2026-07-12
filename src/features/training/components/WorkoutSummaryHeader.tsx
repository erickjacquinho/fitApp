import React from 'react';
import { View } from 'react-native';
import { Trophy } from 'lucide-react-native';
import { Text } from '@/components/ui/text';
import { Icon } from '@/components/ui/icon';

export function WorkoutSummaryHeader() {
  return (
    <View className="mb-section-gap items-center justify-center p-card mt-4">
      <View className="mb-4 h-16 w-16 items-center justify-center rounded-2xl bg-surface border border-border-subtle shadow-sm">
        <Icon as={Trophy} size={32} className="text-primary" />
      </View>
      <Text variant="title" className="text-text-primary font-bold text-center">
        Treino Concluído
      </Text>
      <Text variant="caption" className="text-text-secondary text-center mt-1">
        Suas marcas foram registradas no histórico.
      </Text>
    </View>
  );
}
