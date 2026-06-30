import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Text } from '@/components/ui/text';
import { useRef } from 'react';

export interface ConfirmModalProps {
  visible: boolean;
  title: string;
  description: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmLabel?: string;
  cancelLabel?: string;
  isDestructive?: boolean;
}

export function ConfirmModal({
  visible,
  title,
  description,
  onConfirm,
  onCancel,
  confirmLabel = 'Confirmar',
  cancelLabel = 'Cancelar',
  isDestructive = false,
}: ConfirmModalProps) {
  const actionHandledRef = useRef(false);

  const handleSafeAction = (actionFn: () => void) => {
    setTimeout(() => {
      actionFn();
    }, 150);
  };

  return (
    <AlertDialog
      open={visible}
      onOpenChange={(open) => {
        if (!open) {
          if (actionHandledRef.current) {
            actionHandledRef.current = false;
            return;
          }
          handleSafeAction(onCancel);
        }
      }}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            onPress={() => {
              actionHandledRef.current = true;
              handleSafeAction(onCancel);
            }}
          >
            <Text>{cancelLabel}</Text>
          </AlertDialogCancel>
          <AlertDialogAction
            variant={isDestructive ? 'destructive' : 'default'}
            onPress={() => {
              actionHandledRef.current = true;
              handleSafeAction(onConfirm);
            }}
          >
            <Text>{confirmLabel}</Text>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
