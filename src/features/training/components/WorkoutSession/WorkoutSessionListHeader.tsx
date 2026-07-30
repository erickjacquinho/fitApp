import React from 'react';
import { View } from 'react-native';
import { Text } from "@/components/ui/text";
import { WorkoutTimer } from '../WorkoutTimer';
import TrainingBlock from '@/db/models/TrainingBlock';
import WorkoutSession from '@/db/models/WorkoutSession';
import { Clock } from 'lucide-react-native';
import { Icon } from '@/components/ui/icon';

interface WorkoutSessionListHeaderProps {
  block?: TrainingBlock | null;
  session?: WorkoutSession | null;
}

export function WorkoutSessionListHeader({ block, session }: WorkoutSessionListHeaderProps) {
  return (
    <View className="mb-6 mt-1 rounded-xl bg-surface border border-border-subtle p-4">
      <View className="flex-row items-center justify-between">
        <View className="flex-1 pr-3">
          <Text variant="caption" className="text-primary font-bold tracking-wider uppercase mb-1">
            Bloco Atual
          </Text>
          <Text variant="title" className="text-text-primary font-bold" numberOfLines={1}>
            {block ? block.name : 'Sessão em Andamento'}
          </Text>
        </View>

        {session && (
          <View className="flex-row items-center gap-1.5 rounded-full bg-surface-elevated px-3 py-1.5 border border-border-subtle">
            <Icon as={Clock} size={16} className="text-primary" accessibilityElementsHidden={true} importantForAccessibility="no" />
            <WorkoutTimer 
              startDate={session.startDate} 
              endDate={session.endDate}
            />
          </View>
        )}
      </View>
    </View>
  );
}
