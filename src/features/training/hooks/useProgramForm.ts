import { useEffect, useState } from 'react';
import { WorkoutService } from '../services/workout-service';
import { ExerciseDTO, PresentationFeedback } from '../types';
import { capitalizeWords } from '../../../lib/utils';
import { database } from '../../../db';
import Program from '../../../db/models/Program';
import { useProgramFormStore, BlockInput, ExerciseInput } from '../store/program-form-store';

export { BlockInput, ExerciseInput };

export function useProgramForm(programId?: string) {
  const programName = useProgramFormStore((state) => state.programName);
  const setProgramName = useProgramFormStore((state) => state.setProgramName);
  const blocks = useProgramFormStore((state) => state.blocks);
  const setBlocks = useProgramFormStore((state) => state.setBlocks);
  const updateExerciseStore = useProgramFormStore((state) => state.updateExercise);
  const resetStore = useProgramFormStore((state) => state.resetStore);

  const [isSaving, setIsSaving] = useState(false);
  const [feedback, setFeedback] = useState<PresentationFeedback | null>(null);
  const [errors, setErrors] = useState<{
    programName?: string;
    global?: string;
    blockNames?: Record<string, string>;
    exercises?: Record<string, string>;
  }>({});

  // Reset store when entering creation mode
  useEffect(() => {
    if (!programId) {
      resetStore();
    }
  }, [programId, resetStore]);

  // Load existing program data
  useEffect(() => {
    async function loadProgram() {
      if (!programId) return;
      try {
        const programRecord = await database.get<Program>('programs').find(programId);
        setProgramName(programRecord.name);

        const blocksList = await programRecord.trainingBlocks.fetch();
        const sortedBlocks = [...blocksList].sort((a, b) => a.order - b.order);

        const enrichedBlocks = await Promise.all(
          sortedBlocks.map(async (block) => {
            const exercisesList = await block.exercises.fetch();
            const sortedExercises = [...exercisesList].sort((a, b) => a.order - b.order);

            return {
              id: block.id,
              name: block.name,
              order: block.order,
              exercises: sortedExercises.map((ex) => ({
                id: ex.id,
                name: ex.name,
                sets: ex.sets,
                repsMin: ex.repsMin,
                repsMax: ex.repsMax,
                advancedTechnique: ex.advancedTechnique ?? undefined,
                repsReserve: ex.repsReserve ?? undefined,
              })),
            };
          })
        );
        setBlocks(enrichedBlocks);
      } catch (err) {
        console.error('Error loading program for editing:', err);
        setFeedback({
          type: 'error',
          title: 'Erro',
          message: 'Não foi possível carregar o programa de treino.',
        });
      }
    }

    loadProgram();
  }, [programId, setProgramName, setBlocks]);

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
          newErrors.exercises![exercise.id] = 'Selecione o exercício';
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
      name: `Treino ${String.fromCharCode(65 + blocks.length)}`,
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

  const handleAddExercise = (blockId: string): string => {
    const newId = Math.random().toString();
    setBlocks(
      blocks.map((b) => {
        if (b.id === blockId) {
          const newExercise: ExerciseInput = {
            id: newId,
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
    return newId;
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
    updateExerciseStore(blockId, exerciseId, field, value);
  };

  const handleReorderExercises = (blockId: string, newExercises: ExerciseInput[]) => {
    setBlocks(
      blocks.map((b) => (b.id === blockId ? { ...b, exercises: newExercises } : b))
    );
  };

  const handleSave = async () => {
    if (isSaving) return;
    if (!validate()) return;

    setIsSaving(true);
    
    const formattedProgramName = capitalizeWords(programName);

    try {
      if (programId) {
        await WorkoutService.updateProgram(
          programId,
          { name: formattedProgramName },
          blocks.map((b, bIdx) => ({
            id: b.id.includes('.') ? undefined : b.id,
            name: capitalizeWords(b.name),
            order: bIdx + 1,
            exercises: b.exercises.map((e) => ({
              id: e.id.includes('.') ? undefined : e.id,
              name: capitalizeWords(e.name),
              sets: e.sets,
              repsMin: e.repsMin,
              repsMax: e.repsMax,
              advancedTechnique: e.advancedTechnique,
              repsReserve: e.repsReserve,
            })),
          }))
        );
        setFeedback({ type: 'success', title: 'Sucesso', message: 'Programa de treino atualizado com sucesso' });
      } else {
        await WorkoutService.createProgram(
          { name: formattedProgramName },
          blocks.map((b, bIdx) => ({
            name: capitalizeWords(b.name),
            order: bIdx + 1,
            exercises: b.exercises.map((e) => ({
              name: capitalizeWords(e.name),
              sets: e.sets,
              repsMin: e.repsMin,
              repsMax: e.repsMax,
              advancedTechnique: e.advancedTechnique,
              repsReserve: e.repsReserve,
            })),
          }))
        );
        setFeedback({ type: 'success', title: 'Sucesso', message: 'Programa de treino criado com sucesso' });
      }
    } catch (error) {
      console.error('Error saving program:', error);
      setFeedback({
        type: 'error',
        title: 'Erro',
        message: `Não foi possível ${programId ? 'atualizar' : 'criar'} o programa`,
      });
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
    handleReorderExercises,
    handleSave,
    isSaving,
    errors,
    feedback,
    clearFeedback,
  };
}
