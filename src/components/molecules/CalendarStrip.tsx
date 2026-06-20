import React, { useRef, useEffect } from 'react';
import { View, ScrollView, Pressable } from 'react-native';
import { Typography } from '../atoms/Typography';

interface CalendarStripProps {
  selectedDate: string; // YYYY-MM-DD
  onSelectDate: (date: string) => void;
}

const generateDates = () => {
  const dates = [];
  const today = new Date();
  for (let i = -14; i <= 14; i++) {
    const d = new Date(today);
    d.setDate(d.getDate() + i);
    dates.push(d);
  }
  return dates;
};

const formatDate = (date: Date) => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
};

const getDayName = (date: Date) => {
  return ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'][date.getDay()];
};

export const CalendarStrip = ({ selectedDate, onSelectDate }: CalendarStripProps) => {
  const dates = generateDates();
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    // Basic centering logic could go here
  }, [selectedDate]);

  return (
    <View className="py-3 bg-surface-app border-b border-soft">
      <ScrollView 
        ref={scrollViewRef}
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerClassName="px-4 gap-2"
      >
        {dates.map((date) => {
          const dateStr = formatDate(date);
          const isSelected = dateStr === selectedDate;
          const isToday = dateStr === formatDate(new Date());

          return (
            <Pressable
              key={dateStr}
              onPress={() => onSelectDate(dateStr)}
              className={`items-center justify-center rounded-xl p-2 min-w-[50px] ${
                isSelected ? 'bg-primary-main' : 'bg-surface-raised border border-soft'
              }`}
            >
              <Typography 
                variant="caption" 
                className={`font-semibold mb-1 ${isSelected ? 'text-white' : 'text-text-muted'}`}
              >
                {getDayName(date)}
              </Typography>
              <Typography 
                variant="subtitle" 
                className={`font-bold ${isSelected ? 'text-white' : isToday ? 'text-primary-main' : 'text-text-primary'}`}
              >
                {date.getDate()}
              </Typography>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
};
