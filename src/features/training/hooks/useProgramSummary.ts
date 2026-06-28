import { useEffect, useState } from 'react';
import { database } from '../../../db';
import Program from '../../../db/models/Program';
import TrainingBlock from '../../../db/models/TrainingBlock';
import { observeProgram, observeProgramBlocks } from '../../../db/queries/program';

export function useProgramSummary(programId: string) {
  const [program, setProgram] = useState<Program | null>(null);
  const [blocks, setBlocks] = useState<TrainingBlock[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setIsLoading(true);

    const programSubscription = observeProgram(programId).subscribe({
      next: (data) => setProgram(data),
      error: (err) => setError(err),
    });

    const blocksSubscription = observeProgramBlocks(programId).subscribe({
      next: (data) => {
        setBlocks(data);
        setIsLoading(false);
      },
      error: (err) => {
        setError(err);
        setIsLoading(false);
      },
    });

    return () => {
      programSubscription.unsubscribe();
      blocksSubscription.unsubscribe();
    };
  }, [programId]);

  const updateBlocksOrder = async (newOrderedBlocks: TrainingBlock[]) => {
    // Immediately update local state for fast UI
    setBlocks(newOrderedBlocks);

    try {
      await database.write(async () => {
        const updates = newOrderedBlocks.map((block, index) =>
          block.prepareUpdate((b) => {
            b.order = index;
          })
        );
        await database.batch(...updates);
      });
    } catch (err) {
      console.error('Failed to update block order:', err);
      // Optional: rollback state if necessary, but observeProgramBlocks will trigger a new emit
      setError(err instanceof Error ? err : new Error('Failed to update order'));
    }
  };

  return {
    program,
    blocks,
    isLoading,
    error,
    updateBlocksOrder,
  };
}
