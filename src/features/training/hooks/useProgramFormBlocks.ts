import { useProgramFormStore, BlockInput, ExerciseInput } from '../store/program-form-store';
import { ExerciseDTO } from '../types';

export function useProgramFormBlocks() {
  const blocks = useProgramFormStore((state) => state.blocks);
  const setBlocks = useProgramFormStore((state) => state.setBlocks);
  const updateExerciseStore = useProgramFormStore((state) => state.updateExercise);

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

  return {
    blocks,
    handleAddBlock,
    handleRemoveBlock,
    handleBlockNameChange,
    handleAddExercise,
    handleRemoveExercise,
    handleExerciseChange,
    handleReorderExercises,
  };
}
