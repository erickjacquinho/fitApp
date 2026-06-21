import React from 'react';
import { View } from 'react-native';
import { CheckCircle2, Circle } from 'lucide-react-native';
import { Typography } from '../../../components/atoms/Typography';
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { Card } from "@/components/ui/card";

interface ExerciseListItemProps {
  name: string;
  setsCount: number;
  targetSets: number;
  repsMin: number;
  repsMax: number;
  advancedTechnique?: string;
  isCompleted: boolean;
  onPress: () => void;
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
}: ExerciseListItemProps) {
  return (
    <Card
      className={`mb-3 p-4 flex-row items-center border ${
        isCompleted ? 'border-success-main/30 bg-success-main/5' : 'border-soft'
      }`}
    >
      <View className="mr-3">
        {isCompleted ? (
          <CheckCircle2 size={24} color="#2e7d32" />
        ) : (
          <Circle size={24} color="#ccc" />
        )}
      </View>

      <View className="flex-1">
        <Typography
          variant="subtitle"
          className={`text-base font-bold ${isCompleted ? 'line-through text-gray-500' : ''}`}
        >
          {name}
        </Typography>
        <Typography variant="caption" color="muted" className="mt-1">
          Target: {targetSets} sets x {repsMin}-{repsMax} reps
          {advancedTechnique && ` • ${advancedTechnique}`}
        </Typography>
        <Typography variant="caption" className="mt-0.5 text-primary-main">
          Logged: {setsCount}/{targetSets} sets
        </Typography>
      </View>

      <Button variant={isCompleted ? 'outline' : 'default'} size="sm" onPress={onPress}><Text>{setsCount > 0 ? 'Edit' : 'Start'}</Text></Button>
    </Card>
  );
}
