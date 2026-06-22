import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import React from 'react';
import { View, Modal, ModalProps, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { X } from 'lucide-react-native';
import { SPACING } from '@/tokens/spacing';

export interface BottomSheetModalProps extends Omit<ModalProps, 'visible' | 'animationType' | 'transparent'> {
  title: string;
  subtitle?: string;
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export function BottomSheetModal({
  title,
  subtitle,
  visible,
  onClose,
  children,
  ...props
}: BottomSheetModalProps) {
  const insets = useSafeAreaInsets();

  return (
    <Modal visible={visible} animationType="slide" transparent {...props}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1 justify-end bg-black-main/50"
      >
        <TouchableOpacity
          accessible={false}
          className="flex-1"
          activeOpacity={1} 
          onPress={onClose} 
        />
        <View 
          className="max-h-sheet rounded-t-lg bg-surface-app px-4 pt-2 shadow-floating"
          style={{ paddingBottom: Math.max(insets.bottom, SPACING.default) }}
        >
          {/* Header */}
          <View className="flex-row items-center justify-between border-b border-soft pb-3 pt-2">
            <View className="flex-1 pr-4">
              <Text variant="title">
                {title}
              </Text>
              {subtitle && (
                <Text variant="caption" color="muted" className="mt-1">
                  {subtitle}
                </Text>
              )}
            </View>
            <Button accessibilityLabel="Fechar" variant="ghost" size="icon" onPress={onClose}>
              <Icon as={X} />
            </Button>
          </View>

          {/* Content */}
          <View className="mt-2 flex-shrink">
            {children}
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}
