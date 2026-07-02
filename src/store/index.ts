import { create } from 'zustand';

export const formatDate = (date: Date) => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
};

interface AppState {
  selectedDate: string;
  setSelectedDate: (date: string) => void;
}

export const useAppStore = create<AppState>((set) => ({
  selectedDate: formatDate(new Date()),
  setSelectedDate: (date) => set({ selectedDate: date }),
}));

