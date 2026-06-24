import React from 'react';
import { View, KeyboardAvoidingView, Platform, ModalProps } from 'react-native';
import { Text } from '@/components/ui/text';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

export interface PopupModalProps extends Omit<ModalProps, 'visible' | 'animationType' | 'transparent'> {
  visible: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
}

export function PopupModal({
  visible,
  onClose,
  title,
  subtitle,
  children,
}: PopupModalProps) {
  return (
    <Dialog open={visible} onOpenChange={(open) => !open && onClose()}>
      <DialogContent>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          className="w-full flex-shrink"
        >
          {(title || subtitle) && (
            <DialogHeader>
              {!!title && <DialogTitle>{title}</DialogTitle>}
              {!!subtitle && (
                <Text variant="caption" className="mt-1 text-text-secondary">
                  {subtitle}
                </Text>
              )}
            </DialogHeader>
          )}
          <View className="mt-4 flex-shrink">
            {children}
          </View>
        </KeyboardAvoidingView>
      </DialogContent>
    </Dialog>
  );
}
