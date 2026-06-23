import { useState } from 'react';
import { router } from 'expo-router';
import { WorkoutService } from '../services/workout-service';
import { BlockDTO, ExerciseDTO, PresentationFeedback } from '../types';

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
  
  const [errors, setErrors] = useState<{
    programName?: string;
    global?: string;
    blockNames?: Record<string, string>;
    exercises?: Record<string, string>;
  }>({});
  const [feedback, setFeedback] = useState<PresentationFeedback | null>(null);

  const clearFeedback = () => setFeedback(null);

  const validate = () => {
    const newErrors: typeof errors = { blockNames: {}, exercises: {} };
    let isValid = true;

    if (!programName.trim()) {
      newErrors.programName = 'Nome do programa é obrigatório';
      isValid = false;
    }

    if (blocks.length === 0) {
      newErrors.global = 'É necessário pelo menos um bloco de treino';
      isValid = false;
    }

    for (const block of blocks) {
      if (!block.name.trim()) {
        newErrors.blockNames![block.id] = 'Nome do bloco é obrigatório';
        isValid = false;
      }
      if (block.exercises.length === 0) {
        newErrors.blockNames![block.id] = 'Adicione pelo menos um exercício';
        isValid = false;
      }
      for (const exercise of block.exercises) {
        if (!exercise.name.trim()) {
          newErrors.exercises![exercise.id] = 'Selecione um exercício';
          isValid = false;
        } else if (exercise.sets <= 0 || exercise.repsMin <= 0 || exercise.repsMax <= 0) {
          newErrors.exercises![exercise.id] = 'Valores de séries/reps inválidos';
          isValid = false;
        }
      }
    }

    setErrors(newErrors);
    return isValid;
  };

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

  const handleExerciseChange = <Field extends keyof ExerciseDTO>(
    blockId: string,
    exerciseId: string,
    field: Field,
    value: ExerciseDTO[Field]
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
    if (isSaving) return;
    if (!validate()) return;

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

      setFeedback({ type: 'success', title: 'Sucesso', message: 'Programa de treino criado com sucesso' });
    } catch (error) {
      console.error('Error creating program:', error);
      setFeedback({ type: 'error', title: 'Erro', message: 'Não foi possível criar o programa' });
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
    errors,
    feedback,
    clearFeedback,
  };
}
