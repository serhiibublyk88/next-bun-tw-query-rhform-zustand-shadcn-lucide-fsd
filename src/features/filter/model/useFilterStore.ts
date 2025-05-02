import { create } from 'zustand';

interface FilterState {
  minPrice: number;
  setMinPrice: (value: number) => void;
}

export const useFilterStore = create<FilterState>((set) => ({
  minPrice: 0,
  setMinPrice: (value) => set({ minPrice: value }),
}));
