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
  const actionHandledRef = useRef(false);

  return (
    <AlertDialog
      open={visible}
      onOpenChange={(open) => {
        if (!open) {
          if (actionHandledRef.current) {
            actionHandledRef.current = false;
            return;
          }
          onClose();
        }
      }}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className={state.isError ? 'text-tomato-main' : 'text-text-main'}>
            {state.title}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {state.description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction
            onPress={() => {
              actionHandledRef.current = true;
              onClose();
            }}
          >
            <Text>{actionLabel}</Text>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
