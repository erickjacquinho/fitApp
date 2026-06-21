import React from 'react';
import { View, Modal, ModalProps, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native';
import { Typography } from '../atoms/Typography';
import { IconButton } from '../molecules/IconButton';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

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
          style={{ flex: 1 }} 
          activeOpacity={1} 
          onPress={onClose} 
        />
        <View 
          className="max-h-[85%] rounded-t-lg bg-surface-app px-4 pt-2 shadow-xl"
          style={{ paddingBottom: Math.max(insets.bottom, 16) }}
        >
          {/* Header */}
          <View className="flex-row items-center justify-between border-b border-soft pb-3 pt-2">
            <View className="flex-1 pr-4">
              <Typography variant="title" className="text-xl">
                {title}
              </Typography>
              {subtitle && (
                <Typography variant="caption" color="muted" className="mt-1">
                  {subtitle}
                </Typography>
              )}
            </View>
            <IconButton icon="X" onPress={onClose} />
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
