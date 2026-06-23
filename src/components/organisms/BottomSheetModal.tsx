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
          className="absolute bottom-0 w-full max-w-full rounded-t-3xl rounded-b-none p-0 pb-safe gap-0 border-t border-x-0 border-b-0 border-soft m-0 sm:max-w-full"
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            className="w-full flex-shrink"
          >
            <DialogHeader className="flex-row items-start justify-between border-b border-soft px-4 py-4 m-0">
              <View className="flex-1">
                <DialogTitle className="text-lg font-bold">{title || ''}</DialogTitle>
                {!!subtitle && (
                  <Text variant="caption" className="text-text-muted mt-1">
                    {subtitle}
                  </Text>
                )}
              </View>
              <DialogClose asChild>
                <TouchableOpacity accessibilityLabel="Fechar" className="p-2 -mr-2">
                  <Icon as={X} className="text-text-muted" size={24} />
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
