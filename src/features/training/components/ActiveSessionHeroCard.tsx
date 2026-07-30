import React, { useEffect, useState } from 'react';
import { View, Pressable } from 'react-native';
import { router } from 'expo-router';
import { Play } from 'lucide-react-native';
import WorkoutSession from '@/db/models/WorkoutSession';
import Program from '@/db/models/Program';
import TrainingBlock from '@/db/models/TrainingBlock';
import { Text } from '@/components/ui/text';
import { Icon } from '@/components/ui/icon';
import { WorkoutTimer } from './WorkoutTimer';
import { cn } from '@/lib/utils';
import * as Haptics from 'expo-haptics';

interface ActiveSessionHeroCardProps {
  session: WorkoutSession;
}

export function ActiveSessionHeroCard({ session }: ActiveSessionHeroCardProps) {
  const [program, setProgram] = useState<Program | null>(null);
  const [block, setBlock] = useState<TrainingBlock | null>(null);

  useEffect(() => {
    let isMounted = true;
    session.program.fetch().then(async (p) => {
      if (isMounted && p) {
        setProgram(p);
        const blocks = await p.trainingBlocks.fetch();
        if (blocks.length > 0) {
          setBlock(blocks[0]);
        }
      }
    });
    return () => {
      isMounted = false;
    };
  }, [session]);

  const handleResume = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    router.push('/training/active');
  };

  return (
    <Pressable
      onPress={handleResume}
      accessibilityRole="button"
      accessibilityLabel={`Continuar treino em andamento: ${program?.name || 'Carregando...'}`}
      className="mb-4 rounded-xl bg-primary border border-white/10 px-4 pt-4 pb-4 active:opacity-95 shadow-sm"
    >
      {/* 1. Linha Superior: Título do Programa à esquerda alinhado com a Badge Sólida do Cronômetro à direita */}
      <View className="flex-row items-center justify-between gap-3 mb-1">
        <Text className="flex-1 text-xl font-extrabold text-white tracking-tight" numberOfLines={1}>
          {program?.name || 'Sessão Ativa'}
        </Text>

        <WorkoutTimer
          startDate={session.startDate}
          className="bg-surface-elevated border-surface-elevated px-2.5 py-0.5 rounded-full shrink-0 shadow-sm"
          textClassName="text-primary text-[11px] font-mono font-bold tracking-wider"
          iconClassName="text-primary"
        />
      </View>

      {/* 2. Nome do Bloco (Subtítulo) com margem de 16px (mb-4) até o botão */}
      <View className="mb-4">
        {block && (
          <Text className="text-xs font-semibold text-white/85 tracking-normal" numberOfLines={1}>
            {block.name}
          </Text>
        )}
      </View>

      {/* 3. Botão de Ação Primária (100% Tokens Semânticos: bg-surface-elevated e text-primary com opacidade semântica no press) */}
      <Pressable
        onPress={handleResume}
        accessibilityRole="button"
        accessibilityLabel="Continuar Treino"
        className="w-full flex-row items-center justify-center gap-1.5 bg-surface-elevated h-control-md rounded-lg active:bg-surface-elevated"
      >
        {({ pressed }) => (
          <>
            <Text
              className={cn(
                "font-bold text-sm tracking-wide text-primary transition-opacity",
                pressed && "opacity-70"
              )}
            >
              Continuar Treino
            </Text>
            <Icon
              as={Play}
              size={14}
              className={cn(
                "ml-0.5 text-primary fill-primary transition-opacity",
                pressed && "opacity-70"
              )}
            />
          </>
        )}
      </Pressable>
    </Pressable>
  );
}
