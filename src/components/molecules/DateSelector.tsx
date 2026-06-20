import React from 'react';
import { View, Pressable } from 'react-native';
import { ChevronLeft, ChevronRight } from 'lucide-react-native';
import { Typography } from '../atoms/Typography';
import { COLORS } from '../atoms/colors';

interface DateSelectorProps {
  selectedDate: string; // YYYY-MM-DD
  onSelectDate: (date: string) => void;
}

const formatDateLabel = (dateStr: string) => {
  const today = new Date();
  const date = new Date(dateStr + 'T00:00:00');
  today.setHours(0, 0, 0, 0);

  const diffTime = date.getTime() - today.getTime();
  const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Hoje';
  if (diffDays === 1) return 'Amanhã';
  if (diffDays === -1) return 'Ontem';

  const d = String(date.getDate()).padStart(2, '0');
  const m = String(date.getMonth() + 1).padStart(2, '0');
  return `${d}/${m}`;
};

export const DateSelector = ({ selectedDate, onSelectDate }: DateSelectorProps) => {
  const changeDate = (days: number) => {
    const d = new Date(selectedDate + 'T00:00:00');
    d.setDate(d.getDate() + days);
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    onSelectDate(`${yyyy}-${mm}-${dd}`);
  };

  return (
    <View className="flex-row items-center justify-between px-4 py-3 bg-surface-app border-b border-soft">
      <Pressable onPress={() => changeDate(-1)} className="p-2">
        <ChevronLeft size={24} color={COLORS.textMain} />
      </Pressable>
      <Typography variant="title">{formatDateLabel(selectedDate)}</Typography>
      <Pressable onPress={() => changeDate(1)} className="p-2">
        <ChevronRight size={24} color={COLORS.textMain} />
      </Pressable>
    </View>
  );
};
