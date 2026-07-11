import React from 'react';
import { View } from 'react-native';
import { Layers } from 'lucide-react-native';
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { EmptyState } from '@/components/molecules/EmptyState';
import { FeedbackDialog } from '@/components/organisms/FeedbackDialog';
import { router } from 'expo-router';

export function ProgramFormActions({ blocksCount, isSaving, programId, onSave, feedback, clearFeedback }: any) {
  return (
    <>
      {blocksCount === 0 && (
        <View className="my-2">
          <EmptyState 
            icon={Layers} 
            title="Nenhum bloco adicionado"
            subtitle="Adicione um bloco para começar a montar o treino."
          />
        </View>
      )}

      <Button onPress={onSave} disabled={isSaving} className="my-6 min-h-control-lg">
        <Text>
          {isSaving ? (programId ? 'Salvando...' : 'Criando...') : (programId ? 'Salvar alterações' : 'Criar programa')}
        </Text>
      </Button>

      <FeedbackDialog
        visible={!!feedback}
        onClose={() => {
          if (feedback?.type === 'success') router.back();
          clearFeedback();
        }}
        state={{
          visible: !!feedback,
          title: feedback?.title || '',
          description: feedback?.message || '',
          isError: feedback?.type === 'error'
        }}
      />
    </>
  );
}
