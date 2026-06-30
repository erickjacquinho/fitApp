import { useState, useEffect } from 'react';
import { SessionService } from '../services/session-service';
import WorkoutSession from '../../../db/models/WorkoutSession';

export interface ExerciseSummary {
  exerciseId: string;
  name: string;
  sets: { setNumber: number; weight: number; reps: number }[];
  volume: number;
}

export function useWorkoutDetails(id?: string) {
  const [session, setSession] = useState<WorkoutSession | null>(null);
  const [programName, setProgramName] = useState('');
  const [exercisesSummary, setExercisesSummary] = useState<ExerciseSummary[]>([]);
  const [totalVolume, setTotalVolume] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadDetails() {
      if (!id) return;
      try {
        setIsLoading(true);
        const { session: currentSession, executions } = await SessionService.getSessionDetails(id);
        setSession(currentSession);

        const program = await currentSession.program.fetch();
        if (program) {
          setProgramName(program.name);
        }

        const summariesMap: { [key: string]: ExerciseSummary } = {};
        let totalVol = 0;

        for (const exec of executions) {
          const exercise = await exec.exercise.fetch();
          if (!exercise) continue;

          const vol = exec.weight * exec.repsDone;
          totalVol += vol;

          if (!summariesMap[exercise.id]) {
            summariesMap[exercise.id] = {
              exerciseId: exercise.id,
              name: exercise.name,
              sets: [],
              volume: 0,
            };
          }

          summariesMap[exercise.id].sets.push({
            setNumber: exec.setNumber,
            weight: exec.weight,
            reps: exec.repsDone,
          });
          summariesMap[exercise.id].volume += vol;
        }

        const summaries = Object.values(summariesMap).map((summary) => ({
          ...summary,
          sets: summary.sets.sort((a, b) => a.setNumber - b.setNumber),
        }));

        setExercisesSummary(summaries);
        setTotalVolume(totalVol);
      } catch (err) {
        console.error('Error loading session details:', err);
      } finally {
        setIsLoading(false);
      }
    }

    loadDetails();
  }, [id]);

  return {
    session,
    programName,
    exercisesSummary,
    totalVolume,
    isLoading,
  };
}
