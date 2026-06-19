import React, { useState, useEffect } from 'react';
import { View, ScrollView, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { Calendar, Clock, Dumbbell, Trophy } from 'lucide-react-native';
import { Typography } from '../../../components/atoms/Typography';
import { Card } from '../../../components/atoms/Card';
import { Button } from '../../../components/atoms/Button';
import { SessionService } from '../services/session-service';
import WorkoutSession from '../../../db/models/WorkoutSession';
import ExerciseExecution from '../../../db/models/ExerciseExecution';

interface ExerciseSummary {
  exerciseId: string;
  name: string;
  sets: { setNumber: number; weight: number; reps: number }[];
  volume: number;
}

export function SessionDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
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

        // Group executions by exercise
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

        // Sort sets by set number for each exercise
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

  const formatDate = (timestamp: number) => {
    const d = new Date(timestamp);
    return d.toLocaleDateString(undefined, {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getDuration = (start: number, end?: number) => {
    if (!end) return 'N/A';
    const diffMs = end - start;
    const diffMins = Math.round(diffMs / 1000 / 60);
    return `${diffMins} min`;
  };

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-surface-app">
        <ActivityIndicator size="large" color="#005B94" />
      </View>
    );
  }

  if (!session) {
    return (
      <View className="flex-1 items-center justify-center bg-surface-app p-4">
        <Typography variant="subtitle" className="mb-4">
          Session Details Not Found
        </Typography>
        <Button title="Back to Training" onPress={() => router.replace('/training')} />
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-surface-app p-4">
      {/* Trophy / Congrats Header */}
      <View className="mb-4 items-center justify-center rounded-md bg-success-main/10 p-5 border border-success-main/20">
        <View className="mb-2 h-12 w-12 items-center justify-center rounded-full bg-success-main">
          <Trophy size={24} color="#fff" />
        </View>
        <Typography variant="title" className="text-success-main text-lg font-bold text-center">
          Workout Finished!
        </Typography>
        <Typography variant="caption" color="muted" className="text-center mt-1">
          Awesome work! Your stats are saved in history.
        </Typography>
      </View>

      {/* Program Summary Card */}
      <Card className="mb-4 p-4">
        <Typography variant="title" className="font-bold text-xl mb-3">
          {programName}
        </Typography>

        <View className="gap-2">
          <View className="flex-row items-center gap-2">
            <Calendar size={16} color="#666" />
            <Typography variant="text" color="muted" className="text-sm">
              {formatDate(session.startDate)}
            </Typography>
          </View>

          <View className="flex-row items-center gap-2">
            <Clock size={16} color="#666" />
            <Typography variant="text" color="muted" className="text-sm">
              Duration: {getDuration(session.startDate, session.endDate)}
            </Typography>
          </View>

          <View className="flex-row items-center gap-2">
            <Dumbbell size={16} color="#666" />
            <Typography variant="text" color="muted" className="text-sm">
              Total Weight Lifted:{' '}
              <Typography variant="highlight" className="font-bold">
                {totalVolume.toLocaleString()} kg
              </Typography>
            </Typography>
          </View>
        </View>
      </Card>

      {/* Exercises Summary */}
      <Typography variant="subtitle" className="mb-3 text-lg font-bold">
        Exercises Log
      </Typography>

      {exercisesSummary.map((ex) => (
        <Card key={ex.exerciseId} className="mb-3 p-4">
          <View className="flex-row items-center justify-between border-b border-soft pb-2 mb-2">
            <Typography variant="subtitle" className="font-bold text-base">
              {ex.name}
            </Typography>
            <Typography variant="caption" className="font-bold text-primary-main">
              Volume: {ex.volume.toLocaleString()} kg
            </Typography>
          </View>

          {ex.sets.map((set) => (
            <View key={set.setNumber} className="flex-row justify-between py-1">
              <Typography variant="caption" color="muted">
                Set {set.setNumber}
              </Typography>
              <Typography variant="caption" className="font-semibold">
                {set.weight} kg x {set.reps} reps
              </Typography>
            </View>
          ))}
        </Card>
      ))}

      <Button
        title="Back to Programs"
        onPress={() => router.replace('/training')}
        className="my-6 min-h-control-lg"
      />
    </ScrollView>
  );
}
