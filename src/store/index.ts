import { create } from 'zustand';

interface AppState {
  selectedDate: number;
  setSelectedDate: (date: number) => void;
}

export const useAppStore = create<AppState>((set) => ({
  selectedDate: Date.now(),
  setSelectedDate: (date) => set({ selectedDate: date }),
}));
