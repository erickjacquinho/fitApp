import React from 'react';
import { View } from 'react-native';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Card } from '@/components/ui/card';
import { History, FileText } from 'lucide-react-native';
import Exercise from '@/db/models/Exercise';

interface WorkoutExerciseCardProps {
  exercise: Exercise;
}

export function WorkoutExerciseCard({ exercise }: WorkoutExerciseCardProps) {
  return (
    <Card className="flex-1 bg-surface p-4 border border-border-subtle m-4">
      {/* Header Row */}
      <View className="flex-row items-center mb-4">
        {/* Image Placeholder (Frame Redondo) */}
        <View className="w-14 h-14 rounded-full bg-surface border border-border-subtle items-center justify-center mr-4">
          <Text variant="caption" className="text-text-secondary">IMG</Text>
        </View>
        
        {/* Text Column */}
        <View className="flex-1 justify-center">
          <Text variant="subtitle" className="text-text-primary font-bold mb-1">
            {exercise.name}
          </Text>
          <Text variant="caption" className="text-text-secondary">
            Tempo de descanso: 60s
          </Text>
        </View>
      </View>

      {/* Divider */}
      <View className="h-px bg-border-subtle w-full mb-4" />

      {/* Buttons Row */}
      <View className="flex-row justify-between gap-3">
        <Button variant="outline" className="flex-1" onPress={() => {}}>
          <Icon as={History} size={16} className="text-text-primary mr-2" />
          <Text>Histórico</Text>
        </Button>
        <Button variant="outline" className="flex-1" onPress={() => {}}>
          <Icon as={FileText} size={16} className="text-text-primary mr-2" />
          <Text>Notas de treino</Text>
        </Button>
      </View>
    </Card>
  );
}
