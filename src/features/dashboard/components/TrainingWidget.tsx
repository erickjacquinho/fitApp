import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { Play, CheckCircle2, Dumbbell, Calendar } from 'lucide-react-native';
import { Typography } from '../../../components/atoms/Typography';
import { Card } from '../../../components/atoms/Card';

interface TrainingWidgetProps {
  programName: string | null;
  hasTrainedToday: boolean;
  weeklyWorkouts: number;
  weeklyGoal: number;
  lastVolume: number;
}

export function TrainingWidget({
  programName,
  hasTrainedToday,
  weeklyWorkouts,
  weeklyGoal,
  lastVolume,
}: TrainingWidgetProps) {
  const percentage = Math.min(Math.round((weeklyWorkouts / weeklyGoal) * 100), 100);

  return (
    <Card className="p-4 border border-soft bg-component-card-bg">
      <View className="flex-row items-center justify-between border-b border-soft pb-3 mb-3">
        <Typography variant="subtitle" className="font-bold">
          Training Plan
        </Typography>
        {programName && (
          <TouchableOpacity
            onPress={() => router.push('/training')}
            className="flex-row items-center gap-1 rounded bg-primary-main/10 px-2.5 py-1 active:bg-primary-main/20"
          >
            <Play size={12} color="#005B94" fill="#005B94" />
            <Typography variant="caption" className="font-bold text-primary-main">
              Start
            </Typography>
          </TouchableOpacity>
        )}
      </View>

      {programName ? (
        <View>
          <Typography variant="label" className="text-base font-bold mb-1">
            {programName}
          </Typography>

          <View className="flex-row items-center gap-2 mt-2 mb-3 bg-surface-app p-3 rounded border border-soft">
            {hasTrainedToday ? (
              <CheckCircle2 size={18} color="#2e7d32" />
            ) : (
              <Dumbbell size={18} color="#666" />
            )}
            <Typography variant="caption" className={hasTrainedToday ? 'text-success-main font-bold' : ''}>
              {hasTrainedToday ? 'Workout completed today! 🎉' : 'No workouts logged today.'}
            </Typography>
          </View>

          {/* Weekly Summary */}
          <View className="flex-row items-center justify-between mb-2">
            <Typography variant="caption" color="muted">
              Weekly Goal Progress
            </Typography>
            <Typography variant="caption" className="font-bold">
              {weeklyWorkouts} / {weeklyGoal} workouts
            </Typography>
          </View>

          <View className="h-1.5 w-full overflow-hidden rounded-full bg-surface-app mb-3">
            <View
              className="h-full bg-primary-main"
              style={{ width: `${percentage}%` }}
            />
          </View>

          {lastVolume > 0 && (
            <View className="flex-row items-center gap-1.5 mt-1">
              <Calendar size={12} color="#666" />
              <Typography variant="caption" color="muted">
                Last session load volume:{' '}
                <Typography variant="caption" className="font-bold text-black-main">
                  {lastVolume.toLocaleString()} kg
                </Typography>
              </Typography>
            </View>
          )}
        </View>
      ) : (
        <View className="py-4 items-center justify-center">
          <Typography variant="text" color="muted" className="text-center mb-4">
            No active training program found.
          </Typography>
          <TouchableOpacity
            onPress={() => router.push('/training/create-program')}
            className="flex-row items-center justify-center gap-2 rounded bg-primary-main px-4 py-2 active:bg-primary-dark"
          >
            <Plus size={16} color="#fff" />
            <Typography variant="label" color="inverse">
              Create Program
            </Typography>
          </TouchableOpacity>
        </View>
      )}

      <TouchableOpacity
        onPress={() => router.push('/training')}
        className="mt-4 py-2 border-t border-soft items-center active:bg-soft/10"
      >
        <Typography variant="caption" className="font-bold text-primary-main">
          View All Programs
        </Typography>
      </TouchableOpacity>
    </Card>
  );
}

// Inline Plus icon component just in case it is needed (already imported)
const Plus = ({ size, color }: { size: number; color: string }) => (
  <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
    <Typography style={{ color, fontSize: size, lineHeight: size, fontWeight: 'bold' }}>+</Typography>
  </View>
);
