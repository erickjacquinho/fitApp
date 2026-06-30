import React from 'react';
import { View, FlatList } from 'react-native';
import TrainingBlock from '../../../db/models/TrainingBlock';
import { WorkoutColumnEditor } from './WorkoutColumnEditor';

interface ProgramKanbanEditorProps {
  blocks: TrainingBlock[];
}

export function ProgramKanbanEditor({ blocks }: ProgramKanbanEditorProps) {
  return (
    <View className="flex-1 -mx-4">
      {/* 
        -mx-4 negates the px-4 padding from the parent screen so the horizontal list 
        can span edge to edge. Each column will handle its own inner padding.
      */}
      <FlatList
        data={blocks}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <WorkoutColumnEditor block={item} />}
        initialNumToRender={2}
        maxToRenderPerBatch={3}
        windowSize={3}
      />
    </View>
  );
}
