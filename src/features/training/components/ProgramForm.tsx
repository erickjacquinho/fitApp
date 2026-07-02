import React, { useState, useEffect } from 'react';
import { View, ScrollView, Pressable } from 'react-native';
import { Plus, Trash2, Layers, ChevronDown, ChevronUp, GripVertical } from 'lucide-react-native';
import { EmptyState } from '../../../components/molecules/EmptyState';
import { useProgramForm, ExerciseInput } from '../hooks/useProgramForm';
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { Input } from "@/components/ui/input";
import { Icon } from '@/components/ui/icon';
import { Label } from '@/components/ui/label';
import { FeedbackDialog } from '@/components/organisms/FeedbackDialog';
import { Card } from "@/components/ui/card";
import { router } from 'expo-router';
import { cn } from '@/lib/utils';
import DraggableFlatList, { ScaleDecorator, RenderItemParams } from 'react-native-draggable-flatlist';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export function ProgramForm({ programId }: { programId?: string }) {
  const {
    programName,
    setProgramName,
    blocks,
    handleAddBlock,
    handleRemoveBlock,
    handleBlockNameChange,
    handleAddExercise,
    handleRemoveExercise,
    handleReorderExercises,
    handleSave,
    isSaving,
    errors,
    feedback,
    clearFeedback,
  } = useProgramForm(programId);

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
      blocks.forEach(b => {
        initial[b.id] = true;
      });
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

        <View className="mb-6 bg-surface p-4 rounded-xl border border-border-subtle">
          <Label className="mb-2">Nome do Programa</Label>
          <Input
            placeholder="Ex.: Hipertrofia ABC"
            value={programName}
            onChangeText={setProgramName}
            className="mb-4 font-bold"
            hasError={!!errors.programName}
          />
          {errors.programName && (
            <Text variant="caption" className="text-error mt-1">
              {errors.programName}
            </Text>
          )}
        </View>

        <View className="mb-4 flex-row items-center justify-between border-b border-border-subtle pb-2">
          <Text variant="title" className="text-text-primary font-bold">Blocos de treino</Text>
          <Button
            variant="secondary"
            size="sm"
            onPress={handleAddBlock}
          >
            <Icon as={Plus} size={16} />
            <Text variant="caption">
              Adicionar bloco
            </Text>
          </Button>
        </View>

        {blocks.map((block, bIdx) => {
          const isExpanded = !!expandedBlocks[block.id];
          return (
            <Card key={block.id} className="mb-4 border border-border-subtle bg-surface">
              {/* Header */}
              <View className="flex-row items-center justify-between p-4 gap-2">
                <Input
                  placeholder="Ex.: Treino A"
                  value={block.name}
                  onChangeText={(val) => handleBlockNameChange(block.id, val)}
                  className="flex-1 font-bold h-control-sm border-border-control bg-transparent"
                  hasError={!!errors.blockNames?.[block.id]}
                />
                
                <View className="flex-row items-center gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-control-sm w-control-sm"
                    onPress={() => handleRemoveBlock(block.id)}
                    accessibilityLabel={`Excluir bloco ${block.name || bIdx + 1}`}
                  >
                    <Icon as={Trash2} size={16} className="text-error" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-control-sm w-control-sm"
                    onPress={() => {
                      setExpandedBlocks(prev => ({ ...prev, [block.id]: !prev[block.id] }));
                    }}
                    accessibilityLabel={isExpanded ? "Recolher bloco" : "Expandir bloco"}
                  >
                    <Icon as={isExpanded ? ChevronUp : ChevronDown} size={20} className="text-text-secondary" />
                  </Button>
                </View>
              </View>
              {errors.blockNames?.[block.id] && (
                <Text variant="caption" className="text-error px-4 pb-4">
                  {errors.blockNames[block.id]}
                </Text>
              )}

              {/* Body */}
              {isExpanded && (
                <View className="p-4 pt-0 border-t border-border-subtle/50">
                  <Text variant="label" className="mb-3 mt-3 text-text-secondary font-bold">
                    Exercícios
                  </Text>

                  {block.exercises.length === 0 ? (
                    <View className="py-6 items-center justify-center bg-surface-elevated rounded-lg mb-2 border border-dashed border-border-subtle">
                      <Text variant="caption" className="text-text-secondary">
                        Nenhum exercício neste treino
                      </Text>
                    </View>
                  ) : (
                    <View className="mb-2">
                      <DraggableFlatList
                        data={block.exercises}
                        onDragBegin={() => setScrollEnabled(false)}
                        onDragEnd={({ data }) => {
                          handleReorderExercises(block.id, data);
                          setScrollEnabled(true);
                        }}
                        keyExtractor={(item) => item.id}
                        scrollEnabled={false}
                        renderItem={({ item, drag, isActive }: RenderItemParams<ExerciseInput>) => {
                          const hasConfig = item.name.trim() !== '' && (item.sets > 0 || item.repsMin > 0 || item.repsMax > 0);
                          const configSummary = hasConfig 
                            ? `${item.sets} séries • ${item.repsMin}-${item.repsMax} reps` + (item.repsReserve !== undefined && item.repsReserve !== null ? ` • RIR: ${item.repsReserve}` : '')
                            : 'Toque para configurar';
                          return (
                            <ScaleDecorator>
                              <Pressable
                                onPress={() => router.push(`/training/exercise-config/${block.id}/${item.id}`)}
                                className={cn(
                                  "mb-2 p-3 flex-row items-center border border-border-subtle bg-surface rounded-lg active:opacity-85",
                                  isActive && "opacity-80 scale-[1.02] border-primary bg-surface-elevated"
                                )}
                              >
                                <Pressable
                                  onPressIn={drag}
                                  className="p-2 mr-2"
                                  hitSlop={12}
                                >
                                  <Icon as={GripVertical} size={20} className="text-text-disabled" />
                                </Pressable>
                                
                                <View className="flex-1">
                                  <Text variant="label" className="font-bold text-text-primary">
                                    {item.name || 'Selecione o exercício'}
                                  </Text>
                                  <Text variant="caption" className="text-text-secondary mt-1">
                                    {configSummary}
                                  </Text>
                                </View>

                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8"
                                  onPress={() => handleRemoveExercise(block.id, item.id)}
                                  accessibilityLabel={`Excluir exercício ${item.name}`}
                                >
                                  <Icon as={Trash2} size={16} className="text-error" />
                                </Button>
                              </Pressable>
                            </ScaleDecorator>
                          );
                        }}
                      />
                    </View>
                  )}

                  <Button
                    variant="outline"
                    size="sm"
                    onPress={() => {
                      const newId = handleAddExercise(block.id);
                      router.push(`/training/exercise-config/${block.id}/${newId}`);
                    }}
                    className="border-dashed border-border-control mt-2"
                  >
                    <Icon as={Plus} size={16} className="text-text-secondary" />
                    <Text variant="caption" className="text-text-secondary">
                      Adicionar exercício
                    </Text>
                  </Button>
                </View>
              )}
            </Card>
          );
        })}

        {blocks.length === 0 && (
          <View className="my-2">
            <EmptyState 
              icon={Layers} 
              title="Nenhum bloco adicionado"
              subtitle="Adicione um bloco para começar a montar o treino."
            />
          </View>
        )}

        <Button
          onPress={handleSave}
          disabled={isSaving}
          className="my-6 min-h-control-lg"
        >
          <Text>
            {isSaving
              ? programId
                ? 'Salvando...'
                : 'Criando...'
              : programId
              ? 'Salvar alterações'
              : 'Criar programa'}
          </Text>
        </Button>

        <FeedbackDialog
          visible={!!feedback}
          onClose={() => {
            if (feedback?.type === 'success') {
              router.back();
            }
            clearFeedback();
          }}
          state={{
            visible: !!feedback,
            title: feedback?.title || '',
            description: feedback?.message || '',
            isError: feedback?.type === 'error'
          }}
        />
      </ScrollView>
    </GestureHandlerRootView>
  );
}
