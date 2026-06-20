import { useState } from 'react';
import { MainTabScreen } from '../../src/components/organisms/main-tab-screen';
import { DailyTrainingScreen } from '../../src/features/training/components/DailyTrainingScreen';

const formatDate = (date: Date) => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
};

export default function TrainingTab() {
  const [selectedDate, setSelectedDate] = useState(() => formatDate(new Date()));

  return (
    <MainTabScreen
      title="Treino"
      scrollable={false}
    >
      <DailyTrainingScreen selectedDate={selectedDate} onSelectDate={setSelectedDate} />
    </MainTabScreen>
  );
}
