import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogBody, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { Input } from "@/components/ui/input";
import Meal from '../../../db/models/Meal';

interface EditMealModalProps {
  visible: boolean;
  onClose: () => void;
  meal: Meal | null;
  onSave: (mealId: string, name: string, time: string) => Promise<void>;
}

export function EditMealModal({ visible, onClose, meal, onSave }: EditMealModalProps) {
  const [editName, setEditName] = useState('');
  const [editTime, setEditTime] = useState('00:00');

  useEffect(() => {
    if (visible && meal) {
      setEditName(meal.name);
      setEditTime(meal.preparationState || '00:00');
    }
  }, [visible, meal]);

  const formatTimeInput = (text: string): string => {
    const clean = text.replace(/\D/g, '');
    if (clean.length === 0) return '';

    let hours = clean.slice(0, 2);
    let minutes = clean.slice(2, 4);

    if (hours.length === 2) {
      const hVal = parseInt(hours, 10);
      if (hVal > 23) hours = '23';
    }

    if (minutes.length === 2) {
      const mVal = parseInt(minutes, 10);
      if (mVal > 59) minutes = '59';
    }

    if (clean.length >= 2) return `${hours}:${minutes}`;
    return hours;
  };

  const handleTimeChange = (text: string) => {
    if (editTime.endsWith(':') && text.length === editTime.length - 1) {
      setEditTime(text.slice(0, -1));
      return;
    }
    setEditTime(formatTimeInput(text));
  };

  const handleSafeClose = () => {
    setTimeout(() => {
      onClose();
    }, 150);
  };

  const handleSaveEdit = async () => {
    if (meal && editName.trim()) {
      await onSave(meal.id, editName, editTime);
      handleSafeClose();
    }
  };

  return (
    <Dialog open={visible} onOpenChange={(open) => !open && handleSafeClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar refeição</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <View className="gap-2">
            <Text variant="caption" className="text-text-secondary">Nome da refeição</Text>
            <Input 
              value={editName}
              onChangeText={setEditName}
              placeholder="Ex.: Almoço"
            />
          </View>
          <View className="gap-2">
            <Text variant="caption" className="text-text-secondary">Horário</Text>
            <Input 
              value={editTime}
              onChangeText={handleTimeChange}
              placeholder="Ex.: 12:00"
              keyboardType="numeric"
              maxLength={5}
            />
          </View>
        </DialogBody>
        <DialogFooter>
          <DialogClose asChild>
            <Button 
              variant="outline" 
              className="flex-1" 
            >
              <Text className="text-text-primary">Cancelar</Text>
            </Button>
          </DialogClose>
          <Button 
            className="flex-1" 
            disabled={!editName.trim()}
            onPress={handleSaveEdit}
          >
            <Text className="text-text-inverse">Salvar</Text>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
