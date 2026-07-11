import React from 'react';
import { View, Pressable } from 'react-native';
import { Plus, Trash2, ChevronDown, ChevronUp, GripVertical } from 'lucide-react-native';
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { Input } from "@/components/ui/input";
import { Icon } from '@/components/ui/icon';
import { Card } from "@/components/ui/card";
import { router } from 'expo-router';
import { cn } from '@/lib/utils';
import DraggableFlatList, { ScaleDecorator } from 'react-native-draggable-flatlist';

export function ProgramFormBlockCard({ block, bIdx, isExpanded, onToggleExpand, setScrollEnabled, formState }: any) {
  const { handleBlockNameChange, handleRemoveBlock, errors, handleReorderExercises, handleRemoveExercise, handleAddExercise } = formState;
  
  return (
    <Card className="mb-4 border border-border-subtle bg-surface">
      <View className="flex-row items-center justify-between p-4 gap-2">
        <Input
          placeholder="Ex.: Treino A"
          value={block.name}
          onChangeText={(val) => handleBlockNameChange(block.id, val)}
          className="flex-1 font-bold h-control-sm border-border-control bg-transparent"
          hasError={!!errors.blockNames?.[block.id]}
        />
        <View className="flex-row items-center gap-1">
          <Button variant="ghost" size="icon" className="h-control-sm w-control-sm" onPress={() => handleRemoveBlock(block.id)}>
            <Icon as={Trash2} size={16} className="text-error" />
          </Button>
          <Button variant="ghost" size="icon" className="h-control-sm w-control-sm" onPress={onToggleExpand}>
            <Icon as={isExpanded ? ChevronUp : ChevronDown} size={20} className="text-text-secondary" />
          </Button>
        </View>
      </View>
      
      {errors.blockNames?.[block.id] && (
        <Text variant="caption" className="text-error px-4 pb-4">{errors.blockNames[block.id]}</Text>
      )}

      {isExpanded && (
        <View className="p-4 pt-0 border-t border-border-subtle/50">
          <Text variant="label" className="mb-3 mt-3 text-text-secondary font-bold">Exercícios</Text>

          {block.exercises.length === 0 ? (
            <View className="py-6 items-center justify-center bg-surface-elevated rounded-lg mb-2 border border-dashed border-border-subtle">
              <Text variant="caption" className="text-text-secondary">Nenhum exercício neste treino</Text>
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
                keyExtractor={(item: any) => item.id}
                scrollEnabled={false}
                renderItem={({ item, drag, isActive }: any) => {
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
                        <Pressable onPressIn={drag} className="p-2 mr-2" hitSlop={12}>
                          <Icon as={GripVertical} size={20} className="text-text-disabled" />
                        </Pressable>
                        
                        <View className="flex-1">
                          <Text variant="label" className="font-bold text-text-primary">{item.name || 'Selecione o exercício'}</Text>
                          <Text variant="caption" className="text-text-secondary mt-1">{configSummary}</Text>
                        </View>

                        <Button variant="ghost" size="icon" className="h-8 w-8" onPress={() => handleRemoveExercise(block.id, item.id)}>
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
            <Text variant="caption" className="text-text-secondary">Adicionar exercício</Text>
          </Button>
        </View>
      )}
    </Card>
  );
}
