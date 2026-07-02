import { useEffect, useRef } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { View } from 'react-native';
import { MenuScreen } from "../../src/features/diet/components/MenuScreen";
import { Screen } from '@/components/ui/screen';
import { Header } from '@/components/molecules/Header';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Apple, ArrowUpDown, CalendarDays } from 'lucide-react-native';
import { DateSelector } from '@/components/molecules/DateSelector';
import { LongPressable } from '@/components/ui/long-pressable';

import { useAppStore } from '../../src/store';

export interface MenuScreenRef {
  startReorder: () => void;
}

export default function DietTab() {
  const { date } = useLocalSearchParams<{ date?: string }>();
  const { selectedDate, setSelectedDate } = useAppStore();
  const menuRef = useRef<MenuScreenRef | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (date) {
      setSelectedDate(date);
      router.setParams({ date: undefined } as any);
    }
  }, [date, setSelectedDate, router]);

  const startReorder = () => {
    menuRef.current?.startReorder();
  };

  return (
    <Screen
      header={
        <Header
          customTitle={
            <LongPressable onLongPress={startReorder}>
              <DateSelector selectedDate={selectedDate} onSelectDate={setSelectedDate} />
            </LongPressable>
          }
          headerLeft={
            <Button accessibilityLabel="Reordenar refeições" variant="ghost" size="icon" onPress={startReorder}>
              <Icon as={ArrowUpDown} size={24} />
            </Button>
          }
          headerRight={
            <View className="-mr-2 flex-row items-center gap-2">
              <Button accessibilityLabel="Ver calendário" variant="ghost" size="icon" onPress={() => router.push('/diet/calendar-summary')}>
                <Icon as={CalendarDays} size={24} />
              </Button>
              <Button accessibilityLabel="Abrir banco de alimentos" variant="ghost" size="icon" onPress={() => router.push('/diet/food-bank')}>
                <Icon as={Apple} size={24} />
              </Button>
            </View>
          }
        />
      }
      scrollable={false}
      withPadding={false}
    >
      <MenuScreen 
        selectedDate={selectedDate} 
        onSelectDate={setSelectedDate} 
        menuRef={menuRef} 
      />
    </Screen>
  );
}
