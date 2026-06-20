import { useState, useEffect } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { MenuScreen } from "../../src/features/diet/components/MenuScreen";

const formatDate = (date: Date) => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
};

export default function DietTab() {
  const { date } = useLocalSearchParams<{ date?: string }>();
  const [selectedDate, setSelectedDate] = useState(() => formatDate(new Date()));

  useEffect(() => {
    if (date) {
      setSelectedDate(date);
    }
  }, [date]);

  return <MenuScreen selectedDate={selectedDate} onSelectDate={setSelectedDate} />;
}
