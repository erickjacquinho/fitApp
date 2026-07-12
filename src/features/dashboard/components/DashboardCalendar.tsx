import React, { useState, useCallback } from 'react';
import { View } from 'react-native';
import { WeeklyCalendar } from '@/components/ui/weekly-calendar';

interface DashboardCalendarProps {
  onDateChange: (date: Date) => void;
  initialDate?: Date;
}

export function DashboardCalendar({ onDateChange, initialDate = new Date() }: DashboardCalendarProps) {
  const [selectedDate, setSelectedDate] = useState(initialDate);
  const [currentMonth, setCurrentMonth] = useState(initialDate);

  const handleDateSelect = useCallback((date: Date) => {
    setSelectedDate(date);
    onDateChange(date);
  }, [onDateChange]);

  const handleMonthChange = useCallback((newDate: Date) => {
    setCurrentMonth(newDate);
  }, []);

  const handleJumpToToday = useCallback(() => {
    const today = new Date();
    setSelectedDate(today);
    setCurrentMonth(today);
    onDateChange(today);
  }, [onDateChange]);

  return (
    <View className="mb-content-gap">
      <WeeklyCalendar 
        currentDate={currentMonth}
        selectedDate={selectedDate}
        onDateSelect={handleDateSelect}
        onMonthChange={handleMonthChange}
        onJumpToToday={handleJumpToToday}
      />
    </View>
  );
}
