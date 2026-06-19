import React, { useState, useCallback } from 'react';
import { View, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useFocusEffect, router } from 'expo-router';
import { Plus, Trash2, Dumbbell, History, Play } from 'lucide-react-native';
import { Typography } from '../../../components/atoms/Typography';
import { Card } from '../../../components/atoms/Card';
import { Button } from '../../../components/atoms/Button';
import { WorkoutService } from '../services/workout-service';
import { SessionService } from '../services/session-service';
import Program from '../../../db/models/Program';
import TrainingBlock from '../../../db/models/TrainingBlock';

interface ProgramWithBlocks {
  program: Program;
  blocks: TrainingBlock[];
}

export function ProgramListScreen() {
  const [programsData, setProgramsData] = useState<ProgramWithBlocks[]>([]);
  const [activeSession, setActiveSession] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  const loadData = useCallback(async () => {
    try {
      setIsLoading(true);
      const active = await SessionService.getActiveSession();
      setActiveSession(active);

      const allPrograms = await WorkoutService.getAllPrograms();
      const loaded: ProgramWithBlocks[] = [];

      for (const p of allPrograms) {
        const blocks = await p.trainingBlocks.fetch();
        loaded.push({ program: p, blocks });
      }

      setProgramsData(loaded);
    } catch (error) {
      console.error('Error loading programs:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [loadData])
  );

  const handleDeleteProgram = (id: string, name: string) => {
    Alert.alert(
      'Delete Program',
      `Are you sure you want to delete the program "${name}"? All associated workouts and plans will be lost.`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await WorkoutService.deleteProgram(id);
              loadData();
            } catch (err) {
              console.error('Error deleting program:', err);
              Alert.alert('Error', 'Failed to delete program');
            }
          },
        },
      ]
    );
  };

  const handleStartSession = async (programId: string, programName: string, blocks: TrainingBlock[]) => {
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

    // Direct the user to choose which workout block they want to execute from this program
    Alert.alert(
      'Start Workout',
      `Choose a workout block to begin from "${programName}":`,
      [
        ...blocks.map((block) => ({
          text: block.name,
          onPress: async () => {
            try {
              const session = await SessionService.startSession(programId);
              router.push({
                pathname: '/training/active',
                params: { sessionId: session.id, blockId: block.id },
              });
            } catch (err) {
              console.error('Error starting session:', err);
            }
          },
        })),
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  return (
    <ScrollView className="flex-1 bg-surface-app p-4">
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
