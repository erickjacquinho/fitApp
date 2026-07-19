import React, { useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { useWorkoutDetails } from '../hooks/useWorkoutDetails';
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { Input } from "@/components/ui/input";
import { useThemeColors } from '../../../hooks/use-theme-colors';
import { WorkoutSummaryCard } from './WorkoutSummaryCard';
import { WorkoutSummaryMetrics } from './WorkoutSummaryMetrics';
import { WorkoutSummaryExerciseList } from './WorkoutSummaryExerciseList';
import { SessionService } from '../services/session-service';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogBody, DialogFooter } from '@/components/ui/dialog';

export function SessionDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { primary } = useThemeColors();

  const [isNotesOpen, setIsNotesOpen] = useState(false);
  const [editNotesText, setEditNotesText] = useState('');
  const [isSavingNotes, setIsSavingNotes] = useState(false);

  const {
    session,
    programName,
    notes,
    exercisesSummary,
    totalVolume,
    validSets,
    isLoading,
  } = useWorkoutDetails(id);

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color={primary} />
      </View>
    );
  }

  if (!session) {
    return (
      <View className="flex-1 items-center justify-center p-4">
        <Text variant="subtitle" className="mb-4">
          Detalhes da sessão não encontrados
        </Text>
        <Button onPress={() => router.replace('/training')}><Text>Voltar para treinos</Text></Button>
      </View>
    );
  }

  const handleEditTime = () => {
    // Basic implementation alert if they want to edit time
    // since no DateTimePicker is installed
    console.log('Edit Time Pressed');
  };

  const handleEditNotes = () => {
    setEditNotesText(notes || '');
    setIsNotesOpen(true);
  };

  const handleSaveNotes = async () => {
    if (!session) return;
    try {
      setIsSavingNotes(true);
      await SessionService.updateSessionNotes(session.id, editNotesText);
      // In a real app we might refetch or optimistic update, here the DB is reactive but useWorkoutDetails isn't fully reactive to notes yet if it just reads once. 
      // Assuming withObservables would be better, but we use useState.
      setIsNotesOpen(false);
      router.replace({ pathname: '/training/details/[id]', params: { id: session.id } });
    } catch (e) {
      console.error(e);
    } finally {
      setIsSavingNotes(false);
    }
  };

  return (
    <View className="pb-content-bottom mt-4">
      <WorkoutSummaryCard 
        programName={programName}
        startDate={session.startDate}
        endDate={session.endDate}
        notes={notes}
        onEditTime={handleEditTime}
        onEditNotes={handleEditNotes}
      />

      <WorkoutSummaryMetrics 
        startDate={session.startDate}
        endDate={session.endDate}
        validSets={validSets}
        totalVolume={totalVolume}
      />

      <WorkoutSummaryExerciseList 
        exercisesSummary={exercisesSummary} 
      />

      <Button onPress={() => router.replace('/training')} className="mb-6 min-h-control-lg bg-surface border border-border-strong" variant="outline">
        <Text className="text-text-primary">Voltar para histórico</Text>
      </Button>

      {/* Notes Dialog */}
      <Dialog open={isNotesOpen} onOpenChange={setIsNotesOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Notas do Treino</DialogTitle>
            <DialogDescription>Adicione detalhes sobre como foi o seu treino hoje.</DialogDescription>
          </DialogHeader>
          <DialogBody>
            <Input
              value={editNotesText}
              onChangeText={setEditNotesText}
              placeholder="Ex: Treino rendeu muito, aumentar peso no agachamento..."
              multiline
              maxLength={500}
              className="min-h-[120px] text-left align-top"
            />
          </DialogBody>
          <DialogFooter>
            <Button variant="ghost" onPress={() => setIsNotesOpen(false)} className="flex-1">
              <Text>Cancelar</Text>
            </Button>
            <Button onPress={handleSaveNotes} disabled={isSavingNotes} className="flex-1">
              {isSavingNotes ? <ActivityIndicator color="#FFF" /> : <Text>Salvar</Text>}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </View>
  );
}

