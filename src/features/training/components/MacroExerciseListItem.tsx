import React from 'react';
import { View, Pressable } from 'react-native';
import { MoreVertical, Repeat, Trash2 } from 'lucide-react-native';
import { Text } from '@/components/ui/text';
import { Icon } from '@/components/ui/icon';
import Exercise from '@/db/models/Exercise';
import * as Haptics from 'expo-haptics';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface MacroExerciseListItemProps {
  exercise: Exercise;
  order: number;
  completedSets: number;
  totalSets: number;
  onReplace?: () => void;
  onDelete?: () => void;
  onPress?: () => void;
  drag?: () => void;
  isActive?: boolean;
  isFirst?: boolean;
  isLast?: boolean;
}

export function MacroExerciseListItem({
  exercise,
  order,
  completedSets,
  totalSets,
  onReplace,
  onDelete,
  onPress,
  drag,
  isActive,
  isFirst,
  isLast,
}: MacroExerciseListItemProps) {
  const isCompleted = completedSets > 0 && completedSets === totalSets;

  return (
    <Pressable
      onLongPress={drag}
      disabled={isActive}
      onPress={() => {
        if (onPress) {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          onPress();
        }
      }}
      className={`flex-row items-center p-4 bg-surface border-x border-t ${
        isFirst ? 'rounded-t-xl' : ''
      } ${
        isLast ? 'rounded-b-xl border-b' : 'border-b-0'
      } ${
        isActive 
          ? 'border-primary shadow-lg bg-surface-elevated opacity-90' 
          : isCompleted 
            ? 'border-primary/30 bg-primary/5' 
            : 'border-border-subtle'
      } ${!isActive && 'active:opacity-80'}`}
    >
      {/* Esquerda: Ordem */}
      <View className="w-8 h-8 rounded-full bg-surface-elevated border border-border-subtle items-center justify-center mr-3">
        <Text variant="label" className="text-text-secondary font-bold">
          {order}
        </Text>
      </View>

      {/* Meio: Info */}
      <View className="flex-1 mr-2 justify-center">
        <Text variant="subtitle" className="text-text-primary font-bold mb-0.5" numberOfLines={2}>
          {exercise.name}
        </Text>
        <Text variant="caption" className={isCompleted ? "text-primary font-medium" : "text-text-secondary"}>
          {completedSets}/{totalSets} séries concluídas
        </Text>
      </View>

      {/* Direita: Menu */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Pressable
            accessibilityLabel={`Opções para ${exercise.name}`}
            className="p-2 -mr-2"
            hitSlop={12}
          >
            <Icon as={MoreVertical} size={24} className="text-text-secondary" />
          </Pressable>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-40">
          <DropdownMenuItem
            onPress={() => {
              if (onReplace) onReplace();
            }}
            className="flex-row items-center gap-2"
          >
            <Icon as={Repeat} size={16} className="text-text-primary" />
            <Text>Substituir</Text>
          </DropdownMenuItem>
          <DropdownMenuItem
            onPress={() => {
              if (onDelete) onDelete();
            }}
            variant="destructive"
            className="flex-row items-center gap-2"
          >
            <Icon as={Trash2} size={16} className="text-error" />
            <Text className="text-error">Excluir</Text>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </Pressable>
  );
}
