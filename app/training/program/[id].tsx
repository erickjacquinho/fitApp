import React, { useState, useEffect, useCallback } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Edit2 } from 'lucide-react-native';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Screen } from '@/components/ui/screen';
import { Header } from '@/components/molecules/Header';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { ConfirmModal } from '@/components/organisms/ConfirmModal';
import { ProgramSummaryScreen } from '@/features/training/components/ProgramSummaryScreen';
import { useProgramSummary } from '@/features/training/hooks/useProgramSummary';
import { SessionService } from '@/features/training/services/session-service';
import { useThemeColors } from '@/hooks/use-theme-colors';

export default function ProgramSummaryRoute() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const colors = useThemeColors();

  const { program, blocks, completedSessionsCount, isLoading, error, updateBlocksOrder } = useProgramSummary(id || '');
  const [activeSession, setActiveSession] = useState<any>(null);
  const [activeSessionConfirmVisible, setActiveSessionConfirmVisible] = useState(false);

  const checkActiveSession = useCallback(async () => {
    if (!id) return;
    try {
      const active = await SessionService.getActiveSession();
      setActiveSession(active);
    } catch (err) {
      console.error('Error fetching active session:', err);
    }
  }, [id]);

  useEffect(() => {
    checkActiveSession();
  }, [checkActiveSession]);

  if (!id) {
    return null;
  }

  const handleStartSession = async (blockId: string) => {
    if (activeSession && activeSession.programId !== id) {
      setActiveSessionConfirmVisible(true);
      return;
    }
    
    // If there is an active session for this same program, we should probably resume it
    if (activeSession && activeSession.programId === id) {
      router.push({
        pathname: '/training/active',
        params: { sessionId: activeSession.id, blockId },
      });
      return;
    }

    try {
      const targetDate = new Date().toISOString().split('T')[0];
      const session = await SessionService.startSession(id, targetDate);
      await checkActiveSession();
      router.push({
        pathname: '/training/active',
        params: { sessionId: session.id, blockId },
      });
    } catch (err) {
      console.error('Error starting session:', err);
    }
  };

  let formattedDate = '';
  if (program?.createdAt) {
    const date = new Date(program.createdAt);
    const day = format(date, 'dd');
    const month = format(date, 'MMMM', { locale: ptBR });
    const capitalizedMonth = month.charAt(0).toUpperCase() + month.slice(1);
    const year = format(date, 'yyyy');
    formattedDate = `${day} de ${capitalizedMonth}, ${year}`;
  }

  const HeaderRight = () => (
    <Button
      variant="ghost"
      size="icon"
      onPress={() => router.push(`/training/edit-program/${id}`)}
      className="-mr-1"
    >
      <Icon as={Edit2} size={20} color={colors.textPrimary} />
    </Button>
  );

  if (isLoading) {
    return (
      <Screen header={<Header title="Carregando..." showBackButton />} scrollable={false}>
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      </Screen>
    );
  }

  if (error || !program) {
    return (
      <Screen header={<Header title="Erro" showBackButton />} scrollable={false}>
        <View className="flex-1 items-center justify-center p-4">
          <Text className="text-text-primary text-center">
            {error?.message || 'Programa não encontrado'}
          </Text>
        </View>
      </Screen>
    );
  }

  return (
    <Screen
      header={
        <Header 
          title={program.name}
          showBackButton 
          headerRight={<HeaderRight />}
        />
      }
      scrollable={false}
      withPadding={false}
    >
      <ProgramSummaryScreen 
        blocks={blocks}
        completedSessionsCount={completedSessionsCount}
        formattedDate={formattedDate}
        updateBlocksOrder={updateBlocksOrder}
        onEditProgram={() => {
          router.push(`/training/edit-program/${id}`);
        }}
        onWorkoutPress={(blockId) => {
          router.push(`/training/block/${blockId}`);
        }}
        onStartSession={handleStartSession}
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
    </Screen>
  );
}
