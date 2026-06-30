import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { useThemeColors } from '@/hooks/use-theme-colors';
import { database } from '@/db';
import TrainingBlock from '@/db/models/TrainingBlock';
import Exercise from '@/db/models/Exercise';
import { BaseCardList } from '@/components/molecules/BaseCardList';

export function BlockDetailsScreen({ blockId }: { blockId: string }) {
  const [block, setBlock] = useState<TrainingBlock | null>(null);
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { primary } = useThemeColors();
  const router = useRouter();

  useEffect(() => {
    async function loadData() {
      try {
        const foundBlock = await database.get<TrainingBlock>('training_blocks').find(blockId);
        setBlock(foundBlock);
        
        const foundExercises = await foundBlock.exercises.fetch();
        setExercises(foundExercises);
      } catch (e) {
        console.error('Error fetching block details:', e);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, [blockId]);

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center py-10">
        <ActivityIndicator size="large" color={primary} />
      </View>
    );
  }

  if (!block) {
    return (
      <View className="flex-1 items-center justify-center p-4">
        <Text variant="subtitle" className="mb-4">
          Treino não encontrado
        </Text>
        <Button onPress={() => router.back()}><Text>Voltar</Text></Button>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 py-4 pb-content-bottom" keyboardShouldPersistTaps="handled">
      <Text variant="title" className="mb-4 font-bold text-text-primary">
        {block.name}
      </Text>
      
      <Text variant="label" className="mb-3 text-text-secondary">
        Exercícios Planejados
      </Text>

      {exercises.length === 0 ? (
        <View className="my-8 items-center justify-center py-10">
          <Text variant="text" className="text-text-secondary text-center">
            Nenhum exercício neste treino.
          </Text>
        </View>
      ) : (
        exercises.map((ex, index) => (
          <BaseCardList
            key={ex.id}
            isFirst={index === 0}
            isLast={index === exercises.length - 1}
          >
            <View className="flex-1">
              <Text variant="subtitle" className="font-bold text-text-primary">
                {ex.name}
              </Text>
              <Text variant="caption" className="text-text-secondary mt-1">
                Séries: {ex.sets} x {ex.repsMin}-{ex.repsMax} reps
                {ex.repsReserve !== null ? ` • RIR: ${ex.repsReserve}` : ''}
              </Text>
              {ex.advancedTechnique && (
                <Text variant="caption" className="text-primary mt-1">
                  Técnica: {ex.advancedTechnique}
                </Text>
              )}
            </View>
          </BaseCardList>
        ))
      )}
    </ScrollView>
  );
}
