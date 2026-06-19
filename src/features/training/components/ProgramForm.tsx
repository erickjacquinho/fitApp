import React from 'react';
import { View, ScrollView, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { Plus, Trash2 } from 'lucide-react-native';
import { Typography } from '../../../components/atoms/Typography';
import { Button } from '../../../components/atoms/Button';
import { useProgramForm } from '../hooks/useProgramForm';
import { BlockDTO, ExerciseDTO } from '../types';

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
  } = useProgramForm();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      className="flex-1"
      keyboardVerticalOffset={Platform.OS === 'ios' ? 88 : 0}
    >
      <ScrollView 
        className="flex-1 bg-surface-app p-4"
        keyboardShouldPersistTaps="handled"
      >
        <Typography variant="label" className="mb-1 text-gray-500">
          Program Name
        </Typography>
        <TextInput
          placeholder="e.g., Hypertrophy Push/Pull/Legs"
          value={programName}
          onChangeText={setProgramName}
          className="mb-4 rounded border border-soft bg-white-pure p-3 font-bold text-black-main"
        />

        <View className="mb-4 flex-row items-center justify-between border-b border-soft pb-2">
          <Typography variant="title">Workout Blocks</Typography>
          <TouchableOpacity
            onPress={handleAddBlock}
            className="flex-row items-center gap-1 rounded bg-primary-main/10 px-3 py-1.5 active:bg-primary-main/20"
          >
            <Plus size={16} color="#005B94" />
            <Typography variant="label" className="text-primary-main">
              Add Block
            </Typography>
          </TouchableOpacity>
        </View>

        {blocks.map((block, bIdx) => (
          <View
            key={block.id}
            className="mb-4 rounded border border-soft bg-component-card-bg p-4"
          >
            <View className="flex-row items-center justify-between mb-3 gap-2">
              <TextInput
                placeholder="e.g., Workout A"
                value={block.name}
                onChangeText={(val) => handleBlockNameChange(block.id, val)}
                className="flex-1 rounded border border-soft bg-white-pure px-3 py-1.5 font-bold text-black-main"
              />
              <TouchableOpacity
                onPress={() => handleRemoveBlock(block.id)}
                className="rounded bg-tomato-main/10 p-2"
              >
                <Trash2 size={16} color="#ef4444" />
              </TouchableOpacity>
            </View>

            {/* Exercises */}
            <Typography variant="label" className="mb-2 text-gray-500">
              Exercises
            </Typography>

            {block.exercises.map((exercise, eIdx) => (
              <View
                key={exercise.id}
                className="mb-3 rounded border border-soft bg-surface-app p-3"
              >
                <View className="flex-row justify-between items-center mb-2 gap-2">
                  <TextInput
                    placeholder="Exercise Name"
                    value={exercise.name}
                    onChangeText={(val) =>
                      handleExerciseChange(block.id, exercise.id, 'name', val)
                    }
                    className="flex-1 rounded border border-soft bg-white-pure px-3 py-1.5 font-bold text-black-main text-sm"
                  />
                  <TouchableOpacity
                    onPress={() => handleRemoveExercise(block.id, exercise.id)}
                    className="p-1"
                  >
                    <Trash2 size={14} color="#ef4444" />
                  </TouchableOpacity>
                </View>

                <View className="flex-row gap-2">
                  {/* Sets */}
                  <View className="flex-1">
                    <Typography variant="caption" color="muted" className="mb-1 text-center">
                      Sets
                    </Typography>
                    <TextInput
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
                      className="rounded border border-soft bg-white-pure p-1.5 text-center font-bold text-sm"
                    />
                  </View>

                  {/* Min Reps */}
                  <View className="flex-1">
                    <Typography variant="caption" color="muted" className="mb-1 text-center">
                      Min Reps
                    </Typography>
                    <TextInput
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
                      className="rounded border border-soft bg-white-pure p-1.5 text-center font-bold text-sm"
                    />
                  </View>

                  {/* Max Reps */}
                  <View className="flex-1">
                    <Typography variant="caption" color="muted" className="mb-1 text-center">
                      Max Reps
                    </Typography>
                    <TextInput
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
                      className="rounded border border-soft bg-white-pure p-1.5 text-center font-bold text-sm"
                    />
                  </View>
                </View>

                <View className="flex-row gap-2 mt-2">
                  {/* Advanced Tech */}
                  <View className="flex-[2]">
                    <Typography variant="caption" color="muted" className="mb-1">
                      Advanced Tech (optional)
                    </Typography>
                    <TextInput
                      placeholder="e.g., Dropset"
                      value={exercise.advancedTechnique || ''}
                      onChangeText={(val) =>
                        handleExerciseChange(
                          block.id,
                          exercise.id,
                          'advancedTechnique',
                          val || undefined
                        )
                      }
                      className="rounded border border-soft bg-white-pure px-2 py-1 text-sm"
                    />
                  </View>

                  {/* RIR */}
                  <View className="flex-1">
                    <Typography variant="caption" color="muted" className="mb-1 text-center">
                      RIR
                    </Typography>
                    <TextInput
                      keyboardType="numeric"
                      placeholder="Reps in reserve"
                      value={exercise.repsReserve !== undefined ? exercise.repsReserve.toString() : ''}
                      onChangeText={(val) =>
                        handleExerciseChange(
                          block.id,
                          exercise.id,
                          'repsReserve',
                          val ? parseInt(val, 10) || 0 : undefined
                        )
                      }
                      className="rounded border border-soft bg-white-pure p-1.5 text-center text-sm"
                    />
                  </View>
                </View>
              </View>
            ))}

            <TouchableOpacity
              onPress={() => handleAddExercise(block.id)}
              className="flex-row items-center justify-center gap-1 rounded border border-dashed border-soft py-1.5 active:bg-soft/10"
            >
              <Plus size={14} color="#666" />
              <Typography variant="caption" color="muted">
                Add Exercise
              </Typography>
            </TouchableOpacity>
          </View>
        ))}

        {blocks.length === 0 && (
          <View className="my-8 items-center justify-center py-6">
            <Typography variant="text" color="muted" className="text-center mb-2">
              No blocks added yet.
            </Typography>
            <Typography variant="caption" color="muted" className="text-center">
              Click "Add Block" above to start building your workout routines.
            </Typography>
          </View>
        )}

        <Button
          title="Create Program"
          onPress={handleSave}
          className="my-6 min-h-control-lg"
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
