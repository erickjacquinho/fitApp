import React, { useState } from 'react';
import { View } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { Screen } from '@/components/ui/screen';
import { Header } from '@/components/molecules/Header';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { ExerciseSelect } from '@/features/training/components/ExerciseSelect';
import { useProgramFormStore } from '@/features/training/store/program-form-store';

export default function ExerciseConfigScreen() {
  const { blockId, exerciseId } = useLocalSearchParams<{ blockId: string; exerciseId: string }>();
  const blocks = useProgramFormStore((state) => state.blocks);
  const updateExercise = useProgramFormStore((state) => state.updateExercise);

  const [nameError, setNameError] = useState<string | null>(null);

  const block = blocks.find((b) => b.id === blockId);
  const exercise = block?.exercises.find((e) => e.id === exerciseId);

  if (!block || !exercise) {
    return (
      <Screen header={<Header title="Configurar Exercício" showBackButton />} scrollable={false}>
        <View className="flex-1 items-center justify-center p-4">
          <Text className="text-typography-secondary text-center">
            Exercício não encontrado. Volte e tente novamente.
          </Text>
          <Button variant="default" className="mt-4" onPress={() => router.back()}>
            <Text>Voltar</Text>
          </Button>
        </View>
      </Screen>
    );
  }

  const handleConfirm = () => {
    if (!exercise.name.trim()) {
      setNameError('Selecione o nome do exercício');
      return;
    }
    setNameError(null);
    router.back();
  };

  return (
    <Screen
      header={<Header title="Configurar Exercício" showBackButton />}
      scrollable={true}
      withPadding={true}
    >
      <View className="py-4 gap-6">
        <Card className="p-4 border border-border-subtle bg-surface gap-4">
          <View>
            <Label className="mb-2">Nome do Exercício</Label>
            <ExerciseSelect
              value={exercise.name}
              onChange={(val) => {
                updateExercise(blockId, exerciseId, 'name', val);
                if (val.trim()) setNameError(null);
              }}
            />
            {nameError && (
              <Text variant="caption" className="text-error mt-1 font-bold">
                {nameError}
              </Text>
            )}
          </View>

          <View className="flex-row gap-3">
            {/* Sets */}
            <View className="flex-1">
              <Label className="mb-2 text-center">Séries</Label>
              <Input
                keyboardType="numeric"
                placeholder="3"
                value={exercise.sets.toString()}
                onChangeText={(val) =>
                  updateExercise(blockId, exerciseId, 'sets', parseInt(val, 10) || 0)
                }
                className="text-center font-bold"
              />
            </View>

            {/* Min Reps */}
            <View className="flex-1">
              <Label className="mb-2 text-center">Reps mín.</Label>
              <Input
                keyboardType="numeric"
                placeholder="8"
                value={exercise.repsMin.toString()}
                onChangeText={(val) =>
                  updateExercise(blockId, exerciseId, 'repsMin', parseInt(val, 10) || 0)
                }
                className="text-center font-bold"
              />
            </View>

            {/* Max Reps */}
            <View className="flex-1">
              <Label className="mb-2 text-center">Reps máx.</Label>
              <Input
                keyboardType="numeric"
                placeholder="12"
                value={exercise.repsMax.toString()}
                onChangeText={(val) =>
                  updateExercise(blockId, exerciseId, 'repsMax', parseInt(val, 10) || 0)
                }
                className="text-center font-bold"
              />
            </View>
          </View>

          <View className="flex-row gap-3">
            {/* Advanced Tech */}
            <View className="flex-[2]">
              <Label className="mb-2">Técnica avançada (opcional)</Label>
              <Input
                placeholder="Ex.: Dropset"
                value={exercise.advancedTechnique || ''}
                onChangeText={(val) =>
                  updateExercise(blockId, exerciseId, 'advancedTechnique', val || undefined)
                }
              />
            </View>

            {/* RIR */}
            <View className="flex-1">
              <Label className="mb-2 text-center">RIR (opcional)</Label>
              <Input
                keyboardType="numeric"
                placeholder="0"
                value={
                  exercise.repsReserve !== undefined && exercise.repsReserve !== null
                    ? exercise.repsReserve.toString()
                    : ''
                }
                onChangeText={(val) =>
                  updateExercise(
                    blockId,
                    exerciseId,
                    'repsReserve',
                    val ? parseInt(val, 10) || 0 : undefined
                  )
                }
                className="text-center"
              />
            </View>
          </View>
        </Card>

        <Button onPress={handleConfirm} className="min-h-control-lg">
          <Text className="text-text-inverse font-bold">Confirmar</Text>
        </Button>
      </View>
    </Screen>
  );
}
