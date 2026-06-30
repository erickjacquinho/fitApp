import React, { useCallback } from 'react';
import { View, Pressable } from 'react-native';
import { useFocusEffect, router } from 'expo-router';
import { Trash2, Dumbbell, Play, Pin, PinOff } from 'lucide-react-native';
import { useProgramList } from '../hooks/useProgramList';
import TrainingBlock from '../../../db/models/TrainingBlock';
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { Card } from "@/components/ui/card";
import { Icon } from '@/components/ui/icon';
import { Separator } from '@/components/ui/separator';
import { FeedbackDialog } from '@/components/organisms/FeedbackDialog';
import { ConfirmModal } from '@/components/organisms/ConfirmModal';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogBody } from '@/components/ui/dialog';

export function TrainingHomeScreen() {
  const {
    pinnedPrograms,
    otherPrograms,
    activeSession,
    isLoading,
    loadData,
    deleteProgram,
    startSession,
    togglePin,
    feedback,
    setFeedback,
    clearFeedback,
  } = useProgramList();

  const [activeSessionConfirmVisible, setActiveSessionConfirmVisible] = React.useState(false);
  const [deleteConfirmVisible, setDeleteConfirmVisible] = React.useState(false);
  const [programToDelete, setProgramToDelete] = React.useState<{ id: string, name: string } | null>(null);
  
  const [blockSelectVisible, setBlockSelectVisible] = React.useState(false);
  const [selectedProgram, setSelectedProgram] = React.useState<{ id: string, name: string, blocks: TrainingBlock[] } | null>(null);

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

  const handleStartSession = (programId: string, programName: string, blocks: TrainingBlock[]) => {
    if (blocks.length === 0) {
      setFeedback({ type: 'info', title: 'Sem treinos', message: 'Este programa não possui blocos de treino. Adicione um bloco primeiro.' });
      return;
    }

    if (activeSession) {
      setActiveSessionConfirmVisible(true);
      return;
    }

    setSelectedProgram({ id: programId, name: programName, blocks });
    setBlockSelectVisible(true);
  };

  const renderProgramCard = (program: any, blocks: TrainingBlock[], isPinned: boolean) => (
    <Pressable
      key={program.id}
      onPress={() => {
        router.push(`/training/program/${program.id}`);
      }}
      className="mb-4 active:opacity-70"
    >
      <Card>
        <View className="flex-row items-start justify-between">
          <View className="flex-1 pr-2">
            <Text variant="subtitle" className="font-bold">
              {program.name}
            </Text>
            <Text variant="caption" className="text-text-secondary mt-1">
              {blocks.length === 1 ? '1 bloco' : `${blocks.length} blocos`}
              {blocks.length > 0 ? ` (${blocks.map((b) => b.name).join(', ')})` : ' (sem treinos)'}
            </Text>
          </View>

          <View className="flex-row gap-2">
            <Button
              accessibilityLabel={isPinned ? `Desativar ${program.name}` : `Ativar ${program.name}`}
              variant="ghost"
              size="icon"
              onPress={() => togglePin(program.id, !isPinned)}
            >
              <Icon as={isPinned ? PinOff : Pin} size={16} className="text-text-secondary" />
            </Button>
            <Button
              accessibilityLabel={`Excluir ${program.name}`}
              variant="ghost"
              size="icon"
              onPress={() => handleDeleteAttempt(program.id, program.name)}
            >
              <Icon as={Trash2} size={16} className="text-error" />
            </Button>
          </View>
        </View>

        {blocks.length > 0 && (
          <Button
            variant="outline"
            onPress={() => handleStartSession(program.id, program.name, blocks)}
          >
            <Icon as={Play} size={16} fill="currentColor" />
            <Text variant="label">
              Iniciar treino
            </Text>
          </Button>
        )}
      </Card>
    </Pressable>
  );

  return (
    <View className="py-4 pb-content-bottom">
        {/* Quick Action Banner */}
        {activeSession ? (
          <Card className="mb-4 border-primary bg-primary-soft p-4 flex-row items-center justify-between">
            <View className="flex-1 pr-2">
              <Text variant="subtitle" className="text-primary">
                Sessão de treino em andamento
              </Text>
              <Text variant="caption" className="text-text-secondary">
                Há uma sessão de treino não finalizada.
              </Text>
            </View>
            <Button size="sm" onPress={() => router.push('/training/active')}><Text>Retomar</Text></Button>
          </Card>
        ) : null}

        {pinnedPrograms.length > 0 && (
          <View className="mb-6">
            <Text variant="title" className="mb-4 text-text-primary">
              Programas Ativos
            </Text>
            {pinnedPrograms.map(({ program, blocks }) => renderProgramCard(program, blocks, true))}
          </View>
        )}

        {/* Quick Train Button */}
        <Button
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

        {otherPrograms.map(({ program, blocks }) => renderProgramCard(program, blocks, false))}

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
            router.push('/training/active');
          }}
          title="Treino em andamento"
          description="Você já possui uma sessão em andamento. Retome ou finalize o treino primeiro."
          confirmLabel="Ir para o treino"
          cancelLabel="Cancelar"
        />

        <Dialog open={blockSelectVisible} onOpenChange={(open) => !open && setBlockSelectVisible(false)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Iniciar treino</DialogTitle>
            </DialogHeader>
            <DialogBody>
              <View className="pb-4">
                <Text variant="caption" className="text-text-secondary mb-4">
                  Escolha um bloco do programa &quot;{selectedProgram?.name}&quot;:
                </Text>
                {selectedProgram?.blocks.map((block) => (
                  <Button
                    key={block.id}
                    variant="outline"
                    className="mb-2"
                    onPress={async () => {
                      setBlockSelectVisible(false);
                      await startSession(selectedProgram.id, block.id);
                    }}
                  >
                    <Text>{block.name}</Text>
                  </Button>
                ))}
              </View>
            </DialogBody>
          </DialogContent>
        </Dialog>
    </View>
  );
}
