import React, { useState, useEffect, useCallback } from 'react';
import { View, ActivityIndicator, Pressable } from 'react-native';
import { router } from 'expo-router';
import { Play, Edit2, Check } from 'lucide-react-native';
import { Text } from '../../../components/ui/text';
import { Button } from '../../../components/ui/button';
import { Card } from '../../../components/ui/card';
import { Icon } from '@/components/ui/icon';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogBody } from '@/components/ui/dialog';
import { ConfirmModal } from '@/components/organisms/ConfirmModal';
import { useProgramSummary, BlockWithSets } from '../hooks/useProgramSummary';
import { WorkoutListItem } from './WorkoutListItem';
import { SessionService } from '../services/session-service';
import DraggableFlatList, { RenderItemParams } from 'react-native-draggable-flatlist';
import { useThemeColors } from '../../../hooks/use-theme-colors';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, runOnJS, Easing } from 'react-native-reanimated';

interface ProgramSummaryScreenProps {
  programId: string;
  onEditProgram: () => void;
  onWorkoutPress: (blockId: string) => void;
}

export const ProgramSummaryScreen = ({
  programId,
  onEditProgram,
  onWorkoutPress,
}: ProgramSummaryScreenProps) => {
  const { program, blocks, isLoading, error, updateBlocksOrder } = useProgramSummary(programId);
  const { primary } = useThemeColors();

  const progress = useSharedValue(0);

  const animatedProgressStyle = useAnimatedStyle(() => {
    return {
      width: `${progress.value * 100}%`,
    };
  });

  const [activeSession, setActiveSession] = useState<any>(null);
  const [activeSessionConfirmVisible, setActiveSessionConfirmVisible] = useState(false);
  const [blockSelectVisible, setBlockSelectVisible] = useState(false);

  const checkActiveSession = useCallback(async () => {
    try {
      const active = await SessionService.getActiveSession();
      setActiveSession(active);
    } catch (err) {
      console.error('Error fetching active session:', err);
    }
  }, []);

  useEffect(() => {
    checkActiveSession();
  }, [checkActiveSession]);

  const handleStartSession = async (blockId: string) => {
    if (activeSession && activeSession.programId !== programId) {
      setActiveSessionConfirmVisible(true);
      return;
    }
    try {
      const targetDate = new Date().toISOString().split('T')[0];
      const session = await SessionService.startSession(programId, targetDate);
      await checkActiveSession();
      router.push({
        pathname: '/training/active',
        params: { sessionId: session.id, blockId },
      });
    } catch (err) {
      console.error('Error starting session:', err);
    }
  };

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color={primary} />
      </View>
    );
  }

  if (error || !program) {
    return (
      <View className="flex-1 items-center justify-center p-4">
        <Text className="text-typography-primary text-center">
          {error?.message || 'Program not found'}
        </Text>
      </View>
    );
  }

  const renderItem = ({ item, drag, isActive, getIndex }: RenderItemParams<BlockWithSets>) => {
    const index = getIndex();
    const isFirst = index === 0;
    const isLast = index === blocks.length - 1;

    return (
      <WorkoutListItem
        item={item}
        isReordering={false}
        drag={drag}
        isActive={isActive}
        isFirst={isFirst}
        isLast={isLast}
        onPress={() => onWorkoutPress(item.block.id)}
      />
    );
  };

  const isCurrentProgramActive = activeSession && activeSession.programId === programId;

  let buttonText = "Segure para iniciar treino";
  let buttonIcon = Play;
  let buttonOnPress = () => {
    if (blocks.length === 1) {
      handleStartSession(blocks[0].block.id);
    } else {
      setBlockSelectVisible(true);
    }
  };

  if (isCurrentProgramActive) {
    buttonText = "Segure para terminar treino";
    buttonIcon = Check;
    buttonOnPress = async () => {
      try {
        const completed = await SessionService.finishSession(activeSession.id);
        await checkActiveSession();
        router.replace({
          pathname: `/training/details/[id]`,
          params: { id: completed.id },
        });
      } catch (err) {
        console.error('Error finishing session:', err);
      }
    };
  }

  const handleHoldStart = () => {
    progress.value = withTiming(1, {
      duration: 1500,
      easing: Easing.linear,
    }, (finished) => {
      if (finished) {
        progress.value = 0; // reset
        runOnJS(buttonOnPress)();
      }
    });
  };

  const handleHoldEnd = () => {
    if (progress.value < 1) {
      progress.value = withTiming(0, { duration: 200 });
    }
  };

  return (
    <View className="flex-1 px-4 py-2">
      {/* Action Card with Bifurcation */}
      <Card className="p-4 mb-6 border border-border-subtle bg-surface">
        <View className="mb-4">
          <Text variant="title" className="font-bold text-text-primary">
            {program.name}
          </Text>
          <Text variant="caption" className="text-text-secondary mt-1">
            {blocks.length === 1 ? '1 treino planejado' : `${blocks.length} treinos planejados`}
          </Text>
        </View>

        <View className="flex-row gap-3">
          <Pressable
            onPressIn={handleHoldStart}
            onPressOut={handleHoldEnd}
            disabled={blocks.length === 0}
            className="flex-1 min-h-control-lg bg-primary rounded-md overflow-hidden justify-center items-center relative active:opacity-90"
          >
            <Animated.View 
              className="absolute left-0 top-0 bottom-0 bg-text-inverse opacity-35" 
              style={animatedProgressStyle} 
            />
            <View className="flex-row items-center gap-2 z-10">
              <Icon as={buttonIcon} size={20} fill={buttonIcon === Play ? "currentColor" : undefined} className="text-text-inverse" />
              <Text variant="label" className="text-text-inverse font-bold">
                {buttonText}
              </Text>
            </View>
          </Pressable>

          <Button
            variant="outline"
            className="flex-1 min-h-control-lg flex-row items-center justify-center gap-2 border-primary"
            onPress={onEditProgram}
          >
            <Icon as={Edit2} size={18} className="text-primary" />
            <Text variant="label" className="text-primary font-bold">
              Editar Plano
            </Text>
          </Button>
        </View>
      </Card>

      {/* Secondary list-level tools (Reorder view toggle) */}
      {blocks.length > 0 && (
        <View className="flex-row items-center justify-between mb-4">
          <Text variant="subtitle" className="font-bold text-text-primary">
            Lista de Treinos
          </Text>
        </View>
      )}

      {blocks.length === 0 ? (
        <View className="flex-1 items-center justify-center py-10">
          <Text className="text-typography-secondary text-center">
            Nenhum bloco de treino neste programa.
          </Text>
          <Button variant="default" className="mt-4" onPress={onEditProgram}>
            <Text>Adicionar Treino</Text>
          </Button>
        </View>
      ) : (
        <DraggableFlatList
          data={blocks}
          onDragEnd={({ data }) => updateBlocksOrder(data.map(d => d.block))}
          keyExtractor={(item) => item.block.id}
          renderItem={renderItem}
          containerStyle={{ flex: 1 }}
          contentContainerStyle={{ paddingBottom: 24 }}
        />
      )}

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

      <Dialog open={blockSelectVisible} onOpenChange={(open) => !open && setBlockSelectVisible(false)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Iniciar treino</DialogTitle>
          </DialogHeader>
          <DialogBody>
            <View className="pb-4">
              <Text variant="caption" className="text-text-secondary mb-4">
                Escolha um bloco do programa &quot;{program?.name}&quot;:
              </Text>
              {blocks.map((b) => (
                <Button
                  key={b.block.id}
                  variant="outline"
                  className="mb-2 min-h-control-md flex-row justify-start px-4 border-border-control"
                  onPress={() => {
                    setBlockSelectVisible(false);
                    setTimeout(async () => {
                      await handleStartSession(b.block.id);
                    }, 200);
                  }}
                >
                  <Text className="text-text-primary font-bold">{b.block.name}</Text>
                </Button>
              ))}
            </View>
          </DialogBody>
        </DialogContent>
      </Dialog>
    </View>
  );
};
