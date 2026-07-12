import React from 'react';
import { View } from 'react-native';
import { Calendar, Clock, Dumbbell } from 'lucide-react-native';
import { Card } from '@/components/ui/card';
import { Text } from '@/components/ui/text';
import { Icon } from '@/components/ui/icon';

interface WorkoutSummaryMetricsProps {
  programName: string;
  startDate: number;
  endDate?: number | null;
  totalVolume: number;
}

export function WorkoutSummaryMetrics({
  programName,
  startDate,
  endDate,
  totalVolume,
}: WorkoutSummaryMetricsProps) {
  const formatDate = (timestamp: number) => {
    const d = new Date(timestamp);
    return d.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  };

  const getDuration = (start: number, end?: number | null) => {
    if (!end) return '-- min';
    const diffMs = end - start;
    const diffMins = Math.round(diffMs / 1000 / 60);
    return `${diffMins} min`;
  };

  return (
    <Card className="mb-section-gap overflow-hidden bg-surface border border-border-subtle shadow-none">
      <View className="p-card border-b border-border-subtle bg-surface-elevated">
        <Text variant="label" className="text-text-secondary mb-1 uppercase tracking-wider">
          Programa
        </Text>
        <Text variant="title" className="text-text-primary font-bold">
          {programName}
        </Text>
      </View>
      
      <View className="flex-row flex-wrap p-card gap-y-4">
        <View className="w-1/2 pr-2">
          <View className="flex-row items-center gap-2 mb-1">
            <Icon as={Calendar} size={16} className="text-primary" />
            <Text variant="caption" className="text-text-secondary">Data</Text>
          </View>
          <Text variant="subtitle" className="text-text-primary font-semibold">
            {formatDate(startDate)}
          </Text>
        </View>

        <View className="w-1/2 pl-2 border-l border-border-subtle">
          <View className="flex-row items-center gap-2 mb-1">
            <Icon as={Clock} size={16} className="text-primary" />
            <Text variant="caption" className="text-text-secondary">Duração</Text>
          </View>
          <Text variant="subtitle" className="text-text-primary font-semibold">
            {getDuration(startDate, endDate)}
          </Text>
        </View>

        <View className="w-full pt-4 border-t border-border-subtle">
          <View className="flex-row items-center gap-2 mb-1">
            <Icon as={Dumbbell} size={16} className="text-primary" />
            <Text variant="caption" className="text-text-secondary">Volume Total</Text>
          </View>
          <Text variant="title" className="text-primary font-bold">
            {totalVolume.toLocaleString()} kg
          </Text>
        </View>
      </View>
    </Card>
  );
}
