import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { router } from 'expo-router';
import { ChevronRight, Calendar, Clock, Zap, ZapOff } from 'lucide-react-native';
import { Text } from '@/components/ui/text';
import { Icon } from '@/components/ui/icon';
import { BaseCardList, BaseCardListProps } from '@/components/molecules/BaseCardList';
import WorkoutSession from '@/db/models/WorkoutSession';

export const formatHistoryDate = (timestamp: number) => {
  const d = new Date(timestamp);
  const now = new Date();
  const isCurrentYear = d.getFullYear() === now.getFullYear();

  const dayName = d.toLocaleDateString('pt-BR', { weekday: 'long' });
  const dayNameShort = dayName.split('-')[0]; // "segunda-feira" -> "segunda"
  const dayAndMonth = d.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long' });
  
  if (isCurrentYear) {
    return `${dayNameShort}, ${dayAndMonth}`;
  } else {
    return `${dayAndMonth}, ${d.getFullYear()}`;
  }
};

export const getHistoryDuration = (start: number, end?: number | null) => {
  if (!end) return '--';
  const diffMs = end - start;
  const diffMins = Math.floor(diffMs / 1000 / 60);
  if (diffMins < 60) return `${diffMins}m`;
  const hours = Math.floor(diffMins / 60);
  const mins = diffMins % 60;
  return `${hours}h ${mins}m`;
};

export function useSessionDetailsData(session: WorkoutSession) {
  const [data, setData] = useState({
    programName: 'Carregando...',
    workoutName: 'Treino',
    completedSets: 0,
    totalSets: 0,
    isPinned: false,
  });

  useEffect(() => {
    let isMounted = true;

    async function load() {
      try {
        const program = await session.program.fetch();
        const executions = await session.executions.fetch();
        
        let workoutName = 'Treino Extra';
        let totalSets = 0;
        let completedSets = executions.length;
        
        if (executions.length > 0) {
          const firstExec = executions[0];
          const exercise = await firstExec.exercise.fetch();
          if (exercise) {
            const block = await exercise.trainingBlock.fetch();
            if (block) {
              workoutName = block.name;
              const blockExercises = await block.exercises.fetch();
              totalSets = blockExercises.reduce((sum, ex) => sum + ex.sets, 0);
            }
          }
        }
        
        if (isMounted) {
          setData({
            programName: program?.name || 'Programa Desconhecido',
            workoutName,
            completedSets,
            totalSets: totalSets === 0 ? completedSets : totalSets,
            isPinned: program?.isPinned || false,
          });
        }
      } catch (err) {
        console.error(err);
      }
    }
    load();
    return () => {
      isMounted = false;
    };
  }, [session]);

  return data;
}

export interface HistorySessionCardProps extends Omit<BaseCardListProps, 'children'> {
  session: WorkoutSession;
}

export function HistorySessionCard({ session, ...props }: HistorySessionCardProps) {
  const { programName, workoutName, completedSets, totalSets, isPinned } = useSessionDetailsData(session);

  const formattedDate = formatHistoryDate(session.startDate);
  const formattedDuration = getHistoryDuration(session.startDate, session.endDate);

  const defaultA11yLabel = `Treino ${workoutName} do programa ${programName}, realizado ${formattedDate}. Duração de ${formattedDuration}. ${completedSets} de ${totalSets} séries concluídas. Tocar para abrir detalhes.`;

  return (
    <BaseCardList
      accessibilityRole="button"
      accessibilityLabel={props.accessibilityLabel || defaultA11yLabel}
      onPress={() => {
        if (props.onPress) {
          props.onPress();
        } else {
          router.push({
            pathname: `/training/details/[id]`,
            params: { id: session.id },
          });
        }
      }}
      {...props}
    >
      <View className="flex-1 pr-4 gap-1.5">
        
        {/* Linha 1: Título do Treino com Zap opcional */}
        <View className="flex-row items-center gap-1.5">
          <Text variant="subtitle" className="font-bold shrink" numberOfLines={1}>
            {workoutName}
          </Text>
          <Icon as={isPinned ? Zap : ZapOff} size={16} className={isPinned ? "text-primary shrink-0" : "text-text-disabled shrink-0"} />
        </View>
        
        {/* Linha 2: Data (65%) e Duração (35%) */}
        <View className="flex-row items-center mt-1">
          
          <View className="w-[65%] flex-row items-center gap-1.5 pr-2">
            <Icon as={Calendar} size={16} className="text-text-secondary" />
            <Text className="text-sm text-secondary" numberOfLines={1}>{formattedDate}</Text>
          </View>
          
          <View className="w-[35%] flex-row items-center gap-1.5">
            <Icon as={Clock} size={16} className="text-text-secondary" />
            <Text className="text-sm text-secondary" numberOfLines={1}>{formattedDuration}</Text>
          </View>

        </View>

      </View>

      <Icon as={ChevronRight} size={20} className="text-text-secondary" importantForAccessibility="no" aria-hidden={true} />
    </BaseCardList>
  );
}
