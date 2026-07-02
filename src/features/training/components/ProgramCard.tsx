import React from 'react';
import { View, Pressable, useColorScheme } from 'react-native';
import { router } from 'expo-router';
import { Trash2, Pin, PinOff } from 'lucide-react-native';
import Program from '../../../db/models/Program';
import TrainingBlock from '../../../db/models/TrainingBlock';
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { Card } from "@/components/ui/card";
import { Icon } from '@/components/ui/icon';
import { cn } from '@/lib/utils';

export interface ProgramCardProps {
  program: Program;
  blocks: TrainingBlock[];
  isPinned: boolean;
  isActive: boolean;
  hasActiveSession?: boolean;
  onTogglePin: (id: string, pinStatus: boolean) => void;
  onDeleteAttempt: (id: string, name: string) => void;
}

export function ProgramCard({
  program,
  blocks,
  isPinned,
  isActive,
  hasActiveSession = false,
  onTogglePin,
  onDeleteAttempt,
}: ProgramCardProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const titleClass = cn(
    'font-bold',
    isActive 
      ? isDark 
        ? 'text-text-primary' 
        : 'text-primary'
      : 'text-text-primary'
  );

  const captionClass = cn(
    'mt-1',
    isActive 
      ? isDark 
        ? 'text-text-primary' 
        : 'text-primary'
      : 'text-text-secondary'
  );

  const pinIconClass = cn(
    isActive 
      ? isDark 
        ? 'text-text-primary' 
        : 'text-primary'
      : 'text-text-secondary'
  );

  const trashIconClass = cn(
    isActive 
      ? isDark 
        ? 'text-text-primary' 
        : 'text-primary'
      : 'text-error'
  );

  return (
    <View className="mb-4">
      <Pressable
        onPress={() => {
          router.push(`/training/program/${program.id}`);
        }}
      >
        {({ pressed }) => {
          // Apply absolute blue 500 (#0800FF) background in dark mode when active, and blue 600 (#0C04DC) when pressed
          const cardStyle = isDark && isActive 
            ? { backgroundColor: pressed ? '#0C04DC' : '#0800FF' } 
            : undefined;

          // Conditional styles based on active state, dark mode preference, and pressed state
          const cardClass = cn(
            isActive 
              ? isDark 
                ? 'border-text-primary border' 
                : `border-primary border ${pressed ? 'bg-surface-elevated' : 'bg-surface'}`
              : `border-border-subtle ${pressed ? 'bg-surface-elevated' : 'bg-surface'}`,
            hasActiveSession && "rounded-b-none border-b-0"
          );

          return (
            <Card className={cardClass} style={cardStyle}>
              <View className="flex-row items-start justify-between">
                <View className="flex-1 pr-2">
                  <Text variant="subtitle" className={titleClass}>
                    {program.name}
                  </Text>
                  <Text variant="caption" className={captionClass}>
                    {blocks.length === 1 ? '1 bloco' : `${blocks.length} blocos`}
                    {blocks.length > 0 ? ` (${blocks.map((b) => b.name).join(', ')})` : ' (sem treinos)'}
                  </Text>
                </View>

                <View className="flex-row gap-2">
                  <Button
                    accessibilityLabel={isPinned ? `Desativar ${program.name}` : `Ativar ${program.name}`}
                    variant="ghost"
                    size="icon"
                    onPress={() => onTogglePin(program.id, !isPinned)}
                  >
                    <Icon as={isPinned ? PinOff : Pin} size={16} className={pinIconClass} />
                  </Button>
                  <Button
                    accessibilityLabel={`Excluir ${program.name}`}
                    variant="ghost"
                    size="icon"
                    onPress={() => onDeleteAttempt(program.id, program.name)}
                  >
                    <Icon as={Trash2} size={16} className={trashIconClass} />
                  </Button>
                </View>
              </View>
            </Card>
          );
        }}
      </Pressable>
      {hasActiveSession && (
        <Pressable
          onPress={() => router.push('/training/active')}
          className={cn(
            "h-control-md flex-row items-center justify-center border-x border-b rounded-b-md bg-primary-soft",
            isActive 
              ? isDark 
                ? 'border-text-primary' 
                : 'border-primary'
              : 'border-border-subtle'
          )}
        >
          <Text variant="label" className="text-primary font-bold">
            Sessão de treino atual
          </Text>
        </Pressable>
      )}
    </View>
  );
}
