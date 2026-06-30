import React from 'react';
import { View } from 'react-native';
import { CheckCircle2, Circle } from 'lucide-react-native';
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { Icon } from '@/components/ui/icon';
import { BaseCardList } from '../../../components/molecules/BaseCardList';

interface ExerciseListItemProps {
  name: string;
  setsCount: number;
  targetSets: number;
  repsMin: number;
  repsMax: number;
  advancedTechnique?: string;
  isCompleted: boolean;
  onPress: () => void;
  isFirst?: boolean;
  isLast?: boolean;
}

export function ExerciseListItem({
  name,
  setsCount,
  targetSets,
  repsMin,
  repsMax,
  advancedTechnique,
  isCompleted,
  onPress,
  isFirst = false,
  isLast = false,
}: ExerciseListItemProps) {
  return (
    <BaseCardList
      isFirst={isFirst}
      isLast={isLast}
      className={
        isCompleted ? 'border-success border-opacity-30 bg-success bg-opacity-5' : ''
      }
    >
      <View className="mr-3">
        {isCompleted ? (
          <Icon as={CheckCircle2} size={24} className="text-success" />
        ) : (
          <Icon as={Circle} size={24} className="text-text-secondary" />
        )}
      </View>

      <View className="flex-1">
        <Text
          variant="subtitle"
          className={` font-bold ${isCompleted ? 'line-through text-text-secondary' : ''}`}
        >
          {name}
        </Text>
        <Text variant="caption" className="text-text-secondary mt-1">
          Meta: {targetSets} séries x {repsMin}-{repsMax} reps
          {advancedTechnique && ` • ${advancedTechnique}`}
        </Text>
        <Text variant="caption" className="text-primary mt-1">
          Registradas: {setsCount}/{targetSets} séries
        </Text>
      </View>

      <Button variant={isCompleted ? 'outline' : 'default'} size="sm" onPress={onPress}><Text>{setsCount > 0 ? 'Editar' : 'Iniciar'}</Text></Button>
    </BaseCardList>
  );
}
