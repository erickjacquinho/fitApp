import { Text } from '@/components/ui/text';
import React, { useState, useEffect, useCallback } from 'react';
import { View, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useFocusEffect, router } from 'expo-router';
import { Dumbbell, ChevronRight } from 'lucide-react-native';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useWorkoutHistory } from '../hooks/useWorkoutHistory';
import { Icon } from '@/components/ui/icon';
import { useThemeColors } from '../../../hooks/use-theme-colors';
import WorkoutSession from '@/db/models/WorkoutSession';
import { HistorySessionCard } from './HistorySessionCard';


export function HistoryScreen({ programId }: { programId?: string }) {
  const [selectedOption, setSelectedOption] = useState<{ label: string, value: string } | undefined>(
    programId ? { label: '', value: programId } : { label: 'Todos os programas', value: 'all' }
  );
  const { history, programs, isLoading, loadHistory } = useWorkoutHistory(selectedOption?.value || 'all');
  const { primary } = useThemeColors();
  const insets = useSafeAreaInsets();
  
  const contentInsets = {
    top: insets.top,
    bottom: insets.bottom,
    left: 12,
    right: 12,
  };

  useFocusEffect(
    useCallback(() => {
      loadHistory();
    }, [loadHistory])
  );

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color={primary} />
      </View>
    );
  }

  return (
    <View className="py-4 pb-content-bottom">
      {!programId && (
        <View className="mb-4">
          <Text className="text-sm font-medium text-secondary mb-1.5 ml-1">
            Filtrar por programa
          </Text>
          <Select value={selectedOption} onValueChange={setSelectedOption}>
            <SelectTrigger className="w-full">
              <SelectValue
                placeholder="Todos os programas"
              />
            </SelectTrigger>
            <SelectContent insets={contentInsets} className="w-full">
              <SelectGroup>
                <SelectLabel>Programas</SelectLabel>
                <SelectItem label="Todos os programas" value="all">
                  Todos os programas
                </SelectItem>
                {programs.map((p) => (
                  <SelectItem key={p.id} label={p.name} value={p.id}>
                    {p.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </View>
      )}

      <View className="w-full">
        {history.map((session, index) => (
          <HistorySessionCard 
            key={session.id} 
            session={session} 
            isFirst={index === 0}
            isLast={index === history.length - 1}
          />
        ))}
      </View>

      {history.length === 0 && (
        <View className="my-12 items-center justify-center py-10">
          <View className="mb-4 h-16 w-16 items-center justify-center rounded-full bg-surface-elevated">
            <Icon as={Dumbbell} size={32} className="text-text-secondary" />
          </View>
          <Text variant="subtitle" className="mb-2 text-center">
            Nenhum treino registrado
          </Text>
          <Text variant="text" className="text-text-secondary text-center">
            Os treinos que você concluir aparecerão aqui.
          </Text>
        </View>
      )}
    </View>
  );
}
