import React from 'react';
import { View } from 'react-native';
import { Plus } from 'lucide-react-native';
import { Card } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import * as Haptics from 'expo-haptics';

export function EmptySessionCard() {
  return (
    <View className="flex-1 justify-center px-4">
      <Card className="items-center justify-center p-6 border-dashed border-2 border-border-subtle bg-surface">
        <Text variant="h3" className="text-text-primary font-bold text-center mb-2">
          Treino Vazio
        </Text>
        <Text variant="text" className="text-text-secondary text-center mb-6">
          Adicione exercícios para começar a treinar.
        </Text>
        <Button
          className="w-full mt-4"
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            console.log('Add exercise');
          }}
        >
          <Icon as={Plus} size={20} className="text-text-inverse mr-2" />
          <Text>Adicionar Exercício</Text>
        </Button>
      </Card>
    </View>
  );
}
