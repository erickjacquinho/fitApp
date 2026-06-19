import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { Plus } from 'lucide-react-native';
import { Typography } from '../../../components/atoms/Typography';
import { Card } from '../../../components/atoms/Card';

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
    <Card className="p-4 border border-soft">
      <View className="flex-row items-center justify-between border-b border-soft pb-3 mb-3">
        <Typography variant="subtitle" className="font-bold">
          Diet & Nutrition
        </Typography>
        <TouchableOpacity
          onPress={() => router.push('/diet/create-meal')}
          className="flex-row items-center gap-1 rounded bg-primary-main/10 px-2.5 py-1 active:bg-primary-main/20"
        >
          <Plus size={14} color="#005B94" />
          <Typography variant="caption" color="highlight" className="font-bold">
            Add Meal
          </Typography>
        </TouchableOpacity>
      </View>

      {/* Calories Circle/Prog */}
      <View className="flex-row items-center justify-between mb-4">
        <View className="flex-1 pr-4">
          <View className="flex-row items-baseline gap-1">
            <Typography variant="display" className="text-3xl text-primary-main">
              {calories}
            </Typography>
            <Typography variant="caption" color="muted">
              / {goal} kcal consumed
            </Typography>
          </View>
          <Typography variant="caption" color="muted" className="mt-1">
            {remaining > 0 ? `${remaining} kcal remaining` : "Goal achieved!"}
          </Typography>
        </View>

        <View className="w-16 h-16 items-center justify-center rounded-full bg-surface-app border border-soft relative">
          <Typography variant="label" className="font-bold text-primary-main text-xs">
            {calPercentage}%
          </Typography>
        </View>
      </View>

      {/* Main progress bar */}
      <View className="h-2 w-full overflow-hidden rounded-full bg-surface-app mb-4">
        <View
          className="h-full bg-primary-main"
          style={{ width: `${calPercentage}%` }}
        />
      </View>

      {/* Macro Breakdown */}
      <View className="flex-row gap-3">
        {/* Protein */}
        <View className="flex-1 rounded bg-surface-app p-2 border border-soft">
          <Typography variant="caption" className="font-bold text-sky-600 mb-1 text-center">
            Protein
          </Typography>
          <Typography variant="label" className="text-center font-bold">
            {protein}g
          </Typography>
          <Typography variant="caption" color="muted" className="text-center text-[10px]">
            of {proteinGoal}g
          </Typography>
          <View className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden mt-1">
            <View className="h-full bg-sky-500" style={{ width: `${protPercentage}%` }} />
          </View>
        </View>

        {/* Carbs */}
        <View className="flex-1 rounded bg-surface-app p-2 border border-soft">
          <Typography variant="caption" className="font-bold text-amber-600 mb-1 text-center">
            Carbs
          </Typography>
          <Typography variant="label" className="text-center font-bold">
            {carbs}g
          </Typography>
          <Typography variant="caption" color="muted" className="text-center text-[10px]">
            of {carbsGoal}g
          </Typography>
          <View className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden mt-1">
            <View className="h-full bg-amber-500" style={{ width: `${carbPercentage}%` }} />
          </View>
        </View>

        {/* Fat */}
        <View className="flex-1 rounded bg-surface-app p-2 border border-soft">
          <Typography variant="caption" className="font-bold text-rose-600 mb-1 text-center">
            Fat
          </Typography>
          <Typography variant="label" className="text-center font-bold">
            {fat}g
          </Typography>
          <Typography variant="caption" color="muted" className="text-center text-[10px]">
            of {fatGoal}g
          </Typography>
          <View className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden mt-1">
            <View className="h-full bg-rose-500" style={{ width: `${fatPercentage}%` }} />
          </View>
        </View>
      </View>

      <TouchableOpacity
        onPress={() => router.push('/diet')}
        className="mt-4 py-2 border-t border-soft items-center active:bg-soft/10"
      >
        <Typography variant="caption" color="highlight" className="font-bold">
          View Detailed Nutrition
        </Typography>
      </TouchableOpacity>
    </Card>
  );
}
