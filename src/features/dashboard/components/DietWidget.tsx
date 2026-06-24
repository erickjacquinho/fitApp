import { Text } from '@/components/ui/text';
import React from 'react';
import { View } from 'react-native';
import { router } from 'expo-router';
import { Plus } from 'lucide-react-native';
import { ProgressCircle } from '../../../components/atoms/ProgressCircle';
import { MacroTrackerCard } from './MacroTrackerCard';
import { Card } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Progress } from '@/components/ui/progress';

interface DietWidgetProps {
  calories: number;
  goal: number;
  protein: number;
  proteinGoal: number;
  carbs: number;
  carbsGoal: number;
  fat: number;
  fatGoal: number;
}

export function DietWidget({
  calories,
  goal,
  protein,
  proteinGoal,
  carbs,
  carbsGoal,
  fat,
  fatGoal,
}: DietWidgetProps) {
  const calPercentage = Math.min(Math.round((calories / goal) * 100), 100);
  const protPercentage = Math.min(Math.round((protein / proteinGoal) * 100), 100);
  const carbPercentage = Math.min(Math.round((carbs / carbsGoal) * 100), 100);
  const fatPercentage = Math.min(Math.round((fat / fatGoal) * 100), 100);

  const remaining = Math.max(goal - calories, 0);

  return (
    <Card>
      <View className="flex-row items-center justify-between border-b border-border-subtle pb-3 mb-3">
        <Text variant="subtitle" className="font-bold">
          Dieta e nutrição
        </Text>
        <Button
          accessibilityLabel="Adicionar refeição"
          variant="secondary"
          size="sm"
          onPress={() => router.push('/diet/create-meal')}
        >
          <Icon as={Plus} size={16} />
          <Text variant="caption">
            Adicionar refeição
          </Text>
        </Button>
      </View>

      {/* Calories Circle/Prog */}
      <View className="flex-row items-center justify-between mb-4">
        <View className="flex-1 pr-4">
          <View className="flex-row items-baseline gap-1">
            <Text variant="display" className="text-primary">
              {calories}
            </Text>
            <Text variant="caption" className="text-text-secondary">
              / {goal} kcal consumidas
            </Text>
          </View>
          <Text variant="caption" className="text-text-secondary mt-1">
            {remaining > 0 ? `${remaining} kcal restantes` : 'Meta atingida'}
          </Text>
        </View>

        <ProgressCircle percentage={calPercentage} />
      </View>

      {/* Main progress bar */}
      <Progress value={calPercentage} className="mb-4" />

      {/* Macro Breakdown */}
      <View className="flex-row gap-3">
        <MacroTrackerCard
          name="Proteínas"
          current={protein}
          target={proteinGoal}
          tone="protein"
          progress={protPercentage}
        />
        <MacroTrackerCard
          name="Carboidratos"
          current={carbs}
          target={carbsGoal}
          tone="carbs"
          progress={carbPercentage}
        />
        <MacroTrackerCard
          name="Gorduras"
          current={fat}
          target={fatGoal}
          tone="fat"
          progress={fatPercentage}
        />
      </View>

      <Button
        variant="ghost"
        onPress={() => router.push('/diet')}
        className="mt-4 border-t border-border-subtle"
      >
        <Text variant="caption">
          Ver detalhes da dieta
        </Text>
      </Button>
    </Card>
  );
}
