import { useState } from 'react';
import { Alert } from 'react-native';
import { router } from 'expo-router';
import { WorkoutService } from '../services/workout-service';
import { BlockDTO, ExerciseDTO } from '../types';

export interface ExerciseInput extends ExerciseDTO {
  id: string;
}

export interface BlockInput extends BlockDTO {
  id: string;
  exercises: ExerciseInput[];
}

export function useProgramForm() {
  const [programName, setProgramName] = useState('');
  const [blocks, setBlocks] = useState<BlockInput[]>([]);
  const [isSaving, setIsSaving] = useState(false);

  const handleAddBlock = () => {
    const newBlock: BlockInput = {
      id: Math.random().toString(),
      name: `Workout ${String.fromCharCode(65 + blocks.length)}`,
      order: blocks.length + 1,
      exercises: [],
    };
    setBlocks([...blocks, newBlock]);
  };

  const handleRemoveBlock = (blockId: string) => {
    setBlocks(blocks.filter((b) => b.id !== blockId));
  };

  const handleBlockNameChange = (blockId: string, name: string) => {
    setBlocks(
      blocks.map((b) => (b.id === blockId ? { ...b, name } : b))
    );
  };

  const handleAddExercise = (blockId: string) => {
    setBlocks(
      blocks.map((b) => {
        if (b.id === blockId) {
          const newExercise: ExerciseInput = {
            id: Math.random().toString(),
            name: '',
            sets: 3,
            repsMin: 8,
            repsMax: 12,
          };
          return { ...b, exercises: [...b.exercises, newExercise] };
        }
        return b;
      })
    );
  };

  const handleRemoveExercise = (blockId: string, exerciseId: string) => {
    setBlocks(
      blocks.map((b) => {
        if (b.id === blockId) {
          return {
            ...b,
            exercises: b.exercises.filter((e) => e.id !== exerciseId),
          };
        }
        return b;
      })
    );
  };

  const handleExerciseChange = (
    blockId: string,
    exerciseId: string,
    field: keyof ExerciseDTO,
    value: any
  ) => {
    setBlocks(
      blocks.map((b) => {
        if (b.id === blockId) {
          const updatedExercises = b.exercises.map((e) => {
            if (e.id === exerciseId) {
              return { ...e, [field]: value };
            }
            return e;
          });
          return { ...b, exercises: updatedExercises };
        }
        return b;
      })
    );
  };

  const handleSave = async () => {
    if (!programName.trim()) {
      Alert.alert('Validation Error', 'Program name is required');
      return;
    }

    if (blocks.length === 0) {
      Alert.alert('Validation Error', 'At least one workout block is required');
      return;
    }

    // Validate blocks and exercises
    for (const block of blocks) {
      if (!block.name.trim()) {
        Alert.alert('Validation Error', 'All workout blocks must have a name');
        return;
      }
      if (block.exercises.length === 0) {
        Alert.alert(
          'Validation Error',
          `Block "${block.name}" must contain at least one exercise`
        );
        return;
      }
      for (const exercise of block.exercises) {
        if (!exercise.name.trim()) {
          Alert.alert(
            'Validation Error',
            `Exercise name is required in block "${block.name}"`
          );
          return;
        }
        if (exercise.sets <= 0 || exercise.repsMin <= 0 || exercise.repsMax <= 0) {
          Alert.alert(
            'Validation Error',
            `Invalid sets/reps values for "${exercise.name || 'exercise'}"`
          );
          return;
        }
      }
    }

    setIsSaving(true);
    try {
      await WorkoutService.createProgram(
        { name: programName },
        blocks.map((b) => ({
          name: b.name,
          order: b.order,
          exercises: b.exercises.map((e) => ({
            name: e.name,
            sets: e.sets,
            repsMin: e.repsMin,
            repsMax: e.repsMax,
            advancedTechnique: e.advancedTechnique,
            repsReserve: e.repsReserve,
          })),
        }))
      );

      Alert.alert('Success', 'Training program created successfully', [
        { text: 'OK', onPress: () => router.back() },
      ]);
    } catch (error) {
      console.error('Error creating program:', error);
      Alert.alert('Error', 'Failed to create training program');
    } finally {
      setIsSaving(false);
    }
  };

  return {
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
  };
}
