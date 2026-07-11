import { capitalizeWords } from '../../../lib/utils';
import { ProgramService } from '../services/program-service';
import { BlockInput } from '../store/program-form-store';

export function validateProgramForm(programName: string, blocks: BlockInput[]) {
  const errors: {
    programName?: string;
    global?: string;
    blockNames?: Record<string, string>;
    exercises?: Record<string, string>;
  } = { blockNames: {}, exercises: {} };
  let isValid = true;

  if (!programName.trim()) {
    errors.programName = 'Nome do programa é obrigatório';
    isValid = false;
  }
  if (blocks.length === 0) {
    errors.global = 'É necessário pelo menos um bloco de treino';
    isValid = false;
  }
  for (const block of blocks) {
    if (!block.name.trim()) {
      errors.blockNames![block.id] = 'Nome do bloco é obrigatório';
      isValid = false;
    }
    if (block.exercises.length === 0) {
      errors.blockNames![block.id] = 'Adicione pelo menos um exercício';
      isValid = false;
    }
    for (const exercise of block.exercises) {
      if (!exercise.name.trim()) {
        errors.exercises![exercise.id] = 'Selecione o exercício';
        isValid = false;
      }
    }
  }

  return { isValid, errors };
}

export async function submitProgramForm({ programId, programName, blocks }: { programId?: string, programName: string, blocks: BlockInput[] }) {
  const formattedProgramName = capitalizeWords(programName);

  if (programId) {
    await ProgramService.updateProgram(
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
  } else {
    await ProgramService.createProgram(
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
  }
}
