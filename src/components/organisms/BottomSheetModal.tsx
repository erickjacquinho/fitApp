import React from 'react';
import { View, KeyboardAvoidingView, Platform, TouchableOpacity, ModalProps } from 'react-native';
import { X } from 'lucide-react-native';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogPortal,
  DialogOverlay,
} from '@/components/ui/dialog';

export interface BottomSheetModalProps extends Omit<ModalProps, 'visible' | 'animationType' | 'transparent'> {
  visible: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
}

export function BottomSheetModal({
  visible,
  onClose,
  title,
  subtitle,
  children,
  ...props
}: BottomSheetModalProps) {
  return (
    <Dialog open={visible} onOpenChange={(open) => !open && onClose()}>
      <DialogPortal>
        <DialogOverlay className="justify-end p-0" />
        <DialogContent
          className="absolute bottom-0 m-0 w-full max-w-full rounded-t-3xl rounded-b-none border-t border-b-0 border-x-0 border-border-subtle p-0 pb-safe sm:max-w-full gap-0"
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            className="w-full flex-shrink"
          >
            <DialogHeader className="m-0 flex-row items-start justify-between border-b border-border-subtle px-4 py-4">
              <View className="flex-1">
                <DialogTitle className="text-lg font-bold">{title || ''}</DialogTitle>
                {!!subtitle && (
                  <Text variant="caption" className="mt-1 text-text-secondary">
                    {subtitle}
                  </Text>
                )}
              </View>
              <DialogClose asChild>
                <TouchableOpacity accessibilityLabel="Fechar" className="p-2 -mr-2">
                  <Icon as={X} className="text-text-secondary" size={24} />
                </TouchableOpacity>
              </DialogClose>
            </DialogHeader>
            <View className="flex-shrink px-4 py-4">
              {children}
            </View>
          </KeyboardAvoidingView>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}
