import React from 'react';
import { View, Pressable } from 'react-native';
import { MoreVertical, Repeat, Trash2, CheckCircle2 } from 'lucide-react-native';
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
import { cn } from '@/lib/utils';

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
  const isInProgress = completedSets > 0 && completedSets < totalSets;

  return (
    <Pressable
      onLongPress={drag}
      disabled={isActive}
      accessibilityRole="button"
      accessibilityLabel={`Exercício ${order}: ${exercise.name}, ${completedSets} de ${totalSets} séries concluídas`}
      onPress={() => {
        if (onPress) {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          onPress();
        }
      }}
      className={cn(
        'flex-row items-center p-4 bg-surface border-x border-t transition-all',
        isFirst && 'rounded-t-xl',
        isLast ? 'rounded-b-xl border-b' : 'border-b-0',
        isActive
          ? 'border-primary shadow-md bg-surface-elevated opacity-90 z-10'
          : isCompleted
            ? 'border-primary/30 bg-primary/5'
            : isInProgress
              ? 'border-primary/60 bg-surface'
              : 'border-border-subtle bg-surface',
        !isActive && 'active:opacity-80'
      )}
    >
      {/* Esquerda: Ordem ou ícone de concluído */}
      <View
        className={cn(
          'w-8 h-8 rounded-full items-center justify-center mr-3 border',
          isCompleted
            ? 'bg-primary border-primary'
            : isInProgress
              ? 'bg-primary/10 border-primary'
              : 'bg-surface-elevated border-border-subtle'
        )}
      >
        {isCompleted ? (
          <Icon as={CheckCircle2} size={18} className="text-primary-foreground" />
        ) : (
          <Text
            variant="label"
            className={cn(
              'font-bold',
              isInProgress ? 'text-primary' : 'text-text-secondary'
            )}
          >
            {order}
          </Text>
        )}
      </View>

      {/* Meio: Info */}
      <View className="flex-1 mr-2 justify-center">
        <Text
          variant="subtitle"
          className={cn(
            'font-bold mb-0.5',
            isCompleted ? 'text-text-secondary line-through' : 'text-text-primary'
          )}
          numberOfLines={2}
        >
          {exercise.name}
        </Text>
        <Text
          variant="caption"
          className={cn(
            isCompleted
              ? 'text-primary font-medium'
              : isInProgress
                ? 'text-primary font-semibold'
                : 'text-text-secondary'
          )}
        >
          {completedSets}/{totalSets} séries concluídas
        </Text>
      </View>

      {/* Direita: Menu */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={`Opções para ${exercise.name}`}
            className="min-h-touch-target min-w-touch-target items-center justify-center p-2 -mr-2 active:opacity-80"
            hitSlop={8}
          >
            <Icon as={MoreVertical} size={20} className="text-text-secondary" />
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
            <Icon as={Trash2} size={16} className="text-text-secondary" />
            <Text className="text-error">Excluir</Text>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </Pressable>
  );
}
