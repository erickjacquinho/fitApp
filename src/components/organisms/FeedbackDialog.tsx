import React, { useRef } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Text } from '@/components/ui/text';
import { BaseDialogProps, FeedbackState } from './popup.types';

export interface FeedbackDialogProps extends BaseDialogProps {
  state: FeedbackState;
  actionLabel?: string;
}

export function FeedbackDialog({
  visible,
  onClose,
  state,
  actionLabel = 'Entendi',
}: FeedbackDialogProps) {
  // O uso de setTimeout previne um crash fatal no iOS onde a navegação (router.back)
  // destrói a tela enquanto o Modal nativo ainda está processando sua animação de fechamento.
  const handleSafeClose = () => {
    setTimeout(() => {
      onClose();
    }, 150);
  };

  return (
    <AlertDialog
      open={visible}
      onOpenChange={(open) => {
        if (!open) {
          handleSafeClose();
        }
      }}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className={state.isError ? 'text-error' : 'text-text-primary'}>
            {state.title}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {state.description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction onPress={() => {}}>
            <Text>{actionLabel}</Text>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
