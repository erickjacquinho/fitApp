import React, { useCallback } from 'react';
import { View } from 'react-native';
import { useFocusEffect, router } from 'expo-router';
import { Dumbbell } from 'lucide-react-native';
import { useProgramList } from '../hooks/useProgramList';
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { Icon } from '@/components/ui/icon';
import { Separator } from '@/components/ui/separator';
import { FeedbackDialog } from '@/components/organisms/FeedbackDialog';
import { ConfirmModal } from '@/components/organisms/ConfirmModal';
import { ProgramCard } from './ProgramCard';

export function TrainingHomeScreen() {
  const {
    pinnedPrograms,
    otherPrograms,
    activeSession,
    isLoading,
    loadData,
    deleteProgram,
    togglePin,
    feedback,
    setFeedback,
    clearFeedback,
  } = useProgramList();

  const [activeSessionConfirmVisible, setActiveSessionConfirmVisible] = React.useState(false);
  const [deleteConfirmVisible, setDeleteConfirmVisible] = React.useState(false);
  const [programToDelete, setProgramToDelete] = React.useState<{ id: string, name: string } | null>(null);
  
  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [loadData])
  );

  const handleDeleteAttempt = (id: string, name: string) => {
    setProgramToDelete({ id, name });
    setDeleteConfirmVisible(true);
  };

  const onConfirmDelete = async () => {
    if (!programToDelete) return;
    setDeleteConfirmVisible(false);
    await deleteProgram(programToDelete.id);
  };



  return (
    <View className="py-4 pb-content-bottom">
        {pinnedPrograms.length > 0 && (
          <View className="mb-6">
            <Text variant="title" className="mb-4 text-text-primary">
              Programas Ativos
            </Text>
            {pinnedPrograms.map(({ program, blocks }) => (
              <ProgramCard
                key={program.id}
                program={program}
                blocks={blocks}
                isPinned={true}
                isActive={program.isPinned}
                hasActiveSession={activeSession?.programId === program.id}
                onTogglePin={togglePin}
                onDeleteAttempt={handleDeleteAttempt}
              />
            ))}
          </View>
        )}

        {/* Quick Train Button */}
        <Button
          variant="secondary"
          className="mb-8 min-h-control-lg"
          onPress={() => {
             // Future: implement quick train
             setFeedback({ type: 'info', title: 'Em breve', message: 'Treino rápido será implementado em breve.' });
          }}
        >
          <Text>Treino Rápido</Text>
        </Button>

        {otherPrograms.length > 0 && (
          <Separator className="my-2 mb-8" />
        )}

        {/* Other Programs List */}
        {otherPrograms.length > 0 && (
          <Text variant="subtitle" className="mb-4 font-bold text-text-primary">
            Outros Planos
          </Text>
        )}

        {otherPrograms.map(({ program, blocks }) => (
          <ProgramCard
            key={program.id}
            program={program}
            blocks={blocks}
            isPinned={false}
            isActive={program.isPinned}
            hasActiveSession={activeSession?.programId === program.id}
            onTogglePin={togglePin}
            onDeleteAttempt={handleDeleteAttempt}
          />
        ))}

        {pinnedPrograms.length === 0 && otherPrograms.length === 0 && !isLoading && (
          <View className="my-12 items-center justify-center py-10">
            <View className="mb-4 h-16 w-16 items-center justify-center rounded-full bg-surface-disabled">
              <Icon as={Dumbbell} size={32} className="text-text-secondary" />
            </View>
            <Text variant="subtitle" className="mb-2 text-center">
              Nenhum programa de treino
            </Text>
            <Text variant="text" className="text-text-secondary text-center mb-6">
              Crie suas rotinas e registre sua evolução.
            </Text>
            <Button onPress={() => router.push('/training/create-program')}><Text>Criar primeiro programa</Text></Button>
          </View>
        )}

        <FeedbackDialog
          visible={!!feedback}
          onClose={clearFeedback}
          state={{
            visible: !!feedback,
            title: feedback?.title || '',
            description: feedback?.message || '',
            isError: feedback?.type === 'error'
          }}
        />

        <ConfirmModal
          visible={deleteConfirmVisible}
          onCancel={() => setDeleteConfirmVisible(false)}
          onConfirm={onConfirmDelete}
          title="Excluir programa"
          description={`Tem certeza que deseja excluir o programa "${programToDelete?.name}"?`}
          confirmLabel="Excluir"
          cancelLabel="Cancelar"
          isDestructive={true}
        />

        <ConfirmModal
          visible={activeSessionConfirmVisible}
          onCancel={() => setActiveSessionConfirmVisible(false)}
          onConfirm={() => {
            setActiveSessionConfirmVisible(false);
            setTimeout(() => {
              router.push('/training/active');
            }, 200);
          }}
          title="Treino em andamento"
          description="Você já possui uma sessão em andamento. Retome ou finalize o treino primeiro."
          confirmLabel="Ir para o treino"
          cancelLabel="Cancelar"
        />


    </View>
  );
}
