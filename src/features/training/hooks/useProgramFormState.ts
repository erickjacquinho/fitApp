import { useEffect, useState } from 'react';
import { database } from '../../../db';
import Program from '../../../db/models/Program';
import { useProgramFormStore, BlockInput } from '../store/program-form-store';
import { PresentationFeedback } from '../types';
import { submitProgramForm, validateProgramForm } from './programFormUtils';

export function useProgramFormState(programId?: string) {
  const programName = useProgramFormStore((state) => state.programName);
  const setProgramName = useProgramFormStore((state) => state.setProgramName);
  const blocks = useProgramFormStore((state) => state.blocks);
  const setBlocks = useProgramFormStore((state) => state.setBlocks);
  const resetStore = useProgramFormStore((state) => state.resetStore);

  const [isSaving, setIsSaving] = useState(false);
  const [feedback, setFeedback] = useState<PresentationFeedback | null>(null);
  const [errors, setErrors] = useState<{
    programName?: string;
    global?: string;
    blockNames?: Record<string, string>;
    exercises?: Record<string, string>;
  }>({});

  useEffect(() => {
    if (!programId) {
      resetStore();
    }
  }, [programId, resetStore]);

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

  const handleSave = async () => {
    if (isSaving) return;
    
    const { isValid, errors: validationErrors } = validateProgramForm(programName, blocks);
    if (!isValid) {
      setErrors(validationErrors);
      return;
    }

    setIsSaving(true);
    try {
      await submitProgramForm({ programId, programName, blocks });
      setFeedback({ type: 'success', title: 'Sucesso', message: `Programa de treino ${programId ? 'atualizado' : 'criado'} com sucesso` });
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
    isSaving,
    errors,
    feedback,
    clearFeedback,
    handleSave,
  };
}
