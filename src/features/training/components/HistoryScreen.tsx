import React, { useState, useCallback } from 'react';
import { View, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useFocusEffect, router } from 'expo-router';
import { Calendar, Clock, Dumbbell, ChevronRight } from 'lucide-react-native';
import { Typography } from '../../../components/atoms/Typography';
import { Card } from '../../../components/atoms/Card';
import { useWorkoutHistory } from '../hooks/useWorkoutHistory';

export function HistoryScreen() {
  const { history, isLoading, loadHistory } = useWorkoutHistory();

  useFocusEffect(
    useCallback(() => {
      loadHistory();
    }, [loadHistory])
  );

  const formatDate = (timestamp: number) => {
    const d = new Date(timestamp);
    return d.toLocaleDateString(undefined, {
      day: '2-digit',
      month: 'short',
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

  return (
    <ScrollView keyboardShouldPersistTaps="handled" className="flex-1 bg-surface-app p-4">
      <Typography variant="title" className="mb-4 text-2xl font-bold">
        Workout History
      </Typography>

      {history.map((session) => {
        // We need to fetch the program name dynamically
        const [programName, setProgramName] = useState('Loading program...');

        React.useEffect(() => {
          session.program.fetch().then((p) => {
            if (p) setProgramName(p.name);
          });
        }, [session]);

        return (
          <TouchableOpacity
            key={session.id}
            onPress={() =>
              router.push({
                pathname: `/training/details/[id]`,
                params: { id: session.id },
              })
            }
            activeOpacity={0.7}
          >
            <Card className="mb-3 p-4 flex-row items-center justify-between border border-soft bg-component-card-bg active:bg-soft/10">
              <View className="flex-1 pr-2">
                <Typography variant="subtitle" className="font-bold text-base">
                  {programName}
                </Typography>
                
                <View className="flex-row items-center gap-4 mt-2">
                  <View className="flex-row items-center gap-1">
                    <Calendar size={14} color="#666" />
                    <Typography variant="caption" color="muted">
                      {formatDate(session.startDate)}
                    </Typography>
                  </View>

                  <View className="flex-row items-center gap-1">
                    <Clock size={14} color="#666" />
                    <Typography variant="caption" color="muted">
                      {getDuration(session.startDate, session.endDate)}
                    </Typography>
                  </View>
                </View>
              </View>

              <ChevronRight size={18} color="#666" />
            </Card>
          </TouchableOpacity>
        );
      })}

      {history.length === 0 && (
        <View className="my-12 items-center justify-center py-10">
          <View className="mb-4 h-16 w-16 items-center justify-center rounded-full bg-soft">
            <Dumbbell size={32} color="#666" />
          </View>
          <Typography variant="subtitle" className="mb-2 text-center">
            No Workouts Logged Yet
          </Typography>
          <Typography variant="text" color="muted" className="text-center">
            Complete active training sessions to build your history.
          </Typography>
        </View>
      )}
    </ScrollView>
  );
}
