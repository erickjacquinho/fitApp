import React from 'react';
import { View, Pressable } from 'react-native';
import Animated, { useAnimatedStyle, useDerivedValue, withTiming } from 'react-native-reanimated';
import { ChevronDown, CheckCircle2, Circle, Trash2, Save } from 'lucide-react-native';
import { Card } from '@/components/ui/card';
import { Text } from '@/components/ui/text';
import { Icon } from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface SetCardProps {
  setNumber: number;
  weight: string;
  reps: string;
  isSaved: boolean;
  onInputChange: (field: 'weight' | 'reps', value: string) => void;
  onSave: () => void;
  onRemove?: () => void;
  isExpanded: boolean;
  onToggleExpand: () => void;
}

export function SetCard({
  setNumber,
  weight,
  reps,
  isSaved,
  onInputChange,
  onSave,
  onRemove,
  isExpanded,
  onToggleExpand,
}: SetCardProps) {
  // Rotate animation for chevron
  const rotateValue = useDerivedValue(() => {
    return isExpanded ? withTiming(180, { duration: 200 }) : withTiming(0, { duration: 200 });
  });

  const chevronStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotateValue.value}deg` }],
    };
  });

  // Animated height for collapsed/expanded view
  const heightStyle = useAnimatedStyle(() => {
    return {
      height: isExpanded ? withTiming(140, { duration: 250 }) : withTiming(0, { duration: 200 }),
      opacity: isExpanded ? withTiming(1, { duration: 250 }) : withTiming(0, { duration: 150 }),
      marginTop: isExpanded ? withTiming(12, { duration: 200 }) : withTiming(0, { duration: 200 }),
    };
  });

  const handleSave = () => {
    const weightVal = parseFloat(weight);
    const repsVal = parseInt(reps, 10);

    if (isNaN(weightVal) || isNaN(repsVal)) {
      // In PT-BR as per core directive
      alert('Informe valores válidos para peso e repetições.');
      return;
    }
    onSave();
  };

  return (
    <Card
      className={`mb-3 border p-4 shadow-sm overflow-hidden ${
        isSaved 
          ? 'border-success/30 bg-success/5' 
          : 'border-border-subtle bg-surface'
      }`}
    >
      {/* Header / Clickable Area when collapsed */}
      <Pressable
        onPress={onToggleExpand}
        accessibilityRole="button"
        accessibilityLabel={`Série ${setNumber}, ${isSaved ? 'Concluída' : 'Pendente'}`}
        className="flex-row items-center justify-between"
      >
        <View className="flex-row items-center gap-3">
          {/* Status Icon */}
          <Icon
            as={isSaved ? CheckCircle2 : Circle}
            size={20}
            className={isSaved ? 'text-success' : 'text-text-secondary'}
          />
          
          <View>
            <Text variant="subtitle" className="font-semibold text-text-primary">
              Série {setNumber}
            </Text>
            <Text variant="caption" className="text-text-secondary mt-0.5">
              {isSaved ? `${reps} reps @ ${weight} kg` : 'Pendente'}
            </Text>
          </View>
        </View>

        <Animated.View style={chevronStyle}>
          <Icon as={ChevronDown} size={20} className="text-text-secondary" />
        </Animated.View>
      </Pressable>

      {/* Expanded Content (Inputs and Action Buttons) */}
      <Animated.View style={[heightStyle, { overflow: 'hidden' }]}>
        <View className="flex-row gap-3 items-center">
          {/* Weight Field */}
          <View className="flex-1">
            <Text variant="caption" className="text-text-secondary mb-1">
              Peso (kg)
            </Text>
            <View className="flex-row items-center rounded-lg border border-border-subtle px-3 py-2 bg-surface-elevated">
              <Input
                keyboardType="numeric"
                placeholder="0"
                value={weight}
                onChangeText={(val) => onInputChange('weight', val)}
                className="flex-1 font-bold text-text-primary border-0 bg-transparent h-6 p-0 text-base"
              />
              <Text variant="caption" className="text-text-secondary ml-1 font-semibold">
                kg
              </Text>
            </View>
          </View>

          {/* Reps Field */}
          <View className="flex-1">
            <Text variant="caption" className="text-text-secondary mb-1">
              Repetições
            </Text>
            <View className="flex-row items-center rounded-lg border border-border-subtle px-3 py-2 bg-surface-elevated">
              <Input
                keyboardType="numeric"
                placeholder="0"
                value={reps}
                onChangeText={(val) => onInputChange('reps', val)}
                className="flex-1 font-bold text-text-primary border-0 bg-transparent h-6 p-0 text-base"
              />
              <Text variant="caption" className="text-text-secondary ml-1 font-semibold">
                reps
              </Text>
            </View>
          </View>
        </View>

        {/* Action Row inside Card */}
        <View className="flex-row justify-between items-center mt-4 pt-3 border-t border-border-subtle/50">
          {onRemove ? (
            <Button
              variant="outline"
              size="sm"
              onPress={onRemove}
              className="flex-row items-center gap-1.5 border-error/20 active:bg-error/5"
            >
              <Icon as={Trash2} size={14} className="text-error" />
              <Text variant="caption" className="text-error font-semibold">
                Remover
              </Text>
            </Button>
          ) : (
            <View />
          )}

          <Button
            variant={isSaved ? 'outline' : 'default'}
            size="sm"
            onPress={handleSave}
            className={`flex-row items-center gap-1.5 ${isSaved ? 'border-success/30 active:bg-success/5' : ''}`}
          >
            <Icon as={isSaved ? CheckCircle2 : Save} size={14} className={isSaved ? 'text-success' : 'text-text-inverse'} />
            <Text variant="caption" className={`font-semibold ${isSaved ? 'text-success' : 'text-text-inverse'}`}>
              {isSaved ? 'Salva' : 'Salvar'}
            </Text>
          </Button>
        </View>
      </Animated.View>
    </Card>
  );
}
