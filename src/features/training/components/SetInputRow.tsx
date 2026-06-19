import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Input } from '../../../components/atoms/Input';
import { Trash2, Check } from 'lucide-react-native';
import { Typography } from '../../../components/atoms/Typography';

interface SetInputRowProps {
  setNumber: number;
  weight: string;
  reps: string;
  isSaved: boolean;
  onInputChange: (field: 'weight' | 'reps', value: string) => void;
  onSave: () => void;
  onRemove?: () => void;
}

export function SetInputRow({
  setNumber,
  weight,
  reps,
  isSaved,
  onInputChange,
  onSave,
  onRemove,
}: SetInputRowProps) {
  return (
    <View
      className={`mb-3 flex-row items-center gap-2 rounded border p-2 ${
        isSaved ? 'border-success-main/30 bg-success-main/5' : 'border-soft bg-white-pure'
      }`}
    >
      <View className="w-12 items-center justify-center">
        <Typography variant="label" color="muted">
          Set {setNumber}
        </Typography>
      </View>

      {/* Weight Input */}
      <View className="flex-1 flex-row items-center rounded border border-soft px-2 py-1 bg-surface-app">
        <Input variant="unstyled"
          keyboardType="numeric"
          placeholder="0"
          value={weight}
          onChangeText={(val) => onInputChange('weight', val)}
          className="flex-1 p-0 text-center font-bold text-black-main"
        />
        <Typography variant="caption" color="muted" className="ml-1">
          kg
        </Typography>
      </View>

      {/* Reps Input */}
      <View className="flex-1 flex-row items-center rounded border border-soft px-2 py-1 bg-surface-app">
        <Input variant="unstyled"
          keyboardType="numeric"
          placeholder="0"
          value={reps}
          onChangeText={(val) => onInputChange('reps', val)}
          className="flex-1 p-0 text-center font-bold text-black-main"
        />
        <Typography variant="caption" color="muted" className="ml-1">
          reps
        </Typography>
      </View>

      {/* Actions */}
      <View className="flex-row items-center gap-1">
        {/* Save Check */}
        <TouchableOpacity
          onPress={onSave}
          className={`h-9 w-9 items-center justify-center rounded ${
            isSaved ? 'bg-success-main' : 'bg-primary-main'
          }`}
        >
          <Check size={16} color="#fff" />
        </TouchableOpacity>

        {/* Delete */}
        {onRemove && (
          <TouchableOpacity
            onPress={onRemove}
            className="h-9 w-9 items-center justify-center rounded bg-tomato-main/10"
          >
            <Trash2 size={16} color="#ef4444" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
