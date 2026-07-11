import { useProgramFormState } from './useProgramFormState';
import { useProgramFormBlocks } from './useProgramFormBlocks';
import { BlockInput, ExerciseInput } from '../store/program-form-store';

export { BlockInput, ExerciseInput };

export function useProgramForm(programId?: string) {
  const stateLogic = useProgramFormState(programId);
  const blocksLogic = useProgramFormBlocks();

  return {
    ...stateLogic,
    ...blocksLogic,
  };
}
