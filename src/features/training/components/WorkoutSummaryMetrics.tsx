import React from 'react';
import { View } from 'react-native';
import { Clock, CheckCircle2, Dumbbell } from 'lucide-react-native';
import { Card } from '@/components/ui/card';
import { Text } from '@/components/ui/text';
import { Icon } from '@/components/ui/icon';

interface WorkoutSummaryMetricsProps {
  startDate: number;
  endDate?: number | null;
  validSets: number;
  totalVolume: number;
}

export function WorkoutSummaryMetrics({
  startDate,
  endDate,
  validSets,
  totalVolume,
}: WorkoutSummaryMetricsProps) {
  const getDuration = (start: number, end?: number | null) => {
    if (!end) return '-- min';
    const diffMs = end - start;
    const diffMins = Math.round(diffMs / 1000 / 60);
    return `${diffMins}m`;
  };

  return (
    <Card className="mb-section-gap bg-surface border border-border-subtle shadow-none">
      <View className="flex-row items-center p-card justify-between">
        
        <View className="items-center flex-1">
          <View className="flex-row items-center gap-1 mb-1">
            <Icon as={Clock} size={16} className="text-primary" />
            <Text variant="caption" className="text-text-secondary uppercase tracking-wider">Tempo</Text>
          </View>
          <Text variant="subtitle" className="text-text-primary font-bold">
            {getDuration(startDate, endDate)}
          </Text>
        </View>

        <View className="w-px h-12 bg-border-subtle" />

        <View className="items-center flex-1">
          <View className="flex-row items-center gap-1 mb-1">
            <Icon as={CheckCircle2} size={16} className="text-primary" />
            <Text variant="caption" className="text-text-secondary uppercase tracking-wider">Séries</Text>
          </View>
          <Text variant="subtitle" className="text-text-primary font-bold">
            {validSets}
          </Text>
        </View>

        <View className="w-px h-12 bg-border-subtle" />

        <View className="items-center flex-1">
          <View className="flex-row items-center gap-1 mb-1">
            <Icon as={Dumbbell} size={16} className="text-primary" />
            <Text variant="caption" className="text-text-secondary uppercase tracking-wider">Volume</Text>
          </View>
          <Text variant="subtitle" className="text-text-primary font-bold">
            {totalVolume.toLocaleString()}
          </Text>
        </View>

      </View>
    </Card>
  );
}
