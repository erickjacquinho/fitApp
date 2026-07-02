import { create } from 'zustand';
import { BlockDTO, ExerciseDTO } from '../types';

export interface ExerciseInput extends ExerciseDTO {
  id: string;
}

export interface BlockInput extends BlockDTO {
  id: string;
  exercises: ExerciseInput[];
}

interface ProgramFormState {
  programName: string;
  blocks: BlockInput[];
  setProgramName: (name: string) => void;
  setBlocks: (blocks: BlockInput[]) => void;
  updateExercise: <Field extends keyof ExerciseDTO>(
    blockId: string,
    exerciseId: string,
    field: Field,
    value: ExerciseDTO[Field]
  ) => void;
  resetStore: () => void;
}

export const useProgramFormStore = create<ProgramFormState>((set) => ({
  programName: '',
  blocks: [],
  setProgramName: (name) => set({ programName: name }),
  setBlocks: (blocks) => set({ blocks }),
  updateExercise: (blockId, exerciseId, field, value) =>
    set((state) => ({
      blocks: state.blocks.map((b) => {
        if (b.id === blockId) {
          return {
            ...b,
            exercises: b.exercises.map((e) =>
              e.id === exerciseId ? { ...e, [field]: value } : e
            ),
          };
        }
        return b;
      }),
    })),
  resetStore: () => set({ programName: '', blocks: [] }),
}));
