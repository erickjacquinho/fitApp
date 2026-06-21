import React, { useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Plus } from 'lucide-react-native';
import { Typography } from '../../../components/atoms/Typography';
import { BottomSheetModal } from '../../../components/organisms/BottomSheetModal';
import { SetInputRow } from './SetInputRow';
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";

interface SetState {
  setNumber: number;
  weight: string;
  reps: string;
  isSaved: boolean;
}

interface ExecuteExerciseModalProps {
  visible: boolean;
  onClose: () => void;
  exerciseName: string;
  exerciseId: string;
  sessionId: string;
  targetSets: number;
  repsMin: number;
  repsMax: number;
  repsReserve?: number;
  initialExecutions: { setNumber: number; repsDone: number; weight: number }[];
  onSaveSet: (setNumber: number, reps: number, weight: number) => Promise<void>;
  onDeleteSet: (setNumber: number) => Promise<void>;
}

export function ExecuteExerciseModal({
  visible,
  onClose,
  exerciseName,
  targetSets,
  repsMin,
  repsMax,
  repsReserve,
  initialExecutions,
  onSaveSet,
  onDeleteSet,
}: ExecuteExerciseModalProps) {
  const [sets, setSets] = useState<SetState[]>([]);

  useEffect(() => {
    if (visible) {
      // Build initial list of sets based on targetSets and initialExecutions
      const initialSets: SetState[] = [];
      const numSets = Math.max(targetSets, initialExecutions.length);

      for (let i = 1; i <= numSets; i++) {
        const execution = initialExecutions.find((e) => e.setNumber === i);
        initialSets.push({
          setNumber: i,
          weight: execution ? execution.weight.toString() : '',
          reps: execution ? execution.repsDone.toString() : '',
          isSaved: !!execution,
        });
      }

      setSets(initialSets);
    }
  }, [visible, initialExecutions, targetSets]);

  const handleInputChange = (
    index: number,
    field: 'weight' | 'reps',
    value: string
  ) => {
    const updated = [...sets];
    updated[index][field] = value;
    updated[index].isSaved = false; // Mark unsaved if modified
    setSets(updated);
  };

  const handleSaveSet = async (index: number) => {
    const setItem = sets[index];
    const weightVal = parseFloat(setItem.weight);
    const repsVal = parseInt(setItem.reps, 10);

    if (isNaN(weightVal) || isNaN(repsVal)) {
      alert('Please enter valid numbers for weight and repetitions');
      return;
    }

    try {
      await onSaveSet(setItem.setNumber, repsVal, weightVal);
      const updated = [...sets];
      updated[index].isSaved = true;
      setSets(updated);
    } catch (error) {
      console.error('Error saving set:', error);
      alert('Failed to save set');
    }
  };

  const handleAddSet = () => {
    // Determine last weight/reps to prefill for convenience
    const lastSet = sets[sets.length - 1];
    const nextSetNumber = sets.length + 1;
    setSets([
      ...sets,
      {
        setNumber: nextSetNumber,
        weight: lastSet ? lastSet.weight : '',
        reps: lastSet ? lastSet.reps : '',
        isSaved: false,
      },
    ]);
  };

  const handleRemoveSet = async (index: number) => {
    const setItem = sets[index];
    try {
      await onDeleteSet(setItem.setNumber);
      const updated = sets
        .filter((_, i) => i !== index)
        .map((item, idx) => ({
          ...item,
          setNumber: idx + 1, // Recalculate set numbers sequentially
        }));
      setSets(updated);
    } catch (error) {
      console.error('Error deleting set:', error);
      alert('Failed to delete set');
    }
  };

  return (
    <BottomSheetModal 
      visible={visible} 
      onClose={onClose} 
      title={exerciseName}
      subtitle={`Target: ${targetSets} sets x ${repsMin}-${repsMax} reps ${repsReserve !== undefined ? `(RIR: @${repsReserve})` : ''}`}
    >
      {/* Sets List */}
      <ScrollView keyboardShouldPersistTaps="handled" className="mt-2 flex-grow-0" style={{ maxHeight: 350 }}>
        {sets.map((item, index) => (
          <SetInputRow
            key={item.setNumber}
            setNumber={item.setNumber}
            weight={item.weight}
            reps={item.reps}
            isSaved={item.isSaved}
            onInputChange={(field, val) => handleInputChange(index, field, val)}
            onSave={() => handleSaveSet(index)}
            onRemove={sets.length > 1 ? () => handleRemoveSet(index) : undefined}
          />
        ))}
      </ScrollView>

      {/* Add set button */}
      <TouchableOpacity
        onPress={handleAddSet}
        className="my-3 flex-row items-center justify-center gap-2 rounded border border-dashed border-primary-main py-2 active:bg-primary-main/5"
      >
        <Plus size={16} color="#005B94" />
        <Typography variant="label" className="text-primary-main">
          Add Extra Set
        </Typography>
      </TouchableOpacity>

      {/* Actions */}
      <View className="mt-2 border-t border-soft pt-3 flex-row gap-2">
        <Button variant="outline" className="flex-1" onPress={onClose}><Text>Close</Text></Button>
      </View>
    </BottomSheetModal>
  );
}
