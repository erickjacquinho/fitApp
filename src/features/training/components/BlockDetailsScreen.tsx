import React, { useEffect, useState, useCallback } from 'react';
import { View, ActivityIndicator, ScrollView, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { ConfirmModal } from '@/components/organisms/ConfirmModal';
import { SessionService } from '@/features/training/services/session-service';
import { useThemeColors } from '@/hooks/use-theme-colors';
import { database } from '@/db';
import TrainingBlock from '@/db/models/TrainingBlock';
import Exercise from '@/db/models/Exercise';
import { BaseCardList } from '@/components/molecules/BaseCardList';

export function BlockDetailsScreen({ blockId }: { blockId: string }) {
  const [block, setBlock] = useState<TrainingBlock | null>(null);
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeSession, setActiveSession] = useState<any>(null);
  const [activeSessionConfirmVisible, setActiveSessionConfirmVisible] = useState(false);
  const { primary } = useThemeColors();
  const router = useRouter();

  const checkActiveSession = useCallback(async () => {
    try {
      const active = await SessionService.getActiveSession();
      setActiveSession(active);
    } catch (err) {
      console.error('Error fetching active session:', err);
    }
  }, []);

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
    checkActiveSession();
  }, [blockId, checkActiveSession]);

  const handleStartSession = async () => {
    if (!block) return;
    const programId = block.programId;

    if (activeSession && activeSession.programId !== programId) {
      setActiveSessionConfirmVisible(true);
      return;
    }
    
    // If there is an active session for this same program, we should resume it
    if (activeSession && activeSession.programId === programId) {
      router.push({
        pathname: '/training/active',
        params: { sessionId: activeSession.id, blockId: block.id },
      });
      return;
    }

    try {
      const targetDate = new Date().toISOString().split('T')[0];
      const session = await SessionService.startSession(programId, targetDate);
      await checkActiveSession();
      router.push({
        pathname: '/training/active',
        params: { sessionId: session.id, blockId: block.id },
      });
    } catch (err) {
      console.error('Error starting session:', err);
    }
  };

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
    <View className="flex-1 py-4 justify-between bg-background">
      <FlatList
        data={exercises}
        keyExtractor={ex => ex.id}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        ListHeaderComponent={
          <View className="mb-4">
            <Text variant="title" className="mb-4 font-bold text-text-primary">
              {block.name}
            </Text>
            <Text variant="label" className="text-text-secondary">
              Exercícios Planejados
            </Text>
          </View>
        }
        ListEmptyComponent={
          <View className="my-8 items-center justify-center py-10">
            <Text variant="text" className="text-text-secondary text-center">
              Nenhum exercício neste treino.
            </Text>
          </View>
        }
        renderItem={({ item: ex, index }) => (
          <BaseCardList
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
        )}
      />

      {/* Button to start workout session */}
      <View className="pb-content-bottom mt-4">
        <Button 
          className="min-h-control-lg bg-primary rounded-md w-full justify-center items-center" 
          onPress={handleStartSession}
          disabled={exercises.length === 0}
        >
          <Text className="text-text-inverse font-bold">Iniciar Treino</Text>
        </Button>
      </View>

      <ConfirmModal
        visible={activeSessionConfirmVisible}
        onCancel={() => setActiveSessionConfirmVisible(false)}
        onConfirm={() => {
          setActiveSessionConfirmVisible(false);
          setTimeout(() => {
            router.push('/training/active');
          }, 200);
        }}
        title="Treino em andamento"
        description="Você já possui uma sessão em andamento. Retome ou finalize o treino primeiro."
        confirmLabel="Ir para o treino"
        cancelLabel="Cancelar"
      />
    </View>
  );
}
