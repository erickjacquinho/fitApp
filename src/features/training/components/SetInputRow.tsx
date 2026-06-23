import { Text } from '@/components/ui/text';
import React from 'react';
import { View } from 'react-native';
import { Trash2, Check } from 'lucide-react-native';
import { Input } from "@/components/ui/input";
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';

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
      className={`mb-3 flex-row items-center gap-2 rounded-sm border p-2 ${
        isSaved ? 'border-success border-opacity-30 bg-success bg-opacity-5' : 'border-border-subtle bg-surface-elevated'
      }`}
    >
      <View className="w-12 items-center justify-center">
        <Text variant="label" className="text-text-secondary">
          Série {setNumber}
        </Text>
      </View>

      {/* Weight Input */}
      <View className="flex-1 flex-row items-center rounded-sm border border-border-subtle px-2 py-1 bg-surface">
        <Input
          keyboardType="numeric"
          placeholder="0"
          value={weight}
          onChangeText={(val) => onInputChange('weight', val)}
          className="border-0 bg-transparent shadow-none px-0 py-0 flex-1 p-0 text-center font-bold text-text-primary"
        />
        <Text variant="caption" className="text-text-secondary ml-1">
          kg
        </Text>
      </View>

      {/* Reps Input */}
      <View className="flex-1 flex-row items-center rounded-sm border border-border-subtle px-2 py-1 bg-surface">
        <Input
          keyboardType="numeric"
          placeholder="0"
          value={reps}
          onChangeText={(val) => onInputChange('reps', val)}
          className="border-0 bg-transparent shadow-none px-0 py-0 flex-1 p-0 text-center font-bold text-text-primary"
        />
        <Text variant="caption" className="text-text-secondary ml-1">
          reps
        </Text>
      </View>

      {/* Actions */}
      <View className="flex-row items-center gap-1">
        {/* Save Check */}
        <Button
          accessibilityLabel={`Salvar série ${setNumber}`}
          variant={isSaved ? 'secondary' : 'default'}
          size="icon"
          onPress={onSave}
          className={isSaved ? 'bg-success' : undefined}
        >
          <Icon as={Check} size={16} className="text-text-inverse" />
        </Button>

        {/* Delete */}
        {onRemove && (
          <Button
            accessibilityLabel={`Excluir série ${setNumber}`}
            variant="ghost"
            size="icon"
            onPress={onRemove}
          >
            <Icon as={Trash2} size={16} className="text-error" />
          </Button>
        )}
      </View>
    </View>
  );
}
