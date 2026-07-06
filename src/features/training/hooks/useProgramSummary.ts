import { useEffect, useState } from 'react';
import { database } from '../../../db';
import Program from '../../../db/models/Program';
import TrainingBlock from '../../../db/models/TrainingBlock';
import { observeProgram, observeProgramBlocks, observeProgramCompletedSessions } from '../../../db/queries/program';

export interface BlockWithSets {
  block: TrainingBlock;
  validSets: number;
  totalSets: number;
}

export function useProgramSummary(programId: string) {
  const [program, setProgram] = useState<Program | null>(null);
  const [blocks, setBlocks] = useState<BlockWithSets[]>([]);
  const [completedSessionsCount, setCompletedSessionsCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setIsLoading(true);

    const programSubscription = observeProgram(programId).subscribe({
      next: (data) => setProgram(data),
      error: (err) => setError(err),
    });

    const blocksSubscription = observeProgramBlocks(programId).subscribe({
      next: async (data) => {
        try {
          const enriched = await Promise.all(data.map(async (block) => {
            const exercises = await block.exercises.fetch();
            const totalSets = exercises.reduce((acc, ex) => acc + (ex.sets || 0), 0);
            return {
              block,
              validSets: totalSets, // Atualmente igual
              totalSets,
            };
          }));
          setBlocks(enriched);
        } catch (err) {
          console.error('Error fetching block exercises:', err);
        } finally {
          setIsLoading(false);
        }
      },
      error: (err) => {
        setError(err);
        setIsLoading(false);
      },
    });

    const sessionsSubscription = observeProgramCompletedSessions(programId).subscribe({
      next: (count) => setCompletedSessionsCount(count),
      error: (err) => console.error('Error fetching sessions count:', err),
    });

    return () => {
      programSubscription.unsubscribe();
      blocksSubscription.unsubscribe();
      sessionsSubscription.unsubscribe();
    };
  }, [programId]);

  const updateBlocksOrder = async (newOrderedBlocks: TrainingBlock[]) => {
    // We update local state by keeping the computed sets for fast UI
    setBlocks(prev => {
      return newOrderedBlocks.map(b => {
        const existing = prev.find(p => p.block.id === b.id);
        return existing ? { ...existing, block: b } : { block: b, validSets: 0, totalSets: 0 };
      });
    });

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
      setError(err instanceof Error ? err : new Error('Failed to update order'));
    }
  };

  return {
    program,
    blocks,
    completedSessionsCount,
    isLoading,
    error,
    updateBlocksOrder,
  };
}
