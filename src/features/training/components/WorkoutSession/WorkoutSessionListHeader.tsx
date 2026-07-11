import React from 'react';
import { View } from 'react-native';
import { Text } from "@/components/ui/text";
import { WorkoutTimer } from '../WorkoutTimer';

export function WorkoutSessionListHeader({ block, session }: { block: any, session: any }) {
  return (
    <View className="mb-6 mt-2">
      <View className="flex-row items-center justify-between mb-4">
        <Text variant="h3" className="text-text-primary font-bold flex-1 mr-4">
          {block ? `Treino ${block.name}` : 'Treino atual'}
        </Text>
        {session && (
          <WorkoutTimer 
            startDate={session.startDate} 
            endDate={session.endDate}
          />
        )}
      </View>
    </View>
  );
}
