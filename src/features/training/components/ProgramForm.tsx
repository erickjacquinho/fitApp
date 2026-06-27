import React from 'react';
import { View, Platform , KeyboardAvoidingView, ScrollView } from 'react-native';

import { Plus, Trash2, Layers } from 'lucide-react-native';
import { EmptyState } from '../../../components/molecules/EmptyState';
import { useProgramForm } from '../hooks/useProgramForm';
import { BlockDTO, ExerciseDTO } from '../types';
import { ExerciseSelect } from './ExerciseSelect';
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { Input } from "@/components/ui/input";
import { Icon } from '@/components/ui/icon';
import { Label } from '@/components/ui/label';
import { FeedbackDialog } from '@/components/organisms/FeedbackDialog';
import { SIZES } from '@/tokens/sizes';
import { router } from 'expo-router';

export function ProgramForm() {
  const {
    programName,
    setProgramName,
    blocks,
    handleAddBlock,
    handleRemoveBlock,
    handleBlockNameChange,
    handleAddExercise,
    handleRemoveExercise,
    handleExerciseChange,
    handleSave,
    isSaving,
    errors,
    feedback,
    clearFeedback,
  } = useProgramForm();

  return (
    <View className="py-4 pb-long-form-bottom">
      {errors.global && (
        <Text variant="caption" className="text-error text-center my-2">
          {errors.global}
        </Text>
      )}

      <View className="mb-6 bg-surface p-4 rounded-xl border border-border-subtle">
        <Label className="mb-2">Nome do Programa</Label>
        <Input
          placeholder="Ex.: Hipertrofia ABC"
          value={programName}
          onChangeText={setProgramName}
          className="mb-4 font-bold"
          hasError={!!errors.programName}
        />
        {errors.programName && (
          <Text variant="caption" className="text-error mt-1">
            {errors.programName}
          </Text>
        )}
      </View>

      <View className="mb-4 flex-row items-center justify-between border-b border-border-subtle pb-2">
        <Text variant="title">Blocos de treino</Text>
        <Button
          variant="secondary"
          size="sm"
          onPress={handleAddBlock}
        >
          <Icon as={Plus} size={16} />
          <Text variant="caption">
            Adicionar bloco
          </Text>
        </Button>
      </View>

      {blocks.map((block, bIdx) => (
        <View
          key={block.id}
          className="mb-4 rounded-md border border-border-subtle bg-surface-elevated p-4"
        >
          <View className="flex-row items-center justify-between mb-3 gap-2">
            <Input
              placeholder="Ex.: Treino A"
              value={block.name}
              onChangeText={(val) => handleBlockNameChange(block.id, val)}
              className="flex-1 font-bold"
              hasError={!!errors.blockNames?.[block.id]}
            />
            <Button
              accessibilityLabel={`Excluir bloco ${block.name || bIdx + 1}`}
              variant="ghost"
              size="icon"
              onPress={() => handleRemoveBlock(block.id)}
            >
              <Icon as={Trash2} size={16} className="text-error" />
            </Button>
          </View>
          {errors.blockNames?.[block.id] && (
            <Text variant="caption" className="text-error mb-4">
              {errors.blockNames[block.id]}
            </Text>
          )}

          {/* Exercises */}
          <Text variant="label" className="mb-2 text-text-secondary">
            Exercícios
          </Text>

          {block.exercises.map((exercise, eIdx) => (
            <View
              key={exercise.id}
              className="mb-3 rounded-md border border-border-subtle bg-surface p-3"
            >
              <View className="flex-row justify-between items-center mb-2 gap-2">
                <ExerciseSelect
                  value={exercise.name}
                  onChange={(val) =>
                    handleExerciseChange(block.id, exercise.id, 'name', val)
                  }
                />
                {errors.exercises?.[exercise.id] && (
                  <Text variant="caption" className="text-error mt-1">
                    {errors.exercises[exercise.id]}
                  </Text>
                )}
                <Button
                  accessibilityLabel={`Excluir exercício ${exercise.name || eIdx + 1}`}
                  variant="ghost"
                  size="icon"
                  onPress={() => handleRemoveExercise(block.id, exercise.id)}
                >
                  <Icon as={Trash2} size={16} className="text-error" />
                </Button>
              </View>

              <View className="flex-row gap-2">
                {/* Sets */}
                <View className="flex-1">
                  <Text variant="caption" className="text-text-secondary mb-1 text-center">
                    Séries
                  </Text>
                  <Input
                    keyboardType="numeric"
                    placeholder="3"
                    value={exercise.sets.toString()}
                    onChangeText={(val) =>
                      handleExerciseChange(
                        block.id,
                        exercise.id,
                        'sets',
                        parseInt(val, 10) || 0
                      )
                    }
                    className="px-2 text-center font-bold"
                  />
                </View>

                {/* Min Reps */}
                <View className="flex-1">
                  <Text variant="caption" className="text-text-secondary mb-1 text-center">
                    Reps mín.
                  </Text>
                  <Input
                    keyboardType="numeric"
                    placeholder="8"
                    value={exercise.repsMin.toString()}
                    onChangeText={(val) =>
                      handleExerciseChange(
                        block.id,
                        exercise.id,
                        'repsMin',
                        parseInt(val, 10) || 0
                      )
                    }
                    className="px-2 text-center font-bold"
                  />
                </View>

                {/* Max Reps */}
                <View className="flex-1">
                  <Text variant="caption" className="text-text-secondary mb-1 text-center">
                    Reps máx.
                  </Text>
                  <Input
                    keyboardType="numeric"
                    placeholder="12"
                    value={exercise.repsMax.toString()}
                    onChangeText={(val) =>
                      handleExerciseChange(
                        block.id,
                        exercise.id,
                        'repsMax',
                        parseInt(val, 10) || 0
                      )
                    }
                    className="px-2 text-center font-bold"
                  />
                </View>
              </View>

              <View className="flex-row gap-2 mt-2">
                {/* Advanced Tech */}
                <View className="flex-2">
                  <Text variant="caption" className="text-text-secondary mb-1">
                    Técnica avançada (opcional)
                  </Text>
                  <Input
                    placeholder="Ex.: Dropset"
                    value={exercise.advancedTechnique || ''}
                    onChangeText={(val) =>
                      handleExerciseChange(
                        block.id,
                        exercise.id,
                        'advancedTechnique',
                        val || undefined
                      )
                    }
                    className="px-2"
                  />
                </View>

                {/* RIR */}
                <View className="flex-1">
                  <Text variant="caption" className="text-text-secondary mb-1 text-center">
                    RIR
                  </Text>
                  <Input
                    keyboardType="numeric"
                    placeholder="Reps em reserva"
                    value={exercise.repsReserve !== undefined ? exercise.repsReserve.toString() : ''}
                    onChangeText={(val) =>
                      handleExerciseChange(
                        block.id,
                        exercise.id,
                        'repsReserve',
                        val ? parseInt(val, 10) || 0 : undefined
                      )
                    }
                    className="px-2 text-center"
                  />
                </View>
              </View>
            </View>
          ))}

          <Button
            variant="outline"
            size="sm"
            onPress={() => handleAddExercise(block.id)}
            className="border-dashed"
          >
            <Icon as={Plus} size={16} className="text-text-secondary" />
            <Text variant="caption" className="text-text-secondary">
              Adicionar exercício
            </Text>
          </Button>
        </View>
      ))}

      {blocks.length === 0 && (
        <View className="my-2">
          <EmptyState 
            icon={Layers} 
            title="Nenhum bloco adicionado"
            subtitle="Adicione um bloco para começar a montar o treino."
          />
        </View>
      )}

      <Button
        onPress={handleSave}
        disabled={isSaving}
        className="my-6 min-h-control-lg"
      >
        <Text>{isSaving ? 'Criando...' : 'Criar programa'}</Text>
      </Button>

      <FeedbackDialog
        visible={!!feedback}
        onClose={() => {
          if (feedback?.type === 'success') {
            router.back();
          }
          clearFeedback();
        }}
        state={{
          visible: !!feedback,
          title: feedback?.title || '',
          description: feedback?.message || '',
          isError: feedback?.type === 'error'
        }}
      />
    </View>
  );
}
