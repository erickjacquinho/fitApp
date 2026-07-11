import React from 'react';
import { View } from 'react-native';
import { Plus } from 'lucide-react-native';
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { Input } from "@/components/ui/input";
import { Icon } from '@/components/ui/icon';
import { Label } from '@/components/ui/label';

export function ProgramFormHeader({ programName, setProgramName, error, onAddBlock }: any) {
  return (
    <>
      <View className="mb-6 bg-surface p-4 rounded-xl border border-border-subtle">
        <Label className="mb-2">Nome do Programa</Label>
        <Input
          placeholder="Ex.: Hipertrofia ABC"
          value={programName}
          onChangeText={setProgramName}
          className="mb-4 font-bold"
          hasError={!!error}
        />
        {error && <Text variant="caption" className="text-error mt-1">{error}</Text>}
      </View>

      <View className="mb-4 flex-row items-center justify-between border-b border-border-subtle pb-2">
        <Text variant="title" className="text-text-primary font-bold">Blocos de treino</Text>
        <Button variant="secondary" size="sm" onPress={onAddBlock}>
          <Icon as={Plus} size={16} />
          <Text variant="caption">Adicionar bloco</Text>
        </Button>
      </View>
    </>
  );
}
