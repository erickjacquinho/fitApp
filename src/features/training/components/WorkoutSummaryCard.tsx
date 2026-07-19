import React from 'react';
import { View, Pressable } from 'react-native';
import { Card } from '@/components/ui/card';
import { Text } from '@/components/ui/text';
import { Icon } from '@/components/ui/icon';
import { Edit2, Clock, AlignLeft } from 'lucide-react-native';

interface WorkoutSummaryCardProps {
  programName: string;
  startDate: number;
  endDate?: number | null;
  notes?: string | null;
  onEditTime: () => void;
  onEditNotes: () => void;
}

export function WorkoutSummaryCard({
  programName,
  startDate,
  endDate,
  notes,
  onEditTime,
  onEditNotes,
}: WorkoutSummaryCardProps) {
  const formatTime = (timestamp: number) => {
    const d = new Date(timestamp);
    return d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  };

  const timeString = `${formatTime(startDate)} - ${endDate ? formatTime(endDate) : 'Em andamento'}`;

  return (
    <Card className="mb-section-gap overflow-hidden bg-surface border border-border-subtle shadow-none">
      <View className="p-card border-b border-border-subtle bg-surface-elevated">
        <Text variant="label" className="text-text-secondary mb-1 uppercase tracking-wider">
          Treino
        </Text>
        <Text variant="title" className="text-text-primary font-bold">
          {programName}
        </Text>
      </View>
      
      <View className="p-card gap-4">
        <View className="flex-row justify-between items-center">
          <View className="flex-1">
            <View className="flex-row items-center gap-2 mb-1">
              <Icon as={Clock} size={16} className="text-primary" />
              <Text variant="caption" className="text-text-secondary">Horário</Text>
            </View>
            <Text variant="subtitle" className="text-text-primary font-semibold">
              {timeString}
            </Text>
          </View>
          <Pressable 
            onPress={onEditTime}
            className="p-2 rounded-lg bg-surface-elevated active:opacity-80 border border-border-subtle min-h-touch-target justify-center items-center"
            accessibilityRole="button"
            accessibilityLabel="Editar horário"
          >
            <Icon as={Edit2} size={18} className="text-primary" />
          </Pressable>
        </View>

        <View className="h-px bg-border-subtle w-full" />

        <View className="flex-row justify-between items-start">
          <View className="flex-1 pr-4">
            <View className="flex-row items-center gap-2 mb-1">
              <Icon as={AlignLeft} size={16} className="text-primary" />
              <Text variant="caption" className="text-text-secondary">Notas</Text>
            </View>
            {notes ? (
              <Text variant="text" className="text-text-primary">
                {notes}
              </Text>
            ) : (
              <Text variant="text" className="text-text-secondary italic">
                Adicionar notas ao treino...
              </Text>
            )}
          </View>
          <Pressable 
            onPress={onEditNotes}
            className="p-2 rounded-lg bg-surface-elevated active:opacity-80 border border-border-subtle min-h-touch-target justify-center items-center"
            accessibilityRole="button"
            accessibilityLabel="Editar notas"
          >
            <Icon as={Edit2} size={18} className="text-primary" />
          </Pressable>
        </View>
      </View>
    </Card>
  );
}
