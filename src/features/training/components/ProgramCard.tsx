import React from 'react';
import { View, Pressable } from 'react-native';
import { router } from 'expo-router';
import { ChevronRight, Trash2, Zap, ZapOff } from 'lucide-react-native';
import Program from '@/db/models/Program';
import TrainingBlock from '@/db/models/TrainingBlock';
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { Card } from "@/components/ui/card";
import { Badge } from '@/components/ui/badge';
import { Icon } from '@/components/ui/icon';
import { cn } from '@/lib/utils';
import * as Haptics from 'expo-haptics';

export interface ProgramCardProps {
  program: Program;
  blocks: TrainingBlock[];
  isPinned: boolean;
  isActive: boolean;
  hasActiveSession?: boolean;
  variant?: 'default' | 'compact';
  isFirst?: boolean;
  isLast?: boolean;
  onTogglePin: (id: string, pinStatus: boolean) => void;
  onDeleteAttempt: (id: string, name: string) => void;
}

export function ProgramCard({
  program,
  blocks,
  isPinned,
  isActive,
  hasActiveSession = false,
  variant = 'default',
  isFirst = false,
  isLast = false,
  onTogglePin,
  onDeleteAttempt,
}: ProgramCardProps) {
  const blocksSummary = `${blocks.length} ${blocks.length === 1 ? 'Treino' : 'Treinos'}`;

  if (variant === 'compact') {
    return (
      <View className={cn(!isLast && 'border-b border-border-subtle')}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`Plano de treino: ${program.name}`}
          onPress={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            router.push(`/training/program/${program.id}`);
          }}
        >
          {({ pressed }) => (
            <View
              className={cn(
                'flex-row items-center justify-between py-2.5 px-3.5 bg-surface transition-all',
                pressed && 'bg-surface-elevated opacity-90'
              )}
            >
              <View className="flex-1 flex-row items-center gap-1.5 pr-2">
                <Text
                  variant="text"
                  numberOfLines={1}
                  className="font-semibold text-text-primary text-sm max-w-[55%]"
                >
                  {program.name}
                </Text>
                <Text
                  variant="caption"
                  numberOfLines={1}
                  className="text-text-secondary text-xs shrink"
                >
                  • {blocksSummary}
                </Text>
              </View>

              <View className="flex-row items-center gap-0.5">
                <Button
                  accessibilityLabel={`Ativar ${program.name}`}
                  variant="ghost"
                  size="icon"
                  onPress={() => {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                    onTogglePin(program.id, !isPinned);
                  }}
                  className="min-h-touch-target min-w-touch-target items-center justify-center active:opacity-80"
                >
                  <Icon as={Zap} size={16} className="text-text-secondary" />
                </Button>
                <Button
                  accessibilityLabel={`Excluir ${program.name}`}
                  variant="ghost"
                  size="icon"
                  onPress={() => {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                    onDeleteAttempt(program.id, program.name);
                  }}
                  className="min-h-touch-target min-w-touch-target items-center justify-center active:opacity-80"
                >
                  <Icon as={Trash2} size={16} className="text-text-secondary" />
                </Button>
                <Icon as={ChevronRight} size={16} className="text-text-secondary/50 ml-0.5" />
              </View>
            </View>
          )}
        </Pressable>
      </View>
    );
  }

  return (
    <View className="mb-3">
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`Plano de treino: ${program.name}`}
        onPress={() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          router.push(`/training/program/${program.id}`);
        }}
      >
        {({ pressed }) => {
          const cardClass = cn(
            'p-4 transition-all',
            isActive || isPinned
              ? 'border-primary border bg-surface'
              : 'border-border-subtle bg-surface',
            pressed && 'bg-surface-elevated opacity-90'
          );

          return (
            <Card className={cardClass}>
              <View className="flex-row items-start justify-between">
                <View className="flex-1 pr-3">
                  <View className="flex-row items-center gap-2 mb-1">
                    <Text variant="subtitle" className="font-bold text-text-primary">
                      {program.name}
                    </Text>
                    {hasActiveSession && (
                      <Badge variant="secondary" shape="pill">
                        <Text className="text-text-primary text-[11px] font-bold">
                          Em andamento
                        </Text>
                      </Badge>
                    )}
                  </View>
                  <Text variant="caption" className="text-text-secondary">
                    {blocksSummary}
                  </Text>
                </View>

                <View className="flex-row gap-1">
                  <Button
                    accessibilityLabel={isPinned ? `Desativar ${program.name}` : `Ativar ${program.name}`}
                    variant="ghost"
                    size="icon"
                    onPress={() => {
                      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                      onTogglePin(program.id, !isPinned);
                    }}
                    className="min-h-touch-target min-w-touch-target items-center justify-center active:opacity-80"
                  >
                    <Icon
                      as={isPinned ? ZapOff : Zap}
                      size={18}
                      className={isPinned ? 'text-primary' : 'text-text-secondary'}
                    />
                  </Button>
                  <Button
                    accessibilityLabel={`Excluir ${program.name}`}
                    variant="ghost"
                    size="icon"
                    onPress={() => {
                      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                      onDeleteAttempt(program.id, program.name);
                    }}
                    className="min-h-touch-target min-w-touch-target items-center justify-center active:opacity-80"
                  >
                    <Icon as={Trash2} size={18} className="text-text-secondary" />
                  </Button>
                </View>
              </View>
            </Card>
          );
        }}
      </Pressable>
    </View>
  );
}
