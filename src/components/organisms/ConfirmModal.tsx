import React from 'react';
import { View, Modal, Pressable } from 'react-native';
import { Typography } from '../atoms/Typography';
import { Button } from '../atoms/Button';
import { Card } from '../atoms/Card';

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
  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={onCancel}
    >
      <Pressable 
        className="flex-1 bg-black/40 items-center justify-center p-screen-x"
        onPress={onCancel}
      >
        <Pressable onPress={(e) => e.stopPropagation()}>
          <Card className="w-full max-w-sm bg-surface-app border-strong gap-4">
            <View className="gap-2">
              <Typography variant="title">{title}</Typography>
              <Typography color="muted">{description}</Typography>
            </View>

            <View className="flex-row gap-3">
              <View className="flex-1">
                <Button 
                  title={cancelLabel} 
                  variant="outline" 
                  onPress={onCancel} 
                />
              </View>
              <View className="flex-1">
                <Button 
                  title={confirmLabel} 
                  variant={isDestructive ? 'danger' : 'primary'} 
                  onPress={onConfirm} 
                />
              </View>
            </View>
          </Card>
        </Pressable>
      </Pressable>
    </Modal>
  );
}
