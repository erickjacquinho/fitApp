export interface ProgramDTO {
  name: string;
}

export interface BlockDTO {
  name: string;
  order: number;
  exercises?: ExerciseDTO[];
}

export interface ExerciseDTO {
  name: string;
  sets: number;
  repsMin: number;
  repsMax: number;
  advancedTechnique?: string;
  repsReserve?: number;
}

export interface ExecutionDTO {
  setNumber: number;
  repsDone: number;
  weight: number;
  repsReserveDone?: number;
}

export interface PresentationFeedback {
  type: 'success' | 'error' | 'info';
  title: string;
  message: string;
}

export type PendingState = 'idle' | 'loading' | 'saving' | 'deleting';
