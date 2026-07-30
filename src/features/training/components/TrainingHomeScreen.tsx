import React, { useCallback, useMemo } from 'react';
import { View } from 'react-native';
import { useFocusEffect, router } from 'expo-router';
import { Dumbbell, Plus } from 'lucide-react-native';
import { useProgramList } from '../hooks/useProgramList';
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { Icon } from '@/components/ui/icon';
import { Separator } from '@/components/ui/separator';
import { FeedbackDialog } from '@/components/organisms/FeedbackDialog';
import { ConfirmModal } from '@/components/organisms/ConfirmModal';
import { ProgramCard } from './ProgramCard';
import { ActiveSessionHeroCard } from './ActiveSessionHeroCard';

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

  // Filtragem dinâmica: oculta das listas o programa que atualmente possui uma sessão ativa no HeroCard
  const visiblePinnedPrograms = useMemo(() => {
    if (!activeSession) return pinnedPrograms;
    return pinnedPrograms.filter(({ program }) => program.id !== activeSession.programId);
  }, [pinnedPrograms, activeSession]);

  const visibleOtherPrograms = useMemo(() => {
    if (!activeSession) return otherPrograms;
    return otherPrograms.filter(({ program }) => program.id !== activeSession.programId);
  }, [otherPrograms, activeSession]);

  return (
    <View className="py-2 pb-content-bottom">
      {/* 1. Hero Card: Treino Em Andamento (se houver sessão ativa) */}
      {activeSession && (
        <ActiveSessionHeroCard session={activeSession} />
      )}

      {/* 2. Programas Ativos (Pinned) */}
      {visiblePinnedPrograms.length > 0 && (
        <View className="mb-6">
          <Text variant="title" className="mb-3 font-bold text-text-primary">
            Programas Ativos
          </Text>

          {visiblePinnedPrograms.map(({ program, blocks }) => (
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
        className="mb-6 min-h-control-lg justify-center"
        onPress={() => {
          setFeedback({ type: 'info', title: 'Em breve', message: 'Treino rápido será implementado em breve.' });
        }}
      >
        <Text>Treino Rápido</Text>
      </Button>

      {visibleOtherPrograms.length > 0 && visiblePinnedPrograms.length > 0 && (
        <Separator className="my-2 mb-6" />
      )}

      {/* 3. Outros Planos */}
      {visibleOtherPrograms.length > 0 && (
        <View className="mb-6">
          <Text variant="subtitle" className="mb-3 font-bold text-text-primary">
            Outros Planos
          </Text>

          <View className="rounded-xl border border-border-subtle bg-surface overflow-hidden">
            {visibleOtherPrograms.map(({ program, blocks }, index) => (
              <ProgramCard
                key={program.id}
                program={program}
                blocks={blocks}
                isPinned={false}
                isActive={program.isPinned}
                hasActiveSession={activeSession?.programId === program.id}
                variant="compact"
                isFirst={index === 0}
                isLast={index === visibleOtherPrograms.length - 1}
                onTogglePin={togglePin}
                onDeleteAttempt={handleDeleteAttempt}
              />
            ))}
          </View>
        </View>
      )}

      {/* Empty State */}
      {pinnedPrograms.length === 0 && otherPrograms.length === 0 && !isLoading && (
        <View className="my-8 items-center justify-center rounded-xl bg-surface border border-border-subtle p-8 text-center">
          <View className="mb-4 h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <Icon as={Dumbbell} size={32} className="text-primary" />
          </View>
          <Text variant="subtitle" className="mb-2 font-bold text-center text-text-primary">
            Nenhum programa de treino
          </Text>
          <Text variant="text" className="text-text-secondary text-center mb-6 max-w-xs">
            Crie sua primeira rotina e acompanhe sua evolução a cada série.
          </Text>
          <Button
            variant="default"
            onPress={() => router.push('/training/create-program')}
            className="flex-row items-center gap-2"
          >
            <Icon as={Plus} size={18} className="text-primary-foreground" />
            <Text>Criar primeiro programa</Text>
          </Button>
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
