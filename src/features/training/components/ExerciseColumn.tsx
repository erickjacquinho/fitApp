import React, { useState, useEffect } from 'react';
import { View, ScrollView } from 'react-native';
import { Plus } from 'lucide-react-native';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { Icon } from '@/components/ui/icon';
import { SetCard } from './SetCard';
import Exercise from '../../../db/models/Exercise';

interface Execution {
  id: string;
  setNumber: number;
  repsDone: number;
  weight: number;
}

interface ExerciseColumnProps {
  exercise: Exercise;
  executions: Execution[];
  onSaveSet: (exerciseId: string, setNumber: number, reps: number, weight: number) => Promise<void>;
  onDeleteSet: (exerciseId: string, setNumber: number) => Promise<void>;
}

interface SetState {
  setNumber: number;
  weight: string;
  reps: string;
  isSaved: boolean;
}

export function ExerciseColumn({
  exercise,
  executions,
  onSaveSet,
  onDeleteSet,
}: ExerciseColumnProps) {
  const [sets, setSets] = useState<SetState[]>([]);
  const [expandedSetNumber, setExpandedSetNumber] = useState<number | null>(null);

  // Sync sets state with executions and targetSets
  useEffect(() => {
    const numSets = Math.max(exercise.sets, executions.length);
    const updatedSets: SetState[] = [];

    for (let i = 1; i <= numSets; i++) {
      const exec = executions.find((e) => e.setNumber === i);
      updatedSets.push({
        setNumber: i,
        weight: exec ? exec.weight.toString() : '',
        reps: exec ? exec.repsDone.toString() : '',
        isSaved: !!exec,
      });
    }
    setSets(updatedSets);

    // Auto-expand the first unsaved set when the component mounts or updates
    const firstUnsaved = updatedSets.find((s) => !s.isSaved);
    if (firstUnsaved) {
      setExpandedSetNumber(firstUnsaved.setNumber);
    } else if (updatedSets.length > 0) {
      // If all saved, expand the last one or keep collapsed
      setExpandedSetNumber(null);
    }
  }, [executions, exercise.sets]);

  const handleInputChange = (index: number, field: 'weight' | 'reps', value: string) => {
    const updated = [...sets];
    updated[index][field] = value;
    updated[index].isSaved = false;
    setSets(updated);
  };

  const handleSaveSet = async (index: number) => {
    const setItem = sets[index];
    const weightVal = parseFloat(setItem.weight);
    const repsVal = parseInt(setItem.reps, 10);

    try {
      await onSaveSet(exercise.id, setItem.setNumber, repsVal, weightVal);
      
      // Update local state isSaved
      const updated = [...sets];
      updated[index].isSaved = true;
      setSets(updated);

      // Auto expand next unsaved set for smooth flow
      const nextUnsaved = updated.slice(index + 1).find((s) => !s.isSaved);
      if (nextUnsaved) {
        setExpandedSetNumber(nextUnsaved.setNumber);
      } else {
        // Look from the beginning if no unsaved sets are after this one
        const anyUnsaved = updated.find((s) => !s.isSaved);
        if (anyUnsaved) {
          setExpandedSetNumber(anyUnsaved.setNumber);
        } else {
          setExpandedSetNumber(null); // All completed
        }
      }
    } catch (error) {
      console.error('Error saving set:', error);
      alert('Não foi possível salvar a série.');
    }
  };

  const handleAddSet = () => {
    const lastSet = sets[sets.length - 1];
    const nextSetNumber = sets.length + 1;
    const newSet: SetState = {
      setNumber: nextSetNumber,
      weight: lastSet ? lastSet.weight : '',
      reps: lastSet ? lastSet.reps : '',
      isSaved: false,
    };
    
    setSets([...sets, newSet]);
    setExpandedSetNumber(nextSetNumber); // expand newly added set
  };

  const handleRemoveSet = async (index: number) => {
    const setItem = sets[index];
    try {
      await onDeleteSet(exercise.id, setItem.setNumber);
      const updated = sets
        .filter((_, i) => i !== index)
        .map((item, idx) => ({
          ...item,
          setNumber: idx + 1, // Recalculate set numbers sequentially
        }));
      setSets(updated);
      
      // Collapse or set expanded set
      setExpandedSetNumber(null);
    } catch (error) {
      console.error('Error deleting set:', error);
      alert('Não foi possível excluir a série.');
    }
  };

  return (
    <View className="flex-1 w-full px-4">
      {/* Exercise Head Info */}
      <View className="mb-4">
        <Text variant="title" className="font-bold text-text-primary">
          {exercise.name}
        </Text>
        <Text variant="caption" className="text-text-secondary mt-1">
          {`Meta: ${exercise.sets} séries x ${exercise.repsMin}-${exercise.repsMax} reps ${
            exercise.repsReserve !== undefined && exercise.repsReserve !== null
              ? `(RIR: @${exercise.repsReserve})`
              : ''
          }`}
        </Text>
        {exercise.advancedTechnique && (
          <View className="mt-1.5 self-start bg-blue-500/10 px-2 py-0.5 rounded">
            <Text variant="caption" className="text-blue-500 font-semibold">
              {exercise.advancedTechnique}
            </Text>
          </View>
        )}
      </View>

      {/* Set Cards list */}
      <ScrollView 
        keyboardShouldPersistTaps="handled" 
        className="flex-1"
        showsVerticalScrollIndicator={false}
      >
        <View className="pb-8">
          {sets.map((item, index) => (
            <SetCard
              key={item.setNumber}
              setNumber={item.setNumber}
              weight={item.weight}
              reps={item.reps}
              isSaved={item.isSaved}
              onInputChange={(field, val) => handleInputChange(index, field, val)}
              onSave={() => handleSaveSet(index)}
              onRemove={sets.length > 1 ? () => handleRemoveSet(index) : undefined}
              isExpanded={expandedSetNumber === item.setNumber}
              onToggleExpand={() => {
                setExpandedSetNumber(expandedSetNumber === item.setNumber ? null : item.setNumber);
              }}
            />
          ))}

          {/* Add Set Button */}
          <Button
            variant="outline"
            onPress={handleAddSet}
            className="mt-2 border-dashed flex-row justify-center items-center gap-2"
          >
            <Icon as={Plus} size={16} className="text-text-primary" />
            <Text variant="label" className="text-text-primary">
              Adicionar série
            </Text>
          </Button>
        </View>
      </ScrollView>
    </View>
  );
}
