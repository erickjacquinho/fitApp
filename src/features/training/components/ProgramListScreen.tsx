import React, { useCallback } from 'react';
import { View, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useFocusEffect, router } from 'expo-router';
import { Plus, Trash2, Dumbbell, History, Play } from 'lucide-react-native';
import { Typography } from '../../../components/atoms/Typography';
import { Card } from '../../../components/atoms/Card';
import { Button } from '../../../components/atoms/Button';
import { useProgramList } from '../hooks/useProgramList';
import TrainingBlock from '../../../db/models/TrainingBlock';

export function ProgramListScreen() {
  const {
    programsData,
    activeSession,
    isLoading,
    loadData,
    handleDeleteProgram,
    startSession,
  } = useProgramList();

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [loadData])
  );

  const handleStartSession = (programId: string, programName: string, blocks: TrainingBlock[]) => {
    if (blocks.length === 0) {
      Alert.alert('No Workouts', 'This program does not have any workout blocks. Add blocks first.');
      return;
    }

    if (activeSession) {
      Alert.alert(
        'Active Workout',
        'You already have an ongoing training session. Resume or finish it first.',
        [
          { text: 'Go to Active Workout', onPress: () => router.push('/training/active') },
          { text: 'Cancel', style: 'cancel' }
        ]
      );
      return;
    }

    Alert.alert(
      'Start Workout',
      `Choose a workout block to begin from "${programName}":`,
      [
        ...blocks.map((block) => ({
          text: block.name,
          onPress: () => startSession(programId, block.id),
        })),
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  return (
    <ScrollView keyboardShouldPersistTaps="handled" className="flex-1 bg-surface-app p-4">
      {/* Quick Action Banner */}
      {activeSession ? (
        <Card className="mb-4 border-primary-main/30 bg-primary-main/5 p-4 flex-row items-center justify-between">
          <View className="flex-1 pr-2">
            <Typography variant="subtitle" className="text-primary-main">
              Workout Session in Progress!
            </Typography>
            <Typography variant="caption" color="muted">
              You have an unfinished workout session active in the background.
            </Typography>
          </View>
          <Button
            title="Resume"
            size="sm"
            onPress={() => router.push('/training/active')}
          />
        </Card>
      ) : null}

      {/* Main Buttons */}
      <View className="mb-4 flex-row gap-2">
        <TouchableOpacity
          onPress={() => router.push('/training/history')}
          className="flex-1 flex-row items-center justify-center gap-2 rounded border border-soft bg-white-pure py-3 active:bg-soft/10"
        >
          <History size={18} color="#005B94" />
          <Typography variant="label">Workout History</Typography>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push('/training/create-program')}
          className="flex-1 flex-row items-center justify-center gap-2 rounded bg-primary-main py-3 active:bg-primary-dark"
        >
          <Plus size={18} color="#fff" />
          <Typography variant="label" color="inverse">
            New Program
          </Typography>
        </TouchableOpacity>
      </View>

      {/* Programs List */}
      <Typography variant="title" className="mb-3">
        Training Programs
      </Typography>

      {programsData.map(({ program, blocks }) => (
        <Card key={program.id} className="mb-4 p-4">
          <View className="flex-row items-start justify-between">
            <View className="flex-1 pr-2">
              <Typography variant="subtitle" className="text-lg font-bold">
                {program.name}
              </Typography>
              <Typography variant="caption" color="muted" className="mt-1">
                {blocks.length} workout routines ({blocks.map((b) => b.name).join(', ') || 'no workouts'})
              </Typography>
            </View>

            <TouchableOpacity
              onPress={() => handleDeleteProgram(program.id, program.name)}
              className="p-1"
            >
              <Trash2 size={16} color="#ef4444" />
            </TouchableOpacity>
          </View>

          {blocks.length > 0 && (
            <TouchableOpacity
              onPress={() => handleStartSession(program.id, program.name, blocks)}
              className="mt-4 flex-row items-center justify-center gap-2 rounded bg-surface-app py-2.5 active:bg-soft/20 border border-soft"
            >
              <Play size={14} color="#005B94" fill="#005B94" />
              <Typography variant="label" className="text-sm text-primary-main">
                Start Training Routine
              </Typography>
            </TouchableOpacity>
          )}
        </Card>
      ))}

      {programsData.length === 0 && !isLoading && (
        <View className="my-12 items-center justify-center py-10">
          <View className="mb-4 h-16 w-16 items-center justify-center rounded-full bg-soft">
            <Dumbbell size={32} color="#666" />
          </View>
          <Typography variant="subtitle" className="mb-2 text-center">
            No Training Programs Found
          </Typography>
          <Typography variant="text" color="muted" className="text-center mb-6">
            Build your routines, exercises, and log your execution volume.
          </Typography>
          <Button
            title="Create Your First Program"
            onPress={() => router.push('/training/create-program')}
          />
        </View>
      )}
    </ScrollView>
  );
}
