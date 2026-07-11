import React, { useState, useEffect } from 'react';
import { ScrollView } from 'react-native';
import { useProgramForm } from '../hooks/useProgramForm';
import { Text } from "@/components/ui/text";
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { ProgramFormHeader } from './ProgramForm/ProgramFormHeader';
import { ProgramFormBlockCard } from './ProgramForm/ProgramFormBlockCard';
import { ProgramFormActions } from './ProgramForm/ProgramFormActions';

export function ProgramForm({ programId }: { programId?: string }) {
  const formState = useProgramForm(programId);
  const { blocks, handleSave, isSaving, feedback, clearFeedback, programName, setProgramName, errors, handleAddBlock } = formState;

  const [expandedBlocks, setExpandedBlocks] = useState<Record<string, boolean>>({});
  const [scrollEnabled, setScrollEnabled] = useState(true);

  // Automatically expand newly added blocks
  const [prevBlocksCount, setPrevBlocksCount] = useState(blocks.length);
  useEffect(() => {
    if (blocks.length > prevBlocksCount) {
      const newestBlock = blocks[blocks.length - 1];
      if (newestBlock) {
        setExpandedBlocks(prev => ({ ...prev, [newestBlock.id]: true }));
      }
    }
    setPrevBlocksCount(blocks.length);
  }, [blocks, prevBlocksCount]);

  // Expand all blocks by default on load when editing an existing program
  const [initialExpandedDone, setInitialExpandedDone] = useState(false);
  useEffect(() => {
    if (programId && blocks.length > 0 && !initialExpandedDone) {
      const initial: Record<string, boolean> = {};
      blocks.forEach(b => { initial[b.id] = true; });
      setExpandedBlocks(initial);
      setInitialExpandedDone(true);
    }
  }, [programId, blocks, initialExpandedDone]);

  return (
    <GestureHandlerRootView className="flex-1">
      <ScrollView 
        scrollEnabled={scrollEnabled} 
        className="flex-1 px-screen-x py-4 bg-background"
        contentContainerStyle={{ paddingBottom: 64 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {errors.global && (
          <Text variant="caption" className="text-error text-center my-2">
            {errors.global}
          </Text>
        )}

        <ProgramFormHeader 
          programName={programName} 
          setProgramName={setProgramName} 
          error={errors.programName} 
          onAddBlock={handleAddBlock} 
        />

        {blocks.map((block, bIdx) => (
          <ProgramFormBlockCard
            key={block.id}
            block={block}
            bIdx={bIdx}
            isExpanded={!!expandedBlocks[block.id]}
            onToggleExpand={() => setExpandedBlocks(prev => ({ ...prev, [block.id]: !prev[block.id] }))}
            setScrollEnabled={setScrollEnabled}
            formState={formState}
          />
        ))}

        <ProgramFormActions 
          blocksCount={blocks.length} 
          isSaving={isSaving} 
          programId={programId} 
          onSave={handleSave} 
          feedback={feedback} 
          clearFeedback={clearFeedback} 
        />
      </ScrollView>
    </GestureHandlerRootView>
  );
}
