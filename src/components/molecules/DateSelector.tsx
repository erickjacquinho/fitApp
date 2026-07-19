import { Text } from '@/components/ui/text';
import React from 'react';
import { View } from 'react-native';
import { LongPressable } from '@/components/ui/long-pressable';
import { ChevronLeft, ChevronRight } from 'lucide-react-native';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { useRouter } from 'expo-router';

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
  const router = useRouter();

  const changeDate = (days: number) => {
    const d = new Date(selectedDate + 'T00:00:00');
    d.setDate(d.getDate() + days);
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    onSelectDate(`${yyyy}-${mm}-${dd}`);
  };

  return (
    <View className="flex-row items-center justify-center">
      <Button accessibilityLabel="Dia anterior" variant="ghost" size="icon" onPress={() => changeDate(-1)}>
        <Icon as={ChevronLeft} size={24} />
      </Button>
      <LongPressable 
        className="w-date-selector items-center justify-center" 
        onLongPress={() => router.push('/diet/calendar-summary')}
      >
        <Text variant="subtitle" className="text-center font-bold">{formatDateLabel(selectedDate)}</Text>
      </LongPressable>
      <Button accessibilityLabel="Próximo dia" variant="ghost" size="icon" onPress={() => changeDate(1)}>
        <Icon as={ChevronRight} size={24} />
      </Button>
    </View>
  );
};
