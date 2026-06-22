import React, { useCallback } from 'react';
import { View, ScrollView, Alert } from 'react-native';
import { useFocusEffect, router } from 'expo-router';
import { Plus, Trash2, Dumbbell, History, Play } from 'lucide-react-native';
import { useProgramList } from '../hooks/useProgramList';
import TrainingBlock from '../../../db/models/TrainingBlock';
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { Card } from "@/components/ui/card";
import { Icon } from '@/components/ui/icon';

export function ProgramListScreen() {
  const {
    programsData,
    activeSession,
    isLoading,
    loadData,
    handleDeleteProgram,
    startSession,
  } = useProgramList();

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [loadData])
  );

  const handleStartSession = (programId: string, programName: string, blocks: TrainingBlock[]) => {
    if (blocks.length === 0) {
      Alert.alert('Sem treinos', 'Este programa não possui blocos de treino. Adicione um bloco primeiro.');
      return;
    }

    if (activeSession) {
      Alert.alert(
        'Treino em andamento',
        'Você já possui uma sessão em andamento. Retome ou finalize o treino primeiro.',
        [
          { text: 'Ir para o treino', onPress: () => router.push('/training/active') },
          { text: 'Cancelar', style: 'cancel' }
        ]
      );
      return;
    }

    Alert.alert(
      'Iniciar treino',
      `Escolha um bloco do programa "${programName}":`,
      [
        ...blocks.map((block) => ({
          text: block.name,
          onPress: () => startSession(programId, block.id),
        })),
        { text: 'Cancelar', style: 'cancel' },
      ]
    );
  };

  return (
    <ScrollView keyboardShouldPersistTaps="handled" className="flex-1 bg-surface-app p-4">
      {/* Quick Action Banner */}
      {activeSession ? (
        <Card className="mb-4 border-accent-main/30 bg-accent-main/5 p-4 flex-row items-center justify-between">
          <View className="flex-1 pr-2">
            <Text variant="subtitle" className="text-accent-main">
              Sessão de treino em andamento
            </Text>
            <Text variant="caption" color="muted">
              Há uma sessão de treino não finalizada.
            </Text>
          </View>
          <Button size="sm" onPress={() => router.push('/training/active')}><Text>Retomar</Text></Button>
        </Card>
      ) : null}

      {/* Main Buttons */}
      <View className="mb-4 flex-row gap-2">
        <Button
          variant="outline"
          onPress={() => router.push('/training/history')}
          className="flex-1"
        >
          <Icon as={History} className="text-accent-main" />
          <Text variant="label">Histórico</Text>
        </Button>

        <Button
          onPress={() => router.push('/training/create-program')}
          className="flex-1"
        >
          <Icon as={Plus} className="text-text-inverse" />
          <Text variant="label" color="inverse">
            Novo programa
          </Text>
        </Button>
      </View>

      {/* Programs List */}
      <Text variant="title" className="mb-3">
        Programas de treino
      </Text>

      {programsData.map(({ program, blocks }) => (
        <Card key={program.id} className="mb-4 p-4">
          <View className="flex-row items-start justify-between">
            <View className="flex-1 pr-2">
              <Text variant="subtitle" className="font-bold">
                {program.name}
              </Text>
              <Text variant="caption" color="muted" className="mt-1">
                {blocks.length} blocos ({blocks.map((b) => b.name).join(', ') || 'sem treinos'})
              </Text>
            </View>

            <Button
              accessibilityLabel={`Excluir ${program.name}`}
              variant="ghost"
              size="icon"
              onPress={() => handleDeleteProgram(program.id, program.name)}
            >
              <Icon as={Trash2} size={16} className="text-tomato-main" />
            </Button>
          </View>

          {blocks.length > 0 && (
            <Button
              variant="outline"
              onPress={() => handleStartSession(program.id, program.name, blocks)}
              className="mt-4"
            >
              <Icon as={Play} size={16} className="text-accent-main" fill="currentColor" />
              <Text variant="label" className="text-accent-main">
                Iniciar treino
              </Text>
            </Button>
          )}
        </Card>
      ))}

      {programsData.length === 0 && !isLoading && (
        <View className="my-12 items-center justify-center py-10">
          <View className="mb-4 h-16 w-16 items-center justify-center rounded-full bg-surface-muted">
            <Icon as={Dumbbell} size={32} className="text-text-muted" />
          </View>
          <Text variant="subtitle" className="mb-2 text-center">
            Nenhum programa de treino
          </Text>
          <Text variant="text" color="muted" className="text-center mb-6">
            Crie suas rotinas e registre sua evolução.
          </Text>
          <Button onPress={() => router.push('/training/create-program')}><Text>Criar primeiro programa</Text></Button>
        </View>
      )}
    </ScrollView>
  );
}
